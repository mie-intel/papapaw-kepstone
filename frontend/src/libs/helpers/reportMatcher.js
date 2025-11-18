export const reportMatcher = (laporan, formData) => {
  return laporan.filter((report) => {
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
};
