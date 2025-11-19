/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.pexels.com', 'i.ibb.co'],
    unoptimized: true
  },
  async rewrites() {
    return [
    ];
  }
};

module.exports = nextConfig;