import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play } from 'lucide-react';
import { audioManager } from './AudioManager';
import annabellePoster from '../assets/images/movies/annabelle.jpg';
import conjuringPoster from '../assets/images/movies/the-conjuring.jpg';
import conjuring2Poster from '../assets/images/movies/the-conjuring-2.jpg';

interface TrailerClip {
  id: string;
  title: string;
  type: 'trailer' | 'teaser' | 'bts';
  imageUrl: string;
  duration: string;
  embedUrl: string;
  description: string;
}

const trailerClips: TrailerClip[] = [
  {
    id: 'c1-conjuring-trailer',
    title: 'The Conjuring - Official Theatrical Trailer',
    type: 'trailer',
    imageUrl: conjuringPoster,
    duration: '2:31',
    embedUrl: 'https://www.youtube.com/embed/k10ETZ42q5o',
    description: 'The definitive theatrical preview introducing Ed and Lorraine Warren’s encounter with Carolyn Perron and Rhode Island\'s cursed farmhouse.'
  },
  {
    id: 'c2-nun-teaser',
    title: 'The Nun - Official Teaser Promo',
    type: 'teaser',
    imageUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=800&q=80',
    duration: '1:42',
    embedUrl: 'https://www.youtube.com/embed/pzD9zGcUNrw',
    description: 'A chilling atmospheric glimpse into the cathedrals and tombstones of the Cârța Monastery of Romania.'
  },
  {
    id: 'c3-annabelle-creation',
    title: 'Annabelle Comes Home - Official Clip',
    type: 'trailer',
    imageUrl: annabellePoster,
    duration: '2:15',
    embedUrl: 'https://www.youtube.com/embed/EMa-KFwToEs',
    description: 'The Warrens unlock their private vault, releasing the Ferryman, the Samurai, and the Doll upon their own daughters.'
  },
  {
    id: 'c4-bts-fear',
    title: 'Inside the Fear: Behind the Scenes Featurette',
    type: 'bts',
    imageUrl: conjuring2Poster,
    duration: '6:54',
    embedUrl: 'https://www.youtube.com/embed/KisPhy7T__Q',
    description: 'Director James Wan and actors Patrick Wilson and Vera Farmiga discuss translating the real-life Warren field logs to celluloid.'
  }
];

export default function TrailerTheater() {
  const [activeClip, setActiveClip] = useState<TrailerClip>(trailerClips[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleSelectClip = (clip: TrailerClip) => {
    audioManager.playClick();
    setActiveClip(clip);
    setIsPlaying(false);
  };

  const handlePlayClick = () => {
    audioManager.init();
    audioManager.playWhoosh();
    setIsPlaying(true);
  };

  return (
    <section 
      id="trailer-section" 
      className="py-24 px-6 md:px-12 bg-[#050505] relative z-10 select-none"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Title Grid */}
        <div className="flex flex-col gap-3">
          <span className="font-mono text-[9px] tracking-[0.3em] text-[#8B0000] uppercase font-bold block">
            THEATRIC MULTIMEDIA VAULTS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#EAEAEA] tracking-wide leading-tight uppercase">
            TRAILER THEATER
          </h2>
          <p className="text-[#9CA3AF] text-sm max-w-xl font-sans">
            Stream official promos, teasers, and exclusive conceptual retrospectives that construct the cinematic universe.
          </p>
        </div>

        {/* Widescreen Theater Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Player Display Screen (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-5">
            <div className="aspect-video w-full bg-black border border-white/5 rounded-sm overflow-hidden relative shadow-[0_0_40px_rgba(139,0,0,0.15)] bg-center bg-cover">
              
              <AnimatePresence mode="wait">
                {!isPlaying ? (
                  <motion.div 
                    key="splash"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-cover bg-center"
                    style={{
                      backgroundImage: `url('${activeClip.imageUrl}')`,
                    }}
                  >
                    {/* Shadow overlay veil */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-xs hover:backdrop-blur-none duration-500 transition-all pointer-events-none" />

                    {/* Centered Large Play Button */}
                    <button 
                      onClick={handlePlayClick}
                      className="relative z-20 w-16 h-16 sm:w-20 sm:h-20 bg-[#8B0000] hover:bg-white text-white hover:text-black flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 shadow-[0_0_30px_rgba(139,0,0,0.3)] hover:scale-105 active:scale-95 group"
                    >
                      <Play size={24} className="fill-current ml-1 transition-transform group-hover:scale-110" />
                    </button>

                    <span className="relative z-20 font-mono text-[10px] sm:text-xs text-[#EAEAEA]/80 font-bold uppercase tracking-[0.2em] mt-5 select-none pointer-events-none">
                      STREAM AT {activeClip.duration} MINUTES
                    </span>

                  </motion.div>
                ) : (
                  <motion.div 
                    key="iframe"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 w-full h-full bg-black"
                  >
                    <iframe 
                      className="w-full h-full object-cover"
                      src={`${activeClip.embedUrl}?autoplay=1`}
                      title={activeClip.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Play info text under screen */}
            <div className="flex flex-col gap-2 p-1 text-left">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-[8px] bg-red-950/40 border border-red-900/50 text-[#ff8e8e] font-bold uppercase py-0.5 px-2 rounded-sm tracking-widest">
                  {activeClip.type} SELECTION
                </span>
                <span className="font-mono text-[8.5px] text-white/40 block uppercase tracking-widest">
                  RUN: <strong>{activeClip.duration} SEC</strong>
                </span>
              </div>
              <h3 className="font-display font-extrabold text-lg sm:text-xl text-white tracking-wide uppercase mt-1">
                {activeClip.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#9CA3AF] font-sans font-medium leading-relaxed max-w-3xl">
                {activeClip.description}
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Selection Playlist (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <span className="font-mono text-[9px] text-[#8B0000] uppercase tracking-widest block font-bold mb-1">
              THEATER PLAYLIST SELECTION
            </span>

            <div className="flex flex-col gap-4 max-h-[480px] overflow-y-auto pr-1">
              {trailerClips.map((clip) => {
                const isSelected = activeClip.id === clip.id;

                return (
                  <div
                    key={clip.id}
                    onClick={() => handleSelectClip(clip)}
                    className={`cursor-pointer border rounded-sm p-3 flex gap-4 transition-all duration-300 relative ${
                      isSelected 
                        ? 'bg-red-950/5 border-[#8B0000] shadow-md' 
                        : 'bg-white/[0.012] border-white/5 hover:border-white/10 hover:bg-white/[0.03]'
                    }`}
                  >
                    {/* Thumbnail representation */}
                    <div className="w-20.5 h-14 bg-neutral-900 border border-white/5 rounded-sm relative overflow-hidden shrink-0">
                      <img 
                        src={clip.imageUrl} 
                        alt={clip.title}
                        className="w-full h-full object-cover filter grayscale contrast-125 brightness-75"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Play size={10} className="text-white fill-current opacity-80" />
                      </div>
                    </div>

                    {/* Meta descriptions */}
                    <div className="flex flex-col justify-center min-w-0">
                      <h4 className="font-sans font-bold text-xs text-white/90 line-clamp-1 truncate uppercase">
                        {clip.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1.5 font-mono text-[8px] text-white/40">
                        <span className="text-red-500 font-bold uppercase">{clip.type}</span>
                        <span>•</span>
                        <span>{clip.duration} TIME</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}