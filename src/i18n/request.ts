import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

/**
 * next-intl服务端组件配置
 * 根据请求的locale动态加载对应的翻译文件
 */
export default getRequestConfig(async ({ requestLocale }) => {
  // 获取请求的locale，通常对应[locale]路由段
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});