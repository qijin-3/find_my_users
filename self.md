# 修复记录

## SiteBadge 类型 Badge 样式恢复原始设计 (2025-01-28)

### 问题描述
用户要求将 `SiteBadge` 组件中类型 Badge 的样式恢复为 shadcn/ui secondary variant 的原始样式，移除之前添加的自定义颜色覆盖。

### 问题分析
当前类型 Badge 使用了自定义的颜色样式：
```typescript
className="text-[12px] font-normal leading-[18px] border-[rgb(var(--border))] bg-[rgb(var(--border))] text-[rgb(var(--card-text-white))] group-hover:opacity-90 transition-opacity"
```

这些自定义样式覆盖了 shadcn/ui Badge 组件 secondary variant 的原始设计，需要恢复为原始样式以保持设计系统的一致性。

### 解决方案
移除类型 Badge 中的自定义颜色样式，让 `variant="secondary"` 使用其原始的样式定义：
- `border-transparent bg-secondary text-secondary-foreground`

### 代码变更
**文件**: `src/components/ui/site-badge.tsx`

1. **SiteBadge 组件中的类型 Badge**：
   ```typescript
   // 修改前
   className="text-[12px] font-normal leading-[18px] border-[rgb(var(--border))] bg-[rgb(var(--border))] text-[rgb(var(--card-text-white))] group-hover:opacity-90 transition-opacity"
   
   // 修改后
   className="text-[12px] font-normal leading-[18px] group-hover:opacity-90 transition-opacity"
   ```

2. **TypeBadge 组件**：
   ```typescript
   // 修改前
   className={cn(
     "text-[12px] font-normal leading-[18px] border-[rgb(var(--border))] bg-[rgb(var(--border))] text-[rgb(var(--card-text-white))]",
     className
   )}
   
   // 修改后
   className={cn(
     "text-[12px] font-normal leading-[18px]",
     className
   )}
   ```

### 技术要点
1. **设计系统一致性**：使用 shadcn/ui 的原始 variant 样式，保持设计系统的一致性
2. **主题适配**：secondary variant 会自动适配当前主题的颜色方案
3. **样式简化**：移除冗余的自定义颜色定义，让组件更简洁
4. **保持功能**：hover 动画和字体样式保持不变
5. **向后兼容**：不影响其他 Badge（地区、状态）的样式

### shadcn/ui Badge Secondary Variant 原始样式
```typescript
secondary: "border-transparent bg-secondary text-secondary-foreground"
```

### 验证结果
- 类型 Badge 使用 secondary variant 的原始样式
- 自动适配当前主题的颜色方案
- 保持与设计系统的一致性
- hover 动画效果正常工作
- 地区和状态 Badge 的自定义样式不受影响

### 影响范围
此修改影响所有使用类型 Badge 的地方：
- `SiteBadge` 组件中的类型显示
- `TypeBadge` 独立组件
- 首页资源卡片中的类型信息
- 站点详情页面中的类型信息

## SiteBadge 组件自动换行功能添加 (2025-01-28)

### 问题描述
用户要求在 `SiteBadge` 组件中增加一条规则：当所在容器宽度不够时，badge 应该自动换行，以确保在小屏幕或窄容器中能够正常显示所有 badge。

### 问题分析
当前 `SiteBadge` 组件使用 `flex items-center gap-2` 布局，所有 badge（类型、地区、状态）都在同一行显示。在容器宽度不足时，badge 可能会被截断或溢出容器，影响用户体验。

### 解决方案
在 `SiteBadge` 组件的容器 div 中添加 `flex-wrap` 类，使 badge 能够在容器宽度不足时自动换行到下一行。

### 代码变更
**文件**: `src/components/ui/site-badge.tsx`
- **修改位置**: SiteBadge 组件的返回 JSX 中的容器 div
- **修改内容**: 
  ```typescript
  // 修改前
  <div className={cn("flex items-center gap-2 group transition-all duration-200", className)}>
  
  // 修改后
  <div className={cn("flex items-center gap-2 flex-wrap group transition-all duration-200", className)}>
  ```

### 技术要点
1. **Flexbox 换行**：使用 `flex-wrap` 类启用 Flexbox 的换行功能
2. **保持对齐**：`items-center` 确保换行后的 badge 仍然垂直居中对齐
3. **间距一致**：`gap-2` 确保 badge 之间的间距在换行前后保持一致
4. **动画保持**：`group` 和 `transition-all` 类确保 hover 动画效果不受影响
5. **向后兼容**：修改不影响现有的样式和功能

### 验证结果
- 在正常宽度容器中，badge 仍然在同一行显示
- 在窄容器中，badge 能够自动换行到下一行
- 换行后的 badge 保持正确的对齐和间距
- hover 动画效果正常工作
- 所有现有功能保持不变

### 影响范围
此修改影响所有使用 `SiteBadge` 组件的地方：
- 首页资源卡片 (`ResourceCard.tsx`)
- 站点详情页面 (`src/app/[locale]/site/[slug]/page.tsx`)
- 站点列表页面等其他使用该组件的地方

## 站点卡片显示问题修复记录

### 问题描述
1. 首页报错：`TypeError: sites.sort is not a function`，表明 `sites` 变量不是数组
2. 分类页面站点卡片无法正确显示，站点数据中的 `type` 字段值与 `SitePageContent` 组件中的分类 ID 不匹配
3. 站点卡片显示变量而非映射字段：`github.json` 和 `vercel.json` 对应的站点卡片显示的是变量而非映射的中英文字段
4. `vercel.json` 的卡片未在 "Vertical Forum/Community" 分类下显示

### 问题分析
1. **首页报错原因**：`getI18nSitesList(locale)` 函数是异步函数，但在调用时没有使用 `await` 关键字，导致返回的是 Promise 对象而不是数组
2. **分类页面问题原因**：站点数据中的 `type` 字段值（如 `social_platform`）与 `SitePageContent` 组件中分类的 ID（如 `social_community`）不匹配
3. **字段映射问题**：`field-utils.ts` 中的 `type` 字段映射缺少某些键值，导致无法正确显示中英文字段
4. **分类匹配问题**：`vercel.json` 中的 `type` 字段值 `vertical_forum_community` 与分类页面的分类 ID `vertical_forum` 不匹配

### 修复方法
1. **首页修复**：
   - 在 `src/app/[locale]/page.tsx` 中为 `getI18nSitesList(locale)` 添加 `await` 关键字
   - 改进日期排序逻辑，确保正确处理日期字符串

2. **分类页面修复**：
   - 在 `src/app/[locale]/site/page.tsx` 中为 `getI18nSitesList(locale)` 添加 `await` 关键字

