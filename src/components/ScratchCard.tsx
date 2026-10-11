import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Sparkles, Trophy, CheckCircle2 } from 'lucide-react';
import { ScratchCardData } from '../types/card';
import { playChimeSound } from '../utils/audio';
import { fireStars } from '../utils/confetti';

interface ScratchCardProps {
  data: ScratchCardData;
}

export const ScratchCard: React.FC<ScratchCardProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [percentScratched, setPercentScratched] = useState(0);
  const isDrawingRef = useRef(false);

  // Initialize canvas scratch surface
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.offsetWidth || 340;
    const height = canvas.offsetHeight || 130;
    canvas.width = width;
    canvas.height = height;

    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';

    // Draw luxurious silver/gold foil gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#d1d5db');
    grad.addColorStop(0.3, '#f3f4f6');
    grad.addColorStop(0.5, '#9ca3af');
    grad.addColorStop(0.7, '#e5e7eb');
    grad.addColorStop(1, '#9ca3af');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Decorative foil pattern lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1.5;
    for (let x = -width; x < width * 2; x += 18) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + height, height);
      ctx.stroke();
    }

    // Centered label text
    ctx.fillStyle = '#374151';
    ctx.font = 'bold 14px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ Rasca aquí con tu dedo o ratón ✨', width / 2, height / 2 - 8);

    ctx.fillStyle = '#6b7280';
    ctx.font = '11px Outfit, sans-serif';
    ctx.fillText('¡Descubre tu mensaje secreto oculto!', width / 2, height / 2 + 14);

    setIsRevealed(false);
    setPercentScratched(0);
  }, []);

  useEffect(() => {
    initCanvas();
    const handleResize = () => initCanvas();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initCanvas]);

  const scratch = (clientX: number, clientY: number) => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    checkScratchProgress();
  };

  const checkScratchProgress = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      let transparentPixels = 0;
      const totalPixels = data.length / 4;

      // Sample every 4th pixel for high performance
      for (let i = 3; i < data.length; i += 16) {
        if (data[i] === 0) {
          transparentPixels++;
        }
      }

      const percent = Math.round((transparentPixels / (totalPixels / 4)) * 100);
      setPercentScratched(percent);

      if (percent > 42 && !isRevealed) {
        setIsRevealed(true);
        // Clear all remaining foil cleanly
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        playChimeSound();
        fireStars();
      }
    } catch {}
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDrawingRef.current = true;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawingRef.current) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    isDrawingRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDrawingRef.current = true;
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDrawingRef.current) return;
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    isDrawingRef.current = false;
  };

  return (
    <div className="relative my-6 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col items-center text-center">
      <div className="mb-3">
        <h4 className="text-sm font-semibold tracking-wide uppercase text-amber-300 flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-400" />
          {data.title || 'Tarjeta Rasca y Gana'}
        </h4>
        <p className="text-xs text-slate-300 mt-0.5">
          {isRevealed
            ? '¡Has revelado el mensaje secreto con éxito!'
            : 'Desliza tu dedo o ratón sobre la zona plateada para raspar.'}
        </p>
      </div>

      {/* The Interactive Scratch Container */}
      <div
        ref={containerRef}
        className="relative w-full max-w-sm h-32 md:h-36 rounded-xl overflow-hidden border-2 border-amber-300/40 shadow-xl select-none"
      >
        {/* Hidden Content underneath the canvas foil */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950 via-slate-900 to-rose-950 flex flex-col items-center justify-center p-4 text-center">
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5 text-amber-300" />
            ¡Mensaje Secreto Desbloqueado!
          </div>
          <p className="text-sm md:text-base font-bold text-white font-serif-display leading-snug">
            "{data.hiddenMessage}"
          </p>
        </div>

        {/* The Scratchable Canvas Layer */}
        {!isRevealed && (
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="absolute inset-0 w-full h-full cursor-crosshair touch-none z-10"
          />
        )}
      </div>

      {/* Progress / Status hint */}
      <div className="mt-3 flex items-center justify-between w-full max-w-sm px-1 text-[11px] text-slate-400">
        <span>Progreso de raspado:</span>
        <span className="font-semibold text-amber-300 flex items-center gap-1">
          {isRevealed ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              100% Revelado
            </>
          ) : (
            `${percentScratched}%`
          )}
        </span>
      </div>
    </div>
  );
};
