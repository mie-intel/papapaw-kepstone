"use client";
import React, { useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import { IoCheckmarkDoneCircle, IoPencilSharp } from "react-icons/io5";
import { FaClock, FaCircleInfo, FaEye, FaTrashCan, FaDownload } from "react-icons/fa6";
import CardReport from "@/components/allPage/CardReport";
import InputForm from "@/components/allPage/InputForm";
import { Dropdown1 } from "@/components/allPage/Dropdown";
import { mockReports } from "@/libs/constants/mockData";
import Status from "@/components/allPage/Status";
import Severity from "@/components/allPage/Severity";
import Overview from "@/components/allPage/Overview";

export default function HseDash() {
  const [selectedReport, setSelectedReport] = useState(null);
  const [showOverview, setShowOverview] = useState(false);
  const statusOptions = ["All", "Ongoing", "Completed", "Draft", "Rejected"];
  const severityOptions = ["All", "Severe", "Moderate", "Minor"];

  const [formData, setFormData] = useState({
    status: "",
    severity: "",
    search: "",
  });

  const filteredReports = mockReports.filter((report) => {
    const searchMatch = report.title.toLowerCase().includes(formData.search.toLowerCase());
    const statusMatch =
      formData.status === "" || formData.status === "All" || report.status === formData.status;
    const severityMatch =
      formData.severity === "" ||
      formData.severity === "All" ||
      report.severity === formData.severity;

    return searchMatch && statusMatch && severityMatch;
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="font-jakarta flex min-h-screen w-full flex-col gap-7 overflow-hidden rounded-2xl bg-[#2B2E4D]/30 p-5 text-white lg:h-full lg:min-h-0 lg:bg-transparent lg:p-0">
      {/* Dashboard */}
      <div className="flex shrink-0 flex-col">
        <h2 className="text-2xl font-extrabold">Dashboard</h2>
        <p className="text-sm text-[#B5B5B5]">Welcome! Here is the overview of HSE reports.</p>
      </div>

      <div className="flex shrink-0 flex-row flex-wrap gap-5">
        <CardReport
          label="Total Reports"
          value={100}
          icon={<FaFileAlt size={25} className="text-[#0273EA]" />}
        />
        <CardReport
          label="Completed"
          value={80}
          icon={<IoCheckmarkDoneCircle size={30} className="text-[#34D391]" />}
        />
        <CardReport
          label="Ongoing"
          value={12}
          icon={<FaClock size={25} className="text-[#FDBC64]" />}
        />
        <CardReport
          label="Rejected"
          value={8}
          icon={<FaCircleInfo size={25} className="text-[#E8697E]" />}
        />
        <CardReport
          label="Draft"
          value={2}
          icon={<FaFileAlt size={25} className="text-[#C4C4C4]" />}
        />
      </div>

      {/* History */}
      <div className="flex h-screen flex-1 flex-col overflow-hidden pb-5 lg:pb-0">
        <div className="flex shrink-0 flex-col">
          <h2 className="text-2xl font-extrabold">History</h2>
          <p className="text-sm text-[#B5B5B5]">View all of your submitted and draft reports.</p>
        </div>

        <div className="mt-2 flex h-full flex-1 flex-col gap-2 overflow-hidden rounded-2xl border border-[#2B2E4D] bg-[#2B2E4D]/30 p-2 shadow-lg">
          {/* Search Bar */}
          <InputForm
            type="text"
            name="search"
            placeholder="Search reports..."
            value={formData.search}
            onChange={handleChange}
            className="h-10 rounded-lg border-[#A3A5B1]"
          />

          {/* Filters */}
          <div className="flex shrink-0 flex-col gap-3 md:flex-row md:items-center">
            <p className="text-base font-medium text-[#FFFFFF]">Filter:</p>
            <div className="flex w-[60%] flex-col gap-3 sm:flex-row sm:gap-4 md:w-[40%]">
              <Dropdown1
                name="status"
                placeholder="All Status"
                options={statusOptions}
                formData={formData}
                handleChange={handleChange}
                className="h-10 w-20 rounded-lg border-[#A3A5B1]"
              />
              <Dropdown1
                name="severity"
                placeholder="Severity Level"
                options={severityOptions}
                formData={formData}
                handleChange={handleChange}
                className="h-10 rounded-lg border-[#A3A5B1]"
              />
            </div>
          </div>

          {/* All Reports */}
          <div className="mt-4 flex-1 overflow-hidden rounded-xl border border-[#C4C4C4]/20">
            <div className="relative h-full max-h-screen overflow-y-auto">
              <table className="min-w-full text-left text-sm whitespace-nowrap">
                <thead className="sticky top-0 z-10 bg-[#2B2E4D]">
                  <tr>
                    <th className="w-[10vw] px-4 py-3 font-semibold sm:w-[30vw] md:w-[25vw]">
                      Title
                    </th>
                    <th className="hidden px-4 py-3 font-semibold md:table-cell">Department</th>
                    <th className="hidden px-4 py-3 font-semibold sm:table-cell">Date</th>
                    <th className="hidden px-4 py-3 font-semibold lg:table-cell">Severity</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReports.length > 0 ? (
                    filteredReports.map((report) => (
                      <tr
                        key={report.id}
                        className="border-b border-[#C4C4C4]/20 bg-[#2B2E4D]/30 transition-colors hover:bg-[#C4C4C4]/10"
                      >
                        <td className="max-w-xs truncate overflow-hidden px-4 py-4 font-semibold text-ellipsis">
                          {report.title}
                        </td>
                        <td className="hidden px-4 py-4 text-[#C4C4C4] md:table-cell">
                          {report.department}
                        </td>
                        <td className="hidden px-4 py-4 text-[#C4C4C4] sm:table-cell">
                          {report.date}
                        </td>
                        <td className="hidden px-4 py-4 lg:table-cell">
                          <Severity level={report.severity} />
                        </td>
                        <td className="px-4 py-4">
                          <Status status={report.status} />
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="justify-left flex items-center space-x-5">
                            <FaEye
                              title="View Report"
                              className="cursor-pointer"
                              onClick={() => {
                                setSelectedReport(report);
                                setShowOverview(true);
                              }}
                            />
                            {report.status === "Completed" && (
                              <FaDownload title="Download Report" className="cursor-pointer" />
                            )}
                            {report.status === "Draft" && (
                              <>
                                <IoPencilSharp title="Edit Report" className="cursor-pointer" />
                                <FaTrashCan title="Delete Report" className="cursor-pointer" />
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-4 py-8 text-center text-gray-400">
                        No reports match your current filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {showOverview && <Overview report={selectedReport} onClose={() => setShowOverview(false)} />}
    </div>
  );
}
