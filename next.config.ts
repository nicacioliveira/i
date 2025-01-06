import type { NextConfig } from 'next'

const config: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['*'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      }
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
}

export default config
