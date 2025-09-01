// tailwind.config.js
const { extendedColor } = require("./src/libs/constants/extendedColor");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: extendedColor,
      screens: {
        xs: "560px",
        xxs: "480px",
      },
      fontFamily: {
        // "eudoxus-bold": ["var(--font-eudoxus-bold)"],
        // "eudoxus-extrabold": ["var(--font-eudoxus-extrabold)"],
        // "eudoxus-light": ["var(--font-eudoxus-light)"],
        // "eudoxus-regular": ["var(--font-eudoxus-regular)"],
        // "eudoxus-medium": ["var(--font-eudoxus-medium)"],
      },
      dropShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
        md: "0 4px 6px rgba(0, 0, 0, 0.1)",
        lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
        xl: "0 20px 25px rgba(0, 0, 0, 0.1)",
        "2xl": "0 25px 50px rgba(0, 0, 0, 0.25)",
      },
      insetShadow: {
        sm: "inset 0 1px 2px rgba(0, 0, 0, 0.05), inset 0 -1px 2px rgba(0, 0, 0, 0.05)",
        md: "inset 0 4px 6px rgba(0, 0, 0, 0.1), inset 0 -4px 6px rgba(0, 0, 0, 0.1)",
        lg: "inset 0 10px 15px rgba(0, 0, 0, 0.1), inset 0 -10px 15px rgba(0, 0, 0, 0.1)",
        xl: "inset 0 20px 25px rgba(0, 0, 0, 0.1), inset 0 -20px 25px rgba(0, 0, 0, 0.1)",
      },
    },
  },
};
