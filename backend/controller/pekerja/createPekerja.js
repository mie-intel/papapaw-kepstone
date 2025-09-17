import { Pekerja } from "../../models/objectModel.js";

export async function createPekerja(req, res) {
  try {
    const { nomorInduk, nama, jabatan, departemen, username, password } = req.body;
    if (!nomorInduk || !nama || !jabatan || !departemen || !username || !password) {
      return res
        .status(400)
        .json({
          error:
            "Data tidak lengkap. Semua field (nomor induk, nama, jabatan, departemen, username, password) harus diisi.",
        });
    }
    // cek apakah nomor induk already exists
    const isExist = await Pekerja.findOne({ nomorInduk });
    if (isExist) {
      return res.status(409).json({
        error: `Pekerja dengan nomorInduk ${nomorInduk} sudah terdaftar.`,
      });
    }

    // const isExist = pekerjaList.find(p => p.nomorInduk === nomorInduk);
    // if (isExist) {
    //     return res.status(409).json({
    //         error: `Pekerja dengan nomorInduk ${nomorInduk} sudah terdaftar.`
    //     });
    // }
    const pekerjaBaru = new Pekerja({
      nomorInduk,
      nama,
      jabatan,
      departemen,
      username,
      password,
    });

    await pekerjaBaru.save();
    res.status(201).json({
      message: "Pekerja baru berhasil ditambahkan!",
      data: {
        nomorInduk: pekerjaBaru.nomorInduk,
        nama: pekerjaBaru.nama,
        jabatan: pekerjaBaru.jabatan,
        departemen: pekerjaBaru.departemen,
        username: pekerjaBaru.username,
      },
    });
  } catch (error) {
    console.error("Error in createPekerja controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
