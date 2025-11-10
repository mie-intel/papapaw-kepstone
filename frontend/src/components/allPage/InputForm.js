import React from "react";

export default function InputForm({
  type = "text",
  placeholder,
  value,
  onChange,
  showError = false,
  className = "",
  ...rest //sisa kalo butuh yg lain
}) {
  const hasError = showError && (!value || value.trim() === "");
  const borderColor = hasError
    ? "border-[#E8697E] focus:ring-[#E8697E]"
    : "border-[#A3A5B1] focus:ring-white";
  const classUtama =
    "w-full rounded-2xl border bg-transparent p-4 text-white placeholder-white/70 outline-none transition-all duration-200 focus:ring-1";
  const allClasses = `${classUtama} ${borderColor} ${className}`.trim();

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={allClasses}
      {...rest}
    />
  );
}
