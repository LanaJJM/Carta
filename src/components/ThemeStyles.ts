import { CardTheme } from '../types/card';

export interface ThemeConfig {
  id: CardTheme;
  name: string;
  bgClass: string;
  cardBg: string;
  cardBorder: string;
  textPrimary: string;
  textSecondary: string;
  accentColor: string;
  accentBg: string;
  envelopeColor: string;
  envelopeLiner: string;
  waxSealColor: string;
  backdropImage?: string;
}

export const THEME_CONFIGS: Record<CardTheme, ThemeConfig> = {
  golden_rose: {
    id: 'golden_rose',
    name: 'Rosa Dorado & Champán',
    bgClass: 'from-amber-950/40 via-rose-950/30 to-slate-950',
    cardBg: 'bg-gradient-to-b from-[#fffaf5] to-[#fdf2e9] text-stone-900',
    cardBorder: 'border-amber-200/60 shadow-amber-900/10',
    textPrimary: 'text-stone-900',
    textSecondary: 'text-stone-600',
    accentColor: '#f43f5e',
    accentBg: 'bg-rose-500 hover:bg-rose-600 text-white',
    envelopeColor: 'bg-gradient-to-b from-[#fce7f3] to-[#fbcfe8]',
    envelopeLiner: 'bg-amber-100/60 border-amber-200',
    waxSealColor: '#be123c', // deep ruby wax
    backdropImage: '/src/assets/images/celebration_golden_bokeh_1791677205111.jpg',
  },
  starlight: {
    id: 'starlight',
    name: 'Noche Estrellada & Galaxia',
    bgClass: 'from-indigo-950 via-slate-950 to-purple-950',
    cardBg: 'bg-gradient-to-b from-[#0f172a] to-[#020617] text-indigo-50',
    cardBorder: 'border-indigo-500/30 shadow-indigo-950/50',
    textPrimary: 'text-indigo-100',
    textSecondary: 'text-indigo-300',
    accentColor: '#818cf8',
    accentBg: 'bg-indigo-600 hover:bg-indigo-500 text-white',
    envelopeColor: 'bg-gradient-to-b from-[#1e1b4b] to-[#0f172a]',
    envelopeLiner: 'bg-indigo-900/40 border-indigo-500/30',
    waxSealColor: '#4f46e5', // royal blue wax
    backdropImage: '/src/assets/images/starlight_magic_cosmic_1791677220436.jpg',
  },
  pastel_confetti: {
    id: 'pastel_confetti',
    name: 'Fiesta Pastel & Confeti',
    bgClass: 'from-pink-950/30 via-sky-950/20 to-slate-950',
    cardBg: 'bg-gradient-to-b from-[#fffef8] to-[#fef6f6] text-slate-800',
    cardBorder: 'border-pink-200 shadow-pink-900/10',
    textPrimary: 'text-slate-900',
    textSecondary: 'text-slate-600',
    accentColor: '#ec4899',
    accentBg: 'bg-pink-500 hover:bg-pink-600 text-white',
    envelopeColor: 'bg-gradient-to-b from-[#fef08a] to-[#fed7aa]',
    envelopeLiner: 'bg-pink-100 border-pink-300/50',
    waxSealColor: '#db2777', // hot pink wax
  },
  botanical: {
    id: 'botanical',
    name: 'Esmeralda & Oro Botánico',
    bgClass: 'from-emerald-950/40 via-stone-950 to-slate-950',
    cardBg: 'bg-gradient-to-b from-[#f9fbf9] to-[#f0fdf4] text-emerald-950',
    cardBorder: 'border-emerald-300/40 shadow-emerald-950/20',
    textPrimary: 'text-emerald-950',
    textSecondary: 'text-emerald-800/80',
    accentColor: '#059669',
    accentBg: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    envelopeColor: 'bg-gradient-to-b from-[#064e3b] to-[#022c22]',
    envelopeLiner: 'bg-amber-100/30 border-amber-300/40',
    waxSealColor: '#b45309', // vintage antique gold wax
  },
  neon_party: {
    id: 'neon_party',
    name: 'Fiesta Glow & Neón',
    bgClass: 'from-purple-950 via-fuchsia-950/40 to-slate-950',
    cardBg: 'bg-gradient-to-b from-[#18181b] to-[#09090b] text-neutral-100',
    cardBorder: 'border-fuchsia-500/40 shadow-fuchsia-900/30',
    textPrimary: 'text-fuchsia-100',
    textSecondary: 'text-fuchsia-300',
    accentColor: '#d946ef',
    accentBg: 'bg-fuchsia-600 hover:bg-fuchsia-500 text-white',
    envelopeColor: 'bg-gradient-to-b from-[#2e1065] to-[#1e1b4b]',
    envelopeLiner: 'bg-fuchsia-950/60 border-fuchsia-400/40',
    waxSealColor: '#c026d3', // purple glow wax
  },
};
