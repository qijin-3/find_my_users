#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * CSV到JSON转换脚本
 * 将运营推广渠道的CSV数据转换为符合项目格式的JSON文件
 */

// 文件路径配置
const CSV_FILE = path.join(__dirname, '运营推广渠道_站点收录_可导出.csv');
const OUTPUT_DIR = path.join(__dirname, '../../data/Site');
const SITELIST_FILE = path.join(__dirname, '../../data/json/sitelists.json');

/**
 * 解析CSV文件（改进版，更好地处理复杂格式）
 * @param {string} csvContent - CSV文件内容
 * @returns {Array} 解析后的数据数组
 */
function parseCSV(csvContent) {
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  const data = [];

  // 合并被换行符分割的行
  let mergedLines = [];
  let currentLine = '';
  let inQuotes = false;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    
    // 检查是否在引号内
    for (let char of line) {
      if (char === '"') {
        inQuotes = !inQuotes;
      }
    }

    currentLine += (currentLine ? '\n' : '') + line;

    // 如果不在引号内，说明这一行完整
    if (!inQuotes) {
      mergedLines.push(currentLine);
      currentLine = '';
    }
  }

  // 处理每一行
  for (const line of mergedLines) {
    if (!line.trim()) continue; // 跳过空行

    const values = [];
    let current = '';
    let inQuotes = false;
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim()); // 添加最后一个字段

    // 创建对象
    const obj = {};
    headers.forEach((header, index) => {
      const value = values[index] || '';
      // 移除引号并清理换行符
      obj[header] = value.replace(/^"|"$/g, '').replace(/\n/g, ' ').trim();
    });
    
    // 只有当有基本信息时才添加到数据数组
    if (obj.name_zh || obj.name_en) {
      data.push(obj);
    }
  }

  return data;
}

/**
 * 生成slug（用于文件名）
 * @param {string} nameEn - 英文名称
 * @param {string} nameZh - 中文名称（备用）
 * @returns {string} slug
 */
function generateSlug(nameEn, nameZh) {
  // 优先使用英文名称，如果没有则使用中文名称
  let name = nameEn || nameZh || '';
  
  if (!name) return '';
  
  // 移除特殊字符，保留字母、数字、空格和连字符
  name = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // 只保留字母、数字、空格和连字符
    .replace(/\s+/g, '-') // 空格替换为连字符
    .replace(/-+/g, '-') // 多个连字符合并为一个
    .replace(/^-+|-+$/g, '') // 移除开头和结尾的连字符
    .trim();

  // 如果生成的slug太短或为空，使用简化的中文名称
  if (name.length < 3 && nameZh) {
    // 对中文名称进行拼音转换的简化版本（移除特殊字符）
    name = nameZh
      .replace(/[^\w\s]/g, '') // 移除特殊字符，保留中英文字符
      .replace(/\s+/g, '-')
      .toLowerCase();
  }

  // 限制长度，避免文件名过长
  if (name.length > 50) {
    name = name.substring(0, 50).replace(/-[^-]*$/, ''); // 在单词边界截断
  }

  return name || 'unknown-site';
}

/**
 * 映射review字段
 * @param {string} value - 原始值
 * @returns {string} 映射后的值
 */
function mapReview(value) {
  if (!value || value === '') return 'N';
  if (value === '1') return 'Y';
  return value;
}

/**
 * 转换单个站点数据为JSON格式
 * @param {Object} csvRow - CSV行数据
 * @returns {Object} JSON格式数据
 */
function convertToJson(csvRow) {
  return {
    name_zh: csvRow.name_zh || '',
    name_en: csvRow.name_en || '',
    description_zh: csvRow.description_zh || '',
    description_en: csvRow.description_en || '',
    status: csvRow.running || 'running',
    type: csvRow.type || 'blog_newsletter',
    region: csvRow.region || 'domestic',
    url: csvRow.url || '',
    submitMethod: csvRow.submitMethod || 'email',
    submitUrl: csvRow.submitUrl || '',
    submitRequirements_zh: csvRow.submitRequirements_zh || '',
    submitRequirements_en: csvRow.submitRequirements_en || '',
    review: mapReview(csvRow.review),
    reviewTime: csvRow.reviewTime || 'unknown',
    expectedExposure: csvRow.expectedExposure || 'not_evaluated',
    rating_zh: csvRow.rating_zh || '',
    rating_en: csvRow.rating_en || ''
  };
}

