"use client";
import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";
import { MdLogout } from "react-icons/md";

function NavItem({ item, isActive, onClick }) {
  return (
    <li className="px-4 py-1 lg:px-4 lg:py-1">
      <Link
        href={item.href}
        className={`flex cursor-pointer flex-col items-center space-y-1 rounded-lg py-2 transition-colors duration-200 lg:flex-row lg:space-y-0 lg:space-x-3 lg:px-4 lg:py-3 ${
          isActive
            ? "text-white lg:bg-[#0273EA] lg:shadow-lg"
            : "hover:bg-opacity-50 text-gray-400 lg:text-gray-300 lg:hover:bg-[#C4C4C4]/20"
        } `}
      >
        <span
          className={`text-2xl lg:text-xl ${isActive ? "text-[#0273EA] lg:text-white" : "text-[#B5B5B5] lg:text-white"}`}
        >
          {item.icon}
        </span>
        <span
          className={`text-xs font-medium lg:text-base ${isActive ? "text-[#0273EA] lg:text-white" : "text-[#B5B5B5] lg:text-white"}`}
        >
          {item.name}
        </span>
      </Link>
    </li>
  );
}

export default function Navbar({ userRole, navItems, activeItem, onChangeActive }) {
  return (
    <aside className="fixed bottom-5 left-1/2 z-50 flex w-[80%] -translate-x-1/2 flex-row rounded-3xl border-2 border-[#818181] bg-[#37383C] text-gray-200 shadow-lg lg:static lg:h-full lg:w-64 lg:translate-x-0 lg:flex-col lg:rounded-t-none lg:rounded-tl-2xl lg:rounded-b-none lg:border-0 lg:bg-gradient-to-b lg:from-[#1A1B37] lg:via-[#1A1B37] lg:via-60% lg:to-[#2B2E4D] lg:shadow-[inset_-8px_0_16px_#2B2E4D]">
      <div className="hidden items-center space-x-3 p-5 lg:flex">
        <Image src={"/logo.png"} alt="logo" width={70} height={70} className="h-fit w-[70px]" />
        <div>
          <h1 className="text-xl font-bold text-white">SOLANUM</h1>
          <span className="text-xs tracking-wider text-[#B5B5B5]">{userRole}</span>
        </div>
      </div>

      <hr className="hidden border-2 border-t border-[#2B2E4D] opacity-50 lg:block" />

      <nav className="w-full flex-grow lg:py-4">
        <ul className="flex items-center justify-around px-4 lg:flex-col lg:items-stretch lg:justify-start lg:px-0">
          {navItems.map((item) => (
            <NavItem
              key={item.name}
              item={item}
              isActive={activeItem === item.name}
              onClick={(name) => onChangeActive && onChangeActive(name)}
            />
          ))}

          <button className="flex cursor-pointer flex-col items-center justify-center space-y-1 py-2 lg:hidden">
            <MdLogout size={22} className="text-[#B5B5B5]" />
            <span className="text-xs font-medium text-[#B5B5B5]">Logout</span>
          </button>
        </ul>
      </nav>

      <hr className="hidden border-2 border-t border-[#191A36] opacity-50 lg:block" />

      <div className="hidden p-4 lg:block">
        <button className="flex w-full cursor-pointer items-center space-x-3 rounded-lg px-4 py-3 text-[#E8697E] transition-colors duration-200 hover:bg-[#C4C4C4]/5">
          <MdLogout size={22} className="text-[#E8697E]" />
          <span className="font-jakarta font-bold">Logout</span>
        </button>
      </div>
    </aside>
  );
}

NavItem.propTypes = {
  item: PropTypes.shape({
    href: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

Navbar.propTypes = {
  userRole: PropTypes.string.isRequired,
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  activeItem: PropTypes.string.isRequired,
  onChangeActive: PropTypes.func,
};
