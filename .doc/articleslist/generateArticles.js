#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

/**
 * Articles.json 生成脚本
 * 根据 data/Articles/ 目录中的 Markdown 文件重新生成 articles.json
 */

// 文件路径配置
const ARTICLES_DIR = path.join(__dirname, '../../data/Articles');
const ARTICLES_JSON = path.join(__dirname, '../../data/json/articles.json');

/**
 * 从文件名生成slug
 * @param {string} filename - 文件名（不含扩展名）
 * @returns {string} slug
 */
function generateSlug(filename) {
  return filename
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // 移除特殊字符
    .replace(/\s+/g, '-') // 空格替换为连字符
    .replace(/-+/g, '-') // 多个连字符合并为一个
    .trim();
}

/**
 * 获取文件的创建和修改时间
 * @param {string} filePath - 文件路径
 * @returns {Object} 包含创建时间和修改时间的对象
 */
function getFileTimestamps(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return {
      created: stats.birthtime.toISOString(),
      modified: stats.mtime.toISOString()
    };
  } catch (error) {
    console.warn(`⚠️  Could not get timestamps for ${filePath}:`, error.message);
    const now = new Date().toISOString();
    return {
      created: now,
      modified: now
    };
  }
}

/**
 * 读取现有的articles.json并提取时间信息
 * @returns {Map} slug到时间戳的映射
 */
function readExistingTimestamps() {
  const timestampMap = new Map();
  
  if (!fs.existsSync(ARTICLES_JSON)) {
    console.log('📄 No existing articles.json found, will create new one');
    return timestampMap;
  }
  
  try {
    const content = fs.readFileSync(ARTICLES_JSON, 'utf8');
    const existingArticles = JSON.parse(content);
    
    existingArticles.forEach(article => {
      if (article.slug && article.date) {
        timestampMap.set(article.slug, {
          created: article.date,
          modified: article.lastModified || article.date
        });
      }
    });
    
    console.log(`📊 Loaded timestamps for ${timestampMap.size} existing articles`);
  } catch (error) {
    console.warn('⚠️  Could not read existing articles.json:', error.message);
  }
  
  return timestampMap;
}

/**
 * 从Markdown文件中提取文章信息
 * @param {string} filePath - 文件路径
 * @param {string} lang - 语言（zh/en）
 * @returns {Object|null} 文章信息或null（如果读取失败）
 */
function extractArticleInfo(filePath, lang) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { data: frontMatter, content: articleContent } = matter(content);
    
    // 提取第一个标题作为文章标题（如果frontMatter中没有title）
    let title = frontMatter.title;
    if (!title) {
      const titleMatch = articleContent.match(/^#\s+(.+)$/m);
      title = titleMatch ? titleMatch[1].trim() : path.basename(filePath, '.md');
    }
    
    // 只从frontMatter中获取描述，不自动提取
    const description = frontMatter.description || '';
    
    return {
      title,
      description
    };
  } catch (error) {
    console.error(`❌ Error reading ${filePath}:`, error.message);
    return null;
  }
}

/**
 * 验证文章条目
 * @param {Object} entry - 文章条目
 * @returns {boolean} 是否有效
 */
function isValidEntry(entry) {
  // 检查必要字段
  if (!entry.slug || (!entry.title_zh && !entry.title_en)) {
    return false;
  }
  
  // 检查标题长度
  const titleLength = (entry.title_zh || '').length + (entry.title_en || '').length;
  if (titleLength < 2 || titleLength > 200) {
    return false;
  }
  
  return true;
}

/**
 * 主执行函数
 */
