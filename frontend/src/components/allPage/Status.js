import React from "react";
import PropTypes from "prop-types";

const Status = ({ status }) => {
  let colorClasses = "";

  switch (status) {
    case "Completed":
      colorClasses = "bg-[#34D391]";
      break;
    case "Ongoing":
      colorClasses = "bg-[#FDBC64]";
      break;
    case "Draft":
      colorClasses = "bg-[#C4C4C4]";
      break;
    case "Rejected":
      colorClasses = "bg-[#E8697E]";
      break;
  }

  return (
    <div
      className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold text-white ${colorClasses} min-w-[90px]`}
    >
      {status}
    </div>
  );
};

Status.propTypes = {
  status: PropTypes.string.isRequired,
};

export default Status;
