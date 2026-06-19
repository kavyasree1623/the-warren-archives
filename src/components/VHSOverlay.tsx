/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Eye, EyeOff } from 'lucide-react';

export default function VHSOverlay() {
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [cleanFeed, setCleanFeed] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  // Update clock/date in vintage formats
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      setTimeStr(`${hh}:${mm}:${ss}`);

      // Classic VHS US Date format: JUN. 19 2026
      const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      const m = months[now.getMonth()];
      const d = String(now.getDate()).padStart(2, '0');
      const y = now.getFullYear();
      setDateStr(`${m}. ${d} ${y}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Soft random intermittent magnetic tape glitches
  useEffect(() => {
    const glitcher = setInterval(() => {
      if (Math.random() < 0.2 && !cleanFeed) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 240 + Math.random() * 300);
      }
    }, 4500);

    return () => clearInterval(glitcher);
  }, [cleanFeed]);

  if (cleanFeed) {
    return (
      <button
        onClick={() => setCleanFeed(false)}
        className="fixed top-6 right-6 z-48 p-2.5 bg-black/60 border border-neutral-800 rounded font-mono text-[10px] text-neutral-400 uppercase tracking-widest hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 select-none"
        title="Toggle VHS Overlay"
      >
        <EyeOff size={12} />
        <span>NIGHT VISION FEED</span>
      </button>
    );
  }

  return (
    <>
      {/* Glitch Overlay Filters */}
      <div
        className={`fixed inset-0 pointer-events-none z-47 select-none transition-all duration-100 ${
          isGlitching ? 'opacity-85 mix-blend-difference filter hue-rotate-90 scale-x-105' : 'opacity-100'
        }`}
      >
        {/* Fine Scanlines */}
        <div className="absolute inset-0 bg-scanlines opacity-18" />

        {/* Dynamic scrolling glitch bar */}
        <div className="absolute left-0 w-full h-[6px] bg-white/[0.08] blur-[2px] animate-vhs-bar" />

        {/* Grainy Noise Overlay */}
        <div className="absolute inset-0 bg-vhs-noise opacity-8 pointer-events-none" />
      </div>

      {/* Classic VHS HUD Readout overlays */}
      <div className="fixed inset-0 pointer-events-none z-46 p-6 md:p-12 flex flex-col justify-between font-mono text-[12px] md:text-[14px] text-emerald-400/80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] tracking-widest select-none">
        
        {/* Top Header Row of tape status */}
        <div className="flex justify-between items-start w-full">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 font-bold uppercase text-[#ff1e1e] animate-pulse">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff1e1e]" />
              <span>REC</span>
            </div>
            <span>SP</span>
            <span>AUTO TAPE IN</span>
          </div>

          <div className="flex flex-col items-end text-neutral-400 gap-2">
            {/* Interactive button to easily clean feed */}
            <button
              onClick={() => setCleanFeed(true)}
              className="pointer-events-auto p-2 bg-neutral-950/80 border border-neutral-800 rounded text-neutral-400 hover:text-white uppercase text-[10px] flex items-center gap-1 cursor-pointer transition-colors"
              title="Deactivate VHS Overlay"
            >
              <Eye size={12} />
              <span>CLEAN VIEW</span>
            </button>
            <span className="text-[10px] text-neutral-500">CH. 03 - WA.CAM</span>
          </div>
        </div>

        {/* Bottom clock readout row */}
        <div className="flex justify-between items-end w-full">
          <div className="flex flex-col">
            <span className="flex items-center gap-1 uppercase">
              <Play size={12} fill="#34d399" className="text-emerald-400" />
              <span>PLAY</span>
            </span>
            <span>0:14:32</span>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-[18px] md:text-[22px] tracking-[0.2em] font-sans font-bold block mb-1">
              {timeStr}
            </span>
            <span className="text-[11px] text-neutral-400 font-mono tracking-wider">
              {dateStr}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
