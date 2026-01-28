"use client";

import Script from 'next/script';

const GA_MEASUREMENT_ID = 'G-X1M15ZEGFL';

export default function GoogleAnalytics() {
    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
            </Script>
        </>
    );
}

// 自定义事件追踪函数
export function trackEvent(eventName: string, parameters?: Record<string, unknown>) {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, parameters);
    }
}

// 声明 gtag 类型
declare global {
    interface Window {
        gtag: (...args: unknown[]) => void;
    }
}
