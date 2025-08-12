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
    <header className="sticky top-6 z-40 w-full px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex h-16 items-center justify-between border-2 border-border bg-card rounded-xl px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex items-center gap-4 sm:gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-3 group shrink-0">
              <Image 
                src="/Logo/Logo.svg" 
                alt="FindMyUsers Logo" 
                width={40} 
                height={40}
                className="h-8 w-8 sm:h-10 sm:w-10"
              />
              <AnimatedText
                text="FindMyUsers"
                className="hidden sm:inline-block font-bold text-lg sm:text-xl lg:text-2xl"
                autoPlay={false}
                animateOnHover={false}
                useGroupHover={true}
                stagger={80}
                duration={0.2}
                yOffset={-4}
              />
            </Link>
            <nav className="hidden md:flex items-center gap-4 lg:gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                    item.path === pathname && "text-foreground"
                  )}
                >
                  <AnimatedText
                    text={item.label}
                    className="whitespace-nowrap"
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
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}