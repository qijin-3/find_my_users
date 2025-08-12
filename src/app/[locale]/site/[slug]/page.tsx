import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { getI18nSiteData, getI18nJsonData } from '@/lib/i18n-data'
import { getFieldDisplayText } from '@/lib/field-utils'
import { Link } from '@/i18n/navigation'
import { ArrowLeft, CaretRight } from '@phosphor-icons/react/dist/ssr'
import AnimatedTextServer from '@/components/ui/animated-text-server'
import SiteBadge from '@/components/ui/site-badge'
import SiteActionButtons from '@/components/SiteActionButtons'
import Image from 'next/image'

// 类型定义
interface Resource {
  name: string;
  description: string;
  url: string;
  slug: string;
}

interface SiteData {
  name: string;
  description: string;
  screenshot: string;
  status: string;
  type: string;
  region: string;
  url: string;
  submitMethod: string;
  submitUrl: string;
  submitRequirements: string;
  review: string;
  reviewTime: string;
  expectedExposure: string;
  rating: string;
}

interface SitePageProps {
  params: Promise<{ locale: string; slug: string }>
}

/**
 * 生成静态参数用于预渲染
 * @returns {Array} 包含所有资源slug的参数数组
 */
export async function generateStaticParams(): Promise<{ locale: string; slug: string }[]> {
  const locales = ['zh', 'en']
  const params: { locale: string; slug: string }[] = []
  
  for (const locale of locales) {
    const resources: Resource[] = getI18nJsonData('sitelists.json', locale)
    for (const resource of resources) {
      params.push({
        locale,
        slug: resource.slug,
      })
    }
  }
  
  return params
}

/**
 * 生成页面元数据
 * @param {Object} params - 路由参数
 * @returns {Object} 页面元数据
 */
export async function generateMetadata({ params }: SitePageProps) {
  const { locale, slug } = await params
  const siteData = await getI18nSiteData(slug, locale)
  
  if (!siteData) {
    return {
      title: locale === 'zh' ? '站点未找到' : 'Site Not Found',
    }
  }

  return {
    title: `${siteData.name} - ${locale === 'zh' ? '站点详情' : 'Site Details'}`,
    description: siteData.description,
  }
}



/**
 * 获取网站缩略截图URL
 * @param {string} url - 网站URL
 * @returns {string} 缩略截图URL
 */
function getWebsiteScreenshotUrl(url: string): string {
  try {
    // 使用 WordPress.com 的 mshots 服务获取网站截图
    // 这是一个稳定且免费的服务，被广泛使用
    const encodedUrl = encodeURIComponent(url)
    // 设置合适的宽度和高度，适配详情页布局
    return `https://s0.wp.com/mshots/v1/${encodedUrl}?w=800&h=600`
  } catch {
    // 如果URL无效，返回默认图片
    return '/next.svg' // 使用项目中的默认图片
  }
}

/**
 * 站点详情页面组件
 * @param {Object} params - 路由参数
 * @returns {JSX.Element} 站点详情页面
 */
export default async function SiteDetailPage({ params }: SitePageProps) {
  const { locale, slug } = await params
  
  // 启用静态渲染
  setRequestLocale(locale)
  
  // 获取翻译文本
  const t = await getTranslations('site')
  
  // 获取站点数据
  const siteData = await getI18nSiteData(slug, locale)

  if (!siteData) {
    notFound()
  }



  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <article className="max-w-4xl mx-auto">
      {/* Breadcrumb navigation */}
      <nav className="flex items-center text-sm text-foreground mb-6">
        <Link href="/" className="group">
          <AnimatedTextServer 
            text={t('detail.breadcrumb.home')}
            className="text-muted-foreground"
          />
        </Link>
        <CaretRight className="mx-2" size={16} />
        <Link href="/site" className="group">
          <AnimatedTextServer 
            text={t('title')}
            className="text-muted-foreground"
          />
        </Link>
        <CaretRight className="mx-2" size={16} />
        <span className="text-foreground">{siteData.name}</span>
      </nav>
      
      {/* Meta information card */}
      <div className="bg-card rounded-[24px] p-6 mb-12 border-2 min-h-[400px] lg:h-[400px]">
        <div className="flex flex-col lg:flex-row items-start gap-6 h-full">
          {/* 网站截图 */}
          <div className="w-full lg:w-1/2 h-48 lg:h-full flex-shrink-0">
            <div className="w-full h-full rounded-lg overflow-hidden bg-card">
              <Image
                src={getWebsiteScreenshotUrl(siteData.url)}
                alt={`${siteData.name} screenshot`}
                width={400}
                height={268}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
          </div>
          
          {/* 内容区域 */}
          <div className="flex-1 flex flex-col h-full min-h-0">
            <div className="flex-1">
              <h1 className="text-xl lg:text-2xl font-bold mb-2">{siteData.name}</h1>
              
              {/* 产品展示页、运行中状态和地区标签 */}
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <SiteBadge 
                  siteData={{ type: siteData.type, status: siteData.status, region: siteData.region }}
                  locale={locale}
                  showType={true}
                  showStatus={true}
                  showRegion={true}
                />
              </div>
              
              <p className="text-muted-foreground mb-4 text-sm lg:text-base">{siteData.description}</p>
            </div>
            
            {/* 访问官网和提交产品按钮 - 置底显示 */}
            <div className="mt-auto">
              <SiteActionButtons
                siteUrl={siteData.url}
                submitUrl={siteData.submitUrl}
                visitWebsiteText={t('visitWebsite')}
                submitProductText={t('submitProduct')}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Site content */}
      <div className="prose prose-lg max-w-none">

         <h2>{t('detail.expectedExposure')}</h2>
        <p className="text-foreground leading-relaxed">
          {await getFieldDisplayText('expectedExposure', siteData.expectedExposure, locale as 'zh' | 'en')}
        </p>

          <h2>{t('detail.submitMethod')}</h2>
        <p className="text-foreground leading-relaxed">
          {await getFieldDisplayText('submitMethod', siteData.submitMethod, locale as 'zh' | 'en')}
        </p>

        <h2>{t('detail.submitGuidelines')}</h2>
        <p className="text-foreground leading-relaxed">{siteData.submitRequirements}</p>
        
        <h2>{t('detail.review')}</h2>
        <p className="text-foreground leading-relaxed">
          {await getFieldDisplayText('review', siteData.review, locale as 'zh' | 'en')}
          {siteData.review === 'Y' && (
            <>
              ，{await getFieldDisplayText('reviewTime', siteData.reviewTime, locale as 'zh' | 'en')}
            </>
          )}
        </p>
        
        <h2>{t('detail.summary')}</h2>
        <p className="text-foreground leading-relaxed">{siteData.rating}</p>
      </div>
      
      {/* Back to site list link */}
      <div className="mt-12">
        <Link href="/site" className="group inline-flex items-center gap-2">
          <ArrowLeft size={20} className="text-muted-foreground" />
          <AnimatedTextServer 
            text={t('detail.backToSiteList')}
            className="text-muted-foreground"
          />
        </Link>
      </div>
      </article>
    </div>
  );
}