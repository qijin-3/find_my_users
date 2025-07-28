import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Globe, Clock, Users, CheckCircle, XCircle } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
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
    <div className="container mx-auto py-8 px-4">
      {/* 返回按钮 */}
      <div className="mb-6">
        <Link 
          href="/site" 
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft size={16} />
          返回资源列表
        </Link>
      </div>

      {/* 站点标题和基本信息 */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">{siteData.name}</h1>
            <p className="text-xl text-gray-600 mb-4">{siteData.description}</p>
          </div>
          <div className="flex gap-2">
            <Badge className={statusInfo.color}>
              <StatusIcon size={14} className="mr-1" />
              {siteData.status}
            </Badge>
          </div>
        </div>

        {/* 官网链接 */}
        <a 
          href={siteData.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors text-lg"
        >
          <Globe size={18} />
          访问官网
          <ExternalLink size={16} />
        </a>
      </div>

      {/* 详细信息卡片 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 基本信息 */}
        <Card>
          <CardHeader>
            <CardTitle>基本信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-700 mb-1">站点类型</h4>
              <Badge variant="outline">{siteData.type}</Badge>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-1">适合地区</h4>
              <Badge variant="outline">{siteData.region}</Badge>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-1">网站地址</h4>
              <a 
                href={siteData.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors break-all"
              >
                {siteData.url}
              </a>
            </div>
          </CardContent>
        </Card>

        {/* 投稿信息 */}
        <Card>
          <CardHeader>
            <CardTitle>投稿信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-700 mb-1">递交方式</h4>
              <Badge variant="outline">{siteData.submitMethod}</Badge>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-1">递交地址</h4>
              <a 
                href={siteData.submitUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors break-all"
              >
                {siteData.submitUrl}
              </a>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-1">审核</h4>
              <Badge variant={siteData.review === 'Y' ? 'default' : 'secondary'}>
                {siteData.review === 'Y' ? '需要审核' : '无需审核'}
              </Badge>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-1">审核耗时</h4>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-gray-500" />
                <span>{siteData.reviewTime}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 曝光信息 */}
        <Card>
          <CardHeader>
            <CardTitle>曝光信息</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <h4 className="font-semibold text-gray-700 mb-1">预计曝光（周）</h4>
              <div className="flex items-center gap-2">
                <Users size={16} className="text-gray-500" />
                <span>{siteData.expectedExposure}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 递交要求 */}
        <Card>
          <CardHeader>
            <CardTitle>递交要求</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{siteData.submitRequirements}</p>
          </CardContent>
        </Card>
      </div>

      {/* 评价 */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>评价</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{siteData.rating}</p>
        </CardContent>
      </Card>
    </div>
  );
}