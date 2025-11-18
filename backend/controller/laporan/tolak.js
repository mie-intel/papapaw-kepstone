import { Laporan } from "../../models/objectModel.js";
import { getUserFromToken } from "../../middleware/auth.js";

export async function tolakLaporan(req, res) {
  try {
    const user = getUserFromToken(req);
    const validRoles = ["Kepala Bagian", "Direktur"];
    if (!validRoles.includes(user.jabatan)) {
      return res.status(403).json({ message: "Akses ditolak" });
    }
    const { idSurat, pesanKesalahan } = req.body;
    const laporan = await Laporan.findOne({ idSurat });
    if (!laporan) return res.status(404).json({ message: "Laporan tidak ditemukan" });

    laporan.pesanKesalahan = pesanKesalahan;
    laporan.tertolak = true;
    await laporan.save();
    res.json({ message: "Laporan ditolak", laporan });
  } catch (err) {
    res.status(500).json({ message: "Terjadi kesalahan", error: err.message });
  }
}
