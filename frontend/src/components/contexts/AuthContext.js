"use client";

import React, { createContext } from "react";
import axios from "@/config/axios-config";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { loginSchema, registerSchema } from "@/libs/schema";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const login = async (username, password) => {
    const result = loginSchema.safeParse({ username, password });
    if (!result.success) {
      const error = result.error.issues[0].message;
      return {
        success: false,
        error,
      };
    }

    try {
      const response = await axios.post("/pekerja/login", { username, password });
      const { token, jabatan, nama } = response.data;
      Cookies.set("token", token, { expires: 1 / 24 });
      Cookies.set("role", jabatan, { expires: 1 / 24 });
      Cookies.set("nama", nama, { expires: 1 / 24 });
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
        "Login failed. Please check your credentials.";

      return {
        success: false,
        error: errorMessage,
      };
    }
  };

  const logout = async () => {
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("nama");
  };

  const register = async (formData) => {
    const result = registerSchema.safeParse(formData);

    if (!result.success) {
      const error = result.error.issues[0].message;
      return {
        success: false,
        error,
      };
    }
    try {
      await axios.post("/pekerja/register", formData);
      return {
        success: true,
        message: "Registrasi berhasil! Silakan login.",
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Registration failed.",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
