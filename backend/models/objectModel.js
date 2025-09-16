const mongoose = require('mongoose');
const {type} = require('os');
const bcrypt = require('bcrypt');

const pekerjaSchema = new mongoose.Schema({
    nomorInduk: { type: String, required: true, unique: true },
    nama: { type: String, required: true },
    jabatan: { type: String, required: true },
    departemen: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    });

pekerjaSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const laporanSchema = new mongoose.Schema({
        idSurat: { type: String, required: true, unique: true },
        tanggal: { type: Date, required: true },
        skalaCedera: {type: Number, required: true },
        detail: { type: String, required: true },
        status: { type: Number, required: true },
        lokasi: { type: String, required: true },
        pesanKesalahan: { type: String, required: false },
        tertolak: {type: Boolean, required: true },
    });

const Pekerja = mongoose.model('Pekerja', pekerjaSchema);
const Laporan = mongoose.model('Laporan', laporanSchema);

module.exports = { Pekerja, Laporan };