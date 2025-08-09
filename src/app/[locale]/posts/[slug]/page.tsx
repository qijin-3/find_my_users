import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Link } from '@/i18n/navigation'
import { ArrowLeft, CaretRight } from '@phosphor-icons/react/dist/ssr'
import { remark } from 'remark'
import html from 'remark-html'
import { getI18nArticleMeta } from '@/lib/i18n-data'

interface PostPageProps {
  params: Promise<{ locale: string; slug: string }>
}

interface PostData {
  content: string
  locale: string
  slug: string
}

/**
 * 获取文章数据 - 内联函数
 */
function getArticleData(slug: string, locale: string): PostData | null {
  try {
    // 首先尝试获取指定语言的文章
    const localePath = path.join(process.cwd(), 'data', 'Articles', locale, `${slug}.md`)
    
    if (fs.existsSync(localePath)) {
      const content = fs.readFileSync(localePath, 'utf8')
      const { content: articleContent } = matter(content)
      return {
        content: articleContent,
        locale: locale,
        slug: slug
      }
    }
    
    // 如果指定语言文章不存在，fallback到中文版本
    const fallbackPath = path.join(process.cwd(), 'data', 'Articles', 'zh', `${slug}.md`)
    
    if (fs.existsSync(fallbackPath)) {
      const content = fs.readFileSync(fallbackPath, 'utf8')
      const { content: articleContent } = matter(content)
      return {
        content: articleContent,
        locale: 'zh', // 标记实际使用的语言
        slug: slug
      }
    }
    
    return null
  } catch (error) {
    return null
  }
}

/**
 * 生成页面元数据
 */
export async function generateMetadata({ params }: PostPageProps) {
  const { locale, slug } = await params
  const meta = getI18nArticleMeta(slug, locale)
  if (!meta) {
    return {
      title: 'Article Not Found',
    }
  }

  return {
    title: `${meta.title}`,
    description: meta.description || `Read about ${meta.title} on FindMyUsers`,
  }
}

/**
 * 文章详情页面
 * 支持多语言，显示文章详细内容
 */
export default async function PostPage({ params }: PostPageProps) {
  const { locale, slug } = await params
  
  // 启用静态渲染
  setRequestLocale(locale)
  
  // 获取翻译文本
  const t = await getTranslations('articles')
  
  // 获取文章数据
  const postData = getArticleData(slug, locale)
  const meta = getI18nArticleMeta(slug, locale)
  
  if (!postData) {
    notFound()
  }
  if (!meta) {
    notFound()
  }

  // 转换 Markdown 为 HTML
  const processedContent = await remark()
    .use(html)
    .process(postData.content)
  const contentHtml = processedContent.toString()
  
  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      {/* Breadcrumb navigation */}
      <nav className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">{t('backToList')}</Link>
        <CaretRight className="mx-2" size={16} />
        <Link href="/posts" className="hover:text-blue-600">{t('title')}</Link>
        <CaretRight className="mx-2" size={16} />
        <span className="text-gray-900">{meta.title}</span>
      </nav>
      
      {/* Meta information card */}
      <div className="bg-gray-100 rounded-lg p-6 mb-8">
        {meta.lastModified && (
          <p className="text-gray-600 mb-2">
            {t('lastModified')}: {new Date(meta.lastModified).toLocaleDateString()}
          </p>
        )}
        {meta.date && (
          <p className="text-gray-600 mb-2">
            {t('publishedOn')}: {new Date(meta.date).toLocaleDateString()}
          </p>
        )}
        {meta.description && (
          <p className="text-gray-800">{meta.description}</p>
        )}
        {postData.locale !== locale && (
          <p className="text-yellow-600 text-sm mt-2">
            ⚠️ {locale === 'en' ? 'This article is displayed in Chinese as no English version is available.' : '此文章以中文显示，因为没有英文版本。'}
          </p>
        )}
      </div>
      
      {/* Article content */}
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }} 
      />
      
      {/* Back to articles link */}
      <div className="mt-12">
        <Link href="/posts" className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-2">
          <ArrowLeft size={20} />
          {t('backToList')}
        </Link>
      </div>
    </article>
  )
}