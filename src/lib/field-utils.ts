/**
 * 站点字段类型定义
 */
type FieldType = 'status' | 'type' | 'region' | 'submitMethod' | 'reviewTime' | 'expectedExposure' | 'category';

/**
 * 字段数据结构
 */
interface FieldData {
  [key: string]: string;
}

/**
 * 字段选项结构
 */
interface FieldOption {
  key: string;
  label: string;
}

/**
 * 静态字段数据 - 中文
 */
const zhFields = {
  status: {
    running: "运行中",
    suspected_unmaintained: "疑似不再维护",
    confirmed_unmaintained: "确认不再维护",
    under_construction: "建设中",
    temporarily_unavailable: "暂时无法访问"
  },
  type: {
    free: "免费",
    freemium: "免费增值",
    paid: "付费",
    subscription: "订阅制",
    one_time_purchase: "一次性购买"
  },
  region: {
    global: "全球",
    china: "中国大陆",
    asia_pacific: "亚太地区",
    north_america: "北美",
    europe: "欧洲",
    other: "其他"
  },
  submitMethod: {
    email: "邮件提交",
    form: "表单提交",
    api: "API提交",
    manual: "手动提交",
    automatic: "自动收录"
  },
  reviewTime: {
    immediate: "即时",
    within_24h: "24小时内",
    within_week: "一周内",
    within_month: "一个月内",
    unknown: "未知"
  },
  expectedExposure: {
    high: "高",
    medium: "中",
    low: "低",
    unknown: "未知"
  },
  category: {
    product_showcase: "产品展示页",
    tool_navigation: "工具导航",
    blog_newsletter: "博客/周刊",
    social_community: "社交社区",
    media: "媒体",
    vertical_forum: "垂直论坛/社区",
    design_platform: "设计平台"
  }
};

/**
 * 静态字段数据 - 英文
 */
const enFields = {
  status: {
    running: "Running",
    suspected_unmaintained: "Suspected Unmaintained",
    confirmed_unmaintained: "Confirmed Unmaintained",
    under_construction: "Under Construction",
    temporarily_unavailable: "Temporarily Unavailable"
  },
  type: {
    free: "Free",
    freemium: "Freemium",
    paid: "Paid",
    subscription: "Subscription",
    one_time_purchase: "One-time Purchase"
  },
  region: {
    global: "Global",
    china: "China Mainland",
    asia_pacific: "Asia Pacific",
    north_america: "North America",
    europe: "Europe",
    other: "Other"
  },
  submitMethod: {
    email: "Email Submission",
    form: "Form Submission",
    api: "API Submission",
    manual: "Manual Submission",
    automatic: "Automatic Inclusion"
  },
  reviewTime: {
    immediate: "Immediate",
    within_24h: "Within 24 Hours",
    within_week: "Within a Week",
    within_month: "Within a Month",
    unknown: "Unknown"
  },
  expectedExposure: {
    high: "High",
    medium: "Medium",
    low: "Low",
    unknown: "Unknown"
  },
  category: {
    product_showcase: "Product Showcase",
    tool_navigation: "Tool Navigation",
    blog_newsletter: "Blog/Newsletter",
    social_community: "Social Community",
    media: "Media",
    vertical_forum: "Vertical Forum",
    design_platform: "Design Platform"
  }
};

/**
 * 获取字段数据
 * @param locale - 语言环境
 * @returns 字段数据
 */
function getFieldsData(locale: 'zh' | 'en') {
  return locale === 'zh' ? zhFields : enFields;
}

/**
 * 获取站点字段的显示文本
 * @param fieldType - 字段类型
 * @param fieldKey - 字段键值
 * @param locale - 语言环境 ('zh' | 'en')
 * @returns 对应的显示文本
 */
export function getFieldDisplayText(
  fieldType: FieldType,
  fieldKey: string,
  locale: 'zh' | 'en'
): string {
  const fields = getFieldsData(locale);
  const fieldData = fields[fieldType] as Record<string, string>;
  return fieldData?.[fieldKey] || fieldKey;
}

/**
 * 获取所有字段选项
 * @param fieldType - 字段类型
 * @param locale - 语言环境
 * @returns 字段选项数组
 */
export function getFieldOptions(
  fieldType: FieldType,
  locale: 'zh' | 'en'
): FieldOption[] {
  const fields = getFieldsData(locale);
  const fieldData = fields[fieldType] as Record<string, string> || {};
  
  return Object.entries(fieldData).map(([key, label]) => ({
    key,
    label: String(label)
  }));
}

/**
 * 验证字段值是否有效
 * @param fieldType - 字段类型
 * @param fieldKey - 字段键值
 * @returns 是否有效
 */
export function isValidFieldKey(
  fieldType: FieldType,
  fieldKey: string
): boolean {
  const zhFieldsData = getFieldsData('zh');
  const fieldData = zhFieldsData[fieldType] as Record<string, string> || {};
  return fieldKey in fieldData;
}