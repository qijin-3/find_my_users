import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { getI18nJsonData, getI18nArticlesList, getI18nSitesList } from '@/lib/i18n-data'
import ResourceList from '@/components/ResourceList'
import ArticleList from '@/components/articlelist'
import SiteList from '@/components/sitelist'
import PeopleIllustration from '@/components/PeopleIllustration'
import AnimatedText from '@/components/ui/animated-text'

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
  const sites = await getI18nSitesList(locale)
  
  // 获取最新的8个站点，按日期排序
  const latestSites = sites
    .sort((a: any, b: any) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0
      const dateB = b.date ? new Date(b.date).getTime() : 0
      return dateB - dateA
    })
    .slice(0, 8)
  
  // 获取最新的4篇文章
  const latestArticles = allPostsData.slice(0, 4)

  return (
    <div className="pl-20 pr-20 ml-0 mr-0 py-12 space-y-16">
      <section className="text-center pt-8 w-[auto] aspect-auto box-border">
        {/* 小人插画 */}
        <PeopleIllustration />
        
        {/* 标题和描述 */}
        <div>
          <h1 className="h-[72px] font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            <AnimatedText 
              text={t('title')} 
              autoPlay={false}
              animateOnHover={true}
              stagger={100}
              duration={0.3}
              yOffset={-8}
            />
          </h1>
          <h2 className="mt-2 text-[24px] font-medium tracking-tighter sm:text-3xl md:text-3xl lg:text-3xl">
            {t('subtitle')}
          </h2>
          <p className="mt-2 mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            {t('description')}
          </p>
        </div>
      </section>

      <ResourceList {...resources} />
      <SiteList sites={latestSites} locale={locale} />
      {/* @ts-ignore - ArticleList 组件使用 .js 文件，类型检查暂时忽略 */}
      <ArticleList articles={latestArticles} showMoreLink={true} />
    </div>
  )
}