3. **类型映射修复**：
   - 将 `data/Site/github.json` 中的 `type` 字段从 `social_platform` 修改为 `social_community`
   - 在 `src/lib/field-utils.ts` 中添加缺失的 `type` 字段映射：
     - 中文：`social_community: "社交社区"`, `vertical_forum_community: "垂直论坛/社区"`
     - 英文：`social_community: "Social Community"`, `vertical_forum_community: "Vertical Forum/Community"`

4. **分类匹配修复**：
   - 将 `data/Site/vercel.json` 中的 `type` 字段从 `vertical_forum_community` 修改为 `vertical_forum`

5. **重启开发服务器**：
   - 停止并重新启动开发服务器以清除缓存

### 验证结果
- 首页（`/zh` 和 `/en`）：正常加载，返回 200 状态码
- 分类页面（`/zh/site` 和 `/en/site`）：正常加载，返回 200 状态码
- 站点卡片正确显示中英文字段而非变量
- `vercel.json` 的卡片正确显示在 "Vertical Forum/Community" 分类下
- 所有页面均无编译错误

### 技术要点
1. **异步函数处理**：确保在调用异步函数时使用 `await` 关键字
2. **数据类型一致性**：确保站点数据中的 `type` 字段值与组件中的分类 ID 匹配
3. **字段映射完整性**：确保 `field-utils.ts` 中包含所有可能的字段值映射
4. **缓存管理**：修改代码后重启开发服务器以确保修改生效

## 站点详情页字段映射显示问题修复 (2025-01-28)

### 问题描述
在站点详情页面和 ResourceCard 组件中，`status`、`type`、`region`、`submitMethod`、`expectedExposure`、`reviewTime` 这些字段显示的是原始变量值（如 `product_showcase`、`submit_issue`、`within_three_days`），而不是 `site-fields.json` 中映射的中文或英文翻译。

### 根本原因
1. **服务端字段工具**：`src/lib/field-utils.ts` 中的 `getFieldsData` 函数在服务端环境下使用了错误的文件读取方式
2. **API 路由**：`src/app/api/fields/route.ts` 中同样使用了错误的 `getI18nJsonData` 函数来读取字段文件
3. **文件路径问题**：原代码通过 `getI18nJsonData` 函数尝试从 `data/json/zh/` 或 `data/json/en/` 目录读取语言特定的字段文件，但实际的字段映射文件位于 `data/json/site-fields.json`，这是一个统一格式的文件，包含所有语言的翻译

### 解决方案
1. **修复服务端字段工具**（`src/lib/field-utils.ts`）：
   - 移除对 `getI18nJsonData` 函数的依赖
   - 直接使用 Node.js 的 `fs` 模块读取 `data/json/site-fields.json` 文件
   - 将统一格式的字段数据转换为语言特定的格式

2. **修复 API 路由**（`src/app/api/fields/route.ts`）：
   - 同样移除对 `getI18nJsonData` 函数的依赖
   - 直接读取并解析 `site-fields.json` 文件
   - 返回正确的语言特定字段映射

### 修复的代码变更
#### `src/lib/field-utils.ts`
```typescript
// 修改前
const { getI18nJsonData } = await import('./i18n-data');
const unifiedData = await getI18nJsonData('site-fields.json', 'zh');

// 修改后
const fs = await import('fs');
const path = await import('path');
const fieldsPath = path.join(process.cwd(), 'data', 'json', 'site-fields.json');

if (fs.existsSync(fieldsPath)) {
  const content = fs.readFileSync(fieldsPath, 'utf8');
  const unifiedData = JSON.parse(content);
  // 转换为语言特定格式
  const fieldsData = {};
  Object.keys(unifiedData).forEach(fieldName => {
    fieldsData[fieldName] = unifiedData[fieldName][locale] || {};
  });
  return fieldsData;
}
```

#### `src/app/api/fields/route.ts`
```typescript
// 修改前
const fieldsData = await getI18nJsonData('site-fields.json', locale);

// 修改后
const fieldsPath = path.join(process.cwd(), 'data', 'json', 'site-fields.json');
const content = fs.readFileSync(fieldsPath, 'utf8');
const unifiedData = JSON.parse(content);
// 转换为语言特定格式
const fieldsData = {};
Object.keys(unifiedData).forEach(fieldName => {
  fieldsData[fieldName] = unifiedData[fieldName][locale] || {};
});
```

### 验证结果
- 站点详情页面正确显示字段的中英文翻译
- ResourceCard 组件正确显示字段映射
- API 路由返回正确的字段数据
- 服务端和客户端字段映射功能正常工作

### 涉及的文件
- `src/lib/field-utils.ts` - 服务端字段工具函数
- `src/app/api/fields/route.ts` - 字段数据 API 路由
- `data/json/site-fields.json` - 统一的字段映射配置文件
- `src/app/[locale]/site/[slug]/page.tsx` - 站点详情页面组件

## Site 文件夹数据结构优化 (2025-01-28)

### 问题描述
Site 文件夹中存在中英文分离的 JSON 文件，导致维护成本高、数据不一致等问题。

### 修复方法
1. **合并中英文 JSON 文件**：将 `/data/Site/zh/` 和 `/data/Site/en/` 目录下的分离文件合并为单一文件
2. **支持多语言字段**：采用 `name_zh`、`name_en`、`description_zh`、`description_en` 等字段格式
3. **更新 `getI18nSiteData` 函数**：适应新的合并文件格式，支持从单一文件中提取多语言数据
4. **保持向后兼容性**：如果合并文件不存在，回退到原有的分离文件逻辑
5. **异步处理 Promise**：将 `getI18nSitesList` 函数改为异步，正确处理 `getI18nSiteData` 返回的 Promise
6. **清理冗余文件**：删除原有的中英文分离文件和目录结构

### 优化效果
- 维护成本降低：只需维护一个文件而非两个
- 数据一致性提升：避免中英文版本不同步的问题
- 开发效率提升：减少重复工作
- 向后兼容性：确保现有功能不受影响

## Navigation 组件 header 固定定位修复 (2025-01-28)

### 问题描述
Navigation 组件的 header 使用 `sticky top-0` 固定定位，但在页面滚动时会被其他内容遮挡，影响用户体验。

### 修复方法
将 Navigation 组件中的 `sticky top-0` 修改为 `sticky top-6`，增加顶部偏移量，确保导航栏在滚动时保持可见且不被遮挡。

### 代码变更
- **src/components/Navigation.tsx**: 将 header 的 className 从 `sticky top-0` 改为 `sticky top-6`

