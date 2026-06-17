/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
  output: 'export',
  trailingSlash: true,
};

module.exports = nextConfig;
