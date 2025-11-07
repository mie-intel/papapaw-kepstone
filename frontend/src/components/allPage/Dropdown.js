import React, { useState, useRef } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

export function Dropdown1({ name, options, formData, handleChange, placeholder }) {
  const [open, setOpen] = useState(false);
  const selected = formData?.[name] || "";

  function onSelect(opt) {
    setOpen(false);
    if (typeof handleChange === "function") {
      handleChange({ target: { name, value: opt } });
    }
  }

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="flex w-full items-center justify-between rounded-2xl border border-[#A3A5B1] bg-transparent p-4 text-left transition-all outline-none focus:ring-1 focus:ring-white"
      >
        <span className={`${selected ? "text-white" : "text-white/70"}`}>
          {selected || placeholder}
        </span>

        <IoMdArrowDropdown
          className={`text-xl text-[#A3A5B1] transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {open && (
        <div
          className="animate-fade-down absolute right-0 left-0 z-20 mt-2"
          style={{ animationDuration: "150ms" }}
        >
          <div className="overflow-hidden rounded-2xl border border-[#A3A5B1] bg-[#2B2E4D] shadow-xl">
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => onSelect(opt)}
                className={`w-full p-4 text-left transition hover:bg-[#3B3E5D] focus:bg-[#3B3E5D] ${selected === opt ? "bg-[#41446B]" : ""}`}
              >
                <span className="text-white">{opt}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function Dropdown2({ name, options, value, onChange, placeholder }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = value || "";

  function handleSelect(opt) {
    onChange({ target: { name, value: opt } });
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`box-border flex w-full items-center justify-between border-b-2 border-black/50 bg-transparent p-1 text-left text-base transition-colors outline-none focus:border-white ${selected ? "text-white" : "text-white/70"}`}
      >
        {selected || placeholder}
        <IoMdArrowDropdown
          className={`ml-2 text-lg transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {open && (
        <div
          className="animate-fade-down absolute right-0 left-0 z-20 mt-2"
          style={{ animationDuration: "150ms" }}
        >
          <div className="overflow-hidden rounded-2xl border border-[#A3A5B1] bg-[#2B2E4D] shadow-xl">
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => handleSelect(opt)}
                className={`w-full p-4 text-left text-white transition-colors hover:bg-[#3B3E5D] focus:bg-[#3B3E5D] ${
                  selected === opt ? "bg-[#41446B]" : ""
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
