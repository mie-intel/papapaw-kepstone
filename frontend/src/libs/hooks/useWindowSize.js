"use client";
import { useState, useEffect } from "react";

export const useWindowSize = () => {
  const [size, setSize] = useState({ width: -1, height: -1 });
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return size;
};
