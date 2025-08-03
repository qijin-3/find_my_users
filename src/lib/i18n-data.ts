import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * 获取多语言JSON数据
 * 如果指定语言的文件不存在，则fallback到中文版本
 * @param filename - JSON文件名（如 'sitelists.json'）
 * @param locale - 语言代码（'zh' 或 'en'）
 * @returns 解析后的JSON数据
 */
export function getI18nJsonData(filename: string, locale: string = 'zh'): any {
  try {
    // 首先尝试获取指定语言的文件
    const localePath = path.join(process.cwd(), 'data', 'json', locale, filename);
    
    if (fs.existsSync(localePath)) {
      const content = fs.readFileSync(localePath, 'utf8');
      return JSON.parse(content);
    }
    
    // 如果指定语言文件不存在，fallback到中文版本
    const fallbackPath = path.join(process.cwd(), 'data', 'json', 'zh', filename);
    
    if (fs.existsSync(fallbackPath)) {
      const content = fs.readFileSync(fallbackPath, 'utf8');
      return JSON.parse(content);
    }
    
    // 如果都不存在，返回空数组或空对象
    return filename.includes('lists') ? [] : {};
  } catch (error) {
    console.error(`Error reading ${filename} for locale ${locale}:`, error);
    return filename.includes('lists') ? [] : {};
  }
}

/**
 * 获取多语言文章数据
 * 如果指定语言的文章不存在，则fallback到中文版本
 * @param slug - 文章slug
 * @param locale - 语言代码（'zh' 或 'en'）
 * @returns 文章数据对象，包含frontmatter和内容
 */
export function getI18nArticle(slug: string, locale: string = 'zh'): any {
  try {
    // 首先尝试获取指定语言的文章
    const localePath = path.join(process.cwd(), 'data', 'Articles', locale, `${slug}.md`);
    
    if (fs.existsSync(localePath)) {
      const content = fs.readFileSync(localePath, 'utf8');
      const { data, content: articleContent } = matter(content);
      return {
        ...data,
        content: articleContent,
        locale: locale,
        slug: slug
      };
    }
    
    // 如果指定语言文章不存在，fallback到中文版本
    const fallbackPath = path.join(process.cwd(), 'data', 'Articles', 'zh', `${slug}.md`);
    
    if (fs.existsSync(fallbackPath)) {
      const content = fs.readFileSync(fallbackPath, 'utf8');
      const { data, content: articleContent } = matter(content);
      return {
        ...data,
        content: articleContent,
        locale: 'zh', // 标记实际使用的语言
        slug: slug
      };
    }
    
    return null;
  } catch (error) {
    console.error(`Error reading article ${slug} for locale ${locale}:`, error);
    return null;
  }
}

/**
 * 获取多语言站点详情数据
 * 如果指定语言的站点详情不存在，则fallback到中文版本
 * @param slug - 站点slug
 * @param locale - 语言代码（'zh' 或 'en'）
 * @returns 站点详情数据
 */
export function getI18nSiteData(slug: string, locale: string = 'zh'): any {
  try {
    // 首先尝试获取指定语言的站点详情
    const localePath = path.join(process.cwd(), 'data', 'Site', locale, `${slug}.json`);
    
    if (fs.existsSync(localePath)) {
      const content = fs.readFileSync(localePath, 'utf8');
      return JSON.parse(content);
    }
    
    // 如果指定语言文件不存在，fallback到中文版本
    const fallbackPath = path.join(process.cwd(), 'data', 'Site', 'zh', `${slug}.json`);
    
    if (fs.existsSync(fallbackPath)) {
      const content = fs.readFileSync(fallbackPath, 'utf8');
      return JSON.parse(content);
    }
    
    return null;
  } catch (error) {
    console.error(`Error reading site data ${slug} for locale ${locale}:`, error);
    return null;
  }
}

/**
 * 获取指定语言的所有文章列表
 * 使用articles.json文件，包含fallback逻辑
 * @param locale - 语言代码（'zh' 或 'en'）
 * @returns 文章列表数组
 */
export function getI18nArticlesList(locale: string = 'zh'): any[] {
  try {
    // 从articles.json获取文章列表
    const articlesData = getI18nJsonData('articles.json', locale);
    
    if (!Array.isArray(articlesData)) {
      return [];
    }
    
    // 转换为包含完整文章内容的格式
    const articles = articlesData.map((articleMeta: any) => {
      // 获取完整的文章数据
      const fullArticle = getI18nArticle(articleMeta.slug, locale);
      
      if (fullArticle) {
        return {
          ...fullArticle,
          // 确保使用articles.json中的元数据
          title: articleMeta.title,
          description: articleMeta.description,
          date: articleMeta.date,
          lastModified: articleMeta.lastModified,
          slug: articleMeta.slug,
          hasEnglish: articleMeta.hasEnglish
        };
      }
      
      // 如果无法获取完整文章，返回基本信息
      return {
        title: articleMeta.title,
        description: articleMeta.description,
        date: articleMeta.date,
        lastModified: articleMeta.lastModified,
        slug: articleMeta.slug,
        hasEnglish: articleMeta.hasEnglish,
        content: '',
        locale: locale
      };
    }).filter(Boolean); // 过滤掉null值
    
    return articles;
    
  } catch (error) {
    console.error(`Error getting articles list for locale ${locale}:`, error);
    return [];
  }
}

/**
 * 获取指定语言的完整站点列表
 * 将sitelists.json中的基本信息与Site目录下的详细信息合并
 * @param locale - 语言代码（'zh' 或 'en'）
 * @returns 完整的站点列表数组
 */
export function getI18nSitesList(locale: string = 'zh'): any[] {
  try {
    // 从sitelists.json获取站点基本信息列表
    const siteListData = getI18nJsonData('sitelists.json', locale);
    
    if (!Array.isArray(siteListData)) {
      return [];
    }
    
    // 为每个站点获取详细信息并合并
    const sites = siteListData.map((siteMeta: any) => {
      // 获取站点详细信息
      const siteDetails = getI18nSiteData(siteMeta.slug, locale);
      
      if (siteDetails) {
        return {
          // 使用详细信息中的所有字段
          ...siteDetails,
          // 确保使用sitelists.json中的基本元数据（如果存在）
          name: siteMeta.name || siteDetails.name,
          date: siteMeta.date || siteDetails.date,
          lastModified: siteMeta.lastModified || siteDetails.lastModified,
          slug: siteMeta.slug
        };
      }
      
      // 如果无法获取详细信息，返回基本信息
      return {
        name: siteMeta.name,
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
        expectedExposure: ''
      };
    }).filter(Boolean); // 过滤掉null值
    
    return sites;
    
  } catch (error) {
    console.error(`Error getting sites list for locale ${locale}:`, error);
    return [];
  }
}