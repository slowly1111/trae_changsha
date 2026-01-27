# 🔥 熔炉 2025 → 2026 | Trae Changsha

> **"2025 的灰烬，是 2026 的养料。"**

一款基于情感"炼金术"理念的新春治愈工具——将 2025 的负面记忆投入熔炉，蜕变为 2026 的治愈旋律与灵魂寄语。

![项目预览](trae1.png)

---

## ✨ 产品亮点

### 🎭 三阶段沉浸式体验

| 阶段 | 名称 | 交互 |
|:---:|:---:|:---|
| **前期** | 能量积蓄 | 长按"熔断"按钮，文字发热变色、屏幕震动、火焰音效渐强 |
| **中期** | 毁灭坍缩 | 文本粒子化飘散消失，背景坍缩至虚无 |
| **后期** | 重生回响 | 金光绽放，AI 治愈文案浮现，新春音乐响起 |

### 🧠 AI 情感引擎

- 接入豆包 API（Doubao-Pro）进行语义情感分析
- 识别四大情绪类型：**焦虑/压力**、**遗憾/失落**、**愤怒/不公**、**迷茫**
- 生成王家卫式极简、温暖、不鸡汤的治愈文案
- 赋予用户独一无二的 **2026 灵魂关键词**

### 🎵 情感音乐映射

| 情绪类型 | 音乐风格 | 对应曲目 |
|:---:|:---:|:---|
| 焦虑/压力 | 忙中带喜 | 《今年也算顺顺利利》 |
| 遗憾/失恋 | 平稳祝福 | 《慢慢迎着新年》 |
| 愤怒/不公 | 喜庆开心 | 《热闘已经在路上》 |
| 迷茫/失落 | 平稳祝福 | 《慢慢迎着新年》 |
| 默认 | 团圆陪伴 | 《回家这件小事》 |

---

## 🛠 技术栈

| 类别 | 技术 |
|:---:|:---|
| **框架** | Next.js 14 (App Router) |
| **样式** | Tailwind CSS |
| **动画** | Framer Motion（粒子化、震动、过渡动效） |
| **图标** | Lucide React |
| **海报生成** | html-to-image |
| **AI 接口** | 豆包 API (Doubao-Pro) |
| **部署** | Vercel |

---

## 📁 项目结构

```
情绪熔炉2/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts          # 情感分析 API（豆包接入 + Mock 降级）
│   ├── globals.css               # 全局样式
│   ├── layout.tsx                # 根布局
│   └── page.tsx                  # 主页面（三阶段状态机）
├── components/
│   └── Furnace/
│       ├── InputStage.tsx        # 输入阶段：长按交互、能量积蓄
│       ├── ParticleEffect.tsx    # 粒子化动画：文字飘散消失
│       ├── FurnaceBackground.tsx # 熔炉阶段背景
│       ├── DawnBackground.tsx    # 重生阶段黎明背景
│       ├── RebirthStage.tsx      # 重生阶段：文案+关键词+操作
│       ├── MusicControl.tsx      # 音乐控制组件
│       └── PosterTemplate.tsx    # 海报模板（用于导出）
├── public/
│   └── audio/                    # 新春音乐库
│       ├── shun_li.mp3           # 今年也算顺顺利利
│       ├── man_man.mp3           # 慢慢迎着新年
│       ├── re_nao.mp3            # 热闹已经在路上
│       ├── hui_jia.mp3           # 回家这件小事
│       └── fire_burning.mp3      # 燃烧音效
├── TRAE_Changsha_music/          # 原始音乐资源
│   └── map.json                  # 情绪-音乐映射配置
├── prd                           # 产品需求文档
├── package.json
├── tailwind.config.ts            # Tailwind 配置（含 shake 动画）
└── vercel.json                   # Vercel 部署配置
```

---

## 🚀 快速开始

### 本地开发

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev

# 3. 访问
open http://localhost:3000
```

### 环境变量配置（可选）

如需启用真正的 AI 语义分析，请在项目根目录创建 `.env.local` 文件：

```env
DOUBAO_API_KEY=your_api_key_here
DOUBAO_API_URL=https://api.doubao.com/v1/chat/completions
DOUBAO_MODEL=doubao-pro
```

> **注意**：未配置环境变量时，系统将自动使用内置的 Mock 逻辑，应用仍可正常运行。

---

## ☁️ 一键部署到 Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/import?s=https%3A%2F%2Fgithub.com%2Fslowly1111%2Ftrae_changsha)

或手动操作：
1. Fork 本仓库
2. 在 [Vercel](https://vercel.com) 导入项目
3. 在 Environment Variables 中添加豆包 API 配置（可选）
4. 部署完成后获得公开访问链接

---

## 🎮 核心交互说明

### 输入阶段 (InputStage)

- **长按触发**：按住"熔断"按钮 2 秒触发销毁
- **视觉反馈**：
  - 文字颜色：白 → 橙红 → 亮白
  - 按钮周围红色波纹扩散
  - 屏幕微震
- **音效**：燃烧噼啪声随按压时长增大
- **触觉**：移动端支持 `navigator.vibrate` 触觉反馈

### 粒子化阶段 (ParticleEffect)

- 文本拆解为单个字符粒子
- 粒子受"热气流"影响向上飘散
- 渐变模糊并消失
- 背景坍缩至全黑

### 重生阶段 (RebirthStage)

- 白光闪烁过渡
- 治愈文案逐字浮现（电影字幕感）
- 2026 灵魂关键词卡片展示
- 新春音乐自动播放（支持控制）
- 支持保存"灵感卡片"海报

---

## 📖 API 说明

### POST `/api/analyze`

**请求体**：
```json
{
  "text": "用户输入的 2025 记忆文本"
}
```

**响应**：
```json
{
  "emotion_type": "stress | regret | anger | lost | default",
  "healing_text": "AI 生成的治愈文案",
  "soul_keyword": "两字灵魂关键词",
  "music_file": "/audio/xxx.mp3"
}
```

---

## 📜 许可

本项目仅供演示与交流使用。

---

## 🎯 关于 Trae Changsha

本项目为 **Trae Hackathon 2026 新春特别版** 作品，使用 Trae AI 辅助开发，旨在探索情感计算与治愈体验的结合。

> **路演开场白**：*"2025 的灰烬，是 2026 的养料。"*
