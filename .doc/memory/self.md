# 已知错误及其修复方法

## 错误记录和学习

本文件记录在 FindMyUsers 项目开发过程中遇到的错误和相应的修复方法，以避免重复犯同样的错误。

### 错误：TypeScript 类型定义不完整
**错误做法**：
```typescript
// 缺少类型定义的组件 props
function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>
}
```

**正确做法**：
```typescript
// 完整的 TypeScript 类型定义
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

function Button({ children, onClick, variant = 'default', size = 'default', className }: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {children}
    </button>
  )
}
```

### 错误：未使用 Shadcn/ui 组件规范
**错误做法**：
```jsx
// 直接使用原生 HTML 元素而不是 Shadcn/ui 组件
<button className="bg-blue-500 text-white px-4 py-2 rounded">
  点击我
</button>
```

**正确做法**：
```jsx
// 使用 Shadcn/ui Button 组件
import { Button } from "@/components/ui/button"

<Button variant="default" size="default">
  点击我
</Button>
```

### 错误：忘记添加函数注释
**错误做法**：
```typescript
function processArticleData(data) {
  return data.map(item => ({
    ...item,
    slug: item.title.toLowerCase().replace(/\s+/g, '-')
  }))
}
```

**正确做法**：
```typescript
/**
 * 处理文章数据，生成 URL 友好的 slug
 * @param data - 原始文章数据数组
 * @returns 处理后的文章数据，包含 slug 字段
 */
function processArticleData(data: ArticleData[]): ProcessedArticleData[] {
  return data.map(item => ({
    ...item,
    slug: item.title.toLowerCase().replace(/\s+/g, '-')
  }))
}
```

### 错误：未正确使用 SWR 进行数据获取
**错误做法**：
```jsx
// 使用 useEffect 和 useState 进行数据获取
const [data, setData] = useState(null)
const [loading, setLoading] = useState(true)

useEffect(() => {
  fetch('/api/articles')
    .then(res => res.json())
    .then(data => {
      setData(data)
      setLoading(false)
    })
}, [])
```

**正确做法**：
```jsx
// 使用 SWR 进行数据获取
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

function ArticleList() {
  const { data, error, isLoading } = useSWR('/api/articles', fetcher)
  
  if (error) return <div>加载失败</div>
  if (isLoading) return <div>加载中...</div>
  
  return <div>{/* 渲染数据 */}</div>
}
```

### 错误：未使用 cn() 函数合并类名
**错误做法**：
```jsx
// 直接拼接类名字符串
<div className={`base-class ${isActive ? 'active-class' : ''} ${className || ''}`}>
```

**正确做法**：
```jsx
// 使用 cn() 函数合并类名
import { cn } from "@/lib/utils"

<div className={cn("base-class", isActive && "active-class", className)}>
```

### 错误：未遵循响应式设计原则
**错误做法**：
```jsx
// 固定尺寸，不考虑响应式
<div className="w-96 h-64">
  内容
</div>
```

**正确做法**：
```jsx
// 响应式设计，移动优先
<div className="w-full max-w-sm md:max-w-md lg:max-w-lg">
  内容
</div>
```

### 错误：环境变量使用不当
**错误做法**：
```javascript
// 在客户端代码中直接使用服务端环境变量
const githubToken = process.env.GITHUB_TOKEN // 这会暴露敏感信息
```

**正确做法**：
```javascript
// 服务端 API 路由中使用环境变量
// pages/api/github.js 或 app/api/github/route.ts
const githubToken = process.env.GITHUB_TOKEN // 仅在服务端使用

// 客户端需要的环境变量使用 NEXT_PUBLIC_ 前缀
const publicApiUrl = process.env.NEXT_PUBLIC_API_URL
```

### 错误：字段映射不完整导致显示变量名而非翻译文本
**错误做法**：
```typescript
// field-utils.ts 中缺少实际数据中使用的字段值映射
const zhFields = {
  type: {
    free: "免费",
    freemium: "免费增值",
    // 缺少 tool_navigation, social_platform 等实际使用的值
  },
  region: {
    global: "全球",
    china: "中国大陆",
    // 缺少 domestic, overseas 等实际使用的值
  }
}
```

