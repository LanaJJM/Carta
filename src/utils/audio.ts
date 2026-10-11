// Web Audio API Synthesizer - 100% self-contained, no external audio assets needed

let audioCtx: AudioContext | null = null;
let currentMelodyTimer: number | null = null;
let isAudioMuted: boolean = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function setAudioMuted(muted: boolean) {
  isAudioMuted = muted;
  if (muted) {
    stopCurrentMelody();
  }
}

export function getAudioMuted(): boolean {
  return isAudioMuted;
}

export function stopCurrentMelody() {
  if (currentMelodyTimer !== null) {
    window.clearTimeout(currentMelodyTimer);
    currentMelodyTimer = null;
  }
}

// Play a single synthesized tone with ADSR envelope
export function playTone(freq: number, duration: number, type: OscillatorType = 'sine', gainLevel = 0.15) {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Envelope
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(gainLevel, ctx.currentTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Audio context may be restricted by autoplay policy until user gesture
  }
}

// Sound effect: Balloon Pop
export function playPopSound() {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch {}
}

// Sound effect: Candle blow whoosh
export function playCandleBlowSound() {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    // Generate soft noise burst for breath/whoosh
    const bufferSize = ctx.sampleRate * 0.4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.15));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    filter.frequency.linearRampToValueAtTime(200, ctx.currentTime + 0.4);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
  } catch {}
}

// Sound effect: Wax seal crack & envelope slide
export function playSealCrackSound() {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    playTone(280, 0.08, 'sawtooth', 0.1);
    setTimeout(() => playTone(540, 0.12, 'triangle', 0.12), 60);
    setTimeout(() => playTone(880, 0.25, 'sine', 0.18), 120);
  } catch {}
}

// Sound effect: Chime / Sparkle
export function playChimeSound() {
  if (isAudioMuted) return;
  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
  notes.forEach((freq, idx) => {
    setTimeout(() => {
      playTone(freq, 0.35, 'sine', 0.12);
    }, idx * 75);
  });
}

// Sound effect: Tada celebration fanfare
export function playTadaSound() {
  if (isAudioMuted) return;
  const notes = [440, 554.37, 659.25, 880];
  notes.forEach((freq, idx) => {
    setTimeout(() => {
      playTone(freq, 0.4, 'triangle', 0.18);
    }, idx * 100);
  });
  setTimeout(() => {
    playTone(880, 0.7, 'sine', 0.25);
  }, 450);
}

// Sound effect: Gift open
export function playGiftOpenSound() {
  if (isAudioMuted) return;
  playTone(392, 0.12, 'triangle', 0.15); // G4
  setTimeout(() => playTone(523.25, 0.12, 'triangle', 0.18), 100); // C5
  setTimeout(() => playTone(659.25, 0.15, 'sine', 0.2), 200); // E5
  setTimeout(() => playTone(783.99, 0.4, 'sine', 0.22), 300); // G5
}

// Play famous birthday melody using gentle music-box tones
export function playBirthdayMelody(onEnd?: () => void) {
  if (isAudioMuted) return;
  stopCurrentMelody();
  const ctx = getAudioContext();
  if (!ctx) return;

  // Notes: G4, G4, A4, G4, C5, B4 | G4, G4, A4, G4, D5, C5 | G4, G4, G5, E5, C5, B4, A4 | F5, F5, E5, C5, D5, C5
  const notes = [
    { f: 392.00, d: 250 }, // G4
    { f: 392.00, d: 250 }, // G4
    { f: 440.00, d: 500 }, // A4
    { f: 392.00, d: 500 }, // G4
    { f: 523.25, d: 500 }, // C5
    { f: 493.88, d: 900 }, // B4

    { f: 392.00, d: 250 }, // G4
    { f: 392.00, d: 250 }, // G4
    { f: 440.00, d: 500 }, // A4
    { f: 392.00, d: 500 }, // G4
    { f: 587.33, d: 500 }, // D5
    { f: 523.25, d: 900 }, // C5

    { f: 392.00, d: 250 }, // G4
    { f: 392.00, d: 250 }, // G4
    { f: 783.99, d: 500 }, // G5
    { f: 659.25, d: 500 }, // E5
    { f: 523.25, d: 500 }, // C5
    { f: 493.88, d: 500 }, // B4
    { f: 440.00, d: 800 }, // A4

    { f: 698.46, d: 250 }, // F5
    { f: 698.46, d: 250 }, // F5
    { f: 659.25, d: 500 }, // E5
    { f: 523.25, d: 500 }, // C5
    { f: 587.33, d: 500 }, // D5
    { f: 523.25, d: 1100 }, // C5
  ];

  let cumulativeTime = 0;
  notes.forEach((note, index) => {
    const timer = window.setTimeout(() => {
      if (!isAudioMuted) {
        playTone(note.f, note.d / 1000, 'sine', 0.16);
      }
      if (index === notes.length - 1 && onEnd) {
        onEnd();
      }
    }, cumulativeTime);
    cumulativeTime += note.d + 50;

    if (index === notes.length - 1) {
      currentMelodyTimer = timer;
    }
  });
}

// Gentle waltz melody
export function playWaltzMelody() {
  if (isAudioMuted) return;
  stopCurrentMelody();
  const notes = [
    { f: 523.25, d: 400 },
    { f: 659.25, d: 350 },
    { f: 783.99, d: 350 },
    { f: 659.25, d: 400 },
    { f: 587.33, d: 400 },
    { f: 698.46, d: 350 },
    { f: 880.00, d: 700 },
  ];
  let cumulative = 0;
  notes.forEach((note) => {
    window.setTimeout(() => {
      if (!isAudioMuted) playTone(note.f, note.d / 1000, 'sine', 0.14);
    }, cumulative);
    cumulative += note.d + 80;
  });
}
