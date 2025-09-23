import {Laporan } from '../../models/objectModel.js';

function canUpdateStatus(user, laporan, nextStatus) {
  if (nextStatus === 2 && user.jabatan === "kepala bagian" && laporan.status === 1) return true;
  if (nextStatus === 3 && user.jabatan === "direktur" && laporan.status === 2) return true;
  return false;
}

export async function updateStatus(req, res) {
  try {
    const { id } = req.params;
    const { status, pesanKesalahan } = req.body;
    const user = req.user;

    const laporan = await Laporan.findById(id);
    if (!laporan) return res.status(404).json({ message: "Laporan tidak ditemukan" });

    if (!canUpdateStatus(user, laporan, status)) {
      return res.status(403).json({ message: "Akses ditolak" });
    }

    if (pesanKesalahan) {
      laporan.pesanKesalahan = pesanKesalahan;
      laporan.tertolak = true;
      laporan.status = status;
    } else {
      laporan.status = status;
      if (status === 2 && user.jabatan === "kepala bagian") {
        laporan.headBagianApprove = new Date();
      }
      if (status === 3 && user.jabatan === "direktur") {
        laporan.direkturApprove = new Date();
        laporan.tertolak = false;
      }
    }

    await laporan.save();
    res.json({ message: "Status laporan diperbarui", laporan });
  } catch (err) {
    res.status(500).json({ message: "Terjadi kesalahan", error: err.message });
  }
}

export async function revisiLaporan(req, res) {
  try {
    const { id } = req.params;
    const { detail, lokasi, skalaCedera } = req.body;
    const user = req.user;

    const laporan = await Laporan.findById(id);
    if (!laporan) return res.status(404).json({ message: "Laporan tidak ditemukan" });

    if (laporan.tertolak && user.jabatan === "hse") {
      if (detail) laporan.detail = detail;
      if (lokasi) laporan.lokasi = lokasi;
      if (skalaCedera) laporan.skalaCedera = skalaCedera;
      laporan.tertolak = false;
      laporan.pesanKesalahan = "";
      laporan.status = 1;
      await laporan.save();
      return res.json({ message: "Laporan berhasil direvisi", laporan });
    }
    return res.status(403).json({ message: "Akses ditolak" });
  } catch (err) {
    res.status(500).json({ message: "Terjadi kesalahan", error: err.message });
  }
}