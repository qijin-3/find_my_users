#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Sitelists.json 验证脚本
 * 验证生成的 sitelists.json 与实际文件的一致性
 */

const SITE_DIR = path.join(__dirname, '../../data/Site');
const SITELIST_FILE = path.join(__dirname, '../../data/json/sitelists.json');

/**
 * 主验证函数
 */
function validate() {
  console.log('🔍 Starting sitelists.json validation...');
  
  // 读取实际的JSON文件
  const actualFiles = fs.readdirSync(SITE_DIR)
    .filter(file => file.endsWith('.json'))
    .map(file => file.replace('.json', ''));
  
  // 读取sitelists.json
  const sitelists = JSON.parse(fs.readFileSync(SITELIST_FILE, 'utf8'));
  const listedSlugs = sitelists.map(entry => entry.slug);
  
  console.log(`📁 Found ${actualFiles.length} JSON files in Site directory`);
  console.log(`📋 Found ${listedSlugs.length} entries in sitelists.json`);
  
  // 检查缺失的文件
  const missingInSitelists = actualFiles.filter(slug => !listedSlugs.includes(slug));
  const missingFiles = listedSlugs.filter(slug => !actualFiles.includes(slug));
  
  if (missingInSitelists.length > 0) {
    console.log('\n❌ Files missing from sitelists.json:');
    missingInSitelists.forEach(slug => console.log(`   - ${slug}.json`));
  }
  
  if (missingFiles.length > 0) {
    console.log('\n❌ Entries in sitelists.json without corresponding files:');
    missingFiles.forEach(slug => console.log(`   - ${slug}.json`));
  }
  
  if (missingInSitelists.length === 0 && missingFiles.length === 0) {
    console.log('\n✅ Perfect sync! All files are properly listed.');
  }
  
  // 显示一些统计信息
  console.log('\n📊 Validation Summary:');
  console.log(`   ✅ Synced files: ${actualFiles.length - missingInSitelists.length}`);
  console.log(`   ❌ Missing from sitelists: ${missingInSitelists.length}`);
  console.log(`   ❌ Orphaned entries: ${missingFiles.length}`);
}

if (require.main === module) {
  validate();
}
