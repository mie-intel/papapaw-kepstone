"use client";

import React from "react";
import Dashboard from "@/components/dashboard/reviewer/Dashboard";

export default function KepalaDashBoard() {
  const Role = "Kepala Departemen";
  const filterDashboard = (report) => report.status === 1 || report.status === 2;

  return <Dashboard Role={Role} filterDashboard={filterDashboard} />;
}
