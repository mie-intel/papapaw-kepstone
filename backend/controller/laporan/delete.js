import { getUserFromToken } from "../../middleware/auth.js";
import { Laporan } from "../../models/objectModel.js";

// Delete laporan by idSurat
export async function deleteByIdSurat(req, res) {
  try {
    const { idSurat } = req.body;
    // find laporan
    const laporan = await Laporan.findOne({ idSurat });
    if (!laporan) return res.status(404).json({ message: "Laporan tidak ditemukan" });

    // If authentication middleware sets req.user, allow deletion for:
    // - the owner (pelapor) of the laporan
    // - Kepala Bagian
    // - Direktur
    const user = getUserFromToken(req);
    if (user) {
      const isOwner = String(user.id || user._id) === String(laporan.uid);
      const isAdminRole = user.jabatan === "HSE";
      console.log(
        "Delete request by user:",
        user,
        "isOwner:",
        isOwner,
        "isAdminRole:",
        isAdminRole,
      );
      if (!isOwner && !isAdminRole) {
        return res
          .status(403)
          .json({ message: "Akses ditolak. Anda tidak berwenang menghapus laporan ini." });
      }
    }

    // Proceed to delete
    await Laporan.deleteOne({ idSurat });
    console.log(`Laporan with idSurat ${idSurat} deleted successfully.`);

    return res.json({ message: "Laporan berhasil dihapus", idSurat });
  } catch (err) {
    console.error("Error deleting laporan:", err);
    return res
      .status(500)
      .json({ message: "Terjadi kesalahan saat menghapus laporan", error: err.message });
  }
}

export default deleteByIdSurat;
