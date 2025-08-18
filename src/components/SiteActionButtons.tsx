'use client'

import { Globe, ArrowSquareOut } from '@phosphor-icons/react'
import AnimatedText from '@/components/ui/animated-text'

interface SiteActionButtonsProps {
  siteUrl: string
  submitUrl: string
  visitWebsiteText: string
  submitProductText: string
}

/**
 * SiteActionButtons - 站点详情页面的操作按钮组件
 * 包含访问官网和提交产品两个按钮，支持 AnimatedText hover 效果
 * 当链接为空时，对应按钮会被禁用
 */
export default function SiteActionButtons({ 
  siteUrl, 
  submitUrl, 
  visitWebsiteText, 
  submitProductText 
}: SiteActionButtonsProps) {
  // 检查链接是否有效（非空且不为空字符串）
  const isValidUrl = (url: string) => url && url.trim() !== ''
  const hasValidSiteUrl = isValidUrl(siteUrl)
  const hasValidSubmitUrl = isValidUrl(submitUrl)

  return (
    <div className="flex items-center gap-3 mt-auto">
      {/* 访问官网按钮 */}
      {hasValidSiteUrl ? (
        <a 
          href={siteUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm group"
        >
          <Globe size={16} />
          <AnimatedText 
            text={visitWebsiteText}
            useGroupHover={true}
            animateOnHover={false}
            stagger={60}
            duration={0.15}
            yOffset={-3}
          />
        </a>
      ) : (
        <button 
          disabled
          className="inline-flex items-center gap-2 px-4 py-2 bg-muted/50 text-muted-foreground/50 rounded-lg cursor-not-allowed text-sm"
        >
          <Globe size={16} />
          <span>{visitWebsiteText}</span>
        </button>
      )}

      {/* 提交产品按钮 */}
      {hasValidSubmitUrl ? (
        <a 
          href={submitUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm group"
        >
          <ArrowSquareOut size={16} />
          <AnimatedText 
            text={submitProductText}
            useGroupHover={true}
            animateOnHover={false}
            stagger={60}
            duration={0.15}
            yOffset={-3}
          />
        </a>
      ) : (
        <button 
          disabled
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary/50 text-primary-foreground/50 rounded-lg cursor-not-allowed text-sm"
        >
          <ArrowSquareOut size={16} />
          <span>{submitProductText}</span>
        </button>
      )}
    </div>
  )
}
