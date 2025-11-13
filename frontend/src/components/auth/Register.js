"use client";
import React, { useState, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dropdown1 } from "../allPage/Dropdown";
import { Button1, Button2 } from "../allPage/Button";
import InputForm from "../allPage/InputForm";
import { AuthContext } from "../contexts/AuthContext";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nomorInduk: "",
    nama: "",
    jabatan: "",
    departemen: "",
    username: "",
    password: "",
  });

  const { register } = useContext(AuthContext);

  const [errorMsg, setErrorMsg] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setShowErrors(false);

    const response = await register(formData);

    if (!response.success) {
      setErrorMsg(response.error);
      setShowErrors(true);
      setLoading(false);
      return;
    }
    setSuccessMsg(response.message || "Register successful! Redirecting to login...");

    setLoading(false);
    router.push("/login");
  };

  return (
    <div className="font-jakarta relative flex min-h-screen w-full items-center justify-center overflow-hidden p-5">
      {/* Logo Desktop */}
      <div className="absolute top-10 left-[6vw] hidden flex-col items-start text-white lg:flex">
        <div className="flex items-end">
          <Image src={"/logo.png"} alt="logo solanum" width={50} height={50} />
          <div className="flex flex-row items-end leading-tight">
            <span className="text-xl font-bold">SOLANUM.</span>
            <span className="text-sm font-light text-white/80">agrotech</span>
          </div>
        </div>
      </div>

      {/* FORM */}
      <div className="relative z-10 flex min-h-screen w-full max-w-sm flex-col items-center justify-between pt-[7vw] pb-[15vw] lg:justify-center lg:p-0">
        {/* Logo Mobile */}
        <div className="mb-5 text-center lg:mb-0 lg:hidden">
          <div className="flex items-end justify-center">
            <Image src={"/logo.png"} alt="logo solanum" width={40} height={40} />
            <span className="text-2xl font-bold">SOLANUM.</span>
            <span className="text-sm font-light text-white/80">agrotech</span>
          </div>
          <p className="text-sm text-white/80">Anywhere you farm, we power progress</p>
        </div>

        <h2 className="mb-10 hidden text-4xl font-extrabold lg:flex">Sign Up</h2>
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4" autoComplete="off">
          <InputForm
            type="text"
            name="nomorInduk"
            placeholder="No. Induk"
            value={formData.nomorInduk}
            onChange={handleChange}
            showError={showErrors}
          />
          <InputForm
            type="text"
            name="nama"
            placeholder="Nama"
            value={formData.nama}
            onChange={handleChange}
            showError={showErrors}
          />
          <Dropdown1
            formData={formData}
            handleChange={handleChange}
            name="jabatan"
            placeholder="Pilih Jabatan"
            options={["HSE", "Direktur", "Kepala Bagian"]}
            showError={showErrors}
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
            showError={showErrors}
          />
          <InputForm
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            showError={showErrors}
          />
          <InputForm
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            showError={showErrors}
          />
        </form>

        <div className="relative flex w-full flex-col gap-3">
          <Button1 type="submit" disabled={loading} label="Sign Up" onClick={handleSubmit} />
          <Button2
            type="button"
            label="I already have an account"
            onClick={() => router.push("/login")}
          />

          {errorMsg && (
            <p className="animate-fade-in absolute top-[105%] left-1/2 -translate-x-1/2 text-center text-sm text-[#E8697E]">
              {errorMsg}
            </p>
          )}
          {successMsg && (
            <p className="animate-fade-in absolute top-[105%] left-1/2 -translate-x-1/2 text-center text-sm text-[#34D391]">
              {successMsg}
            </p>
          )}
        </div>
      </div>

      {/* BOLBB */}
      <div className="absolute bottom-[120px] left-[120px] z-0 hidden h-[200px] w-[200px] rounded-full bg-[#34D391] blur-xs lg:block" />
      <div className="absolute top-[60px] right-[120px] z-0 hidden h-[200px] w-[200px] rounded-full bg-[#E8697E] blur-lg lg:block" />
    </div>
  );
}
