import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, ZoomIn, X, ChevronRight, Download, Filter } from 'lucide-react';
import { galleryItems } from '../data';
import { GalleryItem } from '../types';
import { audioManager } from './AudioManager';

type FilterType = 'all' | 'poster' | 'bts' | 'concept' | 'production';

export default function MovieGallery() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const handleFilterClick = (filter: FilterType) => {
    audioManager.playClick();
    setActiveFilter(filter);
  };

  const handleOpenLightbox = (item: GalleryItem) => {
    audioManager.playClick();
    setLightboxItem(item);
  };

  const handleCloseLightbox = () => {
    audioManager.playClick();
    setLightboxItem(null);
  };

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.type === activeFilter);

  return (
    <section 
      id="gallery-section" 
      className="py-24 px-6 md:px-12 bg-[#0a0a0a]/90 border-t border-b border-white/5 relative z-10 select-none"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Title & Filters Panel */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[9px] tracking-[0.3em] text-[#8B0000] uppercase font-bold block">
              SECURED ARTIFACTUAL MEDIA ARCHIVES
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#EAEAEA] tracking-wide leading-tight uppercase">
              MOVIE GALLERY
            </h2>
            <p className="text-[#9CA3AF] text-sm max-w-lg font-sans">
              Inspect behind-the-scenes slides, rare concept sketches and theatrical promotional assets captured across the production eras.
            </p>
          </div>

          {/* Filtering Tab buttons */}
          <div className="flex flex-wrap gap-2.5 max-w-full">
            {(['all', 'poster', 'bts', 'concept', 'production'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterClick(filter)}
                className={`py-2 px-4 text-[9.5px] font-mono font-bold uppercase tracking-widest border rounded-sm transition-all duration-300 cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-[#8B0000] border-[#8B0000] text-white shadow-md'
                    : 'bg-black/60 border-white/5 text-neutral-450 hover:text-white hover:border-white/10'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid Gallery Content */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                onClick={() => handleOpenLightbox(item)}
                className="group cursor-pointer bg-black border border-white/5 hover:border-red-950/40 rounded-sm overflow-hidden h-72 relative shadow-2xl flex flex-col transition-all duration-300"
              >
                {/* Image panel */}
                <div className="flex-1 w-full relative overflow-hidden bg-neutral-950">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 brightness-75 group-hover:brightness-95 contrast-110 group-hover:scale-105 duration-700 transition-all"
                  />
                  
                  {/* Subtle glass texture overlay sheets */}
                  <div className="absolute inset-0 bg-[#8B0000]/5 mix-blend-color-burn opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Floating Zoom icon indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300 transition-opacity z-10">
                    <div className="w-10 h-10 bg-[#8B0000]/95 rounded-full flex items-center justify-center border border-red-700/50 shadow-md">
                      <ZoomIn size={14} className="text-white" />
                    </div>
                  </div>
                </div>

                {/* Footer panel details */}
                <div className="p-4 border-t border-white/5 bg-gradient-to-b from-black/10 to-black flex justify-between items-center z-15">
                  <div className="min-w-0">
                    <span className="font-mono text-[7px] text-red-500 font-bold block uppercase tracking-widest mb-1">
                      {item.type}
                    </span>
                    <h4 className="font-sans font-bold text-[11px] text-[#EAEAEA] line-clamp-1 truncate uppercase leading-none">
                      {item.title}
                    </h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal display overlay */}
        <AnimatePresence>
          {lightboxItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseLightbox}
              className="fixed inset-0 bg-black/98 z-50 flex flex-col items-center justify-center p-4 sm:p-10 backdrop-blur-md cursor-zoom-out"
            >
              {/* Close Button top-right */}
              <button
                onClick={handleCloseLightbox}
                className="absolute top-6 right-6 z-40 bg-black/70 hover:bg-red-950/80 text-white/75 hover:text-white p-3 border border-white/10 rounded-sm cursor-pointer transition-colors"
                title="Dismiss image viewer"
              >
                <X size={16} />
              </button>

              {/* Lightbox card frame container */}
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-4xl col-span-12 rounded-sm border border-white/10 overflow-hidden shadow-[0_0_60px_rgba(139,0,0,0.35)] flex flex-col relative bg-[#050505] cursor-default"
              >
                <div className="w-full max-h-[80vh] overflow-hidden flex items-center justify-center">
                  <img 
                    src={lightboxItem.imageUrl} 
                    alt={lightboxItem.title}
                    className="w-full h-auto max-h-[70vh] object-contain filter contrast-125 sepia hover:filter-none transition-all duration-300"
                  />
                </div>

                {/* Metadata card bar */}
                <div className="p-6 border-t border-white/10 bg-[#050505] flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 relative">
                  <div>
                    <span className="font-mono text-[9px] text-red-500 font-bold uppercase tracking-widest block mb-1">
                      CLASSIFIED VISUAL ARCHIVES // MEDIA_ID_{lightboxItem.id}
                    </span>
                    <h3 className="font-display font-bold text-lg text-white uppercase tracking-wider">
                      {lightboxItem.title}
                    </h3>
                  </div>

                  <div className="flex gap-2 font-mono text-[9.5px]">
                    <span className="bg-white/[0.04] border border-white/10 py-1.5 px-3 rounded-sm uppercase font-bold text-white/50 tracking-wider">
                      CATEGORY: <strong>{lightboxItem.type}</strong>
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Direct instructions tip overlay */}
              <span className="font-mono text-[8.5px] text-white/35 uppercase tracking-widest mt-6 select-none pointer-events-none">
                Click anywhere outside the frame to return to gallery
              </span>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
