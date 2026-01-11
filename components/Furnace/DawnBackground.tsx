"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function DawnBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#FFF8E1]">
      {/* Background Base: Warm Gold to Ivory Radial Gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at center, #FFFFFF 0%, #FFF8E1 60%, #FFF8E1 100%)`
        }}
      />
      
      {/* Edge Cinnabar Red Glow (Low Saturation, Diffuse) */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, transparent 60%, rgba(200, 50, 50, 0.05) 100%)`
        }}
      />

      {/* Floating Red Halos (Lanterns Impression) */}
      <motion.div 
        className="absolute top-[10%] left-[5%] w-[40vw] h-[40vw] bg-red-500/10 blur-[120px] rounded-full pointer-events-none"
        animate={{ 
          x: [0, 50, 0], 
          y: [0, -30, 0],
          opacity: [0.08, 0.12, 0.08] 
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-[20%] right-[5%] w-[50vw] h-[50vw] bg-red-600/10 blur-[150px] rounded-full pointer-events-none"
        animate={{ 
          x: [0, -40, 0], 
          y: [0, 40, 0],
          opacity: [0.05, 0.1, 0.05] 
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div 
        className="absolute top-[40%] right-[30%] w-[25vw] h-[25vw] bg-red-400/10 blur-[100px] rounded-full pointer-events-none"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.08, 0.05] 
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      />

      {/* Golden Dust Particles (Snow-like falling) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#D4AF37]"
            style={{
               boxShadow: '0 0 4px rgba(212, 175, 55, 0.6)'
            }}
            initial={{ 
              x: Math.random() * 100 + "vw", 
              y: -20,
              scale: Math.random() * 0.5 + 0.2,
              opacity: 0 
            }}
            animate={{ 
              y: "100vh",
              x: `calc(${Math.random() * 100}vw + ${(Math.random() - 0.5) * 50}px)`,
              opacity: [0, 0.8, 0],
            }}
            transition={{ 
              duration: 15 + Math.random() * 20, // Very slow falling
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear"
            }}
          >
             {/* Flicker Animation */}
             <motion.div 
               animate={{ opacity: [0.5, 1, 0.5] }}
               transition={{ duration: 2 + Math.random(), repeat: Infinity }}
               className="w-full h-full rounded-full bg-white/50"
             />
          </motion.div>
        ))}
      </div>
      
      {/* Subtle Grain Texture for Quality */}
       <div 
        className="absolute inset-0 opacity-[0.15] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