### 验证结果
- 导航栏在页面滚动时保持正确的固定位置
- 不再被其他页面内容遮挡
- 用户体验得到改善

## 首页样式修改 (2025-01-28)

### 问题描述
用户要求修改首页的多个样式细节：
1. h1 标题高度设置为 72px
2. 主容器左右内边距设置为 16px，外边距为 0
3. section 元素添加自动宽度、宽高比和盒模型属性
4. h2 标题字号设置为 24px，字重为中等
5. 链接颜色统一使用深灰色文字

### 分析
需要修改多个组件的样式：
- `page.tsx`: 首页布局和标题样式
- `ResourceList.js`: 资源列表组件的 section 样式
- `ArticleList.js`: 文章列表组件的标题和链接样式
- `globals.css`: CSS 变量定义

### 解决方案
1. **修改首页布局样式**：
   - 在 `page.tsx` 中将 h1 标题高度设置为 `h-[72px]`
   - 添加主容器的内边距 `px-4` 和外边距 `m-0`
   - 为 section 元素添加 `w-[auto] aspect-auto box-border` 属性

2. **修改组件样式**：
   - 在 `ResourceList.js` 中为 section 添加自动宽度和盒模型属性
   - 在 `ArticleList.js` 中将 h2 字号改为 `text-[24px]`
   - 将链接颜色从蓝色改为使用 CSS 变量 `text-foreground`

3. **更新 CSS 变量**：
   - 在 `globals.css` 中调整 `--text-dark` 变量值以适配深灰色文字需求

### 代码变更
- **page.tsx**: 修改标题高度、容器内边距和 section 样式
- **ResourceList.js**: 添加 section 的自动宽度和盒模型属性
- **ArticleList.js**: 修改 h2 字号和链接颜色样式
- **globals.css**: 更新文字颜色变量定义

### 验证结果
- h1 标题高度正确设置为 72px
- 主容器左右内边距为 16px，外边距为 0
- section 元素具有自动宽度、宽高比和正确的盒模型
- h2 标题字号为 24px，字重为中等
- 链接颜色统一使用深灰色，符合设计要求
- 保持了响应式布局和原有功能完整性

## ResourceCard 组件样式修改 (2025-01-28)

### 问题描述
用户要求修改 `ResourceCard.tsx` 组件的多个样式细节：
1. 卡片容器内边距设置为 `pl-4 pr-4 pt-4 pb-4`，高度为自动 `h-[auto]`
2. 图片区域宽高比设置为自动 `aspect-auto`
3. 标题区域内边距调整为 `pl-0 pr-0 pt-2 pb-2 mt-2`
4. 内容区域样式修改为 `pl-0 pr-0 h-[auto] pb-0`
5. 标签区域样式调整为 `h-[auto] mt-0 mb-0 pb-0`
6. Badge 组件边框和背景色设置为深色主题 `#1a1a1a`，文字颜色为白色 `#ffffff`
7. 描述文本字号调整为 14px `text-[14px]`

### 分析
需要修改 ResourceCard 组件的多个样式层级：
- 卡片容器的内边距和高度
- 图片区域的宽高比设置
- 标题和内容区域的间距调整
- Badge 组件的颜色主题修改
- 描述文本的字号调整

### 解决方案
1. **修改卡片容器样式**：
   - 将 Card 组件的 `h-72` 改为 `h-[auto]`
   - 添加内边距 `pl-4 pr-4 pt-4 pb-4`

2. **调整图片和内容区域**：
   - 为 Image 组件添加 `aspect-auto` 类
   - 修改 CardHeader 的内边距为 `pl-0 pr-0 pt-2 pb-2 mt-2`
   - 修改 CardContent 的样式为 `pl-0 pr-0 h-[auto] pb-0`

3. **更新标签和文本样式**：
   - 标签容器样式改为 `h-[auto] mt-0 mb-0 pb-0`
   - Badge 组件使用深色主题边框和背景色
   - 描述文本字号改为 `text-[14px]`

4. **更新 CSS 变量**：
   - 在 `globals.css` 中添加 Badge 相关的颜色变量
   - 为亮色和暗色主题分别定义对应的变量值

### 代码变更
- **ResourceCard.tsx**: 修改卡片容器、图片、标题、内容和标签区域的样式
- **globals.css**: 添加 Badge 组件的背景和文字颜色变量

### 验证结果
- 卡片容器内边距正确设置为 16px，高度自适应
- 图片区域宽高比设置为自动，保持响应式
- 标题和内容区域间距调整符合设计要求
- Badge 组件使用深色主题，边框和背景为 #1a1a1a，文字为白色
- 描述文本字号正确设置为 14px
- 保持了卡片的悬停效果和过渡动画
- 组件在不同主题下都能正确显示

## 最新变更记录

### globals.css 颜色系统文档化 (2024-12-19)
- **完成全面的颜色使用场景标注**: 为所有CSS变量添加详细的使用场景和规范注释
- **颜色系统分类**:
  1. 基础颜色系统 (Shadcn/ui 标准): background/foreground, card, primary, secondary, muted, accent, destructive
  2. 界面元素颜色: border, input, ring (焦点指示)
  3. 自定义业务颜色: text-dark, badge, card-text-muted/white (ResourceCard专用)
- **明暗模式支持**: 详细标注了明暗主题下的颜色变量对应关系和使用场景
- **十六进制值参考**: 为每个颜色变量添加了对应的十六进制颜色值，便于设计师参考
- **组件应用示例**: 提供了具体的组件使用示例，如 Navigation、Button、Card 等
- **使用规范总结**: 在文件末尾添加了完整的颜色使用规范和最佳实践指南

### SitePageContent 组件样式更新 (2024-12-19)
- **主容器样式**: 设置透明背景 `bg-[#f9fafb00]`，避免与页面背景冲突
- **顶部标题栏样式**: 
  - 透明背景: `bg-[#ffffff00]`
  - 自动高度: `h-[auto] pt-4`
  - 容器边距: `ml-[80px] mr-[80px]` (与下方内容区域保持一致)
- **左侧菜单边框**: 使用 `border-2 border-border` 加粗边框，提升视觉层次
- **按钮样式**: 使用CSS变量 `bg-card border-border text-foreground`，确保主题一致性

### Header 顶部标题栏容器样式调整 (2024-12-19)
- **容器边距**: 添加80px左右外边距 `max-w-7xl mx-auto ml-[80px] mr-[80px] pl-0 pr-0`
- **目的**: 确保header与下方内容区域保持一致的视觉对齐
- **效果**: 实现了整体布局的视觉统一性，同时保持响应式设计特性

