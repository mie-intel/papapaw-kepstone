// Testing page
"use client";
import React, { useState } from "react";
import Navbar from "@/components/allPage/Navbar";
import { BiSolidDashboard } from "react-icons/bi";
import { IoIosCreate } from "react-icons/io";

const hseNavItems = [
  { name: "Dashboard", href: "#", icon: <BiSolidDashboard /> },
  { name: "Create Report", href: "#", icon: <IoIosCreate /> },
];

export default function Page() {
  const currentUserRole = "HSE";
  const [currentActivePage, setCurrentActivePage] = useState("Dashboard");

  return (
    <div className="flex">
      <Navbar
        userRole={currentUserRole}
        navItems={hseNavItems}
        activeItem={currentActivePage}
        onChangeActive={setCurrentActivePage}
      />

      <main className="ml-64 min-h-screen flex-grow bg-gray-100 p-8">
        <h1 className="text-2xl font-bold">Halaman Konten Utama</h1>
        <p>Active: {currentActivePage}</p>
      </main>
    </div>
  );
}
