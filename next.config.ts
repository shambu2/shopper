import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental:{
    serverActions:{
      bodySizeLimit: '3mb'
    }
  },
  images:{
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: "",  
        pathname: "/**"
      }
    ]
  },
  eslint:{
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
