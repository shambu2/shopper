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
  }
};

export default nextConfig;
