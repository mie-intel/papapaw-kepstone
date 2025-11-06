"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dropdown1, Dropdown2 } from "../allPage/Dropdown";
import { Button1, Button2, Button3 } from "../allPage/Button";
import InputForm from "../allPage/InputForm";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    noInduk: "",
    nama: "",
    jabatan: "",
    departemen: "",
    username: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const { noInduk, nama, jabatan, departemen, username, password } = formData;
    if (!noInduk || !nama || !jabatan || !departemen || !username || !password) {
      setErrorMsg("Terdapat field kosong");
      return;
    }

    setErrorMsg("");
    setSuccessMsg("Akun berhasil dibuat!\n Mengalihkan ke halaman Login...");
  };

  return (
    <div className="font-jakarta relative flex min-h-screen w-full items-center justify-center overflow-hidden p-5">
      {/* MOBILE */}
      <div className="flex min-h-screen w-full max-w-sm flex-col items-center justify-between pt-[5vw] pb-[10vw] lg:hidden">
        {/* LOGO */}
        <div className="mb-10 text-center">
          <div className="flex items-end justify-center">
            <Image
              src={"/logo.png"}
              alt="logoooo solanum"
              width={500}
              height={500}
              className="h-full w-[10vw]"
            />
            <span className="text-3xl font-bold">SOLANUM.</span>
            <span className="text-sm font-light text-white/80">agrotech</span>
          </div>
          <p className="text-sm text-white/80">Anywhere you farm, we power progress</p>
        </div>

        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4" autoComplete="off">
          <InputForm
            type="text"
            name="noInduk"
            placeholder="No. Induk"
            value={formData.noInduk}
            onChange={handleChange}
          />
          <InputForm
            type="text"
            name="nama"
            placeholder="Nama"
            value={formData.nama}
            onChange={handleChange}
          />
          <Dropdown1
            formData={formData}
            handleChange={handleChange}
            name="jabatan"
            placeholder="Pilih Jabatan"
            options={["HSE", "Direktur", "Kepala Bagian"]}
          />
          <Dropdown1
            name="departemen"
            formData={formData}
            handleChange={handleChange}
            placeholder="Pilih Departemen"
            options={[
              "Mechanical Assembly",
              "Electronical Assembly",
              "Software Installation",
              "Quality Assurance",
              "Warehouse",
              "Direktur",
            ]}
          />
          <InputForm
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <InputForm
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          {errorMsg && <p className="text-center text-sm text-[#E8697E]">{errorMsg}</p>}
          {successMsg && <p className="text-green-primary text-center text-sm">{successMsg}</p>}
        </form>

        <div className="flex w-full flex-col gap-3">
          <Button1 type="submit" disabled={!!successMsg} label="Sign Up" onClick={handleSubmit} />
          <Button2
            type="button"
            label="I already have an account"
            onClick={() => router.push("/login")}
          />
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden items-center justify-center lg:relative lg:flex">
        <div className="relative z-20 w-[55vw] rounded-4xl bg-white/10 p-10 text-white shadow-[inset_0px_0px_30px_rgba(255,255,255,0.25)] backdrop-blur-[20px] lg:w-[600px]">
          <h2 className="mb-8 text-center text-3xl font-extrabold">Sign Up</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6" autoComplete="off">
            <input
              type="text"
              name="noInduk"
              placeholder="No. Induk"
              value={formData.noInduk}
              onChange={handleChange}
              className="box-border w-full border-b-2 border-black/50 bg-transparent p-1 text-base placeholder-white/70 outline-none focus:border-white"
            />
            <input
              type="text"
              name="nama"
              placeholder="Nama"
              value={formData.nama}
              onChange={handleChange}
              className="box-border w-full border-b-2 border-black/50 bg-transparent p-1 text-base placeholder-white/70 outline-none focus:border-white"
            />
            <Dropdown2
              name="jabatan"
              placeholder="Pilih Jabatan"
              value={formData.jabatan}
              onChange={handleChange}
              options={["HSE", "Kepala Bagian", "Direktur"]}
            />
            <Dropdown2
              name="departemen"
              placeholder="Pilih Departemen"
              value={formData.departemen}
              onChange={handleChange}
              options={[
                "Mechanical Assembly",
                "Electronical Assembly",
                "Software Installation",
                "Quality Assurance",
                "Warehouse",
              ]}
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="box-border w-full border-b-2 border-black/50 bg-transparent p-1 text-base placeholder-white/70 outline-none focus:border-white"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="box-border w-full border-b-2 border-black/50 bg-transparent p-1 text-base placeholder-white/70 outline-none focus:border-white"
            />

            <Button3 type="submit" disabled={!!successMsg} label="Sign Up" />
          </form>

          {errorMsg && <p className="text-red-primary mt-3 text-center text-xs">{errorMsg}</p>}
          {successMsg && (
            <p className="text-green-primary mt-3 text-center text-xs">{successMsg}</p>
          )}

          <p className="mt-4 text-center text-xs text-white/80">
            Already have an account?{" "}
            <span
              className="cursor-pointer text-[#007FFF] hover:underline"
              onClick={() => router.push("/login")}
            >
              Login
            </span>
          </p>
        </div>

        {/* BOLBOLBOLB */}
        <div className="absolute bottom-[10px] left-[-120px] z-10 hidden h-[200px] w-[200px] rounded-full bg-[#34D391] lg:block" />
        <div className="absolute top-[10px] right-[-120px] z-10 hidden h-[200px] w-[200px] rounded-full bg-[#E8697E] lg:block" />
      </div>
    </div>
  );
}
