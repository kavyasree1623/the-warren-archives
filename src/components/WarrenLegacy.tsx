import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Shield, Award, HelpCircle } from 'lucide-react';
import { audioManager } from './AudioManager';

type LegacyTab = 'biography' | 'investigations' | 'legacy' | 'influence';

export default function WarrenLegacy() {
  const [activeTab, setActiveTab] = useState<LegacyTab>('biography');

  const handleTabChange = (tab: LegacyTab) => {
    audioManager.playClick();
    setActiveTab(tab);
  };

  const tabsContent = {
    biography: {
      title: 'THE PARANORMAL HISTORIANS',
      subtitle: 'Ed & Lorraine Warren',
      text: 'Edward Warren Miney (a self-taught demonologist) and Lorraine Rita Warren (a clairvoyant and medium) were the preeminent American paranormal researchers of the 20th century. Edward grew up in a haunted house, which drove him to comprehend the mechanics of supernatural entities using scientific recording gear. Lorraine, possessing active spiritual sight, could discern residual energies and demonic lines radiating from cold spots in cursed environments. Together, they founded the New England Society for Psychic Research (NESPR) in 1952, marking the formal dawn of modern demonology.',
      visualQuote: '“Everything you see in this museum is cursed. Do not touch anything, not even for a fleeting moment.”',
      details: [
        { label: 'ED WARREN STATUS', value: 'Religious Demonologist (NESPR Founded 1952)' },
        { label: 'LORRAINE WARREN STATUS', value: 'Clairvoyant / Trance Spiritual Medium' },
        { label: 'ACTIVE OPERATION CODES', value: 'Rhode Island, London, Amityville, Connecticut' }
      ]
    },
    investigations: {
      title: 'THE CLASSIFIED CASE ARCHIVES',
      subtitle: 'Over 10,000 Hauntings Catalogued',
      text: 'From their home in Monroe, Connecticut, Ed and Lorraine Warren investigated thousands of paranormal claims across five decades. They encountered the most severe manifestations of dark witchcraft, demonic parasites, and active poltergeist infestations. Rather than simply writing research papers, they actively intervened, supporting religious exorcists, comforting terrorized families, and capturing the physical focal objects responsible for anchoring these entities to our mortal realm.',
      visualQuote: '“The devil exists. God exists. For us, as humans, our very destiny hinges on which one we choose to follow.”',
      details: [
        { label: 'KEY CASE 1', value: '1971 Harrisville Haunting (Perron family farmhouse)' },
        { label: 'KEY CASE 2', value: '1976 Amityville Horror (Lutz family demonic terror)' },
        { label: 'KEY CASE 3', value: '1977 Enfield Poltergeist (Hodgson home in London)' }
      ]
    },
    legacy: {
      title: 'A COVENANT OF TRUTH',
      subtitle: 'Shielding the Living, Remembering the Cursed',
      text: 'The Warrens left an indelible mark on religious, scientific, and cultural conversations surrounding the unseen world. By validating human trauma in haunted environments and documenting paranormal phenomenon with photography, thermal sensors, and audio wire recordings, they created the baseline library for modern supernatural study. Their archives, protected lock-and-key adjacent to their estate, serve as a warnings of dangerous forces looking to enter our homes.',
      visualQuote: '“You cannot study darkness without understanding the light. We stood in the breach to prevent that light from fading.”',
      details: [
        { label: 'MUSEUM STATUS', value: 'Monroe Vault Locked & Blessed Weekly' },
        { label: 'DOCUMENTS COLLECTED', value: '3,200 reels, 1,400 negative plates' },
        { label: 'CHURCH COGNIZANCE', value: 'Directly supported Roman Catholic Diocese' }
      ]
    },
    influence: {
      title: 'THE CINEMATIC GENESIS',
      subtitle: 'Defining the Lexicon of Horror',
      text: 'The story of Ed and Lorraine Warren forms the solid foundational concrete backing of The Conjuring Universe. From James Wan\'s 2013 cinematic masterpiece to the sprawling lore of Annabelle and Valak, each storyline draws directly from their raw field recordings and case files. Their scientific-meets-gothic investigative methodology defines the aesthetic framework of the movies: a balanced combination of historical realism, bone-chilling supernatural entities, and the resilience of human bonds.',
      visualQuote: '“Truth is stranger than fiction. But when the truth involves demons, the boundary lines dissolve entirely.”',
      details: [
        { label: 'CINEMATIC LAUNCH', value: 'The Conjuring (2013) directed by James Wan' },
        { label: 'LORE EXPANSION', value: 'Annabelle, The Nun, The Crooked Man' },
        { label: 'AESTHETIC THEMES', value: 'Faith vs. Disbelief, Relic Anchor Containment' }
      ]
    }
  };

  const currentTab = tabsContent[activeTab];

  return (
    <section 
      id="legacy-section" 
      className="py-24 px-6 md:px-12 bg-[#0a0a0a]/90 border-t border-b border-white/5 relative z-10 select-none"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column - Historical Newspaper / Clipping Collage (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <span className="font-mono text-[9px] tracking-[0.3em] text-[#8B0000] uppercase font-bold block">
            HISTORICAL CASE LOGS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#EAEAEA] tracking-wide leading-tight uppercase">
            THE WARREN LEGACY
          </h2>

          {/* Newspaper Clipping Component Panel */}
          <div className="relative bg-[#ebe6db] p-6 text-[#1a1a1a] shadow-2xl rounded-sm border-2 border-neutral-800 rotate-1 flex flex-col gap-4 font-serif leading-relaxed select-text selection:bg-[#8B0000]/10">
            {/* Ink stamps */}
            <div className="absolute right-6 top-6 border-2 border-red-700/60 text-red-700/60 px-3 py-1 font-mono text-[10px] tracking-widest uppercase font-bold rounded-sm select-none pointer-events-none rotate-12 bg-white/20">
              CLASSIFIED - NESPR
            </div>

            {/* Headline */}
            <div className="border-b-2 border-dashed border-[#1a1a1a]/40 pb-3">
              <span className="font-mono text-[8px] uppercase tracking-wider block opacity-70">
                THE MONROE DAILY JOURNAL - OCTOBER 14, 1971
              </span>
              <h3 className="font-display font-black text-xl sm:text-2xl tracking-normal uppercase leading-tight mt-1 text-[#111111]">
                COUPLE PROVES MONROE HOUSE CURED OF SPIRIT DEMONS
              </h3>
            </div>

            {/* Body text columns */}
            <div className="text-xs sm:text-[13px] text-[#2a2a2a] grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="indent-4">
                  <strong>MONROE, CT —</strong> Local researchers Ed and Lorraine Warren returned today from the dense Rhode Island woodlands after conducting extensive research on several colonial estates. The couple asserts that a spirit, swearing allegiance to darker witchcraft covens, had infested the soil.
                </p>
              </div>
              <div>
                <p>
                  "We have captured physical recordings indicating high-scale dynamic energy fields shifting in the cellar during the bedtime cycle," Ed stated to our press representatives. The couple has secured the focal mirror object in their private locked MONROE museum box.
                </p>
              </div>
            </div>

            {/* Vintage photograph simulation */}
            <div className="w-full h-44 bg-[#0a0a0a] rounded-sm relative overflow-hidden flex items-end justify-center select-none">
              <div 
                className="absolute inset-0 bg-cover bg-center grayscale filter contrast-125 sepia hover:filter-none transition-all duration-300 pointer-events-auto"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80')`
                }}
              />
              <div className="absolute inset-0 bg-black/10 mix-blend-color-burn" />
              <div className="relative z-10 w-full bg-black/70 py-1.5 px-3 text-center border-t border-white/5">
                <span className="font-mono text-[8px] text-[#ebe6db] uppercase tracking-wider">
                  Fig 2.1 — Spectral manifestation site survey (1971)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Interactive Tabs & Editorial Presentation (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6 bg-white/[0.02] border border-white/5 p-6 sm:p-10 rounded-sm shadow-2xl backdrop-blur-md">
          
          {/* Navigation Controls */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 border-b border-white/5 pb-6">
            {(['biography', 'investigations', 'legacy', 'influence'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`py-2.5 px-1.5 text-[10px] font-mono uppercase tracking-[0.2em] border rounded-sm transition-all duration-300 font-bold text-center cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[#8B0000]/10 border-[#8B0000] text-white shadow-[0_0_15px_rgba(139,0,0,0.15)] font-display'
                    : 'bg-[#050505]/60 border-white/5 text-neutral-400 hover:text-white hover:border-white/10'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Screen Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-6"
            >
              <div>
                <span className="font-mono text-[10px] text-red-500 uppercase tracking-widest font-bold block mb-1">
                  {currentTab.title}
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#EAEAEA] uppercase">
                  {currentTab.subtitle}
                </h3>
              </div>

              {/* Haunting italic blockquote */}
              <div className="border-l-2 border-[#8B0000] pl-4 italic text-[#EAEAEA]/70 my-2 text-sm sm:text-base leading-relaxed font-serif font-medium">
                {currentTab.visualQuote}
              </div>

              {/* Narrated description */}
              <p className="text-[#9CA3AF] text-sm sm:text-[15px] leading-relaxed font-sans first-letter:text-3xl first-letter:font-bold first-letter:text-[#8B0000] first-letter:float-left first-letter:mr-2">
                {currentTab.text}
              </p>

              {/* Archival metadata keys */}
              <div className="border-t border-white/5 pt-6 flex flex-col gap-3">
                <span className="font-mono text-[9px] text-[#EAEAEA]/40 uppercase tracking-widest block font-bold mb-1">
                  CLASSIFIED DOSSIER LOG KEYS
                </span>
                <div className="flex flex-col gap-2.5">
                  {currentTab.details.map((det, i) => (
                    <div 
                      key={i} 
                      className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-2 border-b border-white/[0.03] items-center text-xs"
                    >
                      <span className="font-mono uppercase text-red-500 font-bold tracking-wider sm:col-span-1">
                        {det.label}
                      </span>
                      <span className="font-sans text-[#EAEAEA]/80 font-medium sm:col-span-2">
                        {det.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
