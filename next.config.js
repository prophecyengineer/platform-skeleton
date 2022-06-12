/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
    
  },
  env: {
    REACT_APP_STREAM_API_KEY: process.env.REACT_APP_STREAM_API_KEY,
    REACT_APP_STREAM_APP_ID: process.env.REACT_APP_STREAM_APP_ID,
  },
}


module.exports = nextConfig
