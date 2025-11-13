import React from "react";
import PropTypes from "prop-types";

export default function Severity({ level }) {
  let colorClasses = "";
  let textColor = "";

  switch (level) {
    case "Severe":
      colorClasses = "bg-[#E8697E]";
      break;
    case "Moderate":
      colorClasses = "bg-[#FDBC64]";
      break;
    case "Minor":
      colorClasses = "bg-[#34D391]";
      break;
    default:
      colorClasses = "bg-gray-600/20";
  }

  return (
    <div
      className={`font-jakarta inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold text-white ${colorClasses} min-w-[80px]`}
    >
      {level}
    </div>
  );
}

Severity.propTypes = {
  level: PropTypes.string,
};
