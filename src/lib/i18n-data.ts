import { sitelists, sitesBySlug } from '@/lib/generated/sites'
import { articlesMeta, articlesByLocale } from '@/lib/generated/articles'

type Locale = 'zh' | 'en'

/**
 * 规范化语言代码
 * @param locale - 原始语言代码
 * @returns zh | en
 */
function normalizeLocale(locale: string = 'zh'): Locale {
  return locale === 'en' ? 'en' : 'zh'
}

/**
 * 获取多语言 JSON 列表数据（兼容旧接口）
 * @param filename - JSON 文件名
 * @param locale - 语言代码
 * @returns 列表或对象
 */
export function getI18nJsonData(filename: string, locale: string = 'zh'): any {
  try {
    if (filename === 'sitelists.json') {
      const loc = normalizeLocale(locale)
      return sitelists.map((item) => ({
        ...item,
        name: loc === 'en' ? item.name_en : item.name_zh,
      }))
    }

    if (filename === 'articles.json') {
      const loc = normalizeLocale(locale)
      return articlesMeta.map((item) => ({
        title: loc === 'en' ? item.title_en : item.title_zh,
        description: loc === 'en' ? item.description_en : item.description_zh,
        date: item.date,
        lastModified: item.lastModified,
        slug: item.slug,
        hasEnglish: true,
      }))
    }

    return filename.includes('lists') ? [] : {}
  } catch (error) {
    console.error(`Error reading ${filename} for locale ${locale}:`, error)
    return filename.includes('lists') ? [] : {}
  }
}

/**
 * 根据 slug 获取文章元数据
 * @param slug - 文章 slug
 * @param locale - 语言代码
 * @returns 文章元数据或 null
 */
export function getI18nArticleMeta(slug: string, locale: string = 'zh') {
  try {
    const item = articlesMeta.find((it) => it.slug === slug)
    if (!item) return null
    const loc = normalizeLocale(locale)
    return {
      title: (loc === 'en' ? item.title_en : item.title_zh) || slug,
      description: (loc === 'en' ? item.description_en : item.description_zh) || '',
      date: item.date || undefined,
      lastModified: item.lastModified || undefined,
      slug: item.slug,
    }
  } catch (error) {
    console.error(`Error reading article meta for ${slug} (${locale})`, error)
    return null
  }
}

/**
 * 获取多语言文章正文数据
 * @param slug - 文章 slug
 * @param locale - 语言代码
 * @returns 文章数据对象
 */
export function getI18nArticle(slug: string, locale: string = 'zh'): any {
  try {
    const loc = normalizeLocale(locale)
    const localeBucket = articlesByLocale[loc] as Record<string, { data: Record<string, unknown>; content: string }>
    const localeArticle = localeBucket[slug]
    if (localeArticle) {
      return {
        ...localeArticle.data,
        content: localeArticle.content,
        locale: loc,
        slug,
      }
    }

    const fallbackBucket = articlesByLocale.zh as Record<string, { data: Record<string, unknown>; content: string }>
    const fallback = fallbackBucket[slug]
    if (fallback) {
      return {
        ...fallback.data,
        content: fallback.content,
        locale: 'zh',
        slug,
      }
    }

    return null
  } catch (error) {
    console.error(`Error reading article ${slug} for locale ${locale}:`, error)
    return null
  }
}

/**
 * 获取站点详情数据
 * @param slug - 站点标识符
 * @param locale - 语言代码
 * @returns 站点详情或 null
 */
export async function getI18nSiteData(slug: string, locale: string): Promise<any> {
  try {
    const data = (sitesBySlug as Record<string, any>)[slug]
    if (!data) return null

    const loc = normalizeLocale(locale)
    return {
      name: loc === 'zh' ? data.name_zh : data.name_en,
      description: loc === 'zh' ? data.description_zh : data.description_en,
      submitRequirements: loc === 'zh' ? data.submitRequirements_zh : data.submitRequirements_en,
      rating: loc === 'zh' ? data.rating_zh : data.rating_en,
      screenshot: data.screenshot,
      status: data.status,
      type: data.type,
      region: data.region,
      url: data.url,
      submitMethod: data.submitMethod,
      submitUrl: data.submitUrl,
      review: data.review,
      reviewTime: data.reviewTime,
      expectedExposure: data.expectedExposure,
    }
  } catch (error) {
    console.error(`Error loading site data for ${slug}:`, error)
    return null
  }
}

/**
 * 获取指定语言的所有文章列表
 * @param locale - 语言代码
 * @returns 文章列表
 */
export function getI18nArticlesList(locale: string = 'zh'): any[] {
  try {
    const loc = normalizeLocale(locale)
    return articlesMeta.map((articleMeta) => {
      const fullArticle = getI18nArticle(articleMeta.slug, loc)
      const title = loc === 'en' ? articleMeta.title_en : articleMeta.title_zh
      const description = loc === 'en' ? articleMeta.description_en : articleMeta.description_zh

      if (fullArticle) {
        return {
          ...fullArticle,
          title,
          description,
          date: articleMeta.date,
          lastModified: articleMeta.lastModified,
          slug: articleMeta.slug,
          hasEnglish: true,
        }
      }

      return {
        title,
        description,
        date: articleMeta.date,
        lastModified: articleMeta.lastModified,
        slug: articleMeta.slug,
        hasEnglish: true,
        content: '',
        locale: loc,
      }
    })
  } catch (error) {
    console.error(`Error getting articles list for locale ${locale}:`, error)
    return []
  }
}

/**
 * 获取指定语言的完整站点列表
 * @param locale - 语言代码
 * @returns 站点列表
 */
export async function getI18nSitesList(locale: string = 'zh'): Promise<any[]> {
  try {
    const loc = normalizeLocale(locale)
    const sites = await Promise.all(
      sitelists.map(async (siteMeta) => {
        const siteDetails = await getI18nSiteData(siteMeta.slug, loc)
        const name = loc === 'en' ? siteMeta.name_en : siteMeta.name_zh

        if (siteDetails) {
          return {
            ...siteDetails,
            name: name || siteDetails.name,
            date: siteMeta.date,
            lastModified: siteMeta.lastModified,
            slug: siteMeta.slug,
          }
        }

        return {
          name,
          slug: siteMeta.slug,
          date: siteMeta.date,
          lastModified: siteMeta.lastModified,
          description: '',
          url: '',
          category: '',
          status: '',
          type: '',
          region: '',
          submitMethod: '',
          reviewTime: '',
          expectedExposure: '',
        }
      })
    )

    return sites.filter(Boolean)
  } catch (error) {
    console.error(`Error getting sites list for locale ${locale}:`, error)
    return []
  }
}
