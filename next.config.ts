import type { NextConfig } from "next";
  import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
    allowedDevOrigins:["localhost", "192.168.XXX.XX"],
    reactCompiler: true,
    turbopack: {
        root: path.join(__dirname),
    }
};

export default nextConfig;
