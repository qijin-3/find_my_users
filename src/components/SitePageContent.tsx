'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import ResourceCard from '@/components/ResourceCard'
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
 * @param t - 翻译函数
 */
const getSiteCategories = (t: any) => [
  { id: 'product_showcase', name: t('categories.product-showcase'), icon: Globe },
  { id: 'tool_navigation', name: t('categories.tool-navigation'), icon: Wrench },
  { id: 'blog_newsletter', name: t('categories.blog-newsletter'), icon: BookOpen },
  { id: 'social_platform', name: t('categories.social-platform'), icon: Users },
  { id: 'media', name: t('categories.media'), icon: Radio },
  { id: 'vertical_forum', name: t('categories.vertical-forum'), icon: ChatCircle },
  { id: 'design_platform', name: t('categories.design-platform'), icon: Palette },
]

/**
 * SitePageContent组件 - 分类页面主要内容
 * 包含左侧分类菜单、顶部标题栏和右侧工具展示区域
 * @param {SitePageContentProps} props - 组件属性
 */
export default function SitePageContent({ resources, locale = 'zh' }: SitePageContentProps) {
  const t = useTranslations('site')
  const [selectedCategory, setSelectedCategory] = useState('product_showcase')

  // 获取本地化的分类配置
  const siteCategories = getSiteCategories(t)

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
      <div className="bg-[#ffffff00] h-[auto] pt-4">
        <div className="max-w-7xl mx-auto ml-[80px] mr-[80px] pl-0 pr-0">
          <div className="flex items-center justify-between pt-0">
            <div>
              <h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>
              <p className="text-sm text-muted-foreground">{t('description')}</p>
            </div>
            <Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">
              <Plus className="w-4 h-4 mr-2" />
              {t('submitTool')}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto ml-[80px] mr-[80px] pl-0 pr-0 py-8">
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
                      className={`w-full flex items-center justify-between gap-3 px-3 py-2 text-sm transition-colors ${
                        isSelected 
                          ? 'border-2 border-text-dark text-foreground bg-muted rounded-[12px]' 
                          : 'text-muted-foreground hover:bg-muted rounded-[12px]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className="w-4 h-4" />
                        {category.name}
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