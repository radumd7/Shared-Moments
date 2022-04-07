/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['momentsapp.s3.eu-central-1.amazonaws.com', 'lh3.googleusercontent.com']
  },
}

module.exports = nextConfig
