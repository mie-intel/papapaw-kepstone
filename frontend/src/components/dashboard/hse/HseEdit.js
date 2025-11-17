"use client";
import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Button1, Button4, Button5 } from "../../allPage/Button";
import InputForm from "../../allPage/InputForm";
import { Dropdown1 } from "../../allPage/Dropdown";
import { LaporanContext } from "@/components/contexts/LaporanContext";
import { showToast } from "@/libs/helpers/toaster";
import { useRouter } from "next/navigation";

const getskalaCederaString = (level) => {
  if (level === 3) return "Critical";
  if (level === 2) return "Moderate";
  return "Minor";
};

const getSkalaCederaNumber = (levelStr) => {
  if (levelStr === "Critical") return 3;
  if (levelStr === "Moderate") return 2;
  return 1;
};

const formatDateForInput = (value) => {
  if (!value) return "";
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value;

  let date;
  if (typeof value === "number") date = new Date(value);
  else date = new Date(String(value));

  if (Number.isNaN(date.getTime())) {
    console.warn("formatDateForInput: invalid date", value);
    return "";
  }
  const year = date.getFullYear();
  if (year < 1900 || year > 2100) {
    console.warn("formatDateForInput: year out of range", year, value);
    return "";
  }
  return date.toISOString().split("T")[0];
};

const HseEdit = ({ draftData, onClose }) => {
  const [reportTitle, setreportTitle] = useState(draftData?.title || "");
  const [lokasi, setlokasi] = useState(draftData?.lokasi || "");
  const [uid, setuid] = useState(draftData?.uid || "");
  const [departemen, setdepartemen] = useState(draftData?.departemen || "");
  const [skalaCedera, setskalaCedera] = useState(
    draftData ? getskalaCederaString(draftData.skalaCedera) : "Minor",
  );
  const [tanggal, settanggal] = useState(draftData ? formatDateForInput(draftData.tanggal) : "");
  const [description, setDescription] = useState(draftData?.detail || draftData?.description || "");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isEdit = Boolean(draftData && (draftData.idSurat || draftData._id || draftData.id));

  // Mock fetch function to simulate retrieving the laporan from DB by idSurat
  // Replace this with real API call when backend endpoint available
  const fetchLaporanByIdSurat = async (idSurat) => {
    // simulate network delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          idSurat,
          uid: "mock-uid-123",
          title: "Mocked Report Title",
          lokasi: "Mocked Location",
          departemen: "Mechanical Assembly",
          skalaCedera: 2,
          tanggal: new Date().toISOString(),
          detail: "This is mocked detail fetched from DB for editing.",
        });
      }, 500);
    });
  };

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      if (!draftData) return;

      // If an id is present, fetch latest data from DB (mocked here)
      const idToFetch = draftData.idSurat || draftData._id || draftData.id;
      if (idToFetch) {
        setLoading(true);
        try {
          const data = await fetchLaporanByIdSurat(idToFetch);
          if (!mounted) return;
          setreportTitle(data.title || "");
          setlokasi(data.lokasi || "");
          setuid(data.uid || "");
          setdepartemen(data.departemen || "");
          setskalaCedera(getskalaCederaString(data.skalaCedera));
          settanggal(formatDateForInput(data.tanggal));
          setDescription(data.detail || data.description || "");
        } catch (err) {
          console.error("Failed to fetch draft data:", err);
        } finally {
          setLoading(false);
        }
      } else {
        // If draftData exists but has full fields, populate from it
        setreportTitle(draftData.title || draftData.name || "");
        setlokasi(draftData.lokasi || "");
        setuid(draftData.uid || "");
        setdepartemen(draftData.departemen || "");
        setskalaCedera(getskalaCederaString(draftData.skalaCedera || draftData.skala || 1));
        settanggal(formatDateForInput(draftData.tanggal));
        setDescription(draftData.detail || draftData.description || "");
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, [draftData]);

  const { createLaporan } = useContext(LaporanContext);

  const handleClick = async (status) => {
    setLoading(true);
    const payload = {
      title: reportTitle,
      lokasi,
      departemen,
      skalaCedera: getSkalaCederaNumber(skalaCedera),
      tanggal,
      detail: description,
      status,
    };

    if (isEdit) {
      payload.idSurat = draftData.idSurat || draftData._id || draftData.id;
    }

    const response = await createLaporan(payload);

    console.log("Create Laporan response:", response);

    if (response && response.success) {
      showToast(true, isEdit ? "Report updated successfully" : "Report submitted successfully");
    } else {
      showToast(false, (response && response.error) || "Failed to submit report");
    }

    // setreportTitle("");
    // setlokasi("");
    // setdepartemen("");
    // setskalaCedera("Minor");
    // settanggal("");
    // setDescription("");

    console.log("Submitting report:", {
      reportTitle,
      lokasi,
      departemen,
      skalaCedera,
      tanggal,
      description,
      status,
    });
    setLoading(false);
    router.push("/hse/dashboard");
  };

  const handleSubmit = async (e, status) => {
    e.preventDefault();
    await handleClick(status);
  };

  return (
    <div className="font-jakarta relative flex h-full w-full overflow-y-auto p-8">
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
        <div className="rounded-2xl border border-slate-700/50 bg-slate-800/40 p-8 backdrop-blur-sm">
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
                  value={tanggal}
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
                  label={draftData ? "Update Report" : "Submit Report"}
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

HseEdit.propTypes = {
  draftData: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

HseEdit.defaultProps = {
  draftData: null,
};

export default HseEdit;
