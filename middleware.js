import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { verifyToken } from './src/lib/auth';
import { routing } from './src/i18n/routing';

// 创建next-intl中间件
const handleI18nRouting = createMiddleware(routing);

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

  // 检查是否是需要认证的路径（处理带locale前缀的路径）
  const isAdminPath = path.match(/^\/[a-z]{2}\/admin/) || path.startsWith('/admin');
  const isLoginPath = path.match(/^\/[a-z]{2}\/login/) || path.startsWith('/login');

  if (isAdminPath) {
    const token = request.cookies.get('auth_token')?.value;
    const isLoggedIn = token && verifyToken(token);

    if (!isLoggedIn) {
      // 获取当前locale
      const locale = path.match(/^\/([a-z]{2})\//)?.[1] || routing.defaultLocale;
      // 重定向到对应语言的登录页面
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }
  }

  // 应用i18n路由处理
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