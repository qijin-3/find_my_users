#!/usr/bin/env node
/**
 * 将 wrangler-ci-shim 安装为 node_modules/.bin/wrangler，
 * 使 Cloudflare 的 `npx wrangler deploy` 自动先执行 OpenNext build。
 */
const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '..')
const binDir = path.join(root, 'node_modules', '.bin')
const shimSrc = path.join(root, 'scripts', 'wrangler-ci-shim.cjs')
const shimDest = path.join(binDir, 'wrangler')

/**
 * 安装 wrangler shim 到本地 bin
 * @returns {void}
 */
function installWranglerShim() {
  if (!fs.existsSync(path.join(root, 'node_modules', 'wrangler'))) {
    console.warn('[cf-shim] wrangler 未安装，跳过 shim')
    return
  }
  if (!fs.existsSync(shimSrc)) {
    console.warn('[cf-shim] shim 源文件不存在，跳过')
    return
  }

  fs.mkdirSync(binDir, { recursive: true })
  try {
    fs.rmSync(shimDest, { force: true })
  } catch {
    // ignore
  }

  // 写入可执行入口，避免依赖 symlink 在 CI 上的差异
  const launcher = `#!/usr/bin/env node
require(${JSON.stringify(shimSrc)});
`
  fs.writeFileSync(shimDest, launcher, { mode: 0o755 })
  console.log('[cf-shim] 已安装 wrangler deploy shim →', shimDest)
}

installWranglerShim()
