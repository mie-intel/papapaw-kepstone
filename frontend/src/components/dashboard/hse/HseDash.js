"use client";
import React, { useState, useEffect } from "react";
import { FaFileAlt } from "react-icons/fa";
import { IoCheckmarkDoneCircle, IoPencilSharp } from "react-icons/io5";
import { FaClock, FaCircleInfo, FaEye, FaTrashCan, FaDownload } from "react-icons/fa6";
import CardReport from "@/components/allPage/CardReport";
import InputForm from "@/components/allPage/InputForm";
import { Dropdown1 } from "@/components/allPage/Dropdown";
import { laporan, mockReports2 } from "@/libs/constants/mockData";
import Status from "@/components/allPage/Status";
import Severity from "@/components/allPage/Severity";
import Overview from "@/components/allPage/Overview";
import { Button1, Button4 } from "@/components/allPage/Button";
import HseCreate from "./HseCreate";
import { LaporanContext } from "@/components/contexts/LaporanContext";
import { useRouter } from "next/navigation";
import { set } from "zod";
import { showToast } from "@/libs/helpers/toaster";

export default function HseDash() {
  const [selectedReport, setSelectedReport] = useState(null);
  const [showOverview, setShowOverview] = useState(false);
  const statusOptions = ["All Status", "Ongoing", "Completed", "Draft", "Rejected"];
  const severityOptions = ["Severity Level", "Severe", "Moderate", "Minor"];
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reportToDelete, setReportToDelete] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [editingDraft, setEditingDraft] = useState(null);
  const [formData, setFormData] = useState({
    status: "",
    severity: "",
    search: "",
  });
  // console.log("Form Data:", formData);
  const router = useRouter();

  const { getAllLaporan, deleteByIdSurat } = React.useContext(LaporanContext);
  const [laporan, setLaporan] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [update, setUpdate] = React.useState(false);

  // // console.log("Laporan data:", laporan);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      // setLaporan(mockReports2);
      const response = await getAllLaporan();
      if (response.success) {
        setLaporan(response.data.data);
      } else {
        // console.log("Failed to fetch reports:", response.error);
      }
      setUpdate(false);
      setLoading(false);
    };
    init();
  }, [update]);

  // // console.log("Laporan state:", laporan);
  const filteredReports = laporan.filter((report) => {
    // // console.log("Filtering report:", report, report.departemen, report.lokasi, report.detail);

    const searchMatch =
      (report.detail && report.detail.toLowerCase().includes(formData.search.toLowerCase())) ||
      (report.lokasi && report.lokasi.toLowerCase().includes(formData.search.toLowerCase())) ||
      (report.departemen &&
        report.departemen.toLowerCase().includes(formData.search.toLowerCase()));

    const statusLabel = report.tertolak
      ? "Rejected"
      : report.status === 3
        ? "Completed"
        : report.status === 0
          ? "Draft"
          : "Ongoing";

    const statusMatch =
      formData.status === "" || formData.status === "All Status" || formData.status === statusLabel;

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
    // console.log("Handling change for", name, "with value", value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleDeleteDraft = async () => {
    if (reportToDelete) {
      setUpdate(true);
      const response = await deleteByIdSurat(reportToDelete.idSurat);
      // // console.log("Deleting draft:", reportToDelete.idSurat);

      if (response.success) {
        showToast(true, "Report deleted successfully");
      } else {
        showToast(false, response.error || "Failed to delete report");
      }
    }
    setReportToDelete(null);
    setShowDeleteModal(false);
    router.refresh();
  };

  return (
    <div className="font-jakarta flex min-h-screen w-full flex-col gap-7 overflow-hidden text-white lg:h-full lg:min-h-0 lg:bg-transparent lg:p-0">
      {!showCreate ? (
        <>
          {/* Dashboard */}
          <div className="flex shrink-0 flex-col">
            <h2 className="text-[7vw] font-extrabold md:text-2xl">Dashboard</h2>
            <p className="text-[4vw] text-[#B5B5B5] md:text-sm">
              Welcome! Here is the overview of HSE reports.
            </p>
          </div>

          <div className="flex shrink-0 flex-row flex-wrap justify-center gap-5 md:justify-start">
            <CardReport
              label="Total"
              value={laporan.length}
              icon={<FaFileAlt className="h-full w-[37px] text-[#0273EA]" />}
            />
            <CardReport
              label="Completed"
              value={laporan.filter((r) => r.status === 3 && !r.tertolak).length}
              icon={<IoCheckmarkDoneCircle className="h-full w-[45px] text-[#34D391]" />}
            />
            <CardReport
              label="Ongoing"
              value={
                laporan.filter((r) => (r.status === 1 || r.status === 2) && !r.tertolak).length
              }
              icon={<FaClock className="h-full w-[35px] text-[#FDBC64]" />}
            />
            <CardReport
              label="Rejected"
              value={laporan.filter((r) => r.tertolak).length}
              icon={<FaCircleInfo className="h-full w-[35px] text-[#E8697E]" />}
            />
            <CardReport
              label="Draft"
              value={laporan.filter((r) => r.status === 0 && !r.tertolak).length}
              icon={<FaFileAlt className="h-full w-[37px] text-[#C4C4C4]" />}
            />
          </div>

          {/* History Section */}
          <div className="flex h-screen flex-1 flex-col overflow-hidden pb-5 lg:pb-0">
            <div className="flex shrink-0 flex-col">
              <h2 className="text-[7vw] font-extrabold md:text-2xl">History</h2>
              <p className="text-[4vw] text-[#B5B5B5] md:text-sm">
                View all submitted and draft reports.
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
                    options={statusOptions}
                    formData={formData}
                    handleChange={handleChange}
                    className="h-10 rounded-lg border-[#A3A5B1] text-base text-nowrap"
                  />
                  <Dropdown1
                    name="severity"
                    placeholder="Severity Level"
                    options={severityOptions}
                    formData={formData}
                    handleChange={handleChange}
                    className="h-10 rounded-lg border-[#A3A5B1] text-base text-nowrap"
                  />
                </div>
              </div>

              {/* Reports Table */}

              <div className="mt-4 flex-1 overflow-hidden rounded-xl border border-[#C4C4C4]/20">
                <div className="relative h-[90vh] overflow-y-auto md:h-full">
                  <table className="min-w-full text-left text-sm whitespace-nowrap">
                    <thead className="sticky top-0 z-10 bg-[#2B2E4D] text-base md:text-sm">
                      <tr>
                        <th className="px-3 py-3 font-semibold">Title</th>
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
                        filteredReports.map((report) => {
                          // // console.log("Rendering report:", report);
                          return (
                            <tr
                              key={report.idSurat}
                              className="border-b border-[#C4C4C4]/20 bg-[#2B2E4D]/30 text-base transition-colors hover:bg-[#C4C4C4]/10 md:text-sm"
                            >
                              <td className="max-w-[30vw] truncate overflow-hidden px-3 py-4 text-sm font-semibold md:max-w-[15vw] md:text-base xl:max-w-xs">
                                {report.title}
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
                                <div className="flex items-center space-x-2 md:space-x-5">
                                  <FaEye
                                    title="View Report"
                                    className="cursor-pointer duration-300 hover:text-[#B4B4B4]"
                                    onClick={() => {
                                      setSelectedReport(report);
                                      setShowOverview(true);
                                    }}
                                  />
                                  {(report.status === 0 || report.tertolak) && (
                                    <>
                                      <IoPencilSharp
                                        title="Edit Report"
                                        className="cursor-pointer duration-300 hover:text-[#B4B4B4]"
                                        onClick={() => {
                                          setEditingDraft(report);
                                          setShowCreate(true);
                                        }}
                                      />
                                      <FaTrashCan
                                        title="Delete Report"
                                        className="cursor-pointer duration-300 hover:text-[#E8697E]"
                                        onClick={() => {
                                          setReportToDelete(report);
                                          setShowDeleteModal(true);
                                        }}
                                      />
                                    </>
                                  )}
                                  {}
                                </div>
                              </td>
                            </tr>
                          );
                        })
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
        </>
      ) : (
        <HseCreate
          draftData={editingDraft}
          onClose={() => {
            setShowCreate(false);
            setEditingDraft(null);
            setUpdate(true);
          }}
        />
      )}

      {showOverview && <Overview report={selectedReport} onClose={() => setShowOverview(false)} />}

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-[#2B2E4D]/40 bg-[#2B2E4D] p-8 shadow-2xl">
            <h3 className="mb-6 text-center text-xl font-bold text-white">
              Are you sure you want to delete this draft?
            </h3>
            <div className="flex justify-center gap-4">
              <Button4
                label="Cancel"
                onClick={() => {
                  setReportToDelete(null);
                  setShowDeleteModal(false);
                }}
                className="mt-0"
              />
              <Button1
                label="Delete"
                onClick={handleDeleteDraft}
                className="mt-0 bg-[#E8697E] hover:bg-[#e14f68]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
