import { MetadataRoute } from 'next'
import { getI18nJsonData, getI18nArticlesList, getI18nSitesList } from '@/lib/i18n-data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://findmyusers.com'
  const locales = ['zh', 'en']
  
  const routes: MetadataRoute.Sitemap = []
  
  // 添加主页面
  routes.push({
    url: siteUrl,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
    alternates: {
      languages: {
        'zh': `${siteUrl}/zh`,
        'en': `${siteUrl}/en`,
      }
    }
  })

  for (const locale of locales) {
    // 主页
    routes.push({
      url: `${siteUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    })

    // 站点列表页
    routes.push({
      url: `${siteUrl}/${locale}/site`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    })

    // 文章列表页
    routes.push({
      url: `${siteUrl}/${locale}/posts`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    })

    // 获取所有站点
    try {
      const sites = await getI18nSitesList(locale)
      for (const site of sites) {
        routes.push({
          url: `${siteUrl}/${locale}/site/${site.slug}`,
          lastModified: site.date ? new Date(site.date) : new Date(),
          changeFrequency: 'weekly',
          priority: 0.7,
        })
      }
    } catch (error) {
      console.error(`Error fetching sites for locale ${locale}:`, error)
    }

    // 获取所有文章
    try {
      const articles = getI18nArticlesList(locale)
      for (const article of articles) {
        routes.push({
          url: `${siteUrl}/${locale}/posts/${article.slug}`,
          lastModified: article.lastModified ? new Date(article.lastModified) : (article.date ? new Date(article.date) : new Date()),
          changeFrequency: 'monthly',
          priority: 0.6,
        })
      }
    } catch (error) {
      console.error(`Error fetching articles for locale ${locale}:`, error)
    }
  }

  return routes
}
