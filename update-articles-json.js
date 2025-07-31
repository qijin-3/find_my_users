const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// 生成英文articles.json
const enDir = path.join(process.cwd(), 'data', 'Articles', 'en');
const zhDir = path.join(process.cwd(), 'data', 'Articles', 'zh');

// 获取英文和中文文章文件列表
const enFiles = fs.existsSync(enDir) ? fs.readdirSync(enDir).filter(file => file.endsWith('.md')) : [];
const zhFiles = fs.readdirSync(zhDir).filter(file => file.endsWith('.md'));

const enArticles = [];

// 先添加有英文版本的文章
enFiles.forEach(file => {
  const slug = file.replace(/\.md$/, '');
  const filePath = path.join(enDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(content);
  
  enArticles.push({
    title: data.title,
    description: data.description,
    date: data.date,
    lastModified: new Date().toISOString().split('T')[0] + 'T03:34:22Z',
    slug: slug,
    hasEnglish: true
  });
});

// 再添加只有中文版本的文章（用于fallback）
zhFiles.forEach(file => {
  const slug = file.replace(/\.md$/, '');
  // 检查是否已经有英文版本
  if (enFiles.indexOf(file) === -1) {
    const filePath = path.join(zhDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(content);
    
    enArticles.push({
      title: data.title,
      description: data.description,
      date: data.date,
      lastModified: new Date().toISOString().split('T')[0] + 'T03:34:22Z',
      slug: slug,
      hasEnglish: false
    });
  }
});

// 按日期排序
enArticles.sort((a, b) => new Date(b.date) - new Date(a.date));

fs.writeFileSync('data/json/en/articles.json', JSON.stringify(enArticles, null, 2));
console.log('Updated en/articles.json with', enArticles.length, 'articles');
console.log('English articles:', enFiles.length);
console.log('Fallback articles:', enArticles.filter(a => !a.hasEnglish).length);