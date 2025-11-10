import { Laporan } from "../../models/objectModel.js";

export async function create(req, res) {
  try {
    // Ambil data yang diperlukan dari body request
    const { idSurat, uid, skalaCedera, detail, lokasi, departemen } = req.body;

    // Validasi input sederhana
    if (!idSurat || !skalaCedera || !detail || !lokasi || !uid || !departemen) {
      return res.status(400).json({ error: "Data yang dibutuhkan tidak lengkap." });
    }

    // cek apakah id surat already exists
    const isExist = await Laporan.findOne({ idSurat });
    if (isExist) {
      return res.status(409).json({
        error: `Surat dengan ID Surat ${idSurat} sudah terdaftar.`,
      });
    }

    // Buat instance Laporan baru dengan data dari request
    const laporanBaru = new Laporan({
      idSurat,
      uid,
      skalaCedera,
      detail,
      lokasi,
      departemen
    });

    // Simpan ke database
    await laporanBaru.save();

    // Kirim respons sukses
    res.status(201).json({
      message: "Laporan baru berhasil dibuat!",
      data: {
        ...laporanBaru,
      },
    });
  } catch (error) {
    // Tangani kemungkinan error
    console.error("Error in create controller", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
