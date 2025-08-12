#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Articles.json 验证脚本
 * 验证生成的 articles.json 与实际文件的一致性
 */

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
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * 主验证函数
 */
function validate() {
  console.log('🔍 Starting articles.json validation...');
  
  // 读取articles.json
  const articles = JSON.parse(fs.readFileSync(ARTICLES_JSON, 'utf8'));
  const listedSlugs = articles.map(entry => entry.slug);
  
  // 获取所有语言目录
  const langDirs = ['zh', 'en'].filter(lang => 
    fs.existsSync(path.join(ARTICLES_DIR, lang))
  );
  
  // 收集所有实际的Markdown文件
  const actualFiles = new Set();
  langDirs.forEach(lang => {
    const langDir = path.join(ARTICLES_DIR, lang);
    const files = fs.readdirSync(langDir)
      .filter(file => file.endsWith('.md') && !file.startsWith('.'))
      .map(file => generateSlug(path.basename(file, '.md')));
    
    files.forEach(slug => actualFiles.add(slug));
  });
  
  console.log(`📁 Found ${actualFiles.size} unique articles in Articles directory`);
  console.log(`📋 Found ${listedSlugs.length} entries in articles.json`);
  
  // 检查缺失的文件
  const missingInJson = Array.from(actualFiles).filter(slug => !listedSlugs.includes(slug));
  const missingFiles = listedSlugs.filter(slug => !actualFiles.has(slug));
  
  if (missingInJson.length > 0) {
    console.log('\n❌ Articles missing from articles.json:');
    missingInJson.forEach(slug => console.log(`   - ${slug}`));
  }
  
  if (missingFiles.length > 0) {
    console.log('\n❌ Entries in articles.json without corresponding files:');
    missingFiles.forEach(slug => console.log(`   - ${slug}`));
  }
  
  if (missingInJson.length === 0 && missingFiles.length === 0) {
    console.log('\n✅ Perfect sync! All articles are properly listed.');
  }
  
  // 显示一些统计信息
  console.log('\n📊 Validation Summary:');
  console.log(`   ✅ Synced articles: ${actualFiles.size - missingInJson.length}`);
  console.log(`   ❌ Missing from articles.json: ${missingInJson.length}`);
  console.log(`   ❌ Orphaned entries: ${missingFiles.length}`);
  
  // 检查双语情况
  const bilingualCount = articles.filter(a => a.title_zh && a.title_en).length;
  const chineseOnlyCount = articles.filter(a => a.title_zh && !a.title_en).length;
  const englishOnlyCount = articles.filter(a => !a.title_zh && a.title_en).length;
  
  console.log('\n🌍 Language Coverage:');
  console.log(`   📋 Bilingual articles: ${bilingualCount}`);
  console.log(`   🇨🇳 Chinese only: ${chineseOnlyCount}`);
  console.log(`   🇺🇸 English only: ${englishOnlyCount}`);
}

if (require.main === module) {
  validate();
}
