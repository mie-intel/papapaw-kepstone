"use client";
import React from "react";
import Navbar from "@/components/allPage/Navbar";
import SidebarHeader from "@/components/allPage/SidebarHeader";
import { usePathname } from "next/navigation";
import { BiSolidDashboard } from "react-icons/bi";
import { IoIosCreate } from "react-icons/io";

const kepalaNavItems = [
  { name: "Dashboard", href: "/kepala/dashboard", icon: <BiSolidDashboard /> },
  { name: "History", href: "/kepala/history", icon: <IoIosCreate /> },
];

export default function KepalaLayout({ children }) {
  const pathname = usePathname();
  const currentActiveItem = kepalaNavItems.find((item) => item.href === pathname)?.name;

  return (
    <div className="flex h-full w-full">
      <Navbar userRole="Kepala Bagian" navItems={kepalaNavItems} activeItem={currentActiveItem} />
      <SidebarHeader role="Kepala Bagian" namaAkun="Poli GG Gaming">
        {children}
      </SidebarHeader>
    </div>
  );
}
