import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    /* config options here */
    basePath: '/bengle',
    output: 'export',
    images: {
        unoptimized: true,
    },
}

export default nextConfig
