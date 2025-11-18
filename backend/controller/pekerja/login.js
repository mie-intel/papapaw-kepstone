import { Pekerja } from "../../models/objectModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function login(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username dan password harus diisi." });
    }

    // Membandingkan username
    const user = await Pekerja.findOne({ username: username });
    if (!user) {
      return res.status(401).json({ error: "Username atau password salah." });
    }

    // Membandingkan password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Username atau password salah." });
    }

    // Membuat JWT (sama seperti sebelumnya)
    const payload = {
      id: user._id, // Gunakan _id dari MongoDB
      username: user.username,
      nama: user.nama,
      jabatan: user.jabatan,
      departemen: user.departemen,
    };

    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

    res.json({
      message: "Login berhasil!",
      jabatan: user.jabatan,
      departemen: user.departemen,
      nama: user.nama,
      token: token,
    });
  } catch (error) {
    // console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
