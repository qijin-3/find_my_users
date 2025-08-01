import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { getI18nJsonData, getI18nArticlesList } from '@/lib/i18n-data'
import ResourceList from '@/components/ResourceList'
import ArticleList from '@/components/ArticleList'
import SiteList from '@/components/SiteList'
import PeopleIllustration from '@/components/PeopleIllustration'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

/**
 * 主页组件
 * 支持多语言，展示最新的站点和文章
 */
export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  
  // 启用静态渲染
  setRequestLocale(locale)
  
  // 获取翻译文本
  const t = await getTranslations('home')
  
  // 获取多语言数据
  const resources = getI18nJsonData('sitelists.json', locale)
  const allPostsData = getI18nArticlesList(locale)
  
  // 获取最新的8个站点，按日期排序
  const latestSites = resources
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 8)
  
  // 获取最新的4篇文章
  const latestArticles = allPostsData.slice(0, 4)

  return (
    <div className="container mx-auto py-12 space-y-16">
      <section className="text-center pt-8">
        {/* 小人插画 */}
        <PeopleIllustration />
        
        {/* 标题和描述 */}
        <div>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            {t('title')}
          </h1>
          <h2 className="mt-2 text-2xl tracking-tighter sm:text-3xl md:text-3xl lg:text-3xl">
            {t('subtitle')}
          </h2>
          <p className="mt-2 mx-auto max-w-[700px] text-gray-500 md:text-xl">
            {t('description')}
          </p>
        </div>
      </section>

      <ResourceList {...resources} />
      <SiteList sites={latestSites} />
      <ArticleList articles={latestArticles} />
    </div>
  )
}