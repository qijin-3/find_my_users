import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Layout } from '@/components/Layout';
import { Metadata, Viewport } from 'next';

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
 * 生成viewport配置
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
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
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://findmyusers.com';
  
  const metaData = {
    zh: {
      title: 'FindMyUsers - 独立开发者推广渠道导航站',
      description: 'FindMyUsers 是专为独立开发者打造的推广渠道导航站，持续收录并评测国内外真实、可操作的免费产品推广渠道。帮助开发者找到首批用户、验证产品可行性，轻松迈出冷启动第一步。',
      keywords: '独立开发者,产品推广,用户获取,推广渠道,产品验证,冷启动,创业工具,营销渠道'
    },
    en: {
      title: 'FindMyUsers - Promotion Channels Directory for Indie Developers',
      description: 'FindMyUsers is a curated directory of promotion channels built for indie developers. We continuously collect and review real, actionable channels to help you reach your first users, validate your product idea, and confidently take your first step out of cold start.',
      keywords: 'indie developers,product promotion,user acquisition,marketing channels,product validation,startup tools,growth hacking'
    }
  };

  const currentMeta = metaData[locale as keyof typeof metaData] || metaData.en;
  
  return {
    title: {
      default: currentMeta.title,
      template: `%s | FindMyUsers`
    },
    description: currentMeta.description,
    keywords: currentMeta.keywords,
    authors: [{ name: 'FindMyUsers Team' }],
    creator: 'FindMyUsers',
    publisher: 'FindMyUsers',
    category: 'Technology',
    classification: 'Business Directory',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      url: `${siteUrl}/${locale}`,
      siteName: 'FindMyUsers',
      title: currentMeta.title,
      description: currentMeta.description,
      images: [
        {
          url: `${siteUrl}/Screenshot/homepage_${locale}.png`,
          width: 1200,
          height: 630,
          alt: currentMeta.title,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@findmyusers',
      creator: '@findmyusers',
      title: currentMeta.title,
      description: currentMeta.description,
      images: [`${siteUrl}/Screenshot/homepage_${locale}.png`],
    },
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        'zh-CN': `${siteUrl}/zh`,
        'en-US': `${siteUrl}/en`,
        'x-default': `${siteUrl}/zh`,
      },
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
        { url: '/Logo/Logo.svg', type: 'image/svg+xml' },
      ],
      apple: [
        { url: '/Logo/Logo.svg', type: 'image/svg+xml' }
      ],
      shortcut: '/favicon.ico',
    },
    manifest: '/manifest.json',
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      yandex: process.env.YANDEX_VERIFICATION,
      other: {
        'baidu-site-verification': [process.env.BAIDU_SITE_VERIFICATION || ''],
        'msvalidate.01': [process.env.BING_SITE_VERIFICATION || ''],
      },
    },
    other: {
      'format-detection': 'telephone=no',
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