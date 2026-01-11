"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Pause, Play } from 'lucide-react';

interface MusicControlProps {
  isPlaying: boolean;
  onToggle: () => void;
  showHint: boolean;
}

export default function MusicControl({ isPlaying, onToggle, showHint }: MusicControlProps) {
  // Local state for hover
  const [isHovered, setIsHovered] = useState(false);

  // Determine if hint should be shown (either by parent logic or hover)
  const shouldShowHint = showHint || isHovered;

  return (
    <div 
      className="fixed top-8 right-8 z-50 flex items-center gap-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hint Text */}
      <AnimatePresence>
        {shouldShowHint && (
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.5 }}
            className="text-xs text-[#1A1A1A]/60 font-serif tracking-widest hidden sm:block pointer-events-none select-none"
          >
            听，这是 2026 的声音
          </motion.span>
        )}
      </AnimatePresence>

      {/* Control Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }} // Fade in slightly after page load
        onClick={onToggle}
        className="relative w-10 h-10 rounded-full bg-white/30 backdrop-blur-md border border-[#B8860B]/50 flex items-center justify-center text-[#B8860B] hover:bg-white/50 transition-colors shadow-sm overflow-hidden"
      >
        {/* Animated Icon */}
        <motion.div
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <Music size={18} className="opacity-80" />
        </motion.div>
      </motion.button>
    </div>
  );
}
