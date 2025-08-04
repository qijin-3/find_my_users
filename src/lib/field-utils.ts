/**
 * 站点字段类型定义
 */
export type SiteFieldKey = 'status' | 'type' | 'region' | 'submitMethod' | 'reviewTime' | 'expectedExposure' | 'category'

/**
 * 字段数据结构
 */
export interface FieldData {
  [key: string]: string
}

/**
 * 字段选项结构
 */
export interface FieldOptions {
  [fieldKey: string]: FieldData
}

/**
 * 字段数据缓存
 */
let fieldsCache: { [locale: string]: any } = {};

/**
 * 获取字段映射数据
 * @param locale - 语言环境 ('zh' | 'en')
 * @returns 字段映射数据的 Promise
 */
export async function getFieldsData(locale: 'zh' | 'en' = 'zh'): Promise<FieldOptions> {
  try {
    // 检查缓存
    if (fieldsCache[locale]) {
      return fieldsCache[locale];
    }

    // 在服务端环境中，直接读取文件而不是使用 fetch
    if (typeof window === 'undefined') {
      // 服务端环境，直接导入 i18n-data 函数
      const { getI18nJsonData } = await import('./i18n-data');
      const fieldsData = await getI18nJsonData('site-fields', locale);
      
      // 缓存数据
      fieldsCache[locale] = fieldsData;
      
      return fieldsData;
    } else {
      // 客户端环境，使用 fetch
      const response = await fetch(`/api/fields?locale=${locale}`, {
        cache: 'force-cache', // 启用缓存
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch fields data: ${response.status}`);
      }
      
      const fieldsData = await response.json();
      
      // 缓存数据
      fieldsCache[locale] = fieldsData;
      
      return fieldsData;
    }
  } catch (error) {
    console.error(`Failed to load fields data for locale ${locale}:`, error);
    
    // 返回空对象作为fallback
    return {};
  }
}

/**
 * 获取字段显示文本
 * @param fieldType - 字段类型
 * @param fieldValue - 字段值
 * @param locale - 语言环境
 * @returns 显示文本
 */
export async function getFieldDisplayText(
  fieldType: SiteFieldKey, 
  fieldValue: string, 
  locale: 'zh' | 'en' = 'zh'
): Promise<string> {
  try {
    const fieldsData = await getFieldsData(locale);
    
    if (fieldsData[fieldType] && fieldsData[fieldType][fieldValue]) {
      return fieldsData[fieldType][fieldValue];
    }
    
    // 如果找不到对应的显示文本，返回原始值
    return fieldValue;
  } catch (error) {
    console.error(`Failed to get field display text for ${fieldType}.${fieldValue}:`, error);
    return fieldValue;
  }
}

/**
 * 获取字段的所有选项
 * @param fieldType - 字段类型
 * @param locale - 语言环境
 * @returns 字段选项数组
 */
export async function getFieldOptions(
  fieldType: SiteFieldKey, 
  locale: 'zh' | 'en' = 'zh'
): Promise<Array<{ key: string; label: string }>> {
  try {
    const fieldsData = await getFieldsData(locale);
    
    if (fieldsData[fieldType]) {
      return Object.entries(fieldsData[fieldType]).map(([key, label]) => ({
        key,
        label: label as string
      }));
    }
    
    return [];
  } catch (error) {
    console.error(`Failed to get field options for ${fieldType}:`, error);
    return [];
  }
}

/**
 * 验证字段值是否有效
 * @param fieldType - 字段类型
 * @param fieldValue - 字段值
 * @param locale - 语言环境
 * @returns 是否有效
 */
export async function isValidFieldKey(
  fieldType: SiteFieldKey, 
  fieldValue: string, 
  locale: 'zh' | 'en' = 'zh'
): Promise<boolean> {
  try {
    const fieldsData = await getFieldsData(locale);
    return !!(fieldsData[fieldType] && fieldsData[fieldType][fieldValue]);
  } catch (error) {
    console.error(`Failed to validate field key ${fieldType}.${fieldValue}:`, error);
    return false;
  }
}