/**
 * 生成sitelist条目
 * @param {string} slug - 站点slug
 * @param {Object} jsonData - JSON数据
 * @returns {Object} sitelist条目
 */
function generateSitelistEntry(slug, jsonData) {
  const now = new Date().toISOString();
  return {
    name_zh: jsonData.name_zh,
    name_en: jsonData.name_en,
    slug: slug,
    date: now,
    lastModified: now
  };
}

/**
 * 更新sitelists.json文件
 * @param {Array} newEntries - 新的站点条目
 */
function updateSitelists(newEntries) {
  let existingSites = [];
  
  // 读取现有的sitelists.json
  if (fs.existsSync(SITELIST_FILE)) {
    try {
      const content = fs.readFileSync(SITELIST_FILE, 'utf8');
      existingSites = JSON.parse(content);
    } catch (error) {
      console.warn('Warning: Could not read existing sitelists.json, creating new one');
      existingSites = [];
    }
  }

  // 合并新条目（避免重复）
  const existingSlugs = new Set(existingSites.map(site => site.slug));
  const filteredNewEntries = newEntries.filter(entry => !existingSlugs.has(entry.slug));
  
  const updatedSites = [...existingSites, ...filteredNewEntries];

  // 写入更新后的sitelists.json
  fs.writeFileSync(SITELIST_FILE, JSON.stringify(updatedSites, null, 2), 'utf8');
  console.log(`✅ Updated sitelists.json with ${filteredNewEntries.length} new entries`);
}

/**
 * 主执行函数
 */
function main() {
  try {
    console.log('🚀 Starting CSV to JSON conversion...');

    // 检查CSV文件是否存在
    if (!fs.existsSync(CSV_FILE)) {
      console.error(`❌ CSV file not found: ${CSV_FILE}`);
      process.exit(1);
    }

    // 确保输出目录存在
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
      console.log(`📁 Created output directory: ${OUTPUT_DIR}`);
    }

    // 读取和解析CSV文件
    console.log('📖 Reading CSV file...');
    const csvContent = fs.readFileSync(CSV_FILE, 'utf8');
    const csvData = parseCSV(csvContent);
    console.log(`📊 Parsed ${csvData.length} records from CSV`);

    const sitelistEntries = [];
    let createdCount = 0;
    let skippedCount = 0;

    // 处理每一行数据
    csvData.forEach((row, index) => {
      try {
        const slug = generateSlug(row.name_en, row.name_zh);
        if (!slug || slug === 'unknown-site') {
          console.warn(`⚠️  Skipping row ${index + 1}: Could not generate valid slug (${row.name_zh || row.name_en || 'no name'})`);
          skippedCount++;
          return;
        }

        const jsonData = convertToJson(row);
        const outputFile = path.join(OUTPUT_DIR, `${slug}.json`);

        // 检查文件是否已存在
        if (fs.existsSync(outputFile)) {
          console.log(`⏭️  Skipping ${slug}.json (already exists)`);
          skippedCount++;
          return;
        }

        // 写入JSON文件
        fs.writeFileSync(outputFile, JSON.stringify(jsonData, null, 2), 'utf8');
        console.log(`✅ Created: ${slug}.json`);
        createdCount++;

        // 生成sitelist条目
        sitelistEntries.push(generateSitelistEntry(slug, jsonData));

      } catch (error) {
        console.error(`❌ Error processing row ${index + 1}:`, error.message);
        skippedCount++;
      }
    });

    // 更新sitelists.json
    if (sitelistEntries.length > 0) {
      updateSitelists(sitelistEntries);
    }

    // 输出总结
    console.log('\n🎉 Conversion completed!');
    console.log(`✅ Created: ${createdCount} files`);
    console.log(`⏭️  Skipped: ${skippedCount} files`);
    console.log(`📁 Output directory: ${OUTPUT_DIR}`);

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
  parseCSV,
  convertToJson,
  generateSlug,
  main
};
