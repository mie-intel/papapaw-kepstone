"use client";

import { useEffect, useState, createContext } from "react";
import axios from "@/config/axios-config";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
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
      const { token, jabatan } = response.data;
      Cookies.set("token", token, { expires: 1 / 24 });
      Cookies.set("role", jabatan, { expires: 1 / 24 });
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error: "Login failed. Please check your credentials.",
      };
    } finally {
      return {
        success: true,
      };
    }
  };

  const logout = async () => {
    Cookies.remove("token");
    Cookies.remove("role");
    console.log("Logged out");
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
        error: error.response.data.error,
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
