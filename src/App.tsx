import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Volume2,
  VolumeX,
  Edit3,
  Share2,
  Mail,
  RotateCcw,
  PlusCircle,
  HelpCircle,
} from 'lucide-react';
import { VirtualCardData } from './types/card';
import {
  getActiveCard,
  saveCardToStorage,
  DEFAULT_BIRTHDAY_CARD,
  TEMPLATE_ANNIVERSARY,
  TEMPLATE_CONGRATS,
  decodeCardFromHash,
} from './utils/cardStorage';
import { THEME_CONFIGS } from './components/ThemeStyles';
import { EnvelopeView } from './components/EnvelopeView';
import { CardLetter } from './components/CardLetter';
import { CardEditorModal } from './components/CardEditorModal';
import { ShareModal } from './components/ShareModal';
import { getAudioMuted, setAudioMuted, stopCurrentMelody } from './utils/audio';

export default function App() {
  const [card, setCard] = useState<VirtualCardData>(() => getActiveCard());
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(() => getAudioMuted());
  const [guideOpen, setGuideOpen] = useState(false);

  // Listen to hash change if recipient loads a different link
  useEffect(() => {
    const handleHashChange = () => {
      const decoded = decodeCardFromHash();
      if (decoded) {
        if (!decoded.dateText) decoded.dateText = '11 de octubre de 2026';
        setCard(decoded);
        setIsLetterOpen(false); // Let recipient enjoy opening the envelope
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Ensure card has 11 de octubre de 2026 if not explicitly set
  useEffect(() => {
    if (!card.dateText) {
      setCard((prev) => ({ ...prev, dateText: '11 de octubre de 2026' }));
    }
  }, [card.dateText]);

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    setAudioMuted(nextMuted);
  };

  const handleSaveCard = (updatedCard: VirtualCardData) => {
    setCard(updatedCard);
    saveCardToStorage(updatedCard);
  };

  const handleLoadTemplate = (template: VirtualCardData) => {
    const updated = {
      ...template,
      id: `card-${Date.now()}`,
    };
    setCard(updated);
    saveCardToStorage(updated);
    setIsLetterOpen(false);
  };

  const themeConfig = THEME_CONFIGS[card.theme] || THEME_CONFIGS.golden_rose;

  return (
    <div className={`relative min-h-screen text-slate-100 flex flex-col overflow-x-hidden bg-gradient-to-br ${themeConfig.bgClass}`}>
      {/* High-fidelity contextual backdrop image if present with measured contrast scrim */}
      {themeConfig.backdropImage && (
        <div className="fixed inset-0 pointer-events-none z-0">
          <img
            src={themeConfig.backdropImage}
            alt="Backdrop visual"
            className="w-full h-full object-cover opacity-25 filter blur-[2px]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[1px]" />
        </div>
      )}

      {/* Floating Ambient Starlight / Bokeh particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/6 w-72 h-72 rounded-full bg-rose-500/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/6 w-80 h-80 rounded-full bg-amber-400/10 blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Strict One-Row Three-Zone Top Navigation Bar */}
      <header className="relative z-30 w-full border-b border-white/10 bg-slate-950/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (One element, no pills or subtitles) */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setIsLetterOpen(false);
            }}
            className="text-xl font-bold tracking-tight text-white font-serif-display whitespace-nowrap shrink-0 flex items-center gap-2 group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">💌</span>
            <span className="bg-gradient-to-r from-amber-200 via-rose-300 to-amber-100 bg-clip-text text-transparent">
              Festeja
            </span>
          </a>

          {/* Zone 2: Concise Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
            <button
              onClick={() => setIsLetterOpen(false)}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                !isLetterOpen ? 'text-amber-300 font-semibold' : ''
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Sobre Postal</span>
            </button>
            <button
              onClick={() => setIsLetterOpen(true)}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                isLetterOpen ? 'text-rose-300 font-semibold' : ''
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ver Carta & Sorpresas</span>
            </button>
            <button
              onClick={() => setIsEditorOpen(true)}
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5 text-amber-300" />
              <span>Personalizar Mensaje</span>
            </button>
            <button
              onClick={() => setGuideOpen(!guideOpen)}
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 text-slate-400"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>¿Cómo funciona?</span>
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action CTA + Audio Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Audio Toggle */}
            <button
              onClick={handleToggleMute}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors"
              title={isMuted ? 'Activar sonido' : 'Silenciar sonido'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
            </button>

            {/* Primary Action */}
            <button
              onClick={() => setIsShareOpen(true)}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 rounded-xl shadow-lg shadow-rose-500/20 active:scale-95 transition-all whitespace-nowrap shrink-0"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Enviar Carta</span>
            </button>
          </div>
        </div>
      </header>

      {/* Helpful Quick Guide Bar (Toggleable) */}
      {guideOpen && (
        <div className="relative z-20 bg-slate-900/90 border-b border-amber-500/30 px-4 py-3 text-xs text-slate-200">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <p className="font-semibold text-amber-300">
                ✨ ¡Crea un momento mágico e inolvidable!
              </p>
              <p className="text-[11px] text-slate-300 mt-0.5">
                1. Personaliza el nombre y mensaje · 2. Configura la tarta con velas para soplar, la caja regalo o el rasca y gana · 3. Copia el enlace y envíaselo por WhatsApp.
              </p>
            </div>
            <button
              onClick={() => setGuideOpen(false)}
              className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px]"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* Secondary Quick Action Bar for Easy Exploration */}
      <div className="relative z-20 max-w-4xl mx-auto w-full px-4 pt-4 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 text-[11px]">
          <span className="text-slate-400 font-medium mr-1">Plantillas rápidas:</span>
          <button
            onClick={() => handleLoadTemplate(DEFAULT_BIRTHDAY_CARD)}
            className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-colors"
          >
            🎂 Cumpleaños
          </button>
          <button
            onClick={() => handleLoadTemplate(TEMPLATE_ANNIVERSARY)}
            className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-colors"
          >
            💖 Aniversario
          </button>
          <button
            onClick={() => handleLoadTemplate(TEMPLATE_CONGRATS)}
            className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-colors"
          >
            🎓 Logro & Felicitaciones
          </button>
        </div>

        <button
          onClick={() => setIsEditorOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/30 font-medium transition-colors"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Crear mi propia carta</span>
        </button>
      </div>

      {/* Main Interactive Stage */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-3 sm:p-6 md:p-8">
        {!isLetterOpen ? (
          <EnvelopeView
            card={card}
            onLetterOpened={() => setIsLetterOpen(true)}
          />
        ) : (
          <CardLetter
            card={card}
            onReclose={() => {
              stopCurrentMelody();
              setIsLetterOpen(false);
            }}
            onEdit={() => setIsEditorOpen(true)}
            onShare={() => setIsShareOpen(true)}
          />
        )}
      </main>

      {/* Quiet Footer */}
      <footer className="relative z-20 border-t border-white/10 bg-slate-950/60 py-4 px-4 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Festeja · Cartas virtuales interactivas y sorpresas animadas
          </span>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Sopla velas</span>
            <span>·</span>
            <span>Abre regalos</span>
            <span>·</span>
            <span>Rasca y gana</span>
            <span>·</span>
            <span>Revienta globos</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <CardEditorModal
        initialCard={card}
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleSaveCard}
      />

      <ShareModal
        card={card}
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />
    </div>
  );
}
