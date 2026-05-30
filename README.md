<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite" alt="Vite">
  <img src="https://img.shields.io/badge/Ant_Design-5.0-0170FE?logo=antdesign" alt="Ant Design">
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License">
</p>

<h1 align="center">🧠 MBTI 性格测试</h1>
<p align="center">
  <b>基于荣格心理学 · 50道科学题库 · 精准人格分析</b>
</p>
<p align="center">
  无需注册登录 · 无需下载安装 · 打开浏览器即刻体验
</p>

<p align="center">
  <a href="https://wisheritestzz.github.io/Mint/"><b>🔗 立即体验在线版</b></a>
</p>

---

## ✨ 亮点

- **科学测评** — 基于荣格八维理论与 MBTI Step I 量表核心逻辑，100题题库随机抽50题，四维度均衡
- **极致体验** — 流畅翻页动画、题目导航网格、一键跳转未答题、结果页预加载
- **隐私优先** — 无需注册登录，数据仅存储在浏览器本地，不上传服务器
- **专业报告** — 维度得分对比条 + ECharts 可视化 + 结果可信度标识 + 人格解读 + PDF 报告下载
- **全端适配** — 手机 / 平板 / 桌面完美响应式，触摸优化，安全区适配
- **断点续答** — 自动保存答题进度（24h有效），关闭浏览器也不怕
- **交互打磨** — 选项 emoji 辅助、鼓励提示随进度变化、答题状态一目了然

## 🎯 功能概览

| 模块 | 功能 |
|------|------|
| 🏠 首页 | 品牌展示、流程说明、一键开始测试、缓存续答提醒 |
| 📋 测试页 | 100题题库随机抽50题、5级量表+emoji、翻页动画、题目导航网格、一键跳未答题、结果页预加载 |
| 📊 结果页 | 人格类型渐显揭晓、四维得分对比条+ECharts图表、可信度标识、专业人格解读 |
| 📤 分享 | 截图保存（带水印）、PDF 报告下载、一键分享文案、WebShare API |
| 📜 历史 | 本地保留最近 3 次测试记录，方便对比 |

## 📝 版本记录

### V2 (2026-05-30)
- 题库从50题扩充至100题，每次随机抽取50题，四维度保证均衡
- 新增题目导航面板：题号网格，已答/未答/当前一目了然，点击快速跳转
- 新增"跳至未答题"按钮，快速定位遗漏题目
- 结果页新增得分对比条、差值显示、可信度徽章
- 进度达80%时预加载结果页，提交后秒出结果
- 选项增加 emoji 表情辅助，降低认知负担
- 鼓励提示从4条增至10条，匹配不同进度阶段

### V1 (2026-05-30)
- 完成首页、测试说明页、答题页、结果页
- 50道题库 + 评分算法 + 维度阈值检测
- localStorage 缓存续答 + 历史记录
- ECharts 维度图 + PDF/截图/分享
- GitHub Pages 自动部署

## 🚀 快速开始

```bash
# 克隆项目
git clone https://github.com/wisheritestzz/Mint.git
cd Mint

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 🛠 技术栈

| 层面 | 技术 |
|------|------|
| 框架 | React 19 + TypeScript |
| 构建 | Vite 8 |
| UI | Ant Design 5 + Tailwind CSS |
| 状态管理 | Zustand |
| 图表 | ECharts (echarts-for-react) |
| 动画 | Framer Motion |
| 截图 | html2canvas |
| PDF | jsPDF |
| 部署 | GitHub Pages (免费) |

## 📱 响应式设计

项目针对三种断点做了完整适配：

- **手机** (< 768px) — 单列布局，大触摸区域，适配安全区
- **平板** (768-1024px) — 舒适间距，兼顾信息密度
- **桌面** (> 1024px) — 居中窄栏，聚焦内容

## 🤝 贡献

欢迎提出 Issue 或 Pull Request！

## 📄 许可

MIT License — 自由使用、修改和分发。

---

<p align="center">
  <sub>Made with ❤️ by MBTI Test Team</sub>
</p>
