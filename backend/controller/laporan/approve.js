import { Laporan, Pekerja } from "../../models/objectModel.js";
import { getUserFromToken } from "../../middleware/auth.js";
import { postEmail } from "../email/post.js";

function canUpdateStatus(user, laporan, nextStatus) {
  if (nextStatus === 2 && user.jabatan === "Kepala Bagian" && laporan.status === 1) return true;
  if (nextStatus === 3 && user.jabatan === "Direktur" && laporan.status === 2) return true;
  return false;
}

export async function approve(req, res) {
  try {
    // console.log("Approve request received:", req.body);
    const user = getUserFromToken(req);
    const { idSurat } = req.body;
    const laporan = await Laporan.findOne({ idSurat });
    if (!laporan) return res.status(404).json({ message: "Laporan tidak ditemukan" });
    if (!canUpdateStatus(user, laporan, laporan.status + 1)) {
      return res.status(403).json({ message: "Akses ditolak" });
    }

    laporan.status = laporan.status + 1;
    if (laporan.status === 2 && user.jabatan === "Kepala Bagian") {
      laporan.headBagianApprove = new Date();
      laporan.tertolak = false;
    }
    if (laporan.status === 3 && user.jabatan === "Direktur") {
      laporan.direkturApprove = new Date();
      laporan.tertolak = false;
      // kirimkan email
      // console.log(
      //   "Preparing to send email notification for approved laporan:",
      //   laporan,
      //   laporan.uid,
      // );
      const hse = await Pekerja.findOne({ _id: laporan.uid });
      // console.log("HSE found for email notification:", hse.nama, hse.email, laporan);
      await postEmail(hse.nama, hse.email, laporan);
    }
    await laporan.save();
    res.json({ message: "Laporan berhasil disetujui", laporan });
  } catch (err) {
    res.status(500).json({ message: "Terjadi kesalahan", error: err.message });
  }
}
