import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/providers'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

interface RootLayoutProps {
  children: React.ReactNode
}

/**
 * 根布局元数据配置
 */
export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/Logo/Logo.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/Logo/Logo.svg', type: 'image/svg+xml' }
    ]
  }
}

/**
 * 根布局组件
 * 设置全局样式和提供者，国际化处理在[locale]布局中进行
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}