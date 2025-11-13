"use client";
import React, { useState } from "react";
import { IoPencilSharp } from "react-icons/io5";
import { FaEye, FaTrashCan, FaDownload } from "react-icons/fa6";
import InputForm from "@/components/allPage/InputForm";
import Severity from "@/components/allPage/Severity";
import Status from "@/components/allPage/Status";
import Overview from "@/components/allPage/Overview";
import { Dropdown1 } from "@/components/allPage/Dropdown";
import { mockReports2 } from "@/libs/constants/mockData";

export default function DirekturHis() {
  const [selectedReport, setSelectedReport] = useState(null);
  const [showOverview, setShowOverview] = useState(false);
  const statusOptions = ["All Status", "Ongoing", "Completed", "Draft", "Rejected"];
  const severityOptions = ["Severity Level", "Severe", "Moderate", "Minor"];

  const [formData, setFormData] = useState({
    status: "",
    severity: "",
    search: "",
  });

  const filteredReports = mockReports2
    .filter((report) => report.status !== 0 && report.status !== 1 && !report.tertolak)
    .filter((report) => {
      const searchMatch =
        report.detail.toLowerCase().includes(formData.search.toLowerCase()) ||
        report.lokasi.toLowerCase().includes(formData.search.toLowerCase()) ||
        report.departemen.toLowerCase().includes(formData.search.toLowerCase());

      const statusLabel = report.tertolak
        ? "Rejected"
        : report.status === 3
          ? "Completed"
          : report.status === 0
            ? "Draft"
            : "Ongoing";

      const statusMatch =
        formData.status === "" ||
        formData.status === "All Status" ||
        formData.status === statusLabel;

      const severityMatch =
        formData.severity === "" ||
        formData.severity === "Severity Level" ||
        (report.skalaCedera === 3 && formData.severity === "Severe") ||
        (report.skalaCedera === 2 && formData.severity === "Moderate") ||
        (report.skalaCedera === 1 && formData.severity === "Minor");

      return searchMatch && statusMatch && severityMatch;
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="font-jakarta flex min-h-screen w-full flex-col gap-7 overflow-hidden text-white lg:h-full lg:min-h-0 lg:bg-transparent lg:p-0">
      {/* History */}
      <div className="flex h-screen flex-1 flex-col overflow-hidden pb-5 lg:pb-0">
        <div className="flex shrink-0 flex-col">
          <h2 className="text-[7vw] font-extrabold md:text-2xl">History</h2>
          <p className="text-[4vw] text-[#B5B5B5] md:text-sm">
            View all safety reports in Solanum to monitor issues and support better workplace
            safety.
          </p>
        </div>

        <div className="mt-2 flex h-full flex-1 flex-col gap-2 overflow-hidden rounded-2xl border border-[#2B2E4D] bg-[#2B2E4D]/30 p-2 shadow-lg">
          {/* Search Bar */}
          <InputForm
            type="text"
            name="search"
            placeholder="Search reports..."
            value={formData.search}
            onChange={handleChange}
            className="h-10 rounded-lg border-[#A3A5B1] text-base"
          />

          {/* Filters */}
          <div className="flex shrink-0 flex-col gap-3 md:flex-row md:items-center">
            <p className="text-lg font-medium text-[#FFFFFF] md:text-sm">Filter:</p>
            <div className="flex w-[60%] flex-col gap-3 sm:flex-row sm:gap-4 md:w-[40%]">
              <Dropdown1
                name="status"
                placeholder="All Status"
                options={statusOptions}
                formData={formData}
                handleChange={handleChange}
                className="h-10 rounded-lg border-[#A3A5B1] text-base"
              />
              <Dropdown1
                name="severity"
                placeholder="Severity Level"
                options={severityOptions}
                formData={formData}
                handleChange={handleChange}
                className="h-10 rounded-lg border-[#A3A5B1] text-base"
              />
            </div>
          </div>

          {/* All Reports */}
          <div className="mt-4 flex-1 overflow-hidden rounded-xl border border-[#C4C4C4]/20">
            <div className="relative h-[90vh] overflow-y-auto md:h-full">
              <table className="min-w-full text-left text-sm whitespace-nowrap">
                <thead className="sticky top-0 z-10 bg-[#2B2E4D] text-base md:text-sm">
                  <tr>
                    <th className="px-3 py-3 font-semibold md:w-[25vw]">Title</th>
                    <th className="hidden px-3 py-3 font-semibold md:table-cell">Department</th>
                    <th className="hidden px-3 py-3 font-semibold sm:table-cell">Date</th>
                    <th className="hidden px-3 py-3 font-semibold lg:table-cell">Severity</th>
                    <th className="px-3 py-3 font-semibold">Status</th>
                    <th className="px-3 py-3 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReports.length > 0 ? (
                    filteredReports.map((report) => (
                      <tr
                        key={report.idSurat}
                        className="border-b border-[#C4C4C4]/20 bg-[#2B2E4D]/30 text-base transition-colors hover:bg-[#C4C4C4]/10 md:text-sm"
                      >
                        <td className="max-w-[30vw] truncate overflow-hidden px-3 py-4 text-sm font-semibold text-ellipsis md:w-[25vw] md:max-w-xs md:text-base">
                          {report.detail}
                        </td>
                        <td className="hidden px-3 py-4 text-[#C4C4C4] md:table-cell">
                          {report.departemen}
                        </td>
                        <td className="hidden px-3 py-4 text-[#C4C4C4] sm:table-cell">
                          {new Date(report.tanggal).toLocaleDateString()}
                        </td>
                        <td className="hidden px-3 py-4 lg:table-cell">
                          <Severity level={report.skalaCedera} />
                        </td>
                        <td className="px-3 py-4">
                          <Status status={report.status} tertolak={report.tertolak} />
                        </td>
                        <td className="px-3 py-4 text-center">
                          <div className="justify-left flex items-center space-x-2 md:space-x-5">
                            <FaEye
                              title="View Report"
                              className="cursor-pointer"
                              onClick={() => {
                                setSelectedReport(report);
                                setShowOverview(true);
                              }}
                            />
                            {report.status === 3 && !report.tertolak && (
                              <FaDownload title="Download Report" className="cursor-pointer" />
                            )}
                            {report.status === 0 && !report.tertolak && (
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
