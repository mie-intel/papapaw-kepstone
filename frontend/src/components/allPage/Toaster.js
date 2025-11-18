"use client";
import React from "react";
import { Toaster, toast } from "react-hot-toast";
import PropTypes from "prop-types";

export const showToast = (success, message) => {
  const options = {
    duration: 5000,
    position: "top-right",
    // Styling highlight: left border green for success, red for error
    style: {
      borderLeft: `6px solid ${success ? "#16a34a" : "#dc2626"}`,
      padding: "12px 16px",
    },
  };

  if (success) {
    toast.success(message, options);
  } else {
    toast.error(message, options);
  }
};

export default function ToasterComponent({ children }) {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
}

ToasterComponent.propTypes = { children: PropTypes.node.isRequired };
