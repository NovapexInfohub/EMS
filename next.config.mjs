/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
<<<<<<< HEAD
  devIndicators: false
=======
  devIndicators: false, 
>>>>>>> ac5dd4c5399b1878f12036e85706cf1482885d1e
}

export default nextConfig
