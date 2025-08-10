# 自我记忆文件

## 已知错误及修复方法

### 1. TypeScript 类型定义不完整
**错误现象**: 组件中使用的属性在接口定义中缺失，导致编译错误
**修复方法**: 
- 检查组件中实际使用的所有属性
- 在接口定义中添加缺失的属性
- 确保类型定义与实际数据结构一致

### 2. 未使用 Shadcn/ui 组件规范
**错误现象**: 直接使用原生HTML元素而不是Shadcn/ui组件
**修复方法**: 
- 使用 `@/components/ui/` 中的组件
- 遵循Shadcn/ui的设计系统和API规范

### 3. 忘记添加函数注释
**错误现象**: 函数缺少JSDoc注释
**修复方法**: 
- 为每个函数添加详细的JSDoc注释
- 包含参数说明、返回值说明和功能描述

### 4. 未正确使用SWR进行数据获取
**错误现象**: 直接使用fetch而不是SWR
**修复方法**: 
- 使用 `useSWR` hook进行数据获取
- 配置适当的缓存和重新验证策略

### 5. 未使用 `cn()` 函数合并类名
**错误现象**: 直接拼接字符串处理CSS类名
**修复方法**: 
- 使用 `@/lib/utils` 中的 `cn()` 函数
- 支持条件类名和类名合并

### 6. 未遵循响应式设计原则
**错误现象**: 组件在不同屏幕尺寸下显示异常
**修复方法**: 
- 使用Tailwind CSS的响应式前缀
- 测试不同屏幕尺寸下的显示效果

### 7. 环境变量使用不当
**错误现象**: 在客户端组件中使用服务端环境变量
**修复方法**: 
- 客户端变量使用 `NEXT_PUBLIC_` 前缀
- 服务端变量只在服务端组件中使用

### 8. 字段映射不完整
**错误现象**: 页面显示原始字段值而不是翻译后的文本
**修复方法**: 
- 检查实际数据文件中使用的字段值
- 在 `field-utils.ts` 中补充 `zhFields` 和 `enFields` 对象中缺失的字段值映射
- 确保 `field-utils.ts` 包含所有实际使用的映射
- 同时更新中英文映射
- 使用 `getFieldDisplayText` 函数进行字段值转换
- 确保组件中调用 `getFieldDisplayText` 时使用正确的字段类型参数
- **最新修复**: 2024-12-24 修复了 github.json 中的 type 字段值不匹配问题，将 "social_community" 改为 "social_platform"

### 14. 字段映射合并维护优化
**需求**: 将分散在多个文件中的字段映射数据统一管理，减少维护成本
**问题分析**:
- 项目中存在三个文件维护相同的字段映射数据：`/data/json/zh/site-fields.json`、`/data/json/en/site-fields.json`、`/src/lib/field-utils.ts`
- 重复维护导致数据不一致和维护成本高
- 硬编码的字段映射难以扩展和维护
**实现方案**:
- 重构 `field-utils.ts`，移除硬编码的 `zhFields` 和 `enFields` 对象
- 使用 `getI18nJsonData` 函数从JSON文件读取字段映射数据
- 添加字段数据缓存机制避免重复读取文件
- 完善JSON文件中的字段映射，添加缺失的字段类型
- 保持向后兼容性和错误处理机制
**修复要点**:
- 数据源统一，减少重复维护
- 缓存机制提升性能
- 完整的错误处理确保系统稳定性
- 保持原有函数接口不变

### 9. 站点详情页结构统一
**需求**: 使站点详情页与文章详情页保持一致的结构和样式
**修复步骤**:
- 参考文章详情页的布局结构
- 统一面包屑导航样式
- 统一标题和描述区域布局
- 统一内容区域的间距和排版
- 确保响应式设计的一致性