**正确做法**：
```typescript
// 完整的字段映射，包含所有实际数据中使用的值
const zhFields = {
  type: {
    free: "免费",
    freemium: "免费增值",
    paid: "付费",
    subscription: "订阅制",
    one_time_purchase: "一次性购买",
    tool_navigation: "工具导航",
    social_platform: "社交平台",
    product_showcase: "产品展示",
    blog_newsletter: "博客/周刊",
    media: "媒体平台",
    vertical_forum: "垂直论坛",
    design_platform: "设计平台"
  },
  region: {
    global: "全球",
    china: "中国大陆",
    asia_pacific: "亚太地区",
    north_america: "北美",
    europe: "欧洲",
    domestic: "国内",
    overseas: "海外",
    other: "其他"
  },
  submitMethod: {
    email: "邮件提交",
    form: "表单提交",
    api: "API提交",
    manual: "手动提交",
    automatic: "自动收录",
    site_submission: "站点提交",
    submit_issue: "提交Issue"
  },
  reviewTime: {
    immediate: "即时",
    within_24h: "24小时内",
    within_week: "一周内",
    within_month: "一个月内",
    within_three_days: "三天内",
    within_one_week: "一周内",
    unknown: "未知"
  },
  expectedExposure: {
    high: "高",
    medium: "中",
    low: "低",
    within_2k: "2千以内",
    over_10k: "1万以上",
    unknown: "未知"
  }
}
```

