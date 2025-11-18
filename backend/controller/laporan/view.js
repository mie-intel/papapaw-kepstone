import { get } from "http";
import { Laporan } from "../../models/objectModel.js";
import { getUserFromToken } from "../../middleware/auth.js";

export async function view(req, res) {
  try {
    // Gunakan Laporan.find() untuk mengambil semua dokumen dari koleksi 'laporans'
    // Mengosongkan objek {} di dalam find() berarti "tidak ada filter, ambil semua"
    const laporans = await Laporan.find({});

    // // console.log(laporans);

    const user = getUserFromToken(req);

    if (user.jabatan === "HSE") {
      // keluarkan semua laporan yang dibuat oleh user tersebut
      const filteredLaporans = laporans.filter(
        (laporan) => String(laporan.uid) === String(user.id || user._id),
      );
      return res.status(200).json({
        count: filteredLaporans.length,
        data: filteredLaporans,
      });
    }

    if (user.jabatan === "Kepala Bagian") {
      // keluarkan semua laporan yang status === 1 && departemen === user.departemen
      const filteredLaporans = laporans.filter((laporan) => laporan.departemen === user.departemen);
      return res.status(200).json({
        count: filteredLaporans.length,
        data: filteredLaporans,
      });
    }

    // keluarkan semua laporan yang status === 2 kalo direktur

    return res.status(200).json({
      count: laporans.length,
      data: laporans,
    });
  } catch (error) {
    // console.error("Error saat mengambil data laporan:", error);
    res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
}
