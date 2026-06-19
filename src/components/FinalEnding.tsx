import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Sparkles, RefreshCw, Star, Zap } from 'lucide-react';
import { audioManager } from './AudioManager';

export default function FinalEnding() {
  const [isCasting, setIsCasting] = useState<boolean>(false);
  const [creditStep, setCreditStep] = useState<number>(0);
  const [endLightning, setEndLightning] = useState<boolean>(false);

  // Handle cinematic ending sequence
  const startEndingSequence = () => {
    audioManager.init();
    audioManager.playClick();
    setIsCasting(true);
    setCreditStep(1);

    // Sequence timers
    // Step 1: Credits start moving
    setTimeout(() => {
      setCreditStep(2);
    }, 4500);

    // Step 2: Pitch black + lightning strike triggers
    setTimeout(() => {
      setCreditStep(3);
      setEndLightning(true);
      audioManager.playThunder();
      setTimeout(() => setEndLightning(false), 90);
      setTimeout(() => {
        setEndLightning(true);
        setTimeout(() => setEndLightning(false), 140);
      }, 180);
    }, 9000);

    // Step 3: Final Logo Reveal
    setTimeout(() => {
      setCreditStep(4);
    }, 12500);
  };

  const resetEnding = () => {
    audioManager.playClick();
    setIsCasting(false);
    setCreditStep(0);
    setEndLightning(false);
  };

  return (
    <section 
      id="ending-section" 
      className="py-24 px-6 md:px-12 bg-black relative z-10 select-none overflow-hidden h-[600px] flex flex-col items-center justify-center text-center"
    >
      
      {/* Dark stormy background with Annabelle silhouette */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1925&q=80')`,
          filter: 'brightness(0.12) contrast(1.4) saturation(0.2)'
        }}
        id="ending-bg-stage"
      />

      {/* Lightning Flash Overlay */}
      <div 
        className={`absolute inset-0 bg-white pointer-events-none transition-opacity duration-75 z-40 ${
          endLightning ? 'opacity-90' : 'opacity-0'
        }`}
      />

      {/* Atmospheric dark gradient */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />

      <AnimatePresence mode="wait">
        {!isCasting ? (
          <motion.div 
            key="static"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="relative z-20 max-w-2xl px-4 flex flex-col items-center gap-6"
          >
            <span className="font-mono text-[9px] tracking-[0.4em] text-[#8B0000] uppercase font-bold block">
              THE ULTIMATE WARNING
            </span>
            
            <h3 className="font-serif italic text-3xl sm:text-4xl md:text-5xl text-[#EAEAEA] drop-shadow-[0_0_15px_rgba(139,0,0,0.5)] leading-relaxed">
              "Some doors should never be opened."
            </h3>

            <p className="text-neutral-500 font-mono text-[10px] tracking-widest uppercase">
              RECOVERED FROM ENFIELD ARCHIVE LOGS // WARRENS 1977
            </p>

            <button
              onClick={startEndingSequence}
              className="mt-4 px-8 py-3.5 bg-transparent hover:bg-[#8B0000] text-[#EAEAEA] hover:text-white font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.35em] rounded-sm cursor-pointer border border-[#8B0000] hover:border-[#8B0000] duration-300 shadow-[0_0_15px_rgba(139,0,0,0.15)] hover:shadow-[0_0_25px_rgba(139,0,0,0.35)] flex items-center justify-center gap-1.5"
            >
              <span>WITNESS COVENANT ENDING</span>
            </button>
          </motion.div>
        ) : (
          <motion.div 
            key="sequence"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 bg-black/95 flex flex-col items-center justify-center p-6 text-white"
          >
            
            {/* Step 1: Creative Director Credits */}
            {creditStep === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 1.2 }}
                className="flex flex-col gap-2"
              >
                <span className="font-mono text-[9px] text-[#8B0000] tracking-widest uppercase font-bold">
                  CREATIVE PRODUCTION DIRECTORS
                </span>
                <span className="font-display text-2xl sm:text-3.5xl font-extrabold uppercase tracking-widest text-[#EAEAEA] mt-1">
                  ED & LORRAINE WARREN
                </span>
                <span className="text-neutral-500 font-sans text-xs tracking-wide">
                  New England Society for Psychic Research
                </span>
              </motion.div>
            )}

            {/* Step 2: Thematic Production Crew Credits */}
            {creditStep === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 1.2 }}
                className="flex flex-col gap-4 font-mono text-xs uppercase"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-[#8B0000] text-[9px] tracking-wider font-bold">EXCURSION TEAM EXORCISTS</span>
                  <span className="text-white text-sm font-bold">FATHER GORDON // FATHER PEREZ</span>
                </div>
                <div className="flex flex-col gap-1 mt-3">
                  <span className="text-[#8B0000] text-[9px] tracking-wider font-bold">CINEMATOGRAPHY REELS RECORDING</span>
                  <span className="text-white text-sm font-bold">WARNER BROS. HORROR EXPERIENCE</span>
                </div>
              </motion.div>
            )}

            {/* Step 3: Extreme Flash Static */}
            {creditStep === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center font-mono text-xs text-red-500 font-bold tracking-[0.4em] select-none uppercase"
              >
                <span>[ ATTAINING RITUAL CLIMAX ]</span>
              </motion.div>
            )}

            {/* Step 4: Final logo reveal */}
            {creditStep === 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2.0, ease: 'easeOut' }}
                className="flex flex-col items-center gap-6"
              >
                <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-[0.3em] text-[#EAEAEA] drop-shadow-[0_0_20px_rgba(139,0,0,0.6)] leading-none uppercase">
                  THE CONJURING
                </h1>
                
                <span className="font-mono text-[9px] text-[#8B0000] tracking-[0.35em] font-black uppercase block">
                  EVERY DEMON LEAVES A MARK.
                </span>

                <button
                  onClick={resetEnding}
                  className="mt-6 px-6 py-2.5 bg-white/[0.03] hover:bg-white/[0.08] text-[#EAEAEA] font-mono text-[9px] font-bold uppercase tracking-widest rounded-sm border border-white/10 cursor-pointer transition-colors"
                >
                  RE-ENTER VAULTS
                </button>
              </motion.div>
            )}

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
