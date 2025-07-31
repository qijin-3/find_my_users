import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

/**
 * 创建国际化导航API
 * 这些是Next.js原生导航API的轻量级包装器，自动处理locale相关的路由
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);