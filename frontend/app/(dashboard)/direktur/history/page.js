"use client";

import History from "@/components/dashboard/reviewer/History";
import React from "react";
export default function Page() {
  const filterHistory = (report) => report.status !== 0 && report.status !== 1 && !report.tertolak;
  return <History filterHistory={filterHistory} />;
}
