"use client";
import React, { useState, useContext, useEffect } from "react";
import { LaporanContext } from "@/components/contexts/LaporanContext";
import CardReport from "@/components/allPage/CardReport";
import { FaFileAlt, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import Status from "@/components/allPage/Status";
import Review from "@/components/dashboard/reviewer/Review";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";

export default function Dashboard({ Role, filterDashboard }) {
  const [selectedReport, setSelectedReport] = useState(null);
  const [showReview, setShowReview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [laporan, setLaporan] = useState([]);
  const { getAllLaporan } = useContext(LaporanContext);
  const [update, setUpdate] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const response = await getAllLaporan();
      setLaporan(response.data.data);
      setLoading(false);
      setUpdate(false);
    };
    init();
  }, [update]);
  const filteredLaporan = laporan.filter(filterDashboard);

  const handleViewDetails = (report) => {
    setSelectedReport(report);
    setShowReview(true);
  };

  const handleCloseReview = () => {
    setShowReview(false);
    setSelectedReport(null);
    router.refresh();
    setUpdate(true);
  };

  return (
    <div className="font-jakarta flex min-h-screen w-full flex-col gap-4 overflow-hidden text-white lg:h-full lg:min-h-0 lg:bg-transparent lg:p-0">
      {!showReview ? (
        <>
          <div className="flex shrink-0 flex-col">
            <h2 className="text-[6.5vw] font-extrabold md:text-2xl">Dashboard</h2>
            <p className="text-[4vw] text-[#B5B5B5] md:text-sm">
              Welcome! Here is the overview of {Role} reports.
            </p>
          </div>

          <div className="flex shrink-0 flex-row flex-wrap justify-center gap-5 md:justify-start">
            <CardReport
              label="Total"
              value={filteredLaporan.length}
              icon={<FaFileAlt className="h-full w-[37px] text-[#0273EA]" />}
            />
            <CardReport
              label="Ongoing"
              value={filteredLaporan.length}
              icon={<FaClock className="h-full w-[35px] text-[#FDBC64]" />}
            />
          </div>

          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex shrink-0 flex-col">
              <h2 className="text-[6.5vw] font-extrabold md:text-2xl">Reports Awaiting Approval</h2>
              <p className="text-[4vw] text-[#B5B5B5] md:text-sm">
                Here are the reports awaiting your approval.
              </p>
            </div>

            <div className="mt-2 flex w-full flex-1 flex-col gap-2 overflow-hidden rounded-2xl border border-[#C4C4C4]/20 bg-[#2B2E4D]/20 p-2">
              {loading ? (
                <div className="flex h-full w-full items-center justify-center">
                  <p className="text-gray-400">Loading reports...</p>
                </div>
              ) : (
                <div className="relative h-[70vh] overflow-y-auto pr-2 md:h-full">
                  {filteredLaporan.length > 0 ? (
                    filteredLaporan.map((report) => (
                      <div
                        key={report.idSurat}
                        className="mb-2 flex flex-row justify-between rounded-xl bg-[#2B2E4D]/60 p-4 shadow-md transition-all hover:bg-[#2B2E4D]/80 md:items-start"
                      >
                        <div className="flex flex-row items-start gap-3">
                          <FaFileAlt className="mt-1 hidden text-[#0273EA] md:flex md:w-[15px]" />
                          <div className="flex flex-col items-start text-left">
                            <h3 className="w-[50vw] max-w-full truncate overflow-hidden text-lg font-semibold text-ellipsis whitespace-nowrap md:w-full">
                              {report.title}
                            </h3>
                            <p className="text-sm text-gray-300">({report.lokasi})</p>
                            <div className="mt-1 grid w-full grid-cols-1 items-center justify-between gap-1 text-sm text-[#A3A3A3] md:w-[400px] md:grid-cols-2">
                              <span className="flex items-center gap-1">
                                <FaMapMarkerAlt className="text-[#B4B4B4]" /> {report.departemen}
                              </span>
                              <span className="flex items-center gap-1">
                                <FaCalendarAlt className="text-[#B4B4B4]" />{" "}
                                {new Date(report.tanggal).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 flex h-full flex-col items-center justify-between gap-3 md:mt-0">
                          <Status status={report.status} tertolak={report.tertolak} />
                          <button
                            onClick={() => handleViewDetails(report)}
                            className="cursor-pointer rounded-lg border border-[#FDBC64]/30 px-3 py-1 text-sm font-semibold text-white transition hover:bg-[#FDBC64]/10 active:bg-[#FDBC64]/20"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <p className="text-gray-400">No reports awaiting approval.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="relative">
          {/* Back Button */}
          <button
            onClick={handleCloseReview}
            className="flex items-center gap-2 text-gray-400 transition hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Dashboard
          </button>

          {/* Review Component */}
          <Review
            reportData={{
              title: selectedReport?.title || "",
              idSurat: selectedReport?.idSurat || "",
              lokasi: selectedReport?.lokasi || "",
              departemen: selectedReport?.departemen || "",
              skalaCedera: selectedReport?.skalaCedera || "Minor",
              incidentDate: selectedReport?.tanggal || "",
              detail: selectedReport?.detail || "No description available",
            }}
            onClose={handleCloseReview}
          />
        </div>
      )}
    </div>
  );
}

Dashboard.propTypes = {
  Role: PropTypes.string.isRequired,
  filterDashboard: PropTypes.func.isRequired,
};
