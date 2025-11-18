import React from "react";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "@/styles/global.css";
import PropTypes from "prop-types";
import { AuthProvider } from "@/components/contexts/AuthContext";
import ToasterComponent from "@/components/allPage/Toaster";
import { LaporanProvider } from "@/components/contexts/LaporanContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    template: "%s | Solanum Agrotech",
    default: "Solanum Agrotech",
  },
  description: "Sistem Pelaporan Kondisi Lingkungan Kerja",
  icons: {
    icon: [
      {
        url: `/assets/favicon/favicon-16x16.png`,
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: `/assets/favicon/favicon-32x32.png`,
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: `/assets/favicon/android-chrome-512x512.png`,
        sizes: "512x512",
        type: "image/png",
      },
      { url: `/assets/favicon/favicon.ico` },
    ],
    apple: [
      {
        url: `/assets/favicon/apple-touch-icon.png`,
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: [{ url: `/assets/favicon/favicon.ico` }],
    other: [
      {
        rel: "android-chrome-192x192",
        url: `/assets/favicon/android-chrome-192x192.png`,
        sizes: "192x192",
      },
      {
        rel: "android-chrome-512x512",
        url: `/assets/favicon/android-chrome-512x512.png`,
        sizes: "512x512",
      },
    ],
  },

  manifest: `/assets/favicon/site.webmanifest`,
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${plusJakarta.variable} antialiased`}
      >
        <ToasterComponent>
          <AuthProvider>
            <LaporanProvider>{children}</LaporanProvider>
          </AuthProvider>
        </ToasterComponent>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
