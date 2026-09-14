import createNextIntlPlugin from 'next-intl/plugin';
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

// 仅在本地开发时初始化 Cloudflare 代理，避免生产/CI 构建写入 wrangler 日志
if (process.env.NODE_ENV === 'development') {
  initOpenNextCloudflareForDev();
}

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 图片优化配置
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1年
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: true, // Cloudflare Workers 默认无 Image Optimization；部署后再按需接入 IMAGES binding
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's0.wp.com',
        pathname: '/mshots/v1/**',
      },
      {
        protocol: 'https',
        hostname: 'findmyusers.com',
        pathname: '/**',
      }
    ],
  },
  
  // 性能优化
  experimental: {
    optimizePackageImports: ['@phosphor-icons/react'],
  },

  // Next 15 + ESLint 8 的 flat config 兼容问题：先跳过构建期 lint，避免阻断部署
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // 压缩配置
  compress: true,
  
  // 重定向配置
  async redirects() {
    return [
      {
        source: '/sitemap_index.xml',
        destination: '/sitemap.xml',
        permanent: true,
      },
    ];
  },
  
  // 头部配置
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400'
          }
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400'
          }
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
