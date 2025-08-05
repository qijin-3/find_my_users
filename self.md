# 修复记录

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