import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Sparkles, Navigation, Link, Calendar, ArrowRight, ArrowLeft } from 'lucide-react';
import { timelineEvents } from '../data';
import { TimelineEvent } from '../types';
import { audioManager } from './AudioManager';

export default function TimelineOfEvil() {
  const [activeYear, setActiveYear] = useState<number>(1952);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleMilestoneClick = (evt: TimelineEvent) => {
    audioManager.init();
    audioManager.playClick();
    
    if (evt.year === 1977) {
      audioManager.playChurchBell();
    } else {
      audioManager.playGlitch();
    }

    setActiveYear(evt.year);
  };

  const scroll = (direction: 'left' | 'right') => {
    audioManager.playClick();
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -350 : 350;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const selectedEvent = timelineEvents.find(e => e.year === activeYear) || timelineEvents[0];

  return (
    <section 
      id="timeline-section" 
      className="py-24 px-6 md:px-12 bg-[#0a0a0a]/90 border-t border-b border-white/5 relative z-10 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[9px] tracking-[0.3em] text-[#8B0000] uppercase font-bold block">
              CHRONOLOGICAL OCCULT MAP
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#EAEAEA] tracking-wide leading-tight uppercase">
              TIMELINE OF EVIL
            </h2>
            <p className="text-[#9CA3AF] text-sm max-w-xl font-sans">
              Trace the chronological sequence of hauntings, witchcraft hexes, and entity materializations that catalog the Universe's lore.
            </p>
          </div>

          {/* Navigation sliders controls */}
          <div className="flex gap-2.5">
            <button
              onClick={() => scroll('left')}
              className="p-3 bg-black/60 hover:bg-red-950/20 text-neutral-400 hover:text-white border border-white/5 hover:border-red-900/40 rounded-sm cursor-pointer transition-colors"
            >
              <ArrowLeft size={14} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 bg-black/60 hover:bg-red-950/20 text-neutral-400 hover:text-white border border-white/5 hover:border-red-900/40 rounded-sm cursor-pointer transition-colors"
            >
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Outer tracks with horizontal slider */}
        <div className="relative pt-8 pb-12 w-full">
          
          {/* Crimson Glowing Connection Vector Line */}
          <div className="absolute top-[96px] left-0 w-full h-1 bg-gradient-to-r from-red-950 via-[#8B0000] to-red-950 blur-[2px] opacity-70 z-10 pointer-events-none" />
          <div className="absolute top-[97px] left-0 w-full h-0.5 bg-red-600 opacity-60 z-10 pointer-events-none" />

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto overflow-y-hidden pb-6 pt-4 scroll-smooth snap-x select-none scrollbar-thin scrollbar-track-transparent scrollbar-thumb-red-900"
          >
            {timelineEvents.map((evt) => {
              const isSelected = evt.year === activeYear;
              const isConnected = selectedEvent.glowingConnections.includes(String(evt.year));

              return (
                <div 
                  key={evt.year}
                  onClick={() => handleMilestoneClick(evt)}
                  className="flex-shrink-0 w-[240px] flex flex-col items-center gap-6 snap-start cursor-pointer group"
                >
                  {/* Year dot with glowing animations */}
                  <div className="relative z-20 flex items-center justify-center">
                    {/* Ring highlight */}
                    <div className={`absolute w-12 h-12 rounded-full border transition-all duration-300 ${
                      isSelected 
                        ? 'border-[#8B0000] scale-100 bg-[#8B0000]/10 shadow-[0_0_15px_rgba(139,0,0,0.4)]' 
                        : isConnected 
                          ? 'border-red-900/60 scale-90 bg-red-950/10' 
                          : 'border-white/10 scale-75 hover:scale-85'
                    }`} />
                    
                    {/* Core pin */}
                    <div className={`w-3.5 h-3.5 rounded-full z-10 transition-colors ${
                      isSelected 
                        ? 'bg-[#8B0000]' 
                        : isConnected 
                          ? 'bg-red-700' 
                          : 'bg-neutral-800 group-hover:bg-neutral-600'
                    }`} />
                    
                    {/* Year number banner */}
                    <span className={`absolute top-8 font-mono text-sm tracking-widest font-bold transition-colors ${
                      isSelected 
                        ? 'text-white font-display' 
                        : isConnected 
                          ? 'text-red-400' 
                          : 'text-[#EAEAEA]/40 group-hover:text-white/80'
                    }`}>
                      {evt.year}
                    </span>
                  </div>

                  {/* Thumbnail card */}
                  <div className={`w-full bg-[#050505] p-3 text-center border rounded-sm flex flex-col gap-2 transition-all duration-300 mt-6 ${
                    isSelected 
                      ? 'border-[#8B0000]/60 bg-[#8B0000]/5 shadow-xl' 
                      : 'border-white/5 hover:border-white/15'
                  }`}>
                    {/* Mini poster frame */}
                    <div className="w-full h-24 bg-neutral-900 rounded-xs overflow-hidden relative">
                      <img 
                        src={evt.poster} 
                        alt={evt.movie}
                        className="w-full h-full object-cover filter grayscale contrast-110 brightness-75 group-hover:brightness-90 transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div>
                      <span className="font-mono text-[7px] text-red-500 font-bold block uppercase tracking-widest leading-none mb-1">
                        {evt.movie}
                      </span>
                      <h4 className="font-sans font-bold text-[11px] text-[#EAEAEA] line-clamp-1 uppercase">
                        {evt.title}
                      </h4>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Selected Event Details (Netflix Dark Style) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeYear}
            initial={{ opacity: 0, scale: 0.99, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.99, y: -15 }}
            transition={{ duration: 0.3 }}
            className="bg-white/[0.012] border border-white/5 p-6 sm:p-8 rounded-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-2xl relative select-text"
          >
            
            {/* Visual glow backdrop */}
            <div className="absolute inset-0 bg-[#8B0000]/5 hover:bg-[#8B0000]/10 duration-700 pointer-events-none rounded-sm transition-all" />

            {/* Event photo frame left (3 cols) */}
            <div className="md:col-span-3 bg-black h-48 md:h-[220px] rounded-sm overflow-hidden border border-white/10 relative z-20">
              <img 
                src={selectedEvent.poster} 
                alt={selectedEvent.movie}
                className="w-full h-full object-cover filter contrast-125 sepia hover:filter-none duration-500 select-all"
              />
            </div>

            {/* Event descriptions right (9 cols) */}
            <div className="md:col-span-9 flex flex-col gap-4 relative z-20">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar size={11} className="text-red-500" />
                    <span className="font-mono text-[9px] uppercase tracking-widest font-bold text-red-500">
                      SECURED CHRONOLOGY CASE FILE: {selectedEvent.year}
                    </span>
                  </div>
                  <h3 className="font-display font-black text-2xl text-white uppercase tracking-wider">
                    {selectedEvent.title}
                  </h3>
                </div>

                <span className="font-mono text-[9px] font-bold text-[#EAEAEA]/40 uppercase block tracking-wider mt-1 sm:mt-0">
                  MOVIE: <strong>{selectedEvent.movie}</strong>
                </span>
              </div>

              <p className="text-[#9CA3AF] text-sm/relaxed font-sans font-medium">
                {selectedEvent.description}
              </p>

              <div className="bg-black/40 border border-white/5 p-4 rounded-sm flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <span className="font-mono text-[8px] text-red-500 font-bold block uppercase tracking-widest mb-1">RECORDED IMPACT CONFLUENCE</span>
                  <p className="text-[#EAEAEA]/85 text-xs/relaxed font-sans first-letter:italic">
                    {selectedEvent.details}
                  </p>
                </div>
              </div>

              {/* Storyline linkage connections pointers */}
              <div className="flex items-center gap-2 border-t border-white/5 pt-4 mt-2">
                <span className="font-mono text-[9.5px] text-[#EAEAEA]/40 uppercase tracking-widest font-bold">
                  ACTIVE TIMELINE LINKS:
                </span>
                <div className="flex gap-1.5 flex-wrap">
                  {selectedEvent.glowingConnections.map((connYear) => (
                    <button
                      key={connYear}
                      onClick={() => {
                        const target = timelineEvents.find(e => e.year === Number(connYear));
                        if (target) handleMilestoneClick(target);
                      }}
                      className="font-mono text-[8.5px] font-black text-red-400 bg-red-950/10 hover:bg-red-950/20 border border-red-900/30 py-1 px-2.5 rounded-sm uppercase tracking-widest cursor-pointer transition-colors"
                    >
                      {connYear} LINK →
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
