import { get } from "http";
import { Laporan } from "../../models/objectModel.js";
import { getUserFromToken } from "../../middleware/auth.js";

export async function view(req, res) {
  try {
    const laporans = await Laporan.find({});
    const user = getUserFromToken(req);

    if (user.jabatan === "HSE") {
      const filteredLaporans = laporans.filter(
        (laporan) => String(laporan.uid) === String(user.id || user._id),
      );
      return res.status(200).json({
        count: filteredLaporans.length,
        data: filteredLaporans,
      });
    }

    if (user.jabatan === "Kepala Bagian") {
      const filteredLaporans = laporans.filter((laporan) => laporan.departemen === user.departemen);
      return res.status(200).json({
        count: filteredLaporans.length,
        data: filteredLaporans,
      });
    }

    return res.status(200).json({
      count: laporans.length,
      data: laporans,
    });
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
}
