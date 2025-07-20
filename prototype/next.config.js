/** @type {import('next').NextConfig} */
const nextConfig = {
  // No static export needed for Vercel
  trailingSlash: false,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig