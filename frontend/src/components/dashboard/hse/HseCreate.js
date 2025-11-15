"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button1, Button4, Button5 } from "../../allPage/Button";
import InputForm from "../../allPage/InputForm";
import { Dropdown1 } from "../../allPage/Dropdown";

const getSeverityString = (level) => {
  if (level === 3) return "Critical";
  if (level === 2) return "Moderate";
  return "Minor";
};

const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  } catch {
    console.error("Invalid date string:", dateString);
    return "";
  }
};

const HseCreate = ({ draftData, onClose }) => {
  const [reportTitle, setReportTitle] = useState(draftData?.detail || "");
  const [employeeName, setEmployeeName] = useState(draftData?.employeeName || "");
  const [employeeId, setEmployeeId] = useState(draftData?.uid || "");
  const [department, setDepartment] = useState(draftData?.departemen || "");
  const [severity, setSeverity] = useState(
    draftData ? getSeverityString(draftData.skalaCedera) : "Minor",
  );
  const [incidentDate, setIncidentDate] = useState(
    draftData ? formatDateForInput(draftData.tanggal) : "",
  );
  const [description, setDescription] = useState(draftData?.description || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting report:", {
      reportTitle,
      employeeName,
      employeeId,
      department,
      severity,
      incidentDate,
      description,
    });
    if (onClose) onClose();
  };

  const handleSaveDraft = () => {
    console.log("Saving draft:", {
      reportTitle,
      employeeName,
      employeeId,
      department,
      severity,
      incidentDate,
      description,
    });
    if (onClose) onClose();
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

          <form onSubmit={handleSubmit}>
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
                onChange={(e) => setReportTitle(e.target.value)}
                showError={false}
                className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3.5 text-white placeholder-gray-500 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Employee Name & ID - Grid Layout */}
            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Employee Name */}
              <div>
                <label className="mb-3 block text-base font-medium text-white">
                  Employee name <span className="text-red-400">*</span>
                </label>
                <InputForm
                  type="text"
                  name="employeeName"
                  placeholder="Employee name"
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  showError={false}
                  className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3.5 text-white placeholder-gray-500 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Employee ID Number */}
              <div>
                <label className="mb-3 block text-base font-medium text-white">
                  Employee ID Number <span className="text-red-400">*</span>
                </label>
                <InputForm
                  type="text"
                  name="employeeId"
                  placeholder="Employee ID number"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  showError={false}
                  className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3.5 text-white placeholder-gray-500 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Department & Date - Grid Layout */}
            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Department Dropdown */}
              <div>
                <label className="mb-3 block text-base font-medium text-white">
                  Department <span className="text-red-400">*</span>
                </label>
                <Dropdown1
                  name="department"
                  options={[
                    "Mechanical Assembly",
                    "Electronic Assembly",
                    "Software Installation",
                    "Quality Assurance",
                    "Warehouse",
                  ]}
                  formData={{ department: department }}
                  handleChange={(e) => setDepartment(e.target.value)}
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
                  name="incidentDate"
                  placeholder="dd/mm/yyyy"
                  value={incidentDate}
                  onChange={(e) => setIncidentDate(e.target.value)}
                  showError={false}
                  className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3.5 text-white placeholder-gray-400 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Severity Dropdown */}
            <div className="mb-6">
              <label className="mb-3 block text-base font-medium text-white">
                Severity Level <span className="text-red-400">*</span>
              </label>
              <Dropdown1
                name="severity"
                options={["Minor", "Moderate", "Critical"]}
                formData={{ severity: severity }}
                handleChange={(e) => setSeverity(e.target.value)}
                placeholder="Select Severity"
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
                  onClick={handleSaveDraft}
                  className="w-full rounded-lg bg-[#19298085] px-6 py-2.5 text-sm text-white transition-all hover:bg-[#48529685]"
                />
              </div>

              {/* Submit Report - Right */}
              <div className="sm:col-span-1">
                <Button1
                  type="submit"
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

HseCreate.propTypes = {
  draftData: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

HseCreate.defaultProps = {
  draftData: null,
};

export default HseCreate;