**修复要点**：
1. 检查实际数据文件中使用的字段值
2. 确保 field-utils.ts 中包含所有实际使用的映射
3. 同时更新中文和英文映射
4. 使用 getFieldDisplayText 函数进行字段值转换

       {/* Site content */}
       <div className="prose prose-lg max-w-none">
         {/* 详细内容 */}
       </div>
       
       {/* Back to site list link */}
       <div className="mt-12">
         <Link href="/site">Back to site list</Link>
       </div>
     </article>
   )
   ```

3. **主要变更**：
   - 移除了 Card 组件的复杂布局
   - 添加了面包屑导航 (使用 ChevronRight 图标)
   - 将站点信息整合到单个灰色背景的元信息卡片中
   - 使用 prose 样式处理详细内容
   - 统一了容器样式和最大宽度限制
   - 保持了与文章详情页一致的视觉层次

### 验证结果
- 站点详情页现在与文章详情页具有相同的基本结构
- 面包屑导航正常工作
- 元信息卡片样式一致
- 内容区域使用相同的 prose 样式
- 返回链接位置和样式统一

## 项目重构记录 - Site页面重新设计

### 修改需求
用户要求重新设计site页面，具体要求：
1. 左侧菜单包含7种站点类型分类：产品展示页、工具导航、博客/周刊、社交社区、媒体、垂直论坛/社区、设计平台
2. 右侧的"提交工具"按钮作为占位，暂不实现功能

### 修复步骤
1. **更新页面结构**：
   ```js
   // src/app/site/page.js
   // 将原有的 ResourceList 组件替换为新的 SitePageContent 组件
   import SitePageContent from '@/components/SitePageContent'
   
   export const metadata = {
     title: '分类',
     description: '独立开发者工具站 | 全球产品必备工具资源源',
   }
   ```

2. **创建新的SitePageContent组件**：
   ```js
   // src/components/SitePageContent.js
   // 实现左侧分类菜单和右侧内容区域的布局
   const siteCategories = [
     { id: 'product-showcase', name: '产品展示页', icon: Globe },
     { id: 'tool-navigation', name: '工具导航', icon: Wrench },
     { id: 'blog-newsletter', name: '博客/周刊', icon: BookOpen },
     { id: 'social-community', name: '社交社区', icon: Users },
     { id: 'media', name: '媒体', icon: Radio },
     { id: 'vertical-forum', name: '垂直论坛/社区', icon: MessageSquare },
     { id: 'design-platform', name: '设计平台', icon: Palette },
   ]
   ```

## 404错误修复记录

### 问题描述
用户报告主页显示404错误，经检查发现：
1. 主页本身工作正常（返回200状态码）
2. `/site` 页面显示404错误

### 根本原因
在 Next.js 13+ App Router 中，页面文件必须使用 `.tsx` 扩展名，但 `/site` 页面使用的是 `.js` 文件。

### 修复步骤
1. **文件重命名**：
   ```bash
   # 将 page.js 重命名为 page.tsx
   mv src/app/site/page.js src/app/site/page.tsx
   ```

2. **添加TypeScript类型**：
   ```typescript
   // src/app/site/page.tsx
   import { Metadata } from 'next'
   
   export const metadata: Metadata = {
     title: '分类',
     description: '独立开发者工具站 | 全球产品必备工具资源源',
   }
   ```

### 技术要点
- Next.js 13+ App Router 要求页面文件使用 TypeScript 格式（.tsx）
- 需要从 'next' 导入 Metadata 类型进行类型声明
- 组件 props 传递保持不变，SitePageContent 组件正确接收 resources 参数

### 验证结果
- 主页正常显示（http://localhost:3004）
- Site页面正常显示（http://localhost:3004/site）
- 分类筛选功能正常工作
- 开发服务器编译成功，无错误信息

3. **组件功能特性**：
   - 左侧分类菜单：7种站点类型，带图标和选中状态
   - 顶部标题栏：包含页面标题和"提交工具"占位按钮
   - 右侧内容区域：响应式网格布局（1-3列）
   - 卡片设计：固定高度h-64、标签显示、外部链接处理
   - 空状态处理：友好的提示信息

### 验证结果
- 开发服务器运行在端口3004：http://localhost:3004/site
- 页面正常编译和渲染
- 左侧菜单包含用户要求的7种分类
- 右侧"提交工具"按钮已作为占位实现
- 响应式布局在不同屏幕尺寸下正常工作

### 技术要点
- 使用Shadcn/ui组件库（Card、Button、Badge）
- 集成Lucide图标库
- 客户端组件实现交互功能
- 保持暗黑模式支持
- 遵循项目代码规范和TypeScript类型定义

### 文件重命名：resources.json → sitelists.json (2024-12-19)

**背景**: 用户要求将数据文件 `resources.json` 重命名为 `sitelists.json`

**实现步骤**:

1. **重命名数据文件**
   - 将 `/data/json/resources.json` 重命名为 `/data/json/sitelists.json`

2. **更新所有文件引用**
   - 更新主页文件: `src/app/page.tsx`
   - 更新site页面: `src/app/site/page.js`
   - 更新动态路由: `src/app/site/[slug]/page.tsx`
   - 更新API路由: `src/app/api/resources/route.js`
   - 更新项目文档: `README.md`、安装指南、管理资源文档
   - 更新项目记忆文件: `.doc/memory/self.md`

3. **清理冗余文件** (2024-12-19):
   - 删除原 `resources.json` 文件
   - 修复主页中 `ResourceList` 组件的 props 传递方式
   - 在 `ResourceList` 组件中添加类型检查以防止 undefined 错误

**技术要点**:
- 保持所有功能不变，仅更改文件名和路径引用
- 确保API路由中的GitHub路径和本地路径都正确更新
- 更新相关文档以保持一致性
- 添加防御性编程，提高组件健壮性

**验证结果**:
- 首页和site页面功能正常
- 分类筛选功能正常工作
- 所有数据加载正确
- 冗余文件已清理

### 统一卡片组件和分类筛选功能 (2024-12-19)

**背景**: 用户要求确保 site 页面和 home 页面使用统一的卡片组件，并修复侧边栏切换时卡片未更新的问题

**实现步骤**:

1. **为资源数据添加分类字段**
    - 更新 `/data/json/sitelists.json`，为每个站点添加 `category` 字段
   - 分类包括: product-showcase, tool-navigation, blog-newsletter, social-community, media, vertical-forum, design-platform

2. **创建统一的 ResourceCard 组件**
   ```javascript
   // src/components/ResourceCard.js
   export default function ResourceCard({ 
     resource, 
     showCategory = false, 
     className = "" 
   }) {
     // 统一的卡片渲染逻辑
     // 支持分类标签显示/隐藏
     // 保持一致的样式和交互效果
   }
   ```

3. **更新 ResourceList 组件**
   - 使用新的 ResourceCard 组件替代内部卡片实现
   - 设置 `showCategory={false}` 隐藏分类标签

4. **更新 SitePageContent 组件**
   - 使用 ResourceCard 组件替代内部卡片实现
   - 实现分类筛选功能，使用 `useMemo` 优化性能
   - 添加分类计数显示
   - 设置 `showCategory={true}` 显示分类标签

**技术要点**:
- 使用 `useMemo` 优化分类筛选性能
- 分类ID到显示名称的映射转换
- 统一的卡片样式和交互效果
- 响应式设计和暗黑模式支持

**验证结果**:
- 首页和site页面使用相同的卡片组件
- 分类筛选功能正常工作，切换分类时卡片内容正确更新
- 分类菜单显示每个分类的资源数量
- 保持原有的样式和交互效果

## 项目重构记录 - Resources 改名为 Site 和卡片高度修复

### 错误现象
1. 用户反馈 "rescources" 拼写错误，应该改为 "Site"
2. 卡片高度使用响应式设计（`h-full`）导致显示混乱，需要固定高度

### 修复步骤
1. **目录重命名**：
   ```bash
   mv src/app/resources src/app/site
   ```

2. **导航组件更新**：
   ```tsx
   // src/components/Navigation.tsx
   const navItems = [
     { path: '/', label: 'Home' },
     { path: '/site', label: 'Site' },  // 从 /resources 改为 /site
     { path: '/posts', label: 'Articles' },
   ]
   ```

3. **页面元数据更新**：
   ```js
   // src/app/site/page.js
   export const metadata = {
     title: 'Site',  // 从 Resources 改为 Site
     description: 'Explore our curated list of sites for web development, GitHub, and more.',
   }
   ```

4. **卡片高度修复**：
   ```js
   // src/components/ResourceList.js
   <Card className="h-48 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105">
   // 从 h-full 改为 h-48 固定高度
   ```

5. **链接路径更新**：
   - ResourceList 组件：`/resources/${resource.slug}` → `/site/${resource.slug}`
   - Footer 组件：`/resources` → `/site`
   - Site 详情页面：返回链接从 `/resources` 改为 `/site`

6. **清理工作**：
   ```bash
   rm -rf src/app/resources  # 删除旧目录
   ```

### 验证结果
- ✅ 首页正常加载 (http://localhost:3004)
- ✅ Site 页面正常加载 (http://localhost:3004/site)
- ✅ Site 详情页面正常加载 (http://localhost:3004/site/nextjs)
- ✅ 卡片高度统一为固定 192px (h-48)
- ✅ 所有导航链接正常工作

### 预防措施
1. **全局搜索验证**：使用 `search_by_regex` 搜索所有相关路径引用
2. **功能测试**：测试所有页面和链接的正常工作
3. **服务器重启**：确保路由更改生效

### 错误：文件路径配置错误导致 ENOENT 错误
**错误现象**：
```
Error: ENOENT: no such file or directory, scandir '/path/to/project/data/md'
```

**错误原因**：
代码中硬编码的文件路径与实际项目结构不匹配。

**错误做法**：
```javascript
// posts.js 中错误的路径配置
const postsDirectory = path.join(process.cwd(), 'data', 'md')
```

**正确做法**：
```javascript
// 根据实际项目结构配置正确的路径
const postsDirectory = path.join(process.cwd(), 'data', 'Articles')
```

**修复步骤**：
1. 检查项目实际的目录结构
2. 确认文件存储的真实位置
3. 更新代码中的路径配置
4. 测试确保路径正确

**预防措施**：
- 在项目初期建立清晰的目录结构文档
- 使用相对路径时要确保路径的正确性
- 添加文件存在性检查，提供更友好的错误信息

### 错误：文件移动后未更新代码中的引用路径
**错误现象**：
移动文件夹后，应用出现文件找不到的错误，如：
```
Error: ENOENT: no such file or directory, open '/path/to/old/location/file.json'
```

**错误原因**：
文件或文件夹移动后，代码中仍然使用旧的路径引用。

**错误做法**：
```javascript
// 移动文件夹后，代码中仍使用旧路径
const sitePath = path.join(process.cwd(), 'public', 'Site', `${slug}.json`);
```

**正确做法**：
```javascript
// 更新为新的路径
const sitePath = path.join(process.cwd(), 'data', 'Site', `${slug}.json`);
```

**修复步骤**：
1. 使用搜索工具查找所有引用旧路径的代码
2. 逐一更新路径引用
3. 测试所有相关功能确保正常工作
4. 重启开发服务器确保更改生效

**预防措施**：
- 移动文件前先搜索所有引用该路径的代码
- 使用配置文件统一管理路径常量
- 建立文件移动的检查清单

### 错误：未正确处理异步操作错误
**错误做法**：
```javascript
// 未处理异步操作的错误
async function fetchData() {
  const response = await fetch('/api/data')
  const data = await response.json()
  return data
}
```

**正确做法**：
```javascript
/**
 * 获取数据并处理错误
 * @returns Promise<Data | null> 返回数据或 null（如果出错）
 */
