// components/SiteList.tsx
'use client'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import ResourceCard from '@/components/ResourceCard'
import AnimatedText from '@/components/ui/animated-text'

/**
 * 站点数据接口定义
 */
interface Site {
  name: string;
  description: string;
  url: string;
  slug: string;
  category: string;
  type: string;  // 站点类型，用于分类筛选
  date: string;
  lastModified: string;
}

/**
 * SiteList 组件 props 接口
 */
interface SiteListProps {
  sites: Site[];
  showMoreLink?: boolean;
  locale?: string;
}

/**
 * 站点列表组件 - 展示最新的站点卡片
 * @param sites - 站点数据数组
 * @param showMoreLink - 是否显示"更多站点"链接，默认为 true
 * @param locale - 语言环境，默认为 'zh'
 * @returns 站点列表组件
 */
export default function SiteList({ sites, showMoreLink = true, locale = 'zh' }: SiteListProps) {
  const t = useTranslations('site')
  
  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[24px] font-bold tracking-tighter">{t('title')}</h2>
        {showMoreLink && (
          <Link href="/site" className="text-foreground hover:text-foreground/80 transition-colors group">
            <AnimatedText 
              text={`${t('moreSites')} →`}
              className="text-foreground hover:text-foreground transition-colors"
              animateOnHover={false}
              useGroupHover={true}
            />
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sites.map((site) => (
          <ResourceCard 
            key={site.slug}
            resource={site}
            showCategory={true}
            locale={locale}
            className=""
          />
        ))}
      </div>
    </section>
  )
}