import { CSSProperties } from 'react'

interface AnimatedTextServerProps {
  /**
   * 要显示的文本内容
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
}

/**
 * AnimatedTextServer - 服务端渲染版本的文本组件
 * 
 * 这是 AnimatedText 的服务端版本，用于在服务端组件中显示文本
 * 不包含动画功能，仅用于静态渲染
 * 
 * @example
 * ```tsx
 * <AnimatedTextServer 
 *   text="Hello World"
 *   className="text-2xl font-bold"
 * />
 * ```
 */
const AnimatedTextServer = ({
  text,
  className = '',
  style,
}: AnimatedTextServerProps) => {
  return (
    <span
      className={`inline-block ${className}`}
      style={style}
    >
      {text}
    </span>
  )
}

export default AnimatedTextServer