import { redirect } from 'next/navigation'

/**
 * 根页面组件 - 重定向到默认语言版本
 * 注意：正常情况下中间件会处理重定向，这个组件作为备用方案
 */
export default function RootPage() {
  // 如果用户直接访问到这个页面（中间件未生效），重定向到默认语言
  redirect('/zh')
}
