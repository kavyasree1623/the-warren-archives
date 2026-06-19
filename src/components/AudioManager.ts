/**
 * THE CONJURING UNIVERSE - PROCEDURAL HORROR SYNTHESIZER
 * Designed to run completely offline/sandboxed without external .mp3 assets,
 * resolving browser security policies and origin constraints.
 */

import { Howl } from 'howler';

class AudioManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;

  // Sound nodes
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;

  private windGain: GainNode | null = null;
  private windOsc: OscillatorNode | null = null;

  private rainSource: AudioBufferSourceNode | null = null;
  private rainGain: GainNode | null = null;

  private musicBoxTimer: any = null;
  private isMusicBoxPlaying: boolean = false;
  private musicBoxIndex: number = 0;

  // Synthesizer running states
  public isMuted: boolean = false;
  public volumeLevel: number = 0.6;
  public isInitialized: boolean = false;

  // Active loop states
  public windActive: boolean = true;
  public rainActive: boolean = true;
  public droneActive: boolean = true;
  public musicBoxActive: boolean = false;

  constructor() {
    // Initialized on first user interaction to comply with browser audio policies
  }

  public init() {
    if (this.isInitialized) return;

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volumeLevel, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Start core loops
      this.startDrone();
      this.startRain();
      this.startWindSweeps();
      
      this.isInitialized = true;
      console.log('Procedural Horror Audio Engine initialized.');
    } catch (e) {
      console.warn('Web Audio API blocked or not supported on this device:', e);
    }
  }

  // Soft Horror Drone: Dual-oscillators clashing at a detuned low pitch
  private startDrone() {
    if (!this.ctx || !this.masterGain) return;

    const o1 = this.ctx.createOscillator();
    const o2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const g = this.ctx.createGain();

    o1.type = 'sawtooth';
    o1.frequency.setValueAtTime(45.0, this.ctx.currentTime); // Deep F#0

    o2.type = 'sine';
    o2.frequency.setValueAtTime(45.5, this.ctx.currentTime); // Detune clash

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(80, this.ctx.currentTime);
    filter.Q.setValueAtTime(8, this.ctx.currentTime);

    g.gain.setValueAtTime(this.droneActive ? 0.15 : 0, this.ctx.currentTime);

    o1.connect(filter);
    o2.connect(filter);
    filter.connect(g);
    g.connect(this.masterGain);

    o1.start();
    o2.start();

    this.droneOsc1 = o1;
    this.droneOsc2 = o2;
    this.droneGain = g;

    // Slowly fluctuate filter for cold cellar mood shifts
    const wobble = () => {
      if (!this.ctx || !this.droneGain || !this.droneActive) return;
      const t = this.ctx.currentTime;
      filter.frequency.exponentialRampToValueAtTime(
        60 + Math.random() * 50,
        t + 4 + Math.random() * 4
      );
      setTimeout(wobble, 7000);
    };
    wobble();
  }

  // Rain Ambience: Synthesized via bandpass-filtered noise with rain crackles
  private startRain() {
    if (!this.ctx || !this.masterGain) return;

    const streamLen = 3 * this.ctx.sampleRate;
    const buffer = this.ctx.createBuffer(1, streamLen, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Populate with white noise
    for (let i = 0; i < streamLen; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const hpf = this.ctx.createBiquadFilter();
    hpf.type = 'highpass';
    hpf.frequency.setValueAtTime(800, this.ctx.currentTime);

    const lpf = this.ctx.createBiquadFilter();
    lpf.type = 'lowpass';
    lpf.frequency.setValueAtTime(3200, this.ctx.currentTime);

    const g = this.ctx.createGain();
    g.gain.setValueAtTime(this.rainActive ? 0.08 : 0, this.ctx.currentTime);

    source.connect(hpf);
    hpf.connect(lpf);
    lpf.connect(g);
    g.connect(this.masterGain);

    source.start();

    this.rainSource = source;
    this.rainGain = g;

    // Program micro-patter of individual drops
    const triggerRaindrop = () => {
      if (!this.ctx || !this.masterGain || !this.rainActive || this.isMuted) return;
      
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const dropGain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(2000 + Math.random() * 3000, t);
      
      dropGain.gain.setValueAtTime(0.005 + Math.random() * 0.015, t);
      dropGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.03 + Math.random() * 0.04);
      
      osc.connect(dropGain);
      dropGain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 0.08);

      setTimeout(triggerRaindrop, 15 + Math.random() * 65);
    };
    triggerRaindrop();
  }

  // Wind Ambience: Swept bandpass filter over noise to sound like a howling gale
  private startWindSweeps() {
    if (!this.ctx || !this.masterGain) return;

    const streamLen = 4 * this.ctx.sampleRate;
    const buffer = this.ctx.createBuffer(1, streamLen, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < streamLen; i++) {
       data[i] = Math.random() * 2 - 1;
    }

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(300, this.ctx.currentTime);
    filter.Q.setValueAtTime(4.0, this.ctx.currentTime);

    const g = this.ctx.createGain();
    g.gain.setValueAtTime(this.windActive ? 0.07 : 0, this.ctx.currentTime);

    source.connect(filter);
    filter.connect(g);
    g.connect(this.masterGain);

    source.start();
    this.windGain = g;

    // Wind howl modulations
    const howlMod = () => {
      if (!this.ctx || !this.windGain || !this.windActive) return;
      const t = this.ctx.currentTime;
      const speed = 400 + Math.random() * 600;
      filter.frequency.exponentialRampToValueAtTime(speed, t + 3 + Math.random() * 4);
      g.gain.linearRampToValueAtTime(0.04 + Math.random() * 0.08, t + 3 + Math.random() * 4);
      setTimeout(howlMod, 5000);
    };
    howlMod();
  }

  // Thunder Cracks: Explosive noise blast + deep rumbling resonance
  public playThunder() {
    this.init();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const t = this.ctx.currentTime;

    // Sharp initial lightning strike crackle
    const crack = this.ctx.createOscillator();
    const crackG = this.ctx.createGain();
    crack.type = 'sawtooth';
    crack.frequency.setValueAtTime(120, t);
    crack.frequency.linearRampToValueAtTime(30, t + 0.15);
    crackG.gain.setValueAtTime(0.35, t);
    crackG.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

    crack.connect(crackG);
    crackG.connect(this.masterGain);
    crack.start();
    crack.stop(t + 0.22);

    // Low rumble that sweeps and rolls
    const rumble = this.ctx.createOscillator();
    const rumbleG = this.ctx.createGain();
    rumble.type = 'sine';
    rumble.frequency.setValueAtTime(55, t);
    // Rapidly modulate frequency for that vibrating thunderstorm rolling crackle
    const modInt = setInterval(() => {
      if (!this.ctx || !rumble) {
         clearInterval(modInt);
         return;
      }
      rumble.frequency.setValueAtTime(40 + Math.sin(Date.now() * 0.05) * 15, this.ctx.currentTime);
    }, 40);

    rumbleG.gain.setValueAtTime(0.5, t);
    rumbleG.gain.linearRampToValueAtTime(0.4, t + 0.5);
    rumbleG.gain.exponentialRampToValueAtTime(0.001, t + 4.5);

    rumble.connect(rumbleG);
    rumbleG.connect(this.masterGain);
    rumble.start();
    rumble.stop(t + 4.6);

    setTimeout(() => {
      clearInterval(modInt);
    }, 4600);
  }

  // Church Bell Tolls: Clashing gothic bell partials with rich decay
  public playChurchBell() {
    this.init();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const t = this.ctx.currentTime;
    const partials = [180, 240, 312, 450, 540]; // Grim bell intervals
    const gains = [0.35, 0.20, 0.12, 0.08, 0.04];

    partials.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);
      
      g.gain.setValueAtTime(gains[idx], t);
      // Long atmospheric decay representing church yards
      g.gain.exponentialRampToValueAtTime(0.0001, t + 5.0 - idx * 0.4);

      osc.connect(g);
      g.connect(this.masterGain);
      osc.start();
      osc.stop(t + 5.2);
    });
  }

  // Haunting Music Box: procedural crystal comb melody
  // Plays a beautiful, melancholy horror loop based on "Annabelle Higgins' Theme"
  public playMusicBoxNote() {
    this.init();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const t = this.ctx.currentTime;
    
    // Notes of the eerie nursery rhyme (frequencies)
    const melody = [
      659.25, // E5
      523.25, // C5
      587.33, // D5
      659.25, // E5
      783.99, // G5
      659.25, // E5
      587.33, // D5
      523.25, // C5
      440.00, // A4
      587.33, // D5
      523.25, // C5
      440.00, // A4
      392.00, // G4
      440.00, // A4
      523.25, // C5
      587.33, // D5
    ];

    const freq = melody[this.musicBoxIndex % melody.length];
    this.musicBoxIndex++;

    // Sparkling primary pluck
    const tine = this.ctx.createOscillator();
    const tineGain = this.ctx.createGain();
    tine.type = 'sine';
    tine.frequency.setValueAtTime(freq, t);
    
    tineGain.gain.setValueAtTime(0.18, t);
    tineGain.gain.exponentialRampToValueAtTime(0.0001, t + 1.2); // ringy decay

    // High overtone harmonic resonance
    const overtone = this.ctx.createOscillator();
    const overtoneGain = this.ctx.createGain();
    overtone.type = 'sine';
    overtone.frequency.setValueAtTime(freq * 2, t); // Octave jump
    
    overtoneGain.gain.setValueAtTime(0.04, t);
    overtoneGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);

    tine.connect(tineGain);
    tineGain.connect(this.masterGain);
    
    overtone.connect(overtoneGain);
    overtoneGain.connect(this.masterGain);

    tine.start();
    tine.stop(t + 1.25);
    
    overtone.start();
    overtone.stop(t + 0.65);
  }

  // Toggle active looping elements on the fly
  public toggleWind(active: boolean) {
    this.windActive = active;
    if (this.windGain && this.ctx) {
      this.windGain.gain.setTargetAtTime(active ? 0.07 : 0, this.ctx.currentTime, 0.5);
    }
  }

  public toggleRain(active: boolean) {
    this.rainActive = active;
    if (this.rainGain && this.ctx) {
      this.rainGain.gain.setTargetAtTime(active ? 0.08 : 0, this.ctx.currentTime, 0.5);
    }
  }

  public toggleDrone(active: boolean) {
    this.droneActive = active;
    if (this.droneGain && this.ctx) {
      this.droneGain.gain.setTargetAtTime(active ? 0.15 : 0, this.ctx.currentTime, 0.5);
    }
  }

  // Toggle continuous procedural music box routine
  public toggleMusicBox(active: boolean) {
    this.musicBoxActive = active;
    if (active) {
      if (this.musicBoxTimer) clearInterval(this.musicBoxTimer);
      this.musicBoxTimer = setInterval(() => {
        this.playMusicBoxNote();
      }, 750);
      this.playMusicBoxNote();
    } else {
      if (this.musicBoxTimer) {
        clearInterval(this.musicBoxTimer);
        this.musicBoxTimer = null;
      }
    }
  }

  public playClick() {
    this.init();
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const t = this.ctx.currentTime;
    const click = this.ctx.createOscillator();
    const clickGain = this.ctx.createGain();
    click.type = 'triangle';
    click.frequency.setValueAtTime(500, t);
    click.frequency.linearRampToValueAtTime(50, t + 0.04);
    clickGain.gain.setValueAtTime(0.06, t);
    clickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
    click.connect(clickGain);
    clickGain.connect(this.masterGain);
    click.start();
    click.stop(t + 0.05);
  }

  public playGlitch() {
    this.init();
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(60, t);
    o.frequency.linearRampToValueAtTime(400, t + 0.15);
    g.gain.setValueAtTime(0.12, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    o.connect(g);
    g.connect(this.masterGain);
    o.start();
    o.stop(t + 0.22);
  }

  public playWhoosh() {
    this.init();
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, t);
    osc.frequency.exponentialRampToValueAtTime(80, t + 0.6);
    g.gain.setValueAtTime(0.18, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.65);
    osc.connect(g);
    g.connect(this.masterGain);
    osc.start();
    osc.stop(t + 0.75);
  }

  public setVolume(volume: number) {
    this.volumeLevel = volume;
    if (!this.masterGain || !this.ctx) return;
    this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : volume, this.ctx.currentTime);
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volumeLevel, this.ctx.currentTime);
    }
  }
}

export const audioManager = new AudioManager();
