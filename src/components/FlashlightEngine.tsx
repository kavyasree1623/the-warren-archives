/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Battery, Zap, AlertTriangle } from 'lucide-react';
import { audioManager } from './AudioManager';

interface FlashlightProps {
  sanity: number; // 0 to 100
  onChargeBattery: () => void;
  batteryLevel: number; // 0 to 100
  setBatteryLevel: React.Dispatch<React.SetStateAction<number>>;
  flickerIntensity: number; // 0 (stable) to 3 (dying)
}

export default function FlashlightEngine({
  sanity,
  onChargeBattery,
  batteryLevel,
  setBatteryLevel,
  flickerIntensity,
}: FlashlightProps) {
  const [position, setPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [flickerGap, setFlickerGap] = useState(1);
  const [batterySpawn, setBatterySpawn] = useState<{ x: number; y: number; id: string } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<{ x: number; y: number; r: number; dx: number; dy: number; alpha: number }[]>([]);

  // Track cursor position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        setPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Flashlight battery discharge
  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel((prev) => Math.max(0, prev - 0.08));
    }, 400);

    return () => clearInterval(interval);
  }, [setBatteryLevel]);

  // Flashlight flicker simulation (affected by sanity and manual events)
  useEffect(() => {
    const handleFlicker = () => {
      const sanityFactor = (100 - sanity) / 100; // lower sanity = more flickering
      const baseFlickerChance = 0.04 + sanityFactor * 0.15 + flickerIntensity * 0.2;

      if (Math.random() < baseFlickerChance) {
        // Toggle light off or dim briefly
        const steps = Math.floor(Math.random() * 4) + 1;
        let count = 0;
        const subInterval = setInterval(() => {
          setFlickerGap((prev) => (prev === 1 ? 0.15 + Math.random() * 0.4 : 1));
          count++;
          if (count >= steps) {
            clearInterval(subInterval);
            setFlickerGap(1);
          }
        }, 80);
      }
    };

    const ticker = setInterval(handleFlicker, 250);
    return () => clearInterval(ticker);
  }, [sanity, flickerIntensity]);

  // Occasional spawning of batteries on screen for physical pickup
  useEffect(() => {
    const spawnTimer = setInterval(() => {
      if (!batterySpawn && Math.random() < 0.4) {
        // Spawn battery in random quadrants (avoiding dead-center screen boundaries)
        const rx = 10 + Math.random() * 80;
        const ry = 15 + Math.random() * 70;
        setBatterySpawn({
          x: rx,
          y: ry,
          id: `batt_${Date.now()}`,
        });
      }
    }, 12000);

    return () => clearInterval(spawnTimer);
  }, [batterySpawn]);

  // Dust visual overlay using requestAnimationFrame
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create dust specks
    if (particlesRef.current.length === 0) {
      for (let i = 0; i < 60; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.5 + 0.5,
          dx: (Math.random() - 0.5) * 0.5,
          dy: (Math.random() - 0.5) * 0.5,
          alpha: Math.random() * 0.4 + 0.1,
        });
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // We only draw dust particles that fall within the flashlight beam circle
      const rOuter = (180 + (batteryLevel / 100) * 120) * flickerGap;

      particlesRef.current.forEach((p) => {
        // Move particles
        p.x += p.dx;
        p.y += p.dy;

        // Bounce back
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        // Calculate distance from light source (cursor)
        const dx = p.x - position.x;
        const dy = p.y - position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < rOuter) {
          // Glow intensity based on proximity to center of flashlight beam
          const factor = (1 - dist / rOuter) * p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 252, 230, ${factor * 0.95})`;
          ctx.shadowBlur = 4;
          ctx.shadowColor = '#fffdf0';
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [position, batteryLevel, flickerGap]);

  const handlePickBattery = () => {
    audioManager.playClick();
    onChargeBattery();
    setBatterySpawn(null);
  };

  // Outer radial gradient calculations (dark mask with hollowed out center around cursor)
  const rInner = (15 + (batteryLevel / 100) * 20) * flickerGap;
  const rOuter = (140 + (batteryLevel / 100) * 140) * flickerGap;

  const maskStyle: React.CSSProperties = {
    background: `radial-gradient(circle ${rOuter}px at ${position.x}px ${position.y}px, transparent ${rInner}px, rgba(4, 3, 4, 0.98) 100%)`,
  };

  return (
    <>
      {/* Black ambient mask overlay with hollowed out focus */}
      <div
        id="flashlight-mask"
        className="fixed inset-0 pointer-events-none z-40 select-none mix-blend-multiply"
        style={maskStyle}
      />

      {/* Atmospheric lighting accent ring to give glass flare effect */}
      <div
        className="fixed inset-0 pointer-events-none z-41 select-none"
        style={{
          background: `radial-gradient(circle ${rOuter + 8}px at ${position.x}px ${position.y}px, rgba(255, 253, 220, 0.05) 90%, rgba(252, 248, 204, 0.005) 98%, transparent 100%)`,
        }}
      />

      {/* Canvas for floating dust particles within the beam */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-42"
      />

      {/* Spooky Low Battery HUD warning */}
      {batteryLevel < 20 && (
        <div className="fixed bottom-6 right-6 z-45 bg-[#0d0404]/90 border border-[#8B0000]/60 p-3 rounded-md flex items-center gap-2 select-none pointer-events-none font-mono text-[10px] uppercase text-[#ff2e2e] tracking-widest animate-pulse">
          <AlertTriangle size={14} className="text-[#ff2e2e]" />
          <span>Battery Critical</span>
        </div>
      )}

      {/* Quick floating battery meter in the bottom corner */}
      <div className="fixed bottom-6 left-6 z-45 flex items-center gap-2 bg-[#000]/70 py-1.5 px-3 rounded border border-neutral-800 font-mono text-[11px] select-none text-neutral-400">
        <Battery size={13} className={batteryLevel < 20 ? 'text-[#ff2e2e] animate-bounce' : 'text-emerald-500'} />
        <div className="w-16 h-2 bg-neutral-900 rounded overflow-hidden p-[1px]">
          <div
            className={`h-full rounded-sm transition-all duration-300 ${batteryLevel < 20 ? 'bg-[#ff2e2e]' : 'bg-emerald-500'}`}
            style={{ width: `${batteryLevel}%` }}
          />
        </div>
        <span className={batteryLevel < 20 ? 'text-[#ff2e2e]' : 'text-neutral-300'}>{Math.floor(batteryLevel)}%</span>
      </div>

      {/* Random physical Battery Spawning on interface */}
      <AnimatePresence>
        {batterySpawn && (
          <motion.button
            key={batterySpawn.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.2 }}
            whileHover={{ scale: 1.15 }}
            style={{
              position: 'fixed',
              left: `${batterySpawn.x}%`,
              top: `${batterySpawn.y}%`,
            }}
            onClick={handlePickBattery}
            className="z-30 p-2.5 bg-[#121212]/95 border-2 border-emerald-500/80 rounded-full shadow-lg text-emerald-400 cursor-pointer flex items-center justify-center hover:bg-emerald-950/40 group overflow-hidden"
          >
            <div className="absolute inset-0 bg-emerald-500/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full" />
            <Zap size={14} className="relative z-10 animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
