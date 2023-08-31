/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },

  async headers() {
    return [
      {
        source: '/pages/api/subscriber_email',
        headers: [
          // Diğer başlıklar
        ],
      },
    ]
  },
}

module.exports = nextConfig