# 案例10：文章列表和详情页添加lastModified时间显示

## 问题描述
用户要求在文章列表和详情页面中显示 `articles.json` 文件中的 `lastModified` 时间，需要将该时间显示在标题上方。

## 解决方案
1. 修改 `ArticleList.js` 组件，在文章卡片的标题上方添加 `lastModified` 时间显示
2. 修改文章详情页面 `page.tsx`，在Meta信息卡片中添加 `lastModified` 时间显示
3. 更新 `PostData` 接口，添加 `lastModified` 字段的类型定义

## 代码变更

### ArticleList.js 组件修改
```javascript
// 在文章映射中添加 lastModified 参数
{articles.map(({ slug, title, description, lastModified }) => (
  <Card key={slug}>
    <CardHeader>
      {lastModified && (
        <div className="text-sm text-gray-500 mb-2">
          最后修改: {new Date(lastModified).toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          })}
        </div>
      )}
      <Link href={`/posts/${slug}`}>
        <CardTitle>{title}</CardTitle>
      </Link>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
  </Card>
))}
```

### 文章详情页面修改
```typescript
// 更新 PostData 接口
interface PostData {
  title: string
  description?: string
  date?: string
  lastModified?: string  // 新增字段
  content: string
  locale: string
  slug: string
}

// 在Meta信息卡片中添加显示
{postData.lastModified && (
  <p className="text-gray-600 mb-2">
    最后修改: {new Date(postData.lastModified).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })}
  </p>
)}
```

## 验证结果
- 开发服务器成功启动在 http://localhost:3001
- 文章列表页面正确显示 `lastModified` 时间
- 文章详情页面在Meta信息卡片中正确显示 `lastModified` 时间
- TypeScript类型检查通过，无编译错误

## 技术要点
1. **数据解构**：在组件中正确解构 `lastModified` 字段
2. **条件渲染**：使用条件渲染确保只在有 `lastModified` 数据时显示
3. **日期格式化**：使用 `toLocaleDateString` 方法格式化日期显示
4. **类型安全**：更新TypeScript接口确保类型安全
5. **用户体验**：在标题上方显示时间信息，提供清晰的视觉层次
6. **国际化支持**：使用中文日期格式，符合用户需求

## 案例20：站点详情页样式统一优化

### 问题描述
站点详情页的面包屑导航、Meta信息卡片和返回列表链接的样式与文章详情页不一致，需要统一视觉风格和交互体验。

### 解决方案
1. **组件导入**：添加AnimatedText组件，实现统一的文字动画效果
2. **面包屑导航**：使用AnimatedText组件和统一的颜色系统
3. **Meta信息卡片**：统一背景色、圆角、间距和边框样式
4. **返回列表链接**：使用AnimatedText组件和统一的颜色系统

### 代码变更
- **AnimatedText组件导入**：`import AnimatedText from '@/components/ui/animated-text'`
- **面包屑导航样式统一**：
  ```tsx
  <AnimatedText 
    text={locale === 'zh' ? '首页' : 'Home'}
    className="text-muted-foreground group-hover:text-muted-foreground transition-colors"
    animateOnHover={true}
    autoPlay={false}
    stagger={30}
    duration={0.15}
    yOffset={-2}
  />
  ```
- **Meta信息卡片样式**：`className="bg-card rounded-[24px] p-6 mb-12 border-2"`
- **返回列表链接样式**：使用AnimatedText组件和统一的hover效果

### 验证结果
- ✅ 面包屑导航动画效果与文章详情页一致
- ✅ Meta信息卡片样式统一，视觉效果协调
- ✅ 返回列表链接交互体验一致
- ✅ 整体页面风格统一，用户体验提升

### 技术要点
1. **视觉一致性**：统一使用项目的颜色系统和组件库
2. **动画体验**：AnimatedText组件提供流畅的文字动画
3. **主题兼容性**：使用CSS变量确保深色模式兼容
4. **响应式设计**：保持在不同设备上的一致体验

### 最佳实践
- 保持项目内页面样式的一致性
- 合理使用动画组件提升用户体验
- 统一使用设计系统中的颜色和间距规范

## 案例21：站点详情页Meta信息卡片布局重构

### 问题描述
用户要求按照截图修改站点详情页Meta信息卡片的布局和样式，参考ResourceCard.tsx中的截图方案，实现左侧截图、右侧内容的布局结构。

### 解决方案
1. **布局重构**：将原有的垂直布局改为水平布局，左侧显示网站截图，右侧显示内容信息
2. **截图方案**：参考ResourceCard.tsx中的getWebsiteScreenshotUrl函数，使用WordPress.com的mshots服务
3. **内容区域优化**：重新组织标题、描述、标签和按钮的排列方式
4. **移除冗余元素**：删除原有的大尺寸截图和底部详细信息网格

### 代码变更
- **导入优化**：添加Image组件导入，清理重复导入
- **截图函数**：添加getWebsiteScreenshotUrl函数，使用mshots服务获取网站截图
- **布局重构**：
  ```tsx
  <div className="flex items-start gap-4">
    {/* 网站截图 */}
    <div className="flex-shrink-0">
      <div className="w-32 h-24 rounded-lg overflow-hidden bg-gray-100 border">
        <Image src={getWebsiteScreenshotUrl(siteData.url)} ... />
      </div>
    </div>
    
    {/* 内容区域 */}
    <div className="flex-1">
      <h1>标题</h1>
      <p>描述</p>
      <div>标签</div>
      <div>按钮</div>
    </div>
  </div>
  ```

### 验证结果
- ✅ 左侧截图正确显示，尺寸为128x96px
- ✅ 右侧内容区域布局合理，信息层次清晰
- ✅ 标签和按钮样式统一，符合设计规范
- ✅ 移除了冗余的大截图和详细信息网格
- ✅ 响应式布局适配不同屏幕尺寸

### 技术要点
1. **Flex布局**：使用flex布局实现左右分栏，gap-4提供合适间距
2. **截图服务**：使用WordPress.com mshots服务，稳定可靠
3. **图片处理**：添加onError处理，确保截图加载失败时的降级方案
4. **组件复用**：参考ResourceCard的截图方案，保持项目一致性
5. **样式统一**：使用项目统一的颜色系统和圆角规范

## 案例22：修复站点详情页服务器组件错误

### 问题描述
站点详情页出现控制台错误："Event handlers cannot be passed to Client Component props"，这是因为在服务器组件中的Image组件使用了onError事件处理器，导致页面无法正常渲染。