function main() {
  try {
    console.log('🚀 Starting articles.json generation...');
    
    // 检查文章目录是否存在
    if (!fs.existsSync(ARTICLES_DIR)) {
      console.error(`❌ Articles directory not found: ${ARTICLES_DIR}`);
      process.exit(1);
    }
    
    // 读取现有时间戳信息
    const existingTimestamps = readExistingTimestamps();
    
    // 获取所有语言目录
    const langDirs = ['zh', 'en'].filter(lang => 
      fs.existsSync(path.join(ARTICLES_DIR, lang))
    );
    
    const articleMap = new Map(); // slug -> article data
    let processedCount = 0;
    let skippedCount = 0;
    
    // 处理每个语言目录
    langDirs.forEach(lang => {
      const langDir = path.join(ARTICLES_DIR, lang);
      const files = fs.readdirSync(langDir)
        .filter(file => file.endsWith('.md') && !file.startsWith('.'));
      
      console.log(`📁 Found ${files.length} Markdown files in ${lang} directory`);
      
      files.forEach(file => {
        const filePath = path.join(langDir, file);
        const slug = generateSlug(path.basename(file, '.md'));
        
        try {
          const articleInfo = extractArticleInfo(filePath, lang);
          if (!articleInfo) {
            console.warn(`⏭️  Skipping ${file}: Could not extract article info`);
            skippedCount++;
            return;
          }
          
          // 获取或创建文章条目
          let article = articleMap.get(slug) || {
            title_zh: '',
            title_en: '',
            description_zh: '',
            description_en: '',
            slug: slug
          };
          
          // 更新语言特定的字段
          article[`title_${lang}`] = articleInfo.title;
          article[`description_${lang}`] = articleInfo.description;
          
          // 确定时间戳
          if (!article.date) {
            if (existingTimestamps.has(slug)) {
              // 使用现有的创建时间，但更新修改时间
              const existing = existingTimestamps.get(slug);
              const fileTimestamps = getFileTimestamps(filePath);
              article.date = existing.created;
              article.lastModified = fileTimestamps.modified;
            } else {
              // 新文章，使用文件的时间戳
              const timestamps = getFileTimestamps(filePath);
              article.date = timestamps.created;
              article.lastModified = timestamps.modified;
            }
          }
          
          articleMap.set(slug, article);
          console.log(`✅ Processed: ${file} (${lang})`);
          processedCount++;
          
        } catch (error) {
          console.error(`❌ Error processing ${file}:`, error.message);
          skippedCount++;
        }
      });
    });
    
    // 转换为数组并验证
    const articles = Array.from(articleMap.values())
      .filter(article => {
        if (!isValidEntry(article)) {
          console.warn(`⏭️  Skipping invalid article: ${article.slug}`);
          skippedCount++;
          return false;
        }
        return true;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date)); // 按日期降序排序
    
    // 创建备份
    if (fs.existsSync(ARTICLES_JSON)) {
      const backupFile = ARTICLES_JSON + '.backup.' + Date.now();
      fs.copyFileSync(ARTICLES_JSON, backupFile);
      console.log(`💾 Created backup: ${path.basename(backupFile)}`);
    }
    
    // 写入新的articles.json
    fs.writeFileSync(ARTICLES_JSON, JSON.stringify(articles, null, 2), 'utf8');
    
    // 输出总结
    console.log('\n🎉 Articles.json generation completed!');
    console.log(`✅ Processed: ${processedCount} files`);
    console.log(`⏭️  Skipped: ${skippedCount} files`);
    console.log(`📊 Total articles in articles.json: ${articles.length}`);
    console.log(`📁 Output file: ${ARTICLES_JSON}`);
    
    // 显示一些统计信息
    const bilingualArticles = articles.filter(a => a.title_zh && a.title_en);
    const chineseOnlyArticles = articles.filter(a => a.title_zh && !a.title_en);
    const englishOnlyArticles = articles.filter(a => !a.title_zh && a.title_en);
    
    console.log('\n📈 Statistics:');
    console.log(`   📋 Bilingual articles: ${bilingualArticles.length}`);
    console.log(`   🇨🇳 Chinese only: ${chineseOnlyArticles.length}`);
    console.log(`   🇺🇸 English only: ${englishOnlyArticles.length}`);
    
  } catch (error) {
    console.error('❌ Fatal error:', error.message);
    process.exit(1);
  }
}

// 如果直接运行此脚本，执行主函数
if (require.main === module) {
  main();
}

module.exports = {
  generateSlug,
  isValidEntry,
  extractArticleInfo,
  main
};
