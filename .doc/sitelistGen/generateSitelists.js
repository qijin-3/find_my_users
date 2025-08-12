#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Sitelists.json 生成脚本
 * 根据 data/Site/ 目录中的 JSON 文件重新生成 sitelists.json
 * 确保数据一致性和时间准确性
 */

// 文件路径配置
const SITE_DIR = path.join(__dirname, '../../data/Site');
const SITELIST_FILE = path.join(__dirname, '../../data/json/sitelists.json');

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
 * 从文件名提取slug
 * @param {string} filename - 文件名（包含.json扩展名）
 * @returns {string} slug
 */
function extractSlug(filename) {
  return filename.replace('.json', '');
}

/**
 * 读取站点JSON文件并提取基本信息
 * @param {string} filePath - 文件路径
 * @returns {Object|null} 站点信息对象或null（如果读取失败）
 */
function readSiteInfo(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const siteData = JSON.parse(content);
    
    // 验证必要字段
    if (!siteData.name_zh && !siteData.name_en) {
      console.warn(`⚠️  Site data missing names: ${filePath}`);
      return null;
    }
    
    return {
      name_zh: siteData.name_zh || '',
      name_en: siteData.name_en || ''
    };
  } catch (error) {
    console.error(`❌ Error reading ${filePath}:`, error.message);
    return null;
  }
}

/**
 * 生成sitelist条目
 * @param {string} slug - 站点slug
 * @param {Object} siteInfo - 站点信息
 * @param {Object} timestamps - 时间戳信息
 * @returns {Object} sitelist条目
 */
function generateSitelistEntry(slug, siteInfo, timestamps) {
  return {
    name_zh: siteInfo.name_zh,
    name_en: siteInfo.name_en,
    slug: slug,
    date: timestamps.created,
    lastModified: timestamps.modified
  };
}

/**
 * 读取现有的sitelists.json并提取时间信息
 * @returns {Map} slug到时间戳的映射
 */
function readExistingTimestamps() {
  const timestampMap = new Map();
  
  if (!fs.existsSync(SITELIST_FILE)) {
    console.log('📄 No existing sitelists.json found, will create new one');
    return timestampMap;
  }
  
  try {
    const content = fs.readFileSync(SITELIST_FILE, 'utf8');
    const existingSites = JSON.parse(content);
    
    existingSites.forEach(site => {
      if (site.slug && site.date) {
        timestampMap.set(site.slug, {
          created: site.date,
          modified: site.lastModified || site.date
        });
      }
    });
    
    console.log(`📊 Loaded timestamps for ${timestampMap.size} existing sites`);
  } catch (error) {
    console.warn('⚠️  Could not read existing sitelists.json:', error.message);
  }
  
  return timestampMap;
}

/**
 * 验证sitelist条目
 * @param {Object} entry - sitelist条目
 * @returns {boolean} 是否有效
 */
function isValidEntry(entry) {
  // 检查必要字段
  if (!entry.slug || (!entry.name_zh && !entry.name_en)) {
    return false;
  }
  
  // 检查slug是否有效（不是无意义的数据）
  const invalidSlugs = [
    '-',
    'unknown-site'
  ];
  
  if (invalidSlugs.includes(entry.slug)) {
    return false;
  }
  
  // 检查slug是否包含明显的错误模式
  const invalidSlugPatterns = [
    'and-the-product-requirement-is-to-be-useful-or-interesting',
    'introduce-your-product-as-briefly-as-possiblenot',
    'developer-tools-are-not-acceptednot',
    'mainly-collect-free-appsnot',
    'it-will-be-featured-in-the-daily-sharing-article'
  ];
  
  if (invalidSlugPatterns.some(pattern => entry.slug === pattern)) {
    return false;
  }
  
  // 检查名称是否是描述性文本而不是真正的站点名称
  const combinedNames = (entry.name_zh + ' ' + entry.name_en).toLowerCase();
  
  // 检查是否包含明显的描述性文本
  const invalidNamePatterns = [
    '截图',
    'screenshot',
    'link/qr code',
    '尽可能简短',
    '- name +',
    '- description',
    'within_1k',
    'not_disclosed',
    'not_evaluated'
  ];
  
  if (invalidNamePatterns.some(pattern => combinedNames.includes(pattern))) {
    return false;
  }
  
  // 检查名称长度是否异常（可能是错误的描述文本）
  if (combinedNames.length > 300) {
    return false;
  }
  
  return true;
}

