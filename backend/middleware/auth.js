import { get } from "http";
import jwt from "jsonwebtoken";

const protectRoute = (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    try {
      // Ambil token dari header ('Bearer <token>')
      token = authHeader.split(" ")[1];

      // Verifikasi token menggunakan secret yang SAMA
      const secretKey = process.env.JWT_SECRET;
      const decoded = jwt.verify(token, secretKey);
      // Jika berhasil, simpan data user ke request untuk dipakai di controller selanjutnya
      req.user = decoded;
      next(); // Lanjutkan ke controller
    } catch (error) {
      console.log("Token verification error:", error);
      res.status(401).json({ message: "Token tidak valid atau sudah kedaluwarsa." });
    }
  } else {
    res.status(401).json({ message: "Tidak ada token, akses ditolak." });
  }
};

export const getUserFromToken = (req) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    try {
      token = authHeader.split(" ")[1];
      const secretKey = process.env.JWT_SECRET;
      const decoded = jwt.verify(token, secretKey);
      return decoded; // Kembalikan data user yang sudah didecode
    } catch (error) {
      console.log("Token verification error:", error);
      return null;
    }
  }
};

export function checkHSE(req, res, next) {
  const user = getUserFromToken(req);

  if (user.jabatan === "HSE") {
    // Jika jabatan sesuai, lanjutkan ke controller
    next();
  } else {
    // Jika tidak, kirim respons error 403 Forbidden
    res
      .status(403)
      .json({ message: "Akses ditolak. Hanya user dengan jabatan HSE yang diizinkan." });
  }
}

export function checkKepalaBagian(req, res, next) {
  const user = getUserFromToken(req);

  if (user.jabatan === "Kepala Bagian") {
    // Jika jabatan sesuai, lanjutkan ke controller
    next();
  } else {
    // Jika tidak, kirim respons error 403 Forbidden
    res
      .status(403)
      .json({ message: "Akses ditolak. Hanya user dengan jabatan HSE yang diizinkan." });
  }
}

export function checkDirektur(req, res, next) {
  const user = getUserFromToken(req);

  if (user.jabatan === "Direktur") {
    // Jika jabatan sesuai, lanjutkan ke controller
    next();
  } else {
    // Jika tidak, kirim respons error 403 Forbidden
    res
      .status(403)
      .json({ message: "Akses ditolak. Hanya user dengan jabatan HSE yang diizinkan." });
  }
}

export { protectRoute };