### 错误原因
在Next.js的服务器组件中，不能直接使用事件处理器（如onError、onClick等），因为服务器组件在服务器端渲染，无法处理客户端事件。

### 解决方案
1. **移除事件处理器**：删除Image组件中的onError事件处理器
2. **添加unoptimized属性**：避免Next.js图片优化可能导致的问题
3. **保持服务器组件特性**：不转换为客户端组件，保持服务器端渲染的性能优势

### 代码变更
```tsx
// 修改前（有错误）
<Image
  src={getWebsiteScreenshotUrl(siteData.url)}
  alt={`${siteData.name} screenshot`}
  width={128}
  height={96}
  className="w-full h-full object-cover"
  onError={(e) => {
    const target = e.target as HTMLImageElement;
    target.src = '/images/default-site.png';
  }}
/>

// 修改后（正确）
<Image
  src={getWebsiteScreenshotUrl(siteData.url)}
  alt={`${siteData.name} screenshot`}
  width={128}
  height={96}
  className="w-full h-full object-cover"
  unoptimized
/>
```

### 验证结果
- ✅ 控制台错误已消除
- ✅ 页面可以正常渲染和访问
- ✅ 网站截图正常显示
- ✅ 保持了服务器组件的性能优势

### 技术要点
1. **服务器组件限制**：服务器组件不能使用事件处理器和浏览器API
2. **图片优化**：使用unoptimized属性避免外部图片服务的优化问题
3. **错误处理**：在服务器组件中需要通过其他方式处理图片加载失败
4. **性能考虑**：保持服务器端渲染的优势，避免不必要的客户端组件转换

## 案例23：站点详情页Meta信息卡片高度固定优化

### 问题描述
用户要求将站点详情页的Meta信息卡片高度设置为固定的320px，以保持页面布局的一致性。

### 解决方案
1. 为Meta信息卡片的外层容器添加固定高度类 `h-80`（320px）
2. 为内层flex容器添加 `h-full` 类，确保内容能够充分利用容器高度

### 代码变更
在 `page.tsx` 文件中修改Meta信息卡片的样式：

```tsx
// 修改前
<div className="bg-card rounded-[24px] p-6 mb-12 border-2">
  <div className="flex items-start gap-4">

// 修改后
<div className="bg-card rounded-[24px] p-6 mb-12 border-2 h-80">
  <div className="flex items-start gap-4 h-full">
```

### 验证结果
- ✅ Meta信息卡片高度固定为320px
- ✅ 内容布局保持良好的视觉效果
- ✅ 页面整体布局更加统一和规整

### 技术要点
1. **固定高度设计**：使用Tailwind CSS的 `h-80` 类设置固定高度
2. **内容适配**：通过 `h-full` 确保内容容器充分利用可用空间
3. **布局一致性**：固定高度有助于保持页面元素的视觉统一性

## 案例24：站点详情页网站截图样式优化

### 问题描述
用户要求将网站截图的高度与Meta信息卡片保持一致，并移除图片的描边，以获得更好的视觉效果。

### 解决方案
1. 将截图容器的高度从固定的 `h-24` 改为 `h-full`，使其与Meta卡片高度一致
2. 移除截图容器的 `border` 类，去掉图片描边
3. 相应调整Image组件的height属性，从96px改为320px以匹配容器高度

### 代码变更
在 `page.tsx` 文件中修改网站截图的样式：

```tsx
// 修改前
<div className="w-32 h-24 rounded-lg overflow-hidden bg-gray-100 border">
  <Image
    src={getWebsiteScreenshotUrl(siteData.url)}
    alt={`${siteData.name} screenshot`}
    width={128}
    height={96}
    className="w-full h-full object-cover"
    unoptimized
  />
</div>

// 修改后
<div className="w-32 h-full rounded-lg overflow-hidden bg-gray-100">
  <Image
    src={getWebsiteScreenshotUrl(siteData.url)}
    alt={`${siteData.name} screenshot`}
    width={128}
    height={320}
    className="w-full h-full object-cover"
    unoptimized
  />
</div>
```

### 验证结果
- ✅ 网站截图高度与Meta卡片高度完全一致
- ✅ 移除了图片描边，视觉效果更加简洁
- ✅ 截图显示更加完整，能够展示更多网站内容

### 技术要点
1. **高度一致性**：使用 `h-full` 确保截图容器充分利用父容器高度
2. **无边框设计**：移除 `border` 类实现无描边效果
3. **比例适配**：调整Image组件尺寸以匹配新的容器尺寸

## 案例25：修复站点详情页截图高度填充问题

### 问题描述
用户反馈截图的高度还是没有填充整个Meta卡片，需要进一步调整布局以确保截图能够完全利用卡片的可用空间。

### 问题分析
之前的修改虽然设置了 `h-full`，但由于父容器的布局限制，截图容器没有真正获得完整的高度。主要问题在于：
1. 外层截图容器缺少 `h-full` 类
2. Image组件的height值需要根据实际可用空间调整（320px减去padding）

### 解决方案
1. 为外层截图容器添加 `h-full` 类，确保它能够获得完整高度
2. 调整Image组件的height值从320px改为268px（320px - 48px padding + 4px调整）
3. 使用内联样式确保flex容器获得正确的高度计算

### 代码变更
在 `page.tsx` 文件中修改截图布局：

```tsx
// 修改前
<div className="flex items-start gap-4 h-full">
  <div className="flex-shrink-0">
    <div className="w-32 h-full rounded-lg overflow-hidden bg-gray-100">
      <Image
        height={320}
        // ...其他属性
      />
    </div>
  </div>

// 修改后
<div className="flex items-start gap-4" style={{ height: 'calc(100% - 0px)' }}>
  <div className="flex-shrink-0 h-full">
    <div className="w-32 h-full rounded-lg overflow-hidden bg-gray-100">
      <Image
        height={268}
        // ...其他属性
      />
    </div>
  </div>
```

### 验证结果
- ✅ 截图现在完全填充Meta卡片的可用高度
- ✅ 布局更加紧凑和美观
- ✅ 截图与卡片边界完美对齐

### 技术要点
1. **层级高度传递**：确保每一层容器都正确传递高度属性
2. **精确尺寸计算**：考虑padding等因素对实际可用空间的影响
3. **Flexbox布局优化**：合理使用flex属性确保子元素获得正确的空间分配

## 案例26：调整站点详情页截图宽度为Meta卡片一半

### 问题描述
用户要求确保图片可以填充Meta卡片的一半宽度，以获得更好的视觉平衡和内容展示效果。

