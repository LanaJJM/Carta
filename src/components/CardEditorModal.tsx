import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Cake,
  Gift,
  Smile,
  Music,
  Palette,
  FileText,
  Plus,
  Trash2,
  Check,
} from 'lucide-react';
import {
  VirtualCardData,
  OccasionType,
  CardTheme,
  SealSymbol,
  MelodicTrack,
} from '../types/card';
import { THEME_CONFIGS } from './ThemeStyles';
import {
  DEFAULT_BIRTHDAY_CARD,
  TEMPLATE_ANNIVERSARY,
  TEMPLATE_CONGRATS,
} from '../utils/cardStorage';

interface CardEditorModalProps {
  initialCard: VirtualCardData;
  isOpen: boolean;
  onClose: () => void;
  onSave: (card: VirtualCardData) => void;
}

export const CardEditorModal: React.FC<CardEditorModalProps> = ({
  initialCard,
  isOpen,
  onClose,
  onSave,
}) => {
  const [card, setCard] = useState<VirtualCardData>({ ...initialCard });
  const [activeTab, setActiveTab] = useState<'content' | 'surprises' | 'style'>(
    'content'
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleApplyPreset = (preset: VirtualCardData) => {
    setCard({
      ...preset,
      id: card.id || `card-${Date.now()}`,
    });
  };

  const handleAddBalloon = () => {
    if (card.balloons.length >= 6) return;
    const colors = ['#f43f5e', '#8b5cf6', '#06b6d4', '#eab308', '#10b981', '#ec4899'];
    const newBalloon = {
      id: Date.now(),
      color: colors[card.balloons.length % colors.length],
      message: '¡Que todos tus deseos se hagan realidad!',
      popped: false,
    };
    setCard({ ...card, balloons: [...card.balloons, newBalloon] });
  };

  const handleRemoveBalloon = (id: number) => {
    setCard({ ...card, balloons: card.balloons.filter((b) => b.id !== id) });
  };

  const handleAddPhoto = () => {
    const defaultSample =
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80';
    const newPhoto = {
      id: `photo-${Date.now()}`,
      url: defaultSample,
      caption: 'Un recuerdo maravilloso juntos ✨',
    };
    setCard({ ...card, photos: [...(card.photos || []), newPhoto] });
  };

  const handleRemovePhoto = (id: string) => {
    setCard({ ...card, photos: card.photos.filter((p) => p.id !== id) });
  };

  const handleSave = () => {
    onSave(card);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-rose-400" />
            <h3 className="text-base font-semibold text-white">
              Personalizar Carta & Sorpresas
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-900/80 px-4 pt-2 gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('content')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-colors ${
              activeTab === 'content'
                ? 'border-rose-500 text-rose-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>1. Mensaje & Nombres</span>
          </button>
          <button
            onClick={() => setActiveTab('surprises')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-colors ${
              activeTab === 'surprises'
                ? 'border-rose-500 text-rose-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Gift className="w-3.5 h-3.5" />
            <span>2. Sorpresas Animadas</span>
          </button>
          <button
            onClick={() => setActiveTab('style')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-colors ${
              activeTab === 'style'
                ? 'border-rose-500 text-rose-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>3. Tema & Melodía</span>
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs text-slate-200 flex-1">
          {/* TAB 1: CONTENT */}
          {activeTab === 'content' && (
            <div className="space-y-4">
              {/* Presets quick loader */}
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="text-[11px] font-semibold text-slate-300 block mb-2">
                  Cargar plantilla rápida de inspiración:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleApplyPreset(DEFAULT_BIRTHDAY_CARD)}
                    className="px-2.5 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium transition-colors"
                  >
                    🎂 Cumpleaños Mágico
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApplyPreset(TEMPLATE_ANNIVERSARY)}
                    className="px-2.5 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium transition-colors"
                  >
                    💖 Aniversario Romántico
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApplyPreset(TEMPLATE_CONGRATS)}
                    className="px-2.5 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium transition-colors"
                  >
                    🎓 Gran Logro / Felicidades
                  </button>
                </div>
              </div>

              {/* Names row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    ¿Para quién es la carta? (Destinatario)
                  </label>
                  <input
                    type="text"
                    value={card.recipientName}
                    onChange={(e) => setCard({ ...card, recipientName: e.target.value })}
                    placeholder="Ej. Valentina, Mateo, Mamá..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    ¿De parte de quién? (Remitente)
                  </label>
                  <input
                    type="text"
                    value={card.senderName}
                    onChange={(e) => setCard({ ...card, senderName: e.target.value })}
                    placeholder="Ej. Sofía con mucho amor, Tu mejor amigo..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                </div>
              </div>

              {/* Celebration Date Row */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Fecha que aparece bajo el nombre en la carta:
                </label>
                <input
                  type="text"
                  value={card.dateText ?? '11 de octubre de 2026'}
                  onChange={(e) => setCard({ ...card, dateText: e.target.value })}
                  placeholder="11 de octubre de 2026"
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-rose-500 font-mono text-xs"
                />
              </div>

              {/* Occasion Selection */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Ocasión o Motivo:
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                  {(
                    [
                      { id: 'birthday', label: '🎂 Cumpleaños' },
                      { id: 'anniversary', label: '💖 Aniversario' },
                      { id: 'love', label: '💌 Amor' },
                      { id: 'friendship', label: '🌟 Amistad' },
                      { id: 'congrats', label: '🎓 Logro' },
                      { id: 'special', label: '✨ Sorpresa' },
                    ] as { id: OccasionType; label: string }[]
                  ).map((occ) => (
                    <button
                      key={occ.id}
                      type="button"
                      onClick={() => setCard({ ...card, occasion: occ.id })}
                      className={`py-1.5 px-2 rounded-lg text-center font-medium transition-all ${
                        card.occasion === occ.id
                          ? 'bg-rose-600 text-white shadow-sm'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {occ.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Título principal de la carta:
                </label>
                <input
                  type="text"
                  value={card.title}
                  onChange={(e) => setCard({ ...card, title: e.target.value })}
                  placeholder="Ej. ¡Feliz Cumpleaños, Valentina! 🎂✨"
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Cuerpo del mensaje (Palabras sinceras y emotivas):
                </label>
                <textarea
                  rows={6}
                  value={card.message}
                  onChange={(e) => setCard({ ...card, message: e.target.value })}
                  placeholder="Escribe todo lo que sientes por esa persona..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-rose-500 leading-relaxed font-sans"
                />
              </div>

              {/* Quote */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Frase o Dedicatoria destacada (Opcional):
                </label>
                <input
                  type="text"
                  value={card.quote || ''}
                  onChange={(e) => setCard({ ...card, quote: e.target.value })}
                  placeholder="Ej. «Que tu día sea tan brillante, dulce y extraordinario como tú.»"
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>
            </div>
          )}

          {/* TAB 2: SURPRISES */}
          {activeTab === 'surprises' && (
            <div className="space-y-5">
              {/* 1. Cake & Candles */}
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cake className="w-4 h-4 text-amber-400" />
                    <span className="font-semibold text-white">
                      Tarta con Velitas Interactivas
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={card.hasCake}
                      onChange={(e) => setCard({ ...card, hasCake: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-rose-600" />
                  </label>
                </div>
                {card.hasCake && (
                  <div className="pt-2 border-t border-slate-700/50">
                    <label className="block text-[11px] text-slate-300 mb-1">
                      Años a cumplir o número de velas (aparecerá en el cartel de la tarta):
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={120}
                      value={card.candlesCount}
                      onChange={(e) =>
                        setCard({ ...card, candlesCount: parseInt(e.target.value) || 1 })
                      }
                      className="w-24 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white"
                    />
                  </div>
                )}
              </div>

              {/* 2. Mystery Gift Box */}
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-3">
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-rose-400" />
                  <span className="font-semibold text-white">
                    Caja de Regalo Sorpresa (Vale o Regalo Secreto)
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] text-slate-300 mb-1">
                      Título del Regalo / Vale:
                    </label>
                    <input
                      type="text"
                      value={card.surpriseGift?.title || ''}
                      onChange={(e) =>
                        setCard({
                          ...card,
                          surpriseGift: { ...card.surpriseGift, title: e.target.value },
                        })
                      }
                      placeholder="Ej. Vale por una cena especial..."
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-300 mb-1">
                      Icono / Emojis:
                    </label>
                    <input
                      type="text"
                      value={card.surpriseGift?.emoji || '🎁'}
                      onChange={(e) =>
                        setCard({
                          ...card,
                          surpriseGift: { ...card.surpriseGift, emoji: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">
                    Descripción o instrucciones de canje:
                  </label>
                  <input
                    type="text"
                    value={card.surpriseGift?.description || ''}
                    onChange={(e) =>
                      setCard({
                        ...card,
                        surpriseGift: { ...card.surpriseGift, description: e.target.value },
                      })
                    }
                    placeholder="Ej. Válido para canjear este fin de semana..."
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>

              {/* 3. Scratch Card */}
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="font-semibold text-white">
                      Tarjeta Rasca y Gana (Mensaje Oculto)
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={card.scratchCard?.enabled ?? true}
                      onChange={(e) =>
                        setCard({
                          ...card,
                          scratchCard: { ...card.scratchCard, enabled: e.target.checked },
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-rose-600" />
                  </label>
                </div>
                {card.scratchCard?.enabled && (
                  <div className="space-y-2 pt-2 border-t border-slate-700/50">
                    <div>
                      <label className="block text-[11px] text-slate-300 mb-1">
                        Mensaje oculto que aparecerá al rascar con el dedo:
                      </label>
                      <input
                        type="text"
                        value={card.scratchCard?.hiddenMessage || ''}
                        onChange={(e) =>
                          setCard({
                            ...card,
                            scratchCard: {
                              ...card.scratchCard,
                              hiddenMessage: e.target.value,
                            },
                          })
                        }
                        placeholder="Ej. ¡Tienes una sorpresa física en tu habitación! 🎁"
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Balloons to pop */}
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smile className="w-4 h-4 text-sky-400" />
                    <span className="font-semibold text-white">
                      Globos Flotantes con Deseos ({card.balloons?.length || 0})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddBalloon}
                    disabled={card.balloons?.length >= 6}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-sky-600/30 text-sky-300 hover:bg-sky-600/50 border border-sky-400/30 text-[11px] font-medium transition-colors disabled:opacity-50"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Añadir Globo</span>
                  </button>
                </div>
                <div className="space-y-2 pt-2">
                  {card.balloons?.map((balloon, index) => (
                    <div key={balloon.id} className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                        style={{ backgroundColor: balloon.color }}
                      />
                      <input
                        type="text"
                        value={balloon.message}
                        onChange={(e) => {
                          const updated = [...card.balloons];
                          updated[index].message = e.target.value;
                          setCard({ ...card, balloons: updated });
                        }}
                        className="flex-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveBalloon(balloon.id)}
                        className="p-1 text-slate-400 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: STYLE & MUSIC */}
          {activeTab === 'style' && (
            <div className="space-y-5">
              {/* Visual Theme Selection */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-2">
                  Tema Visual & Estilo de Papelería:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(Object.keys(THEME_CONFIGS) as CardTheme[]).map((thmKey) => {
                    const theme = THEME_CONFIGS[thmKey];
                    const isSelected = card.theme === thmKey;
                    return (
                      <div
                        key={thmKey}
                        onClick={() => setCard({ ...card, theme: thmKey })}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-rose-500 bg-rose-950/20 shadow-md ring-1 ring-rose-500'
                            : 'border-slate-800 bg-slate-800/40 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-4 h-4 rounded-full border border-white/30"
                            style={{ backgroundColor: theme.waxSealColor }}
                          />
                          <span className="font-medium text-slate-200">
                            {theme.name}
                          </span>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-rose-400" />}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Wax Seal Symbol */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-2">
                  Sello de Lacre en el Sobre:
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {(
                    [
                      { id: 'cake', label: '🎂 Tarta' },
                      { id: 'heart', label: '❤️ Corazón' },
                      { id: 'star', label: '⭐ Estrella' },
                      { id: 'crown', label: '👑 Corona' },
                      { id: 'gift', label: '🎁 Regalo' },
                      { id: 'champagne', label: '🥂 Brindis' },
                      { id: 'sparkle', label: '✨ Magia' },
                    ] as { id: SealSymbol; label: string }[]
                  ).map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setCard({ ...card, sealSymbol: s.id })}
                      className={`p-2 rounded-xl text-center text-xs font-medium transition-colors ${
                        card.sealSymbol === s.id
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Melodic Track */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-2">
                  Acompañamiento Melódico (Web Audio):
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(
                    [
                      { id: 'cumpleanos_feliz', label: '🎵 Cumpleaños Feliz' },
                      { id: 'dulce_vals', label: '🎻 Dulce Vals' },
                      { id: 'celebracion_magica', label: '🎺 Fanfarria' },
                      { id: 'none', label: '🔇 Sin música' },
                    ] as { id: MelodicTrack; label: string }[]
                  ).map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setCard({ ...card, musicTrack: m.id })}
                      className={`p-2.5 rounded-xl text-center text-xs font-medium transition-colors ${
                        card.musicTrack === m.id
                          ? 'bg-amber-600 text-white'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Photos Gallery */}
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="font-semibold text-white">
                      Fotos de Recuerdos ({card.photos?.length || 0})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddPhoto}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-amber-600/30 text-amber-300 hover:bg-amber-600/50 border border-amber-400/30 text-[11px] font-medium transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Añadir Foto</span>
                  </button>
                </div>
                <div className="space-y-2 pt-2">
                  {card.photos?.map((photo) => (
                    <div
                      key={photo.id}
                      className="p-2 rounded-lg bg-slate-900 border border-slate-700 space-y-1.5"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={photo.url}
                          onChange={(e) => {
                            const updated = card.photos.map((p) =>
                              p.id === photo.id ? { ...p, url: e.target.value } : p
                            );
                            setCard({ ...card, photos: updated });
                          }}
                          placeholder="URL de imagen (https://...)"
                          className="flex-1 px-2 py-1 rounded bg-slate-800 text-slate-200 text-xs border border-slate-700"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemovePhoto(photo.id)}
                          className="p-1 text-slate-400 hover:text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={photo.caption}
                        onChange={(e) => {
                          const updated = card.photos.map((p) =>
                            p.id === photo.id ? { ...p, caption: e.target.value } : p
                          );
                          setCard({ ...card, photos: updated });
                        }}
                        placeholder="Pie de foto / dedicatoria..."
                        className="w-full px-2 py-1 rounded bg-slate-800 text-slate-200 text-xs border border-slate-700"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-800 bg-slate-950/80 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-300 hover:bg-slate-800 text-xs font-medium transition-colors"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white text-xs font-semibold shadow-lg shadow-rose-500/20 active:scale-95 transition-all"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>¡Guardado!</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-yellow-200" />
                <span>Guardar y Ver Carta</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
