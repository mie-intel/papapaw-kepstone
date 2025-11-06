import React from "react";

export default function InputForm({
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  ...rest //sisa kalo butuh yg lain
}) {
  const classUtama =
    "w-full rounded-2xl border border-[#A3A5B1] bg-transparent p-4 text-white placeholder-white/70 outline-none focus:ring-1 focus:ring-white";
  const allClasses = `${classUtama} ${className}`.trim();

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
