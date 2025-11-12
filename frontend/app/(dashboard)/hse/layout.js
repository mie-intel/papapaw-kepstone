"use client";
import React from "react";
import Navbar from "@/components/allPage/Navbar";
import SidebarHeader from "@/components/allPage/SidebarHeader";
import { usePathname } from "next/navigation";
import { BiSolidDashboard } from "react-icons/bi";
import { IoIosCreate } from "react-icons/io";

const hseNavItems = [
  { name: "Dashboard", href: "/hse/dashboard", icon: <BiSolidDashboard /> },
  { name: "Create Report", href: "/hse/create", icon: <IoIosCreate /> },
];

export default function HseLayout({ children }) {
  const pathname = usePathname();
  const currentActiveItem = hseNavItems.find((item) => item.href === pathname)?.name;

  return (
    <div className="flex h-full w-full">
      <Navbar userRole="HSE" navItems={hseNavItems} activeItem={currentActiveItem} />
      <SidebarHeader role="HSE" namaAkun="Poli GG Gaming">
        {children}
      </SidebarHeader>
    </div>
  );
}
