import * as jwt from "jsonwebtoken";

const protectRoute = (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    try {
      // Ambil token dari header ('Bearer <token>')
      token = authHeader.split(" ")[1];

      // Verifikasi token menggunakan secret yang SAMA
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Jika berhasil, simpan data user ke request untuk dipakai di controller selanjutnya
      req.user = decoded;
      next(); // Lanjutkan ke controller
    } catch (error) {
      res.status(401).json({ message: "Token tidak valid atau sudah kedaluwarsa." });
    }
  } else {
    res.status(401).json({ message: "Tidak ada token, akses ditolak." });
  }
};

export { protectRoute };

export function rolesAuthorization(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Akses ditolak." });
    }
    next();
  };
}
