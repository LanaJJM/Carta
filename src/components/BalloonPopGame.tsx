import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RotateCcw } from 'lucide-react';
import { BalloonItem } from '../types/card';
import { playPopSound } from '../utils/audio';

interface BalloonPopGameProps {
  initialBalloons: BalloonItem[];
}

export const BalloonPopGame: React.FC<BalloonPopGameProps> = ({ initialBalloons }) => {
  const [balloons, setBalloons] = useState<BalloonItem[]>(initialBalloons);

  const handlePop = (id: number) => {
    playPopSound();
    setBalloons((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );
  };

  const handleReset = () => {
    setBalloons((prev) => prev.map((b) => ({ ...b, popped: false })));
  };

  const allPopped = balloons.length > 0 && balloons.every((b) => b.popped);

  return (
    <div className="relative my-6 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col items-center text-center">
      <div className="mb-4">
        <h4 className="text-sm font-semibold tracking-wide uppercase text-sky-300 flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4 text-sky-400" />
          Globos Mágicos con Deseos
        </h4>
        <p className="text-xs text-slate-300 mt-0.5">
          Revienta cada globo para descubrir un mensaje especial oculto en su interior.
        </p>
      </div>

      {/* Balloons Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-md my-2">
        {balloons.map((b, index) => (
          <div key={b.id} className="flex flex-col items-center">
            <AnimatePresence mode="wait">
              {!b.popped ? (
                <motion.div
                  key="unpopped"
                  onClick={() => handlePop(b.id)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.9 }}
                  className="cursor-pointer flex flex-col items-center select-none"
                  style={{ animation: `floatGentle ${3.5 + index * 0.4}s ease-in-out infinite` }}
                >
                  {/* Balloon Oval */}
                  <div
                    className="relative w-16 h-20 rounded-full shadow-lg flex items-center justify-center border-t border-white/40"
                    style={{
                      background: `radial-gradient(circle at 35% 30%, #ffffff 0%, ${b.color} 55%, #000000 120%)`,
                    }}
                  >
                    {/* Highlight Specular */}
                    <div className="absolute top-3 left-3 w-3 h-5 rounded-full bg-white/50 -rotate-25 blur-[1px]" />
                    <span className="text-[10px] font-bold text-white/90 drop-shadow">Tócame</span>
                  </div>

                  {/* Knot & String */}
                  <div
                    className="w-2 h-1.5 -mt-0.5 rounded-b-sm shadow-sm"
                    style={{ backgroundColor: b.color }}
                  />
                  <div className="w-[1.5px] h-10 bg-slate-400/50 shadow-sm" />
                </motion.div>
              ) : (
                <motion.div
                  key="popped"
                  initial={{ opacity: 0, scale: 0.7, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="w-full min-h-[96px] p-2.5 rounded-xl bg-white/10 border border-white/20 text-center flex flex-col items-center justify-center shadow-md"
                >
                  <span className="text-base mb-1">🎈✨</span>
                  <p className="text-[11px] font-medium text-slate-100 leading-tight">
                    {b.message}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Reset button if all popped */}
      {allPopped && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4"
        >
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-medium border border-white/15 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Inflar globos de nuevo</span>
          </button>
        </motion.div>
      )}
    </div>
  );
};
