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

export { protectRoute };

export function rolesAuthorization(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Akses ditolak." });
    }
    next();
  };
}

export function authorizeHSE(req, res, next) {
  // Middleware ini berasumsi 'protectRoute' sudah berjalan sebelumnya
  // dan berhasil menaruh data user di `req.user`.

  // Menggunakan .toLowerCase() agar tidak case-sensitive (misal: "HSE", "hse", "Hse")
  if (req.user && req.user.jabatan && req.user.jabatan.toLowerCase() === "hse") {
    // Jika jabatan sesuai, lanjutkan ke controller
    next();
  } else {
    // Jika tidak, kirim respons error 403 Forbidden
    res
      .status(403)
      .json({ message: "Akses ditolak. Hanya user dengan jabatan HSE yang diizinkan." });
  }
}
