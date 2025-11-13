'use client';
import React, { useState } from 'react';
import { Button1, Button4, Button5 } from '../../allPage/Button';
import InputForm from '../../allPage/InputForm';
import { Dropdown1 } from '../../allPage/Dropdown';

const HseCreate = () => {
  const [reportTitle, setReportTitle] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [department, setDepartment] = useState('');
  const [severity, setSeverity] = useState('Minor');
  const [incidentDate, setIncidentDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      reportTitle,
      employeeName,
      employeeId,
      department,
      severity,
      incidentDate,
      description,
    });
  };

  return (
    <div className="h-full w-full overflow-y-auto p-8">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white mb-2">Create New Report</h2>
          <p className="text-gray-400">Create a new workplace report. All fields are required.</p>
        </div>

        {/* Form Container */}
        <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
          {/* Section Title */}
          <h3 className="text-2xl font-semibold text-white mb-8">Basic Information</h3>

          <form onSubmit={handleSubmit}>
            {/* Report Title */}
            <div className="mb-6">
              <label className="block text-base font-medium text-white mb-3">
                Report Title <span className="text-red-400">*</span>
              </label>
              <InputForm
                type="text"
                name="reportTitle"
                placeholder="Enter report title"
                value={reportTitle}
                onChange={(e) => setReportTitle(e.target.value)}
                showError={false}
                className="w-full px-4 py-3.5 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Employee Name & ID - Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Employee Name */}
              <div>
                <label className="block text-base font-medium text-white mb-3">
                  Employee name <span className="text-red-400">*</span>
                </label>
                <InputForm
                  type="text"
                  name="employeeName"
                  placeholder="Employee name"
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  showError={false}
                  className="w-full px-4 py-3.5 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Employee ID Number */}
              <div>
                <label className="block text-base font-medium text-white mb-3">
                  Employee ID Number <span className="text-red-400">*</span>
                </label>
                <InputForm
                  type="text"
                  name="employeeId"
                  placeholder="Employee ID number"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  showError={false}
                  className="w-full px-4 py-3.5 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Department & Date - Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Department Dropdown */}
              <div>
                <label className="block text-base font-medium text-white mb-3">
                  Department <span className="text-red-400">*</span>
                </label>
                <Dropdown1
                  name="department"
                  options={["Mechanical Assembly", "Electronic Assembly", "Software Installation", "Quality Assurance", "Warehouse"]}
                  formData={{ department }}
                  handleChange={(e) => setDepartment(e.target.value)}
                  placeholder="Department"
                  showError={false}
                  className="w-full px-4 py-3.5 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Date of Incident */}
              <div>
                <label className="block text-base font-medium text-white mb-3">
                  Date of Incident <span className="text-red-400">*</span>
                </label>
                <InputForm
                  type="date"
                  name="incidentDate"
                  placeholder="dd/mm/yyyy"
                  value={incidentDate}
                  onChange={(e) => setIncidentDate(e.target.value)}
                  showError={false}
                  className="w-full px-4 py-3.5 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Severity Dropdown */}
            <div className="mb-6">
              <label className="block text-base font-medium text-white mb-3">
                Severity Level <span className="text-red-400">*</span>
              </label>
              <Dropdown1
                name="severity"
                options={["Minor", "Moderate", "Critical"]}
                formData={{ severity }}
                handleChange={(e) => setSeverity(e.target.value)}
                placeholder="Select Severity"
                showError={false}
                className="w-full px-4 py-3.5 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Detailed Description */}
            <div className="mb-10">
              <label className="block text-base font-medium text-white mb-3">
                Detailed Description <span className="text-red-400">*</span>
              </label>
              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide detailed description about the incident..."
                rows="5"
                className="w-full px-4 py-3.5 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                required
              />
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Cancel - Align Left */}
              <div className="sm:col-span-1">
                <Button4 
                  type="button" 
                  label="Cancel" 
                  className="w-full px-6 py-2.5 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded-lg transition-all"
                />
              </div>
              
              {/* Save as Draft - Center/Right */}
              <div className="sm:col-span-1">
                <Button5
                  type="button"
                  label="Save as draft"
                  className="w-full px-6 py-2.5 bg-[#19298085] hover:bg-[#48529685] text-white text-sm rounded-lg transition-all"
                />
              </div>
              
              {/* Submit Report - Right */}
              <div className="sm:col-span-1">
                <Button1 
                  type="submit" 
                  label="Submit Report" 
                  className="w-full px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-all"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HseCreate;