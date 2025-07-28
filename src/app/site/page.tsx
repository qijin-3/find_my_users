import fs from 'fs';
import path from 'path';
import SitePageContent from '@/components/SitePageContent'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '分类',
  description: '独立开发者工具站 | 全球产品必备工具资源源',
}

/**
 * Site页面 - 显示分类工具和资源
 * 包含左侧分类菜单和右侧工具展示区域
 */
export default function Site() {
  const resourcesPath = path.join(process.cwd(), 'data', 'json', 'sitelists.json');
  const resources = JSON.parse(fs.readFileSync(resourcesPath, 'utf8'));

  return <SitePageContent {...resources} />
}