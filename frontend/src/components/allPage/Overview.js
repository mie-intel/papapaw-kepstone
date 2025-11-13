import React from "react";
import PropTypes from "prop-types";
import { FaFileAlt } from "react-icons/fa";
import { FaClock, FaCircleInfo, FaFile } from "react-icons/fa6";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

export default function Overview({ report, onClose }) {
  if (!report) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-[90%] max-w-2xl rounded-2xl bg-[#2B2E4D] p-6 text-white shadow-lg">
        <div className="mb-4 flex items-center justify-between border-b border-[#C4C4C4]/30 pb-3">
          <h2 className="text-xl font-bold">Overview Report</h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-2xl font-bold text-[#C4C4C4] hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Status */}
        <div className="mb-5 flex items-center gap-3">
          {(() => {
            let bgColor = "";
            let icon = null;
            let textColor = "";
            let label = "";

            switch (report.status) {
              case "Draft":
                bgColor = "bg-[#C4C4C4]/20";
                icon = <FaFile className="text-[#C4C4C4]" />;
                textColor = "text-[#C4C4C4]";
                label = "Draft Report";
                break;
              case "Completed":
                bgColor = "bg-[#34D391]/20";
                icon = <IoCheckmarkCircleSharp className="text-[#34D391]" />;
                textColor = "text-[#34D391]";
                label = "Completed";
                break;
              case "Ongoing":
                bgColor = "bg-[#FDBC64]/20";
                icon = <FaClock className="text-[#FDBC64]" />;
                textColor = "text-[#FDBC64]";
                label = "Awaiting Approval";
                break;
              case "Rejected":
                bgColor = "bg-[#E8697E]/20";
                icon = <FaCircleInfo className="text-[#E8697E]" />;
                textColor = "text-[#E8697E]";
                label = "Rejected";
                break;
            }

            return (
              <div className={`flex items-center gap-2 rounded-xl px-4 py-2 ${bgColor}`}>
                {icon}
                <span className={`text-sm font-medium ${textColor}`}>{label}</span>
              </div>
            );
          })()}
        </div>

        {/* Details */}
        <div className="mb-6 grid grid-cols-2 gap-4 text-base">
          <div>
            <p className="text-[#C4C4C4]">Report ID</p>
            <p className="font-semibold">{report.id}</p>
          </div>
          <div>
            <p className="text-[#C4C4C4]">Incident Date</p>
            <p className="font-semibold">{report.date}</p>
          </div>
          <div>
            <p className="text-[#C4C4C4]">Employee Name</p>
            <p className="font-semibold">{report.employeeName}</p>
          </div>
          <div>
            <p className="text-[#C4C4C4]">Employee ID</p>
            <p className="font-semibold">{report.employeeId}</p>
          </div>
          <div>
            <p className="text-[#C4C4C4]">Department</p>
            <p className="font-semibold">{report.department}</p>
          </div>
          <div>
            <p className="text-[#C4C4C4]">Severity</p>
            <p
              className={`font-semibold ${
                report.severity === "Severe"
                  ? "text-[#E8697E]"
                  : report.severity === "Moderate"
                    ? "text-[#FDBC64]"
                    : "text-[#34D391]"
              }`}
            >
              {report.severity}
            </p>
          </div>
        </div>

        {/* Description */}
        <div>
          <p className="mb-2 text-[#C4C4C4]">Incident Description</p>
          <p className="rounded-xl bg-[#191A36] p-4 text-sm">{report.description}</p>
        </div>

        {/* Show rejection reason onlyyyy if rejected*/}
        {report.status === "Rejected" && report.rejectedReason && (
          <div className="mt-4">
            <p className="mb-2 font-semibold text-[#C4C4C4]">Rejection Reason</p>
            <p className="rounded-xl bg-[#E8697E]/10 p-4 text-sm text-[#fa93a4]">
              {report.rejectedReason}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="cursor-pointer rounded-lg border border-[#0273EA0273EA] px-5 py-2 text-sm font-medium text-[#0273EA] transition-all hover:bg-[#0273EA]/50 hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

Overview.propTypes = {
  report: PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    employeeName: PropTypes.string.isRequired,
    employeeId: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    severity: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.oneOf(["Draft", "Completed", "Ongoing", "Rejected"]).isRequired,
    rejectedReason: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};
