/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'science.nasa.gov',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.science.nasa.gov',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;




