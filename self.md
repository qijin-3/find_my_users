'use client'

import { Badge } from '@/components/ui/badge'
import { useFieldData } from '@/hooks/useFieldData'
import { CheckCircle, Clock, Warning, WifiSlash, XCircle, Globe } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

/**
 * SiteBadge 组件 - 用于显示站点的type和status信息
 * 从 /data/Site 目录中获取站点数据并显示相应的badge
 */
export default function SiteBadge({ 
  siteData, 
  locale = 'zh', 
  showType = true, 
  showStatus = true,
  className = ""
}: SiteBadgeProps) {
  const { getFieldDisplayText } = useFieldData(locale as 'zh' | 'en')

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* 类型Badge */}
      {showType && siteData.type && (
        <Badge variant="secondary" className="...">
          {getFieldDisplayText('type', siteData.type)}
        </Badge>
      )}
      
      {/* 状态Badge */}
      {showStatus && siteData.status && (
        <Badge className={cn("...", getStatusInfo(siteData.status).color)}>
          <StatusIcon size={12} />
          {getFieldDisplayText('status', siteData.status)}
        </Badge>
      )}
    </div>
  )
}

// 提供TypeBadge和StatusBadge子组件用于单独使用
export function TypeBadge({ type, locale, className }) { ... }
export function StatusBadge({ status, locale, className }) { ... }
```

#### 1. 创建SiteBadge组件 (`/src/components/ui/site-badge.tsx`)
```tsx
'use client'

import { Badge } from '@/components/ui/badge'
import { useFieldData } from '@/hooks/useFieldData'
import { CheckCircle, Clock, Warning, WifiSlash, XCircle, Globe } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

/**
 * SiteBadge 组件 - 用于显示站点的type和status信息
 * 从 /data/Site 目录中获取站点数据并显示相应的badge
 */
export default function SiteBadge({ 
  siteData, 
  locale = 'zh', 
  showType = true, 
  showStatus = true,
  className = ""
}: SiteBadgeProps) {
  const { getFieldDisplayText } = useFieldData(locale as 'zh' | 'en')

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* 类型Badge */}
      {showType && siteData.type && (
        <Badge variant="secondary" className="...">
          {getFieldDisplayText('type', siteData.type)}
        </Badge>
      )}
      
      {/* 状态Badge */}
      {showStatus && siteData.status && (
        <Badge className={cn("...", getStatusInfo(siteData.status).color)}>
          <StatusIcon size={12} />
          {getFieldDisplayText('status', siteData.status)}
        </Badge>
      )}
    </div>
  )
}

// 提供TypeBadge和StatusBadge子组件用于单独使用
export function TypeBadge({ type, locale, className }) { ... }
export function StatusBadge({ status, locale, className }) { ... }
```

#### 2. 更新站点详情页 (`/src/app/[locale]/site/[slug]/page.tsx`)
```tsx
// 导入SiteBadge组件
import SiteBadge from '@/components/ui/site-badge'

// 替换原有的硬编码badge
<div className="flex items-center gap-3 mb-4">
  <SiteBadge 
    siteData={{ type: siteData.type, status: siteData.status }}
    locale={locale}
    showType={true}
    showStatus={true}
  />
</div>

// 移除不再需要的状态处理函数
// - getStatusInfo()
// - getStatusText()
// - 相关图标导入
```

#### 3. 更新ResourceCard组件 (`/src/components/ResourceCard.tsx`)
```tsx
// 导入TypeBadge组件
import { TypeBadge } from '@/components/ui/site-badge'

// 替换原有的类型badge
{showCategory && resource.type && (
  <TypeBadge 
    type={resource.type}
    locale={locale}
    className="text-[12px] font-normal leading-[18px]"
  />
)}

// 移除不再需要的getCategoryDisplayName函数和useFieldData hook
```

### 验证结果
1. ✅ 站点详情页正确显示type和status badge
2. ✅ ResourceCard组件正确显示type badge
3. ✅ 多语言支持正常工作
4. ✅ 样式保持一致性
5. ✅ 组件可复用性提升

### 技术要点
1. **组件化设计**：将重复的badge逻辑抽取为独立组件
2. **灵活配置**：支持选择性显示type和status
3. **类型安全**：完整的TypeScript类型定义
4. **多语言集成**：使用useFieldData hook获取翻译文本
5. **样式一致性**：保持与现有设计系统的统一
6. **子组件提供**：TypeBadge和StatusBadge用于特定场景
7. **状态图标映射**：根据不同状态显示对应的图标和颜色