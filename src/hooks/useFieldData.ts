'use client'

import { useState, useEffect } from 'react'
import { SiteFieldKey, FieldOptions } from '@/lib/field-utils'

/**
 * 字段数据缓存
 */
const fieldsCache: { [locale: string]: FieldOptions } = {}

/**
 * 获取字段数据的自定义 Hook
 * @param locale - 语言环境
 * @returns 字段数据和加载状态
 */
export function useFieldData(locale: 'zh' | 'en' = 'zh') {
  const [fieldsData, setFieldsData] = useState<FieldOptions>(fieldsCache[locale] || {})
  const [loading, setLoading] = useState(!fieldsCache[locale])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // 如果已有缓存数据，直接返回
    if (fieldsCache[locale]) {
      setFieldsData(fieldsCache[locale])
      setLoading(false)
      return
    }

    // 获取字段数据
    const fetchFieldsData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`/api/fields?locale=${locale}`)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch fields data: ${response.status}`)
        }
        
        const data = await response.json()
        
        // 缓存数据
        fieldsCache[locale] = data
        setFieldsData(data)
      } catch (err) {
        console.error(`Failed to load fields data for locale ${locale}:`, err)
        setError(err instanceof Error ? err.message : 'Unknown error')
        setFieldsData({})
      } finally {
        setLoading(false)
      }
    }

    fetchFieldsData()
  }, [locale])

  /**
   * 获取字段显示文本
   * @param fieldType - 字段类型
   * @param fieldValue - 字段值
   * @returns 显示文本
   */
  const getFieldDisplayText = (fieldType: SiteFieldKey, fieldValue: string): string => {
    if (fieldsData[fieldType] && fieldsData[fieldType][fieldValue]) {
      return fieldsData[fieldType][fieldValue]
    }
    return fieldValue
  }

  /**
   * 获取字段选项
   * @param fieldType - 字段类型
   * @returns 字段选项数组
   */
  const getFieldOptions = (fieldType: SiteFieldKey): Array<{ key: string; label: string }> => {
    if (fieldsData[fieldType]) {
      return Object.entries(fieldsData[fieldType]).map(([key, label]) => ({
        key,
        label: label as string
      }))
    }
    return []
  }

  /**
   * 验证字段值是否有效
   * @param fieldType - 字段类型
   * @param fieldValue - 字段值
   * @returns 是否有效
   */
  const isValidFieldKey = (fieldType: SiteFieldKey, fieldValue: string): boolean => {
    return !!(fieldsData[fieldType] && fieldsData[fieldType][fieldValue])
  }

  return {
    fieldsData,
    loading,
    error,
    getFieldDisplayText,
    getFieldOptions,
    isValidFieldKey
  }
}