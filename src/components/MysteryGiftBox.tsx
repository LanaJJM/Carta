import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Sparkles, Check, PartyPopper } from 'lucide-react';
import { SurpriseGift } from '../types/card';
import { playGiftOpenSound } from '../utils/audio';
import { fireFireworks } from '../utils/confetti';

interface MysteryGiftBoxProps {
  gift: SurpriseGift;
  senderName: string;
}

export const MysteryGiftBox: React.FC<MysteryGiftBoxProps> = ({ gift, senderName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleOpenBox = () => {
    if (isOpen) return;
    playGiftOpenSound();
    setIsOpen(true);
    fireFireworks();
  };

  const handleCopyVoucher = () => {
    const textToCopy = `🎁 Sorpresa Especial de ${senderName}: ${gift.title} - ${gift.description}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="relative my-6 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col items-center text-center">
      <div className="mb-3">
        <h4 className="text-sm font-semibold tracking-wide uppercase text-rose-300 flex items-center justify-center gap-1.5">
          <Gift className="w-4 h-4 text-rose-400" />
          Caja de Regalo Sorpresa
        </h4>
        <p className="text-xs text-slate-300 mt-0.5">
          {isOpen ? '¡Tu sorpresa ha sido desbloqueada!' : 'Toca la caja de regalo para desatar el lazo y abrir la tapa.'}
        </p>
      </div>

      {/* Gift Box Graphic */}
      <div className="relative my-4 flex flex-col items-center cursor-pointer select-none" onClick={handleOpenBox}>
        {/* Lid of the gift box */}
        <motion.div
          animate={
            isOpen
              ? { y: -38, rotate: -18, scale: 1.05 }
              : { y: 0, rotate: 0, scale: 1 }
          }
          transition={{ type: 'spring', stiffness: 240, damping: 14 }}
          className="relative z-20 flex flex-col items-center"
        >
          {/* Ribbon Bow on top */}
          <div className="flex items-center justify-center -mb-1">
            <div className="w-5 h-4 border-2 border-amber-300 bg-amber-400/80 rounded-full -rotate-12 shadow-sm" />
            <div className="w-5 h-4 border-2 border-amber-300 bg-amber-400/80 rounded-full rotate-12 -ml-1.5 shadow-sm" />
          </div>
          {/* Lid Block */}
          <div className="w-36 h-9 rounded-t-lg bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 border border-rose-400 shadow-md flex items-center justify-center relative overflow-hidden">
            {/* Golden Vertical Ribbon on Lid */}
            <div className="w-6 h-full bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 shadow-sm" />
          </div>
        </motion.div>

        {/* Base of the gift box */}
        <div className="relative w-32 h-28 rounded-b-xl bg-gradient-to-r from-rose-700 via-rose-600 to-rose-700 border-x border-b border-rose-500 shadow-2xl flex items-center justify-center overflow-hidden -mt-1 z-10">
          {/* Golden Ribbon Bands (Cross Pattern) */}
          <div className="absolute w-6 h-full bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 shadow-inner" />
          <div className="absolute w-full h-6 bg-gradient-to-b from-amber-300 via-yellow-200 to-amber-300 shadow-inner" />

          {/* Glowing Aura if open */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1.2 }}
              className="absolute inset-0 bg-amber-300/30 blur-md pointer-events-none"
            />
          )}

          {/* Central Tag */}
          {!isOpen && (
            <div className="relative z-10 px-2.5 py-1 rounded-md bg-stone-900/80 border border-amber-400/50 text-[10px] text-amber-200 font-medium">
              Abrir 🎁
            </div>
          )}
        </div>
      </div>

      {/* Unboxed Secret Voucher Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            className="w-full max-w-sm mt-3 p-4 rounded-xl bg-gradient-to-br from-amber-950/80 via-stone-900/90 to-rose-950/80 border border-amber-400/40 text-center shadow-xl"
          >
            <div className="text-3xl mb-1">{gift.emoji || '🎁'}</div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300">
              Sorpresa Especial de {senderName}
            </span>
            <h5 className="text-base font-bold text-white mt-0.5">{gift.title}</h5>
            <p className="text-xs text-stone-300 mt-1 leading-relaxed">{gift.description}</p>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-center gap-2">
              <button
                onClick={handleCopyVoucher}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/30 text-xs font-medium transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <PartyPopper className="w-3.5 h-3.5" />}
                <span>{copied ? '¡Guardado en el portapapeles!' : 'Guardar / Copiar Vale'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
