/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://findmyusers.com',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  generateIndexSitemap: true,
  
  // 排除不需要被搜索引擎索引的页面
  exclude: [
    '/admin/*',
    '/login',
    '/*/admin/*',
    '/*/login',
    '/test-animation',
    '/*/test-animation',
    '/api/*'
  ],

  // 多语言支持
  alternateRefs: [
    {
      href: 'https://findmyusers.com/zh',
      hreflang: 'zh-CN',
    },
    {
      href: 'https://findmyusers.com/en', 
      hreflang: 'en-US',
    },
    {
      href: 'https://findmyusers.com/zh',
      hreflang: 'x-default',
    },
  ],

  // 自定义转换函数
  transform: async (config, path) => {
    // 为不同类型的页面设置不同的优先级
    let priority = config.priority;
    let changefreq = config.changefreq;

    // 主页优先级最高
    if (path === '/zh' || path === '/en') {
      priority = 1.0;
      changefreq = 'daily';
    }
    // 站点列表页面
    else if (path.includes('/site') && !path.includes('/site/')) {
      priority = 0.9;
      changefreq = 'daily';
    }
    // 文章列表页面
    else if (path.includes('/posts') && !path.includes('/posts/')) {
      priority = 0.8;
      changefreq = 'weekly';
    }
    // 具体站点详情页
    else if (path.includes('/site/')) {
      priority = 0.7;
      changefreq = 'weekly';
    }
    // 具体文章页面
    else if (path.includes('/posts/')) {
      priority = 0.6;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },

  // 添加动态路径
  additionalPaths: async (config) => {
    const result = [];

    // 添加根路径重定向
    result.push({
      loc: '/',
      changefreq: 'daily',
      priority: 1.0,
      lastmod: new Date().toISOString(),
    });

    return result;
  },

  // robots.txt 配置
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/login',
          '/test-animation'
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/login'
        ],
      },
      {
        userAgent: 'Baiduspider',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/login'
        ],
      }
    ],
    additionalSitemaps: [
      // 如果有动态sitemap可以在这里添加
    ],
  },
}
