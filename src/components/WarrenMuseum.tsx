import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Sparkles, Shield, AlertTriangle, Eye, RefreshCw, Layers } from 'lucide-react';
import { artifactsData } from '../data';
import { Artifact } from '../types';
import { audioManager } from './AudioManager';

export default function WarrenMuseum() {
  const [activeArtifact, setActiveArtifact] = useState<Artifact>(artifactsData[0]);
  const [isHoveredId, setIsHoveredId] = useState<string | null>(null);

  // Manage sound triggers depending on selected artifact loop
  useEffect(() => {
    audioManager.init();

    // Reset music box state by default
    audioManager.toggleMusicBox(false);

    if (activeArtifact.id === 'music-box') {
      audioManager.toggleMusicBox(true);
    } else if (activeArtifact.id === 'annabelle') {
      audioManager.playGlitch();
    } else if (activeArtifact.id === 'valak-painting') {
      audioManager.playThunder();
    } else if (activeArtifact.id === 'crooked-man') {
      audioManager.playChurchBell();
    }

    return () => {
      audioManager.toggleMusicBox(false);
    };
  }, [activeArtifact]);

  const handleSelect = (art: Artifact) => {
    audioManager.playClick();
    setActiveArtifact(art);
  };

  return (
    <section 
      id="museum-section" 
      className="py-24 px-6 md:px-12 bg-[#0a0a0a] border-t border-b border-white/5 relative z-10 select-none"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Title Grid */}
        <div className="flex flex-col gap-3">
          <span className="font-mono text-[9px] tracking-[0.3em] text-[#8B0000] uppercase font-bold block">
            CLASSIFIED RETRO GRADE VAULTS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#EAEAEA] tracking-wide leading-tight uppercase">
            THE WARREN OCCULT MUSEUM
          </h2>
          <p className="text-[#9CA3AF] text-sm max-w-xl font-sans">
            A premium sanctuary where physical conduits, cursed effigies, and items collected during Ed and Lorraine Warren's investigations are sealed.
          </p>
        </div>

        {/* Museum Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Glass Display Cabinets (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {artifactsData.map((art) => {
              const isSelected = activeArtifact.id === art.id;
              
              return (
                <div
                  key={art.id}
                  onClick={() => handleSelect(art)}
                  onMouseEnter={() => setIsHoveredId(art.id)}
                  onMouseLeave={() => setIsHoveredId(null)}
                  className={`cursor-pointer rounded-sm overflow-hidden border relative flex flex-col items-center justify-center p-4 h-[220px] transition-all duration-300 ${
                    isSelected 
                      ? 'bg-black border-[#8B0000] shadow-[0_0_25px_rgba(139,0,0,0.15)] ring-1 ring-[#8B0000]/60' 
                      : 'bg-[#050505]/95 border-white/5 hover:border-white/15'
                  }`}
                >
                  {/* Subtle glass reflection sheet effect */}
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
                  
                  {/* Soft spotlight behind image */}
                  <div className={`absolute w-24 h-24 rounded-full blur-2xl transition-opacity duration-300 pointer-events-none ${
                    isSelected ? 'bg-[#8B0000]/25 opacity-100' : 'bg-white/[0.02] opacity-60'
                  }`} />

                  {/* Red/Amber Warning Beacon */}
                  <div className="absolute top-3 right-3 flex items-center gap-1">
                    <span className="font-mono text-[7px] tracking-widest text-[#EAEAEA]/30 uppercase font-bold hidden sm:inline">
                      {art.id === 'annabelle' || art.id === 'valak-painting' ? 'LVL EX' : 'LVL HI'}
                    </span>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      art.id === 'annabelle' || art.id === 'valak-painting' 
                        ? 'bg-red-500 animate-ping' 
                        : 'bg-amber-500 animate-pulse'
                    }`} />
                  </div>

                  {/* Glass showcase border frame */}
                  <div className="w-[110px] h-[110px] rounded-sm relative overflow-hidden bg-black/60 border border-white/10 p-1">
                    <img 
                      src={art.imageUrl} 
                      alt={art.name}
                      className="w-full h-full object-cover rounded-sm filter grayscale hover:grayscale-0 contrast-110 brightness-85"
                    />
                  </div>

                  <h3 className="font-display font-bold text-center text-xs mt-4 tracking-wide uppercase text-[#EAEAEA]/90 truncate w-full px-1">
                    {art.name}
                  </h3>
                  <span className="font-mono text-[8px] uppercase tracking-widest text-[#EAEAEA]/35 mt-1 block">
                    ANALYZE RELIC
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right Column: Premium Glass Display Diorama Dossier (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6 bg-white/[0.02] border border-white/5 p-6 sm:p-10 rounded-sm shadow-2xl relative overflow-hidden backdrop-blur-md">
            
            {/* Visual Glass Spot Glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-[#8B0000]/5 blur-3xl pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeArtifact.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col gap-6 relative z-10"
              >
                {/* Dossier Top metadata */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-mono text-[8px] bg-red-950/40 border border-red-900/50 py-0.5 px-2 text-red-500 font-bold uppercase rounded-sm">
                        {activeArtifact.dangerLevel} RISK SPECTRUM
                      </span>
                      <span className="font-mono text-[8px] bg-white/[0.04] border border-white/10 py-0.5 px-2 text-white/50 font-bold rounded-sm uppercase tracking-widest">
                        SECURED CASE
                      </span>
                    </div>
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-normal uppercase">
                      {activeArtifact.name}
                    </h3>
                  </div>

                  <div className="flex flex-col items-end gap-1.5 font-mono text-[9px] text-[#EAEAEA]/45">
                    <span>MUSEUM COORDINATE: <strong>RM-102-G</strong></span>
                    <span className="text-red-550 font-bold flex items-center gap-1.5 uppercase">
                      <Shield size={10} className="text-[#8B0000] animate-pulse" />
                      <span>DO NOT UNSEAL DISPLAY</span>
                    </span>
                  </div>
                </div>

                {/* Display Interactive visualizer (if Music Box is playing, etc.) */}
                {activeArtifact.id === 'music-box' && (
                  <div className="bg-red-950/10 border border-red-900/20 p-4.5 rounded-sm flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Volume2 size={20} className="text-red-500 animate-pulse shrink-0" />
                      <div>
                        <span className="font-mono text-[9px] text-red-500 font-bold uppercase tracking-wider block">PROCEDURAL HARMONIC ACTIVE</span>
                        <span className="text-xs text-[#EAEAEA]/80 font-sans font-medium">Listening to Annabelle Higgins' sweet classical music box chime loop.</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Narrative content tabs details */}
                <div className="flex flex-col gap-1.5">
                  <span className="font-mono text-[9px] text-[#8B0000] uppercase tracking-widest block font-bold">
                    RELIC CLASSIFIED CASE LOG
                  </span>
                  <p className="font-serif italic text-base/relaxed text-white/80 font-medium">
                    "{activeArtifact.description}"
                  </p>
                </div>

                {/* History Block */}
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[9px] text-[#EAEAEA]/40 uppercase tracking-widest block font-bold">
                    SECURED ACQUISITION HISTORIES
                  </span>
                  <p className="text-[#9CA3AF] text-xs/relaxed sm:text-sm/relaxed font-sans font-medium">
                    {activeArtifact.history}
                  </p>
                </div>

                {/* Movie Appearances */}
                <div className="border-t border-white/5 pt-6 flex flex-col gap-2.5">
                  <span className="font-mono text-[9px] text-[#ff8e8e] uppercase tracking-widest block font-bold">
                    THEATRIC CASE CHRONICLES
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeArtifact.movieAppearances.map((mv, i) => (
                      <span 
                        key={i}
                        className="font-sans text-[11px] text-white/80 font-semibold bg-[#8B0000]/10 border border-red-950/50 py-1.5 px-3 rounded-sm uppercase tracking-wide"
                      >
                        {mv}
                      </span>
                    ))}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
