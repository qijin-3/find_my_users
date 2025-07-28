import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Globe, Clock, Users, CheckCircle, XCircle, ChevronRight } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

// 类型定义
interface Resource {
  name: string;
  description: string;
  url: string;
  slug: string;
}

interface SiteData {
  name: string;
  description: string;
  screenshot: string;
  status: string;
  type: string;
  region: string;
  url: string;
  submitMethod: string;
  submitUrl: string;
  submitRequirements: string;
  review: string;
  reviewTime: string;
  expectedExposure: string;
  rating: string;
}

interface PageParams {
  slug: string;
}

/**
 * 生成静态参数用于预渲染
 * @returns {Array} 包含所有资源slug的参数数组
 */
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const resourcesPath = path.join(process.cwd(), 'data', 'json', 'sitelists.json');
  const resources: Resource[] = JSON.parse(fs.readFileSync(resourcesPath, 'utf8'));
  
  return resources.map((resource: Resource) => ({
    slug: resource.slug,
  }));
}

/**
 * 生成页面元数据
 * @param {Object} params - 路由参数
 * @returns {Object} 页面元数据
 */
export async function generateMetadata({ params }: { params: PageParams }) {
  const siteData = getSiteData(params.slug);
  
  if (!siteData) {
    return {
      title: '站点未找到',
    };
  }

  return {
    title: `${siteData.name} - 站点详情`,
    description: siteData.description,
  };
}

/**
 * 获取站点详情数据
 * @param {string} slug - 站点标识符
 * @returns {Object|null} 站点详情数据或null
 */
function getSiteData(slug: string): SiteData | null {
  try {
    const sitePath = path.join(process.cwd(), 'data', 'Site', `${slug}.json`);
    const siteData: SiteData = JSON.parse(fs.readFileSync(sitePath, 'utf8'));
    return siteData;
  } catch (error) {
    return null;
  }
}

/**
 * 获取状态对应的颜色和图标
 * @param {string} status - 站点状态
 * @returns {Object} 包含颜色和图标的对象
 */
function getStatusInfo(status: string) {
  switch (status) {
    case '运行中':
      return { color: 'bg-green-100 text-green-800', icon: CheckCircle };
    case '疑似不再维护':
      return { color: 'bg-yellow-100 text-yellow-800', icon: Clock };
    case '停止运营':
      return { color: 'bg-red-100 text-red-800', icon: XCircle };
    default:
      return { color: 'bg-gray-100 text-gray-800', icon: Globe };
  }
}

/**
 * 站点详情页面组件
 * @param {Object} params - 路由参数
 * @returns {JSX.Element} 站点详情页面
 */
export default function SiteDetail({ params }: { params: PageParams }) {
  const siteData = getSiteData(params.slug);

  if (!siteData) {
    notFound();
  }

  const statusInfo = getStatusInfo(siteData.status);
  const StatusIcon = statusInfo.icon;

  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      {/* Breadcrumb navigation */}
      <nav className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <ChevronRight className="mx-2" size={16} />
        <Link href="/site" className="hover:text-blue-600">Site</Link>
        <ChevronRight className="mx-2" size={16} />
        <span className="text-gray-900">{siteData.name}</span>
      </nav>
      
      {/* Meta information card */}
      <div className="bg-gray-100 rounded-lg p-6 mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">{siteData.name}</h1>
            <p className="text-gray-600 mb-2">{siteData.description}</p>
          </div>
          <Badge className={statusInfo.color}>
            <StatusIcon size={14} className="mr-1" />
            {siteData.status}
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-semibold text-gray-700">站点类型：</span>
            <span className="text-gray-600">{siteData.type}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">适合地区：</span>
            <span className="text-gray-600">{siteData.region}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">递交方式：</span>
            <span className="text-gray-600">{siteData.submitMethod}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">审核：</span>
            <span className="text-gray-600">{siteData.review === 'Y' ? '需要审核' : '无需审核'}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">审核耗时：</span>
            <span className="text-gray-600">{siteData.reviewTime}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">预计曝光（周）：</span>
            <span className="text-gray-600">{siteData.expectedExposure}</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <a 
            href={siteData.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <Globe size={16} />
            访问官网
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Site content */}
      <div className="prose prose-lg max-w-none">
        <h2>递交要求</h2>
        <p className="text-gray-700 leading-relaxed">{siteData.submitRequirements}</p>
        
        <h2>递交地址</h2>
        <p>
          <a 
            href={siteData.submitUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition-colors break-all"
          >
            {siteData.submitUrl}
          </a>
        </p>
        
        <h2>评价</h2>
        <p className="text-gray-700 leading-relaxed">{siteData.rating}</p>
      </div>
      
      {/* Back to site list link */}
      <div className="mt-12">
        <Link href="/site" className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-2">
          <ArrowLeft size={20} />
          Back to site list
        </Link>
      </div>
    </article>
  );
}