"use client";
import React from "react";

// Blue Button
export function Button1({ label, onClick, type = "button", disabled = false, className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`mt-5 w-full cursor-pointer rounded-2xl bg-[#0273EA] p-3 text-lg font-bold transition-colors duration-300 ease-in-out hover:bg-[#0056B3] disabled:opacity-50 ${className}`}
    >
      {label}
    </button>
  );
}

// Grey Button
export function Button2({ label, onClick, type = "button", disabled = false, className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-gray-primary/15 hover:bg-gray-primary/40 w-full cursor-pointer rounded-2xl p-3 text-lg font-bold text-white/60 transition-colors duration-300 ease-in-out hover:text-white ${className}`}
    >
      {label}
    </button>
  );
}

// Blue Rounded Button
export function Button3({ label, onClick, type = "button", disabled = false, className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`mt-5 w-full cursor-pointer rounded-full bg-[#0273EA] p-3 text-xl font-extrabold shadow-[2px_3px_6px_rgba(0,0,0,0.6)] transition-colors duration-300 ease-in-out hover:bg-[#0056B3] disabled:opacity-50 ${className}`}
    >
      {label}
    </button>
  );
}
