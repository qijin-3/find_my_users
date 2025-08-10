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

### 技术要点
1. **i18n规范**：遵循next-intl的翻译函数使用规范
2. **文件结构**：翻译文件按命名空间组织，site相关文本放在site命名空间下
3. **代码简化**：移除条件判断，使用统一的翻译函数调用

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
