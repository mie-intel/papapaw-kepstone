/** @type {import('next').NextConfig} */

module.exports = {
  trailingSlash: false,
  // compiler: {
  //   remove, // console: process.env.NODE_ENV === "production",
  // },
  async rewrites() {
    return [
      {
        source: "/.well-known/:path*",
        destination: "/.well-known/:path*",
      },
    ];
  },
  images: {
    loader: "custom",
    loaderFile: "./src/libs/helpers/loader.js",
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
        port: "",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.resolve.mainFields = ["browser", "module", "main"];
    return config;
  },
};
