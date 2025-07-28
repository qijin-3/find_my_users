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