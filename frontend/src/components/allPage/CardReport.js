"use client";
import React from "react";
import PropTypes from "prop-types";

export default function CardReport({ label, value, icon }) {
  return (
    <div className="flex w-[120px] flex-col-reverse items-center justify-between gap-2 rounded-lg border border-[#B4B4B4] px-5 py-3 shadow-xl md:w-[170px] md:flex-row md:gap-0">
      <div className="flex flex-col items-center justify-center md:items-start">
        <p className="text-center text-base text-[#C4C4C4] md:text-[10px]">{label}</p>
        <p className="text-2xl font-semibold md:text-xl">{value}</p>
      </div>

      <div className="flex items-center">{icon}</div>
    </div>
  );
}

CardReport.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.node,
};
