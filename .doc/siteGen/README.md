# Site Generator - CSV到JSON转换工具

这个工具用于将运营推广渠道的CSV数据转换为符合项目格式的JSON文件。

## 功能特点

- 🔄 自动将CSV数据转换为JSON格式
- 📁 自动生成符合项目命名规范的文件名（slug）
- 🔗 自动更新 `sitelists.json` 文件
- ⚡ 智能跳过已存在的文件，避免重复
- 🛡️ 错误处理和数据验证
- 📊 详细的处理进度和结果报告

## 使用方法

### 1. 准备CSV文件

确保您的CSV文件包含以下列（列名必须匹配）：

```
name_zh,name_en,description_zh,description_en,rating_zh,rating_en,running,type,url,submitUrl,region,submitMethod,review,submitRequirements_zh,submitRequirements_en,expectedExposure,reviewTime
```

### 2. 运行转换脚本

```bash
# 在项目根目录下运行
node .doc/siteGen/csvToJson.js
```

或者给脚本添加执行权限后直接运行：

```bash
chmod +x .doc/siteGen/csvToJson.js
./.doc/siteGen/csvToJson.js
```

### 3. 检查输出结果

脚本会：
- 在 `data/Site/` 目录下创建对应的JSON文件
- 自动更新 `data/json/sitelists.json` 文件
- 在控制台显示处理进度和结果

## 数据映射规则

### 文件名生成（slug）
- 基于 `name_en` 字段生成，如果为空则使用 `name_zh`
- 转换为小写，移除特殊字符，空格替换为连字符
- 例：`"Ruan Yifeng's Blog Weekly"` → `"ruan-yifengs-blog-weekly"`

### 字段映射
| CSV字段 | JSON字段 | 说明 |
|---------|----------|------|
| name_zh | name_zh | 中文名称 |
| name_en | name_en | 英文名称 |
| description_zh | description_zh | 中文描述 |
| description_en | description_en | 英文描述 |
| running | status | 运行状态 |
| type | type | 站点类型 |
| region | region | 地区范围 |
| url | url | 站点链接 |
| submitUrl | submitUrl | 提交链接 |
| submitMethod | submitMethod | 提交方式 |
| review | review | 是否需要审核（1→Y，空→N） |
| reviewTime | reviewTime | 审核时间 |
| expectedExposure | expectedExposure | 预期曝光量 |
| submitRequirements_zh | submitRequirements_zh | 中文提交要求 |
| submitRequirements_en | submitRequirements_en | 英文提交要求 |
| rating_zh | rating_zh | 中文评价 |
| rating_en | rating_en | 英文评价 |

## 错误处理

脚本会处理以下情况：
- CSV文件不存在
- 输出目录不存在（自动创建）
- 文件已存在（跳过，不覆盖）
- 数据解析错误（跳过该行，继续处理其他行）
- sitelists.json文件损坏（创建新文件）

## 输出示例

运行成功后，您会看到类似的输出：

```
🚀 Starting CSV to JSON conversion...
📁 Created output directory: /path/to/data/Site
📖 Reading CSV file...
📊 Parsed 23 records from CSV
✅ Created: ruan-yifengs-blog-weekly.json
✅ Created: phoenix-frontier.json
⏭️  Skipping github.json (already exists)
...
✅ Updated sitelists.json with 22 new entries

🎉 Conversion completed!
✅ Created: 22 files
⏭️  Skipped: 1 files
📁 Output directory: /path/to/data/Site
```

## 注意事项

1. **备份重要数据**：运行前建议备份 `sitelists.json` 文件
2. **检查字段值**：确保CSV中的字段值符合项目的枚举要求（如 status、type 等）
3. **文件命名**：生成的文件名基于英文名称，确保英文名称字段不为空
4. **重复检查**：脚本会自动跳过已存在的文件，不会覆盖现有数据

## 自定义配置

如果需要修改文件路径或转换规则，可以编辑 `csvToJson.js` 文件中的相关配置：

```javascript
// 文件路径配置
const CSV_FILE = path.join(__dirname, '运营推广渠道_站点收录_可导出.csv');
const OUTPUT_DIR = path.join(__dirname, '../../data/Site');
const SITELIST_FILE = path.join(__dirname, '../../data/json/sitelists.json');
```
