import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

// SEO 配置
export const metadata: Metadata = {
  // 基础信息
  title: {
    default: "情绪熔炉 | 将 2025 的遗憾焚烧成 2026 的希望",
    template: "%s | 情绪熔炉"
  },
  description: "一款 AI 驱动的数字疗愈工具。将你 2025 年的负面记忆、遗憾、焦虑投入熔炉，通过沉浸式交互体验将其转化为治愈文案。告别过去，拥抱新生。",
  keywords: [
    "情绪熔炉",
    "数字疗愈",
    "AI 疗愈",
    "新年仪式",
    "2025 告别",
    "2026 新年",
    "情绪释放",
    "负面情绪处理",
    "心理治愈",
    "AI 治愈文案",
    "情感宣泄",
    "新年许愿"
  ],
  authors: [{ name: "情绪熔炉团队" }],
  creator: "情绪熔炉",
  publisher: "情绪熔炉",

  // Open Graph (社交媒体分享)
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "情绪熔炉",
    title: "情绪熔炉 | 焚烧 2025，重生 2026",
    description: "将你 2025 年的遗憾投入熔炉，AI 为你转化成治愈回响。一场关于告别与新生的心理仪式。",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "情绪熔炉 - 数字疗愈工具"
      }
    ]
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "情绪熔炉 | 焚烧 2025，重生 2026",
    description: "将你 2025 年的遗憾投入熔炉，AI 为你转化成治愈回响。",
    images: ["/og-image.png"]
  },

  // 其他 SEO 设置
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },

  // 网站图标
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  },

  // 主题色
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1a0a0a" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0505" }
  ],

  // 规范链接
  metadataBase: new URL("https://emotional-furnace.vercel.app"),
  alternates: {
    canonical: "/"
  }
};

// 视口配置
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0a0505"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}

