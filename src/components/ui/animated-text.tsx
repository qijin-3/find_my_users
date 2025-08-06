'use client'

import { motion } from 'framer-motion'
import { CSSProperties, useState } from 'react'

interface AnimatedTextProps {
  /**
   * 要动画的文本内容
   */
  text: string
  /**
   * 应用到容器的 className
   */
  className?: string
  /**
   * 自定义样式
   */
  style?: CSSProperties
  /**
   * 字符动画延迟间隔（毫秒）- 默认 50ms
   */
  stagger?: number
  /**
   * 单个字符的动画持续时间（秒）- 默认 0.15s
   */
  duration?: number
  /**
   * Y轴跳跃高度（像素）- 默认 -3px
   */
  yOffset?: number
  /**
   * 动画缓动函数 - 默认 "easeOut"
   */
  ease?: string
  /**
   * 是否在hover时触发动画 - 默认 true
   */
  animateOnHover?: boolean
  /**
   * 是否在mount时自动播放动画 - 默认 false
   */
  autoPlay?: boolean
}

/**
 * AnimatedText - 可复用的文字逐字符跳跃流动动画组件
 * 
 * 功能特点：
 * - 支持hover触发或自动播放
 * - 每个字符按顺序从左到右进行跳跃动画
 * - 可配置动画参数（延迟、持续时间、跳跃高度等）
 * - 支持任意HTML元素作为容器
 * - 完全类型安全的TypeScript实现
 * - 遵循项目动画设计偏好（性能优先、语义化、可配置）
 * 
 * @example
 * ```tsx
 * // 基础使用 - hover触发
 * <AnimatedText text="提交工具" />
 * 
 * // 自定义样式和参数
 * <AnimatedText 
 *   text="Hello World"
 *   as="h1"
 *   className="text-2xl font-bold"
 *   stagger={80}
 *   duration={0.2}
 *   yOffset={-5}
 * />
 * 
 * // 自动播放动画
 * <AnimatedText 
 *   text="Welcome"
 *   autoPlay
 *   animateOnHover={false}
 * />
 * ```
 */
const AnimatedText = ({
  text,
  className = '',
  style,
  stagger = 50,
  duration = 0.15,
  yOffset = -3,
  ease = 'easeOut',
  animateOnHover = true,
  autoPlay = false,
}: AnimatedTextProps) => {
  // 将文本分割为字符数组，保留空格
  const characters = text.split('')
  const [isAnimating, setIsAnimating] = useState(autoPlay)

  const handleMouseEnter = () => {
    if (animateOnHover) {
      setIsAnimating(true)
    }
  }

  const handleMouseLeave = () => {
    if (animateOnHover && !autoPlay) {
      setIsAnimating(false)
    }
  }

  return (
    <span
      className={`inline-block ${className}`}
      style={{
        willChange: 'auto',
        ...style,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          className="inline-block"
          style={{
            willChange: 'transform',
            whiteSpace: char === ' ' ? 'pre' : 'normal',
            minWidth: char === ' ' ? '0.25em' : 'auto',
          }}
          animate={{
            y: isAnimating ? [0, yOffset, 0] : 0,
          }}
          transition={{
            duration,
            ease,
            delay: isAnimating ? (index * stagger) / 1000 : 0,
            repeat: autoPlay ? Infinity : 0,
            repeatDelay: autoPlay ? 1 : 0,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

export default AnimatedText