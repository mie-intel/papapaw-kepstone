import { Laporan } from "../../models/objectModel.js";
import { getUserFromToken } from "../../middleware/auth.js";
import bcrypt from "bcrypt";

export async function create(req, res) {
  try {
    // Ambil data yang diperlukan dari body request
    const { title, skalaCedera, detail, lokasi, departemen, status, tanggal } = req.body;
    const { id: uid } = getUserFromToken(req) || {};
    // console.log("Creating laporan with data:", req.headers.authorization, req.body);
    // console.log("DECODED", getUserFromToken(req));

    // Validasi input sederhana
    if (
      !uid ||
      !title ||
      !skalaCedera ||
      !detail ||
      !lokasi ||
      !departemen ||
      tanggal === undefined ||
      status === undefined
    ) {
      // console.log("Missing fields:", {
      //   uid,
      //   title,
      //   skalaCedera,
      //   detail,
      //   lokasi,
      //   departemen,
      //   tanggal,
      //   status,
      // });
      return res.status(400).json({ error: "Data yang dibutuhkan tidak lengkap." });
    }

    // console.log(
    //   "All required fields are present.",
    //   `SURAT-${JSON.stringify({ uid, title, skalaCedera, lokasi, tanggal })}`,
    // );
    const idSurat = await bcrypt.hash(
      `SURAT-${JSON.stringify({ uid, title, skalaCedera, lokasi, tanggal })}`,
      16,
    );

    // cek apakah id surat already exists
    const isExist = await Laporan.findOne({ idSurat });
    if (isExist) {
      return res.status(409).json({
        error: `Surat dengan ID Surat ${idSurat} sudah terdaftar.`,
      });
    }

    // console.log("Generated idSurat:", idSurat);
    // Buat instance Laporan baru dengan data dari request
    const laporanBaru = new Laporan({
      idSurat,
      uid,
      title,
      skalaCedera,
      detail,
      lokasi,
      departemen,
      status,
      tanggal,
    });

    // Simpan ke database
    await laporanBaru.save();

    // console.log("New laporan created:", laporanBaru);

    // Kirim respons sukses
    res.status(201).json({
      message: "Laporan baru berhasil dibuat!",
      data: {
        ...laporanBaru,
      },
    });
  } catch (error) {
    // Tangani kemungkinan error
    // console.error("Error in create controller", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
