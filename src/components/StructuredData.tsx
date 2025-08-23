export interface StructuredDataProps {
  data: Record<string, any> | Record<string, any>[]
}

/**
 * 结构化数据组件
 * 为页面添加JSON-LD格式的结构化数据，帮助搜索引擎理解页面内容
 */
export default function StructuredData({ data }: StructuredDataProps) {
  const dataArray = Array.isArray(data) ? data : [data]

  return (
    <>
      {dataArray.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item, null, 0)
          }}
        />
      ))}
    </>
  )
}

/**
 * 生成网站结构化数据
 */
export function generateWebsiteStructuredData(locale: string) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://findmyusers.com'
  
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "FindMyUsers",
    "description": locale === 'zh' 
      ? "独立开发者推广渠道导航站，帮助开发者找到首批用户"
      : "Promotion channels directory for indie developers to find their first users",
    "url": `${siteUrl}/${locale}`,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/${locale}/site?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "FindMyUsers",
      "url": siteUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/Logo/Logo.svg`,
        "width": 200,
        "height": 200
      }
    },
    "inLanguage": locale === 'zh' ? 'zh-CN' : 'en-US',
    "copyrightYear": new Date().getFullYear(),
    "genre": "Business Directory"
  }
}

/**
 * 生成组织结构化数据
 */
export function generateOrganizationStructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://findmyusers.com'
  
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FindMyUsers",
    "description": "A curated directory of promotion channels for indie developers",
    "url": siteUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${siteUrl}/Logo/Logo.svg`,
      "width": 200,
      "height": 200
    },
    "foundingDate": "2024",
    "slogan": "Your first users, start here.",
    "knowsAbout": [
      "Product Promotion",
      "User Acquisition", 
      "Marketing Channels",
      "Indie Development",
      "Startup Growth"
    ],
    "sameAs": [
      "https://github.com/findmyusers"
    ]
  }
}

/**
 * 生成文章结构化数据
 */
export function generateArticleStructuredData(article: {
  title: string
  description: string
  slug: string
  date: string
  content: string
  locale: string
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://findmyusers.com'
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "url": `${siteUrl}/${article.locale}/posts/${article.slug}`,
    "datePublished": article.date,
    "dateModified": article.date,
    "inLanguage": article.locale === 'zh' ? 'zh-CN' : 'en-US',
    "author": {
      "@type": "Organization",
      "name": "FindMyUsers Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "FindMyUsers",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/Logo/Logo.svg`,
        "width": 200,
        "height": 200
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteUrl}/${article.locale}/posts/${article.slug}`
    },
    "wordCount": article.content.length,
    "genre": "Technology",
    "keywords": article.locale === 'zh' 
      ? "独立开发者,产品推广,用户获取"
      : "indie developers,product promotion,user acquisition"
  }
}

/**
 * 生成站点详情结构化数据
 */
export function generateSiteDetailStructuredData(site: {
  name: string
  description: string
  url: string
  slug: string
  locale: string
  category?: string
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://findmyusers.com'
  
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": site.name,
    "description": site.description,
    "url": site.url,
    "category": site.category || "Marketing Tool",
    "inLanguage": site.locale === 'zh' ? 'zh-CN' : 'en-US',
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteUrl}/${site.locale}/site/${site.slug}`
    },
    "isPartOf": {
      "@type": "WebSite",
      "name": "FindMyUsers",
      "url": siteUrl
    }
  }
}
