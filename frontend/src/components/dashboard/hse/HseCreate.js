"use client";
import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Button1, Button4, Button5 } from "../../allPage/Button";
import InputForm from "../../allPage/InputForm";
import { Dropdown1 } from "../../allPage/Dropdown";
import { LaporanContext } from "@/components/contexts/LaporanContext";
import { showToast } from "@/components/allPage/Toaster";
import { useRouter } from "next/navigation";
import { getSkalaCederaNumber, getskalaCederaString } from "@/libs/helpers/cidera";
import { formatDateForInput, parseDateString } from "@/libs/helpers/formatDate";

const HseCreate = ({ draftData, onClose }) => {
  const [reportTitle, setreportTitle] = useState(draftData?.title || "");
  const [lokasi, setlokasi] = useState(draftData?.lokasi || "");
  const [departemen, setdepartemen] = useState(draftData?.departemen || "");
  const [skalaCedera, setskalaCedera] = useState(
    draftData ? getskalaCederaString(draftData.skalaCedera) : "Minor",
  );
  const [tanggal, settanggal] = useState(draftData ? draftData.tanggal : Date.now());
  const [description, setDescription] = useState(draftData?.detail || "");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { createLaporan, editLaporan } = useContext(LaporanContext);

  const handleClick = async (status) => {
    setLoading(true);
    if (draftData) {
      const response = await editLaporan({
        idSurat: draftData.idSurat,
        title: reportTitle,
        lokasi,
        departemen,
        skalaCedera: getSkalaCederaNumber(skalaCedera),
        tanggal: parseDateString(formatDateForInput(tanggal)),
        detail: description,
        status,
      });

      // console.log("Edit Laporan response:", response);
      if (response.success) {
        showToast(true, "Report updated successfully");
      } else {
        showToast(false, response.error || "Failed to update report");
      }
    } else {
      const response = await createLaporan({
        title: reportTitle,
        lokasi,
        departemen,
        skalaCedera: getSkalaCederaNumber(skalaCedera),
        tanggal: parseDateString(formatDateForInput(tanggal)),
        detail: description,
        status,
      });

      // console.log("Create Laporan response:", response);

      if (response.success) {
        showToast(true, "Report submitted successfully");
      } else {
        showToast(false, response.error || "Failed to submit report");
      }
    }

    setLoading(false);
    router.push("/hse/dashboard");
    if (onClose) {
      onClose();
    }
  };

  const handleSubmit = async (e, status) => {
    e.preventDefault();
    await handleClick(status);
  };

  return (
    <div className="font-jakarta relative flex h-full w-full overflow-y-auto p-1 md:p-8">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h2 className="mb-2 text-4xl font-bold text-white">
            {draftData ? "Edit Draft" : "Create New Report"}
          </h2>
          <p className="text-gray-400">
            {draftData
              ? "Continue editing your draft report."
              : "Create a new workplace report. All fields are required."}
          </p>
        </div>

        {/* Form Container */}
        <div className="rounded-2xl border border-slate-700/50 bg-slate-800/40 p-1 backdrop-blur-sm md:p-8">
          {/* Section Title */}
          <h3 className="mb-8 text-2xl font-extrabold text-white">Basic Information</h3>

          <form onSubmit={(e) => handleSubmit(e, 1)}>
            {/* Report Title */}
            <div className="mb-6">
              <label className="mb-3 block text-base font-medium text-white">
                Report Title <span className="text-red-400">*</span>
              </label>
              <InputForm
                type="text"
                name="reportTitle"
                placeholder="Enter report title"
                value={reportTitle}
                onChange={(e) => setreportTitle(e.target.value)}
                showError={false}
                className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3.5 text-white placeholder-gray-500 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* departemen & Date - Grid Layout */}
            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* departemen Dropdown */}
              <div>
                <label className="mb-3 block text-base font-medium text-white">
                  Department <span className="text-red-400">*</span>
                </label>
                <Dropdown1
                  name="departemen"
                  options={[
                    "Mechanical Assembly",
                    "Electronic Assembly",
                    "Software Installation",
                    "Quality Assurance",
                    "Warehouse",
                  ]}
                  formData={{ departemen: departemen }}
                  handleChange={(e) => setdepartemen(e.target.value)}
                  placeholder="Department"
                  showError={false}
                  className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3.5 text-white placeholder-gray-500 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Date of Incident */}
              <div>
                <label className="mb-3 block text-base font-medium text-white">
                  Date of Incident <span className="text-red-400">*</span>
                </label>
                <InputForm
                  type="date"
                  name="tanggal"
                  placeholder="mm/dd/yyyy"
                  value={formatDateForInput(tanggal)}
                  onChange={(e) => settanggal(e.target.value)}
                  showError={false}
                  className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3.5 text-white placeholder-gray-400 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* skalaCedera Dropdown */}
            <div className="mb-6">
              <label className="mb-3 block text-base font-medium text-white">
                Severity Level <span className="text-red-400">*</span>
              </label>
              <Dropdown1
                name="skalaCedera"
                options={["Minor", "Moderate", "Critical"]}
                formData={{ skalaCedera: skalaCedera }}
                handleChange={(e) => setskalaCedera(e.target.value)}
                placeholder="Select skalaCedera"
                showError={false}
                className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3.5 text-white placeholder-gray-500 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Lokasi */}
            <div className="mb-6">
              <label className="mb-3 block text-base font-medium text-white">
                Lokasi <span className="text-red-400">*</span>
              </label>
              <InputForm
                type="text"
                name="lokasi"
                placeholder="Enter lokasi"
                value={lokasi}
                onChange={(e) => setlokasi(e.target.value)}
                showError={false}
                className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3.5 text-white placeholder-gray-500 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Detailed Description */}
            <div className="mb-10">
              <label className="mb-3 block text-base font-medium text-white">
                Detailed Description <span className="text-red-400">*</span>
              </label>
              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide detailed description about the incident..."
                rows="5"
                className="w-full resize-none rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3.5 text-white placeholder-gray-500 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {/* Cancel - Align Left */}
              <div className="sm:col-span-1">
                <Button4
                  type="button"
                  label="Cancel"
                  onClick={onClose}
                  className="w-full rounded-lg bg-gray-600 px-6 py-2.5 text-sm text-white transition-all hover:bg-gray-700"
                />
              </div>

              {/* Save as Draft - Center/Right */}
              <div className="sm:col-span-1">
                <Button5
                  type="button"
                  label="Save as draft"
                  disabled={loading}
                  onClick={() => handleClick(0)}
                  className="w-full rounded-lg bg-[#19298085] px-6 py-2.5 text-sm text-white transition-all hover:bg-[#48529685]"
                />
              </div>

              {/* Submit Report - Right */}
              <div className="sm:col-span-1">
                <Button1
                  type="submit"
                  disabled={loading}
                  label={draftData ? "Send Report" : "Submit Report"}
                  className="w-full rounded-lg bg-blue-600 px-6 py-2.5 text-sm text-white transition-all hover:bg-blue-700"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

HseCreate.propTypes = {
  draftData: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

HseCreate.defaultProps = {
  draftData: null,
};

export default HseCreate;