### 10. 分类筛选字段统一
**错误现象**: 代码中同时使用 `category` 和 `type` 字段，造成混淆和不一致
**原因分析**: 
- 历史遗留问题导致字段命名不统一
- 实际数据文件中使用的是 `type` 字段
- 组件接口定义中保留了 `category` 字段用于向后兼容
**修复方法**:
- 统一使用 `type` 字段进行分类
- 从所有组件接口定义中移除 `category` 字段
- 更新所有相关的筛选逻辑和显示逻辑
- 确保数据结构与代码逻辑的一致性
**修复要点**:
- 检查所有使用分类字段的组件
- 统一字段命名，避免混淆
- 保持代码的简洁性和一致性
- 移除不必要的向后兼容代码

### 11. 文章数据结构优化
**需求**: 将分离的中英文articles.json文件合并为单一文件，减少维护成本
**实现方案**:
- 创建统一的articles.json文件，包含`title_zh`、`title_en`、`description_zh`、`description_en`字段
- 更新`getI18nArticlesList`函数支持新的数据结构
- 根据locale参数动态选择对应语言的字段
- 保持向后兼容，支持fallback到原有分离文件结构
**修复要点**:
- 数据结构统一，减少文件数量
- 保持多语言功能完整性
- 确保数据获取逻辑的健壮性
- 删除冗余的分离文件

### 12. 站点列表数据结构优化
**需求**: 将分离的中英文sitelists.json文件合并为单一文件，减少维护成本
**实现方案**:
- 创建统一的sitelists.json文件，包含`name_zh`、`name_en`字段
- 更新`getI18nSitesList`函数支持新的合并格式
- 根据locale参数动态选择对应语言的名称字段
- 保持向后兼容，支持fallback到原有分离文件结构
**修复要点**:
- 数据结构统一，减少文件数量
- 保持多语言功能完整性
- 确保站点名称的正确显示
- 删除冗余的分离文件
- 支持中英文名称不同的情况（如"音乐播放器"/"Music Player"）

### 13. Site 文件夹数据结构优化
**需求**: 将 `/data/Site` 文件夹中的中英文 JSON 文件合并为单一文件，减少维护成本
**实现方案**:
- 创建统一的 JSON 文件，包含 `name_zh`、`name_en`、`description_zh`、`description_en`、`submitRequirements_zh`、`submitRequirements_en`、`rating_zh`、`rating_en` 字段
- 更新 `getI18nSiteData` 函数支持新的合并格式
- 根据 locale 参数动态选择对应语言的字段
- 保持向后兼容，支持 fallback 到原有分离文件结构
**修复要点**:
- 数据结构统一，减少文件数量
- 保持多语言功能完整性
- 确保站点详情的正确显示
- 删除冗余的分离文件和目录结构
- 支持中英文内容不同的情况
- 将函数改为异步函数以正确处理 Promise


# 案例18：文章详情页Meta信息布局和图标优化

## 问题描述
用户要求对文章详情页的Meta信息卡片进行布局调整：
1. 将Last modified和Published on信息移动到description的下方
2. 为Last modified和Published on添加对应的phosphor图标

## 解决方案
1. 重新排列Meta信息卡片中的内容顺序，将description放在最上方
2. 导入Clock和CalendarBlank图标用于时间信息显示
3. 将原来的p标签改为div标签，使用flex布局来排列图标和文本
4. 为description添加底部间距，与时间信息区分开

## 代码变更

### phosphor-icons导入修改
```tsx
// 修改前
import { ArrowLeft, CaretRight } from '@phosphor-icons/react/dist/ssr'

// 修改后
import { ArrowLeft, CaretRight, Clock, CalendarBlank } from '@phosphor-icons/react/dist/ssr'
```

