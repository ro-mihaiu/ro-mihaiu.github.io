/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages needs a static export; Vercel needs server output for API routes.
  ...(process.env.STATIC_EXPORT === 'true' ? { output: 'export' } : {}),
  reactStrictMode: false,
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
  trailingSlash: true,
};

module.exports = nextConfig;
