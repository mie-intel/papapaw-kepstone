"use client";

import { createContext } from "react";
import axios from "@/config/axios-config";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { laporanSchema } from "@/libs/schema";

export const LaporanContext = createContext();

export const LaporanProvider = ({ children }) => {
  const getAxiosHeader = () => ({
    Authorization: `Bearer ${Cookies.get("token")}`,
  });

  const createLaporan = async (laporanData) => {
    const result = laporanSchema.safeParse(laporanData);
    if (!result.success) {
      console.log("Laporan validation errors:", result.error.issues);
      const error = result.error.issues[0].message;
      return {
        success: false,
        error,
      };
    }

    try {
      await axios.post("/laporan/", laporanData, {
        headers: getAxiosHeader(),
      });

      return {
        success: true,
      };
    } catch (error) {
      // Ambil pesan error dari backend
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.response?.data?.msg ||
        error.message ||
        "Creating laporan failed.";

      return {
        success: false,
        error: errorMessage,
      };
    }
  };

  const editLaporan = async (laporanData) => {
    const result = laporanSchema.safeParse({ ...laporanData, idSurat: undefined });
    if (!result.success) {
      console.log("Laporan validation errors:", result.error.issues);
      const error = result.error.issues[0].message;
      return {
        success: false,
        error,
      };
    }

    console.log("LAPORAN YANG DIKIRIM", laporanData);
    try {
      await axios.put("/laporan/", laporanData, {
        headers: getAxiosHeader(),
      });

      return {
        success: true,
      };
    } catch (error) {
      // Ambil pesan error dari backend
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.response?.data?.msg ||
        error.message ||
        "Editing laporan failed.";

      return {
        success: false,
        error: errorMessage,
      };
    }
  };

  const mock = {
    idSurat: "LPR001",
    uid: "EMP001",
    skalaCedera: 2,
    detail: "Minor finger injury caused by a metal cutting tool.",
    lokasi: "Workshop Mechanical Assembly",
    tanggal: new Date("2025-11-01"),
    status: 1,
    pesanKesalahan: "Need Validation",
    tertolak: true,
    departemen: "Mechanical Assembly",
  };

  const getAllLaporan = async () => {
    try {
      const response = await axios.get("/laporan/", {
        headers: getAxiosHeader(),
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, data: [] };
    }
  };

  const deleteByIdSurat = async (idSurat) => {
    try {
      await axios.delete(`/laporan/`, {
        headers: getAxiosHeader(),
        data: { idSurat },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return (
    <LaporanContext.Provider
      value={{
        createLaporan,
        editLaporan,
        getAllLaporan,
        deleteByIdSurat,
      }}
    >
      {children}
    </LaporanContext.Provider>
  );
};

LaporanProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
