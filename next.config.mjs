/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    disableStaticImages: false,
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? undefined : '',
};

export default nextConfig;
