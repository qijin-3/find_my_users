# FindMyUsers

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.25-black)](https://nextjs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/qijin-3/find_my_users/pulls)
[![GitHub issues](https://img.shields.io/github/issues/qijin-3/find_my_users)](https://github.com/qijin-3/find_my_users/issues)

[English](#english) | [中文](#中文)

---

## 中文

### 📖 项目介绍

**FindMyUsers** 是专为独立开发者打造的推广渠道导航站，持续收录并评测国内外真实、可操作的产品推广免费渠道。帮助开发者找到首批用户、验证产品可行性，轻松迈出冷启动第一步。

![FindMyUsers](https://github.com/qijin-3/find_my_users/blob/main/public/Screenshot/homepage_zh.png)


### 🎯 项目目标

独立开发者在产品冷启动阶段常常面临"如何找到第一批用户"的挑战。本项目致力于：

1. **收录真实可用的免费推广渠道**：专注于免费渠道资源，帮助开发者降低推广成本
2. **提供详细的渠道评测**：包括提交要求、审核时间、预期曝光等关键信息
3. **帮助开发者走出第一步**：降低试错成本，帮助独立开发者用尽可能小的代价验证产品可行性

### 🤝 参与贡献

这是一个由 AI 辅助搭建的开源项目，我们诚邀社区成员参与贡献。作为独立开发新人，我深知社区协作的重要性，希望通过大家的共同努力，让这个项目帮助到更多独立开发者。

#### 贡献方式

您可以通过以下方式参与项目：

1. **💡 提交渠道资源**：分享您发现的优质推广渠道
2. **📊 完善评测机制**：优化渠道评估标准和方法
3. **🚀 功能建议**：提出改进项目的想法和建议
4. **🐛 Bug 反馈**：报告发现的问题
5. **💻 代码贡献**：提交代码改进和新功能

### 投稿方式

#### 方式一：提交 Issue

访问 [GitHub Issues](https://github.com/qijin-3/find_my_users/issues) 提交渠道信息，需要包含：

- 渠道名称（中文/英文）
- 介绍：帮助大家快速了解这个渠道
- 网站运行状态：该渠道是否还在运营？避免浪费独立开发者的投稿时间
- 渠道类型：该渠道的类型，类型在一定程度上决定了推广的策略
- 推广范围：国内？国外？还是只适用于特定地区
- 渠道地址：该渠道的链接
- 提交地址：提交产品的链接
- 提交方式：该渠道要求如何提交产品？填写表单？发布文章？
- 提交要求：是否限定产品的形态？又或是有什么特殊要求？
- 审核要求：在该渠道发布产品是否需要审核？需要审核多久？
- 预计曝光：该渠道预计可以给提交的产品带来多少的曝光量（阅读量）？
- 总结：可以是你使用该渠道的一些经验分享。或是该站点的一些特点，比如seo友好，收录简单的等等

#### 方式二：提交代码

1. Fork 本项目
2. 在 `data/json/sitelists.json` 中添加站点信息
3. 在 `data/Site/` 目录下创建对应的 JSON 文件
4. 提交 Pull Request

详细的贡献指南请参考：[如何参与 FindMyUsers 项目贡献](https://github.com/qijin-3/find_my_users/issues/1)

### 📋 开发计划

- [x] 基础渠道收录功能
- [ ] 持续收录新的推广渠道
- [ ] 增加一些可以帮助开发者在前期快速验证想法的AI功能
- [ ] 一些无关紧要的情绪价值
- [ ] 完善渠道评分和推荐系统，帮助开发者快速筛选可用渠道

### ☁️ Cloudflare 部署

Workers Builds 控制台（Settings → Build）请这样配置：

| 设置 | 值 |
|------|-----|
| **Deploy command** | `npm run deploy` |
| **Build command** | 留空 |

不要用 `npx wrangler deploy`：它不会先跑 OpenNext build，会报 `Could not find compiled Open Next config`。

### 📄 许可证

本项目基于 [MIT License](LICENSE) 开源，允许自由使用、修改和分发。

### 🙏 致谢

本项目基于以下优秀的开源项目构建：

- [Next.js](https://nextjs.org/) - React 全栈框架
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [Shadcn/UI](https://ui.shadcn.com/) - 现代化 UI 组件库
- [GitBase](https://github.com/qiayue/GitBase) - 本项目的基础架构
- [1000UserGuide](https://github.com/naxiaoduo/1000UserGuide) - 渠道数据来源

特别感谢开源社区的无私奉献，让独立开发者能够站在巨人的肩膀上创造价值。

---

## English

### 📖 Project Introduction

**FindMyUsers** is a curated directory of marketing channels specifically designed for indie developers. We continuously collect and evaluate real, actionable free promotion channels from around the world, helping developers find their first users, validate product viability, and take the crucial first step in their cold start journey.

![FindMyUsers](https://github.com/qijin-3/find_my_users/blob/main/public/Screenshot/homepage_en.png)

### 🎯 Project Goals

Indie developers often face the challenge of "finding the first batch of users" during the cold start phase. This project aims to:

1. **Curate Real and Usable Free Promotion Channels**: Focus on free channel resources to help developers reduce marketing costs
2. **Provide Detailed Channel Reviews**: Including submission requirements, review time, expected exposure, and other key information
3. **Help Developers Take the First Step**: Reduce trial and error costs, helping indie developers validate product viability with minimal cost

### 🤝 Contributing

This is an AI-assisted open-source project, and we sincerely invite community members to participate. As a newcomer to indie development, I deeply understand the importance of community collaboration and hope that through everyone's joint efforts, this project can help more indie developers.

#### Ways to Contribute

You can participate in the project through the following ways:

1. **💡 Submit Channel Resources**: Share quality promotion channels you've discovered
2. **📊 Improve Evaluation Mechanisms**: Optimize channel assessment standards and methods
3. **🚀 Feature Suggestions**: Propose ideas and suggestions for improving the project
4. **🐛 Bug Reports**: Report issues you've found
5. **💻 Code Contributions**: Submit code improvements and new features

### Submission Methods

#### Method 1: Submit an Issue

Visit [GitHub Issues](https://github.com/qijin-3/find_my_users/issues) to submit channel information, including:

- Channel name (Chinese/English)
- Introduction: Help everyone quickly understand this channel
- Website operating status: Is this channel still operating? Avoid wasting indie developers' submission time
- Channel type: The type of this channel, which to some extent determines the promotion strategy
- Promotion scope: Domestic? International? Or only applicable to specific regions?
- Channel address: The link to this channel
- Submission address: The link to submit products
- Submission method: How does this channel require product submission? Fill out a form? Publish an article?
- Submission requirements: Are there limitations on product format? Or any special requirements?
- Review requirements: Does publishing products on this channel require review? How long does the review take?
- Expected exposure: How much exposure (readership) can this channel potentially bring to submitted products?
- Summary: This can be your experience sharing using this channel, or characteristics of this site, such as SEO-friendly, easy inclusion, etc.

#### Method 2: Submit Code

1. Fork this project
2. Add site information in `data/json/sitelists.json`
3. Create corresponding JSON files in the `data/Site/` directory
4. Submit a Pull Request

For detailed contribution guidelines, please refer to: [How to Contribute to FindMyUsers](https://github.com/qijin-3/find_my_users/issues/1)

### 📋 Development Roadmap

- [x] Basic channel collection functionality
- [ ] Continuously collect new promotion channels
- [ ] Add AI features that can help developers quickly validate ideas in the early stages
- [ ] Some unimportant emotional value
- [ ] Improve channel rating and recommendation system to help developers quickly filter available channels


### 📄 License

This project is open-sourced under the [MIT License](LICENSE), allowing free use, modification, and distribution.

### 🙏 Acknowledgments

This project is built upon the following excellent open-source projects:

- [Next.js](https://nextjs.org/) - The React Framework for Production
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Shadcn/UI](https://ui.shadcn.com/) - Modern UI component library
- [GitBase](https://github.com/qiayue/GitBase) - Foundation architecture for this project
- [1000UserGuide](https://github.com/naxiaoduo/1000UserGuide) - Source of channel data

Special thanks to the open-source community for their selfless contributions, enabling indie developers to create value by standing on the shoulders of giants.

---

**⭐ If this project helps you, please consider giving it a star on GitHub!**