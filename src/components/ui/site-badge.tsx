'use client'

import { Badge } from '@/components/ui/badge'
import { useFieldData } from '@/hooks/useFieldData'
import { CheckCircle, Clock, Warning, WifiSlash, XCircle, Globe, MapPin } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

/**
 * 站点数据类型定义
 */
interface SiteData {
  type?: string
  status?: string
  region?: string
}

/**
 * SiteBadge组件的Props类型定义
 */
interface SiteBadgeProps {
  siteData: SiteData
  locale?: string
  showType?: boolean
  showStatus?: boolean
  showRegion?: boolean
  className?: string
}

/**
 * 获取地区对应的颜色和图标
 * @param {string} region - 站点地区
 * @returns {Object} 包含颜色和图标的对象
 */
function getRegionInfo(region: string) {
  switch (region) {
    case 'domestic':
      return { 
        color: 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200', 
        icon: MapPin 
      }
    case 'overseas':
      return { 
        color: 'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200', 
        icon: MapPin 
      }
    case 'global':
      return { 
        color: 'bg-indigo-100 text-indigo-800 border-indigo-200 hover:bg-indigo-200', 
        icon: Globe 
      }
    default:
      return { 
        color: 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200', 
        icon: MapPin 
      }
  }
}

/**
 * 获取状态对应的颜色和图标
 * @param {string} status - 站点状态
 * @returns {Object} 包含颜色和图标的对象
 */
function getStatusInfo(status: string) {
  switch (status) {
    case 'running':
      return { 
        color: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200', 
        icon: CheckCircle 
      }
    case 'suspected_unmaintained':
      return { 
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200', 
        icon: Clock 
      }
    case 'confirmed_unmaintained':
      return { 
        color: 'bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200', 
        icon: Warning 
      }
    case 'temporarily_unavailable':
      return { 
        color: 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200', 
        icon: WifiSlash 
      }
    case 'stopped':
      return { 
        color: 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200', 
        icon: XCircle 
      }
    default:
      return { 
        color: 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200', 
        icon: Globe 
      }
  }
}

/**
 * SiteBadge 组件 - 用于显示站点的type、status和region信息
 * 从 /data/Site 目录中获取站点数据并显示相应的badge
 * @param {SiteBadgeProps} props - 组件属性
 */
export default function SiteBadge({ 
  siteData, 
  locale = 'zh', 
  showType = true, 
  showStatus = true,
  showRegion = true,
  className = ""
}: SiteBadgeProps) {
  const { getFieldDisplayText } = useFieldData(locale as 'zh' | 'en')

  /**
   * 获取地区显示文本
   * @param {string} regionId - 地区ID
   * @returns {string} 地区显示文本
   */
  const getRegionDisplayText = (regionId: string): string => {
    return getFieldDisplayText('region', regionId)
  }

  /**
   * 获取类型显示文本
   * @param {string} typeId - 类型ID
   * @returns {string} 类型显示文本
   */
  const getTypeDisplayText = (typeId: string): string => {
    return getFieldDisplayText('type', typeId)
  }

  /**
   * 获取状态显示文本
   * @param {string} statusId - 状态ID
   * @returns {string} 状态显示文本
   */
  const getStatusDisplayText = (statusId: string): string => {
    return getFieldDisplayText('status', statusId)
  }

  return (
    <div className={cn("flex items-center gap-2 flex-wrap group transition-all duration-200", className)}>
      {/* 类型Badge */}
      {showType && siteData.type && (
        <Badge 
          variant="secondary" 
          className="text-[12px] font-normal leading-[18px] group-hover:opacity-90 transition-opacity"
        >
          {getTypeDisplayText(siteData.type)}
        </Badge>
      )}
      
      {/* 地区Badge */}
      {showRegion && siteData.region && (
        <Badge 
          className={cn(
            "text-[12px] font-normal leading-[18px] flex items-center gap-1 transition-colors",
            getRegionInfo(siteData.region).color,
            "group-hover:opacity-90"
          )}
        >
          {(() => {
            const RegionIcon = getRegionInfo(siteData.region).icon
            return <RegionIcon size={12} />
          })()}
          {getRegionDisplayText(siteData.region)}
        </Badge>
      )}
      
      {/* 状态Badge */}
      {showStatus && siteData.status && (
        <Badge 
          className={cn(
            "text-[12px] font-normal leading-[18px] flex items-center gap-1 transition-colors",
            getStatusInfo(siteData.status).color,
            "group-hover:opacity-90"
          )}
        >
          {(() => {
            const StatusIcon = getStatusInfo(siteData.status).icon
            return <StatusIcon size={12} />
          })()}
          {getStatusDisplayText(siteData.status)}
        </Badge>
      )}
    </div>
  )
}

/**
 * RegionBadge 组件 - 仅显示地区信息的简化版本
 */
export function RegionBadge({ 
  region, 
  locale = 'zh', 
  className = "" 
}: { 
  region: string
  locale?: string
  className?: string 
}) {
  const { getFieldDisplayText } = useFieldData(locale as 'zh' | 'en')
  const regionInfo = getRegionInfo(region)
  const RegionIcon = regionInfo.icon
  
  return (
    <Badge 
      className={cn(
        "text-[12px] font-normal leading-[18px] flex items-center gap-1 transition-colors",
        regionInfo.color,
        className
      )}
    >
      <RegionIcon size={12} />
      {getFieldDisplayText('region', region)}
    </Badge>
  )
}

/**
 * TypeBadge 组件 - 仅显示类型信息的简化版本
 */
export function TypeBadge({ 
  type, 
  locale = 'zh', 
  className = "" 
}: { 
  type: string
  locale?: string
  className?: string 
}) {
  const { getFieldDisplayText } = useFieldData(locale as 'zh' | 'en')
  
  return (
    <Badge 
      variant="secondary" 
      className={cn(
        "text-[12px] font-normal leading-[18px]",
        className
      )}
    >
      {getFieldDisplayText('type', type)}
    </Badge>
  )
}

/**
 * StatusBadge 组件 - 仅显示状态信息的简化版本
 */
export function StatusBadge({ 
  status, 
  locale = 'zh', 
  className = "" 
}: { 
  status: string
  locale?: string
  className?: string 
}) {
  const { getFieldDisplayText } = useFieldData(locale as 'zh' | 'en')
  const statusInfo = getStatusInfo(status)
  const StatusIcon = statusInfo.icon
  
  return (
    <Badge 
      className={cn(
        "text-[12px] font-normal leading-[18px] flex items-center gap-1 transition-colors",
        statusInfo.color,
        className
      )}
    >
      <StatusIcon size={12} />
      {getFieldDisplayText('status', status)}
    </Badge>
  )
}