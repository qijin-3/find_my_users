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

## 字段映射问题修复记录

### 问题描述
在站点详情页面和 ResourceCard 组件中，`status`、`type`、`region`、`submitMethod`、`expectedExposure`、`reviewTime` 这些字段显示的是原始变量值（如 `product_showcase`、`submit_issue`、`within_three_days`），而不是 `site-fields.json` 中映射的中文或英文翻译文本。

### 根本原因
1. **服务端字段工具**：`src/lib/field-utils.ts` 中的 `getFieldsData` 函数在服务端环境下使用了错误的文件读取方式
2. **API 路由**：`src/app/api/fields/route.ts` 中同样使用了错误的 `getI18nJsonData` 函数来读取字段文件
3. **文件路径问题**：原代码通过 `getI18nJsonData` 函数尝试从 `data/json/zh/` 或 `data/json/en/` 目录读取语言特定的字段文件，但实际的字段映射文件位于 `data/json/site-fields.json`，这是一个统一格式的文件，包含所有语言的翻译

### 解决方案
1. **修复服务端字段工具**（`src/lib/field-utils.ts`）：
   - 修改文件读取路径：直接读取 `data/json/site-fields.json` 文件
   - 简化读取逻辑：移除对 `getI18nJsonData` 的依赖，直接使用 `fs` 和 `path` 模块读取文件
   - 保持转换逻辑：继续使用 `transformUnifiedToLocaleFormat` 函数将统一格式转换为语言特定格式

2. **修复 API 路由**（`src/app/api/fields/route.ts`）：
   - 移除对 `getI18nJsonData` 的依赖
   - 直接使用 `fs.readFileSync` 读取 `site-fields.json` 文件
   - 保持相同的数据转换逻辑

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
  const fieldsData = transformUnifiedToLocaleFormat(unifiedData, locale);
}
```

#### `src/app/api/fields/route.ts`
```typescript
// 直接读取 site-fields.json 文件
const filePath = path.join(process.cwd(), 'data', 'json', 'site-fields.json')
const fileContent = fs.readFileSync(filePath, 'utf-8')
const unifiedFieldsData = JSON.parse(fileContent)
```

### 验证结果
- **站点详情页面**：
  - 中文页面：`http://localhost:3001/zh/site/shadcnui` - 字段正确显示中文翻译
  - 英文页面：`http://localhost:3001/en/site/shadcnui` - 字段正确显示英文翻译
- **ResourceCard 组件**：
  - 中文首页：`http://localhost:3001/zh` - type 字段正确显示中文翻译
  - 英文首页：`http://localhost:3001/en` - type 字段正确显示英文翻译
- 服务器运行正常，无编译错误

### 相关文件
- `src/lib/field-utils.ts` - 字段映射工具函数
- `src/app/api/fields/route.ts` - 字段 API 路由
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