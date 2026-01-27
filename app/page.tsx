"use client";

import { useState, useRef } from 'react';
import InputStage from '@/components/Furnace/InputStage';
import ParticleEffect from '@/components/Furnace/ParticleEffect';
import RebirthStage from '@/components/Furnace/RebirthStage';
import FurnaceBackground from '@/components/Furnace/FurnaceBackground';
import DawnBackground from '@/components/Furnace/DawnBackground';
import { AnimatePresence, motion } from 'framer-motion';
import { saveBurnRecord, getSessionId } from '@/lib/supabase';

type Stage = 'input' | 'burning' | 'rebirth';

interface AnalysisResult {
  emotion_type: string;
  healing_text: string;
  soul_keyword: string;
  music_file: string;
  lighting_coefficient: number;
}

export default function Home() {
  const [stage, setStage] = useState<Stage>('input');
  const [text, setText] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [currentRecordId, setCurrentRecordId] = useState<string | null>(null);
  const pressDurationRef = useRef<number>(0);

  const fetchAnalysis = async (inputText: string) => {
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText }),
      });
      const data = await res.json();
      setAnalysisResult(data);

      // 保存到 Supabase
      try {
        const sessionId = getSessionId();
        const record = await saveBurnRecord({
          session_id: sessionId,
          input_text: inputText,
          emotion_type: data.emotion_type,
          healing_text: data.healing_text,
          soul_keyword: data.soul_keyword,
          press_duration_ms: pressDurationRef.current,
          saved_poster: false,
        });
        if (record?.id) {
          setCurrentRecordId(record.id);
        }
      } catch (dbError) {
        console.error("Failed to save to Supabase:", dbError);
      }
    } catch (error) {
      console.error("Analysis failed", error);
      // Fallback
      setAnalysisResult({
        emotion_type: 'default',
        healing_text: "新的一年，愿你心之所向，素履以往。",
        soul_keyword: "希望",
        lighting_coefficient: 0.8,
        music_file: '/audio/suno_newyear_vibe.mp3'
      });
    }
  };

  const handleInputComplete = (inputText: string, durationMs?: number) => {
    setText(inputText);
    pressDurationRef.current = durationMs || 2000;
    setStage('burning');
    // Start fetching data immediately when burning starts
    fetchAnalysis(inputText);
  };

  const handleBurnComplete = () => {
    setStage('rebirth');
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* Background Layer - Faster Transition */}
      <div className="fixed inset-0 z-0">
        <AnimatePresence mode="wait">
          {stage !== 'rebirth' ? (
            <motion.div
              key="furnace-bg"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <FurnaceBackground />
            </motion.div>
          ) : (
            <motion.div
              key="dawn-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <DawnBackground />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* White Flash Effect Layer - Faster */}
      <AnimatePresence>
        {stage === 'rebirth' && (
          <motion.div
            key="flash"
            className="fixed inset-0 z-[5] bg-white pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, times: [0, 0.1, 1], ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {/* Content Layer */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {stage === 'input' && (
            <motion.div
              key="input"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full flex justify-center"
            >
              <InputStage onComplete={handleInputComplete} />
            </motion.div>
          )}

          {stage === 'burning' && (
            <ParticleEffect
              text={text}
              onComplete={handleBurnComplete}
            />
          )}

          {stage === 'rebirth' && (
            <motion.div
              key="rebirth"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="w-full"
            >
              <RebirthStage
                analysisResult={analysisResult}
                recordId={currentRecordId}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
