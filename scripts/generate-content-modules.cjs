#!/usr/bin/env node
/**
 * 将 data/ 下的站点 JSON 与文章 Markdown 生成可被 bundler 内联的 TypeScript 模块。
 * Cloudflare Workers 运行时无法可靠使用 process.cwd()+fs，因此必须静态打包内容。
 */
const fs = require('node:fs')
const path = require('node:path')
const matter = require('gray-matter')

const root = path.resolve(__dirname, '..')
const outDir = path.join(root, 'src', 'lib', 'generated')

/**
 * 转义为 TypeScript 模板字符串安全内容
 * @param {string} value
 * @returns {string}
 */
function toTemplateLiteral(value) {
  return value.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')
}

/**
 * 生成站点与文章数据模块
 * @returns {void}
 */
function generate() {
  fs.mkdirSync(outDir, { recursive: true })

  const sitelists = JSON.parse(
    fs.readFileSync(path.join(root, 'data', 'json', 'sitelists.json'), 'utf8')
  )
  const articlesMeta = JSON.parse(
    fs.readFileSync(path.join(root, 'data', 'json', 'articles.json'), 'utf8')
  )
  const siteFields = JSON.parse(
    fs.readFileSync(path.join(root, 'data', 'json', 'site-fields.json'), 'utf8')
  )

  const siteDir = path.join(root, 'data', 'Site')
  const siteFiles = fs.readdirSync(siteDir).filter((f) => f.endsWith('.json'))
  /** @type {Record<string, unknown>} */
  const sitesBySlug = {}
  for (const file of siteFiles) {
    const slug = file.replace(/\.json$/, '')
    sitesBySlug[slug] = JSON.parse(fs.readFileSync(path.join(siteDir, file), 'utf8'))
  }

  /** @type {Record<string, Record<string, { data: Record<string, unknown>, content: string }>>} */
  const articlesByLocale = { zh: {}, en: {} }
  for (const locale of ['zh', 'en']) {
    const dir = path.join(root, 'data', 'Articles', locale)
    if (!fs.existsSync(dir)) continue
    for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.md'))) {
      const slug = file.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(dir, file), 'utf8')
      const parsed = matter(raw)
      articlesByLocale[locale][slug] = {
        data: parsed.data,
        content: parsed.content,
      }
    }
  }

  const sitesModule = `/* eslint-disable */
/**
 * 自动生成：站点列表与详情（勿手改）
 * 来源：data/json/sitelists.json + data/Site/*.json
 */
export const sitelists = ${JSON.stringify(sitelists, null, 2)}

export const sitesBySlug = ${JSON.stringify(sitesBySlug, null, 2)}

export type SiteListItem = (typeof sitelists)[number]
`

  const articlesModule = `/* eslint-disable */
/**
 * 自动生成：文章元数据与正文（勿手改）
 * 来源：data/json/articles.json + data/Articles/{zh,en}/*.md
 */
export const articlesMeta = ${JSON.stringify(articlesMeta, null, 2)} as const

export const articlesByLocale = {
  zh: {
${Object.entries(articlesByLocale.zh)
  .map(
    ([slug, value]) =>
      `    ${JSON.stringify(slug)}: {
      data: ${JSON.stringify(value.data, null, 6)},
      content: \`${toTemplateLiteral(value.content)}\`,
    }`
  )
  .join(',\n')}
  },
  en: {
${Object.entries(articlesByLocale.en)
  .map(
    ([slug, value]) =>
      `    ${JSON.stringify(slug)}: {
      data: ${JSON.stringify(value.data, null, 6)},
      content: \`${toTemplateLiteral(value.content)}\`,
    }`
  )
  .join(',\n')}
  },
} as const

export type ArticleMeta = (typeof articlesMeta)[number]
`

  const fieldsModule = `/* eslint-disable */
/**
 * 自动生成：站点字段映射（勿手改）
 * 来源：data/json/site-fields.json
 */
export const siteFields = ${JSON.stringify(siteFields, null, 2)} as const
`

  fs.writeFileSync(path.join(outDir, 'sites.ts'), sitesModule)
  fs.writeFileSync(path.join(outDir, 'articles.ts'), articlesModule)
  fs.writeFileSync(path.join(outDir, 'site-fields.ts'), fieldsModule)

  console.log(
    `[generate-content] sites=${siteFiles.length}, articlesMeta=${articlesMeta.length}, zhMd=${Object.keys(articlesByLocale.zh).length}, enMd=${Object.keys(articlesByLocale.en).length}`
  )
}

generate()
