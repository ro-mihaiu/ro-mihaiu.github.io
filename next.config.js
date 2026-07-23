/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: false,
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
  // GitHub Pages serves the generated static site from ./out.
  trailingSlash: true,
};

module.exports = nextConfig;