### Meta信息卡片布局调整
```tsx
// 修改前的顺序：lastModified -> date -> description
{meta.lastModified && (
  <p className="text-[14px] text-muted-foreground mb-2">
    {t('lastModified')}: {new Date(meta.lastModified).toLocaleDateString()}
  </p>
)}
{meta.date && (
  <p className="text-[14px] text-muted-foreground mb-2">
    {t('publishedOn')}: {new Date(meta.date).toLocaleDateString()}
  </p>
)}
{meta.description && (
  <p className="text-[16px] text-foreground">{meta.description}</p>
)}

// 修改后的顺序：description -> lastModified -> date
{meta.description && (
  <p className="text-[16px] text-foreground mb-4">{meta.description}</p>
)}
{meta.lastModified && (
  <div className="flex items-center gap-2 text-[14px] text-muted-foreground mb-2">
    <Clock size={16} />
    <span>{t('lastModified')}: {new Date(meta.lastModified).toLocaleDateString()}</span>
  </div>
)}
{meta.date && (
  <div className="flex items-center gap-2 text-[14px] text-muted-foreground mb-2">
    <CalendarBlank size={16} />
    <span>{t('publishedOn')}: {new Date(meta.date).toLocaleDateString()}</span>
  </div>
)}
```

## 验证结果
- Meta信息卡片中description显示在最上方，与时间信息有明确的视觉分层
- Last modified信息显示Clock图标，语义清晰
- Published on信息显示CalendarBlank图标，符合用户预期
- 图标与文本对齐良好，整体布局更加美观
- 页面正常渲染，无编译错误

## 技术要点
1. **布局优化**: 将最重要的description信息置于顶部，提升信息层次
2. **图标语义**: 使用Clock表示修改时间，CalendarBlank表示发布时间，语义明确
3. **Flex布局**: 使用 `flex items-center gap-2` 实现图标与文本的完美对齐
4. **视觉分层**: 为description添加 `mb-4` 底部间距，与时间信息形成视觉分组
5. **phosphor-icons**: 使用SSR版本的图标，确保服务端渲染兼容性
6. **响应式设计**: 图标大小设置为16px，与14px文字形成良好的视觉比例

## 最佳实践
- 重要信息优先显示，按信息重要性排列布局顺序
- 使用语义化图标增强用户理解，提升用户体验
- 保持图标与文本的视觉平衡，使用合适的间距和对齐方式
- 选择合适的phosphor图标，确保语义准确性
- 使用flex布局实现图标文本组合的最佳对齐效果

## 问题描述
用户要求将 `/Users/jin/SynologyDrive/Working/Dev/Project/find_my_users/src/app/[locale]/posts/[slug]/page.tsx` 文件中第157行的硬编码文本字段维护到 `/Users/jin/SynologyDrive/Working/Dev/Project/find_my_users/messages` 目录下的多语言文件中。

## 解决方案
1. 在 `messages/zh.json` 和 `messages/en.json` 中的 `articles` 命名空间添加 `workingOnTranslation` 字段
2. 将页面中的硬编码三元表达式替换为使用 `t('workingOnTranslation')` 的多语言文本
3. 遵循项目的i18n规范，确保文本的多语言一致性

## 代码变更

### messages/zh.json 文件修改
```json
"articles": {
  "title": "文章",
  "description": "一些经验的分享",
  "backToList": "返回文章列表",
  "publishedOn": "发布于",
  "lastModified": "最后修改",
  "workingOnTranslation": "🧑‍💻 正在制作英文版本中。"
}
```

### messages/en.json 文件修改
```json
"articles": {
  "title": "Articles",
  "description": "Explore insights and experiences",
  "backToList": "Back to article list",
  "publishedOn": "Published on",
  "lastModified": "Last modified",
  "workingOnTranslation": "🧑‍💻 Currently working on the English version."
}
```

### page.tsx 文件修改
```typescript
// 修改前：硬编码的三元表达式
🧑‍💻 {locale === 'en' ? 'Currently working on the English version.' : '正在制作英文版本中。'}

// 修改后：使用多语言文本
{t('workingOnTranslation')}
```

## 验证结果
- 成功将硬编码文本提取到多语言文件中
- 页面正常显示对应语言的提示文本
- 符合项目i18n规范和最佳实践

