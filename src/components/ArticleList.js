// components/ArticleList.js
'use client'
import React from 'react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { Calendar } from '@phosphor-icons/react'
import AnimatedText from '@/components/ui/animated-text'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

/**
 * ArticleList 组件 - 显示文章列表
 * @param {Array} articles - 文章数据数组
 * @param {boolean} showMoreLink - 是否显示更多链接和标题
 */
export default function ArticleList({ articles, showMoreLink = true }) {
  const t = useTranslations('articles')
  return (
    <section>
      {showMoreLink && (
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[24px] font-bold tracking-tighter">{t('title')}</h2>
          <Link href="/posts" className="text-muted-foreground hover:text-foreground/80 transition-colors group">
            <AnimatedText 
              text={`${t('moreArticles')} →`}
              className="text-muted-foreground hover:text-foreground transition-colors"
              animateOnHover={false}
              useGroupHover={true}
            />
          </Link>
        </div>
      )}
      <div className="space-y-6 flex flex-col">
        {articles.map(({ slug, title, description, lastModified }) => (
          <Link 
            key={slug}
            href={`/posts/${slug}`}
            className="text-muted-foreground hover:text-foreground/80 transition-colors"
          >
            <Card className="border-2 rounded-[24px] cursor-pointer md:transition-all duration-300 hover:shadow-lg hover:scale-105 group">
              <CardHeader className="border-0">
                {lastModified && (
                  <div className="text-sm mb-2 text-muted-foreground flex items-center gap-2">
                    <Calendar size={16} />
                    {t('lastModified')}: {new Date(lastModified).toLocaleDateString('zh-CN', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                    })}
                  </div>
                )}
                  <CardTitle className="text-[20px] text-foreground">{title}</CardTitle>
                <CardDescription className="text-muted-foreground">{description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}