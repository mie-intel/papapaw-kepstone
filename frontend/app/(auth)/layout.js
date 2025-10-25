import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "@/styles/global.css";
import PropTypes from "prop-types";

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
  title: "Solarium",
  description: "Authentication of Solarium",
};

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} ${plusJakarta.variable} antialiased flex items-center justify-center min-h-screen`}
      >
        <div className="w-full min-h-screen bg-dark-2 lg:bg-dark-1 text-white shadow-lg">
          {children}
        </div>
      </body>
    </html>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
