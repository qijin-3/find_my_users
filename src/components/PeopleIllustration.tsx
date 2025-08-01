'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const PeopleIllustration = () => {
  const [isVisible, setIsVisible] = useState(false)

  // 小人插画数据配置
  const peopleData = [
    // 第二行（后排）- 4个小人
    { src: '/People/people_01.png', alt: 'Person 1', row: 2, col: 1 },
    { src: '/People/people_02.png', alt: 'Person 2', row: 2, col: 2 },
    { src: '/People/people_03.png', alt: 'Person 3', row: 2, col: 3 },
    { src: '/People/people_04.png', alt: 'Person 4', row: 2, col: 4 },
    
    // 第一行（前排）- 5个小人
    { src: '/People/people_05.png', alt: 'Person 5', row: 1, col: 1 },
    { src: '/People/people_06.png', alt: 'Person 6', row: 1, col: 2 },
    { src: '/People/people_07.png', alt: 'Person 7', row: 1, col: 3 },
    { src: '/People/people_08.png', alt: 'Person 8', row: 1, col: 4 },
    { src: '/People/people_09.png', alt: 'Person 9', row: 1, col: 5 },
  ]

  // 计算动画延迟：从下往上，从左往右
  const getAnimationDelay = (row: number, col: number) => {
    // 第一行（row=1）是前排，第二行（row=2）是后排
    // 从下往上：前排先出现，后排后出现
    // 从左往右：同一行内从左到右依次出现
    const rowDelay = row === 1 ? 0 : 0.8 // 前排0秒开始，后排0.8秒后开始
    const colDelay = (col - 1) * 0.15 // 每个小人间隔0.15秒
    return rowDelay + colDelay
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 200) // 页面加载后200ms开始动画

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative px-4">
      {/* 容器：两行小人 */}
      <div className="flex flex-col items-center max-w-4xl mx-auto">
        {/* 第二行（后排）*/}
        <div className="flex justify-center items-end space-x-1 sm:space-x-2 md:space-x-3 lg:space-x-4 relative z-10">
          {peopleData
            .filter(person => person.row === 2)
            .map((person, index) => (
              <motion.div
                key={`row2-${index}`}
                initial={{ 
                  opacity: 0, 
                  y: 100, 
                  scale: 0.5,
                  rotate: -10 
                }}
                animate={isVisible ? { 
                  opacity: 1, 
                  y: [0, -3, 0], 
                  scale: 1,
                  rotate: 0 
                } : {}}
                transition={{
                  opacity: {
                    duration: 0.6,
                    delay: getAnimationDelay(person.row, person.col),
                    ease: [0.25, 0.46, 0.45, 0.94]
                  },
                  scale: {
                    duration: 0.6,
                    delay: getAnimationDelay(person.row, person.col),
                    type: "spring",
                    stiffness: 100,
                    damping: 10
                  },
                  rotate: {
                    duration: 0.6,
                    delay: getAnimationDelay(person.row, person.col),
                    ease: [0.25, 0.46, 0.45, 0.94]
                  },
                  y: {
                    duration: 0.6,
                    delay: getAnimationDelay(person.row, person.col),
                    ease: [0.25, 0.46, 0.45, 0.94],
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 2 + Math.random() * 3
                  }
                }}
                whileHover={{ 
                  scale: 1.1, 
                  rotate: 3,
                  y: -8,
                  transition: { duration: 0.2 }
                }}
                className="cursor-pointer relative z-10"
              >
                <Image
                  src={person.src}
                  alt={person.alt}
                  width={120}
                  height={145}
                  className="h-[80px] sm:h-[100px] md:h-[120px] lg:h-[145px] w-auto object-contain"
                  priority
                />
              </motion.div>
            ))}
        </div>

        {/* 第一行（前排）*/}
        <div className="flex justify-center items-end space-x-1 sm:space-x-2 md:space-x-3 lg:space-x-4 relative z-20" style={{ marginTop: '-100px' }}>
          {peopleData
            .filter(person => person.row === 1)
            .map((person, index) => (
              <motion.div
                key={`row1-${index}`}
                initial={{ 
                  opacity: 0, 
                  y: 120, 
                  scale: 0.3,
                  rotate: 15 
                }}
                animate={isVisible ? { 
                  opacity: 1, 
                  y: [0, -4, 0], 
                  scale: 1,
                  rotate: 0 
                } : {}}
                transition={{
                  opacity: {
                    duration: 0.7,
                    delay: getAnimationDelay(person.row, person.col),
                    ease: [0.25, 0.46, 0.45, 0.94]
                  },
                  scale: {
                    duration: 0.7,
                    delay: getAnimationDelay(person.row, person.col),
                    type: "spring",
                    stiffness: 120,
                    damping: 8
                  },
                  rotate: {
                    duration: 0.7,
                    delay: getAnimationDelay(person.row, person.col),
                    ease: [0.25, 0.46, 0.45, 0.94]
                  },
                  y: {
                    duration: 0.7,
                    delay: getAnimationDelay(person.row, person.col),
                    ease: [0.25, 0.46, 0.45, 0.94],
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 1.5 + Math.random() * 2.5
                  }
                }}
                whileHover={{ 
                  scale: 1.15, 
                  rotate: -3,
                  y: -10,
                  transition: { duration: 0.2 }
                }}
                className="cursor-pointer relative z-30"
              >
                <Image
                  src={person.src}
                  alt={person.alt}
                  width={120}
                  height={145}
                  className="h-[90px] sm:h-[110px] md:h-[130px] lg:h-[145px] w-auto object-contain"
                  priority
                />
              </motion.div>
            ))}
        </div>
      </div>

      {/* 背景装饰效果 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isVisible ? { opacity: 0.05, scale: 1 } : {}}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-3xl blur-3xl"
      />
      
      {/* 移动端优化：添加微妙的阴影效果 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 0.3 } : {}}
        transition={{ duration: 1, delay: 2 }}
        className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-4 bg-gray-200/50 dark:bg-gray-800/30 rounded-full blur-sm"
      />
    </div>
  )
}

export default PeopleIllustration