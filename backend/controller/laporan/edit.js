import { Laporan } from "../../models/objectModel.js";
import { getUserFromToken } from "../../middleware/auth.js";

export async function edit(req, res) {
  try {
    // Ambil data yang diperlukan dari body request
    const {
      idSurat: id,
      title,
      skalaCedera,
      detail,
      lokasi,
      departemen,
      status,
      tanggal,
    } = req.body;

    const { id: uid } = getUserFromToken(req) || {};

    // Validasi input sederhana
    if (
      !id ||
      !uid ||
      !title ||
      !skalaCedera ||
      !detail ||
      !lokasi ||
      !departemen ||
      tanggal === undefined ||
      status === undefined
    ) {
      return res.status(400).json({ error: "Data yang dibutuhkan tidak lengkap." });
    }

    const date = new Date(tanggal);

    // cek apakah id surat exists
    const laporanBaru = await Laporan.findOne({ idSurat: id });
    if (!laporanBaru) {
      return res.status(404).json({ error: "Laporan tidak ditemukan." });
    }

    // Buat instance Laporan baru dengan data dari request
    laporanBaru.title = title;
    laporanBaru.skalaCedera = skalaCedera;
    laporanBaru.detail = detail;
    laporanBaru.lokasi = lokasi;
    laporanBaru.departemen = departemen;
    laporanBaru.status = status;
    laporanBaru.tanggal = tanggal;
    if (status === 1) laporanBaru.tertolak = false;
    laporanBaru.pesanKesalahan = "";

    // Simpan ke database
    await laporanBaru.save();

    // Kirim respons sukses
    res.status(201).json({
      message: "Laporan baru berhasil diupdate!",
      data: {
        ...laporanBaru,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
