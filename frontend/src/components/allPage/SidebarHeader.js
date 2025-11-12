"use client";
import Image from "next/image";

const SidebarHeader = ({ role, namaAkun, children }) => {
  return (
    <main className="flex-grow justify-center space-y-5 bg-[#1A1B37] p-5 lg:rounded-tl-2xl">
      <div className="flex flex-row justify-between lg:hidden">
        <div className="flex flex-row space-x-2">
          <Image src={"/logo.png"} alt="logo" width={70} height={70} className="h-fit w-[70px]" />
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-white">SOLANUM</h1>
            <span className="text-xs tracking-wider text-[#B5B5B5]">{role}</span>
          </div>
        </div>

        <div className="flex flex-row items-center">
          <p className="font-light text-white">{namaAkun}</p>
        </div>
      </div>
      {children}
    </main>
  );
};

SidebarHeader.propTypes = {
  role: String,
  namaAkun: String,
  children: Object,
};

export default SidebarHeader;
