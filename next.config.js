/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
        pathname: "**",
        port: "3000",
        protocol: "http",
      },
      {
        hostname: "foxmarket-production.up.railway.app",
        protocol: "https",
        pathname: "**"
      }
    ]
  }
}

module.exports = nextConfig
