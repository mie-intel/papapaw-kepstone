import { Laporan } from "../../models/objectModel.js";

export async function view(req, res) {
  try {
    // Gunakan Laporan.find() untuk mengambil semua dokumen dari koleksi 'laporans'
    // Mengosongkan objek {} di dalam find() berarti "tidak ada filter, ambil semua"
    const laporans = await Laporan.find({});

    // Jika tidak ada laporan, kembalikan array kosong (ini perilaku normal)
    res.status(200).json({
      count: laporans.length,
      data: laporans,
    });
  } catch (error) {
    console.error("Error saat mengambil data laporan:", error);
    res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
}
