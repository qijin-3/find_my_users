'use client'

import { useTranslations } from 'next-intl'
// @ts-ignore - ArticleList是JS文件，暂时忽略类型检查
import ArticleList from '@/components/articlelist'

/**
 * 文章对象类型定义
 */
interface Article {
  slug: string
  title: string
  description: string
  lastModified: string
}

/**
 * PostsPageContent组件的Props类型定义
 */
interface PostsPageContentProps {
  articles: Article[]
  locale?: string
}

/**
 * PostsPageContent组件 - 文章列表页面主要内容
 * 采用与SitePageContent相同的布局结构和样式规范
 * @param {PostsPageContentProps} props - 组件属性
 */
export default function PostsPageContent({ articles, locale = 'zh' }: PostsPageContentProps) {
  const t = useTranslations('articles')

  return (
    <div className="min-h-screen bg-[#f9fafb00]">
      {/* 顶部标题栏 */}
      <div className="bg-[#ffffff00] h-[auto] pt-12">
        <div className="max-w-7xl mx-auto ml-[80px] mr-[80px] pl-0 pr-0">
          <div className="flex items-center justify-between pt-0">
            <div>
              <h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>
              <p className="text-sm text-muted-foreground">{t('description')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="max-w-7xl mx-auto ml-[80px] mr-[80px] pl-0 pr-0 pt-6 pb-12">
        {/* @ts-ignore - ArticleList是JS文件，暂时忽略类型检查 */}
        <ArticleList articles={articles} showMoreLink={false} />
      </div>
    </div>
  )
}