import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Cake, Star, Crown, Sparkles, Gift, Wine } from 'lucide-react';
import { VirtualCardData, SealSymbol } from '../types/card';
import { THEME_CONFIGS } from './ThemeStyles';
import { playSealCrackSound, playBirthdayMelody, playWaltzMelody, playTadaSound } from '../utils/audio';
import { fireBirthdayConfetti } from '../utils/confetti';

interface EnvelopeViewProps {
  card: VirtualCardData;
  onLetterOpened: () => void;
}

export const EnvelopeView: React.FC<EnvelopeViewProps> = ({ card, onLetterOpened }) => {
  const [isOpening, setIsOpening] = useState(false);
  const theme = THEME_CONFIGS[card.theme] || THEME_CONFIGS.golden_rose;

  const renderSealIcon = (symbol: SealSymbol) => {
    const iconClass = 'w-6 h-6 text-amber-100 drop-shadow';
    switch (symbol) {
      case 'heart':
        return <Heart className={iconClass} fill="currentColor" />;
      case 'cake':
        return <Cake className={iconClass} />;
      case 'star':
        return <Star className={iconClass} fill="currentColor" />;
      case 'crown':
        return <Crown className={iconClass} />;
      case 'gift':
        return <Gift className={iconClass} />;
      case 'champagne':
        return <Wine className={iconClass} />;
      case 'sparkle':
      default:
        return <Sparkles className={iconClass} />;
    }
  };

  const handleOpenEnvelope = () => {
    if (isOpening) return;
    setIsOpening(true);
    playSealCrackSound();

    // Start celebratory music track
    if (card.musicTrack === 'cumpleanos_feliz') {
      setTimeout(() => playBirthdayMelody(), 350);
    } else if (card.musicTrack === 'dulce_vals') {
      setTimeout(() => playWaltzMelody(), 350);
    } else if (card.musicTrack === 'celebracion_magica') {
      setTimeout(() => playTadaSound(), 350);
    }

    // Confetti fanfare
    setTimeout(() => {
      fireBirthdayConfetti();
    }, 450);

    // Transition to letter
    setTimeout(() => {
      onLetterOpened();
    }, 1100);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-8 select-none">
      {/* Decorative prompt banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <span className="text-xs uppercase font-semibold tracking-widest text-amber-300/90 block mb-1">
          Has recibido una sorpresa virtual
        </span>
        <h2 className="text-2xl md:text-3xl font-serif-display font-bold text-white tracking-tight drop-shadow-md">
          {card.recipientName ? `Una carta especial para ${card.recipientName}` : 'Una carta especial para ti'}
        </h2>
        <p className="text-xs text-slate-300 mt-1">
          Toca el sello de lacre para romperlo y descubrir lo que hay dentro.
        </p>
      </motion.div>

      {/* The 3D Envelope Container */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative w-full max-w-md aspect-[16/10] sm:aspect-[16/9.5] cursor-pointer group"
        onClick={handleOpenEnvelope}
      >
        {/* Envelope Base Body */}
        <div
          className={`absolute inset-0 rounded-2xl shadow-2xl overflow-hidden border border-white/20 ${theme.envelopeColor}`}
          style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 25px rgba(251, 191, 36, 0.15)',
          }}
        >
          {/* Internal Envelope Liner Pattern */}
          <div className={`absolute inset-2 rounded-xl opacity-35 ${theme.envelopeLiner}`} />

          {/* Postal Markings (Top Right Stamp) */}
          <div className="absolute top-4 right-5 w-14 h-16 rounded border-2 border-dashed border-amber-900/40 bg-white/40 backdrop-blur-xs p-1 flex flex-col items-center justify-between shadow-sm">
            <span className="text-[8px] font-bold uppercase tracking-wider text-amber-950/70">Postal</span>
            <div className="w-8 h-8 rounded-full bg-rose-400/20 flex items-center justify-center text-rose-900">
              {renderSealIcon(card.sealSymbol)}
            </div>
            <span className="text-[7px] text-amber-950/60 font-mono">11.OCT.26</span>
          </div>

          {/* Airmail stripes or decorative edges */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-amber-400 to-sky-500 opacity-60" />

          {/* Calligraphic Recipient & Sender labels */}
          <div className="absolute inset-x-8 bottom-6 flex flex-col items-start z-10">
            <span className="text-[11px] uppercase tracking-widest text-slate-700/80 font-semibold mb-0.5">
              Para:
            </span>
            <h3 className="text-2xl md:text-3xl font-handwriting font-bold text-slate-900 tracking-wide drop-shadow-xs">
              {card.recipientName || 'Mi Persona Favorita'}
            </h3>
            {card.senderName && (
              <span className="text-xs font-handwriting text-slate-700 mt-1">
                Con todo el cariño de: {card.senderName}
              </span>
            )}
          </div>

          {/* Triangle flap crease lines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              background:
                'linear-gradient(135deg, transparent 49.5%, rgba(0,0,0,0.3) 50%, transparent 50.5%), linear-gradient(225deg, transparent 49.5%, rgba(0,0,0,0.3) 50%, transparent 50.5%)',
            }}
          />
        </div>

        {/* The Folding Flap */}
        <motion.div
          animate={
            isOpening
              ? { rotateX: 160, y: -10, opacity: 0.7 }
              : { rotateX: 0, y: 0, opacity: 1 }
          }
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          style={{ transformOrigin: 'top center' }}
          className={`absolute inset-x-0 top-0 h-[52%] ${theme.envelopeColor} rounded-t-2xl border-t border-x border-white/25 shadow-lg z-20`}
        >
          {/* Triangle flap tip */}
          <div
            className="w-full h-full"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.08) 100%)',
            }}
          />
        </motion.div>

        {/* The Wax Seal Medallion */}
        <motion.div
          animate={
            isOpening
              ? { scale: 0.2, opacity: 0, y: 30 }
              : { scale: [1, 1.04, 1] }
          }
          transition={
            isOpening
              ? { duration: 0.4 }
              : { repeat: Infinity, duration: 2.2, ease: 'easeInOut' }
          }
          className="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center cursor-pointer group-hover:scale-110 transition-transform"
        >
          {/* Wax outer irregular drops */}
          <div
            className="w-16 h-16 md:w-18 md:h-18 rounded-full shadow-2xl flex items-center justify-center relative border-2 border-amber-200/40"
            style={{
              backgroundColor: theme.waxSealColor,
              boxShadow: `0 8px 24px ${theme.waxSealColor}88, inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(0,0,0,0.5)`,
            }}
          >
            {/* Inner ring */}
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-amber-300/40 flex items-center justify-center">
              {renderSealIcon(card.sealSymbol)}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating instruction hint */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mt-6 flex items-center gap-2 text-xs text-amber-200/90 font-medium"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        <span>Haz clic o toca el sobre para abrir</span>
      </motion.div>
    </div>
  );
};