## 技术要点
1. **多语言维护**: 将硬编码文本统一维护到messages文件中，便于管理和翻译
2. **命名空间组织**: 在articles命名空间下添加相关字段，保持逻辑分组
3. **代码简化**: 使用t()函数替代复杂的三元表达式，提高代码可读性
4. **i18n规范**: 遵循next-intl的最佳实践，确保多语言功能的一致性
5. **文本一致性**: 确保中英文提示信息的语义和格式保持一致


## 问题描述
用户要求将 `ArticleList.js` 组件中的 `a`、`p`、`div` 等组件的颜色统一为 `--muted-foreground: 215.4 16.3% 46.9%`，并删除无用的颜色变量。

## 解决方案
1. 将 `ArticleList.js` 组件中所有文本元素的颜色统一使用 `text-muted-foreground` 类
2. 删除 `globals.css` 中不再使用的 `--article-date-text` 颜色变量
3. 利用现有的 `--muted-foreground` 变量实现颜色统一

## 代码变更

### ArticleList.js 组件修改
```javascript
// 统一使用 text-muted-foreground 类
<div className="text-sm mb-2 text-muted-foreground">  // lastModified 时间
<Link className="text-muted-foreground hover:text-foreground/80">  // 文章链接
<Link href="/posts" className="text-muted-foreground hover:text-foreground/80">  // More articles 链接
<CardDescription className="text-muted-foreground">  // 文章描述
```

### globals.css 变量清理
```css
/* 删除不再使用的颜色变量 */
/* --article-date-text: 107, 114, 128; */ // 亮色模式
/* --article-date-text: 156, 163, 175; */ // 暗色模式
```

## 验证结果
- 开发服务器在 `http://localhost:3001` 成功启动
- 所有文本元素颜色统一为 `--muted-foreground`
- 删除了冗余的颜色变量，简化了维护

## 技术要点
1. **颜色统一性**: 使用统一的 `--muted-foreground` 变量确保视觉一致性
2. **变量清理**: 删除不再使用的自定义颜色变量，减少维护成本
3. **主题兼容**: 利用现有的主题系统，自动支持亮/暗模式切换
4. **代码简化**: 使用 Tailwind CSS 类替代内联样式，提高代码可读性

## 问题描述
用户要求对 `ArticleList.js` 组件进行以下样式修改：
1. Card组件添加 `border-2` 样式
2. CardHeader组件添加 `border-0` 样式  
3. CardTitle标题文字大小改为 `text-[20px]`
4. 将组件中的硬编码颜色提取到 `globals.css` 中作为CSS变量

## 解决方案
1. 修改 `ArticleList.js` 组件，应用用户要求的样式修改
2. 在 `globals.css` 中添加新的颜色变量 `--article-date-text`
3. 将硬编码的 `text-gray-500` 替换为CSS变量
4. 为组件添加函数级注释

## 代码变更

### globals.css 颜色变量添加
```css
/* 亮色模式 */
/* ArticleList 组件颜色变量 */
--article-date-text: 107, 114, 128; /* #6b7280 - 文章日期文本颜色 */

/* 暗色模式 */
/* ArticleList 组件颜色变量 */
--article-date-text: 156, 163, 175; /* #9ca3af - 暗色模式下的文章日期文本颜色 */
```

### ArticleList.js 组件修改
```javascript
/**
 * ArticleList 组件 - 显示文章列表
 * @param {Array} articles - 文章数据数组
 * @param {boolean} showMoreLink - 是否显示更多链接
 */
export default function ArticleList({ articles, showMoreLink = true }) {
  return (
    <section>
      {/* ... */}
      <div className="space-y-6">
        {articles.map(({ slug, title, description, lastModified }) => (
          <Card key={slug} className="border-2">
            <CardHeader className="border-0">
              {lastModified && (
                <div className="text-sm mb-2" style={{ color: 'rgb(var(--article-date-text))' }}>
                  {/* 日期显示 */}
                </div>
              )}
              <Link href={`/posts/${slug}`}>
                <CardTitle className="text-[20px]">{title}</CardTitle>
                →
              </Link>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  )
}
```

