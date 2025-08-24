/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable server components
  },
  webpack: (config) => {
    // Handle three.js imports
    config.externals = config.externals || []
    config.externals.push({
      canvas: 'canvas',
    })
    return config
  },
}

module.exports = nextConfig