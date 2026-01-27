"use client";

import React from 'react';

interface PosterTemplateProps {
  healingText: string;
  soulKeyword: string;
}

export const PosterTemplate = React.forwardRef<HTMLDivElement, PosterTemplateProps>(
  ({ healingText, soulKeyword }, ref) => {
    return (
      <div
        ref={ref}
        className="relative w-[600px] h-[900px] bg-[#FDFBF7] overflow-hidden flex flex-col p-12"
        style={{ fontFamily: '"Songti SC", "SimSun", serif' }}
      >
        {/* Background Base */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, #FDFBF7 0%, #F5E6CA 100%)`
          }}
        />

        {/* Decorative Watermark (Trae Logo or Abstract) */}
        <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] border-[40px] border-[#B8860B]/5 rounded-full blur-[2px]" />
        <div className="absolute bottom-[-150px] left-[-50px] w-[400px] h-[400px] bg-gradient-to-tr from-[#B8860B]/5 to-transparent rounded-full blur-[80px]" />

        {/* Elegant Frame Border (Double Line) */}
        <div className="absolute inset-5 border border-[#B8860B]/30 pointer-events-none" />
        <div className="absolute inset-7 border border-[#B8860B]/10 pointer-events-none" />

        {/* Grain Texture */}
        <div
          className="absolute inset-0 opacity-[0.4] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 flex-1 flex flex-row-reverse justify-between items-stretch pl-8 pr-4 py-8">

          {/* RIGHT SIDE: Vertical Text Area */}
          <div className="flex flex-row-reverse items-start gap-12 h-full pt-12">

            {/* Header Stamp */}
            <div className="flex flex-col items-center gap-3 ml-4 opacity-70">
              <div className="writing-vertical-rl text-[10px] tracking-[0.4em] uppercase text-[#8B7355]">
                Furnace Rebirth
              </div>
              <div className="w-[1px] h-16 bg-[#B8860B]/40" />
              <div className="w-6 h-6 border-2 border-[#D7342F] rotated-45 flex items-center justify-center rounded-sm bg-transparent shadow-[0_0_2px_rgba(215,52,47,0.3)]">
                <span className="text-[10px] text-[#D7342F] font-bold font-serif scale-110" style={{ textShadow: '0 0 1px rgba(215,52,47,0.2)' }}>丙午</span>
              </div>
            </div>

            {/* Main Healing Text - Vertical */}
            <div className="writing-vertical-rl text-3xl md:text-4xl text-[#2C1810] font-medium leading-[2.5] tracking-widest h-[650px] flex flex-wrap content-start gap-8"
              style={{
                textOrientation: 'upright',
                fontVariantNumeric: 'lining-nums' // Fix number alignment
              }}>
              {/* Split text manually if needed or let flex wrap handle it, but for vertical visual appeal, we often want specific breaks */}
              <p>{healingText}</p>
            </div>
          </div>

          {/* LEFT SIDE: Info & Keyword */}
          <div className="flex flex-col justify-end items-start pb-8 pl-4 space-y-12">

            {/* 2026 Highlight */}
            <div className="relative group">
              <div className="absolute -left-6 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#B8860B] to-transparent" />
              <div className="text-xs text-[#8B7355] tracking-[0.3em] mb-2 uppercase">Soul Keyword</div>
              <div className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#B8860B] to-[#8B4513]"
                style={{
                  fontFamily: '"Songti SC", serif',
                  textShadow: '2px 2px 0px rgba(255,255,255,0.5)'
                }}>
                {soulKeyword}
              </div>
            </div>

            {/* Footer Seal */}
            <div className="flex items-center gap-3 opacity-60">
              <div className="border border-[#B8860B] w-8 h-8 flex items-center justify-center rounded-full">
                <span className="text-[10px] text-[#B8860B] font-serif">Trae</span>
              </div>
              <div className="h-[1px] w-12 bg-[#B8860B]/40" />
              <span className="text-[10px] tracking-[0.2em] text-[#8B7355]">
                CHANSHA
              </span>
            </div>
          </div>

        </div>

        {/* Global Styles for Vertical Writing */}
        <style jsx global>{`
          .writing-vertical-rl {
            writing-mode: vertical-rl;
          }
        `}</style>
      </div>
    );
  }
);

PosterTemplate.displayName = 'PosterTemplate';