## 验证结果
- 开发服务器成功编译，无错误
- Card组件正确显示2px边框
- CardHeader移除了边框样式
- 标题文字大小调整为20px
- 日期文本颜色使用CSS变量，支持主题切换
- 预览页面正常显示，样式修改生效

## 技术要点
1. **样式覆盖**：通过className属性覆盖Shadcn/ui组件默认样式
2. **CSS变量使用**：使用 `rgb(var(--variable-name))` 格式应用颜色变量
3. **主题兼容性**：为亮色和暗色模式分别定义颜色变量
4. **组件文档**：添加JSDoc注释提高代码可维护性
5. **颜色变量命名**：使用语义化命名 `--article-date-text` 便于理解和维护
6. **样式继承**：保持与现有设计系统的一致性

# 案例15：面包屑导航hover颜色保持一致性优化

## 问题描述
用户要求修改文章详情页面包屑导航的hover效果，将颜色从 `group-hover:text-blue-600` 改为保持 `text-muted-foreground`，确保hover时颜色不变化，只有AnimatedText的跳跃动画效果。

## 解决方案
1. 修改面包屑导航中两个 `AnimatedText` 组件的className
2. 将 `text-gray-500 group-hover:text-blue-600` 改为 `text-muted-foreground group-hover:text-muted-foreground`
3. 保持 `transition-colors` 效果以确保动画流畅性
4. 确保hover时只有跳跃动画，颜色保持不变

## 代码变更

### page.tsx 面包屑导航修改
```tsx
// 修改前
className="text-gray-500 group-hover:text-blue-600 transition-colors"

// 修改后  
className="text-muted-foreground group-hover:text-muted-foreground transition-colors"
```

## 验证结果
- 面包屑导航hover时颜色保持为 `--muted-foreground`
- AnimatedText组件的跳跃动画正常工作
- 颜色过渡效果流畅，无突兀变化
- 整体视觉效果更加统一和谐

## 技术要点
1. **颜色一致性**: 使用 `text-muted-foreground` 确保hover前后颜色一致
2. **动画分离**: 颜色保持不变，只保留AnimatedText的跳跃动画效果
3. **过渡效果**: 保留 `transition-colors` 确保动画流畅性
4. **用户体验**: hover时只有文字跳跃动画，视觉效果更加精致
5. **主题兼容**: 使用语义化颜色变量，自动适配亮/暗主题

# 案例16：文章详情页Meta信息卡片样式优化

## 问题描述
用户要求修改文章详情页面的Meta information card样式：
1. 将背景颜色从 `bg-gray-100` 改为使用 `--card` CSS变量
2. 将圆角从 `rounded-lg` 改为 `rounded-[24px]` (24px圆角)

## 解决方案
1. 修改Meta information card的className属性
2. 将 `bg-gray-100 rounded-lg` 改为 `bg-card rounded-[24px]`
3. 保持其他样式属性不变（padding、margin、border等）

## 代码变更

### page.tsx Meta information card修改
```tsx
// 修改前
<div className="bg-gray-100 rounded-lg p-6 mb-12 border-2">

// 修改后
<div className="bg-card rounded-[24px] p-6 mb-12 border-2">
```

## 验证结果
- Meta information card背景颜色使用 `--card` 变量，支持主题切换
- 圆角半径调整为24px，视觉效果更加圆润
- 卡片样式与整体设计系统保持一致
- 明暗主题下都能正确显示

