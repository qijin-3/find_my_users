import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

/**
 * 将统一格式转换为语言特定格式
 * @param unifiedData - 统一格式的字段数据
 * @param locale - 目标语言环境
 * @returns 转换后的语言特定格式数据
 */
function transformUnifiedToLocaleFormat(unifiedData: any, locale: string) {
  const result: any = {}
  
  for (const [fieldType, fieldValues] of Object.entries(unifiedData)) {
    result[fieldType] = {}
    
    for (const [key, translations] of Object.entries(fieldValues as any)) {
      // 优先使用指定语言，fallback到中文
      const translationObj = translations as { [key: string]: string }
      result[fieldType][key] = translationObj[locale] || translationObj['zh']
    }
  }
  
  return result
}

// 预生成所有语言的数据
const PREGENERATED_DATA: { [key: string]: any } = {}

// 在模块加载时预生成数据
try {
  const filePath = path.join(process.cwd(), 'data', 'json', 'site-fields.json')
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const unifiedFieldsData = JSON.parse(fileContent)
  
  // 为每种语言预生成数据
  PREGENERATED_DATA['zh'] = transformUnifiedToLocaleFormat(unifiedFieldsData, 'zh')
  PREGENERATED_DATA['en'] = transformUnifiedToLocaleFormat(unifiedFieldsData, 'en')
} catch (error) {
  console.error('Failed to pregenerate fields data:', error)
}

/**
 * 获取字段映射数据的 API 路由
 * 支持通过查询参数指定语言环境
 * @param request - Next.js 请求对象
 * @returns 字段映射数据的 JSON 响应
 */
export async function GET(request: NextRequest) {
  try {
    // 从查询参数中获取语言环境，默认为中文
    const url = new URL(request.url)
    const locale = url.searchParams.get('locale') || 'zh'
    
    // 使用预生成的数据
    const data = PREGENERATED_DATA[locale] || PREGENERATED_DATA['zh']
    
    if (!data) {
      throw new Error('No data available')
    }
    
    return NextResponse.json(data, {
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

// 配置路由段选项
export const dynamic = 'force-static' // 强制静态生成
export const revalidate = 3600 // 每小时重新验证一次