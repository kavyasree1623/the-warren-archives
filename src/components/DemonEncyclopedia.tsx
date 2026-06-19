import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Skull, Eye, Heart, AlertOctagon } from 'lucide-react';
import { demonsData } from '../data';
import { Demon } from '../types';
import { audioManager } from './AudioManager';

export default function DemonEncyclopedia() {
  const [selectedDemonId, setSelectedDemonId] = useState<string | null>(null);

  const handleCardHover = (demonId: string | null) => {
    if (demonId) {
      audioManager.playClick();
    }
    setSelectedDemonId(demonId);
  };

  return (
    <section 
      id="demons-section" 
      className="py-24 px-6 md:px-12 bg-[#050505] relative z-10 select-none"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Header Title */}
        <div className="flex flex-col gap-3">
          <span className="font-mono text-[9px] tracking-[0.3em] text-[#8B0000] uppercase font-bold block">
            CLASSIFIED INHUMAN ENTITY PROFILES
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#EAEAEA] tracking-wide leading-tight uppercase">
            DEMON ENCYCLOPEDIA
          </h2>
          <p className="text-[#9CA3AF] text-sm max-w-xl font-sans">
            The New England Society for Psychic Research dossiers on parasitical forces that seek biological hosts and physical anchors.
          </p>
        </div>

        {/* Demon Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {demonsData.map((demon) => {
            const isExtreme = demon.threatLevel === 'EXTREME';
            const isHigh = demon.threatLevel === 'HIGH';
            const isHovered = selectedDemonId === demon.id;

            return (
              <motion.div
                key={demon.id}
                onMouseEnter={() => handleCardHover(demon.id)}
                onMouseLeave={() => handleCardHover(null)}
                whileHover={{ scale: 1.01 }}
                className={`flex flex-col xl:flex-row bg-white/[0.01] border rounded-sm overflow-hidden transition-all duration-500 relative ${
                  isHovered 
                    ? 'border-[#8B0000] shadow-[0_0_35px_rgba(139,0,0,0.2)]' 
                    : 'border-white/5'
                }`}
              >
                {/* Spooky Image panel (Left half in landscape) */}
                <div className="w-full xl:w-2/5 h-[240px] xl:h-auto min-h-[250px] bg-black relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t xl:bg-gradient-to-r from-black via-transparent to-transparent z-10 pointer-events-none" />
                  <img 
                    src={demon.imageUrl} 
                    alt={demon.name}
                    loading="lazy"
                    className="w-full h-full object-cover filter grayscale h-full contrast-125 brightness-75 hover:brightness-95 transition-all duration-1000"
                  />
                  {/* Demon Name Overlay on image for mobile layout */}
                  <div className="absolute bottom-4 left-4 xl:hidden z-20">
                    <h3 className="font-display font-black text-2xl text-white tracking-widest uppercase">
                      {demon.name}
                    </h3>
                  </div>
                </div>

                {/* Content details panel (Right half) */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col gap-4 bg-gradient-to-br from-black/40 to-neutral-950/90 relative z-20">
                  
                  {/* Threat Level header */}
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <h3 className="font-display font-black text-xl text-white tracking-wider uppercase hidden xl:block">
                      {demon.name}
                    </h3>
                    <div className="flex items-center gap-1.5 ml-auto">
                      <span className="font-mono text-[8px] text-[#EAEAEA]/40 uppercase tracking-widest font-bold">
                        THREAT SPEC:
                      </span>
                      <span className={`font-mono text-[9px] font-black uppercase tracking-[0.25em] py-0.5 px-2.5 rounded-sm border ${
                        isExtreme 
                          ? 'bg-red-950/40 border-red-800 text-red-500 animate-pulse' 
                          : isHigh 
                            ? 'bg-[#8B0000]/25 border-red-950 text-orange-400' 
                            : 'bg-white/[0.03] border-white/10 text-white/50'
                      }`}>
                        {demon.threatLevel}
                      </span>
                    </div>
                  </div>

                  {/* Origins & history summary text */}
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[8px] text-[#8B0000] uppercase tracking-widest block font-bold">
                      INHUMAN CONSTITUENT
                    </span>
                    <p className="text-[#9CA3AF] text-xs leading-relaxed font-sans font-medium">
                      {demon.origin}
                    </p>
                  </div>

                  {/* Historical events */}
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[8px] text-[#EAEAEA]/35 uppercase tracking-widest block font-bold">
                      ACQUISITION HISTROY
                    </span>
                    <p className="text-[#9CA3AF] text-xs leading-relaxed font-sans">
                      {demon.history}
                    </p>
                  </div>

                  {/* List of active abilities */}
                  <div className="grid grid-cols-2 gap-3.5 pt-2 border-t border-white/5">
                    <div className="flex flex-col gap-1.5">
                      <span className="font-mono text-[8px] text-red-500 font-bold tracking-widest uppercase">
                        ABILITIES
                      </span>
                      <div className="flex flex-col gap-1">
                        {demon.abilities.map((ab, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-[10px] text-[#EAEAEA]/70 font-sans font-medium">
                            <Skull size={9} className="text-[#8B0000] shrink-0" />
                            <span>{ab}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <span className="font-mono text-[8px] text-red-500 font-bold tracking-widest uppercase">
                        VICTIMS TRACKED
                      </span>
                      <div className="flex flex-col gap-1">
                        {demon.victims.map((vic, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-[10px] text-[#EAEAEA]/70 font-sans font-medium">
                            <Heart size={9} className="text-red-500/50 shrink-0" />
                            <span>{vic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
