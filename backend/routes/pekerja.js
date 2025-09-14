const express = require('express')
const router = express.Router()
const dbPekerja = []; // nanti diganti mongoDB
router.use(logger)

router.post('/', (req,res) => {

    const { nomorInduk, nama, jabatan, departemen, username, password } = req.body;
    if (!nomorInduk || !nama || !jabatan || !departemen || !username || !password) {
        return res.status(400).json({ 
            error: "Data tidak lengkap. Semua field (nomor induk, nama, jabatan, departemen, username, password) harus diisi." 
        });
    }

    // cek apakah nomor induk already exists
    const isExist = dbPekerja.find(p => p.nomorInduk === nomorInduk);
    if (isExist) {
        return res.status(409).json({
            error: `Pekerja dengan nomorInduk ${nomorInduk} sudah terdaftar.`
        });
    }
  
    // Buat objek pekerja baru
    const pekerjaBaru = {
        id: dbPekerja.length + 1, // ID sederhana berdasarkan panjang array
        nomorInduk,
        nama,
        jabatan,
        departemen,
        username,
        // !! PENTING: Dalam aplikasi nyata, JANGAN PERNAH simpan password sebagai plain text.
        // Gunakan library seperti bcrypt untuk melakukan hashing pada password.
        password, // Di sini kita simpan langsung untuk contoh saja
    };

    dbPekerja.push(pekerjaBaru);
    console.log('Data Pekerja Saat Ini:', dbPekerja);

    res.status(201).json({
        message: 'Pekerja baru berhasil ditambahkan!',
        data: {
            id: pekerjaBaru.id,
            nomorInduk: pekerjaBaru.nomorInduk,
            nama: pekerjaBaru.nama,
            username: pekerjaBaru.username
        }
    });



});

function logger(req,res,next) {
    console.log(req.originalUrl)
    next()
}

module.exports = router