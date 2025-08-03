import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

const owner = process.env.GITHUB_OWNER;
const repo = process.env.GITHUB_REPO;
const githubPath = 'data/json/zh/sitelists.json'; // 更新为新的路径结构
const localPath = path.join(process.cwd(), 'data', 'json', 'zh', 'sitelists.json'); // 更新为新的路径结构

/**
 * 从 GitHub 获取站点列表数据
 * @returns {Promise<Array>} 站点列表数组
 */
async function getResourcesFromGitHub() {
  try {
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path: githubPath,
    });

    const content = Buffer.from(data.content, 'base64').toString('utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Error fetching resources from GitHub:', error);
    throw error;
  }
}

/**
 * 从本地文件获取站点列表数据
 * @returns {Array} 站点列表数组
 */
function getLocalResources() {
  return JSON.parse(fs.readFileSync(localPath, 'utf8'));
}

/**
 * 获取站点详细信息
 * @param {string} slug - 站点 slug
 * @param {string} locale - 语言代码
 * @returns {Object|null} 站点详细信息
 */
function getSiteDetails(slug, locale = 'zh') {
  try {
    const sitePath = path.join(process.cwd(), 'data', 'Site', locale, `${slug}.json`);
    if (fs.existsSync(sitePath)) {
      return JSON.parse(fs.readFileSync(sitePath, 'utf8'));
    }
    return null;
  } catch (error) {
    console.error(`Error reading site details for ${slug}:`, error);
    return null;
  }
}

/**
 * 合并站点列表和详细信息
 * @param {Array} siteList - 简化的站点列表
 * @param {string} locale - 语言代码
 * @returns {Array} 完整的站点信息数组
 */
function mergeWithSiteDetails(siteList, locale = 'zh') {
  return siteList.map(site => {
    const details = getSiteDetails(site.slug, locale);
    if (details) {
      return {
        ...details,
        name: site.name || details.name,
        date: site.date || details.date,
        lastModified: site.lastModified || details.lastModified,
        slug: site.slug
      };
    }
    return site;
  });
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const source = searchParams.get('source');
  const locale = searchParams.get('locale') || 'zh';
  const includeDetails = searchParams.get('includeDetails') === 'true';

  if (source === 'github') {
    try {
      const resources = await getResourcesFromGitHub();
      
      if (includeDetails) {
        const mergedResources = mergeWithSiteDetails(resources, locale);
        return NextResponse.json(mergedResources);
      }
      
      return NextResponse.json(resources);
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch resources from GitHub' }, { status: 500 });
    }
  } else {
    // Default to local file for homepage
    const resources = getLocalResources();
    
    if (includeDetails) {
      const mergedResources = mergeWithSiteDetails(resources, locale);
      return NextResponse.json(mergedResources);
    }
    
    return NextResponse.json(resources);
  }
}

export async function POST(req) {
  const updatedResources = await req.json();

  try {
    const { data: currentFile } = await octokit.repos.getContent({
      owner,
      repo,
      path: githubPath,
    });

    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: githubPath,
      message: 'Update resources',
      content: Buffer.from(JSON.stringify(updatedResources, null, 2)).toString('base64'),
      sha: currentFile.sha,
    });

    // Update local file as well
    //fs.writeFileSync(localPath, JSON.stringify(updatedResources, null, 2));

    return NextResponse.json(updatedResources);
  } catch (error) {
    console.error('Error updating resources:', error);
    return NextResponse.json({ error: 'Failed to update resources' }, { status: 500 });
  }
}