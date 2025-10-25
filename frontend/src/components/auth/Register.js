'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Dropdown1, Dropdown2 } from '../allPage/Dropdown';
import { Button1, Button2, Button3 } from '../allPage/Button';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    noInduk: '',
    nama: '',
    jabatan: '',
    departemen: '',
    username: '',
    password: '',
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const { noInduk, nama, jabatan, departemen, username, password } = formData;
    if (!noInduk || !nama || !jabatan || !departemen || !username || !password) {
      setErrorMsg('Terdapat field kosong');
      return;
    }

    setErrorMsg('');
    setSuccessMsg('Akun berhasil dibuat!\n Mengalihkan ke halaman Login...');
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen w-full overflow-hidden font-jakarta p-5">
      {/* MOBILE */}
      <div className="lg:hidden w-full max-w-sm flex flex-col justify-between items-center min-h-screen pt-[5vw] pb-[10vw]">
        {/* LOGO */}
        <div className="text-center mb-10">
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

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4" autoComplete='off'>
          <input
            type="text"
            name="noInduk"
            placeholder="No. Induk"
            value={formData.noInduk}
            onChange={handleChange}
            className="w-full p-4 bg-transparent border border-[#A3A5B1] rounded-2xl text-white placeholder-white/70 outline-none focus:ring-1 focus:ring-white"
          />
          <input
            type="text"
            name="nama"
            placeholder="Nama"
            value={formData.nama}
            onChange={handleChange}
            className="w-full p-4 bg-transparent border border-[#A3A5B1] rounded-2xl text-white placeholder-white/70 outline-none focus:ring-1 focus:ring-white"
          />

          <Dropdown1
            formData={formData}
            handleChange={handleChange}
            name="jabatan"
            placeholder="Pilih Jabatan"
            options={['HSE', 'Direktur', 'Kepala Bagian']}
          />
          <Dropdown1
            name="departemen"
            formData={formData}
            handleChange={handleChange}
            placeholder="Pilih Departemen"
            options={[
              'Mechanical Assembly',
              'Electronical Assembly',
              'Software Installation',
              'Quality Assurance',
              'Warehouse',
              'Direktur'
            ]}
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-4 bg-transparent border border-[#A3A5B1] rounded-2xl text-white placeholder-white/70 outline-none focus:ring-1 focus:ring-white"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-4 bg-transparent border border-[#A3A5B1] rounded-2xl text-white placeholder-white/70 outline-none focus:ring-1 focus:ring-white"
          />

          {errorMsg && (
            <p className="text-center text-[#E8697E] text-sm">{errorMsg}</p>
          )}
          {successMsg && (
            <p className="text-center text-green-primary text-sm">{successMsg}</p>
          )}
        </form>

        <div className='w-full flex flex-col gap-3'>
          <Button1
            type="submit"
            disabled={!!successMsg}
            label="Sign Up"
            onClick={handleSubmit}
          />
          <Button2
            type="button"
            label="I already have an account"
            onClick={() => router.push('/login')}
          />
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden lg:relative lg:flex justify-center items-center">
        <div className="relative z-20 lg:w-[600px] w-[55vw] p-10 bg-white/10 text-white backdrop-blur-[20px] rounded-4xl shadow-[inset_0px_0px_30px_rgba(255,255,255,0.25)]">
          <h2 className="text-center mb-8 text-3xl font-extrabold">
            Sign Up
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6" autoComplete='off'>
            <input
              type="text"
              name="noInduk"
              placeholder="No. Induk"
              value={formData.noInduk}
              onChange={handleChange}
              className="w-full p-1 bg-transparent border-b-2 border-black/50 text-base outline-none placeholder-white/70 focus:border-white box-border"
            />
            <input
              type="text"
              name="nama"
              placeholder="Nama"
              value={formData.nama}
              onChange={handleChange}
              className="w-full p-1 bg-transparent border-b-2 border-black/50 text-base outline-none placeholder-white/70  focus:border-white box-border"
            />
            <Dropdown2
              name="jabatan"
              placeholder="Pilih Jabatan"
              value={formData.jabatan}
              onChange={handleChange}
              options={['HSE', 'Kepala Bagian', 'Direktur']}
            />
            <Dropdown2
              name="departemen"
              placeholder="Pilih Departemen"
              value={formData.departemen}
              onChange={handleChange}
              options={[
                'Mechanical Assembly',
                'Electronical Assembly',
                'Software Installation',
                'Quality Assurance',
                'Warehouse',
              ]}
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-1 bg-transparent border-b-2 border-black/50 text-base outline-none placeholder-white/70 focus:border-white box-border"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-1 bg-transparent border-b-2 border-black/50 text-base outline-none placeholder-white/70 focus:border-white box-border"
            />

            <Button3
              type="submit"
              disabled={!!successMsg}
              label="Sign Up"
            />
          </form>

          {errorMsg && (
            <p className="mt-3 text-center text-red-primary text-xs">
              {errorMsg}
            </p>
          )}
          {successMsg && (
            <p className="mt-3 text-center text-green-primary text-xs">
              {successMsg}
            </p>
          )}

          <p className="mt-4 text-xs text-white/80 text-center">
            Already have an account?{' '}
            <span
              className="text-[#007FFF] cursor-pointer hover:underline"
              onClick={() => router.push('/login')}
            >
              Login
            </span>
          </p>
        </div>

        {/* BOLBOLBOLB */}
        <div className="hidden lg:block absolute left-[-120px] bottom-[10px] w-[200px] h-[200px] rounded-full bg-[#34D391] z-10"></div>
        <div className="hidden lg:block absolute right-[-120px] top-[10px] w-[200px] h-[200px] rounded-full bg-[#E8697E] z-10"></div>
      </div>
    </div>
  );
}
