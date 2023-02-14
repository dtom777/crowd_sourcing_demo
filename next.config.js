/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    WEBAPP_URL: process.env.WEBAPP_URL,
  },
};

module.exports = nextConfig;
