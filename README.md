# Trae Changsha · 情绪熔炉 2025 → 2026

极致东方留白的 Next.js 体验：焚烧 2025 的负面记忆，生成 2026 的治愈文案与新年音乐。

## 一键部署到 Vercel

- 直接导入并部署（推荐）：
  - https://vercel.com/new/import?s=https%3A%2F%2Fgithub.com%2Fslowly1111%2Ftrae_changsha
- 或使用 “Clone & Deploy”：
  - https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fslowly1111%2Ftrae_changsha

部署后将获得一个公开访问链接（例如 `https://trae-changsha.vercel.app/`），将该链接填入 GitHub 仓库主页 About → Website，或在 README 顶部放置入口，便于他人直接访问。

## 环境变量（可选）

若需启用真正的语义分析，请在 Vercel 项目的 Environment Variables 中添加：

- `DOUBAO_API_KEY`
- `DOUBAO_API_URL`
- `DOUBAO_MODEL`

若未配置，后端接口将自动使用降级的 **Mock** 逻辑，应用仍可正常运行。接口实现参见：
- [app/api/analyze/route.ts](file:///d:/trae_projects/情绪熔炉2/app/api/analyze/route.ts)

## 技术栈

- Next.js + TailwindCSS + Framer Motion
- 语义分析 + 情感映射 → 长沙新春音乐库
- 海报生成：`html-to-image`

## 本地开发

```bash
npm install
npm run dev
```

## 许可

仅供演示与交流使用。

