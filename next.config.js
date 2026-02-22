/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  basePath: '/-News',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
