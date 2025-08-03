import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { getI18nSiteData, getI18nJsonData } from '@/lib/i18n-data'
import { getFieldDisplayText } from '@/lib/field-utils'
import { Link } from '@/i18n/navigation'
import { ArrowLeft, ArrowSquareOut, Globe, Clock, Users, CheckCircle, XCircle, CaretRight } from '@phosphor-icons/react/dist/ssr'
import { Badge } from "@/components/ui/badge"

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
  const siteData = getI18nSiteData(slug, locale)
  
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
 * @returns {string} 翻译后的状态文本
 */
function getStatusText(status: string, locale: string): string {
  return getFieldDisplayText('status', status, locale as 'zh' | 'en')
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
    case 'stopped':
      return { color: 'bg-red-100 text-red-800', icon: XCircle };
    default:
      return { color: 'bg-gray-100 text-gray-800', icon: Globe };
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
  const siteData = getI18nSiteData(slug, locale)

  if (!siteData) {
    notFound()
  }

  const statusInfo = getStatusInfo(siteData.status)
  const StatusIcon = statusInfo.icon
  const statusText = getStatusText(siteData.status, locale)

  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      {/* Breadcrumb navigation */}
      <nav className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">
          {locale === 'zh' ? '首页' : 'Home'}
        </Link>
        <CaretRight className="mx-2" size={16} />
        <Link href="/site" className="hover:text-blue-600">
          {t('title')}
        </Link>
        <CaretRight className="mx-2" size={16} />
        <span className="text-gray-900">{siteData.name}</span>
      </nav>
      
      {/* Meta information card */}
      <div className="bg-gray-100 rounded-lg p-6 mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">{siteData.name}</h1>
            <p className="text-gray-600 mb-2">{siteData.description}</p>
          </div>
          <Badge className={statusInfo.color}>
            <StatusIcon size={14} className="mr-1" />
            {statusText}
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-semibold text-gray-700">
              {locale === 'zh' ? '站点类型：' : 'Site Type:'}
            </span>
            <span className="text-gray-600">{getFieldDisplayText('type', siteData.type, locale as 'zh' | 'en')}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">
              {locale === 'zh' ? '适合地区：' : 'Suitable Region:'}
            </span>
            <span className="text-gray-600">{getFieldDisplayText('region', siteData.region, locale as 'zh' | 'en')}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">
              {locale === 'zh' ? '递交方式：' : 'Submit Method:'}
            </span>
            <span className="text-gray-600">{getFieldDisplayText('submitMethod', siteData.submitMethod, locale as 'zh' | 'en')}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">
              {locale === 'zh' ? '审核：' : 'Review:'}
            </span>
            <span className="text-gray-600">
              {siteData.review === 'Y' 
                ? (locale === 'zh' ? '需要审核' : 'Required') 
                : (locale === 'zh' ? '无需审核' : 'Not Required')
              }
            </span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">
              {locale === 'zh' ? '审核耗时：' : 'Review Time:'}
            </span>
            <span className="text-gray-600">{getFieldDisplayText('reviewTime', siteData.reviewTime, locale as 'zh' | 'en')}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">
              {locale === 'zh' ? '预计曝光（周）：' : 'Expected Exposure (weeks):'}
            </span>
            <span className="text-gray-600">{getFieldDisplayText('expectedExposure', siteData.expectedExposure, locale as 'zh' | 'en')}</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <a 
            href={siteData.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <Globe size={16} />
            {locale === 'zh' ? '访问官网' : 'Visit Website'}
            <ArrowSquareOut size={14} />
          </a>
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
        <Link href="/site" className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-2">
          <ArrowLeft size={20} />
          {locale === 'zh' ? '返回站点列表' : 'Back to site list'}
        </Link>
      </div>
    </article>
  );
}