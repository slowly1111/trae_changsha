"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function FurnaceBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#0a0505]">
      {/* Dark Magma Gradient */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          background: `
            radial-gradient(circle at 50% 120%, #4a0404 0%, #1a0101 40%, #000000 80%),
            linear-gradient(to top, #200505 0%, transparent 100%)
          `
        }}
      />

      {/* Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle Pulsing Glow */}
      <motion.div
        className="absolute inset-0 bg-red-900/10"
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Ember particles */}
      <div className="absolute inset-0 overflow-hidden">
         {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-orange-500/50 rounded-full blur-[1px]"
              initial={{ 
                x: Math.random() * 100 + "vw", 
                y: "100vh",
                opacity: 0 
              }}
              animate={{ 
                y: "-10vh",
                opacity: [0, 1, 0],
                x: `calc(${Math.random() * 100}vw + ${(Math.random() - 0.5) * 200}px)`
              }}
              transition={{ 
                duration: 5 + Math.random() * 10, 
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear"
              }}
            />
         ))}
      </div>
    </div>
  );
}
