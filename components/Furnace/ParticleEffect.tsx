"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface ParticleEffectProps {
  text: string;
  onComplete: () => void;
}

export default function ParticleEffect({ text, onComplete }: ParticleEffectProps) {
  // Split text into characters
  const characters = text.split('');

  useEffect(() => {
    // Play dissolve sound
    const audio = new Audio('/audio/dissolve.wav');
    audio.volume = 0.6;
    audio.play().catch(e => console.error("Audio play failed", e));

    // Reduced wait time before triggering next stage to 2s
    // This allows the particles to continue floating while the new scene fades in
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    // Removed bg-black to allow background transition underneath
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none overflow-hidden">
      <div className="relative w-full max-w-2xl px-4 flex flex-wrap content-center justify-center text-xl font-mono">
        {characters.map((char, i) => (
          <ParticleChar key={i} char={char} index={i} />
        ))}
      </div>
    </div>
  );
}

function ParticleChar({ char, index }: { char: string, index: number }) {
  const randomX = (Math.random() - 0.5) * 500;
  const randomY = -500 - Math.random() * 500;
  const randomRotate = (Math.random() - 0.5) * 360;
  const randomDelay = Math.random() * 0.5;

  return (
    <motion.span
      initial={{
        opacity: 1,
        x: 0,
        y: 0,
        color: '#fff',
        textShadow: '0 0 0px rgba(255,255,255,0)'
      }}
      animate={{
        opacity: 0,
        x: randomX,
        y: randomY,
        rotate: randomRotate,
        color: ['#fff', '#ffaa00', '#ff0000', '#000'],
        scale: [1, 1.5, 0],
      }}
      transition={{
        // Increased base duration to 5s + random
        duration: 5 + Math.random(),
        delay: randomDelay,
        ease: "easeOut"
      }}
      className="inline-block whitespace-pre"
    >
      {char}
    </motion.span>
  );
}
