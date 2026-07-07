/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
  // output: 'export', // disabled because API routes are required for /api/send-commission
  // IMPORTANT: Next.js static export (output: 'export') breaks API routes.
  // For local testing + commission submissions, we must run in server mode.
  trailingSlash: true,
};

module.exports = nextConfig;
