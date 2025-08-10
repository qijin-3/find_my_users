'use client'

import { Badge } from '@/components/ui/badge'
import { useFieldData } from '@/hooks/useFieldData'
import { CheckCircle, Clock, Warning, WifiSlash, XCircle, Globe } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

/**
 * 站点数据类型定义
 */
interface SiteData {
  type?: string
  status?: string
}

/**
 * SiteBadge组件的Props类型定义
 */
interface SiteBadgeProps {
  siteData: SiteData
  locale?: string
  showType?: boolean
  showStatus?: boolean
  className?: string
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
 * SiteBadge 组件 - 用于显示站点的type和status信息
 * 从 /data/Site 目录中获取站点数据并显示相应的badge
 * @param {SiteBadgeProps} props - 组件属性
 */
export default function SiteBadge({ 
  siteData, 
  locale = 'zh', 
  showType = true, 
  showStatus = true,
  className = ""
}: SiteBadgeProps) {
  const { getFieldDisplayText } = useFieldData(locale as 'zh' | 'en')

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
    <div className={cn("flex items-center gap-2", className)}>
      {/* 类型Badge */}
      {showType && siteData.type && (
        <Badge 
          variant="secondary" 
          className="text-[12px] font-normal leading-[18px] border-[rgb(var(--border))] bg-[rgb(var(--border))] text-[rgb(var(--card-text-white))]"
        >
          {getTypeDisplayText(siteData.type)}
        </Badge>
      )}
      
      {/* 状态Badge */}
      {showStatus && siteData.status && (
        <Badge 
          className={cn(
            "text-[12px] font-normal leading-[18px] flex items-center gap-1 transition-colors",
            getStatusInfo(siteData.status).color
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
        "text-[12px] font-normal leading-[18px] border-[rgb(var(--border))] bg-[rgb(var(--border))] text-[rgb(var(--card-text-white))]",
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