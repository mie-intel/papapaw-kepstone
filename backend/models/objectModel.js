import mongoose from "mongoose";
import bcrypt from "bcrypt";

const pekerjaSchema = new mongoose.Schema({
  nomorInduk: { type: String, required: true, unique: true },
  nama: { type: String, required: true },
  jabatan: { type: String, enum: ["hse", "kepala bagian", "direktur"], required: true },
  departemen: { type: String, enum: ["mechanical", "electronical", "software", "qa", "warehouse"], required: false },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// hashing
pekerjaSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const laporanSchema = new mongoose.Schema({
  idSurat: { type: String, required: true, unique: true },
  tanggal: { type: Date, required: true, default: Date.now },
  skalaCedera: { type: Number, required: true },
  detail: { type: String, required: true },
  status: { type: Number, required: true, default: 1 }, //1 nunggu kepala bagian, 2 nunggu direktur, 3 diterima
  lokasi: { type: String, required: true },
  pesanKesalahan: { type: String, required: false },
  tertolak: { type: Boolean, required: true, default: false },
  headBagianApprove: { type: Date },
  direkturApprove: { type: Date },
});

const Pekerja = mongoose.model("Pekerja", pekerjaSchema);
const Laporan = mongoose.model("Laporan", laporanSchema);

export { Pekerja, Laporan };
