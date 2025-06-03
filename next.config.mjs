/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['127.0.0.1'],  // разрешаем подгружать картинки с локального API
  },
};

export default nextConfig;
