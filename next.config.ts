import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/resume',
        destination: '/Shivam_Chaudhary_Resume.pdf',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
