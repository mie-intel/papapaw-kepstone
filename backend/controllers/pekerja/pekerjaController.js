const dbPekerja = []; // nanti diganti mongoDB

export function createPekerja (req,res) {

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
        password,
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
}