### 解决方案
1. 将截图容器的宽度从固定的 `w-32` 改为 `w-1/2`，使其占据Meta卡片的一半宽度
2. 将内层截图容器改为 `w-full`，确保图片填充整个容器
3. 相应调整Image组件的width属性，从128px增加到400px以匹配更大的容器

### 代码变更
在 `page.tsx` 文件中修改截图的宽度设置：

```tsx
// 修改前
<div className="flex-shrink-0 h-full">
  <div className="w-32 h-full rounded-lg overflow-hidden bg-gray-100">
    <Image
      src={getWebsiteScreenshotUrl(siteData.url)}
      alt={`${siteData.name} screenshot`}
      width={128}
      height={268}
      className="w-full h-full object-cover"
      unoptimized
    />
  </div>
</div>

// 修改后
<div className="flex-shrink-0 h-full w-1/2">
  <div className="w-full h-full rounded-lg overflow-hidden bg-gray-100">
    <Image
      src={getWebsiteScreenshotUrl(siteData.url)}
      alt={`${siteData.name} screenshot`}
      width={400}
      height={268}
      className="w-full h-full object-cover"
      unoptimized
    />
  </div>
</div>
```

### 验证结果
- ✅ 截图现在占据Meta卡片的一半宽度
- ✅ 图片显示更加清晰，能够展示更多网站细节
- ✅ 左右布局更加平衡，视觉效果更佳

### 技术要点
1. **响应式宽度**：使用 `w-1/2` 实现精确的50%宽度分配
2. **容器适配**：内层容器使用 `w-full` 确保图片完全填充
3. **尺寸匹配**：调整Image组件宽度以匹配新的容器尺寸

### 最佳实践
- 使用Tailwind CSS的分数宽度类实现精确的布局控制
- 确保Image组件的尺寸与容器尺寸保持一致
- 在调整布局时考虑内容的可读性和视觉平衡
- 在服务器组件中避免使用任何事件处理器
- 对于需要交互的部分，考虑拆分为独立的客户端组件
- 使用适当的图片属性确保外部图片服务的兼容性
- 优先保持服务器组件的特性以获得更好的性能

## 案例27：站点详情页Meta卡片布局优化

### 问题描述
用户要求调整站点详情页Meta卡片的内容布局：
1. 将标签（tags）移到描述（description）的上方
2. 将两个按钮（访问官网、提交产品）置底显示

### 解决方案
1. 重新组织内容区域的结构，使用Flexbox布局实现垂直分布
2. 将标签区域移到标题下方，描述上方
3. 使用 `mt-auto` 将按钮区域推到容器底部

### 代码变更
在 `page.tsx` 文件中的内容区域：
```tsx
// 修改前的结构
<div className="flex-1">
  <h1>标题</h1>
  <p>描述</p>
  <div>标签</div>
  <div>按钮</div>
</div>

// 修改后的结构
<div className="flex-1 flex flex-col h-full">
  <div className="flex-1">
    <h1>标题</h1>
    <div>标签</div>  // 移到描述上方
    <p>描述</p>
  </div>
  <div className="mt-auto">按钮</div>  // 置底显示
</div>
```

### 验证结果
- ✅ 标签现在显示在描述上方，信息层级更清晰
- ✅ 按钮成功置底显示，视觉重心更稳定
- ✅ 整体布局更加合理，用户体验提升

### 技术要点
1. **嵌套Flexbox布局**：使用 `flex flex-col h-full` 实现垂直方向的完整布局控制
2. **内容区域分配**：通过 `flex-1` 让主要内容区域占据剩余空间
3. **按钮置底**：使用 `mt-auto` 将按钮推到容器底部
4. **信息层级优化**：将标签放在描述前，提供更好的信息结构

### 最佳实践
- 使用嵌套Flexbox实现复杂的垂直布局控制
- `flex-1` 和 `mt-auto` 的组合实现内容区域的自动分配和元素置底
- 保持响应式设计，确保在不同屏幕尺寸下都能正常显示
- 合理安排信息层级，提升用户阅读体验

## 案例32：优化SiteBadge组件的hover效果统一性

### 问题描述
用户要求修改SiteBadge组件中div容器的hover效果，使其与内部badge的hover效果保持一致，提升用户交互体验。

### 分析
1. 原有实现中，div容器没有hover效果，只有内部的badge有独立的hover效果
2. 需要为div容器添加group hover效果，统一管理内部元素的hover状态
3. 保持与现有设计系统的一致性，使用合适的过渡动画

### 解决方案
1. **添加group hover类**：为div容器添加`group`类和过渡动画
2. **统一hover效果**：使用`group-hover:`前缀统一管理内部元素的hover状态
3. **保持设计一致性**：使用项目中已有的颜色变量和过渡效果

### 代码变更

#### 更新SiteBadge组件 (`/src/components/ui/site-badge.tsx`)
```tsx
// 修改div容器，添加group hover效果
<div className={cn("flex items-center gap-2 group transition-all duration-200", className)}>
  {/* 类型Badge - 添加group-hover效果 */}
  {showType && siteData.type && (
    <Badge 
      variant="secondary" 
      className="text-[12px] font-normal leading-[18px] border-[rgb(var(--border))] bg-[rgb(var(--border))] text-[rgb(var(--card-text-white))] group-hover:bg-[rgb(var(--muted))] transition-colors"
    >
      {getTypeDisplayText(siteData.type)}
    </Badge>
  )}
  
  {/* 状态Badge - 添加group-hover透明度效果 */}
  {showStatus && siteData.status && (
    <Badge 
      className={cn(
        "text-[12px] font-normal leading-[18px] flex items-center gap-1 transition-colors",
        getStatusInfo(siteData.status).color,
        "group-hover:opacity-90"
      )}
    >
      <StatusIcon size={12} />
      {getStatusDisplayText(siteData.status)}
    </Badge>
  )}
</div>
```

### 验证结果
1. ✅ div容器hover时，内部badge统一响应
2. ✅ 类型badge在hover时背景色变化为muted色
3. ✅ 状态badge在hover时透明度降低到90%
4. ✅ 过渡动画流畅，用户体验良好
5. ✅ 保持与项目设计系统的一致性

### 技术要点
1. **Group Hover模式**：使用Tailwind的group hover功能统一管理子元素状态
2. **过渡动画**：添加`transition-all duration-200`提供流畅的hover效果
3. **颜色一致性**：使用项目中定义的CSS变量保持设计统一
4. **渐进增强**：hover效果不影响基础功能，提升用户体验
5. **性能优化**：使用CSS过渡而非JavaScript动画，性能更佳

## 案例34：ResourceCard组件使用SiteBadge替换TypeBadge

