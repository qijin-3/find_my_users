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
    
    // 直接读取 site-fields.json 文件
    const filePath = path.join(process.cwd(), 'data', 'json', 'site-fields.json')
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const unifiedFieldsData = JSON.parse(fileContent)
    
    // 转换为当前API期望的格式
    const transformedData = transformUnifiedToLocaleFormat(unifiedFieldsData, locale)
    
    return NextResponse.json(transformedData, {
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