async function fetchData(): Promise<Data | null> {
  try {
    const response = await fetch('/api/data')
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('获取数据失败:', error)
    return null
  }
}
```

### 错误：未使用 Next.js Image 组件优化图片
**错误做法**：
```jsx
// 使用原生 img 标签
<img src="/images/hero.jpg" alt="Hero image" width="800" height="600" />
```

**正确做法**：
```jsx
// 使用 Next.js Image 组件
import Image from 'next/image'

<Image
  src="/images/hero.jpg"
  alt="Hero image"
  width={800}
  height={600}
  priority // 如果是首屏图片
  className="rounded-lg"
/>
```

### 错误：未正确实现可访问性
**错误做法**：
```jsx
// 缺少可访问性属性
<button onClick={handleClick}>
  <svg>...</svg>
</button>
```

**正确做法**：
```jsx
// 包含完整的可访问性属性
<button 
  onClick={handleClick}
  aria-label="关闭对话框"
  type="button"
>
  <svg aria-hidden="true">...</svg>
</button>
```

### 数据结构扩展：sitelists.json 字段增强
**日期**：2025-01-28
**问题描述**：需要为 sitelists.json 中的每个站点添加创建时间、修改时间和对应路径字段。

**数据结构扩展**：
为每个站点资源添加新字段：
```json
{
  "id": 1,
  "name": "Next.js",
  "slug": "nextjs",
  // ... 原有字段
  "date": "2024-08-16T03:57:46.153Z",           // 创建时间
  "lastModified": "2025-07-28T03:34:22Z"       // 最后修改时间
}
```

**字段移除记录 (2025-01-28)**：
- **移除字段**: `path` 
- **移除原因**: 
  - 信息冗余：路径可通过 `slug` 动态计算 (`data/Site/${slug}.json`)
  - 减少维护负担：避免路径不一致的风险
  - 简化数据结构：降低文件大小和复杂度
- **影响评估**: 无功能影响，动态路由页面通过 `slug` 构建路径
- **验证结果**: 所有页面和功能正常

**跳转机制分析**：
1. **卡片跳转实现**：
   - ResourceCard 组件使用 `next/link` 创建动态路由
   - 跳转路径：`/site/${resource.slug}`
   - 通过 slug 字段建立关联关系

2. **数据关系维护**：
   - sitelists.json：存储资源列表和基础信息
   - data/Site/${slug}.json：存储对应的详细信息
   - 通过 slug 字段一一对应

3. **路由处理**：
   - 动态路由：`/src/app/site/[slug]/page.tsx`
   - 使用 `generateStaticParams` 预生成静态路由
   - 通过 `getSiteData` 方法加载详情数据

**技术要点**：
- 保持 slug 字段的唯一性和一致性
- 时间戳使用 ISO 8601 格式确保标准化
- 新字段不影响现有功能的正常运行
- 移除冗余字段简化数据结构

**验证结果**：
- ✅ 主页正常显示 (http://localhost:3004)
- ✅ Site 页面正常显示 (http://localhost:3004/site)
- ✅ 所有卡片跳转功能正常
- ✅ 站点详情页正常显示
- ✅ 数据结构扩展成功，包含7个资源的完整信息

## 学习要点

1. **始终使用 TypeScript** - 所有新代码必须有完整的类型定义
2. **遵循 Shadcn/ui 规范** - 使用项目统一的组件库
3. **添加函数注释** - 每个函数都需要详细的注释说明
4. **使用 SWR 进行数据获取** - 避免手动管理加载状态
5. **正确使用工具函数** - 如 cn() 进行类名合并
6. **响应式设计** - 始终考虑移动端体验
7. **环境变量安全** - 区分客户端和服务端环境变量
8. **错误处理** - 所有异步操作都要有错误处理
9. **性能优化** - 使用 Next.js 提供的优化组件
10. **可访问性** - 确保所有用户都能使用应用

### 错误：网站截图API服务选择不当
**日期**：2025-01-28
**错误现象**：
- `screenshotmachine.com` demo key 返回无效图片
- `htmlcsstoimage.com` 被浏览器 CORS 策略阻止，出现 `ERR_BLOCKED_BY_ORB` 错误
- Google PageSpeed API 返回 JSON 数据而非图片

**错误做法**：
```typescript
// 使用不稳定或被CORS阻止的截图服务
const screenshotUrl = `https://api.screenshotmachine.com/?key=demo&url=${url}&dimension=120x80`
const screenshotUrl = `https://htmlcsstoimage.com/demo_run?url=${url}&width=400&height=300`
const screenshotUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}`
```

