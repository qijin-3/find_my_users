import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Layout } from '@/components/Layout';
import { Metadata } from 'next';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

/**
 * 生成静态参数，用于构建时预生成所有locale路由
 */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * 生成页面元数据，支持多语言
 */
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: {
      default: 'FindMyUsers',
      template: '%s | FindMyUsers'
    },
    description: locale === 'zh' 
      ? '基于 Next.js 和 GitHub API 构建的无数据库开源动态网站'
      : 'Open source dynamic website without database, built with Next.js and GitHub API',
    other: {
      'og:locale': locale === 'zh' ? 'zh_CN' : 'en_US',
    }
  };
}

/**
 * Locale Layout组件
 * 处理locale参数，验证locale有效性，并设置国际化上下文
 */
export default async function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
  // 确保传入的locale是有效的
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // 启用静态渲染
  setRequestLocale(locale);

  return (
    <NextIntlClientProvider>
      <Layout>{children}</Layout>
    </NextIntlClientProvider>
  );
}