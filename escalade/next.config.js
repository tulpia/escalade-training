/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  transpilePackages: ["@nivo"],
  experimental: { esmExternals: "loose" },
};

module.exports = nextConfig;