**正确做法**：
```typescript
/**
 * 获取网站缩略截图URL
 * @param {string} url - 网站URL
 * @returns {string} 缩略截图URL
 */
const getWebsiteScreenshotUrl = (url: string): string => {
  try {
    // 使用 WordPress.com 的 mshots 服务获取网站截图
    // 这是一个稳定且免费的服务，被广泛使用
    const encodedUrl = encodeURIComponent(url)
    // 设置合适的宽度和高度，适配卡片布局
    return `https://s0.wp.com/mshots/v1/${encodedUrl}?w=400&h=300`
  } catch {
    // 如果URL无效，返回默认图片
    return '/next.svg'
  }
}
```

**修复要点**：
1. **避免依赖不稳定的第三方截图API** - 很多免费服务不稳定或有CORS限制
2. **使用稳定的占位图片服务** - ui-avatars.com 等服务更可靠
3. **基于域名生成唯一标识** - 为每个网站生成独特的视觉标识
4. **添加错误处理** - 确保URL解析失败时有备用方案
5. **考虑用户体验** - 占位图片应该美观且有意义

**布局优化**：
```tsx
// 让图片占满卡片宽度的布局
<Card className="h-72 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 overflow-hidden">
  {/* 网站缩略截图 - 占满卡片宽度 */}
  <div className="relative w-full h-32 overflow-hidden">
    <Image
      src={getWebsiteScreenshotUrl(resource.url)}
      alt={`${resource.name} screenshot`}
      fill
      className="object-cover transition-transform duration-300 group-hover:scale-105"
      unoptimized
    />
  </div>
  {/* 其他内容 */}
