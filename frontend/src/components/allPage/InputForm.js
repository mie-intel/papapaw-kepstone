"use client"; // Diperlukan untuk hook React

import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format, parse, isValid } from "date-fns"; // Impor helper tanggal

export default function InputForm({
  type = "text",
  placeholder,
  value,
  onChange,
  showError = false,
  className = "",
  name, // Ambil 'name' prop
  ...rest
}) {
  // Hitung class CSS di awal
  const hasError = showError && (!value || value.trim() === "");
  const borderColor = hasError
    ? "border-[#E8697E] focus:ring-[#E8697E]"
    : "border-[#A3A5B1] focus:ring-white";
  const classUtama =
    "w-full rounded-2xl border bg-transparent p-4 text-white placeholder-white/70 outline-none transition-all duration-200 focus:ring-1";
  const allClasses = `${classUtama} ${borderColor} ${className}`.trim();

  if (type === "date") {
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const popoverRef = useRef(null);

    // Format yang akan dilihat pengguna (sesuai placeholder Anda)
    const DISPLAY_FORMAT = "MM/dd/yyyy";

    // 1. Konversi 'value' (string) menjadi objek Date untuk DayPicker
    let selectedDate = undefined;
    if (value) {
      const parsed = parse(value, DISPLAY_FORMAT, new Date());
      if (isValid(parsed)) {
        selectedDate = parsed;
      }
    }

    // 2. Saat tanggal dipilih (DayPicker mengembalikan objek Date)
    const handleDaySelect = (date) => {
      // Format objek Date kembali menjadi string
      const dateString = date ? format(date, DISPLAY_FORMAT) : "";

      // Buat 'event' palsu agar konsisten dengan onChange input biasa
      const syntheticEvent = {
        target: {
          name: name || "date", // Gunakan 'name' prop
          value: dateString,
        },
      };

      onChange(syntheticEvent); // Kirim 'event' ke parent
      setIsPickerOpen(false); // Tutup kalender
    };

    // Efek untuk menutup kalender saat klik di luar
    useEffect(() => {
      function handleClickOutside(event) {
        if (popoverRef.current && !popoverRef.current.contains(event.target)) {
          setIsPickerOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [popoverRef]);

    return (
      <div className="relative w-full" ref={popoverRef}>
        {/* Ini adalah input yang dilihat pengguna */}
        <input
          type="text" // Gunakan 'text' agar placeholder dan styling berfungsi
          placeholder={placeholder}
          value={value} // 'value' adalah string "MM/dd/yyyy"
          onFocus={() => setIsPickerOpen(true)} // Buka kalender saat di-klik
          readOnly // Cegah pengguna mengetik manual
          className={allClasses}
          {...rest}
        />

        {/* Pop-up Kalender */}
        {isPickerOpen && (
          <div className="absolute z-10 mt-2 rounded-lg border border-slate-600 bg-slate-900 text-white shadow-lg">
            <DayPicker
              mode="single"
              selected={selectedDate} // Berikan objek Date
              onSelect={handleDaySelect} // Handler kustom kita
              initialFocus
              // Styling kustom untuk tema gelap
              classNames={{
                root: "p-4",
                caption: "flex justify-between items-center mb-4",
                nav_button: "h-8 w-8 p-1 rounded-full hover:bg-slate-700",
                head_row: "flex mb-2",
                head_cell:
                  "w-10 h-10 flex items-center justify-center text-sm font-medium text-gray-400",
                row: "flex w-full mt-2",
                cell: "w-10 h-10 flex items-center justify-center text-sm relative",
                day: "w-10 h-10 p-0 rounded-full hover:bg-slate-700 cursor-pointer",
                day_selected: "bg-blue-500 text-white font-bold hover:bg-blue-600",
                day_today: "font-bold text-blue-400",
                day_outside: "text-gray-600 opacity-50",
              }}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={allClasses}
      name={name}
      {...rest}
    />
  );
}

InputForm.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  showError: PropTypes.bool,
  className: PropTypes.string,
  name: PropTypes.string, // Tambahkan prop 'name'
};