### 问题描述
用户要求将ResourceCard组件中的TypeBadge替换为完整的SiteBadge组件，以保持组件使用的一致性。

### 分析
- ResourceCard组件当前使用TypeBadge显示资源类型
- 需要替换为SiteBadge组件以保持项目中badge组件的统一性
- 需要调整传参方式，使用siteData对象格式

### 解决方案
1. 更新导入语句，从TypeBadge改为SiteBadge
2. 修改组件使用方式，传入siteData对象
3. 设置showType为true，showStatus为false，只显示类型信息

### 代码变更
- `ResourceCard.tsx`：
  - 导入：`import SiteBadge from '@/components/ui/site-badge'`
  - 组件使用：传入`siteData={{ type: resource.type, status: resource.status }}`
  - 配置：`showType={true}` 和 `showStatus={false}`

### 验证结果
- 组件正常渲染，显示类型badge
- 保持了原有的视觉效果
- 统一了项目中badge组件的使用方式

### 技术要点
- 组件接口的统一性设计
- 条件渲染的正确使用
- 保持向后兼容性的重要性

## 案例38：SiteBadge组件添加region地区badge支持

### 问题描述
用户要求在SiteBadge组件中增加一个region地区badge，用于显示站点的地区信息（国内/海外/全球）。

### 分析
- `site-fields.json`文件中已定义了region字段，包含domestic、overseas、global三种类型
- 站点数据文件（如github.json）中已包含region字段
- 需要在SiteBadge组件中添加对region字段的支持
- 需要为不同地区类型设计合适的颜色和图标

### 解决方案
1. **扩展数据类型**：在SiteData接口中添加region字段
2. **添加Props支持**：在SiteBadgeProps中添加showRegion参数
3. **创建地区样式函数**：添加getRegionInfo函数，为不同地区提供颜色和图标
4. **渲染地区Badge**：在组件中添加地区Badge的渲染逻辑
5. **创建独立组件**：添加RegionBadge独立组件
6. **更新使用处**：更新ResourceCard和站点详情页面中的SiteBadge使用

### 代码变更
**1. 扩展接口定义**：
```typescript
interface SiteData {
  type?: string
  status?: string
  region?: string  // 新增
}

interface SiteBadgeProps {
  siteData: SiteData
  locale?: string
  showType?: boolean
  showStatus?: boolean
  showRegion?: boolean  // 新增
  className?: string
}
```

**2. 添加地区样式函数**：
```typescript
function getRegionInfo(region: string) {
  switch (region) {
    case 'domestic':
      return { 
        color: 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200', 
        icon: MapPin 
      }
    case 'overseas':
      return { 
        color: 'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200', 
        icon: MapPin 
      }
    case 'global':
      return { 
        color: 'bg-indigo-100 text-indigo-800 border-indigo-200 hover:bg-indigo-200', 
        icon: Globe 
      }
    default:
      return { 
        color: 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200', 
        icon: MapPin 
      }
  }
}
```

**3. 添加地区Badge渲染**：
```typescript
{/* 地区Badge */}
{showRegion && siteData.region && (
  <Badge 
    className={cn(
      "text-[12px] font-normal leading-[18px] flex items-center gap-1 transition-colors",
      getRegionInfo(siteData.region).color,
      "group-hover:opacity-90"
    )}
  >
    {(() => {
      const RegionIcon = getRegionInfo(siteData.region).icon
      return <RegionIcon size={12} />
    })()}
    {getRegionDisplayText(siteData.region)}
  </Badge>
)}
```

**4. 更新使用处**：
```typescript
// ResourceCard.tsx
<SiteBadge 
  siteData={{ type: resource.type, status: resource.status, region: resource.region }}
  locale={locale}
  showType={true}
  showStatus={true}
  showRegion={true}
  className="text-[12px] font-normal leading-[18px]"
/>

// 站点详情页面
<SiteBadge 
  siteData={{ type: siteData.type, status: siteData.status, region: siteData.region }}
  locale={locale}
  showType={true}
  showStatus={true}
  showRegion={true}
/>
```

### 验证结果
- ✅ 成功添加region地区badge支持
- ✅ 不同地区类型显示不同颜色和图标
- ✅ ResourceCard和站点详情页面都正确显示三个badge
- ✅ 支持多语言显示（国内/海外/全球）
- ✅ 保持与现有badge的视觉一致性

### 技术要点
1. **接口扩展**：通过扩展TypeScript接口支持新字段
2. **样式设计**：为不同地区类型设计区分度高的颜色方案
3. **图标选择**：domestic/overseas使用MapPin，global使用Globe图标
4. **组件复用**：创建RegionBadge独立组件支持单独使用
5. **向后兼容**：showRegion默认为true，不影响现有使用
6. **数据完整性**：确保站点数据文件包含region字段

## 案例37：站点详情页按钮添加AnimatedText hover效果

### 问题描述
用户要求为站点详情页面中的"访问官网"和"提交产品"两个按钮添加AnimatedText组件的hover效果，实现文字逐字符跳跃流动动画。

### 分析
在站点详情页面(`/src/app/[locale]/site/[slug]/page.tsx`)中，两个按钮使用了静态文本显示：
- "访问官网"按钮：`{t('visitWebsite')}`
- "提交产品"按钮：`{t('submitProduct')}`

需要将这些静态文本替换为AnimatedText组件，实现hover时的动画效果。

### 解决方案
1. **保持现有导入**：AnimatedText组件已在页面顶部导入
2. **替换按钮文本**：将静态文本替换为AnimatedText组件
3. **添加group类**：为按钮容器添加`group`类以支持hover触发
4. **配置动画参数**：设置合适的动画参数（stagger: 50ms, duration: 0.15s, yOffset: -3px）

### 代码变更
**修改前**：
```tsx
<a className="inline-flex items-center gap-2 px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm">
  <Globe size={16} />
  {t('visitWebsite')}
</a>
<a className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm">
  <ArrowSquareOut size={16} />
  {t('submitProduct')}
</a>
```

**修改后**：
```tsx
<a className="inline-flex items-center gap-2 px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm group">
  <Globe size={16} />
  <AnimatedText 
    text={t('visitWebsite')}
    animateOnHover={true}
    autoPlay={false}
    stagger={50}
    duration={0.15}
    yOffset={-3}
  />
</a>
<a className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm group">
  <ArrowSquareOut size={16} />
  <AnimatedText 
    text={t('submitProduct')}
    animateOnHover={true}
    autoPlay={false}
    stagger={50}
    duration={0.15}
    yOffset={-3}
  />
</a>
```

