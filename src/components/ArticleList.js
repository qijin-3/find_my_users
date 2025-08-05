// components/ArticleList.js
'use client'
import { Link } from '@/i18n/navigation'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

/**
 * ArticleList 组件 - 显示文章列表
 * @param {Array} articles - 文章数据数组
 * @param {boolean} showMoreLink - 是否显示更多链接
 */
export default function ArticleList({ articles, showMoreLink = true }) {
  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[24px] font-bold tracking-tighter">Articles</h2>
        <Link href="/posts" className="text-foreground hover:text-foreground/80 transition-colors">
          More articles →
        </Link>
      </div>
      <div className="space-y-6">
        {articles.map(({ slug, title, description, lastModified }) => (
          <Card key={slug} className="border-2">
            <CardHeader className="border-0">
              {lastModified && (
                <div className="text-sm mb-2" style={{ color: 'rgb(var(--article-date-text))' }}>
                  最后修改: {new Date(lastModified).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  })}
                </div>
              )}
              <Link 
                href={`/posts/${slug}`}
                className="text-foreground hover:text-foreground/80 transition-colors inline-flex items-center gap-1"
              >
                <CardTitle className="text-[20px]">{title}</CardTitle>
                →
              </Link>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  )
}