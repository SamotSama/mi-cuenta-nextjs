/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    reactStrictMode: true,
    env: {
      SERVER_IP: process.env.SERVER_IP,
    }
  }