## 技术要点
1. **语义化颜色**: 使用 `bg-card` 替代硬编码的 `bg-gray-100`，确保主题一致性
2. **自定义圆角**: 使用 `rounded-[24px]` 实现精确的24px圆角值
3. **主题兼容**: `--card` 变量在明暗主题下有不同的值，自动适配
4. **设计一致性**: 与其他卡片组件保持统一的背景颜色规范
5. **Tailwind CSS**: 利用Tailwind的任意值语法 `[24px]` 实现自定义尺寸

# 案例20：站点详情页样式统一优化

## 问题描述
用户要求将站点详情页的面包屑、meta card和返回列表样式参考文章详情页进行统一，确保两个页面的视觉一致性。

## 解决方案
1. 导入 `AnimatedText` 组件用于面包屑导航和返回列表
2. 更新面包屑导航使用 `AnimatedText` 组件和统一的颜色系统
3. 修改Meta信息卡片样式，使用 `bg-card` 背景色、24px圆角和统一间距
4. 更新返回列表链接使用 `AnimatedText` 组件和统一的颜色系统

## 代码变更

### 组件导入修改
```tsx
// 新增导入
import AnimatedText from '@/components/ui/animated-text'
```

### 面包屑导航样式统一
```tsx
// 修改前：硬编码文本和蓝色hover效果
<nav className="flex items-center text-sm text-gray-500 mb-6">
  <Link href="/" className="hover:text-blue-600">
    {locale === 'zh' ? '首页' : 'Home'}
  </Link>
  <CaretRight className="mx-2" size={16} />
  <Link href="/site" className="hover:text-blue-600">
    {t('title')}
  </Link>
  <CaretRight className="mx-2" size={16} />
  <span className="text-gray-900">{siteData.name}</span>
</nav>

// 修改后：使用AnimatedText和统一颜色系统
<nav className="flex items-center text-sm text-gray-500 mb-6">
  <Link href="/" className="group">
    <AnimatedText 
      text={locale === 'zh' ? '首页' : 'Home'}
      className="text-muted-foreground group-hover:text-muted-foreground transition-colors"
      animateOnHover={true}
      autoPlay={false}
      stagger={30}
      duration={0.15}
      yOffset={-2}
    />
  </Link>
  <CaretRight className="mx-2" size={16} />
  <Link href="/site" className="group">
    <AnimatedText 
      text={t('title')}
      className="text-muted-foreground group-hover:text-muted-foreground transition-colors"
      animateOnHover={true}
      autoPlay={false}
      stagger={30}
      duration={0.15}
      yOffset={-2}
    />
  </Link>
  <CaretRight className="mx-2" size={16} />
  <span className="text-foreground">{siteData.name}</span>
</nav>
```

### Meta信息卡片样式统一
```tsx
// 修改前：灰色背景和小圆角
<div className="bg-gray-100 rounded-lg p-6 mb-8">

// 修改后：使用card背景色、24px圆角和统一间距
<div className="bg-card rounded-[24px] p-6 mb-12 border-2">
```

### 返回列表链接样式统一
```tsx
// 修改前：蓝色文本和简单hover效果
<Link href="/site" className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-2">
  <ArrowLeft size={20} />
  {locale === 'zh' ? '返回站点列表' : 'Back to site list'}
</Link>

// 修改后：使用AnimatedText和统一颜色系统
<Link href="/site" className="group inline-flex items-center gap-2">
  <ArrowLeft size={20} className="text-muted-foreground group-hover:text-muted-foreground transition-colors" />
  <AnimatedText 
    text={locale === 'zh' ? '返回站点列表' : 'Back to site list'}
    className="text-muted-foreground group-hover:text-muted-foreground transition-colors"
    animateOnHover={true}
    autoPlay={false}
    stagger={30}
    duration={0.15}
    yOffset={-2}
  />
</Link>
```

## 验证结果
- 站点详情页与文章详情页的视觉风格完全统一
- 面包屑导航使用AnimatedText组件，hover时有跳跃动画效果
- Meta信息卡片使用统一的背景色和圆角样式
- 返回列表链接使用统一的颜色系统和动画效果
- 页面预览正常，无编译错误

