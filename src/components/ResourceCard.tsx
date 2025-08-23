'use client'

import React from 'react'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import SiteBadge from '@/components/ui/site-badge'

/**
 * 资源对象类型定义
 */
interface Resource {
  name: string
  description: string
  url: string
  slug: string
  type: string  // 站点类型，用于分类筛选
  date?: string
  lastModified?: string
  tags?: string[]
  status?: string
  region?: string
  submitMethod?: string
  reviewTime?: string
  expectedExposure?: string
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
      <Card className="pl-4 pr-4 pt-4 pb-4 h-[auto] cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 overflow-hidden border-2 border-[rgb(var(--border))] rounded-[24px]">
        {/* 网站缩略截图 - 占满卡片宽度 */}
        <div className="relative w-full h-32 overflow-hidden rounded-[12px]">
          <Image
            src={getWebsiteScreenshotUrl(resource.url)}
            alt={`${resource.name} screenshot`}
            fill
            className="object-cover aspect-auto transition-transform duration-300 group-hover:scale-105 h-[128px]"
            unoptimized
          />
        </div>
        
        <CardHeader className="pl-0 pr-0 pt-2 pb-2 mt-2">
          <div className="flex items-start justify-between">
            <div className="flex-1 aspect-auto h-8">
              <CardTitle className="text-[20px] font-semibold leading-[32px] text-foreground mb-2">
                {resource.name}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pl-0 pr-0 h-[auto] pb-0 flex flex-col justify-between flex-1">
          <div className="space-y-3">
            {/* 描述限制为两行，精确控制高度 */}
            <p className="font-medium text-muted-foreground text-[14px] overflow-hidden leading-[1.2] h-[33.6px]" 
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical' as const,
                  lineHeight: '1.2'
                }}>
              {resource.description}
            </p>
            
            {/* 标签区域 - 固定高度，水平滑动 */}
            <div className="h-[32px] overflow-auto">
              {showCategory && resource.type && (
                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 h-full items-center">
                  <SiteBadge 
                    siteData={{ type: resource.type, status: resource.status, region: resource.region }}
                    locale={locale}
                    showType={true}
                    showStatus={true}
                    showRegion={true}
                    className="text-[12px] font-normal leading-[18px] flex-shrink-0"
                  />
                  
                  {/* 其他标签 */}
                  {resource.tags && resource.tags.length > 0 && 
                    resource.tags.slice(0, 3).map((tag, index) => (
                      <SiteBadge 
                        key={index}
                        siteData={{ type: tag }}
                        locale={locale}
                        showType={true}
                        showStatus={false}
                        className="text-xs flex-shrink-0"
                      />
                    ))
                  }
                </div>
              )}
              
              {/* 当没有主要分类时，只显示其他标签 */}
              {!showCategory && resource.tags && resource.tags.length > 0 && (
                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 h-full items-center">
                  {resource.tags.slice(0, 4).map((tag, index) => (
                    <SiteBadge 
                      key={index}
                      siteData={{ type: tag }}
                      locale={locale}
                      showType={true}
                      showStatus={false}
                      className="text-xs flex-shrink-0"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}