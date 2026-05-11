/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["ui"],
  typescript: {
    ignoreBuildErrors: true,
  }
};

module.exports = nextConfig;