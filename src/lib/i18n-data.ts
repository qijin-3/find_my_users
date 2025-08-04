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
 * 获取站点详情数据
 * @param slug 站点标识符
 * @param locale 语言代码
 * @returns 站点详情数据或null
 */
export async function getI18nSiteData(slug: string, locale: string): Promise<any> {
  try {
    // 首先尝试从合并后的文件获取数据
    const mergedFilePath = path.join(process.cwd(), 'data', 'Site', `${slug}.json`);
    
    if (fs.existsSync(mergedFilePath)) {
      const fileContent = fs.readFileSync(mergedFilePath, 'utf8');
      const data = JSON.parse(fileContent);
      
      // 根据语言返回相应的字段
      return {
        name: locale === 'zh' ? data.name_zh : data.name_en,
        description: locale === 'zh' ? data.description_zh : data.description_en,
        submitRequirements: locale === 'zh' ? data.submitRequirements_zh : data.submitRequirements_en,
        rating: locale === 'zh' ? data.rating_zh : data.rating_en,
        screenshot: data.screenshot,
        status: data.status,
        type: data.type,
        region: data.region,
        url: data.url,
        submitMethod: data.submitMethod,
        submitUrl: data.submitUrl,
        review: data.review,
        reviewTime: data.reviewTime,
        expectedExposure: data.expectedExposure
      };
    }
    
    // 如果合并文件不存在，回退到原有逻辑
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
    console.error(`Error loading site data for ${slug}:`, error);
    return null;
  }
}

/**
 * 获取指定语言的所有文章列表
 * 使用合并后的articles.json文件，支持中英文字段
 * @param locale - 语言代码（'zh' 或 'en'）
 * @returns 文章列表数组
 */
export function getI18nArticlesList(locale: string = 'zh'): any[] {
  try {
    // 从合并后的articles.json获取文章列表
    const articlesPath = path.join(process.cwd(), 'data', 'json', 'articles.json');
    
    if (!fs.existsSync(articlesPath)) {
      // 如果合并文件不存在，fallback到原有逻辑
      const articlesData = getI18nJsonData('articles.json', locale);
      
      if (!Array.isArray(articlesData)) {
        return [];
      }
      
      return articlesData.map((articleMeta: any) => {
        const fullArticle = getI18nArticle(articleMeta.slug, locale);
        
        if (fullArticle) {
          return {
            ...fullArticle,
            title: articleMeta.title,
            description: articleMeta.description,
            date: articleMeta.date,
            lastModified: articleMeta.lastModified,
            slug: articleMeta.slug,
            hasEnglish: articleMeta.hasEnglish
          };
        }
        
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
      }).filter(Boolean);
    }
    
    // 读取合并后的articles.json文件
    const content = fs.readFileSync(articlesPath, 'utf8');
    const articlesData = JSON.parse(content);
    
    if (!Array.isArray(articlesData)) {
      return [];
    }
    
    // 转换为包含完整文章内容的格式
    const articles = articlesData.map((articleMeta: any) => {
      // 获取完整的文章数据
      const fullArticle = getI18nArticle(articleMeta.slug, locale);
      
      // 根据语言选择对应的标题和描述
      const title = locale === 'en' ? articleMeta.title_en : articleMeta.title_zh;
      const description = locale === 'en' ? articleMeta.description_en : articleMeta.description_zh;
      
      if (fullArticle) {
        return {
          ...fullArticle,
          // 使用合并文件中对应语言的元数据
          title: title,
          description: description,
          date: articleMeta.date,
          lastModified: articleMeta.lastModified,
          slug: articleMeta.slug,
          hasEnglish: true // 合并文件中的文章都有英文版本
        };
      }
      
      // 如果无法获取完整文章，返回基本信息
      return {
        title: title,
        description: description,
        date: articleMeta.date,
        lastModified: articleMeta.lastModified,
        slug: articleMeta.slug,
        hasEnglish: true,
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
 * 支持合并后的sitelists.json文件格式，包含name_zh和name_en字段
 * @param locale - 语言代码（'zh' 或 'en'）
 * @returns 完整的站点列表数组
 */
export async function getI18nSitesList(locale: string = 'zh'): Promise<any[]> {
  try {
    // 首先尝试从合并后的sitelists.json获取站点基本信息列表
    const mergedSiteListPath = path.join(process.cwd(), 'data', 'json', 'sitelists.json');
    
    if (fs.existsSync(mergedSiteListPath)) {
      // 读取合并后的sitelists.json文件
      const content = fs.readFileSync(mergedSiteListPath, 'utf8');
      const siteListData = JSON.parse(content);
      
      if (!Array.isArray(siteListData)) {
        return [];
      }
      
      // 为每个站点获取详细信息并合并
      const sitePromises = siteListData.map(async (siteMeta: any) => {
        // 获取站点详细信息
        const siteDetails = await getI18nSiteData(siteMeta.slug, locale);
        
        // 根据语言选择对应的名称
        const name = locale === 'en' ? siteMeta.name_en : siteMeta.name_zh;
        
        if (siteDetails) {
          return {
            // 使用详细信息中的所有字段
            ...siteDetails,
            // 使用合并文件中对应语言的名称和基本元数据
            name: name || siteDetails.name,
            date: siteMeta.date || siteDetails.date,
            lastModified: siteMeta.lastModified || siteDetails.lastModified,
            slug: siteMeta.slug
          };
        }
        
        // 如果无法获取详细信息，返回基本信息
        return {
          name: name,
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
      });
      
      // 等待所有Promise完成
      const sites = await Promise.all(sitePromises);
      return sites.filter(Boolean);
    }
    
    // 如果合并文件不存在，fallback到原有逻辑
    const siteListData = getI18nJsonData('sitelists.json', locale);
    
    if (!Array.isArray(siteListData)) {
      return [];
    }
    
    // 为每个站点获取详细信息并合并
    const sitePromises = siteListData.map(async (siteMeta: any) => {
      // 获取站点详细信息
      const siteDetails = await getI18nSiteData(siteMeta.slug, locale);
      
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
    });
    
    // 等待所有Promise完成
    const sites = await Promise.all(sitePromises);
    return sites.filter(Boolean);
    
  } catch (error) {
    console.error(`Error getting sites list for locale ${locale}:`, error);
    return [];
  }
}