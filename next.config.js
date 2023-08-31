/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },

  async headers() {
    return [
      {
        source: '/pages/api/subscriber_email',
        // matching all API routes
        source: '/api/:path*',
        headers: [
          // Diğer başlıklar
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' }, // replace this your actual origin
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,DELETE,PATCH,POST,PUT',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
