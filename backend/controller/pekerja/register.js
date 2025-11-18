import { Pekerja } from "../../models/objectModel.js";

export async function register(req, res) {
  try {
    // Ambil data yang diperlukan dari body request
    const { nomorInduk, nama, email, jabatan, departemen, username, password } = req.body;

    // Validasi input
    if (!nomorInduk || !nama || !email || !jabatan || !username || !password) {
      return res.status(400).json({
        error:
          "Data tidak lengkap. Semua field (nomor induk, nama, jabatan, departemen, username, password) harus diisi.",
      });
    }

    // Validasi kondisional: jika jabatan BUKAN 'direktur', maka departemen wajib diisi
    if (jabatan.toLowerCase() !== "direktur" && !departemen) {
      return res.status(400).json({
        error: "Departemen wajib diisi untuk jabatan selain Direktur.",
      });
    }

    // cek apakah nomor induk already exists
    const isExist = await Pekerja.findOne({ nomorInduk });
    if (isExist) {
      return res.status(409).json({
        error: `Pekerja dengan Nomor Induk ${nomorInduk} sudah terdaftar.`,
      });
    }

    const isExistUsername = await Pekerja.findOne({ username });
    if (isExistUsername) {
      return res.status(409).json({
        error: `Username ${username} sudah terdaftar.`,
      });
    }

    // Buat instance Pekerja baru dengan data dari request
    // const pekerjaBaru = new Pekerja({
    //   nomorInduk,
    //   nama,
    //   jabatan,
    //   departemen,
    //   username,
    //   password,
    // });

    // Siapkan data dasar
    const dataPekerja = {
      nomorInduk,
      nama,
      email,
      jabatan,
      username,
      password,
    };

    // Ini memastikan 'direktur' tidak akan punya data departemen di database
    if (jabatan !== "Direktur") {
      dataPekerja.departemen = departemen;
    }
    const pekerjaBaru = new Pekerja(dataPekerja);
    // Simpan ke database
    try {
      await pekerjaBaru.save();
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Gagal menyimpan pekerja baru", error: error.message });
    }

    // Kirim respons sukses
    res.status(201).json({
      message: "Pekerja baru berhasil ditambahkan!",
      data: {
        ...pekerjaBaru,
      },
    });
  } catch (error) {
    // Tangani kemungkinan error
    // console.error("Error in register controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
