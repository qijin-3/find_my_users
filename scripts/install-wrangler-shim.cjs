#!/usr/bin/env node
/**
 * 安装 Cloudflare CI 所需的本地工具：
 * 1) wrangler deploy shim（自动 OpenNext build）
 * 2) 补跑被 allow-scripts 拦截的 esbuild / workerd postinstall
 */
const { spawnSync } = require('node:child_process')
const fs = require('node:fs')
const path = require('node:path')
const Module = require('node:module')

const root = path.resolve(__dirname, '..')
const binDir = path.join(root, 'node_modules', '.bin')
const shimSrc = path.join(root, 'scripts', 'wrangler-ci-shim.cjs')
const shimDest = path.join(binDir, 'wrangler')

/**
 * 定位 node_modules 包根目录
 * @param {string} name - 包名
 * @returns {string|null}
 */
function resolvePkgRoot(name) {
  const searchPaths = Module._nodeModulePaths(root)
  for (const base of searchPaths) {
    const candidate = path.join(base, name, 'package.json')
    if (fs.existsSync(candidate)) return path.dirname(candidate)
  }
  return null
}

/**
 * 若原生二进制缺失，手动执行包内 install.js
 * @param {string} name - 包名
 * @returns {void}
 */
function ensureNativeInstall(name) {
  const pkgRoot = resolvePkgRoot(name)
  if (!pkgRoot) return

  const installJs = path.join(pkgRoot, 'install.js')
  if (!fs.existsSync(installJs)) return

  console.log(`[cf-shim] 确保 ${name} 原生二进制已安装…`)
  const result = spawnSync(process.execPath, [installJs], {
    cwd: pkgRoot,
    stdio: 'inherit',
    env: process.env,
  })
  if (result.status !== 0) {
    console.warn(`[cf-shim] ${name} install.js 退出码 ${result.status}（后续构建可能失败）`)
  }
}

/**
 * 安装 wrangler shim 到本地 bin
 * @returns {void}
 */
function installWranglerShim() {
  if (!resolvePkgRoot('wrangler')) {
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

  const launcher = `#!/usr/bin/env node
require(${JSON.stringify(shimSrc)});
`
  fs.writeFileSync(shimDest, launcher, { mode: 0o755 })
  console.log('[cf-shim] 已安装 wrangler deploy shim →', shimDest)
}

// Cloudflare CI 可能拦截依赖 postinstall；主动补跑关键原生包安装
ensureNativeInstall('esbuild')
ensureNativeInstall('workerd')
// wrangler 可能依赖另一份 esbuild
const nestedEsbuild = path.join(root, 'node_modules', 'wrangler', 'node_modules', 'esbuild', 'install.js')
if (fs.existsSync(nestedEsbuild)) {
  console.log('[cf-shim] 确保 wrangler/esbuild 原生二进制已安装…')
  spawnSync(process.execPath, [nestedEsbuild], {
    cwd: path.dirname(nestedEsbuild),
    stdio: 'inherit',
    env: process.env,
  })
}

installWranglerShim()
