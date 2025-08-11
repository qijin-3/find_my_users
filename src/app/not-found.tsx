'use client'

import Link from 'next/link'

/**
 * 404 页面组件
 * 当用户访问不存在的页面时显示
 */
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-muted-foreground mb-6">
          页面未找到
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          抱歉，您访问的页面不存在或已被移动。
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          返回首页
        </Link>
      </div>
    </div>
  )
}