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

# 案例49：AnimatedText组件hover效果修复和文字显示优化

## 问题描述
用户反馈前端显示的文字有多余的空格，并且没有hover的文字流动效果。经检查发现：
1. `SiteList.tsx` 和 `ArticleList.js` 中 `AnimatedText` 组件和箭头符号分离，导致多余空格
2. `AnimatedText` 组件的 `useGroupHover` 机制无法正确找到父级 `group` 元素
3. 缺少 `mouseleave` 事件处理，导致动画状态无法正确重置

## 问题分析
1. **文字显示问题**：`AnimatedText` 和 `<span>→</span>` 分离导致额外空格
2. **hover效果失效**：`document.querySelector('.group')` 无法准确定位到正确的父元素
3. **动画状态管理**：缺少 `mouseleave` 处理导致动画状态异常
4. **DOM元素获取**：使用 `document.currentScript` 在React组件中不可靠

## 解决方案
1. **合并文字和箭头**：将箭头符号直接包含在 `AnimatedText` 的 `text` 属性中
2. **修复DOM元素获取**：使用 `useRef` 正确获取组件DOM元素
3. **改进父元素查找**：实现递归查找最近的 `group` 父元素
4. **完善事件处理**：添加 `mouseenter` 和 `mouseleave` 事件处理

## 代码变更

### 1. 修复 AnimatedText 组件
```typescript
// src/components/ui/animated-text.tsx
import { useRef } from 'react'

const AnimatedText = ({ ... }) => {
  const spanRef = useRef<HTMLSpanElement>(null)
  
  useEffect(() => {
    if (useGroupHover && spanRef.current) {
      const findGroupParent = (element: HTMLElement | null): HTMLElement | null => {
        if (!element) return null
        if (element.classList.contains('group')) return element
        return findGroupParent(element.parentElement)
      }

      const groupParent = findGroupParent(spanRef.current.parentElement)
      
      if (groupParent) {
        groupParent.addEventListener('mouseenter', handleGroupHover)
        groupParent.addEventListener('mouseleave', handleGroupLeave)
        return () => {
          groupParent.removeEventListener('mouseenter', handleGroupHover)
          groupParent.removeEventListener('mouseleave', handleGroupLeave)
        }
      }
    }
  }, [useGroupHover, characters.length, stagger, duration, autoPlay])

  return <span ref={spanRef} ...>...</span>
}
```

### 2. 优化 SiteList 组件
```tsx
// src/components/SiteList.tsx
<AnimatedText 
  text={`${t('moreSites')} →`}
  className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
  animateOnHover={false}
  useGroupHover={true}
/>
```

### 3. 优化 ArticleList 组件
```javascript
// src/components/ArticleList.js
<AnimatedText 
  text={`${t('moreArticles')} →`}
  className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
  animateOnHover={false}
  useGroupHover={true}
/>
```

## 技术要点
1. **useRef使用**：正确获取React组件的DOM元素引用
2. **递归查找**：实现向上遍历DOM树查找特定类名的父元素
3. **事件管理**：完整的事件监听器添加和清理机制
4. **字符串模板**：使用模板字符串合并文字和符号，避免额外空格

## 验证结果
- ✅ 文字显示无多余空格
- ✅ hover时文字流动效果正常
- ✅ 鼠标离开时动画状态正确重置
- ✅ 中英文切换功能正常
- ✅ 开发服务器运行无错误

## 影响范围
- 修改了 `AnimatedText` 组件的核心逻辑，影响所有使用该组件的地方
- 优化了 `SiteList.tsx` 和 `ArticleList.js` 的文字显示
- 提升了用户交互体验和视觉效果

---

### 问题描述
`src/components/SiteList.tsx` 和 `src/components/ArticleList.js` 中的标题文字 "Sites" 和 "Articles" 为硬编码，需要进行双语维护以支持多语言功能。

### 问题分析
1. **硬编码文字**：组件中直接使用英文字符串，不支持多语言切换
2. **维护成本**：需要在每个组件中单独维护翻译文字
3. **用户体验**：无法根据用户语言偏好显示对应语言的标题
4. **架构一致性**：与项目整体多语言架构不统一

### 解决方案
1. **使用现有翻译字段**：优先使用 `messages/zh.json` 和 `messages/en.json` 中已存在的字段
2. **导入翻译函数**：在组件中引入 `useTranslations` hook
3. **替换硬编码文字**：使用翻译函数获取对应语言的文字

### 代码变更

#### 1. 修改 SiteList.tsx 组件
```tsx
// 添加翻译函数导入
import { useTranslations } from 'next-intl'

// 在组件中使用翻译
export default function SiteList({ sites, showMoreLink = true, locale = 'zh' }: SiteListProps) {
  const t = useTranslations('site')
  
  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[24px] font-bold tracking-tighter">{t('title')}</h2>
        // ...
      </div>
    </section>
  )
}
```

#### 2. 修改 ArticleList.js 组件
```js
// 使用现有的翻译函数
export default function ArticleList({ articles, showMoreLink = true }) {
  const t = useTranslations('articles')
  return (
    <section>
      {showMoreLink && (
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[24px] font-bold tracking-tighter">{t('title')}</h2>
          // ...
        </div>
      )}
    </section>
  )
}
```

### 技术要点
1. **现有字段复用**：使用 `site.title` 和 `articles.title` 字段，避免新增翻译键
2. **翻译函数集成**：通过 `useTranslations` hook 获取对应语言的文字
3. **组件一致性**：保持与其他组件相同的多语言处理方式
4. **类型安全**：TypeScript 组件保持类型定义完整性
5. **向后兼容**：修改不影响组件的其他功能和属性

### 验证结果
1. ✅ SiteList 组件标题支持中英文切换
2. ✅ ArticleList 组件标题支持中英文切换
3. ✅ 使用现有翻译字段，无需新增维护成本
4. ✅ 组件功能保持完整，无破坏性变更
5. ✅ 开发服务器正常运行，无编译错误

### 影响范围
- **组件层面**：SiteList.tsx 和 ArticleList.js 组件
- **翻译文件**：复用现有的 `site.title` 和 `articles.title` 字段
- **用户界面**：首页和相关页面的标题显示支持多语言
- **维护成本**：降低硬编码文字的维护负担

---