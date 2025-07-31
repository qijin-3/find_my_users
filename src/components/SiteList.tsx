// components/SiteList.tsx
'use client'
import { Link } from '@/i18n/navigation'
import ResourceCard from '@/components/ResourceCard'

/**
 * 站点数据接口定义
 */
interface Site {
  name: string;
  description: string;
  url: string;
  slug: string;
  category: string;
  date: string;
  lastModified: string;
}

/**
 * SiteList 组件 props 接口
 */
interface SiteListProps {
  sites: Site[];
  showMoreLink?: boolean;
}

/**
 * 站点列表组件 - 展示最新的站点卡片
 * @param sites - 站点数据数组
 * @param showMoreLink - 是否显示"更多站点"链接，默认为 true
 * @returns 站点列表组件
 */
export default function SiteList({ sites, showMoreLink = true }: SiteListProps) {
  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold tracking-tighter">Sites</h2>
        {showMoreLink && (
          <Link href="/site" className="text-blue-600 hover:text-blue-800 transition-colors">
            More sites →
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sites.map((site) => (
          <ResourceCard 
            key={site.slug}
            resource={site}
            showCategory={true}
            className=""
          />
        ))}
      </div>
    </section>
  )
}