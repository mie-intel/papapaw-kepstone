"use client";
import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Button1 } from "../../allPage/Button";
import { getskalaCederaString } from "@/libs/helpers/cidera";
import { LaporanContext } from "@/components/contexts/LaporanContext";
import { showToast } from "@/libs/helpers/toaster";

const Review = ({ reportData, onClose }) => {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [status, setStatus] = useState(""); // "approved" or "rejected"
  const [loading, setLoading] = useState(false);
  const { approveSurat, tolakSurat } = useContext(LaporanContext);

  // Sample data jika tidak ada reportData
  const report = reportData || {
    title: "Slip and fall and blablabla",
    lokasi: "Jiki Wididi",
    uid: "1112321121312323",
    departemen: "Mechanical Assembly",
    skalaCedera: "Minor",
    incidentDate: "2024-11-10",
    detail: "Detailed detail about the incident...",
  };

  // console.log("REVIEW REPORT DATA:", reportData);
  const handleApprove = async () => {
    setLoading(true);
    // console.log("Report approved:", report);
    const response = await approveSurat(reportData.idSurat);
    if (response.success) {
      showToast(1, "Laporan berhasil disetujui.");
      setStatus("approved");
    } else {
      showToast(0, `Gagal menyetujui laporan`);
    }

    setLoading(false);
    onClose();
  };

  const handleRejectSubmit = async () => {
    if (!rejectionReason.trim()) {
      showToast(0, "Alasan penolakan harus diisi.");
      return;
    }
    setLoading(true);

    const response = await tolakSurat(reportData.idSurat, rejectionReason);
    if (response.success) {
      showToast(1, "Laporan berhasil ditolak.");
      setStatus("rejected");
    } else {
      showToast(0, `Gagal menolak laporan`);
    }
    setShowRejectModal(false);
    setLoading(false);
    onClose();
  };

  return (
    <div className="font-jakarta relative flex h-screen w-full overflow-hidden p-1 md:p-8">
      <div className="w-full overflow-y-auto pb-20 md:pb-30">
        {/* Header */}
        <div className="mb-8">
          <h2 className="mb-2 text-4xl font-bold text-white">Review Report</h2>
          <p className="text-gray-400">Review and approve or reject the incident report.</p>
        </div>

        {/* Form Container */}
        <div className="rounded-2xl border border-slate-700/50 bg-slate-800/40 p-1 backdrop-blur-sm md:p-8">
          {/* Section Title */}
          <h3 className="mb-8 text-2xl font-extrabold text-white">Basic Information</h3>

          {/* Report Title */}
          <div className="mb-6">
            <label className="mb-3 block text-base font-medium text-white">
              Report Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={report.title}
              readOnly
              placeholder="e.g., Slip and fall and blablabla"
              className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3.5 text-gray-400 placeholder-gray-500"
            />
          </div>

          {/* Employee Name & ID - Grid Layout */}
          <div className="mb-6 grid grid-cols-1 gap-3">
            <label className="mb-0 block text-base font-medium text-white">
              Lokasi <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={report.lokasi}
              readOnly
              placeholder="House"
              className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3.5 text-gray-400 placeholder-gray-500"
            />
          </div>

          {/* departemen & Date - Grid Layout */}
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* departemen */}
            <div>
              <label className="mb-3 block text-base font-medium text-white">
                Departemen <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={report.departemen}
                readOnly
                placeholder="Departemen"
                className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3.5 text-gray-400 placeholder-gray-500"
              />
            </div>

            {/* Date of Incident */}
            <div>
              <label className="mb-3 block text-base font-medium text-white">
                Tanggal Kejadian <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={new Date(report.incidentDate).toLocaleDateString("id-ID")}
                readOnly
                placeholder="dd/mm/yyyy"
                className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3.5 text-gray-400 placeholder-gray-400"
              />
            </div>
          </div>

          {/* skalaCedera Level */}
          <div className="mb-6">
            <label className="mb-3 block text-base font-medium text-white">
              Severity Level <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={getskalaCederaString(report.skalaCedera)}
              readOnly
              placeholder="Minor"
              className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3.5 text-gray-400 placeholder-gray-500"
            />
          </div>

          {/* Detailed detail */}
          <div className="mb-2">
            <label className="mb-3 block text-base font-medium text-white">
              Detailed Description <span className="text-red-400">*</span>
            </label>
            <textarea
              value={report.detail}
              readOnly
              placeholder="Provide detailed detail about the incident..."
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
            <div className="flex flex-col justify-center gap-0 max-lg:pb-2 lg:flex-row lg:gap-4">
              <Button1
                type="button"
                label="Approve & Sign"
                onClick={handleApprove}
                className="w-full rounded-lg bg-blue-600 px-8 py-3 text-base font-medium text-white transition-all hover:bg-blue-700 lg:w-[50%]"
              />
              <Button1
                type="button"
                label=" Reject with Reason"
                onClick={() => setShowRejectModal(true)}
                className="w-full rounded-lg bg-red-500 px-8 py-3 text-base font-medium text-white transition-all hover:bg-red-600 lg:w-[50%]"
              />
            </div>
          )}
        </div>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl border border-slate-700/50 bg-slate-800 p-8 shadow-2xl">
            <h3 className="mb-6 text-center text-2xl font-bold text-white">Alasan</h3>

            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Input your review"
              rows="6"
              className="mb-0 w-full resize-none rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3.5 text-white placeholder-gray-500 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <div className="flex flex-col justify-center gap-0 lg:flex-row lg:gap-4">
              <Button1
                type="button"
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectionReason("");
                }}
                label={"Close"}
                disabled={loading}
                className="rounded-lg bg-gray-600 px-8 py-3 text-base font-medium text-white transition-all hover:bg-gray-700"
              />
              <Button1
                type="button"
                label="Submit"
                onClick={handleRejectSubmit}
                disabled={loading}
                className="rounded-lg bg-blue-600 px-8 py-3 text-base font-medium text-white transition-all hover:bg-blue-700"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Review.propTypes = {
  reportData: PropTypes.shape({
    idSurat: PropTypes.string,
    lokasi: PropTypes.string,
    uid: PropTypes.string,
    departemen: PropTypes.string,
    skalaCedera: PropTypes.string,
    incidentDate: PropTypes.string,
    detail: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};

export default Review;
