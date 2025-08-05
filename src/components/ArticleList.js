// components/ArticleList.js
'use client'
import { Link } from '@/i18n/navigation'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

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
        {articles.map(({ slug, title, description }) => (
          <Card key={slug}>
            <CardHeader>
              <Link 
                href={`/posts/${slug}`}
                className="text-foreground hover:text-foreground/80 transition-colors inline-flex items-center gap-1"
              >
                <CardTitle>{title}</CardTitle>
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