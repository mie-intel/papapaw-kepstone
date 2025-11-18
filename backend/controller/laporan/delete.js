import { getUserFromToken } from "../../middleware/auth.js";
import { Laporan } from "../../models/objectModel.js";

// Delete laporan by idSurat
export async function deleteByIdSurat(req, res) {
  try {
    const { idSurat } = req.body;
    // find laporan
    const laporan = await Laporan.findOne({ idSurat });
    if (!laporan) return res.status(404).json({ message: "Laporan tidak ditemukan" });

    const user = getUserFromToken(req);
    if (user) {
      const isOwner = String(user.id || user._id) === String(laporan.uid);
      const isAdminRole = user.jabatan === "HSE";
      if (!isOwner && !isAdminRole) {
        return res
          .status(403)
          .json({ message: "Akses ditolak. Anda tidak berwenang menghapus laporan ini." });
      }
    }

    // Proceed to delete
    await Laporan.deleteOne({ idSurat });

    return res.json({ message: "Laporan berhasil dihapus", idSurat });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Terjadi kesalahan saat menghapus laporan", error: err.message });
  }
}

export default deleteByIdSurat;
