/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
  };
  
  if (typeof require !== "undefined") {
    require("./src/utils/cronJob.js"); // 🚀 Starte den CronJob im Server
  }
  
  module.exports = nextConfig;
  