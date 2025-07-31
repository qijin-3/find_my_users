import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { verifyToken } from './src/lib/auth';
import { routing } from './src/i18n/routing';

// 创建next-intl中间件
const handleI18nRouting = createMiddleware(routing);

export function middleware(request) {
  const path = request.nextUrl.pathname;

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
    // 匹配所有路径，除了以下路径：
    // - 以 /api, /_next, /_vercel 开头的路径
    // - 包含点号的路径 (如 favicon.ico)
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ],
};