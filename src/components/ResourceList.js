'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, ExternalLink } from 'lucide-react'

/**
 * ResourceList 组件 - 显示资源卡片列表
 * 点击卡片跳转到内部详情页，外部链接作为次级操作
 */
export default function ResourceList({ resources }) {
  const handleExternalLink = (url, e) => {
    e.preventDefault()
    e.stopPropagation()
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {resources.map((resource) => (
          <div key={resource.name} className="group">
            <Link href={`/site/${resource.slug}`} className="block">
              <Card className="h-48 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 flex items-center justify-between">
                    {resource.name}
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {resource.description}
                  </p>
                  
                  {/* 外部链接区域 */}
                  <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
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
        ))}
      </div>
    </section>
  )
}