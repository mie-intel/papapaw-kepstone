import { get } from "http";
import jwt from "jsonwebtoken";

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
      return null;
    }
  } else return null;
};

const protectRoute = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const user = getUserFromToken(req);
  if (user) return next();
  else return res.status(401).json({ message: "Tidak ada token, akses ditolak." });
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
    next();
  } else {
    res
      .status(403)
      .json({ message: "Akses ditolak. Hanya user dengan jabatan HSE yang diizinkan." });
  }
}

export { protectRoute };
