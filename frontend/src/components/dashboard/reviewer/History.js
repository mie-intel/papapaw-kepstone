"use client";
import React, { useState, useEffect, useContext } from "react";
import { LaporanContext } from "@/components/contexts/LaporanContext";
import PropTypes from "prop-types";
import { FaEye } from "react-icons/fa6";
import InputForm from "@/components/allPage/InputForm";
import Severity from "@/components/allPage/Severity";
import Status from "@/components/allPage/Status";
import Overview from "@/components/allPage/Overview";
import { Dropdown1 } from "@/components/allPage/Dropdown";
import { reportMatcher } from "@/libs/helpers/reportMatcher";
import { STATUS_OPTIONS, SEVERITY_OPTIONS } from "@/libs/schema";

export default function History({ filterHistory }) {
  const [selectedReport, setSelectedReport] = useState(null);
  const [showOverview, setShowOverview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [laporan, setLaporan] = useState([]);
  const { getAllLaporan } = useContext(LaporanContext);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const response = await getAllLaporan();
        setLaporan(response.data.data);
      } catch (error) {
        console.error("Error fetching laporan:", error);
      }
      setLoading(false);
    };
    init();
  }, []);

  const [formData, setFormData] = useState({
    status: "",
    severity: "",
    search: "",
  });

  const filteredReports = reportMatcher(laporan.filter(filterHistory), formData);

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
          <div className="mt-2 flex shrink-0 flex-col gap-3 md:flex-row md:items-center">
            <p className="text-lg font-medium text-[#FFFFFF] md:text-sm">Filter:</p>
            <div className="flex w-[60%] flex-col gap-3 sm:flex-row sm:gap-4">
              <Dropdown1
                name="status"
                placeholder="All Status"
                options={STATUS_OPTIONS}
                formData={formData}
                handleChange={handleChange}
                className="h-10 rounded-lg border-[#A3A5B1] text-base text-nowrap"
              />
              <Dropdown1
                name="severity"
                placeholder="Severity Level"
                options={SEVERITY_OPTIONS}
                formData={formData}
                handleChange={handleChange}
                className="h-10 rounded-lg border-[#A3A5B1] text-base text-nowrap"
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
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="px-4 py-8 text-center text-gray-400">
                        Loading reports...
                      </td>
                    </tr>
                  ) : filteredReports.length > 0 ? (
                    filteredReports.map((report) => (
                      <tr
                        key={report.idSurat}
                        className="border-b border-[#C4C4C4]/20 bg-[#2B2E4D]/30 text-base transition-colors hover:bg-[#C4C4C4]/10 md:text-sm"
                      >
                        <td className="max-w-[30vw] truncate overflow-hidden px-3 py-4 text-sm font-semibold md:max-w-[15vw] md:text-base xl:max-w-xs">
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

History.propTypes = {
  filterHistory: PropTypes.func.isRequired,
};
