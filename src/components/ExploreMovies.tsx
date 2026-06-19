import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Film, PlayCircle, Users, Sparkles, AlertOctagon, Link2 } from 'lucide-react';
import { moviesData } from '../data';
import { Movie } from '../types';
import { audioManager } from './AudioManager';

export default function ExploreMovies() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleCardClick = (movie: Movie) => {
    audioManager.playClick();
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    audioManager.playClick();
    setSelectedMovie(null);
  };

  return (
    <section 
      id="movies-section" 
      className="py-24 px-6 md:px-12 bg-[#050505] relative z-10 select-none"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Title Block */}
        <div className="flex flex-col gap-3">
          <span className="font-mono text-[9px] tracking-[0.3em] text-[#8B0000] uppercase font-bold block">
            THEATRIC RELEASES CATALOG
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#EAEAEA] tracking-wide leading-tight uppercase">
            EXPLORE THE MOVIES
          </h2>
          <p className="text-[#9CA3AF] text-sm/relaxed max-w-xl font-sans">
            Trace the cinematic masterworks that compose Ed and Lorraine Warren's chronicles of active terror and demonic contact.
          </p>
        </div>

        {/* Movie Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {moviesData.map((movie) => (
            <motion.div
              key={movie.id}
              onClick={() => handleCardClick(movie)}
              whileHover={{ y: -8 }}
              className="group cursor-pointer bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-red-950/40 rounded-sm overflow-hidden flex flex-col transition-all duration-300 shadow-2xl relative"
            >
              {/* Card visual showcase */}
              <div className="w-full h-[380px] bg-black relative overflow-hidden">
                {/* Vintage overlay */}
                <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/40 to-transparent z-10 pointer-events-none" />
                
                {/* Year Badge */}
                <div className="absolute top-4 left-4 z-20 bg-[#8B0000] text-white font-mono text-[10px] uppercase tracking-widest font-bold py-1 px-3 rounded-sm shadow-md">
                  {movie.year}
                </div>

                <img 
                  src={movie.poster} 
                  alt={movie.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter grayscale group-hover:grayscale-0 brightness-75 group-hover:brightness-95 contrast-110"
                />

                {/* Cover hover details */}
                <div className="absolute inset-0 bg-[#8B0000]/10 mix-blend-color-burn opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
              </div>

              {/* Text Description */}
              <div className="p-6 flex flex-col gap-1.5 flex-1 z-20 bg-gradient-to-b from-black/20 to-black relative">
                <span className="font-mono text-[9px] text-[#8B0000] uppercase tracking-widest font-bold">
                  CASE METADATA
                </span>
                <h3 className="font-display font-bold text-xl text-[#EAEAEA] group-hover:text-red-400 transition-colors uppercase">
                  {movie.title}
                </h3>
                <p className="font-serif italic text-xs text-[#EAEAEA]/60 line-clamp-1 leading-relaxed mt-1">
                  "{movie.tagline}"
                </p>
                
                <div className="flex items-center gap-2 mt-4 text-[9px] font-mono text-red-500 uppercase tracking-widest font-bold border-t border-white/5 pt-4">
                  <span>EXPAND DETAILED CASE FILE</span>
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed Movie Modal Overlay */}
        <AnimatePresence>
          {selectedMovie && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 overflow-y-auto bg-black/95 flex items-center justify-center p-4 sm:p-6 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.95, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 30 }}
                transition={{ type: 'spring', damping: 25, stiffness: 120 }}
                className="w-full max-w-5xl bg-neutral-950 border border-white/10 rounded-sm overflow-hidden flex flex-col lg:grid lg:grid-cols-12 max-h-[90vh] shadow-[0_0_50px_rgba(139,0,0,0.3)] relative"
              >
                
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-40 bg-black/80 hover:bg-red-950/80 text-white/70 hover:text-white p-2.5 rounded-sm border border-white/10 cursor-pointer transition-colors"
                >
                  <X size={15} />
                </button>

                {/* Left/Top Media Column (5 cols) */}
                <div className="lg:col-span-5 bg-black flex flex-col h-full border-b lg:border-b-0 lg:border-r border-white/10 overflow-y-auto max-h-[40vh] lg:max-h-full">
                  <div className="relative w-full h-[250px] sm:h-[350px]">
                    <img 
                      src={selectedMovie.poster} 
                      alt={selectedMovie.title}
                      className="w-full h-full object-cover filter brightness-75 contrast-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent" />
                    <div className="absolute bottom-6 left-6 pr-6">
                      <span className="font-mono text-[9px] bg-red-950/60 border border-red-900/50 py-1 px-3 text-[#ff8e8e] font-bold uppercase tracking-widest rounded-sm mb-2 inline-block">
                        ESTABLISHED: {selectedMovie.year}
                      </span>
                      <h2 className="font-display text-2xl sm:text-3xl font-black text-[#EAEAEA] uppercase leading-tight">
                        {selectedMovie.title}
                      </h2>
                    </div>
                  </div>

                  {/* Character registers */}
                  <div className="p-6 flex flex-col gap-4 border-t border-white/5">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#8B0000] font-bold">
                      PARANORMAL DRAMATIS PERSONAE
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedMovie.characters.map((char, index) => (
                        <div 
                          key={index}
                          className="flex items-center gap-1.5 bg-white/[0.03] border border-white/5 px-3 py-1.5 rounded-sm text-xs text-[#EAEAEA]/80 font-sans font-medium"
                        >
                          <Users size={11} className="text-red-500/60" />
                          <span>{char}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Demon register */}
                  <div className="p-6 border-t border-white/5 flex flex-col gap-2">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#8B0000] font-bold">
                      ACTIVE THREAT SPECTRUM
                    </span>
                    <div className="flex items-center gap-2 bg-red-950/20 border border-red-900/30 p-3 rounded-sm">
                      <AlertOctagon size={14} className="text-[#ff3c3c] animate-pulse" />
                      <div>
                        <span className="font-mono text-[9px] text-white/50 block font-bold uppercase">DEMON INVOLVED</span>
                        <span className="font-sans text-xs font-bold text-[#ff8e8e] uppercase tracking-wider">{selectedMovie.demonInvolved}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Content Column (7 cols) - Narrative details */}
                <div className="lg:col-span-7 p-6 sm:p-8 overflow-y-auto flex flex-col gap-6 max-h-[50vh] lg:max-h-full">
                  <div>
                    <span className="font-mono text-[9px] text-[#ff8e8e] uppercase tracking-[0.2em] font-bold block mb-1">
                      CLASSIFIED PLOT REGISTRY
                    </span>
                    <h3 className="font-display font-bold text-lg text-white uppercase italic tracking-wide">
                      "{selectedMovie.tagline}"
                    </h3>
                  </div>

                  <p className="text-xs/relaxed sm:text-sm/relaxed text-[#9CA3AF] font-sans font-medium">
                    {selectedMovie.story}
                  </p>

                  {/* Live Theatrical Trailer Embedding */}
                  <div className="flex flex-col gap-3">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#8B0000] font-bold flex items-center gap-1.5">
                      <Film size={11} />
                      <span>OFFICIAL CINEMATIC TRAILER</span>
                    </span>
                    <div className="aspect-video w-full bg-black rounded-sm overflow-hidden border border-white/5">
                      <iframe 
                        className="w-full h-full"
                        src={selectedMovie.trailerUrl}
                        title={`${selectedMovie.title} Official Trailer`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>

                  {/* Key Plot Activities timeline */}
                  <div className="flex flex-col gap-3 border-t border-white/5 pt-6">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#8B0000] font-bold block">
                      KEY EVENT TIMECODES
                    </span>
                    <ul className="flex flex-col gap-2 font-sans text-xs text-[#9CA3AF]">
                      {selectedMovie.keyEvents.map((ev, i) => (
                        <li key={i} className="flex gap-2.5 items-start">
                          <span className="font-mono text-[9px] text-red-500 font-bold mt-1 bg-[#8B0000]/10 border border-[#8B0000]/30 py-0.5 px-2 rounded-sm uppercase tracking-wider select-none">
                            SEC {i+1}
                          </span>
                          <span className="text-[#EAEAEA]/80 py-0.5 leading-normal">{ev}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Connections to other films */}
                  <div className="border-t border-white/5 pt-6 mt-1 flex flex-col gap-2.5">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#8B0000] font-bold flex items-center gap-1.5">
                      <Link2 size={11} />
                      <span>THE CONJURING CHRONOLOGICAL LORE</span>
                    </span>
                    <p className="text-xs text-[#9CA3AF] leading-relaxed italic bg-white/[0.01] p-3 border border-white/5 rounded-sm font-sans">
                      {selectedMovie.connections}
                    </p>
                  </div>

                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
