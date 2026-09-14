import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * OpenNext Cloudflare 适配器配置
 * 默认使用内存缓存；如需 ISR 持久化可启用 R2 incrementalCache
 * @see https://opennext.js.org/cloudflare
 */
export default defineCloudflareConfig({});
