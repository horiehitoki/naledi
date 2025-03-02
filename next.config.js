/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@atproto/api"],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.bsky.app",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cardyb.bsky.app",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
