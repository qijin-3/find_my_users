#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * 清理脚本 - 删除有问题的JSON文件
 */

const SITE_DIR = path.join(__dirname, '../../data/Site');

/**
 * 检查文件名是否有效
 * @param {string} filename - 文件名
 * @returns {boolean} 是否有效
 */
function isValidFilename(filename) {
  // 检查文件名长度
  if (filename.length > 100) return false;
  
  // 检查是否包含无效字符
  if (filename.includes('not_')) return false;
  
  // 检查是否以无效字符开头
  if (filename.startsWith('-') || filename.startsWith('and-the-') || filename.startsWith('introduce-')) {
    return false;
  }
  
  // 检查是否是描述性文本而不是站点名称
  const invalidPatterns = [
    'developer-tools-are-not',
    'mainly-collect-free',
    'it-will-be-featured',
    'and-the-product-requirement'
  ];
  
  return !invalidPatterns.some(pattern => filename.includes(pattern));
}

/**
 * 主函数
 */
function main() {
  console.log('🧹 Starting file cleanup...');
  
  if (!fs.existsSync(SITE_DIR)) {
    console.error(`❌ Directory not found: ${SITE_DIR}`);
    return;
  }
  
  const files = fs.readdirSync(SITE_DIR);
  let deletedCount = 0;
  
  files.forEach(file => {
    if (!file.endsWith('.json')) return;
    
    const filename = file.replace('.json', '');
    
    if (!isValidFilename(filename)) {
      const filePath = path.join(SITE_DIR, file);
      try {
        fs.unlinkSync(filePath);
        console.log(`🗑️  Deleted: ${file}`);
        deletedCount++;
      } catch (error) {
        console.error(`❌ Error deleting ${file}:`, error.message);
      }
    }
  });
  
  console.log(`\n✅ Cleanup completed! Deleted ${deletedCount} invalid files.`);
}

if (require.main === module) {
  main();
}
