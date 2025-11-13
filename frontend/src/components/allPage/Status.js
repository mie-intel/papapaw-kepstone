import React from "react";
import PropTypes from "prop-types";

const Status = ({ status, tertolak }) => {
  let colorClasses = "";
  let label = "";

  if (tertolak) {
    label = "Rejected";
    colorClasses = "bg-[#E8697E]";
  } else {
    switch (status) {
      case 0:
        label = "Draft";
        colorClasses = "bg-[#C4C4C4]";
        break;
      case 1:
      case 2:
        label = "Ongoing";
        colorClasses = "bg-[#FDBC64]";
        break;
      case 3:
        label = "Completed";
        colorClasses = "bg-[#34D391]";
        break;
      default:
        label = "Unknown";
        colorClasses = "bg-gray-400";
    }
  }

  return (
    <div
      className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold text-white ${colorClasses} min-w-[90px]`}
    >
      {label}
    </div>
  );
};

Status.propTypes = {
  status: PropTypes.number.isRequired,
  tertolak: PropTypes.bool,
};

Status.defaultProps = {
  tertolak: false,
};

export default Status;
