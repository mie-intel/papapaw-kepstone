import React from "react";
import PropTypes from "prop-types";

export default function Severity({ level }) {
  let colorClasses = "";
  let label = "";

  switch (level) {
    case 3:
      label = "Severe";
      colorClasses = "bg-[#E8697E]";
      break;
    case 2:
      label = "Moderate";
      colorClasses = "bg-[#FDBC64]";
      break;
    case 1:
      label = "Minor";
      colorClasses = "bg-[#34D391]";
      break;
    default:
      label = "Unknown";
      colorClasses = "bg-gray-600/20";
  }

  return (
    <div
      className={`font-jakarta inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold text-white ${colorClasses} min-w-[80px]`}
    >
      {label}
    </div>
  );
}

Severity.propTypes = {
  level: PropTypes.number,
};
