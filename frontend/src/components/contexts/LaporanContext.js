"use client";

import React from "react";
import { createContext } from "react";
import axios from "@/config/axios-config";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { laporanSchema } from "@/libs/schema";

export const LaporanContext = createContext();

export const LaporanProvider = ({ children }) => {
  const getAxiosHeader = () => ({
    Authorization: `Bearer ${Cookies.get("token")}`,
    "Content-Type": "application/json",
  });

  const createLaporan = async (laporanData) => {
    const result = laporanSchema.safeParse(laporanData);
    if (!result.success) {
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
      const error = result.error.issues[0].message;
      return {
        success: false,
        error,
      };
    }

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

  const getAllLaporan = async () => {
    try {
      const response = await axios.get("/laporan/", {
        headers: getAxiosHeader(),
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message, data: [] };
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

  const approveSurat = async (idSurat) => {
    try {
      await axios.put(`/laporan/approve`, { idSurat }, { headers: getAxiosHeader() });
      return { success: true, message: "Laporan berhasil disetujui." };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const tolakSurat = async (idSurat, pesanKesalahan) => {
    try {
      await axios.put(`/laporan/tolak`, { idSurat, pesanKesalahan }, { headers: getAxiosHeader() });
      return { success: true, message: "Laporan berhasil ditolak." };
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
        approveSurat,
        tolakSurat,
      }}
    >
      {children}
    </LaporanContext.Provider>
  );
};

LaporanProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
