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
        className="w-full p-4 bg-transparent border border-[#A3A5B1] rounded-2xl outline-none focus:ring-1 focus:ring-white flex justify-between items-center text-left transition-all"
      >
        <span className={`${selected ? "text-white" : "text-white/70"}`}>
          {selected || placeholder}
        </span>

        <IoMdArrowDropdown
          className={`text-[#A3A5B1] text-xl transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {open && (
        <div
          className="absolute left-0 right-0 mt-2 z-20 animate-fade-down"
          style={{ animationDuration: "150ms" }}
        >
          <div className="rounded-2xl bg-[#2B2E4D] border border-[#A3A5B1] shadow-xl overflow-hidden">
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => onSelect(opt)}
                className={`w-full text-left p-4 hover:bg-[#3B3E5D] focus:bg-[#3B3E5D] transition
                  ${selected === opt ? "bg-[#41446B]" : ""}`}
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
        className={`w-full text-left p-1 bg-transparent border-b-2 border-black/50 text-base outline-none focus:border-white box-border flex justify-between items-center transition-colors 
            ${selected ? "text-white" : "text-white/70"}`}
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
          className="absolute left-0 right-0 mt-2 z-20 animate-fade-down"
          style={{ animationDuration: "150ms" }}
        >
          <div className="rounded-2xl bg-[#2B2E4D] border border-[#A3A5B1] shadow-xl overflow-hidden">
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => handleSelect(opt)}
                className={`w-full text-left p-4 text-white hover:bg-[#3B3E5D] focus:bg-[#3B3E5D] transition-colors ${
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