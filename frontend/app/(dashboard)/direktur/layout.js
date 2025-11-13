"use client";
import React from "react";
import PropTypes from "prop-types";
import Navbar from "@/components/allPage/Navbar";
import SidebarHeader from "@/components/allPage/SidebarHeader";
import { usePathname } from "next/navigation";
import { BiSolidDashboard } from "react-icons/bi";
import { FaHistory } from "react-icons/fa";

const direkturNavItems = [
  { name: "Dashboard", href: "/direktur/dashboard", icon: <BiSolidDashboard /> },
  { name: "History", href: "/direktur/history", icon: <FaHistory /> },
];

export default function DirekturLayout({ children }) {
  const pathname = usePathname();
  const currentActiveItem = direkturNavItems.find((item) => item.href === pathname)?.name;

  return (
    <div className="flex h-full w-full">
      <Navbar userRole="Direktur" navItems={direkturNavItems} activeItem={currentActiveItem} />
      <SidebarHeader role="Direktur" namaAkun="Poli GG Gaming">
        {children}
      </SidebarHeader>
    </div>
  );
}

DirekturLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