/**
 * 主执行函数
 */
function main() {
  try {
    console.log('🚀 Starting sitelists.json generation...');
    
    // 检查Site目录是否存在
    if (!fs.existsSync(SITE_DIR)) {
      console.error(`❌ Site directory not found: ${SITE_DIR}`);
      process.exit(1);
    }
    
    // 读取现有时间戳信息
    const existingTimestamps = readExistingTimestamps();
    
    // 读取Site目录中的所有JSON文件
    const files = fs.readdirSync(SITE_DIR).filter(file => file.endsWith('.json'));
    console.log(`📁 Found ${files.length} JSON files in Site directory`);
    
    const sitelistEntries = [];
    let processedCount = 0;
    let skippedCount = 0;
    
    // 处理每个文件
    files.forEach(filename => {
      const slug = extractSlug(filename);
      const filePath = path.join(SITE_DIR, filename);
      
      try {
        // 读取站点信息
        const siteInfo = readSiteInfo(filePath);
        if (!siteInfo) {
          console.warn(`⏭️  Skipping ${filename}: Could not read site info`);
          skippedCount++;
          return;
        }
        
        // 确定时间戳
        let timestamps;
        if (existingTimestamps.has(slug)) {
          // 使用现有的创建时间，但更新修改时间为文件的修改时间
          const existing = existingTimestamps.get(slug);
          const fileTimestamps = getFileTimestamps(filePath);
          timestamps = {
            created: existing.created,
            modified: fileTimestamps.modified
          };
        } else {
          // 新文件，使用文件的时间戳
          timestamps = getFileTimestamps(filePath);
        }
        
        // 生成sitelist条目
        const entry = generateSitelistEntry(slug, siteInfo, timestamps);
        
        // 验证条目有效性
        if (!isValidEntry(entry)) {
          console.warn(`⏭️  Skipping ${filename}: Invalid entry data`);
          skippedCount++;
          return;
        }
        
        sitelistEntries.push(entry);
        console.log(`✅ Processed: ${filename} (${siteInfo.name_zh || siteInfo.name_en})`);
        processedCount++;
        
      } catch (error) {
        console.error(`❌ Error processing ${filename}:`, error.message);
        skippedCount++;
      }
    });
    
    // 按创建时间排序（最早的在前面）
    sitelistEntries.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // 创建备份
    if (fs.existsSync(SITELIST_FILE)) {
      const backupFile = SITELIST_FILE + '.backup.' + Date.now();
      fs.copyFileSync(SITELIST_FILE, backupFile);
      console.log(`💾 Created backup: ${path.basename(backupFile)}`);
    }
    
    // 写入新的sitelists.json
    fs.writeFileSync(SITELIST_FILE, JSON.stringify(sitelistEntries, null, 2), 'utf8');
    
    // 输出总结
    console.log('\n🎉 Sitelists generation completed!');
    console.log(`✅ Processed: ${processedCount} sites`);
    console.log(`⏭️  Skipped: ${skippedCount} files`);
    console.log(`📊 Total entries in sitelists.json: ${sitelistEntries.length}`);
    console.log(`📁 Output file: ${SITELIST_FILE}`);
    
    // 显示一些统计信息
    const validSites = sitelistEntries.filter(entry => entry.name_zh && entry.name_en);
    const chineseOnlySites = sitelistEntries.filter(entry => entry.name_zh && !entry.name_en);
    const englishOnlySites = sitelistEntries.filter(entry => !entry.name_zh && entry.name_en);
    
    console.log('\n📈 Statistics:');
    console.log(`   📋 Bilingual sites: ${validSites.length}`);
    console.log(`   🇨🇳 Chinese only: ${chineseOnlySites.length}`);
    console.log(`   🇺🇸 English only: ${englishOnlySites.length}`);
    
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
  generateSitelistEntry,
  isValidEntry,
  extractSlug,
  main
};
