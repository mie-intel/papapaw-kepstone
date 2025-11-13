"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button1 } from "../../allPage/Button";

const KepalaReview = ({ reportData, onClose }) => {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [status, setStatus] = useState(""); // "approved" or "rejected"

  // Sample data jika tidak ada reportData
  const report = reportData || {
    reportTitle: "Slip and fall and blablabla",
    employeeName: "Jiki Wididi",
    employeeId: "1112321121312323",
    department: "Mechanical Assembly",
    severity: "Minor",
    incidentDate: "2024-11-10",
    description: "Detailed description about the incident...",
  };

  const handleApprove = () => {
    setStatus("approved");
    console.log("Report approved:", report);
    // TODO: Send approval to backend
  };

  const handleRejectSubmit = () => {
    if (!rejectionReason.trim()) {
      alert("Please provide a reason for rejection");
      return;
    }
    setStatus("rejected");
    setShowRejectModal(false);
    console.log("Report rejected with reason:", rejectionReason);
    // TODO: Send rejection to backend
  };

  return (
    <div className="font-jakarta relative flex h-screen w-full overflow-hidden p-8">
        <div className="w-full max-w-6xl overflow-y-auto">    
        {/* Header */}
        <div className="mb-8">
          <h2 className="mb-2 text-4xl font-bold text-white">Review Report</h2>
          <p className="text-gray-400">Review and approve or reject the incident report.</p>
        </div>

        {/* Form Container */}
        <div className="rounded-2xl border border-slate-700/50 bg-slate-800/40 p-8 backdrop-blur-sm">
          {/* Section Title */}
          <h3 className="mb-8 text-2xl font-extrabold text-white">Basic Information</h3>

          {/* Report Title */}
          <div className="mb-6">
            <label className="mb-3 block text-base font-medium text-white">
              Report Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={report.reportTitle}
              readOnly
              placeholder="e.g., Slip and fall and blablabla"
              className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3.5 text-gray-400 placeholder-gray-500"
            />
          </div>

          {/* Employee Name & ID - Grid Layout */}
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Employee Name */}
            <div>
              <label className="mb-3 block text-base font-medium text-white">
                Employee name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={report.employeeName}
                readOnly
                placeholder="e.g., Jiki Wididi"
                className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3.5 text-gray-400 placeholder-gray-500"
              />
            </div>

            {/* Employee ID Number */}
            <div>
              <label className="mb-3 block text-base font-medium text-white">
                Employee ID Number <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={report.employeeId}
                readOnly
                placeholder="e.g., 1112321121312323"
                className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3.5 text-gray-400 placeholder-gray-500"
              />
            </div>
          </div>

          {/* Department & Date - Grid Layout */}
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Department */}
            <div>
              <label className="mb-3 block text-base font-medium text-white">
                Department <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={report.department}
                readOnly
                placeholder="Department"
                className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3.5 text-gray-400 placeholder-gray-500"
              />
            </div>

            {/* Date of Incident */}
            <div>
              <label className="mb-3 block text-base font-medium text-white">
                Date of Incident <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={new Date(report.incidentDate).toLocaleDateString('id-ID')}
                readOnly
                placeholder="dd/mm/yyyy"
                className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3.5 text-gray-400 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Severity Level */}
          <div className="mb-6">
            <label className="mb-3 block text-base font-medium text-white">
              Severity Level <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={report.severity}
              readOnly
              placeholder="Minor"
              className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3.5 text-gray-400 placeholder-gray-500"
            />
          </div>

          {/* Detailed Description */}
          <div className="mb-10">
            <label className="mb-3 block text-base font-medium text-white">
              Detailed Description <span className="text-red-400">*</span>
            </label>
            <textarea
              value={report.description}
              readOnly
              placeholder="Provide detailed description about the incident..."
              rows="5"
              className="w-full resize-none rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3.5 text-gray-400 placeholder-gray-500"
            />
          </div>

          {/* Success Message */}
          {status === "approved" && (
            <div className="mb-6 text-center">
              <p className="text-2xl font-semibold text-green-400">Report accepted!</p>
            </div>
          )}

          {/* Action Buttons */}
          {status === "" && (
            <div className="flex justify-center gap-4">
              <Button1
                type="button"
                label="Approve & Sign"
                onClick={handleApprove}
                className="rounded-lg bg-blue-600 px-8 py-3 text-base font-medium text-white transition-all hover:bg-blue-700"
              />
              <button
                type="button"
                onClick={() => setShowRejectModal(true)}
                className="rounded-lg bg-red-500 px-8 py-3 text-base font-medium text-white transition-all hover:bg-red-600"
              >
                Reject with Reason
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl rounded-2xl border border-slate-700/50 bg-slate-800 p-8 shadow-2xl">
            <h3 className="mb-6 text-center text-2xl font-bold text-white">
              Reason for rejection
            </h3>
            
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Input your review"
              rows="6"
              className="mb-6 w-full resize-none rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3.5 text-white placeholder-gray-500 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectionReason("");
                }}
                className="rounded-lg bg-gray-600 px-8 py-3 text-base font-medium text-white transition-all hover:bg-gray-700"
              >
                Close
              </button>
              <Button1
                type="button"
                label="Submit"
                onClick={handleRejectSubmit}
                className="rounded-lg bg-blue-600 px-8 py-3 text-base font-medium text-white transition-all hover:bg-blue-700"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

KepalaReview.propTypes = {
  reportData: PropTypes.shape({
    reportTitle: PropTypes.string,
    employeeName: PropTypes.string,
    employeeId: PropTypes.string,
    department: PropTypes.string,
    severity: PropTypes.string,
    incidentDate: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default KepalaReview;