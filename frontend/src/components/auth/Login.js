'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button1, Button2, Button3 } from '../allPage/Button';
import Image from 'next/image';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    const trimmedUser = username.trim();

    if (!trimmedUser || trimmedUser !== 'admin') {
      setErrorMsg('Username salah');
    } else if (!password || password !== '1234') {
      setErrorMsg('Password salah');
    } else {
      console.log('Login Berhasil!');
      console.log({ username, password });
    }
  };

  return (
    <div className="relative flex justify-center font-jakarta items-center min-h-screen w-full overflow-hidden p-5">
      
      {/* MOBILE */}
      <div className="lg:hidden w-full max-w-sm flex flex-col justify-between items-center min-h-screen pt-[10vw] pb-[15vw]">
        <div className="text-center">
          <div className="flex justify-center items-end">
            <Image
                src={'/logo.png'}
                alt='logoooo solanum'
                width={500}
                height={500}
                className='w-[10vw] h-full'
            />
            <span className="text-3xl font-bold">SOLANUM.</span>
            <span className="text-sm font-light text-white/80">agrotech</span>
          </div>
          <p className="text-white/80 text-sm">
            Anywhere you farm, we power progress
          </p>
        </div>

        <form id='loginForm' onSubmit={handleSubmit} className="w-full flex flex-col gap-4" autoComplete='off'>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/70 outline-none focus:ring-1 focus:ring-white"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/70 outline-none focus:ring-1 focus:ring-white"
            />
            {errorMsg && (
              <p className="text-center text-red-primary text-sm">{errorMsg}</p>
            )}
        </form>

        <div className='w-full flex flex-col gap-3'>
            <Button1 type="submit" label="Log in" onClick={handleSubmit} />
            <Button2
              type="button"
              label="Create new account"
              onClick={() => router.push('/register')}
            />
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden lg:block relative">
        <div className="relative z-20 w-[500px] p-10 bg-white/10 text-white backdrop-blur-[20px] rounded-4xl shadow-[inset_0px_0px_30px_rgba(255,255,255,0.25)]">
          <h2 className="text-center mb-8 text-3xl font-extrabold">
            Login to your account
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-7" autoComplete='off'>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-[10px] text-center bg-transparent border-b-2 border-black/50 text-base outline-none placeholder-white/70 focus:border-white box-border"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-[10px] text-center bg-transparent border-b-2 border-black/50 text-base outline-none placeholder-white/70 focus:border-white box-border"
            />

            <Button3 type="submit" label="Login" />
          </form>
          <p
            className="mt-3 text-xs text-white/80 text-left cursor-pointer hover:underline"
            onClick={() => router.push('/register')}
          >
            Create an account
          </p>

          {errorMsg && (
            <p className="mt-3 text-center text-red-primary text-xs">
              {errorMsg}
            </p>
          )}
        </div>

        {/* BOLLB */}
        <div className="hidden lg:block absolute left-[-80px] bottom-[-80px] w-[200px] h-[200px] rounded-full bg-[#34D391] z-10"></div>
        <div className="hidden lg:block absolute right-[-80px] top-[-80px] w-[200px] h-[200px] rounded-full bg-[#E8697E] z-10"></div>
      </div>
    </div>
  );
}
