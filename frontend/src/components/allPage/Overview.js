import React from "react";
import PropTypes from "prop-types";
import { FaClock, FaCircleInfo, FaFile } from "react-icons/fa6";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { truncateText } from "@/libs/helpers";

export default function Overview({ report, onClose }) {
  if (!report) return null;

  const STATUS_MAP = {
    0: { label: "Draft", color: "#C4C4C4", icon: <FaFile /> },
    1: { label: "Ongoing", color: "#FDBC64", icon: <FaClock /> },
    2: { label: "Ongoing", color: "#FDBC64", icon: <FaClock /> },
    3: { label: "Completed", color: "#34D391", icon: <IoCheckmarkCircleSharp /> },
    rejected: { label: "Rejected", color: "#E8697E", icon: <FaCircleInfo /> },
  };

  const status = report.tertolak
    ? STATUS_MAP.rejected
    : STATUS_MAP[report.status] || { label: "Unknown", color: "#999999" };
  const severity = { 1: "Minor", 2: "Moderate", 3: "Severe" }[report.skalaCedera] || "Unknown";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="animate-pop relative w-[90%] max-w-2xl rounded-2xl bg-[#2B2E4D] p-6 text-white shadow-lg">
        <div className="mb-4 flex justify-between border-b border-[#C4C4C4]/30 pb-3">
          <h2 className="text-xl font-bold">Overview Report</h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-2xl text-[#C4C4C4] hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="mb-5 flex items-center gap-3">
          <div
            className="flex items-center gap-2 rounded-xl px-4 py-2"
            style={{ backgroundColor: status.color + "20", color: status.color }}
          >
            {React.cloneElement(status.icon, { color: status.color })}
            <span className="text-sm font-medium">{status.label}</span>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-4 text-base">
          {[
            ["Report ID", truncateText(report.idSurat, 10)],
            ["Incident Date", new Date(report.tanggal).toLocaleDateString()],
            ["Employee ID", report.uid],
            ["Department", report.departemen],
            ["Severity", severity],
            ["Location", report.lokasi],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-[#C4C4C4]">{label}</p>
              <p className="font-semibold">{value}</p>
            </div>
          ))}
        </div>

        <div>
          <p className="mb-2 text-[#C4C4C4]">Incident Description</p>
          <p className="rounded-xl bg-[#191A36] p-4 text-sm">{report.detail}</p>
        </div>

        {report.tertolak && report.pesanKesalahan && (
          <div className="mt-4">
            <p className="mb-2 font-semibold text-[#E8697E]">Rejection Reason</p>
            <p className="rounded-xl bg-[#E8697E]/10 p-4 text-sm text-[#fa93a4]">
              {report.pesanKesalahan}
            </p>
          </div>
        )}

        <div className="mt-4">
          <h3 className="mb-3 text-lg font-semibold text-[#C4C4C4]">Approval Progress</h3>
          <div className="h-3 w-full overflow-hidden rounded-full bg-[#C4C4C4]/30">
            <div
              className={`h-full transition-all duration-500 ${
                report.tertolak
                  ? "bg-[#E8697E]"
                  : report.status === 3
                    ? "bg-[#34D391]"
                    : "bg-[#FDBC64]"
              }`}
              style={{ width: `${(report.status / 3) * 100}%` }}
            ></div>
          </div>
          <p className="mt-2 text-right text-sm text-[#C4C4C4]">
            {report.tertolak
              ? "Rejected"
              : report.status === 3
                ? "Completed"
                : `Step ${report.status} of 3`}
          </p>
        </div>
      </div>
    </div>
  );
}

Overview.propTypes = {
  report: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};