## 技术要点
1. **组件统一**: 使用 `AnimatedText` 组件确保交互动画的一致性
2. **颜色系统**: 统一使用 `text-muted-foreground` 和 `text-foreground` 语义化颜色
3. **动画效果**: hover时只有跳跃动画，颜色保持不变，提升用户体验
4. **卡片样式**: 使用 `bg-card` 背景色和 `rounded-[24px]` 圆角保持设计一致性
5. **间距统一**: 使用 `mb-12` 确保与文章详情页的间距一致
6. **主题兼容**: 所有颜色使用语义化变量，自动适配明暗主题

## 最佳实践
- 保持页面间的视觉一致性，提升用户体验
- 使用语义化颜色变量而非硬编码颜色值
- 统一使用AnimatedText组件增强交互体验
- 确保所有样式修改都支持主题切换
- 保持代码结构和命名的一致性

# 案例19：站点详情页Status种类扩充和图标优化

## 问题描述
用户要求扩充站点详情页面中Status的种类，新增以下状态：
- `confirmed_unmaintained`: 不再维护
- `temporarily_unavailable`: 暂时无法访问

并为每种状态配置合适的phosphor图标和颜色。

## 解决方案
1. 在 `getStatusInfo` 函数中新增两种状态的处理
2. 为新状态配置合适的颜色和phosphor图标
3. 导入所需的新图标组件
4. 确保与 `site-fields.json` 中的配置保持一致

## 代码变更

### phosphor-icons导入修改
```tsx
// 修改前
import { ArrowLeft, ArrowSquareOut, Globe, Clock, Users, CheckCircle, XCircle, CaretRight } from '@phosphor-icons/react/dist/ssr'

// 修改后
import { ArrowLeft, ArrowSquareOut, Globe, Clock, Users, CheckCircle, XCircle, CaretRight, Warning, WifiSlash } from '@phosphor-icons/react/dist/ssr'
```

### getStatusInfo函数扩充
```tsx
function getStatusInfo(status: string) {
  switch (status) {
    case 'running':
      return { color: 'bg-green-100 text-green-800', icon: CheckCircle };
    case 'suspected_unmaintained':
      return { color: 'bg-yellow-100 text-yellow-800', icon: Clock };
    case 'confirmed_unmaintained':
      return { color: 'bg-orange-100 text-orange-800', icon: Warning };
    case 'temporarily_unavailable':
      return { color: 'bg-blue-100 text-blue-800', icon: WifiSlash };
    case 'stopped':
      return { color: 'bg-red-100 text-red-800', icon: XCircle };
    default:
      return { color: 'bg-gray-100 text-gray-800', icon: Globe };
  }
}
```

## 验证结果
- 成功添加了两种新的状态类型
- 每种状态都配置了语义化的图标和颜色
- 与 `site-fields.json` 中的多语言配置保持一致
- 页面预览正常，无编译错误

## 技术要点
1. **状态扩展**: 支持更多细分的站点状态，提供更准确的状态描述
2. **图标语义**: 
   - `Warning` 图标用于确认不再维护的状态
   - `WifiSlash` 图标用于暂时无法访问的状态
3. **颜色分级**: 使用不同颜色表示状态严重程度
   - 绿色(running): 正常运行
   - 黄色(suspected_unmaintained): 疑似问题
   - 橙色(confirmed_unmaintained): 确认问题
   - 蓝色(temporarily_unavailable): 临时问题
   - 红色(stopped): 严重问题
4. **phosphor-icons**: 使用SSR版本确保服务端渲染兼容性
5. **数据一致性**: 与多语言配置文件保持同步，确保翻译正确显示

## 最佳实践
- 状态分类应该具有明确的语义区分
- 图标选择要符合用户的直觉理解
- 颜色使用要遵循通用的视觉语言（绿色=正常，红色=错误等）
- 确保代码中的状态值与配置文件中的键名完全一致