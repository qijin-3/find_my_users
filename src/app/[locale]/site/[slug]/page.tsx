import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { getI18nSiteData, getI18nJsonData } from '@/lib/i18n-data'
import { getFieldDisplayText } from '@/lib/field-utils'
import { Link } from '@/i18n/navigation'
import { ArrowLeft, ArrowSquareOut, Globe, Clock, Users, CheckCircle, XCircle, CaretRight, Warning, WifiSlash } from '@phosphor-icons/react/dist/ssr'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import AnimatedText from '@/components/ui/animated-text'
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
 * 获取状态翻译文本
 * @param {string} status - 站点状态
 * @param {string} locale - 语言
 * @returns {Promise<string>} 翻译后的状态文本
 */
async function getStatusText(status: string, locale: string): Promise<string> {
  return await getFieldDisplayText('status', status, locale as 'zh' | 'en')
}

/**
 * 获取状态对应的颜色和图标
 * @param {string} status - 站点状态
 * @returns {Object} 包含颜色和图标的对象
 */
function getStatusInfo(status: string) {
  switch (status) {
    case 'running':
      return { color: 'bg-green-100 text-green-800', icon: CheckCircle };
    case 'suspected_unmaintained':
      return { color: 'bg-yellow-100 text-yellow-800', icon: Clock };
    case 'confirmed_unmaintained':
      return { color: 'bg-orange-100 text-orange-800', icon: Warning };
    case 'temporarily_unavailable':
      return { color: 'bg-blue-100 text-blue-800', icon: WifiSlash };
    case 'stopped':
      return { color: 'bg-red-100 text-red-800', icon: XCircle };
    default:
      return { color: 'bg-gray-100 text-gray-800', icon: Globe };
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

  const statusInfo = getStatusInfo(siteData.status)
  const StatusIcon = statusInfo.icon
  const statusText = await getStatusText(siteData.status, locale)

  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      {/* Breadcrumb navigation */}
      <nav className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/" className="group">
          <AnimatedText 
            text={locale === 'zh' ? '首页' : 'Home'}
            className="text-muted-foreground group-hover:text-muted-foreground transition-colors"
            animateOnHover={true}
            autoPlay={false}
            stagger={30}
            duration={0.15}
            yOffset={-2}
          />
        </Link>
        <CaretRight className="mx-2" size={16} />
        <Link href="/site" className="group">
          <AnimatedText 
            text={t('title')}
            className="text-muted-foreground group-hover:text-muted-foreground transition-colors"
            animateOnHover={true}
            autoPlay={false}
            stagger={30}
            duration={0.15}
            yOffset={-2}
          />
        </Link>
        <CaretRight className="mx-2" size={16} />
        <span className="text-foreground">{siteData.name}</span>
      </nav>
      
      {/* Meta information card */}
      <div className="bg-card rounded-[24px] p-6 mb-12 border-2 h-80">
        <div className="flex items-start gap-4 h-full">
          {/* 网站截图 */}
          <div className="flex-shrink-0 h-full w-1/2">
            <div className="w-full h-full rounded-lg overflow-hidden bg-gray-100">
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
          <div className="flex-1 flex flex-col h-full">
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{siteData.name}</h1>
              
              {/* 产品展示页和运行中状态标签 */}
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary" className="text-[12px] font-normal">
                  {locale === 'zh' ? '产品展示页' : 'Product Showcase'}
                </Badge>
                <Badge className={statusInfo.color}>
                  <StatusIcon size={14} className="mr-1" />
                  {statusText}
                </Badge>
              </div>
              
              <p className="text-muted-foreground mb-4">{siteData.description}</p>
            </div>
            
            {/* 访问官网和提交产品按钮 - 置底显示 */}
            <div className="flex items-center gap-3 mt-auto">
              <a 
                href={siteData.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm"
              >
                <Globe size={16} />
                {locale === 'zh' ? '访问官网' : 'Visit Website'}
              </a>
              <a 
                href={siteData.submitUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
              >
                <ArrowSquareOut size={16} />
                {locale === 'zh' ? '提交产品' : 'Submit Product'}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Site content */}
      <div className="prose prose-lg max-w-none">
        <h2>{locale === 'zh' ? '递交要求' : 'Submit Requirements'}</h2>
        <p className="text-gray-700 leading-relaxed">{siteData.submitRequirements}</p>
        
        <h2>{locale === 'zh' ? '递交地址' : 'Submit URL'}</h2>
        <p>
          <a 
            href={siteData.submitUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition-colors break-all"
          >
            {siteData.submitUrl}
          </a>
        </p>
        
        <h2>{locale === 'zh' ? '评价' : 'Rating'}</h2>
        <p className="text-gray-700 leading-relaxed">{siteData.rating}</p>
      </div>
      
      {/* Back to site list link */}
      <div className="mt-12">
        <Link href="/site" className="group inline-flex items-center gap-2">
          <ArrowLeft size={20} className="text-muted-foreground group-hover:text-muted-foreground transition-colors" />
          <AnimatedText 
            text={locale === 'zh' ? '返回站点列表' : 'Back to site list'}
            className="text-muted-foreground group-hover:text-muted-foreground transition-colors"
            animateOnHover={true}
            autoPlay={false}
            stagger={30}
            duration={0.15}
            yOffset={-2}
          />
        </Link>
      </div>
    </article>
  );
}