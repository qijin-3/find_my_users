#!/usr/bin/env node
/**
 * Cloudflare Workers Builds 默认执行 `npx wrangler deploy`。
 * 官方 wrangler 检测到 OpenNext 后会直接调用 `opennextjs-cloudflare deploy`，
 * 但不会先 build，因而报 “Could not find compiled Open Next config”。
 *
 * 本 shim 拦截 deploy / versions upload：先 build，再交给 OpenNext。
 * 当 OpenNext 以 OPEN_NEXT_DEPLOY=true 回调 wrangler 时，直接透传到真实 wrangler。
 */
const { spawnSync } = require('node:child_process')
const path = require('node:path')

const args = process.argv.slice(2)
const command = args[0]
const fromOpenNext = process.env.OPEN_NEXT_DEPLOY === 'true'

/**
 * 运行 OpenNext Cloudflare CLI 子命令
 * @param {string} subcommand - build | deploy | upload
 * @param {string[]} extraArgs - 透传参数
 * @returns {import('node:child_process').SpawnSyncReturns<Buffer>}
 */
function runOpenNext(subcommand, extraArgs = []) {
  const cli = require.resolve('@opennextjs/cloudflare/dist/cli/index.js')
  return spawnSync(process.execPath, [cli, subcommand, ...extraArgs], {
    stdio: 'inherit',
    env: process.env,
  })
}

/**
 * 调用真实 wrangler（跳过本 shim）
 * @param {string[]} argv - wrangler 参数
 * @returns {import('node:child_process').SpawnSyncReturns<Buffer>}
 */
function runRealWrangler(argv) {
  const wranglerPkg = path.dirname(require.resolve('wrangler/package.json'))
  const wranglerJs = path.join(wranglerPkg, 'bin', 'wrangler.js')
  return spawnSync(process.execPath, [wranglerJs, ...argv], {
    stdio: 'inherit',
    env: process.env,
  })
}

const isDeploy = command === 'deploy'
const isVersionsUpload = command === 'versions' && args[1] === 'upload'

if (!fromOpenNext && (isDeploy || isVersionsUpload)) {
  console.log('[cf-shim] OpenNext build → deploy（兼容 Cloudflare 默认 `npx wrangler deploy`）')
  const build = runOpenNext('build')
  if (build.status !== 0) process.exit(build.status ?? 1)

  if (isDeploy) {
    const deploy = runOpenNext('deploy', args.slice(1))
    process.exit(deploy.status ?? 1)
  }

  const upload = runOpenNext('upload', args.slice(2))
  process.exit(upload.status ?? 1)
}

const result = runRealWrangler(args)
process.exit(result.status ?? 1)
