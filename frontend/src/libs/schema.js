import z from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .refine((val) => val === "admin", { message: "Username salah" }),
  password: z.string().refine((val) => val === "1234", { message: "Password salah" }),
});

export const registerSchema = z.object({
  nomorInduk: z.string().trim().min(1, { message: "Data belum lengkap" }),
  nama: z.string().trim().min(1, { message: "Data belum lengkap" }),
  jabatan: z.string().min(1, { message: "Data belum lengkap" }),
  departemen: z.string().min(1, { message: "Data belum lengkap" }),
  username: z.string().trim().min(1, { message: "Data belum lengkap" }),
  password: z.string().trim().min(1, { message: "Data belum lengkap" }),
});
