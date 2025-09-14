const Pekerja = require('../models/objectModel').Pekerja;

const createPekerja = async (req,res) => {

    const { nomorInduk, nama, jabatan, departemen, username, password } = req.body;
    if (!nomorInduk || !nama || !jabatan || !departemen || !username || !password) {
        return res.status(400).json({ 
            error: "Data tidak lengkap. Semua field (nomor induk, nama, jabatan, departemen, username, password) harus diisi." 
        });
    }

    // cek apakah nomor induk already exists
    const isExist = await Pekerja.findOne({ nomorInduk });
    if (isExist) {
        return res.status(409).json({
            error: `Pekerja dengan nomorInduk ${nomorInduk} sudah terdaftar.`
        });
    }
  
    const pekerjaBaru = new Pekerja({
        nomorInduk,
        nama,
        jabatan,
        departemen,
        username,
        // !! PENTING: Dalam aplikasi nyata, JANGAN PERNAH simpan password sebagai plain text.
        // Gunakan library seperti bcrypt untuk melakukan hashing pada password.
        password, // Di sini kita simpan langsung untuk contoh saja
    });

    await pekerjaBaru.save();

    res.status(201).json({
        message: 'Pekerja baru berhasil ditambahkan!',
        data: {
            id: pekerjaBaru.id,
            nomorInduk: pekerjaBaru.nomorInduk,
            nama: pekerjaBaru.nama,
            username: pekerjaBaru.username
        }
    });



};

module.exports={
    createPekerja
}