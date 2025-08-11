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
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
              {t('about.title')}
            </h3>
            <p className="mt-4 text-base text-muted-foreground">
              {t('about.description')}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
              {t('quickLinks.title')}
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <I18nLink href="/" className="text-base text-muted-foreground group">
                  <AnimatedText text={t('quickLinks.home')} useGroupHover />
                </I18nLink>
              </li>
              <li>
                <I18nLink href="/site" className="text-base text-muted-foreground group">
                  <AnimatedText text={t('quickLinks.site')} useGroupHover />
                </I18nLink>
              </li>
              <li>
                <I18nLink href="/posts" className="text-base text-muted-foreground group">
                  <AnimatedText text={t('quickLinks.articles')} useGroupHover />
                </I18nLink>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
              {t('connect.title')}
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="https://findmyusers.app/" target="_blank" className="text-base text-muted-foreground group">
                  <AnimatedText text="FindMyUsers" useGroupHover />
                </a>
              </li>
              <li>
                <a href="https://github.com/qiayue/findmyusers" target="_blank" className="text-base text-muted-foreground group">
                  <AnimatedText text="GitHub" useGroupHover />
                </a>
              </li>
              <li>
                <a href="https://twitter.com/gefei55" target="_blank" className="text-base text-muted-foreground group">
                  <AnimatedText text="Twitter" useGroupHover />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-secondary pt-8">
          <p className="text-base text-muted-foreground text-center">
            {t('copyright', { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}