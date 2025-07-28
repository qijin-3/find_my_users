'use client'

import ResourceCard from '@/components/ResourceCard'

/**
 * ResourceList 组件 - 显示资源卡片列表
 * 使用统一的ResourceCard组件进行渲染
 * @param {Array} resources - 资源数组
 */
export default function ResourceList({ resources }) {
  // 添加类型检查以防止undefined错误
  if (!resources || !Array.isArray(resources)) {
    return null
  }

  return (
    <section className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {resources.map((resource) => (
          <ResourceCard 
            key={resource.name} 
            resource={resource}
            showCategory={false}
          />
        ))}
      </div>
    </section>
  )
}