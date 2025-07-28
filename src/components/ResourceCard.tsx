'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from 'lucide-react'

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
}

/**
 * ResourceCard 组件 - 统一的资源卡片组件
 * 用于首页和site页面显示资源信息
 * @param {ResourceCardProps} props - 组件属性
 */
export default function ResourceCard({ 
  resource, 
  showCategory = false, 
  className = "" 
}: ResourceCardProps) {
  /**
   * 获取分类显示名称
   * @param {string} categoryId - 分类ID
   * @returns {string} 分类显示名称
   */
  const getCategoryDisplayName = (categoryId: string): string => {
    const categoryMap: Record<string, string> = {
      'product-showcase': '产品展示页',
      'tool-navigation': '工具导航',
      'blog-newsletter': '博客/周刊',
      'social-community': '社交社区',
      'media': '媒体',
      'vertical-forum': '垂直论坛/社区',
      'design-platform': '设计平台',
    }
    return categoryMap[categoryId] || categoryId
  }

  return (
    <Link href={`/site/${resource.slug}`} className={`block group ${className}`}>
      <Card className="h-48 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 mb-2">
                {resource.name}
              </CardTitle>
              {showCategory && resource.category && (
                <Badge variant="secondary" className="text-xs mb-2">
                  {getCategoryDisplayName(resource.category)}
                </Badge>
              )}
            </div>
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0 ml-2" />
          </div>
        </CardHeader>
        <CardContent className="pt-0 flex flex-col justify-between flex-1">
          <div className="space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-300 overflow-hidden">
              {resource.description}
            </p>
            
            {/* 标签区域 */}
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