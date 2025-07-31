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