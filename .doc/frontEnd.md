# 前端设计系统文档

## 设计系统概述

FindMyUsers 前端采用现代化的设计系统，基于 Shadcn/ui 组件库和 Tailwind CSS，提供一致性和可维护性的用户界面。

## 字体系统

### 主要字体
- **Inter** - Google Fonts 提供的现代无衬线字体
  - 用途：全站主要字体
  - 特点：高可读性、现代感、支持多语言
  - 加载方式：Next.js Font Optimization

### 字体配置
```typescript
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
```

### 字体层级
- **标题字体**：Inter, 粗体 (font-bold)
- **正文字体**：Inter, 常规 (font-normal)
- **小标题**：Inter, 中等粗细 (font-medium)

## 调色板

### 主色调系统 (基于 HSL)
项目采用 CSS 变量定义的语义化颜色系统，支持明暗主题切换。

#### 浅色主题 (Light Mode)
```css
:root {
  --background: 0 0% 100%;           /* 纯白背景 */
  --foreground: 222.2 84% 4.9%;      /* 深灰文字 */
  --primary: 222.2 47.4% 11.2%;      /* 深蓝主色 */
  --primary-foreground: 210 40% 98%; /* 主色文字 */
  --secondary: 210 40% 96.1%;        /* 浅灰次要色 */
  --muted: 210 40% 96.1%;            /* 静音色 */
  --accent: 210 40% 96.1%;           /* 强调色 */
  --destructive: 0 84.2% 60.2%;      /* 危险色 (红色) */
  --border: 214.3 31.8% 91.4%;       /* 边框色 */
  --input: 214.3 31.8% 91.4%;        /* 输入框边框 */
  --card: 0 0% 100%;                 /* 卡片背景 */
}
```

#### 深色主题 (Dark Mode)
```css
.dark {
  --background: 222.2 84% 4.9%;      /* 深色背景 */
  --foreground: 210 40% 98%;         /* 浅色文字 */
  --primary: 210 40% 98%;            /* 浅色主色 */
  --secondary: 217.2 32.6% 17.5%;    /* 深灰次要色 */
  --muted: 217.2 32.6% 17.5%;        /* 深灰静音色 */
  --accent: 217.2 32.6% 17.5%;       /* 深灰强调色 */
  --destructive: 0 62.8% 30.6%;      /* 深色危险色 */
  --border: 217.2 32.6% 17.5%;       /* 深色边框 */
  --card: 222.2 84% 4.9%;            /* 深色卡片背景 */
}
```

### 语义化颜色
- **Primary**: 主要操作和品牌色
- **Secondary**: 次要操作和辅助元素
- **Destructive**: 危险操作 (删除、警告)
- **Muted**: 次要文本和禁用状态
- **Accent**: 强调和高亮元素

## 间距和布局规则

### 间距系统 (基于 Tailwind CSS)
```css
/* 基础间距单位 = 0.25rem (4px) */
space-1   = 0.25rem  (4px)
space-2   = 0.5rem   (8px)
space-3   = 0.75rem  (12px)
space-4   = 1rem     (16px)
space-6   = 1.5rem   (24px)
space-8   = 2rem     (32px)
space-12  = 3rem     (48px)
space-16  = 4rem     (64px)
```

### 容器和布局
```css
/* 主容器 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* 响应式断点 */
sm: 640px   /* 小屏幕 */
md: 768px   /* 中等屏幕 */
lg: 1024px  /* 大屏幕 */
xl: 1280px  /* 超大屏幕 */
2xl: 1400px /* 最大屏幕 */
```

### 圆角系统
```css
--radius: 0.5rem;  /* 基础圆角 */
rounded-sm: calc(var(--radius) - 4px);  /* 小圆角 */
rounded-md: calc(var(--radius) - 2px);  /* 中等圆角 */
rounded-lg: var(--radius);              /* 大圆角 */
```

