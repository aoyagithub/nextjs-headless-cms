/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
  ...nextConfig,
  images: {
    domains: ['images.microcms-assets.io'],
  },
  experimental: {
    images: {
      layoutRaw: true,
    },
  },
}
