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
        className="relative w-[600px] h-[800px] bg-[#FFF8E1] overflow-hidden flex flex-col items-center justify-center p-12 text-center"
        style={{ fontFamily: 'serif' }} // Ensure font is consistent
      >
        {/* Background Base */}
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at center, #FFFFFF 0%, #FFF8E1 60%, #FFF8E1 100%)`
          }}
        />

        {/* Decorative Elements (Simplified DawnBackground) */}
        <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-red-500/10 blur-[80px] rounded-full" />
        <div className="absolute bottom-[20%] right-[5%] w-[400px] h-[400px] bg-red-600/10 blur-[100px] rounded-full" />
        
        {/* Grain Texture */}
        <div 
          className="absolute inset-0 opacity-[0.15] mix-blend-multiply pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-between h-full py-12">
            
            {/* Top: Title/Year */}
            <div className="text-[#1A1A1A]/40 text-sm tracking-[0.5em] uppercase border-b border-[#1A1A1A]/10 pb-4 mb-8">
                Furnace 2025 · Rebirth
            </div>

            {/* Middle: Main Content */}
            <div className="space-y-12">
                <div className="text-3xl leading-relaxed text-[#1A1A1A] font-serif px-8">
                    {healingText}
                </div>

                <div className="relative">
                    <div className="text-xs text-[#1A1A1A]/60 uppercase tracking-widest mb-4">2026 灵魂关键词</div>
                    <div className="text-8xl font-bold text-[#B8860B] tracking-tight">
                        {soulKeyword}
                    </div>
                </div>
            </div>

            {/* Bottom: Footer */}
            <div className="mt-auto pt-12 flex flex-col items-center gap-4">
                {/* Trae QR/Logo Image */}
                <div className="w-16 h-16 bg-white/50 backdrop-blur-sm p-1 rounded-xl shadow-sm border border-[#1A1A1A]/5 flex items-center justify-center">
                   {/* eslint-disable-next-line @next/next/no-img-element */}
                   <img 
                     src="/images/trae_qr.png" 
                     alt="Trae" 
                     className="w-full h-full object-contain opacity-90"
                   />
                </div>
                
                <div className="text-[#1A1A1A]/30 text-xs tracking-widest font-sans">
                    Powered by Trae
                </div>
            </div>
        </div>
      </div>
    );
  }
);

PosterTemplate.displayName = 'PosterTemplate';
