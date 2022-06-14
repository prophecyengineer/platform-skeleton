

/* @type {import('next').NextConfig}
*/
const nextConfig = {
  
  images: {
    domains: ['img.icons8.com'],
  },
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
 /* config options here */
}

module.exports = nextConfig