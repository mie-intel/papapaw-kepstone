#!/usr/bin/env node
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "../config/db.js";
import mongoose from "mongoose";
import { Laporan } from "../models/objectModel.js";

/**
 * Migration script to fix malformed `tanggal` fields stored as strings like '+022005-02-19'
 * - Finds documents where `tanggal` is stored as a string
 * - Finds documents where `tanggal` is a Date but with an unreasonable year (<1900 or >2100)
 * - Attempts to extract a yyyy-MM-dd substring and convert to a proper Date
 *
 * Usage:
 *   NODE_ENV=production MONGO_URI="..." node backend/scripts/fix-tanggal-migration.js
 */

const isReasonableYear = (y) => y >= 1900 && y <= 2100;

const normalizeDateFromString = (raw) => {
  if (!raw) return null;
  if (typeof raw !== "string") raw = String(raw);

  // Try to find an explicit yyyy-mm-dd in the string
  const m = raw.match(/(\d{4}-\d{2}-\d{2})/);
  if (m) {
    const candidate = m[1];
    const dt = new Date(candidate);
    if (!Number.isNaN(dt.getTime()) && isReasonableYear(dt.getFullYear())) return dt;
  }

  // Try to parse with Date constructor
  const parsed = new Date(raw);
  if (!Number.isNaN(parsed.getTime()) && isReasonableYear(parsed.getFullYear())) return parsed;

  // Try to remove leading non-digit characters and parse
  const cleaned = raw.replace(/^[^0-9]+/, "").replace(/[^0-9-:TZ ]/g, "");
  const parsed2 = new Date(cleaned);
  if (!Number.isNaN(parsed2.getTime()) && isReasonableYear(parsed2.getFullYear())) return parsed2;

  return null;
};

const run = async () => {
  await connectDB();
  console.log("Connected to DB");

  try {
    // 1) Documents where tanggal is a string
    const stringDocs = await Laporan.find({ tanggal: { $type: "string" } }).lean();
    console.log(`Found ${stringDocs.length} laporan with tanggal as string`);

    for (const doc of stringDocs) {
      const raw = doc.tanggal;
      const fixed = normalizeDateFromString(raw);
      if (fixed) {
        await Laporan.updateOne({ _id: doc._id }, { $set: { tanggal: fixed } });
        console.log(`Fixed (string) _id=${doc._id} => ${fixed.toISOString().split("T")[0]}`);
      } else {
        console.warn(`Could not normalize tanggal for _id=${doc._id} raw='${raw}'`);
      }
    }

    // 2) Documents where tanggal is Date but year out of expected range
    const outOfRangeDocs = await Laporan.find({
      $expr: {
        $or: [{ $gt: [{ $year: "$tanggal" }, 2100] }, { $lt: [{ $year: "$tanggal" }, 1900] }],
      },
    }).lean();
    console.log(`Found ${outOfRangeDocs.length} laporan with tanggal year out of range`);

    for (const doc of outOfRangeDocs) {
      // Try to inspect the stored value; if it's Date but year bad, we can't recover the original string reliably
      // Attempt best-effort by converting to ISO and searching for plausible substring
      const iso = new Date(doc.tanggal).toISOString();
      const m = iso.match(/(\d{4}-\d{2}-\d{2})/);
      if (m) {
        const candidate = new Date(m[1]);
        if (!Number.isNaN(candidate.getTime()) && isReasonableYear(candidate.getFullYear())) {
          await Laporan.updateOne({ _id: doc._id }, { $set: { tanggal: candidate } });
          console.log(
            `Fixed (outOfRange) _id=${doc._id} => ${candidate.toISOString().split("T")[0]}`,
          );
          continue;
        }
      }
      console.warn(`Skipping out-of-range tanggal for _id=${doc._id} value='${doc.tanggal}'`);
    }

    console.log("Migration finished");
  } catch (err) {
    console.error("Migration error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected");
  }
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
