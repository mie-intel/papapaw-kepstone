"use client";
import React from "react";
import PropTypes from "prop-types";

export default function CardReport({ label, value, icon }) {
  return (
    <div className="flex w-[170px] flex-row justify-between rounded-lg border border-[#B4B4B4] px-5 py-3 shadow-xl">
      <div className="flex flex-col justify-center">
        <p className="text-[10px] text-[#C4C4C4]">{label}</p>
        <p className="text-xl font-medium">{value}</p>
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
