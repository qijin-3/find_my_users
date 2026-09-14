import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

// 创建 next-intl 中间件
const handleI18nRouting = createMiddleware(routing);

/**
 * 全局中间件：处理根路径语言重定向与 i18n 路由
 * @param {import('next/server').NextRequest} request - 入站请求
 * @returns {import('next/server').NextResponse} 重定向或 i18n 处理后的响应
 */
export function middleware(request) {
  const path = request.nextUrl.pathname;
  
  // 处理根路径的重定向
  if (path === '/') {
    // 获取Accept-Language头来检测用户语言偏好
    const acceptLanguage = request.headers.get('accept-language') || '';
    
    // 检测是否偏好中文
    const prefersChinese = acceptLanguage.includes('zh') || 
                          acceptLanguage.includes('CN') || 
                          acceptLanguage.includes('TW') || 
                          acceptLanguage.includes('HK');
    
    // 选择目标语言
    const targetLocale = prefersChinese ? 'zh' : 'en';
    
    // 服务器端重定向到对应语言版本
    return NextResponse.redirect(new URL(`/${targetLocale}`, request.url));
  }

  // 应用 i18n 路由处理
  return handleI18nRouting(request);
}

export const config = {
  matcher: [
    // 匹配所有路径，包括根路径
    '/',
    // 匹配所有其他路径，除了以下路径：
    // - 以 /api, /_next, /_vercel 开头的路径
    // - 包含点号的路径 (如 favicon.ico)
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ],
};
