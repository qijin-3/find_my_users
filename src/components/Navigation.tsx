'use client'

import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { cn } from "@/lib/utils"
import { ThemeToggle } from '@/components/theme-toggle'
import { LanguageToggle } from '@/components/language-toggle'
import Image from 'next/image'
import AnimatedText from '@/components/ui/animated-text'

/**
 * 导航组件
 * 使用next-intl进行国际化，支持多语言路由
 */
export function Navigation() {
  const t = useTranslations('navigation')
  const pathname = usePathname()

  const navItems = [
    { path: '/', label: t('home') },
    { path: '/site', label: t('site') },
    { path: '/posts', label: t('articles') },
  ]

  return (
    <header className="sticky top-6 z-40 w-full">
      <div className="container flex h-16 items-center justify-between pl-[40px] pr-[40px] ml-16 mr-16 border-2 border-border mb-6 bg-card box-content aspect-auto min-w-0 w-[auto] rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-3">
            <Image 
              src="/Logo/Logo.svg" 
              alt="FindMyUsers Logo" 
              width={40} 
              height={40}
              className="h-10 w-auto"
            />
            <AnimatedText
              text="FindMyUsers"
              className="inline-block font-bold w-[auto] text-[24px]"
              autoPlay={true}
              animateOnHover={true}
              stagger={80}
              duration={0.2}
              yOffset={-4}
            />
          </Link>
          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "flex items-center text-sm font-medium text-muted-foreground",
                  item.path === pathname && "text-foreground"
                )}
              >
                <AnimatedText
                  text={item.label}
                  className=""
                  animateOnHover={true}
                  autoPlay={false}
                  stagger={60}
                  duration={0.15}
                  yOffset={-3}
                />
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}