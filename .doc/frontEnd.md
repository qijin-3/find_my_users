# 前端设计系统文档

## 项目概述
GitBase 前端采用现代化的设计系统，基于 Shadcn/ui 组件库和 Tailwind CSS，提供一致性和可维护性的用户界面。

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

## 图标集

### 主要图标库
- **Lucide React** (v0.427.0)
  - 现代、一致的图标设计
  - 轻量级 SVG 图标
  - 完全可定制
  - 支持 Tree Shaking

### 图标使用示例
```jsx
import { Github, Menu, X, ChevronDown } from 'lucide-react'

// 基础使用
<Github className="h-5 w-5" />

// 带样式
<Menu className="h-6 w-6 text-muted-foreground hover:text-foreground" />
```

### 常用图标
- **Github** - GitHub 链接
- **Menu** - 移动端菜单
- **ChevronDown** - 下拉指示器
- **X** - 关闭按钮

## 前端架构

### 目录结构
```
src/
├── app/                    # Next.js App Router 页面
│   ├── admin/             # 管理后台页面
│   ├── api/               # API 路由
│   ├── login/             # 登录页面
│   ├── posts/             # 文章页面
│   ├── resources/         # 资源页面
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局组件
│   └── page.tsx           # 首页
├── components/            # 可复用组件
│   ├── ui/               # Shadcn/ui 基础组件
│   ├── ArticleEditor.js  # 文章编辑器
│   ├── ArticleList.js    # 文章列表
│   ├── Footer.js         # 页脚组件
│   ├── Layout.js         # 布局组件
│   ├── LoginModal.js     # 登录模态框
│   ├── Navigation.js     # 导航组件
│   └── ResourceList.js   # 资源列表
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
- **api/**: API 路由，处理认证和数据操作
- **login/**: 用户登录页面
- **posts/**: 文章详情和列表页面
- **resources/**: 资源页面

#### 组件层 (components/)

##### 布局组件
- **Layout.js**: 主布局组件，包含导航和页脚
- **Navigation.js**: 顶部导航栏，包含菜单和用户状态
- **Footer.js**: 页脚组件，包含链接和版权信息

##### 功能组件
- **ArticleEditor.js**: 文章编辑器，支持 Markdown 编辑
- **ArticleList.js**: 文章列表展示组件
- **ResourceList.js**: 资源列表展示组件
- **LoginModal.js**: 登录模态框组件

##### UI 基础组件 (ui/)
- **button.tsx**: 按钮组件，支持多种变体和尺寸
- **card.tsx**: 卡片组件，包含标题、内容、页脚
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