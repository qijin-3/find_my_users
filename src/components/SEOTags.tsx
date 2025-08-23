/**
 * SEO标签组件
 * 提供搜索引擎验证和其他SEO优化标签
 */
export default function SEOTags() {
  return (
    <>
      {/* 搜索引擎验证标签 */}
      {process.env.GOOGLE_SITE_VERIFICATION && (
        <meta name="google-site-verification" content={process.env.GOOGLE_SITE_VERIFICATION} />
      )}
      {process.env.BAIDU_SITE_VERIFICATION && (
        <meta name="baidu-site-verification" content={process.env.BAIDU_SITE_VERIFICATION} />
      )}
      {process.env.BING_SITE_VERIFICATION && (
        <meta name="msvalidate.01" content={process.env.BING_SITE_VERIFICATION} />
      )}
      {process.env.YANDEX_VERIFICATION && (
        <meta name="yandex-verification" content={process.env.YANDEX_VERIFICATION} />
      )}
      
      {/* 其他SEO优化标签 */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="FindMyUsers" />
      
      {/* DNS预解析 */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//vercel.live" />
      
      {/* 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "FindMyUsers",
            "description": "独立开发者推广渠道导航站",
            "url": process.env.NEXT_PUBLIC_SITE_URL || 'https://findmyusers.com',
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "author": {
              "@type": "Organization",
              "name": "FindMyUsers Team"
            }
          })
        }}
      />
    </>
  )
}
