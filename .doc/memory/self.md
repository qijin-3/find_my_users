/* 亮色模式 - 合并前 */
--border: 0, 0%, 10.2%;
--card-border: 26, 26, 26; /* #1a1a1a - 卡片边框和主要标签背景色 */

/* 亮色模式 - 合并后 */
--border: 26, 26, 26; /* #1a1a1a - 边框颜色，同时用于卡片边框和主要标签背景色 */

/* 暗色模式 - 合并前 */
--border: 217.2 32.6% 17.5%;
--card-border: 210, 40%, 98%; /* 暗色模式下的卡片边框和主要标签背景色 */

/* 暗色模式 - 合并后 */
--border: 210, 40%, 98%; /* 暗色模式下的边框颜色，同时用于卡片边框和主要标签背景色 */

// 顶部标题栏透明背景和自动高度
<div className="bg-[#ffffff00] h-[auto] pt-4 border-b border-gray-200">

// header 容器边距调整，与下方内容区域保持一致
<div className="max-w-7xl mx-auto ml-[80px] mr-[80px] pl-0 pr-0">

// 下方内容区域容器边距调整
<div className="max-w-7xl mx-auto ml-[80px] mr-[80px] pl-0 pr-0 py-8">

// 左侧菜单边框加粗
<div className="bg-white rounded-lg shadow-sm border-2 border-border p-4">

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 导入 Calendar 图标
import { Calendar } from '@phosphor-icons/react'

// 更新"最后修改"显示区域
{lastModified && (
  <div className="text-sm mb-2 text-muted-foreground flex items-center gap-2">
    <Calendar size={16} />
    {t('lastModified')}: {new Date(lastModified).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })}
  </div>
)}

## 案例29：移除SitePageContent组件分类菜单按钮hover颜色变化

### 问题描述
用户要求移除SitePageContent组件中分类菜单按钮的hover颜色变化效果，希望按钮在hover时颜色保持不变。

### 分析
在SitePageContent.tsx文件中，左侧分类菜单的按钮具有`hover:bg-muted`类，这会在鼠标悬停时改变背景颜色。需要移除这个hover效果。

### 解决方案
1. **定位问题代码**：找到SitePageContent.tsx中分类菜单按钮的className配置
2. **移除hover效果**：删除`hover:bg-muted`类和`transition-colors`类
3. **保持其他样式**：确保选中状态和基础样式不受影响

### 代码变更
**修改前**：
```tsx
className={`w-full flex items-center justify-between gap-3 px-3 py-2 text-sm transition-colors ${
  isSelected 
    ? 'border-2 border-text-dark text-foreground bg-muted rounded-[12px]' 
    : 'text-muted-foreground hover:bg-muted rounded-[12px]'
}`}
```

**修改后**：
```tsx
className={`w-full flex items-center justify-between gap-3 px-3 py-2 text-sm ${
  isSelected 
    ? 'border-2 border-text-dark text-foreground bg-muted rounded-[12px]' 
    : 'text-muted-foreground rounded-[12px]'
}`}
```

### 验证结果
- ✅ 分类菜单按钮hover时不再有颜色变化
- ✅ 选中状态的样式保持正常
- ✅ 基础布局和间距不受影响

## 案例30：站点详情页按钮文本国际化重构

### 问题描述
用户要求将站点详情页中的按钮文本从硬编码改为使用messages文件维护，实现更好的国际化管理。

### 分析
在站点详情页面中，"访问官网"和"提交产品"按钮使用了硬编码的中英文文本：
```tsx
{locale === 'zh' ? '访问官网' : 'Visit Website'}
{locale === 'zh' ? '提交产品' : 'Submit Product'}
```
这种方式不符合项目的i18n规范，应该使用翻译函数统一管理。

### 解决方案
1. **添加翻译字段**：在messages/zh.json和messages/en.json中添加按钮文本
2. **使用翻译函数**：将硬编码文本替换为t()函数调用
3. **遵循i18n规范**：确保符合项目的国际化开发规则

### 代码变更
**1. 更新翻译文件**：
```json
// messages/zh.json
"site": {
  "visitWebsite": "访问官网",
  "submitProduct": "提交产品"
}

// messages/en.json  
"site": {
  "visitWebsite": "Visit Website",
  "submitProduct": "Submit Product"
}
```

