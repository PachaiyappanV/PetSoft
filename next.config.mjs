/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "bytegrad.com", protocol: "https" }],
  },
};

export default nextConfig;
