'use client';
import React from 'react';

// Blue Button
export function Button1({ label, onClick, type = 'button', disabled = false, className = '' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full p-3 bg-[#0273EA] rounded-2xl text-lg font-bold cursor-pointer 
        hover:bg-[#0056B3] transition-colors duration-300 ease-in-out 
        mt-5 disabled:opacity-50 ${className}`}
    >
      {label}
    </button>
  );
}

// Grey Button
export function Button2({ label, onClick, type = 'button', disabled = false, className = '' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full p-3 bg-gray-primary/15 rounded-2xl text-lg font-bold text-white/60 cursor-pointer 
        hover:bg-gray-primary/40  hover:text-white transition-colors duration-300 ease-in-out 
        ${className}`}
    >
      {label}
    </button>
  );
}

// Blue Rounded Button
export function Button3({ label, onClick, type = 'button', disabled = false, className = '' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full p-3 bg-[#0273EA] rounded-full text-xl font-extrabold cursor-pointer 
        hover:bg-[#0056B3] transition-colors duration-300 ease-in-out mt-5 
        shadow-[2px_3px_6px_rgba(0,0,0,0.6)] disabled:opacity-50 ${className}`}
    >
      {label}
    </button>
  );
}