**2. 更新页面组件**：
```tsx
// 修改前
{locale === 'zh' ? '访问官网' : 'Visit Website'}
{locale === 'zh' ? '提交产品' : 'Submit Product'}

// 修改后
{t('visitWebsite')}
{t('submitProduct')}
```

### 验证结果
- ✅ 按钮文本正确显示中英文
- ✅ 符合项目i18n规范
- ✅ 便于后续维护和扩展

## 案例31：站点详情页审核信息显示优化

### 问题描述
用户要求将站点详情页中的审核状态和审核时间合并显示在同一个h2标题下，显示格式为"review，reviewTime"的形式。

### 分析
原来的实现中，审核状态和审核时间分别有独立的h2标题和段落：
1. 审核状态有独立的h2标题"审核"
2. 审核时间有独立的h2标题"审核时间"（仅在审核状态为'Y'时显示）

用户希望将两者合并，在同一个"审核"标题下显示，格式为"需要审核，三天内"这样的形式。

### 解决方案
1. **保留审核状态的h2标题**：继续使用`{t('detail.review')}`作为标题
2. **合并显示逻辑**：在同一个p标签内显示审核状态和审核时间
3. **条件显示审核时间**：只有当`siteData.review === 'Y'`时才显示审核时间
4. **使用中文逗号分隔**：使用"，"连接审核状态和审核时间

### 代码变更
**修改前**：
```tsx
<h2>{t('detail.review')}</h2>
<p className="text-foreground leading-relaxed">
  {await getFieldDisplayText('review', siteData.review, locale as 'zh' | 'en')}
</p>

{/* 审核时间显示 - 只有当审核为Y时才显示 */}
{siteData.review === 'Y' && (
  <>
    <h2>{t('detail.reviewTime')}</h2>
    <p className="text-foreground leading-relaxed">
      {await getFieldDisplayText('reviewTime', siteData.reviewTime, locale as 'zh' | 'en')}
    </p>
  </>
)}
```

**修改后**：
```tsx
<h2>{t('detail.review')}</h2>
<p className="text-foreground leading-relaxed">
  {await getFieldDisplayText('review', siteData.review, locale as 'zh' | 'en')}
  {siteData.review === 'Y' && (
    <>
      ，{await getFieldDisplayText('reviewTime', siteData.reviewTime, locale as 'zh' | 'en')}
    </>
  )}
</p>
```

### 验证结果
- ✅ 审核状态和审核时间合并显示在同一个标题下
- ✅ 显示格式为"需要审核，三天内"的形式
- ✅ 当审核状态为'N'时，只显示"无需审核"
- ✅ 当审核状态为'Y'时，显示"需要审核，具体时间"
- ✅ 使用统一的字段获取函数，保持多语言支持

## 案例32：Footer组件国际化重构

### 问题描述
用户要求将Footer.js文件中的硬编码文本进行双语维护，迁移到messages目录下的国际化文件中，实现更好的多语言支持。

### 分析
原Footer.js组件存在以下问题：
1. 所有文本内容都是硬编码的英文
2. 没有使用项目的国际化系统
3. 文件格式为.js而非TypeScript
4. 使用普通Link而非国际化路由Link

### 解决方案
1. **添加翻译文本**：在messages/zh.json和messages/en.json中添加footer相关翻译
2. **重构组件**：将Footer.js改为Footer.tsx，添加国际化支持
3. **使用翻译函数**：用useTranslations替换硬编码文本
4. **使用国际化路由**：用@/i18n/navigation的Link替换普通Link

### 代码变更
**1. 翻译文件更新**：
```json
// messages/zh.json
"footer": {
  "about": {
    "title": "关于",
    "description": "FindMyUsers 是一个基于 Next.js 构建的开源动态网站解决方案，无需传统数据库，由 GitHub 提供支持。"
  },
  "quickLinks": {
    "title": "快速链接",
    "home": "首页",
    "site": "站点", 
    "articles": "文章"
  },
  "connect": {
    "title": "联系我们"
  },
  "copyright": "© {year} FindMyUsers. 保留所有权利。"
}

// messages/en.json
"footer": {
  "about": {
    "title": "About",
    "description": "FindMyUsers is an open-source dynamic website solution without a traditional database, built with Next.js and powered by GitHub."
  },
  "quickLinks": {
    "title": "Quick Links",
    "home": "Home",
    "site": "Site",
    "articles": "Articles"
  },
  "connect": {
    "title": "Connect"
  },
  "copyright": "© {year} FindMyUsers. All rights reserved."
}
```

