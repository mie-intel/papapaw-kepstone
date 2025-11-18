import z, { email } from "zod";

export const loginSchema = z.object({
  username: z.string().trim().min(1, { message: "Username tidak boleh kosong" }),
  password: z.string().trim().min(1, { message: "Password tidak boleh kosong" }),
});

export const registerSchema = z.object({
  nomorInduk: z.string().trim().min(1, { message: "Data belum lengkap" }),
  nama: z.string().trim().min(1, { message: "Data belum lengkap" }),
  jabatan: z.string().min(1, { message: "Data belum lengkap" }),
  departemen: z.string().min(1, { message: "Data belum lengkap" }),
  username: z.string().trim().min(1, { message: "Data belum lengkap" }),
  password: z.string().trim().min(1, { message: "Data belum lengkap" }),
  email: z.string().trim().email({ message: "Email tidak valid" }),
});

const DEPARTEMEN = [
  "Mechanical Assembly",
  "Electronical Assembly",
  "Software Installation",
  "Quality Assurance",
  "Warehouse",
  "-",
];

export const laporanSchema = z.object({
  title: z.string().trim().min(1, { message: "Judul belum terisi" }),
  skalaCedera: z.number().min(1, { message: "Skala cedera belum terisi" }),
  detail: z.string().trim().min(1, { message: "Deskripsi belum terisi" }),
  lokasi: z.string().trim().min(1, { message: "Lokasi belum terisi" }),
  departemen: z.enum(DEPARTEMEN, { message: "Departemen belum terisi" }),
  tanggal: z.date({ invalid_type_error: "Tanggal tidak valid" }),
  status: z.number().refine((val) => val >= 0 && val <= 3, {
    message: "Status belum terisi",
  }),
});
