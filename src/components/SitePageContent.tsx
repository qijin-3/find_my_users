'use client'

import React, { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import AnimatedText from '@/components/ui/animated-text'
import ResourceCard from '@/components/ResourceCard'
import { useFieldData } from '@/hooks/useFieldData'
import { 
  Globe, 
  Wrench, 
  BookOpen, 
  Users, 
  Radio, 
  ChatCircle, 
  Palette,
  Plus
} from '@phosphor-icons/react'

/**
 * 资源对象类型定义
 */
interface Resource {
  name: string
  description: string
  url: string
  slug: string
  type: string  // 站点类型，用于分类筛选
  date: string
  lastModified: string
  status?: string
  region?: string
  submitMethod?: string
  reviewTime?: string
  expectedExposure?: string
}

/**
 * SitePageContent组件的Props类型定义
 */
interface SitePageContentProps {
  resources: Resource[]
  locale?: string
}

/**
 * 站点分类配置
 * 定义左侧菜单的分类项目和对应图标
 * 注意：分类 ID 必须与 site-fields.json 中的 type 字段键值完全一致
 * @param fieldsData - 字段数据
 */
const getSiteCategories = (fieldsData: any) => [
  { id: 'product_showcase', name: fieldsData?.type?.product_showcase || 'Product Showcase', icon: Globe },
  { id: 'tool_navigation', name: fieldsData?.type?.tool_navigation || 'Tool Navigation', icon: Wrench },
  { id: 'blog_newsletter', name: fieldsData?.type?.blog_newsletter || 'Blog/Newsletter', icon: BookOpen },
  { id: 'social_platform', name: fieldsData?.type?.social_platform || 'Social Platform', icon: Users },
  { id: 'media', name: fieldsData?.type?.media || 'Media', icon: Radio },
  { id: 'vertical_forum', name: fieldsData?.type?.vertical_forum || 'Vertical Forum', icon: ChatCircle },
  { id: 'design_platform', name: fieldsData?.type?.design_platform || 'Design Platform', icon: Palette },
]

/**
 * SitePageContent组件 - 分类页面主要内容
 * 包含左侧分类菜单、顶部标题栏和右侧工具展示区域
 * @param {SitePageContentProps} props - 组件属性
 */
export default function SitePageContent({ resources, locale = 'zh' }: SitePageContentProps) {
  const t = useTranslations('site')
  const [selectedCategory, setSelectedCategory] = useState('product_showcase')
  
  // 使用 useFieldData hook 获取字段数据
  const { fieldsData, loading, error } = useFieldData(locale as 'zh' | 'en')

  // 获取本地化的分类配置
  const siteCategories = useMemo(() => getSiteCategories(fieldsData), [fieldsData])

  /**
   * 根据选中的分类筛选资源
   * 使用useMemo优化性能，避免不必要的重新计算
   * 注意：站点数据中使用的是 type 字段而不是 category 字段
   */
  const filteredResources = useMemo(() => {
    if (!resources || !Array.isArray(resources)) return []
    if (!selectedCategory) return resources
    return resources.filter(resource => resource.type === selectedCategory)
  }, [resources, selectedCategory])

  return (
    <div className="min-h-screen bg-[#f9fafb00]">
      {/* 顶部标题栏 */}
      <div className="bg-[#ffffff00] h-[auto] pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between pt-0">
            <div>
              <h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>
              <p className="text-sm text-muted-foreground">{t('description')}</p>
            </div>
            <Button 
              className="bg-card border-2 border-border text-foreground rounded-[12px] group transition-transform hover:-translate-y-1 hover:bg-card"
              style={{ 
                // 确保按钮内容能够正常进行transform动画
                transform: 'none',
                willChange: 'auto',
                // 移除hover背景色变化，保持原始颜色
                transition: 'transform 0.2s ease-out'
              }}
              onClick={() => window.open('https://github.com/qijin-3/find_my_users/issues', '_blank')}
            >
              <Plus className="w-4 h-4 mr-2 transition-transform group-hover:-translate-y-0.5" />
              <AnimatedText text={t('submitTool')} />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        <div className="flex gap-8">
          {/* 左侧分类菜单 */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-[24px] shadow-sm border-2 border-border p-4">
              <nav className="space-y-2">
                {siteCategories.map((category) => {
                  const IconComponent = category.icon
                  const isSelected = selectedCategory === category.id
                  const categoryCount = resources && Array.isArray(resources) 
                    ? resources.filter(r => r.type === category.id).length 
                    : 0
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between gap-3 px-3 py-2 text-sm ${
                        isSelected 
                          ? 'border-2 border-text-dark text-foreground bg-muted rounded-[12px]' 
                          : 'text-muted-foreground rounded-[12px]'
                      }`}
                      style={{
                        // 确保按钮内容能够正常进行transform动画
                        transform: 'none',
                        willChange: 'auto'
                      }}
                    >
                      <div 
                        className="flex items-center gap-3"
                        style={{
                          // 确保div容器不影响子元素的transform
                          transform: 'none',
                          willChange: 'auto'
                        }}
                      >
                        <IconComponent className="w-4 h-4" />
                        <AnimatedText text={category.name} />
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        isSelected 
                          ? 'bg-muted text-muted-foreground' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {categoryCount}
                      </span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* 右侧内容区域 */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <ResourceCard 
                  key={resource.name} 
                  resource={resource}
                  showCategory={true}
                  locale={locale}
                />
              ))}
            </div>

            {/* 如果没有资源显示空状态 */}
            {filteredResources.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Globe className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{t('empty.title')}</h3>
                <p className="text-gray-500">{t('empty.description')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}