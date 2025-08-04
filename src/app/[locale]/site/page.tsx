import { setRequestLocale } from 'next-intl/server'
import { getI18nSitesList } from '@/lib/i18n-data'
import SitePageContent from '@/components/SitePageContent'

interface SitePageProps {
  params: Promise<{ locale: string }>
}

/**
 * Site页面 - 显示分类工具和资源
 * 包含左侧分类菜单和右侧工具展示区域
 * 支持多语言
 */
export default async function SitePage({ params }: SitePageProps) {
  const { locale } = await params
  
  // 启用静态渲染
  setRequestLocale(locale)
  
  // 获取完整的站点数据（合并 sitelists.json 和 Site 目录下的详细信息）
  const resources = await getI18nSitesList(locale)

  return <SitePageContent resources={resources} locale={locale} />
}