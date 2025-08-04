import { NextRequest, NextResponse } from 'next/server'
import { getI18nJsonData } from '@/lib/i18n-data'

/**
 * 获取字段映射数据的 API 路由
 * 支持通过查询参数指定语言环境
 * @param request - Next.js 请求对象
 * @returns 字段映射数据的 JSON 响应
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const locale = searchParams.get('locale') || 'zh'
    
    // 从 JSON 文件获取字段映射数据
    const fieldsData = getI18nJsonData('site-fields.json', locale)
    
    return NextResponse.json(fieldsData, {
      headers: {
        'Cache-Control': 'public, max-age=3600', // 缓存1小时
      },
    })
  } catch (error) {
    console.error('Failed to load fields data:', error)
    return NextResponse.json(
      { error: 'Failed to load fields data' },
      { status: 500 }
    )
  }
}