# 字段管理系统

## 概述

为了便于统一管理和修改站点相关字段的中英文显示文本，项目采用了集中式字段管理系统。所有字段的显示文本由独立的 JSON 文件维护，在站点数据中以变量形式存储。

## 字段定义文件

### 文件位置
- 中文字段定义：`/data/fields/zh/site-fields.json`
- 英文字段定义：`/data/fields/en/site-fields.json`

### 字段类型

#### 站点状态 (status)
- `running`: 运行中 / Running
- `suspected_unmaintained`: 疑似不再维护 / Suspected Unmaintained
- `stopped`: 停止运营 / Stopped

#### 站点类型 (type)
- `product_showcase`: 产品展示页 / Product Showcase
- `tool_navigation`: 工具导航 / Tool Navigation
- `blog_newsletter`: 博客 / 周刊 / Blog / Newsletter
- `social_platform`: 社交平台 / Social Platform
- `media`: 媒体 / Media
- `vertical_forum_community`: 垂直论坛/社区 / Vertical Forum/Community
- `design_platform`: 设计平台 / Design Platform

#### 适合地区 (region)
- `domestic`: 国内 / Domestic
- `overseas`: 海外 / Overseas

#### 递交方式 (submitMethod)
- `site_submission`: 站内投稿 / Site Submission
- `submit_issue`: 提交issue / Submit Issue
- `questionnaire`: 问卷 / Questionnaire
- `site_form`: 站内表单 / Site Form
- `email`: Email / Email
- `submit_comment`: 提交Comment / Submit Comment

#### 审核耗时 (reviewTime)
- `immediately`: 立刻 / Immediately
- `within_one_day`: 一天内 / Within One Day
- `within_three_days`: 三天内 / Within Three Days
- `within_one_week`: 一周内 / Within One Week
- `over_one_week`: 一周以上 / Over One Week

#### 预计曝光 (expectedExposure)
- `not_disclosed`: 未披露 / Not Disclosed
- `not_evaluated`: 未评测 / Not Evaluated
- `within_100`: 100以内 / Within 100
- `within_500`: 500以内 / Within 500
- `within_1k`: 1k以内 / Within 1K
- `within_2k`: 2k以内 / Within 2K
- `within_10k`: 1w以内 / Within 10K
- `over_10k`: 1w以上 / Over 10K

## 工具函数

### 位置
`/lib/field-utils.ts`

### 主要函数

#### getFieldDisplayText()
```typescript
/**
 * 获取站点字段的显示文本
 * @param fieldType - 字段类型
 * @param fieldKey - 字段键值
 * @param locale - 语言环境 ('zh' | 'en')
 * @returns 对应的显示文本
 */
getFieldDisplayText(fieldType, fieldKey, locale)
```

#### getFieldOptions()
```typescript
/**
 * 获取所有字段选项
 * @param fieldType - 字段类型
 * @param locale - 语言环境
 * @returns 字段选项数组
 */
getFieldOptions(fieldType, locale)
```

#### isValidFieldKey()
```typescript
/**
 * 验证字段值是否有效
 * @param fieldType - 字段类型
 * @param fieldKey - 字段键值
 * @returns 是否有效
 */
isValidFieldKey(fieldType, fieldKey)
```

## 使用示例

### 在组件中使用
```tsx
import { getFieldDisplayText } from '@/lib/field-utils';

// 获取站点状态的显示文本
const statusText = getFieldDisplayText('status', 'running', 'zh'); // "运行中"
const statusTextEn = getFieldDisplayText('status', 'running', 'en'); // "Running"

// 获取站点类型的显示文本
const typeText = getFieldDisplayText('type', 'product_showcase', 'zh'); // "产品展示页"
```

### 在表单中使用
```tsx
import { getFieldOptions } from '@/lib/field-utils';

const statusOptions = getFieldOptions('status', 'zh');
// [
//   { key: 'running', label: '运行中' },
//   { key: 'suspected_unmaintained', label: '疑似不再维护' },
//   { key: 'stopped', label: '停止运营' }
// ]
```

## 数据结构

### 站点列表 (sitelists.json)
```json
{
  "name": "站点名称",
  "description": "站点描述",
  "url": "https://example.com",
  "slug": "site-slug",
  "category": "product_showcase",
  "status": "running",
  "type": "product_showcase",
  "region": "overseas",
  "submitMethod": "submit_issue",
  "reviewTime": "within_one_week",
  "expectedExposure": "over_10k",
  "date": "2024-01-01T00:00:00.000Z",
  "lastModified": "2024-01-01T00:00:00Z"
}
```

### 站点详情 (Site/[slug].json)
```json
{
  "name": "站点名称",
  "description": "站点描述",
  "screenshot": "/images/sites/screenshot.jpg",
  "status": "running",
  "type": "product_showcase",
  "region": "overseas",
  "url": "https://example.com",
  "submitMethod": "submit_issue",
  "submitUrl": "https://example.com/submit",
  "submitRequirements": "提交要求",
  "review": "Y",
  "reviewTime": "within_one_week",
  "expectedExposure": "over_10k",
  "rating": "站点评价"
}
```

## 维护指南

### 添加新字段值
1. 在 `/data/fields/zh/site-fields.json` 和 `/data/fields/en/site-fields.json` 中添加新的键值对
2. 更新相关的站点数据文件
3. 如需要，更新 TypeScript 类型定义

### 修改现有字段显示文本
1. 直接修改字段定义文件中的显示文本
2. 无需修改站点数据文件，因为使用的是变量引用

### 重命名字段键值
1. 更新字段定义文件中的键名
2. 批量更新所有站点数据文件中的对应键值
3. 更新相关的 TypeScript 类型定义

## 注意事项

1. **保持一致性**：确保中英文字段定义文件的键名完全一致
2. **数据验证**：使用 `isValidFieldKey()` 函数验证字段值的有效性
3. **类型安全**：在 TypeScript 中使用适当的类型定义
4. **向后兼容**：添加新字段时考虑向后兼容性
5. **文档更新**：修改字段时及时更新相关文档