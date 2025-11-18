"use client";

import React from "react";
import Dashboard from "@/components/dashboard/reviewer/Dashboard";

export default function Page() {
  const Role = "Direktur";
  const filterDashboard = (report) => report.status === 2 && !report.tertolak;

  return <Dashboard Role={Role} filterDashboard={filterDashboard} />;
}
