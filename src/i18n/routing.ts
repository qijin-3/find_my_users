import { defineRouting } from 'next-intl/routing';

/**
 * 定义next-intl路由配置
 * 支持中文（zh）和英文（en）两种语言
 */
export const routing = defineRouting({
  // 支持的语言列表
  locales: ['zh', 'en'],

  // 默认语言（当没有匹配的语言时使用）
  defaultLocale: 'zh',

  // 路径前缀策略 - 'always' 表示所有路径都带语言前缀
  localePrefix: 'always'
});