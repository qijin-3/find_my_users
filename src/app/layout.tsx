import './globals.css'
import { Inter } from 'next/font/google'
import { Layout } from '@/components/Layout'
import { Providers } from '@/components/providers'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: {
    default: 'FindMyUsers',
    template: '%s | FindMyUsers'
  },
  description: 'Open source dynamic website without database, built with Next.js and GitHub API',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  )
}