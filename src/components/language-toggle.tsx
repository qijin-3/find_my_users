'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { Globe } from 'lucide-react'

/**
 * 语言切换组件
 * 使用next-intl的路由系统进行语言切换
 */
export function LanguageToggle() {
  const t = useTranslations('language')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  /**
   * 切换语言
   * 保持当前页面路径，只改变语言前缀
   */
  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'zh' : 'en'
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="h-9 px-2 text-sm font-medium"
      aria-label={`Switch to ${locale === 'en' ? 'Chinese' : 'English'}`}
    >
      <Globe className="h-[1.2rem] w-[1.2rem] mr-1" />
      {locale === 'en' ? t('chinese') : t('english')}
    </Button>
  )
}