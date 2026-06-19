/**
 * THE CONJURING UNIVERSE - CINEMATIC MOVIE EXPERIENCE WEBSITE
 * Master Entry Point & High-Fidelity Shell
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  VolumeX, 
  Volume2, 
  Zap, 
  Radio, 
  Eye, 
  EyeOff, 
  ShieldAlert, 
  Compass, 
  Settings, 
  Play, 
  Tv, 
  CloudRain, 
  Wind, 
  Music, 
  Activity,
  ChevronDown,
  ArrowLeft
} from 'lucide-react';

// Import child modules
import { audioManager } from './components/AudioManager';
import HeroSection from './components/HeroSection';
import WarrenLegacy from './components/WarrenLegacy';
import ExploreMovies from './components/ExploreMovies';
import WarrenMuseum from './components/WarrenMuseum';
import DemonEncyclopedia from './components/DemonEncyclopedia';
import TimelineOfEvil from './components/TimelineOfEvil';
import TrailerTheater from './components/TrailerTheater';
import MovieGallery from './components/MovieGallery';
import FinalEnding from './components/FinalEnding';
import RevealSection from './components/RevealSection';

export default function App() {
  const [visited, setVisited] = useState<boolean>(false);
  const [vhsMode, setVhsMode] = useState<boolean>(true);
  const [isAudioPanelOpen, setIsAudioPanelOpen] = useState<boolean>(false);

  // Sound loop states matching AudioManager
  const [soundStates, setSoundStates] = useState({
    wind: true,
    rain: true,
    drone: true,
    musicBox: false,
    muted: false,
    volume: 0.5
  });

  // VHS overlay date ticker strings
  const [timeStr, setTimeStr] = useState<string>('00:00:00');
  const [dateStr, setDateStr] = useState<string>('');
  const [vhsGlitch, setVhsGlitch] = useState<boolean>(false);

  // Establish live timecode clocks & trigger randomized magnetic malfunctions
  useEffect(() => {
    const updateVhsHUD = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      setTimeStr(`${hh}:${mm}:${ss}`);

      const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      setDateStr(`${months[now.getMonth()]}. ${String(now.getDate()).padStart(2, '0')} ${now.getFullYear()}`);
    };

    updateVhsHUD();
    const interval = setInterval(updateVhsHUD, 1000);

    // Random tape tracking slips
    const glitchTimer = setInterval(() => {
      if (Math.random() < 0.25 && vhsMode) {
        setVhsGlitch(true);
        audioManager.playGlitch();
        setTimeout(() => setVhsGlitch(false), 200 + Math.random() * 300);
      }
    }, 6000);

    return () => {
      clearInterval(interval);
      clearInterval(glitchTimer);
    };
  }, [vhsMode]);

  // Sync back button support & historical state mapping
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.page === 'universe') {
        setVisited(true);
      } else {
        setVisited(false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Sync state settings to AudioManager on init
  const handleEnterUniverse = () => {
    setVisited(true);
    // Push modern route tracker to browser history stack
    window.history.pushState({ page: 'universe' }, '', '?portal=active');

    audioManager.init();
    audioManager.setVolume(soundStates.volume);
    
    // Sync loops
    audioManager.toggleWind(soundStates.wind);
    audioManager.toggleRain(soundStates.rain);
    audioManager.toggleDrone(soundStates.drone);
    audioManager.toggleMusicBox(soundStates.musicBox);
  };

  // Audio control actions
  const toggleSoundTrack = (track: 'wind' | 'rain' | 'drone' | 'musicBox') => {
    audioManager.playClick();
    const nextVal = !soundStates[track];
    setSoundStates(prev => ({ ...prev, [track]: nextVal }));

    if (track === 'wind') audioManager.toggleWind(nextVal);
    if (track === 'rain') audioManager.toggleRain(nextVal);
    if (track === 'drone') audioManager.toggleDrone(nextVal);
    if (track === 'musicBox') audioManager.toggleMusicBox(nextVal);
  };

  const handleMuteToggle = () => {
    audioManager.playClick();
    audioManager.toggleMute();
    setSoundStates(prev => ({ ...prev, muted: !prev.muted }));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    audioManager.setVolume(val);
    setSoundStates(prev => ({ ...prev, volume: val }));
  };

  const triggerThunderSound = () => {
    audioManager.playThunder();
  };

  const triggerChurchBellSound = () => {
    audioManager.playChurchBell();
  };

  const toggleVhsMode = () => {
    audioManager.playClick();
    setVhsMode(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#EAEAEA] relative font-sans overflow-x-hidden antialiased selection:bg-[#8B0000] selection:text-white">
      
      {/* 1. Global Film Grain Screen Overlay */}
      <div className="pointer-events-none fixed inset-0 z-40 bg-scanlines opacity-10" />

      {/* 2. Global VHS Magnetic Deck Mode Overlay wrapping */}
      {vhsMode && (
        <div 
          className={`pointer-events-none fixed inset-0 z-[100] transition-all duration-100 ${
            vhsGlitch ? 'opacity-90 mix-blend-difference filter hue-rotate-180 scale-x-105 contrast-200' : 'opacity-100'
          }`}
          id="global-vhs-layer"
        >
          {/* Intermittent tracking grain bars */}
          <div className="absolute left-0 w-full h-1 bg-white/20 blur-[1px] animate-vhs-bar" />
          <div className="absolute inset-0 bg-vhs-noise opacity-8" />
          
          {/* Classic CRT VHS overlay corners readout tags */}
          <div className="absolute inset-x-0 top-0 p-8 flex justify-between font-mono text-[10px] md:text-xs text-red-500 font-bold select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] tracking-[0.25em]">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1 text-[#ff3c3c] animate-pulse">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff3c3c]" />
                <span>REC</span>
              </div>
              <span>SP MODE</span>
            </div>
            <div className="flex flex-col items-end text-neutral-400">
              <span>WARNER_ARCHIVE_REEL3</span>
              <span className="text-[8px] text-neutral-500 mt-1">CAMERA FEED 102</span>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-8 flex justify-between items-end font-mono text-[10.5px] md:text-[13px] text-emerald-400/80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] tracking-widest select-none font-bold">
            <div className="flex items-center gap-1.5">
              <span className="w-0.5 h-0.5" />
              <span>PLAY ▶</span>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-sm font-sans tracking-widest text-[#EAEAEA]">{timeStr}</span>
              <span className="text-[9.5px] text-neutral-400 font-mono tracking-wide">{dateStr}</span>
            </div>
          </div>
        </div>
      )}

      {/* WIDESCREEN SHELL ROUTER STATES */}
      <AnimatePresence mode="wait">
        {!visited ? (
          <motion.div 
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0 }}
          >
            {/* Cinematic Landing hero page */}
            <HeroSection onEnter={handleEnterUniverse} />
          </motion.div>
        ) : (
          <motion.div
            key="stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="flex flex-col"
          >
            {/* Floating Mini Universal Header Bar */}
            <header className="sticky top-0 left-0 w-full z-40 bg-black/85 border-b border-white/5 backdrop-blur-md flex justify-between items-center px-6 md:px-12 py-4 select-none">
              
              <div className="flex items-center gap-4">
                {/* BACK TO WELCOME ENTRY GATEWAY BUTTON */}
                <button
                  onClick={() => {
                    audioManager.playClick();
                    setVisited(false);
                    // Reset history status gracefully
                    window.history.pushState({ page: 'welcome' }, '', window.location.pathname);
                  }}
                  className="flex items-center gap-2 group py-1.5 px-3 bg-red-950/20 hover:bg-[#8B0000]/20 border border-red-900/40 hover:border-red-600/70 text-red-500 hover:text-white rounded-sm font-mono text-[9px] md:text-2xs uppercase tracking-[0.2em] cursor-pointer transition-all duration-300"
                  title="Return to home portal entrance"
                  id="back-to-welcome-btn"
                >
                  <ArrowLeft size={10} className="stroke-[3.5] transition-transform group-hover:-translate-x-0.5" />
                  <span>LEAVE PORTAL</span>
                </button>

                <div className="flex items-center gap-2">
                  <ShieldAlert size={14} className="text-red-500 animate-pulse" />
                  <span className="font-display font-[900] text-sm tracking-[0.25em] text-[#EAEAEA] hidden xs:inline-block">
                    THE CONJURING <span className="text-[#8B0000] font-[600]">UNIVERSE</span>
                  </span>
                </div>
              </div>

              {/* Quick toggle shortcuts */}
              <div className="flex items-center gap-3">
                
                {/* VHS mode toggle button */}
                <button
                  onClick={toggleVhsMode}
                  className={`py-1.5 px-3 border rounded-sm font-mono text-[8px] tracking-[0.2em] font-bold uppercase cursor-pointer transition-all ${
                    vhsMode 
                      ? 'bg-[#8B0000]/10 border-red-800 text-white shadow-md'
                      : 'bg-transparent border-white/10 text-neutral-400 hover:text-white'
                  }`}
                  title="Toggle Global analog scanline overlays"
                >
                  {vhsMode ? 'VHS MODE ACTIVE' : 'ACTIVATE VHS MODE'}
                </button>

                {/* Open Audio panel selector */}
                <button
                  onClick={() => {
                    audioManager.playClick();
                    setIsAudioPanelOpen(!isAudioPanelOpen);
                  }}
                  className={`p-2 border rounded-sm transition-colors cursor-pointer ${
                    isAudioPanelOpen 
                      ? 'bg-red-950/20 border-red-800 text-red-400' 
                      : 'bg-transparent border-white/10 text-neutral-400 hover:text-white'
                  }`}
                  title="Open cinematic audio dashboard"
                >
                  <Settings size={13} className="animate-spin duration-1500" />
                </button>

                {/* Master Muter feedback icon shortcut */}
                <button
                  onClick={handleMuteToggle}
                  className="p-2 border border-white/10 rounded-sm text-neutral-400 hover:text-white cursor-pointer transition-colors"
                >
                  {soundStates.muted ? <VolumeX size={13} className="text-red-500" /> : <Volume2 size={13} />}
                </button>

              </div>
            </header>

            {/* SECTIONS LIST LAUNCHER IN ORDER */}
            <main className="w-full flex flex-col relative z-20 gap-4">
              
              {/* SECTION 2: THE WARREN LEGACY */}
              <RevealSection direction="up" delay={0.15}>
                <WarrenLegacy />
              </RevealSection>

              {/* SECTION 3: EXPLORE THE MOVIES (Cinematic Movie cards and Modals) */}
              <RevealSection direction="up" delay={0.1}>
                <ExploreMovies />
              </RevealSection>

              {/* SECTION 4: OCCULT MUSEUM (Spotlit glass showcases & audio indicators) */}
              <RevealSection direction="up" delay={0.1}>
                <WarrenMuseum />
              </RevealSection>

              {/* SECTION 5: DEMON ENCYCLOPEDIA (Spooky profiles & warning indicators) */}
              <RevealSection direction="up" delay={0.1}>
                <DemonEncyclopedia />
              </RevealSection>

              {/* SECTION 6: TIMELINE OF EVIL (Centerpiece Horizontal linked system) */}
              <RevealSection direction="up" delay={0.1}>
                <TimelineOfEvil />
              </RevealSection>

              {/* SECTION 7: TRAILER THEATER (Netflix style theatrical preview screening) */}
              <RevealSection direction="up" delay={0.1}>
                <TrailerTheater />
              </RevealSection>

              {/* SECTION 8: MOVIE GALLERY (BTS, Concept Sketches filter bento grids) */}
              <RevealSection direction="up" delay={0.1}>
                <MovieGallery />
              </RevealSection>

              {/* SECTION 9: FINAL CINEMATIC ENDING (Atmospheric rain silhouette & credits) */}
              <RevealSection direction="up" delay={0.1}>
                <FinalEnding />
              </RevealSection>

            </main>

            {/* FLOATING RETRO CONTROL DECK DRAWER */}
            <AnimatePresence>
              {isAudioPanelOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  className="fixed bottom-6 right-6 z-50 w-full max-w-sm bg-black/95 border border-white/10 rounded-sm p-5 shadow-[0_0_35px_rgba(139,0,0,0.3)] backdrop-blur-lg select-none"
                  id="atmos-audio-vault"
                >
                  <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Radio size={12} className="text-red-500 animate-pulse" />
                      <span className="font-mono text-[9px] text-[#ff8e8e] uppercase font-bold tracking-widest">
                        PROCEDURAL SOUNDBOARD
                      </span>
                    </div>
                    <button
                      onClick={() => setIsAudioPanelOpen(false)}
                      className="font-mono text-[8px] text-neutral-400 hover:text-white uppercase tracking-wider cursor-pointer"
                    >
                      [ CLOSE SECTOR ]
                    </button>
                  </div>

                  <div className="flex flex-col gap-4">
                    
                    {/* Loops toggles lists */}
                    <div className="flex flex-col gap-2">
                      <span className="font-mono text-[8px] text-[#EAEAEA]/30 uppercase block font-bold mb-1">
                        BACKGROUND FEED LOOP SELECTOR
                      </span>

                      <div className="grid grid-cols-2 gap-2">
                        {/* Wind toggle button */}
                        <button
                          onClick={() => toggleSoundTrack('wind')}
                          className={`py-2 px-3 border rounded-sm font-mono text-[8px] font-bold uppercase transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                            soundStates.wind
                              ? 'bg-red-950/20 border-red-900 text-white'
                              : 'bg-transparent border-white/5 text-neutral-500 hover:text-white/80'
                          }`}
                        >
                          <Wind size={10} />
                          <span>WIND GAIN</span>
                        </button>

                        {/* Rain toggle button */}
                        <button
                          onClick={() => toggleSoundTrack('rain')}
                          className={`py-2 px-3 border rounded-sm font-mono text-[8px] font-bold uppercase transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                            soundStates.rain
                              ? 'bg-red-950/20 border-red-900 text-white'
                              : 'bg-transparent border-white/5 text-neutral-500 hover:text-white/80'
                          }`}
                        >
                          <CloudRain size={10} />
                          <span>RAIN GAIN</span>
                        </button>

                        {/* Drone toggle button */}
                        <button
                          onClick={() => toggleSoundTrack('drone')}
                          className={`py-2 px-3 border rounded-sm font-mono text-[8px] font-bold uppercase transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                            soundStates.drone
                              ? 'bg-red-950/20 border-red-900 text-white'
                              : 'bg-transparent border-white/5 text-neutral-500 hover:text-white/80'
                          }`}
                        >
                          <Activity size={10} />
                          <span>DRONE GAIN</span>
                        </button>

                        {/* Music Box toggle button */}
                        <button
                          onClick={() => toggleSoundTrack('musicBox')}
                          className={`py-2 px-3 border rounded-sm font-mono text-[8px] font-bold uppercase transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                            soundStates.musicBox
                              ? 'bg-red-950/20 border-red-900 text-white'
                              : 'bg-transparent border-white/5 text-neutral-500 hover:text-white/80'
                          }`}
                        >
                          <Music size={10} />
                          <span>MUSIC BOX</span>
                        </button>
                      </div>
                    </div>

                    {/* Interactive live atmospheric trigger macros */}
                    <div className="flex flex-col gap-2 border-t border-white/5 pt-4">
                      <span className="font-mono text-[8px] text-[#EAEAEA]/30 uppercase block font-bold mb-1">
                        ATMOSPHERIC INSTANT SWELLS
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {/* Thunder sound sweep block */}
                        <button
                          onClick={triggerThunderSound}
                          className="py-2 px-3 bg-neutral-950 hover:bg-[#8B0000] text-neutral-400 hover:text-white border border-white/5 rounded-sm font-mono text-[8px] font-bold uppercase flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <Zap size={10} />
                          <span>THUNDER CRACK</span>
                        </button>

                        {/* Bell toll block */}
                        <button
                          onClick={triggerChurchBellSound}
                          className="py-2 px-3 bg-neutral-950 hover:bg-[#8B0000] text-neutral-400 hover:text-white border border-white/5 rounded-sm font-mono text-[8px] font-bold uppercase flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <Tv size={10} />
                          <span>CHURCH BELL</span>
                        </button>
                      </div>
                    </div>

                    {/* Master volume slider */}
                    <div className="flex flex-col gap-2 border-t border-white/5 pt-4">
                      <div className="flex justify-between items-center text-[8.5px] font-mono text-[#EAEAEA]/40">
                        <span>MASTER SOUND DECEIBELS</span>
                        <span>{Math.floor(soundStates.volume * 100)}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="1" 
                        step="0.05"
                        value={soundStates.volume}
                        onChange={handleVolumeChange}
                        className="w-full accent-[#8B0050] h-1.5 bg-neutral-900 rounded-sm cursor-pointer outline-none"
                      />
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Silent Footer credits for legal compliance */}
            <footer className="bg-black py-16 px-6 border-t border-white/5 text-center font-mono text-[9px] text-neutral-600 uppercase tracking-widest relative z-20">
              <p>© 2026 WARNER BROS. ENTERTAINMENT. EXPERIMENT PORTAL DIRECTIVE.</p>
              <p className="mt-2 text-[8px] text-neutral-705">SOME DOORS SHOULD NEVER BE OPENED.</p>
            </footer>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
