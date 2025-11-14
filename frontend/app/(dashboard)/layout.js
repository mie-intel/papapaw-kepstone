import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

export const metadata = {
  title: "Dashboard",
  description: "Solanum Dashboard",
};

export default function DashboardLayout({ children }) {
  return (
    <div className="relative flex w-full flex-col bg-[#2B2E4D] lg:h-screen lg:pt-12 lg:pl-5">
      <div className="absolute top-2 right-5 hidden flex-row items-center gap-1 text-nowrap lg:flex">
        <Image
          src={"/logo.png"}
          alt="foto profile"
          width={100}
          height={100}
          className="h-[30px] w-full"
        />
        <p className="font-light text-white">Poli GG Gaming</p>
      </div>
      {children}
    </div>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