</Card>
```

**预防措施**：
- 优先使用稳定的占位图片服务而非实时截图API
- 测试第三方服务的CORS策略和稳定性
- 为所有外部服务调用添加错误处理
- 考虑使用本地生成的SVG图标作为备用方案

### 错误：动画组件图层层级管理不当
**日期**：2025-01-31
**错误现象**：
在实现小人插画动效时，后排小人在动画或悬停时会覆盖前排小人，违反了预期的视觉层次。

**错误做法**：
```tsx
// 未设置适当的 z-index 层级
<div className="flex justify-center items-end space-x-1">
  {/* 后排小人 */}
  <motion.div className="cursor-pointer">
    {/* 动画时可能覆盖前排 */}
  </motion.div>
</div>
<div className="flex justify-center items-end space-x-1" style={{ marginTop: '-100px' }}>
  {/* 前排小人 */}
  <motion.div className="cursor-pointer">
    {/* 被后排覆盖 */}
  </motion.div>
</div>
```

**正确做法**：
```tsx
// 明确设置图层层级，确保视觉层次正确
{/* 后排小人 - 较低层级 */}
<div className="flex justify-center items-end space-x-1 relative z-10">
  <motion.div className="cursor-pointer relative z-10">
    {/* 后排小人永远在较低层级 */}
  </motion.div>
