"use client";

import History from "../reviewer/History";
import React from "react";
export default function KepalaHistory() {
  const filterHistory = (report) => report.status !== 0 && !report.tertolak;

  return <History filterHistory={filterHistory} />;
}
