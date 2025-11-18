import mongoose from "mongoose";
import bcrypt from "bcrypt";

const DEPARTEMEN = [
  "Mechanical Assembly",
  "Electronical Assembly",
  "Software Installation",
  "Quality Assurance",
  "Warehouse",
  "-",
];

const JABATAN = ["HSE", "Kepala Bagian", "Direktur"];

const pekerjaSchema = new mongoose.Schema({
  nomorInduk: { type: String, required: true, unique: true },
  nama: { type: String, required: true },
  jabatan: { type: String, enum: JABATAN, required: true },
  departemen: {
    type: String,
    enum: DEPARTEMEN,
    required: false,
  },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

// hashing
pekerjaSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const laporanSchema = new mongoose.Schema({
  idSurat: { type: String, required: true, unique: true },
  uid: { type: String, required: true },
  title: { type: String, required: true },
  skalaCedera: { type: Number, required: true },
  detail: { type: String, required: true },
  lokasi: { type: String, required: true },
  tanggal: { type: Date, required: true, default: Date.now },
  status: { type: Number, required: true, default: 1 }, //1 nunggu kepala bagian, 2 nunggu direktur, 3 diterima
  pesanKesalahan: { type: String, required: false },
  tertolak: { type: Boolean, required: true, default: false },
  headBagianApprove: { type: Date },
  direkturApprove: { type: Date },
  departemen: {
    type: String,
    enum: DEPARTEMEN,
    required: true,
  },
});

const Pekerja = mongoose.model("Pekerja", pekerjaSchema);
const Laporan = mongoose.model("Laporan", laporanSchema);

export { Pekerja, Laporan };
