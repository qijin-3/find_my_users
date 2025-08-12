'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

/**
 * 根页面组件 - 自动重定向到相应的语言版本
 */
export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    // 获取浏览器语言设置
    const browserLanguage = navigator.language || navigator.languages?.[0] || 'zh'
    
    // 判断是否为中文（包括各种中文变体）
    const isChinese = browserLanguage.startsWith('zh') || 
                     browserLanguage.includes('CN') || 
                     browserLanguage.includes('TW') || 
                     browserLanguage.includes('HK')
    
    // 选择目标语言
    const targetLocale = isChinese ? 'zh' : 'en'
    
    console.log('Browser language:', browserLanguage, 'Redirecting to:', targetLocale)
    
    // 重定向到相应的语言版本
    router.replace(`/${targetLocale}`)
  }, [router])

  // 显示简单的加载状态
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <div className="space-y-2">
          <p className="text-muted-foreground">正在跳转到您的语言版本...</p>
          <p className="text-sm text-muted-foreground">Redirecting to your language version...</p>
        </div>
      </div>
    </div>
  )
}