</div>

{/* 前排小人 - 较高层级 */}
<div className="flex justify-center items-end space-x-1 relative z-20" style={{ marginTop: '-100px' }}>
  <motion.div className="cursor-pointer relative z-30">
    {/* 前排小人始终在最高层级 */}
  </motion.div>
</div>
```

**修复要点**：
1. **层级规划** - 在复杂布局中提前规划 z-index 层级
2. **容器层级** - 父容器和子元素都需要设置合适的 z-index
3. **交互保护** - 确保动画和悬停效果不会破坏视觉层次
4. **渐进式层级** - 使用递增的 z-index 值 (z-10, z-20, z-30)

**预防措施**：
- 复杂动画组件设计时先绘制层级关系图
- 使用语义化的 z-index 值而非随意数字
- 测试所有交互状态下的层级表现
- 为重叠元素建立明确的层级规范

### 错误：动画方向与用户期望不符
**日期**：2025-01-31
**错误现象**：
实现动画时默认使用了从上往下的出现效果，但用户明确要求从下往上出现，更符合"冒出来"的俏皮感觉。

**错误做法**：
```tsx
// 错误的动画方向和顺序
const getAnimationDelay = (row: number, col: number) => {
  // 后排先出现，前排后出现 - 不符合"从下往上"的视觉逻辑
  const rowDelay = row === 2 ? 0 : 0.8
  return rowDelay + colDelay
}

initial={{ y: 50 }}  // 从较小的 y 值开始，视觉上像从上往下
```

**正确做法**：
```tsx
// 正确的从下往上动画效果
const getAnimationDelay = (row: number, col: number) => {
  // 前排（视觉下方）先出现，后排（视觉上方）后出现
  const rowDelay = row === 1 ? 0 : 0.8  // row=1是前排，先出现
  const colDelay = (col - 1) * 0.15
  return rowDelay + colDelay
}

// 更大的初始 y 值，营造从下方"蹦出"的效果
initial={{ y: 100 }}  // 后排从更下方开始
initial={{ y: 120 }}  // 前排从最下方开始
```

**修复要点**：
1. **用户体验理解** - 深入理解用户的视觉期望
2. **动画语义** - 动画应该支撑而不是违背设计意图
3. **空间逻辑** - 动画方向应该符合空间层次逻辑
4. **渐进优化** - 根据用户反馈调整动画参数

**预防措施**：
- 在实现动画前明确用户的视觉期望
- 使用描述性的变量名表达动画意图
- 为复杂动画制作原型或草图确认效果
- 保持动画参数的可配置性以便快速调整