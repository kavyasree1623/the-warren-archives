import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { audioManager } from './AudioManager';
import { ShieldAlert } from 'lucide-react';

interface HeroSectionProps {
  onEnter: () => void;
}

export default function HeroSection({ onEnter }: HeroSectionProps) {
  const [lightning, setLightning] = useState(false);

  useEffect(() => {
    // Automated eerie thunderstorm lightning flashes
    const triggerLightning = () => {
      setLightning(true);
      // Play procedural thunder
      audioManager.playThunder();
      
      // Flash sequence
      setTimeout(() => setLightning(false), 80);
      setTimeout(() => {
        setLightning(true);
        setTimeout(() => setLightning(false), 120);
      }, 150);

      // Schedule next storm roll
      setTimeout(triggerLightning, 12000 + Math.random() * 15000);
    };

    const timer = setTimeout(triggerLightning, 6000);
    return () => clearTimeout(timer);
  }, []);

  const handleEnterClick = () => {
    audioManager.init();
    audioManager.playWhoosh();
    onEnter();
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black flex flex-col items-center justify-center text-center select-none">
      
      {/* Background storm image with smooth zoom keyframe */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1508349937151-22b68b72d5b1?auto=format&fit=crop&w=1925&q=80')`,
          filter: 'brightness(0.2) contrast(1.2) saturation(0.8)'
        }}
        id="hero-bg-stage"
      />

      {/* Lightning Strike Overlay */}
      <div 
        className={`absolute inset-0 bg-white pointer-events-none transition-opacity duration-75 z-40 ${
          lightning ? 'opacity-85' : 'opacity-0'
        }`}
      />

      {/* Atmospheric misty drifting fog */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none z-10" />
      <div className="absolute inset-0 bg-black/40 pointer-events-none z-10" />

      {/* Rain drop overlay element details */}
      <div className="absolute inset-0 bg-scanlines opacity-15 pointer-events-none z-20" />

      {/* Main typography display */}
      <div className="relative z-30 px-6 max-w-4xl flex flex-col items-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          className="flex items-center gap-1.5 md:gap-3 border border-red-950/40 bg-red-950/20 px-3.5 py-1.5 rounded-sm mb-4"
        >
          <ShieldAlert size={12} className="text-red-500 animate-pulse" />
          <span className="font-mono text-[9px] md:text-[10px] tracking-[0.35em] text-red-500 uppercase font-bold">
            WARNER BROS. EXPERIENCE PORTAL
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.2, delay: 0.3, ease: 'easeOut' }}
          className="font-display text-4xl sm:text-6xl md:text-8xl font-black tracking-[0.25em] text-[#EAEAEA] drop-shadow-[0_0_20px_rgba(139,0,0,0.4)] leading-tight uppercase"
        >
          THE CONJURING<br />
          <span className="text-red-750 text-3xl sm:text-4xl md:text-5xl tracking-[0.4em] block mt-2 text-[#8B0000]">
            UNIVERSE
          </span>
        </motion.h1>

        {/* Tagline quotes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, delay: 1.2 }}
          className="flex flex-col gap-2 mt-4 max-w-xl"
        >
          <p className="font-serif italic text-base sm:text-lg md:text-xl text-[#EAEAEA]/80 tracking-wide font-medium leading-relaxed">
            "Every Case Has A Beginning."
          </p>
          <p className="font-mono text-[10px] sm:text-xs text-red-500 font-bold uppercase tracking-[0.3em] mt-1">
            Every Demon Leaves A Mark.
          </p>
        </motion.div>

        {/* Enter call-to-action button */}
        <motion.button
          onClick={handleEnterClick}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.8, type: 'spring' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-8 py-4 bg-[#8B0000] hover:bg-neutral-900 text-[#EAEAEA] font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.35em] rounded-sm cursor-pointer border border-[#8B0000] hover:border-red-900 transition-all duration-300 shadow-[0_0_20px_rgba(139,0,0,0.3)] hover:shadow-[0_0_30px_rgba(139,0,0,0.15)] flex items-center justify-center"
        >
          ENTER THE UNIVERSE
        </motion.button>
      </div>

      {/* Manual Lightning strike trigger button for user interaction */}
      <div className="absolute right-6 bottom-6 z-30">
        <button
          onClick={() => {
            setLightning(true);
            audioManager.playThunder();
            setTimeout(() => setLightning(false), 120);
          }}
          className="p-2.5 bg-black/60 hover:bg-red-950/40 text-red-500 hover:text-white border border-red-900/30 rounded-sm text-[8px] font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer"
          title="Force Lightning Flash"
        >
          [ TRIGGER LIGHTNING ]
        </button>
      </div>
    </div>
  );
}
