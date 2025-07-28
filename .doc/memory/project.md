# 项目偏好和自定义规则

## 项目概述
GitBase 是一个基于 Next.js 和 GitHub API 构建的开源动态网站，无需传统数据库。项目采用现代化的技术栈和设计系统。

## 技术栈偏好

### 核心框架
- **Next.js 14.2.5** - 优先使用 App Router 架构
- **React 18** - 使用 React Server Components (RSC)
- **TypeScript 5** - 所有代码必须使用 TypeScript，不使用 JavaScript

### 样式和UI偏好
- **Tailwind CSS 3.4.1** - 优先使用实用优先的 CSS 框架
- **Shadcn/ui** - 主要 UI 组件库，基于 Radix UI
- **Lucide React** - 图标库首选
- **Inter 字体** - 全站统一使用 Google Fonts 的 Inter 字体

### 包管理器偏好
- **npm** - 优先使用 npm 而非 yarn 或 pnpm
- 使用 package-lock.json 锁定依赖版本

### 代码风格偏好
- **函数级注释** - 所有函数必须添加详细注释
- **TypeScript 严格模式** - 启用严格类型检查
- **ESLint** - 使用 Next.js 官方 ESLint 配置
- **语义化命名** - 使用清晰、描述性的变量和函数名

## 架构偏好

### 目录结构规范
```
src/
├── app/                    # Next.js App Router 页面
├── components/            # 可复用组件
│   └── ui/               # Shadcn/ui 基础组件
└── lib/                  # 工具函数和配置
```

### 组件设计原则
- **组合优于继承** - 使用 Slot 模式实现组件组合
- **变体驱动设计** - 使用 CVA (Class Variance Authority) 定义组件变体
- **可访问性优先** - 所有组件必须支持键盘导航和 ARIA 标签
- **响应式设计** - 移动优先的设计方法

### 状态管理偏好
- **SWR** - 优先使用 SWR 进行数据获取和缓存
- **React useState** - 组件内部状态管理
- **避免复杂状态管理库** - 不使用 Redux、Zustand 等

## 数据管理偏好

### 内容存储
- **GitHub 作为 CMS** - 使用 GitHub API 进行内容管理
- **Markdown 格式** - 所有文章和内容使用 Markdown
- **JSON 配置** - 使用 JSON 文件存储配置和元数据

### API 设计
- **RESTful API** - 使用 Next.js API Routes
- **JWT 认证** - 使用 JSON Web Token 进行用户认证
- **Cookie 会话管理** - 使用 Cookie 进行会话管理

## 开发工具偏好

### 代码质量
- **ESLint** - 代码检查工具
- **TypeScript** - 类型安全检查
- **Prettier** - 代码格式化（如果需要）

### 构建和部署
- **Vercel** - 优先部署平台
- **环境变量** - 使用 .env.local 管理敏感信息
- **自动部署** - 连接 GitHub 实现自动部署

## 性能优化偏好

### 渲染策略
- **静态生成 (SSG)** - 优先使用静态生成
- **服务端渲染 (SSR)** - 动态内容使用 SSR
- **增量静态再生 (ISR)** - 适当使用 ISR

### 资源优化
- **Next.js Image** - 图像优化
- **代码分割** - 路由级别的代码分割
- **Tree Shaking** - 移除未使用的代码

## 安全偏好

### 认证和授权
- **JWT Token** - 用户认证
- **环境变量保护** - 敏感信息不提交到代码库
- **HTTPS** - 生产环境强制使用 HTTPS

### 数据保护
- **输入验证** - 所有用户输入必须验证
- **XSS 防护** - 防止跨站脚本攻击
- **CSRF 保护** - 防止跨站请求伪造

## 文档偏好

### 代码文档
- **函数注释** - 所有函数必须有详细注释
- **类型定义** - 复杂类型必须有注释说明
- **README 更新** - 重大变更需要更新 README

### 项目文档
- **技术栈文档** - 维护 technologyStack.md
- **前端设计文档** - 维护 frontEnd.md
- **API 文档** - 记录所有 API 端点

## 测试偏好

### 测试策略
- **组件测试** - 重要组件需要测试
- **API 测试** - 关键 API 端点需要测试
- **端到端测试** - 核心用户流程需要 E2E 测试

## 版本控制偏好

### Git 工作流
- **功能分支** - 每个功能使用独立分支
- **清晰提交信息** - 使用描述性的提交信息
- **代码审查** - 重要变更需要代码审查

### 发布管理
- **语义化版本** - 使用语义化版本号
- **变更日志** - 维护 CHANGELOG.md
- **标签管理** - 重要版本打标签