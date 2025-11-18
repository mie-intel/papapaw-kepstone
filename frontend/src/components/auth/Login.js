"use client";
import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { Button1, Button2 } from "../allPage/Button";
import Image from "next/image";
import InputForm from "../allPage/InputForm";
import Cookies from "js-cookie";
import { AuthContext } from "../contexts/AuthContext";
import "@/styles/auth.css";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    const response = await login(username, password);
    if (!response.success) {
      setErrorMsg(response.error);
      setShowErrors(true);
      setLoading(false);
      return;
    }
    const role = Cookies.get("role");
    setLoading(false);
    setShowErrors(false);
    setErrorMsg("");
    switch (role) {
      case "HSE":
        router.push("/hse/dashboard");
        break;
      case "Kepala Bagian":
        router.push("/kepala/dashboard");
        break;
      case "Direktur":
        router.push("/direktur/dashboard");
        break;
    }
  };

  return (
    <>
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
        <div className="relative z-10 flex min-h-screen w-full max-w-sm flex-col items-center justify-between pt-[10vw] pb-[15vw] lg:justify-center">
          {/* Logo Mobile */}
          <div className="text-center lg:hidden">
            <div className="flex items-end justify-center">
              <Image src={"/logo.png"} alt="logo solanum" width={40} height={40} />
              <span className="text-2xl font-bold">SOLANUM.</span>
              <span className="text-sm font-light text-white/80">agrotech</span>
            </div>
            <p className="text-sm text-white/80">Anywhere you farm, we power progress</p>
          </div>

          <h2 className="mb-10 hidden text-4xl font-extrabold lg:flex">Login</h2>
          <form
            id="loginForm"
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-4"
            autoComplete="off"
          >
            <InputForm
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              showError={showErrors}
            />
            <InputForm
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              showError={showErrors}
            />
          </form>

          <div className="relative flex w-full flex-col gap-3">
            <Button1 type="submit" label="Login" onClick={handleSubmit} disabled={loading} />
            <Button2
              type="button"
              label="Create new account"
              onClick={() => router.push("/register")}
            />

            {errorMsg && (
              <p className="animate-fade-in absolute top-[105%] left-1/2 -translate-x-1/2 text-sm text-[#E8697E]">
                {errorMsg}
              </p>
            )}
          </div>
        </div>

        {/* ANIMATED BLOBS */}
        <div className="blob-green absolute bottom-[120px] left-[120px] z-0 hidden h-[200px] w-[200px] rounded-full bg-[#34D391] blur-xs lg:block" />
        <div className="blob-pink absolute top-[60px] right-[120px] z-0 hidden h-[200px] w-[200px] rounded-full bg-[#E8697E] blur-lg lg:block" />
      </div>
    </>
  );
}
