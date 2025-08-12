// components/Footer.tsx
'use client'

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Link as I18nLink } from '@/i18n/navigation';
import AnimatedText from '@/components/ui/animated-text';

/**
 * Footer组件 - 网站底部组件
 * 提供网站信息、快速链接和联系方式
 * 支持国际化显示
 */
export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-secondary">
      <div className="max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
              {t('about.title')}
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              {t('about.description')}
            </p>
          </div>
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
              {t('quickLinks.title')}
            </h3>
            <ul className="space-y-6">
              <li>
                <a href="https://links.haoyou.tech" target="_blank" rel="noopener noreferrer" className="text-base text-muted-foreground group">
                  <AnimatedText text={t('quickLinks.haoyoulink')} useGroupHover />
                </a>
              </li>
              <li>
                <a href="https://gitbase.app" target="_blank" rel="noopener noreferrer" className="text-base text-muted-foreground group">
                  <AnimatedText text={t('quickLinks.gitbase')} useGroupHover />
                </a>
              </li>
              
            </ul>
          </div>
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
              {t('connect.title')}
            </h3>
            <ul className="space-y-6">
              <li>
                <a href="https://www.xiaohongshu.com/user/profile/662cf72e0000000003032c9f" target="_blank" className="text-base text-muted-foreground group">
                  <AnimatedText text="小红书" useGroupHover />
                </a>
              </li>
              <li>
                <a href="https://github.com/qijin-3/find_my_users" target="_blank" className="text-base text-muted-foreground group">
                  <AnimatedText text="GitHub" useGroupHover />
                </a>
              </li>
              <li>
                <a href="https://x.com/qi_jin33" target="_blank" className="text-base text-muted-foreground group">
                  <AnimatedText text="X" useGroupHover />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-secondary pt-12">
          <p className="text-base text-muted-foreground text-center">
            {t('copyright', { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}