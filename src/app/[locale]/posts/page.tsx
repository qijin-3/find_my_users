import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { getI18nArticlesList } from '@/lib/i18n-data'
import PostsPageContent from '@/components/PostsPageContent'

interface ArticlesPageProps {
  params: Promise<{ locale: string }>
}

/**
 * 文章列表页面
 * 支持多语言，展示所有文章
 */
export default async function ArticlesPage({ params }: ArticlesPageProps) {
  const { locale } = await params
  
  // 启用静态渲染
  setRequestLocale(locale)
  
  // 获取翻译文本
  const t = await getTranslations('articles')
  
  // 获取多语言文章数据
  const allPostsData = getI18nArticlesList(locale)

  return (
    <PostsPageContent articles={allPostsData} locale={locale} />
  )
}

