'use client'

import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from '@phosphor-icons/react'
import { getFieldDisplayText } from '@/lib/field-utils'

/**
 * 资源对象类型定义
 */
interface Resource {
  name: string
  description: string
  url: string
  slug: string
  category: string
  date?: string
  lastModified?: string
  tags?: string[]
}

/**
 * ResourceCard组件的Props类型定义
 */
interface ResourceCardProps {
  resource: Resource
  showCategory?: boolean
  className?: string
  locale?: string
}

/**
 * ResourceCard 组件 - 统一的资源卡片组件
 * 用于首页和site页面显示资源信息
 * @param {ResourceCardProps} props - 组件属性
 */
export default function ResourceCard({ 
  resource, 
  showCategory = false, 
  className = "",
  locale = 'zh'
}: ResourceCardProps) {
  /**
   * 获取分类显示名称
   * @param {string} categoryId - 分类ID
   * @param {string} locale - 语言环境
   * @returns {string} 分类显示名称
   */
  const getCategoryDisplayName = (categoryId: string, locale: string): string => {
    return getFieldDisplayText('category', categoryId, locale as 'zh' | 'en');
  }

  /**
   * 获取网站缩略截图URL
   * @param {string} url - 网站URL
   * @returns {string} 缩略截图URL
   */
  const getWebsiteScreenshotUrl = (url: string): string => {
    try {
      // 使用 WordPress.com 的 mshots 服务获取网站截图
      // 这是一个稳定且免费的服务，被广泛使用
      const encodedUrl = encodeURIComponent(url)
      // 设置合适的宽度和高度，适配卡片布局
      return `https://s0.wp.com/mshots/v1/${encodedUrl}?w=400&h=300`
    } catch {
      // 如果URL无效，返回默认图片
      return '/next.svg' // 使用项目中的默认图片
    }
  }

  return (
    <Link href={`/site/${resource.slug}`} className={`block group ${className}`}>
      <Card className="h-72 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 overflow-hidden">
        {/* 网站缩略截图 - 占满卡片宽度 */}
        <div className="relative w-full h-32 overflow-hidden">
          <Image
            src={getWebsiteScreenshotUrl(resource.url)}
            alt={`${resource.name} screenshot`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            unoptimized
          />
        </div>
        
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 mb-2">
                {resource.name}
              </CardTitle>
            </div>
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0 ml-2" />
          </div>
        </CardHeader>
        <CardContent className="pt-0 flex flex-col justify-between flex-1">
          <div className="space-y-3">
            {/* 描述限制为两行 */}
            <p className="text-sm text-gray-600 dark:text-gray-300 overflow-hidden" 
               style={{
                 display: '-webkit-box',
                 WebkitLineClamp: 2,
                 WebkitBoxOrient: 'vertical' as const,
                 lineHeight: '1.4em',
                 maxHeight: '2.8em'
               }}>
              {resource.description}
            </p>
            
            {/* 产品种类标签放在描述下方 */}
            {showCategory && resource.category && (
              <Badge variant="secondary" className="text-xs">
                {getCategoryDisplayName(resource.category, locale)}
              </Badge>
            )}
            
            {/* 其他标签区域 */}
            {resource.tags && resource.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {resource.tags.slice(0, 2).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}