### 阴影系统
```css
shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
```

## 首选 UI 库和框架

### 核心 UI 框架
- **Shadcn/ui** - 主要组件库
  - 基于 Radix UI 构建
  - 完全可定制
  - 支持 TypeScript
  - 无运行时依赖

### 底层组件库
- **Radix UI** - 无样式、可访问的原始组件
  - `@radix-ui/react-dropdown-menu` - 下拉菜单
  - `@radix-ui/react-slot` - 插槽组件

### 样式工具
- **Tailwind CSS** - 实用优先的 CSS 框架
- **Class Variance Authority (CVA)** - 组件变体管理
- **Tailwind Merge** - 类名合并工具
- **CLSX** - 条件类名工具
- **Tailwindcss Animate** - Tailwind CSS 动画扩展
- **@tailwindcss/typography** - 排版样式插件

### 动画库
- **Framer Motion** (v11.11.17) - 生产级 React 动画库
  - 声明式动画 API
  - 手势和拖拽支持
  - 布局动画
  - SVG 路径动画
  - 性能优化的 transform 动画

### 主题系统
- **next-themes** - Next.js 主题切换解决方案
  - 支持明暗主题切换
  - 系统主题检测
  - 无闪烁主题切换

## 图标集

### 主要图标库
- **Phosphor Icons** (v2.1.7)
  - 现代、一致的图标设计
  - 轻量级 SVG 图标
  - 完全可定制
  - 支持 Tree Shaking
  - 多种图标风格 (Regular, Bold, Duotone, Fill, Light, Thin)

### 图标使用示例
```jsx
import { GithubLogo, List, X, CaretDown } from '@phosphor-icons/react'

// 基础使用
<GithubLogo className="h-5 w-5" />

// 带样式
<List className="h-6 w-6 text-muted-foreground hover:text-foreground" />
```

### 常用图标
- **X** - 关闭按钮、模态框关闭
- **Globe** - 语言切换、网站链接
- **Check** - 确认状态、选中状态
- **CaretRight** - 右箭头、导航指示
- **Circle** - 圆形图标、状态指示
- **ArrowRight** - 右箭头、跳转指示
- **ArrowSquareOut** - 外部链接
- **Moon** - 深色主题图标
- **Sun** - 浅色主题图标
- **ArrowLeft** - 返回按钮、左箭头
- **Clock** - 时间相关
- **Users** - 用户相关
- **CheckCircle** - 成功状态
- **XCircle** - 错误状态
- **CaretDown** - 下拉指示器

## 前端架构

### 目录结构
```
src/
├── app/                    # Next.js App Router 页面
│   ├── admin/             # 管理后台页面
│   │   ├── articles/      # 文章管理页面
│   │   └── page.js        # 管理后台首页
│   ├── api/               # API 路由
│   │   ├── articles/      # 文章相关 API
│   │   ├── check-auth/    # 认证检查 API
│   │   ├── login/         # 登录 API
│   │   ├── logout/        # 登出 API
│   │   └── resources/     # 资源相关 API
│   ├── login/             # 登录页面
│   │   └── page.js        # 登录页面组件
│   ├── posts/             # 文章页面
│   │   ├── [slug]/        # 动态文章详情页
│   │   └── page.js        # 文章列表页
│   ├── site/              # 站点资源页面
│   │   ├── [slug]/        # 动态站点详情页
│   │   └── page.tsx       # 站点列表页
│   ├── favicon.ico        # 网站图标
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局组件
│   └── page.tsx           # 首页
├── components/            # 可复用组件
│   ├── ui/               # Shadcn/ui 基础组件
│   │   ├── alert.tsx     # 警告提示组件
│   │   ├── badge.tsx     # 徽章组件
│   │   ├── button.tsx    # 按钮组件
│   │   ├── card.tsx      # 卡片组件
│   │   ├── dropdown-menu.tsx # 下拉菜单组件
│   │   ├── input.tsx     # 输入框组件
│   │   ├── table.tsx     # 表格组件
│   │   └── textarea.tsx  # 文本域组件
│   ├── ArticleEditor.js  # 文章编辑器
│   ├── ArticleList.js    # 文章列表
│   ├── Footer.js         # 页脚组件
│   ├── Layout.js         # 布局组件
│   ├── LoginModal.js     # 登录模态框
│   ├── Navigation.tsx    # 导航组件 (TypeScript)
│   ├── ResourceCard.js   # 资源卡片组件
│   ├── ResourceList.js   # 资源列表
│   ├── SitePageContent.js # 站点页面内容组件
│   ├── language-toggle.tsx # 语言切换组件
│   ├── providers.tsx     # 全局提供者组件
│   └── theme-toggle.tsx  # 主题切换组件
└── lib/                  # 工具函数和配置
    ├── auth.js           # 认证逻辑
    ├── posts.js          # 文章处理
    └── utils.ts          # 通用工具函数
```

