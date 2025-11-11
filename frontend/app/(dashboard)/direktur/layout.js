"use client";
import React from "react";
import Navbar from "@/components/allPage/Navbar";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BiSolidDashboard } from "react-icons/bi";
import { IoIosCreate } from "react-icons/io";

const direkturNavItems = [
  { name: "Dashboard", href: "/direktur/dashboard", icon: <BiSolidDashboard /> },
  { name: "History", href: "/direktur/history", icon: <IoIosCreate /> },
];

export default function DirekturLayout({ children }) {
  const pathname = usePathname();
  const currentActiveItem = direkturNavItems.find((item) => item.href === pathname)?.name;

  return (
    <div className="flex h-full w-full">
      <Navbar userRole="Direktur" navItems={direkturNavItems} activeItem={currentActiveItem} />
      <main className="flex-grow justify-center space-y-5 bg-[#1A1B37] p-5 lg:rounded-tl-2xl">
        <div className="flex flex-row justify-between lg:hidden">
          <div className="flex flex-row space-x-2">
            <Image src={"/logo.png"} alt="logo" width={70} height={70} className="h-fit w-[70px]" />
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-white">SOLANUM</h1>
              <span className="text-xs tracking-wider text-[#B5B5B5]">Direktur</span>
            </div>
          </div>

          <div className="flex flex-row items-center">
            <p className="font-light text-white">Poli GG Gaming</p>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
