// pages/index.js
import fs from 'fs'
import path from 'path'
import { getSortedPostsData } from '@/lib/posts'
import ResourceList from '@/components/ResourceList'
import ArticleList from '@/components/ArticleList'
import SiteList from '@/components/SiteList'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FindMyUsers - Open Source Dynamic Website CMS Without Database',
  description: 'A Next.js site with Tailwind & Shadcn/UI, using GitHub API for content management. No database needed for dynamic updates.',
}

export default function Home() {
  const resourcesPath = path.join(process.cwd(), 'data', 'json', 'sitelists.json')
  const resources = JSON.parse(fs.readFileSync(resourcesPath, 'utf8'))
  
  // 获取最新的8个站点，按日期排序
  const latestSites = resources
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 8)
  
  // 获取最新的4篇文章
  const allPostsData = getSortedPostsData().slice(0, 4)

  return (
    <div className="container mx-auto py-12 space-y-16">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          FindMyUsers
        </h1>
        <h2 className="text-2xl tracking-tighter sm:text-3xl md:text-3xl lg:text-3xl">Open Source Dynamic Website CMS Without Database</h2>
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
          FindMyUsers is a dynamic, database-free website built with Next.js, Tailwind CSS, and Shadcn/UI, featuring a content management system powered by the GitHub API for seamless updates and administration.
        </p>
      </section>

      <ResourceList {...resources} />
      <SiteList sites={latestSites} />
      <ArticleList articles={allPostsData} />
    </div>
  )
}