### 各文件作用详解

#### 页面层 (app/)
- **layout.tsx**: 根布局，定义全站结构和元数据
- **page.tsx**: 首页，展示项目介绍、资源和文章列表
- **admin/**: 管理后台，用于内容管理
  - **articles/**: 文章管理页面
  - **page.js**: 管理后台首页
- **api/**: API 路由，处理认证和数据操作
  - **articles/**: 文章相关 API (创建、编辑、删除)
  - **check-auth/**: 认证状态检查 API
  - **login/**: 用户登录 API
  - **logout/**: 用户登出 API
  - **resources/**: 资源相关 API
- **login/**: 用户登录页面
  - **page.js**: 登录页面组件
- **posts/**: 文章详情和列表页面
  - **[slug]/**: 动态文章详情页
  - **page.js**: 文章列表页
- **site/**: 站点资源页面 (原 resources 页面)
  - **[slug]/**: 动态站点详情页
  - **page.tsx**: 站点列表页

#### 组件层 (components/)

##### 布局组件
- **Layout.js**: 主布局组件，包含导航和页脚
- **Navigation.tsx**: 顶部导航栏，包含菜单和用户状态 (TypeScript)
  - 支持自定义容器样式：边框、内外边距、背景色、12px圆角
  - Logo 图片显示：40px 高度，与标题间距 12px
  - Logo 文字大小调整为 24px
  - 移除 header 下划线，保持简洁外观
  - 使用 CSS 变量替代硬编码颜色值，支持主题自动适配
  - Header 固定定位：页面滚动时与顶部保持固定 24px 距离，透明背景
  - 响应式设计，支持多语言切换
  - 集成主题切换和语言切换功能
- **Footer.js**: 页脚组件，包含链接和版权信息

##### 功能组件
- **ArticleEditor.js**: 文章编辑器，支持 Markdown 编辑
- **ArticleList.js**: 文章列表展示组件
- **ResourceList.js**: 资源列表展示组件
- **ResourceCard.tsx**: 资源卡片组件，用于展示单个资源
  - 支持自定义边框样式 (border-2 border-[#1a1a1a])
  - 标题字体大小 20px，行高 32px
  - 描述文字使用半透明色彩 (#1a1a1a82)
  - Badge 组件支持透明背景和黑色边框
  - 图片高度固定为 128px
- **SitePageContent.js**: 站点页面内容组件
- **LoginModal.js**: 登录模态框组件
- **PeopleIllustration.tsx**: 首页小人插画动效组件，使用 Framer Motion 实现

##### 主题和国际化组件
- **theme-toggle.tsx**: 明暗主题切换组件
- **language-toggle.tsx**: 语言切换组件
- **providers.tsx**: 全局提供者组件，包含主题和其他上下文

##### UI 基础组件 (ui/)
- **button.tsx**: 按钮组件，支持多种变体和尺寸
- **card.tsx**: 卡片组件，包含标题、内容、页脚
- **badge.tsx**: 徽章组件，用于状态标识和分类标签
- **input.tsx**: 输入框组件
- **textarea.tsx**: 文本域组件
- **table.tsx**: 表格组件
- **dropdown-menu.tsx**: 下拉菜单组件
- **alert.tsx**: 警告提示组件

#### 工具层 (lib/)
- **utils.ts**: 通用工具函数，主要是 `cn()` 类名合并函数
- **auth.js**: 用户认证相关逻辑
- **posts.js**: 文章数据处理和 Markdown 解析

### 组件设计原则

#### 1. 组合优于继承
```jsx
// 使用 Slot 模式实现组件组合
<Button asChild>
  <Link href="/login">登录</Link>
</Button>
```

#### 2. 变体驱动设计
```jsx
// 使用 CVA 定义组件变体
const buttonVariants = cva(
  "base-styles",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        outline: "border border-input bg-background",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      },
    },
  }
)
```

#### 3. 可访问性优先
- 所有交互元素支持键盘导航
- 适当的 ARIA 标签和语义化 HTML
- 颜色对比度符合 WCAG 标准

#### 4. 响应式设计
- 移动优先的设计方法
- 使用 Tailwind 响应式前缀
- 灵活的网格和弹性布局

### 状态管理

#### 客户端状态
- **React useState**: 组件内部状态
- **SWR**: 服务端状态缓存和同步

#### 服务端状态
- **Next.js App Router**: 服务端组件和数据获取
- **GitHub API**: 内容数据源

### 性能优化策略

#### 1. 代码分割
- 动态导入非关键组件
- 路由级别的代码分割

#### 2. 图像优化
- Next.js Image 组件
- WebP 格式优先
- 懒加载实现

#### 3. 服务端渲染
- React Server Components (RSC)
- 静态生成 (SSG)
- 增量静态再生 (ISR)

#### 4. 缓存策略
- SWR 数据缓存
- 浏览器缓存优化
- CDN 静态资源缓存

## 项目更新记录

### 2025-01-28 架构重构
#### 路由结构调整
- **resources → site**: 将资源页面路由从 `/resources` 更改为 `/site`
- **动态路由优化**: 实现 `/site/[slug]` 动态详情页
- **数据结构扩展**: 为 `sitelists.json` 添加时间戳字段

#### 组件系统增强
- **新增组件**:
  - `ResourceCard.js` - 资源卡片组件
  - `SitePageContent.js` - 站点页面内容组件
  - `theme-toggle.tsx` - 主题切换组件
  - `language-toggle.tsx` - 语言切换组件
  - `providers.tsx` - 全局提供者组件
  - `badge.tsx` - 徽章 UI 组件

#### TypeScript 迁移
- **Navigation.js → Navigation.tsx**: 导航组件 TypeScript 化
- **类型安全**: 增强组件类型定义和接口

#### 主题系统
- **next-themes 集成**: 实现明暗主题切换
- **系统主题检测**: 自动适配用户系统偏好
- **无闪烁切换**: 优化主题切换体验

#### 数据管理优化
- **字段简化**: 移除 `sitelists.json` 中冗余的 `path` 字段
- **动态路径**: 通过 `slug` 字段动态构建文件路径
- **数据一致性**: 确保列表数据与详情数据的关联性

### 2025-01-31 动画系统增强
#### 动画库集成
- **Framer Motion 集成**: 新增 framer-motion@11.11.17 依赖
- **动画设计原则**: 建立性能优先、语义化的动画设计规范
- **层级管理规范**: 制定明确的 z-index 层级管理策略

#### 新增动画组件
- **PeopleIllustration.tsx**: 首页小人插画动效组件
  - 支持9个小人角色的依次出现动画
  - 从下往上的俏皮动画效果
  - 两排布局，-100px 重叠间距
  - 响应式设计，适配不同屏幕尺寸
  - 悬停交互效果和持续浮动动画
  - 智能图层层级管理，确保前排不被后排覆盖

#### 动画技术特性
- **性能优化**: 使用 transform 属性进行动画，避免重排重绘
- **时序控制**: 精确的动画延迟和持续时间控制
- **交互反馈**: 悬停时的缩放、旋转和位移效果
- **随机化**: 每个小人独特的浮动节奏，增加自然感
- **可配置性**: 动画参数易于调整和维护

#### 视觉增强
- **背景装饰**: 渐变背景光晕效果
- **阴影系统**: 微妙的底部阴影增强立体感
- **图层管理**: 使用 z-10, z-20, z-30 递进式层级
- **响应式动画**: 不同设备上的动画适配

### 2025-01-31 字段管理系统
#### 集中式字段管理
- **字段定义文件**: 创建 `/data/fields/zh/site-fields.json` 和 `/data/fields/en/site-fields.json`
- **变量化存储**: 站点数据中使用变量形式存储字段值，便于统一管理
- **多语言支持**: 中英文字段显示文本分离维护

#### 字段管理工具
- **field-utils.ts**: 新增字段管理工具函数
  - `getFieldDisplayText()`: 获取字段显示文本
  - `getFieldOptions()`: 获取字段选项列表
  - `isValidFieldKey()`: 验证字段值有效性
- **缓存机制**: 字段数据缓存，提升性能
- **类型安全**: TypeScript 类型定义，确保类型安全

#### 标准化字段
- **站点状态**: running, suspected_unmaintained, stopped
- **站点类型**: product_showcase, tool_navigation, blog_newsletter, social_platform, media, vertical_forum_community, design_platform
- **适合地区**: domestic, overseas
- **递交方式**: site_submission, submit_issue, questionnaire, site_form, email, submit_comment
- **审核耗时**: immediately, within_one_day, within_three_days, within_one_week, over_one_week
- **预计曝光**: not_disclosed, not_evaluated, within_100, within_500, within_1k, within_2k, within_10k, over_10k

#### 数据结构优化
- **sitelists.json 扩展**: 添加 status, type, region, submitMethod, reviewTime, expectedExposure 字段
- **站点详情统一**: 所有站点详情文件使用统一的字段变量
- **批量更新**: 使用脚本批量更新现有数据文件

### 2025-01-31 ResourceCard 样式优化
#### 视觉设计增强
- **边框系统**: 为 ResourceCard 添加 2px 深色边框 (#1a1a1a)
- **字体层级优化**: 
  - 标题字体调整为 20px，行高 32px，增强视觉层次
  - 描述文字使用 16px 字体，半透明色彩 (#1a1a1a82) 提升可读性
- **Badge 组件定制**: 
  - 支持透明背景 (bg-[#f1f5f900])
  - 黑色边框设计，与整体风格保持一致
  - 字体大小调整为 16px，行高 18px
- **布局微调**: 
  - 图片容器高度固定为 128px
  - CardHeader 添加 pt-2 间距优化
  - 标题容器增加 aspect-auto h-8 约束

#### 交互体验优化
- **固定间距设计**: tag 和卡片底部间距固定为 24px (pb-6)，确保布局一致性
- **简化 hover 效果**: 
  - 移除 hover 时卡片 header 的颜色变化
  - 移除 hover 时出现的箭头图标
  - 保持卡片缩放和阴影效果，提供适度的交互反馈
- **描述文字固定高度**: 设置描述文字 p 元素高度为固定的 48px (h-12)，确保卡片高度一致性
- **代码优化**: 移除不必要的 ArrowRight 图标导入，减少包体积

#### 维护便利性
- **统一修改**: 修改字段显示文本只需更新字段定义文件
- **多语言一致性**: 确保中英文字段定义的键名完全一致
- **向后兼容**: 保持现有数据结构的兼容性