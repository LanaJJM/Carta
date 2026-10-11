import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Sparkles, RotateCcw } from 'lucide-react';
import { playCandleBlowSound, playTadaSound } from '../utils/audio';
import { fireBirthdayConfetti } from '../utils/confetti';

interface InteractiveCakeProps {
  candlesCount: number;
  recipientName: string;
}

export const InteractiveCake: React.FC<InteractiveCakeProps> = ({ candlesCount, recipientName }) => {
  const [areLit, setAreLit] = useState(true);
  const [wished, setWished] = useState(false);

  // We display up to 7 visual candles for optimal aesthetic balance
  const displayCandles = Math.min(Math.max(candlesCount > 0 ? (candlesCount <= 7 ? candlesCount : 5) : 3, 1), 7);

  const handleBlowCandles = () => {
    if (!areLit) return;
    playCandleBlowSound();
    setAreLit(false);
    setWished(true);

    setTimeout(() => {
      playTadaSound();
      fireBirthdayConfetti();
    }, 400);
  };

  const handleRelight = () => {
    setAreLit(true);
    setWished(false);
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-6 my-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
      {/* Title & Prompt */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold tracking-wide uppercase text-amber-300 flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-400" />
          Momento del Deseo de Cumpleaños
        </h4>
        <p className="text-xs text-slate-300 mt-1 max-w-sm">
          {areLit
            ? `Cierra los ojos, pide un deseo sincero para este año y sopla las velitas de ${recipientName}.`
            : '¡Tu deseo ha sido enviado al universo con todo el cariño! ✨'}
        </p>
      </div>

      {/* The Cake & Candles Graphic */}
      <div
        onClick={areLit ? handleBlowCandles : undefined}
        className={`relative flex flex-col items-center cursor-pointer select-none transition-transform duration-200 active:scale-95 ${
          areLit ? 'hover:scale-[1.02]' : ''
        }`}
        title={areLit ? '¡Haz clic para soplar las velas!' : 'Velas sopladas'}
      >
        {/* Row of Candles */}
        <div className="flex items-end justify-center gap-3 md:gap-4 mb-[-2px] z-20">
          {Array.from({ length: displayCandles }).map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              {/* Flame or Smoke */}
              <div className="h-8 flex items-center justify-center">
                <AnimatePresence>
                  {areLit ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0, opacity: 0, y: -10 }}
                      className="relative flex items-center justify-center"
                    >
                      {/* Outer Glow */}
                      <div className="absolute w-6 h-6 rounded-full bg-amber-400/40 blur-md pointer-events-none" />
                      {/* Flame Core */}
                      <div className="w-3.5 h-6 rounded-t-full rounded-b-md bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 animate-flicker shadow-lg shadow-amber-400/80" />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0.8, y: 0, scale: 0.8 }}
                      animate={{ opacity: 0, y: -24, scale: 1.6 }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                      className="w-2.5 h-2.5 rounded-full bg-slate-400/60 blur-[1px]"
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Candle Body with striped wax pattern */}
              <div
                className="w-3 md:w-3.5 h-10 md:h-12 rounded-t-sm shadow-md"
                style={{
                  background:
                    i % 2 === 0
                      ? 'repeating-linear-gradient(45deg, #f43f5e, #f43f5e 4px, #ffffff 4px, #ffffff 8px)'
                      : 'repeating-linear-gradient(45deg, #0ea5e9, #0ea5e9 4px, #ffffff 4px, #ffffff 8px)',
                }}
              />
            </div>
          ))}
        </div>

        {/* Cake Layer 1 (Top Frosting with Drips) */}
        <div className="relative w-44 md:w-56 h-12 bg-gradient-to-r from-pink-400 via-rose-300 to-pink-400 rounded-t-2xl shadow-inner border-t-2 border-pink-200 flex items-center justify-center z-10">
          <div className="absolute top-2 w-full flex justify-around px-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <span key={idx} className="w-2 h-2 rounded-full bg-white/70 shadow-sm" />
            ))}
          </div>
          <span className="text-[11px] font-bold tracking-wider text-rose-900/80 uppercase">
            {candlesCount > 0 ? `${candlesCount} Años de Luz` : 'Felicidades'}
          </span>
        </div>

        {/* Cake Layer 2 (Middle Sponge) */}
        <div className="w-52 md:w-64 h-14 bg-gradient-to-r from-amber-200 via-orange-100 to-amber-200 border-t border-amber-300/60 shadow-md flex items-center justify-center relative">
          {/* Decorative piped cream swirls */}
          <div className="flex gap-2">
            {Array.from({ length: 7 }).map((_, idx) => (
              <div key={idx} className="w-4 h-4 rounded-full bg-rose-200/80 border border-rose-300/50 shadow-sm" />
            ))}
          </div>
        </div>

        {/* Cake Base Plate / Stand */}
        <div className="w-60 md:w-72 h-4 bg-gradient-to-r from-stone-200 via-white to-stone-200 rounded-full shadow-xl border-t border-white" />
      </div>

      {/* Action CTA Button */}
      <div className="mt-5 flex items-center gap-3">
        {areLit ? (
          <button
            onClick={handleBlowCandles}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-medium text-xs md:text-sm shadow-lg shadow-rose-500/25 active:scale-95 transition-all"
          >
            <Flame className="w-4 h-4 text-yellow-200 animate-bounce" />
            <span>¡Soplar las Velas! (Clic aquí)</span>
          </button>
        ) : (
          <button
            onClick={handleRelight}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-medium border border-white/15 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Volver a encender</span>
          </button>
        )}
      </div>

      {/* Post-blow congratulations message */}
      <AnimatePresence>
        {wished && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-xs font-medium text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-3.5 py-1.5 rounded-lg"
          >
            🎉 ¡Deseo concedido! ¡Que cada velita soplada sea un sueño cumplido!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