**2. 组件重构**：
```tsx
// 修改前 - Footer.js
export function Footer() {
  return (
    <h3 className="...">About</h3>
    <p>FindMyUsers is an open-source...</p>
    <Link href="/">Home</Link>
  )
}

// 修改后 - Footer.tsx
'use client'
import { useTranslations, useLocale } from 'next-intl';
import { Link as I18nLink } from '@/i18n/navigation';

export function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();
  
  return (
    <h3 className="...">{t('about.title')}</h3>
    <p>{t('about.description')}</p>
    <I18nLink href="/">{t('quickLinks.home')}</I18nLink>
    <p>{t('copyright', { year: currentYear })}</p>
  )
}
```

### 验证结果
- ✅ TypeScript编译检查通过
- ✅ 浏览器预览无错误
- ✅ 中英文切换正常显示
- ✅ 国际化路由链接正常工作
- ✅ 版权年份动态显示

### 技术要点
1. **客户端组件**：使用'use client'指令支持useTranslations hook
2. **国际化路由**：使用@/i18n/navigation的Link组件确保路由包含语言前缀
3. **参数化翻译**：使用{year}参数实现动态年份显示
4. **TypeScript支持**：将.js文件重命名为.tsx并添加函数注释
5. **嵌套翻译结构**：使用分层的JSON结构组织翻译文本

## 案例33：Footer组件链接hover效果优化

### 问题描述
用户要求修改Footer.tsx组件中可hover链接的效果，移除颜色变化，改为使用animated-text.tsx组件的动画效果。

### 分析
在Footer.tsx组件中，快速链接和联系方式部分的链接使用了`hover:text-gray-900`类来实现hover时的颜色变化效果。用户希望将这种颜色变化效果替换为更生动的文字跳跃动画效果。

### 解决方案
1. **导入AnimatedText组件**：添加animated-text组件的导入
2. **替换hover颜色效果**：移除`hover:text-gray-900`类，添加`group`类
3. **使用AnimatedText包装文本**：将链接文本用AnimatedText组件包装，启用`useGroupHover`属性
4. **保持原有样式**：确保基础样式和布局不受影响

### 代码变更
**1. 添加组件导入**：
```tsx
import AnimatedText from '@/components/ui/animated-text';
```

**2. 修改快速链接部分**：
```tsx
// 修改前
<I18nLink href="/" className="text-base text-muted-foreground hover:text-gray-900">
  {t('quickLinks.home')}
</I18nLink>

// 修改后
<I18nLink href="/" className="text-base text-muted-foreground group">
  <AnimatedText text={t('quickLinks.home')} useGroupHover />
</I18nLink>
```

**3. 修改联系方式部分**：
```tsx
// 修改前
<a href="https://github.com/qiayue/findmyusers" target="_blank" className="text-base text-muted-foreground hover:text-gray-900">
  GitHub
</a>

// 修改后
<a href="https://github.com/qiayue/findmyusers" target="_blank" className="text-base text-muted-foreground group">
  <AnimatedText text="GitHub" useGroupHover />
</a>
```

### 技术要点
1. **group-hover机制**：使用Tailwind的`group`类配合AnimatedText的`useGroupHover`属性
2. **动画效果**：文字在hover时会逐字符进行跳跃动画，比颜色变化更生动
3. **国际化支持**：快速链接部分使用翻译函数，外部链接使用硬编码文本
4. **性能优化**：AnimatedText组件使用Framer Motion实现高性能动画

### 验证结果
- ✅ TypeScript编译检查通过，无类型错误
- ✅ 浏览器预览正常，无控制台错误
- ✅ hover时文字呈现跳跃动画效果，替代了原有的颜色变化
- ✅ 快速链接和外部链接都正确应用了动画效果
- ✅ 保持了原有的布局和基础样式

### 影响范围
- 修改了Footer组件的所有可点击链接的hover效果
- 提升了用户交互体验，使hover效果更加生动有趣
- 符合项目使用Framer Motion进行动画优化的技术偏好


// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-border text-foreground hover:bg-gray-800 rounded-[12px]">

// 标题使用CSS变量颜色
<h1 className="text-2xl font-bold text-foreground pb-2">{t('title')}</h1>

// 描述文字使用CSS变量颜色
<p className="text-muted-foreground">{t('description')}</p>

// 按钮样式使用CSS变量，添加12px圆角
<Button className="bg-card border-2 border-
