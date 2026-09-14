# 技术栈文档

## 项目概述

FindMyUsers 是一个基于 Next.js 构建的开源内容站点，文章与渠道数据存放在仓库 `data/` 目录中，通过代码直接更新并部署，无需传统数据库或管理后台。

### 文章元数据同步策略（2025-08-09）
- 统一以 `data/json/articles.json` 为权威来源同步每篇文章的 `date`、`lastModified`、`description`
- 中英文描述分别绑定 `description_zh` 和 `description_en`
- 保持 ISO 8601 时间格式，便于前端格式化显示

### 内容维护方式（2026-09-14）
- 站点/文章更新：直接修改 `data/Site/`、`data/Articles/`、`data/json/` 后提交代码
- 已移除登录、管理后台、GitHub API 写入与 JWT 认证相关能力

## 核心技术栈

### 前端框架
- **Next.js 15.5.25** - React 全栈框架，支持 App Router（OpenNext Cloudflare 要求 >=15.5.24）
- **React 18** - 用户界面库
- **TypeScript 5** - 类型安全的 JavaScript 超集

### 样式和UI
- **Tailwind CSS 3.4.1** - 实用优先的 CSS 框架
- **Shadcn/ui** - 基于 Radix UI 的组件库
- **Radix UI** - 无样式、可访问的 UI 组件
  - `@radix-ui/react-dropdown-menu`
  - `@radix-ui/react-slot`
- **Phosphor Icons** - 现代图标库
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
  "@phosphor-icons/react": "^2.1.10",             // 图标库
  "@radix-ui/react-dropdown-menu": "^2.1.1",     // 下拉菜单组件
  "@radix-ui/react-slot": "^1.2.3",              // 插槽组件
  "@tailwindcss/typography": "^0.5.14",          // Tailwind 排版插件
  "@vercel/analytics": "^1.5.0",                 // 分析
  "class-variance-authority": "^0.7.0",          // 组件变体管理
  "clsx": "^2.1.1",                              // 条件类名工具
  "critters": "^0.0.23",                         // CSS 内联优化
  "framer-motion": "^11.11.17",                  // 动画库
  "gray-matter": "^4.0.3",                       // Markdown 前置数据解析
  "next": "^15.5.25",                            // Next.js 框架
  "next-intl": "^4.3.4",                         // 国际化
  "next-sitemap": "^4.2.3",                      // Sitemap 生成
  "next-themes": "^0.4.6",                       // 主题切换
  "react": "^19.3.0",                                // React 库
  "react-dom": "^19.3.0",                            // React DOM 渲染
  "remark": "^15.0.1",                           // Markdown 处理器
  "remark-html": "^16.0.1",                      // Markdown 转 HTML
  "swr": "^2.5.1",                               // 数据获取库
  "tailwind-merge": "^2.4.0",                    // Tailwind 类名合并
  "tailwindcss-animate": "^1.0.7"                // Tailwind 动画插件
}
```

### Cloudflare 部署依赖
```json
{
  "@opennextjs/cloudflare": "^1.20.6",
  "wrangler": "^4.131.1"
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
  "eslint-config-next": "^15.5.25",              // Next.js ESLint 配置
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
- [SWR 数据获取](https://swr.vercel.app/)
- [Gray Matter 文档](https://github.com/jonschlinkert/gray-matter)
- [Remark 文档](https://remark.js.org/)
- [next-intl 文档](https://next-intl.dev/)

### 开发工具
- [ESLint 文档](https://eslint.org/docs/latest/)
- [PostCSS 文档](https://postcss.org/)
- [Autoprefixer 文档](https://github.com/postcss/autoprefixer)

## 首选的库和工具

### 数据获取和状态管理
- **SWR** - 客户端字段数据获取、缓存和同步
- **仓库内 data/** - 作为内容存储（构建时读取）

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
- 使用仓库内 Markdown / JSON 作为内容存储
- 通过代码提交更新站点与文章
- 保留只读 `/api/fields` 供前端筛选使用

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

### 内容数据打包（Cloudflare 必需）
- `scripts/generate-content-modules.cjs` 在 `prebuild`/`postinstall` 将 `data/` 生成到 `src/lib/generated/`
- 页面数据读取走静态模块，避免 Workers 运行时 `fs` 失败导致列表为空

### Cloudflare 部署注意
- Next.js 版本需 **>= 15.5.24**（OpenNext Cloudflare peer；Next 14 已结束官方支持期）
- 配置文件：`wrangler.jsonc`、`open-next.config.ts`
- **Workers Builds**：即使 Deploy command 仍是 `npx wrangler deploy`，`postinstall` 会安装 shim，自动先跑 OpenNext build 再 deploy
- 推荐仍将 Deploy command 设为 `npm run deploy`（更直观）；Build command 可留空
- 若构建卡在 esbuild/workerd：在 Cloudflare Build 设置中允许相关 install scripts

### 环境要求
- Node.js 18+
- npm
- Git
