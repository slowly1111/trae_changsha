"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import clsx from 'clsx';
import { trackEvent } from '@/components/GoogleAnalytics';

interface InputStageProps {
  onComplete: (text: string, durationMs: number) => void;
}

export default function InputStage({ onComplete }: InputStageProps) {
  const [text, setText] = useState('');
  const [progress, setProgress] = useState(0);
  const [isPressing, setIsPressing] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const requestRef = useRef<number>();
  const containerControls = useAnimation();
  const startTimeRef = useRef<number>(0);

  // 埋点相关状态
  const hasStartedInputRef = useRef(false);
  const editCountRef = useRef(0);
  const hasBurnAttemptedRef = useRef(false);

  useEffect(() => {
    audioRef.current = new Audio('/audio/fire_burning.wav');
    audioRef.current.loop = true;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // 处理文本变化 - 追踪 input_start 和 text_edit_count
  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);

    // 首次输入追踪
    if (!hasStartedInputRef.current && newText.length > 0) {
      hasStartedInputRef.current = true;
      trackEvent('input_start', { text_length: newText.length });
    }

    // 编辑次数追踪
    if (hasStartedInputRef.current) {
      editCountRef.current += 1;
    }
  }, []);

  const startPress = () => {
    if (!text.trim()) return;
    setIsPressing(true);
    startTimeRef.current = Date.now();
    hasBurnAttemptedRef.current = true;

    // 追踪 burn_attempt
    trackEvent('burn_attempt', {
      text_length: text.length,
      edit_count: editCountRef.current
    });

    if (audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current.play().catch(() => { });
    }

    const duration = 2000; // 2 seconds

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const p = Math.min(elapsed / duration, 1);
      setProgress(p);

      // Audio volume
      if (audioRef.current) {
        audioRef.current.volume = p;
      }

      // Vibrate/Shake effect
      if (p > 0.1) {
        const intensity = p * 10;
        containerControls.start({
          x: Math.random() * intensity - intensity / 2,
          y: Math.random() * intensity - intensity / 2,
          transition: { duration: 0.05 }
        });

        // Haptic feedback if available
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          if (Math.random() < p) navigator.vibrate(20);
        }
      }

      if (p < 1) {
        requestRef.current = requestAnimationFrame(animate);
      } else {
        // Complete
        const actualDuration = Date.now() - startTimeRef.current;
        setIsPressing(false);
        if (audioRef.current) audioRef.current.pause();

        // 追踪 burn_complete
        trackEvent('burn_complete', {
          text_length: text.length,
          press_duration_ms: actualDuration,
          edit_count: editCountRef.current
        });

        onComplete(text, actualDuration);
      }
    };

    requestRef.current = requestAnimationFrame(animate);
  };

  const endPress = () => {
    // 如果在按压过程中松开（未完成），追踪 burn_abandon
    if (isPressing && progress < 1 && hasBurnAttemptedRef.current) {
      trackEvent('burn_abandon', {
        progress_percent: Math.round(progress * 100),
        text_length: text.length
      });
    }

    setIsPressing(false);
    setProgress(0);
    if (requestRef.current) cancelAnimationFrame(requestRef.current);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    containerControls.start({ x: 0, y: 0 });
  };

  // Calculate text color based on progress
  const getTextColor = () => {
    if (progress < 0.5) {
      return `rgb(255, ${255 * (1 - progress * 2)}, ${255 * (1 - progress * 2)})`;
    } else {
      return `rgb(255, ${255 * (progress - 0.5) * 2}, ${255 * (progress - 0.5) * 2})`;
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center w-full max-w-2xl px-4"
      animate={containerControls}
    >
      <h1 className="text-4xl font-bold mb-8 text-white/80 tracking-widest">熔炉 2025</h1>

      <div className="relative w-full h-64 mb-12 group">
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="写下你想销毁的 2025 记忆..."
          className={clsx(
            "w-full h-full bg-black/30 border-2 rounded-xl p-6 text-xl resize-none outline-none transition-all duration-300",
            isPressing ? "border-red-500/50" : "border-white/10 focus:border-white/30"
          )}
          style={{
            color: getTextColor(),
            textShadow: progress > 0.5 ? `0 0 ${progress * 20}px rgba(255,200,200,0.8)` : 'none'
          }}
          disabled={isPressing}
        />

        {/* Burning overlay effect */}
        {isPressing && (
          <div
            className="absolute inset-0 pointer-events-none rounded-xl bg-red-500/10 mix-blend-overlay"
            style={{ opacity: progress }}
          />
        )}
      </div>

      <div className="relative">
        {/* Ripple Effect */}
        {isPressing && (
          <motion.div
            className="absolute inset-0 rounded-full bg-red-600"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.5 + progress, opacity: 0 }}
            transition={{ repeat: Infinity, duration: 1 }}
          />
        )}

        <button
          onPointerDown={startPress}
          onPointerUp={endPress}
          onPointerLeave={endPress}
          disabled={!text.trim()}
          className={clsx(
            "relative z-10 w-32 h-32 rounded-full flex items-center justify-center border-4 transition-all duration-200 select-none touch-none",
            text.trim()
              ? "bg-red-900/20 border-red-500/50 text-red-500 hover:bg-red-900/40 hover:scale-105 active:scale-95 cursor-pointer"
              : "bg-gray-900/20 border-gray-700 text-gray-700 cursor-not-allowed"
          )}
        >
          <div className="flex flex-col items-center">
            {isPressing ? (
              <span className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]">
                {(progress * 100).toFixed(0)}%
              </span>
            ) : (
              <>
                <span className="text-lg font-medium">按住</span>
                <span className="text-sm opacity-70">熔断</span>
              </>
            )}
          </div>

          {/* Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
            <circle
              cx="64"
              cy="64"
              r="60"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeDasharray={377}
              strokeDashoffset={377 * (1 - progress)}
              className="text-red-500 transition-all duration-75"
            />
          </svg>
        </button>
      </div>

      <p className="mt-8 text-white/30 text-sm animate-pulse">
        {isPressing ? "正在升温..." : "长按按钮以销毁记忆"}
      </p>
    </motion.div>
  );
}