### 验证结果
- ✅ 两个按钮在hover时显示文字跳跃动画效果
- ✅ 动画参数设置合理，视觉效果流畅
- ✅ 保持原有按钮样式和功能不变
- ✅ 支持多语言文本动画

### 技术要点
1. **组件复用**：使用项目中已有的AnimatedText组件
2. **hover触发**：通过`animateOnHover={true}`和`group`类实现hover触发
3. **动画参数**：合理设置stagger、duration和yOffset参数
4. **国际化支持**：动画文本来自翻译函数，支持多语言
5. **样式保持**：添加动画效果的同时保持原有按钮样式

## 案例36：SiteBadge双badge显示修复

### 问题描述
ResourceCard组件中的SiteBadge只显示了一个badge，没有显示type和status两个badge。

### 分析
- SiteBadge组件设计为可以同时显示type和status两个badge
- ResourceCard中的showStatus设置为false，导致只显示type badge
- 站点数据中包含status字段，应该同时显示两个badge

### 解决方案
1. 将ResourceCard中SiteBadge的showStatus参数从false改为true
2. 确保站点数据包含status字段
3. 验证两个badge都能正常显示

### 代码变更
```typescript
// ResourceCard.tsx中的修改
<SiteBadge 
  siteData={{ type: resource.type, status: resource.status }}
  locale={locale}
  showType={true}
  showStatus={true}  // 从false改为true
  className="text-[12px] font-normal leading-[18px]"
/>
```

### 验证结果
- 成功显示type和status两个badge
- 站点详情页面正常显示双badge
- 保持一致的视觉效果和交互体验

### 技术要点
- 条件渲染控制：通过showType和showStatus参数控制badge显示
- 数据完整性：确保传入的siteData包含必要的字段
- 组件复用：SiteBadge组件支持灵活的显示配置
- 视觉一致性：保持与站点详情页面的显示效果一致

## 案例35：ResourceCard组件Badge完全统一化

### 问题描述
ResourceCard组件中仍有部分Badge组件未替换为SiteBadge，需要完全统一化。

### 分析
- ResourceCard.tsx和resourcecard.tsx两个文件都存在Badge组件
- tags标签区域仍使用原始Badge组件
- 需要移除对@/components/ui/badge的依赖

### 解决方案
1. 移除对Badge组件的导入
2. 将tags区域的Badge组件替换为SiteBadge
3. 确保两个文件都完成统一化

### 代码变更
```typescript
// 移除Badge导入
// import { Badge } from '@/components/ui/badge'

// tags区域Badge替换
{resource.tags.slice(0, 2).map((tag, index) => (
  <SiteBadge 
    key={index}
    siteData={{ type: tag }}
    locale={locale}
    showType={true}
    showStatus={false}
    className="text-xs"
  />
))}
```

### 验证结果
- 成功移除所有Badge组件依赖
- SiteBadge组件正常渲染tags标签
- 保持一致的视觉风格和交互体验

### 技术要点
- 完全统一化：所有badge相关组件都使用SiteBadge
- 依赖清理：移除不必要的组件导入
- 一致性设计：确保所有标签使用相同的设计系统
- 可维护性：统一的组件接口便于后续维护和扩展

## 案例33：类型Badge hover效果调整

### 问题描述
用户要求修改类型Badge的hover样式，希望hover后文字和背景颜色都不变，只是透明度变为90%。

### 分析
- 原有实现使用`group-hover:bg-muted`改变背景颜色
- 用户希望保持原有颜色，只改变透明度
- 需要将hover效果从颜色变化改为透明度变化

### 解决方案
1. 将`group-hover:bg-muted transition-colors`替换为`group-hover:opacity-90 transition-opacity`
2. 保持原有的背景色和文字颜色不变
3. 使用opacity属性实现透明度变化效果

### 代码变更
- `site-badge.tsx`第103-106行：
  - 将`group-hover:bg-muted transition-colors`改为`group-hover:opacity-90 transition-opacity`

### 验证结果
- hover时透明度正确变为90%
- 背景色和文字颜色保持不变
- 过渡动画流畅自然

### 技术要点
- CSS opacity属性的使用
- transition-opacity过渡动画
- 保持颜色一致性的重要性

## 案例28：修复Meta卡片高度布局问题

### 问题描述
用户反馈Meta卡片的布局出现了问题，卡片的高度应该是固定的320px，但当前的布局可能存在高度计算错误。

### 问题分析
检查代码发现，Meta卡片的内层容器使用了内联样式 `style={{ height: 'calc(100% - 0px)' }}`，这种写法是多余的，并且可能导致布局计算问题。应该直接使用Tailwind CSS的 `h-full` 类来确保内容区域正确填充父容器的高度。

### 解决方案
移除不必要的内联样式，使用Tailwind CSS的 `h-full` 类来确保内容区域正确填充320px的固定高度。

### 代码变更
在 `page.tsx` 文件中修改Meta卡片的内层容器：

```tsx
// 修改前
<div className="flex items-start gap-4" style={{ height: 'calc(100% - 0px)' }}>

// 修改后
<div className="flex items-start gap-4 h-full">
```

### 验证结果
- ✅ Meta卡片保持固定的320px高度
- ✅ 内容区域正确填充整个卡片高度
- ✅ 移除了不必要的内联样式，代码更简洁

### 技术要点
1. **避免不必要的内联样式**：优先使用Tailwind CSS类而不是内联样式
2. **高度计算简化**：`h-full` 比 `calc(100% - 0px)` 更简洁且效果相同
3. **布局一致性**：确保固定高度容器的子元素能够正确填充空间

### 最佳实践
- 优先使用Tailwind CSS类而不是内联样式
- 避免不必要的calc()计算，特别是减去0px的情况
- 保持代码简洁性和可维护性
- 确保固定高度容器的布局逻辑清晰

## 案例31：创建SiteBadge组件统一管理站点类型和状态显示

### 问题描述
用户要求将站点详情页中的两个badge（type和status）制作成一个固定组件，用于从 `/data/Site` 路径获取站点的type和status信息，实现组件化管理。

### 分析
1. 现有实现存在代码重复，type和status的badge在多个地方硬编码
2. 需要创建一个统一的组件来管理站点类型和状态的显示
3. 组件需要支持多语言、灵活配置显示内容
4. 需要保持与现有设计风格的一致性

### 解决方案
1. **创建SiteBadge组件**：统一管理type和status的显示逻辑
2. **提供子组件**：TypeBadge和StatusBadge用于单独显示
3. **集成多语言支持**：使用useFieldData hook获取翻译文本
4. **保持设计一致性**：复用现有的样式和图标系统

### 代码变更

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