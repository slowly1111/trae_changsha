"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, RefreshCw } from 'lucide-react';
import MusicControl from './MusicControl';
import { toPng } from 'html-to-image';
import { PosterTemplate } from './PosterTemplate';

interface AnalysisResult {
  emotion_type: string;
  healing_text: string;
  soul_keyword: string;
  music_file: string;
}

interface RebirthStageProps {
  analysisResult: AnalysisResult | null;
}

export default function RebirthStage({ analysisResult }: RebirthStageProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const posterRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMusicHint, setShowMusicHint] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Play Music when result is available
    if (analysisResult?.music_file) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(analysisResult.music_file);
      audioRef.current.loop = true; // Loop the music
      audioRef.current.volume = 0;
      
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true);
          // Show hint shortly after music starts (1.5s delay)
          setTimeout(() => setShowMusicHint(true), 1500);
          // Hide hint after 4.5s duration (1.5s + 4.5s = 6s)
          setTimeout(() => setShowMusicHint(false), 6000);
        }).catch(e => {
          console.log("Audio auto-play failed:", e);
          setIsPlaying(false);
        });
      }
      
      // Fade in
      let vol = 0;
      const fade = setInterval(() => {
        if (audioRef.current && vol < 0.8) {
          vol += 0.05;
          audioRef.current.volume = vol;
        } else {
          clearInterval(fade);
        }
      }, 200);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [analysisResult]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSavePoster = async () => {
    if (!posterRef.current || isSaving) return;

    setIsSaving(true);
    try {
      // Small delay to allow UI to update (show loading state)
      await new Promise(resolve => setTimeout(resolve, 100));

      const dataUrl = await toPng(posterRef.current, {
        quality: 1.0,
        pixelRatio: 2, // High resolution
        cacheBust: true,
      });

      const link = document.createElement('a');
      link.download = `furnace-2026-rebirth.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to generate poster:', err);
      window.alert("灵感封存失败，请重试或截屏保存。");
    } finally {
      setIsSaving(false);
    }
  };

  // If data is not ready yet (rare case if API is very slow), keep transparent
  // The parent container handles the fade-in, so this will just appear empty until data arrives
  if (!analysisResult) {
    return null;
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-8 overflow-hidden">
      
      {/* Hidden Poster Template */}
      <div className="fixed top-0 left-0 opacity-0 pointer-events-none z-[-1]">
        <PosterTemplate 
          ref={posterRef}
          healingText={analysisResult.healing_text}
          soulKeyword={analysisResult.soul_keyword}
        />
      </div>

      {/* Music Control - Floating Top Right */}
      <MusicControl 
        isPlaying={isPlaying} 
        onToggle={toggleMusic} 
        showHint={showMusicHint} 
      />

      <div className="max-w-2xl w-full text-center relative z-10 space-y-12">
        {/* Healing Text */}
        <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="text-2xl md:text-4xl font-serif leading-relaxed text-[#1A1A1A] drop-shadow-sm relative z-10"
            >
              {analysisResult.healing_text.split('').map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block relative"
                  initial={{ opacity: 0, filter: 'blur(5px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, delay: 1 + i * 0.1 }}
                >
                  {char}
                  {/* Shimmer Effect per character */}
                  <motion.span 
                    className="absolute inset-0 text-[#B8860B] opacity-0 pointer-events-none"
                    animate={{ 
                        opacity: [0, 0.8, 0],
                        backgroundPosition: ['-100%', '200%']
                    }}
                    transition={{ 
                        duration: 1.5, 
                        delay: 2 + i * 0.1, 
                        ease: "easeInOut" 
                    }}
                    style={{
                        background: 'linear-gradient(90deg, transparent, rgba(184, 134, 11, 0.8), transparent)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                    }}
                  >
                    {char}
                  </motion.span>
                </motion.span>
              ))}
            </motion.div>
        </div>

        {/* Keyword Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 3, type: "spring" }}
          className="inline-block bg-white/40 backdrop-blur-md border border-[#B8860B]/20 p-8 rounded-2xl shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
        >
          <div className="text-xs text-[#1A1A1A]/60 uppercase tracking-widest mb-2 font-medium">2026 灵魂关键词</div>
          <div className="text-5xl md:text-7xl font-bold text-[#B8860B]">
            {analysisResult.soul_keyword}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5, duration: 1 }}
          className="flex justify-center gap-6 mt-12"
        >
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#1A1A1A]/5 hover:bg-[#1A1A1A]/10 transition-colors text-[#1A1A1A]/80"
          >
            <RefreshCw size={18} />
            再试一次
          </button>
          
          <button 
            onClick={handleSavePoster}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#B8860B]/10 hover:bg-[#B8860B]/20 text-[#B8860B] transition-colors border border-[#B8860B]/30 disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px] justify-center"
          >
            {isSaving ? (
               <span className="animate-pulse">正在封存灵感...</span>
            ) : (
               <>
                 <Download size={18} />
                 保存灵感卡片
               </>
            )}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
