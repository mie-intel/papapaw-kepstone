"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button1, Button2, Button3 } from "../allPage/Button";
import Image from "next/image";
import InputForm from "../allPage/InputForm";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setErrorMsg("");

    const trimmedUser = username.trim();

    if (!trimmedUser || trimmedUser !== "admin") {
      setErrorMsg("Username salah");
    } else if (!password || password !== "1234") {
      setErrorMsg("Password salah");
    } else {
      console.log("Login Berhasil!");
      console.log({ username, password });
    }
  };

  return (
    <div className="font-jakarta relative flex min-h-screen w-full items-center justify-center overflow-hidden p-5">
      {/* MOBILE */}
      <div className="flex min-h-screen w-full max-w-sm flex-col items-center justify-between pt-[10vw] pb-[15vw] lg:hidden">
        <div className="text-center">
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
          />
          <InputForm
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMsg && <p className="text-red-primary text-center text-sm">{errorMsg}</p>}
        </form>

        <div className="flex w-full flex-col gap-3">
          <Button1 type="submit" label="Log in" onClick={handleSubmit} />
          <Button2
            type="button"
            label="Create new account"
            onClick={() => router.push("/register")}
          />
        </div>
      </div>

      {/* DESKTOP */}
      <div className="relative hidden lg:block">
        <div className="relative z-20 w-[500px] rounded-4xl bg-white/10 p-10 text-white shadow-[inset_0px_0px_30px_rgba(255,255,255,0.25)] backdrop-blur-[20px]">
          <h2 className="mb-8 text-center text-3xl font-extrabold">Login to your account</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-7" autoComplete="off">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="box-border w-full border-b-2 border-black/50 bg-transparent p-[10px] text-center text-base placeholder-white/70 outline-none focus:border-white"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="box-border w-full border-b-2 border-black/50 bg-transparent p-[10px] text-center text-base placeholder-white/70 outline-none focus:border-white"
            />

            <Button3 type="submit" label="Login" />
          </form>
          <p
            className="mt-3 cursor-pointer text-left text-xs text-white/80 hover:underline"
            onClick={() => router.push("/register")}
          >
            Create an account
          </p>

          {errorMsg && <p className="text-red-primary mt-3 text-center text-xs">{errorMsg}</p>}
        </div>

        {/* BOLLB */}
        <div className="absolute bottom-[-80px] left-[-80px] z-10 hidden h-[200px] w-[200px] rounded-full bg-[#34D391] lg:block" />
        <div className="absolute top-[-80px] right-[-80px] z-10 hidden h-[200px] w-[200px] rounded-full bg-[#E8697E] lg:block" />
      </div>
    </div>
  );
}
