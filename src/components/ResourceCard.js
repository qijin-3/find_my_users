'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, ExternalLink } from 'lucide-react'

/**
 * ResourceCard 组件 - 统一的资源卡片组件
 * 用于首页和site页面显示资源信息
 * @param {Object} resource - 资源对象
 * @param {string} resource.name - 资源名称
 * @param {string} resource.description - 资源描述
 * @param {string} resource.url - 资源外部链接
 * @param {string} resource.slug - 资源slug，用于内部路由
 * @param {string} resource.category - 资源分类
 * @param {Array} resource.tags - 资源标签（可选）
 * @param {boolean} showCategory - 是否显示分类标签
 * @param {string} className - 额外的CSS类名
 */
export default function ResourceCard({ 
  resource, 
  showCategory = false, 
  className = "" 
}) {
  /**
   * 处理外部链接点击事件
   * @param {string} url - 目标URL
   * @param {Event} e - 点击事件对象
   */
  const handleExternalLink = (url, e) => {
    e.preventDefault()
    e.stopPropagation()
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  /**
   * 获取分类显示名称
   * @param {string} categoryId - 分类ID
   * @returns {string} 分类显示名称
   */
  const getCategoryDisplayName = (categoryId) => {
    const categoryMap = {
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
    <div className={`group ${className}`}>
      <Link href={`/site/${resource.slug}`} className="block">
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
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
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
            
            {/* 底部操作区域 */}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
              <button
                onClick={(e) => handleExternalLink(resource.url, e)}
                className="inline-flex items-center text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                查看更多资源
              </button>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}