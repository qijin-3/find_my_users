# 技术栈文档

## 项目概述

FindMyUsers 是一个基于 Next.js 和 GitHub API 构建的开源动态网站，无需传统数据库。

## 核心技术栈

### 前端框架
- **Next.js 14.2.5** - React 全栈框架，支持 App Router
- **React 18** - 用户界面库
- **TypeScript 5** - 类型安全的 JavaScript 超集

### 样式和UI
- **Tailwind CSS 3.4.1** - 实用优先的 CSS 框架
- **Shadcn/ui** - 基于 Radix UI 的组件库
- **Radix UI** - 无样式、可访问的 UI 组件
  - `@radix-ui/react-dropdown-menu`
  - `@radix-ui/react-slot`
- **Lucide React** - 现代图标库
- **Framer Motion** - 生产级动画库
- **Class Variance Authority (CVA)** - 组件变体管理
- **Tailwind Merge** - Tailwind 类名合并工具
- **CLSX** - 条件类名工具

### 字体
- **Inter** - Google Fonts 提供的现代无衬线字体

## 所有软件包和依赖项

### 生产依赖 (dependencies)
```json
{
  "@octokit/rest": "^21.0.1",                    // GitHub API 客户端
  "@radix-ui/react-dropdown-menu": "^2.1.1",     // 下拉菜单组件
  "@radix-ui/react-slot": "^1.1.0",              // 插槽组件
  "@tailwindcss/typography": "^0.5.14",          // Tailwind 排版插件
  "class-variance-authority": "^0.7.0",          // 组件变体管理
  "clsx": "^2.1.1",                              // 条件类名工具
  "cookie": "^0.6.0",                            // Cookie 处理
  "framer-motion": "^11.11.17",                  // 动画库
  "gray-matter": "^4.0.3",                       // Markdown 前置数据解析
  "jsonwebtoken": "^9.0.2",                      // JWT 令牌处理
  "@phosphor-icons/react": "^2.1.7",              // 图标库
  "next": "14.2.5",                              // Next.js 框架
  "react": "^18",                                // React 库
  "react-dom": "^18",                            // React DOM 渲染
  "remark": "^15.0.1",                           // Markdown 处理器
  "remark-html": "^16.0.1",                      // Markdown 转 HTML
  "swr": "^2.2.5",                               // 数据获取库
  "tailwind-merge": "^2.4.0",                    // Tailwind 类名合并
  "tailwindcss-animate": "^1.0.7"                // Tailwind 动画插件
}
```

### 开发依赖 (devDependencies)
```json
{
  "@eslint/js": "^9.9.0",                        // ESLint 核心
  "@types/node": "^20",                          // Node.js 类型定义
  "@types/react": "^18",                         // React 类型定义
  "@types/react-dom": "^18",                     // React DOM 类型定义
  "autoprefixer": "^10.4.20",                    // CSS 自动前缀
  "eslint": "^8.57.0",                           // 代码检查工具
  "eslint-config-next": "14.2.5",                // Next.js ESLint 配置
  "eslint-plugin-react": "^7.35.0",              // React ESLint 插件
  "globals": "^15.9.0",                          // 全局变量定义
  "postcss": "^8.4.41",                          // CSS 后处理器
  "tailwindcss": "^3.4.1",                       // Tailwind CSS
  "typescript": "^5",                            // TypeScript 编译器
  "typescript-eslint": "^8.0.1"                  // TypeScript ESLint
}
```

## API 文档链接

### 核心框架和库
- [Next.js 官方文档](https://nextjs.org/docs)
- [React 官方文档](https://react.dev/)
- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)

### UI 和样式
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [Shadcn/ui 组件文档](https://ui.shadcn.com/)
- [Radix UI 文档](https://www.radix-ui.com/primitives/docs/overview/introduction)
- [Phosphor Icons React](https://phosphoricons.com/) - 现代化的图标库
- [Framer Motion 文档](https://www.framer.com/motion/)

### 工具和实用程序
- [GitHub Octokit REST API](https://octokit.github.io/rest.js/v21)
- [SWR 数据获取](https://swr.vercel.app/)
- [Gray Matter 文档](https://github.com/jonschlinkert/gray-matter)
- [Remark 文档](https://remark.js.org/)
- [JSON Web Token](https://github.com/auth0/node-jsonwebtoken)

### 开发工具
- [ESLint 文档](https://eslint.org/docs/latest/)
- [PostCSS 文档](https://postcss.org/)
- [Autoprefixer 文档](https://github.com/postcss/autoprefixer)

## 首选的库和工具

### 认证和授权
- **JSON Web Token (JWT)** - 用于用户认证
- **Cookie** - 会话管理

### 数据获取和状态管理
- **SWR** - 数据获取、缓存和同步
- **GitHub API (@octokit/rest)** - 作为内容管理系统

### 内容管理
- **Gray Matter** - Markdown 文件前置数据处理
- **Remark** - Markdown 内容处理和转换
- **Remark HTML** - Markdown 转 HTML

### 开发体验
- **TypeScript** - 类型安全
- **ESLint** - 代码质量检查
- **Tailwind CSS** - 快速样式开发
- **Hot Reload** - Next.js 开发服务器

## 架构特点

### 无数据库设计
- 使用 GitHub 仓库作为内容存储
- Markdown 文件作为数据源
- JSON 文件用于配置和元数据

### 现代化开发栈
- React Server Components (RSC) 优先
- App Router 架构
- TypeScript 全覆盖
- 响应式设计

### 性能优化
- 静态生成 (SSG)
- 服务端渲染 (SSR)
- 图像优化
- 代码分割

## 部署和构建

### 构建命令
```bash
npm run build    # 生产构建
npm run dev      # 开发服务器
npm run start    # 生产服务器
npm run lint     # 代码检查
```

### 环境要求
- Node.js 18+
- npm 或 yarn
- Git (用于内容管理)