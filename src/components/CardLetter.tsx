import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Share2, Edit3, Mail, MessageCircle, Quote } from 'lucide-react';
import { VirtualCardData } from '../types/card';
import { THEME_CONFIGS } from './ThemeStyles';
import { InteractiveCake } from './InteractiveCake';
import { MysteryGiftBox } from './MysteryGiftBox';
import { ScratchCard } from './ScratchCard';
import { BalloonPopGame } from './BalloonPopGame';
import { fireHearts, fireBirthdayConfetti } from '../utils/confetti';
import { playChimeSound } from '../utils/audio';

interface CardLetterProps {
  card: VirtualCardData;
  onReclose: () => void;
  onEdit: () => void;
  onShare: () => void;
}

export const CardLetter: React.FC<CardLetterProps> = ({ card, onReclose, onEdit, onShare }) => {
  const [reactions, setReactions] = useState<{ [key: string]: number }>({
    '💖': 1,
    '🎂': 0,
    '🥳': 0,
    '😭': 0,
    '🥂': 0,
  });
  const [thankYouOpen, setThankYouOpen] = useState(false);
  const [thankYouMessage, setThankYouMessage] = useState(
    `¡Muchísimas gracias por esta carta tan hermosa y especial! 💖 Me encantó cada sorpresa y me alegró el corazón.`
  );

  const theme = THEME_CONFIGS[card.theme] || THEME_CONFIGS.golden_rose;

  const handleReaction = (emoji: string) => {
    setReactions((prev) => ({ ...prev, [emoji]: (prev[emoji] || 0) + 1 }));
    playChimeSound();
    if (emoji === '💖' || emoji === '😭') {
      fireHearts();
    } else {
      fireBirthdayConfetti();
    }
  };

  const handleSendWhatsAppThanks = () => {
    const text = encodeURIComponent(
      `¡Hola ${card.senderName}! Acabo de ver la carta virtual que me preparaste: "${thankYouMessage}" 🎁✨`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-3xl mx-auto my-6 px-4"
    >
      {/* Top Floating Actions Strip */}
      <div className="flex items-center justify-between mb-4 px-2 text-xs">
        <button
          onClick={onReclose}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15 transition-colors"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Volver al sobre</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onEdit}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5 text-amber-300" />
            <span>Editar / Personalizar</span>
          </button>
          <button
            onClick={onShare}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 text-white font-medium shadow-md shadow-rose-500/20 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Enviar Sorpresa</span>
          </button>
        </div>
      </div>

      {/* The Stationery Paper Sheet */}
      <div
        className={`relative rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl border ${theme.cardBg} ${theme.cardBorder}`}
        style={{
          boxShadow: '0 30px 60px -15px rgba(0,0,0,0.4), 0 0 40px rgba(251, 191, 36, 0.08)',
        }}
      >
        {/* Decorative Vintage Paper Watermark & Header Edge */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-stone-300/50">
          <div>
            <span className="text-[11px] uppercase tracking-widest font-semibold opacity-70">
              Para: {card.recipientName || 'Una persona especial'}
            </span>
            <div className="text-xs opacity-60 font-mono mt-0.5">
              {card.dateText || '11 de octubre de 2026'}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-serif-display font-semibold tracking-wider text-rose-600/80 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              {card.occasion === 'birthday' && '🎂 Cumpleaños'}
              {card.occasion === 'anniversary' && '💖 Aniversario'}
              {card.occasion === 'love' && '💌 Amor Infinito'}
              {card.occasion === 'friendship' && '🌟 Amistad'}
              {card.occasion === 'congrats' && '🎓 ¡Felicidades!'}
              {card.occasion === 'special' && '✨ Sorpresa'}
            </span>
          </div>
        </div>

        {/* Title Headline */}
        <div className="text-center my-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif-display font-bold tracking-tight text-stone-900 leading-tight">
            {card.title}
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-rose-400 mx-auto mt-4 rounded-full" />
        </div>

        {/* Letter Text Content */}
        <div className="my-8 space-y-4 text-stone-800 text-base md:text-lg leading-relaxed whitespace-pre-line font-normal">
          {card.message}
        </div>

        {/* Optional Quote Callout */}
        {card.quote && (
          <div className="my-8 p-5 rounded-2xl bg-amber-500/10 border border-amber-300/40 text-center relative">
            <Quote className="w-5 h-5 text-amber-500 mx-auto mb-2 opacity-60" />
            <p className="font-serif-display italic text-stone-800 text-sm sm:text-base leading-snug">
              {card.quote}
            </p>
          </div>
        )}

        {/* Interactive Surprises Section */}
        <div className="my-10 pt-8 border-t border-stone-300/50">
          <div className="text-center mb-6">
            <span className="text-[11px] font-bold uppercase tracking-widest text-rose-600 block mb-1">
              Sorpresas Animadas Interactivas
            </span>
            <h3 className="text-xl md:text-2xl font-serif-display font-bold text-stone-900">
              Desbloquea tus regalos especiales
            </h3>
          </div>

          {/* 1. Birthday Cake if enabled or birthday occasion */}
          {(card.hasCake || card.occasion === 'birthday') && (
            <InteractiveCake
              candlesCount={card.candlesCount || 1}
              recipientName={card.recipientName}
            />
          )}

          {/* 2. Mystery Gift Box */}
          {card.surpriseGift && card.surpriseGift.title && (
            <MysteryGiftBox
              gift={card.surpriseGift}
              senderName={card.senderName}
            />
          )}

          {/* 3. Scratch Card */}
          {card.scratchCard && card.scratchCard.enabled && (
            <ScratchCard data={card.scratchCard} />
          )}

          {/* 4. Balloon Pop Game */}
          {card.balloons && card.balloons.length > 0 && (
            <BalloonPopGame initialBalloons={card.balloons} />
          )}

          {/* 5. Memories Photo Gallery if any */}
          {card.photos && card.photos.length > 0 && (
            <div className="my-8 p-6 rounded-2xl bg-white/60 border border-stone-200">
              <h4 className="text-sm font-semibold tracking-wide uppercase text-stone-700 text-center mb-4 flex items-center justify-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Álbum de Recuerdos Inolvidables
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {card.photos.map((photo, i) => (
                  <div
                    key={photo.id || i}
                    className="p-3 bg-white rounded-xl shadow-md border border-stone-200 flex flex-col items-center rotate-[-1deg] hover:rotate-0 transition-transform"
                  >
                    <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-stone-100 mb-2">
                      <img
                        src={photo.url}
                        alt={photo.caption || 'Recuerdo'}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    {photo.caption && (
                      <p className="font-handwriting text-base font-bold text-stone-800 text-center">
                        {photo.caption}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sender Sign-off & Signature */}
        <div className="mt-10 pt-6 border-t border-stone-300/50 flex flex-col items-end">
          <span className="text-xs uppercase tracking-widest text-stone-600 font-medium">
            Con todo el amor del mundo,
          </span>
          <h4 className="text-2xl md:text-3xl font-handwriting font-bold text-rose-600 mt-1">
            {card.senderName || 'Tu amigo/a que te quiere'}
          </h4>
        </div>

        {/* Interactive Reaction Bar */}
        <div className="mt-10 p-4 rounded-2xl bg-stone-100/80 border border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-stone-600 mr-1">Reaccionar:</span>
            {Object.keys(reactions).map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleReaction(emoji)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 shadow-xs text-sm active:scale-90 transition-transform"
                title={`Reaccionar con ${emoji}`}
              >
                <span>{emoji}</span>
                <span className="text-[11px] font-semibold text-stone-600">
                  {reactions[emoji]}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setThankYouOpen(!thankYouOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium shadow-sm transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Responder a {card.senderName || 'quien te la envió'}</span>
          </button>
        </div>

        {/* Thank You Form Accordion */}
        <AnimatePresence>
          {thankYouOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 rounded-xl bg-white border border-stone-200 text-left"
            >
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Escribe unas palabras de agradecimiento:
              </label>
              <textarea
                value={thankYouMessage}
                onChange={(e) => setThankYouMessage(e.target.value)}
                rows={2}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <div className="mt-2 flex justify-end">
                <button
                  onClick={handleSendWhatsAppThanks}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Enviar por WhatsApp</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
