/** @type {import('next').NextConfig} */

module.exports = {
  output: "standalone",
  trailingSlash: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
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
  webpack: (config) => {
    config.resolve.mainFields = ["browser", "module", "main"];
    return config;
  },
};
