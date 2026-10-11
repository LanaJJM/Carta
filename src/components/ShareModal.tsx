import React, { useState } from 'react';
import { X, Copy, Check, MessageCircle, ExternalLink, QrCode } from 'lucide-react';
import { VirtualCardData } from '../types/card';
import { encodeCardToHash } from '../utils/cardStorage';

interface ShareModalProps {
  card: VirtualCardData;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ card, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  if (!isOpen) return null;

  // Build the complete share URL with the serialized hash
  const hashPart = encodeCardToHash(card);
  const baseUrl = typeof window !== 'undefined' ? window.location.href.split('#')[0] : '';
  const shareUrl = `${baseUrl}${hashPart}`;

  const messageText = `¡Hola ${card.recipientName || ''}! 🎁✨ Te he preparado una sorpresa interactiva muy especial con todo mi cariño. Toca el enlace para abrir tu sobre y descubrir tus regalos: ${shareUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleWhatsAppShare = () => {
    const encoded = encodeURIComponent(messageText);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  // Safe QR code image generator using google charts api / standard qr renderer url
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    shareUrl
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 text-slate-200">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xl">💌</span>
            <h3 className="text-base font-semibold text-white">
              Enviar Carta a {card.recipientName || 'tu persona favorita'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          Tu carta virtual y todas sus sorpresas animadas están empaquetadas en este enlace. Al abrirlo, el destinatario verá el sobre con sello de lacre personalizado y vivirá la experiencia interactiva sin necesidad de registrarse.
        </p>

        {/* WhatsApp Direct Share Button */}
        <div className="mb-4">
          <button
            onClick={handleWhatsAppShare}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-emerald-600/20 active:scale-98 transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Enviar directamente por WhatsApp</span>
          </button>
        </div>

        {/* Direct Link Input & Copy */}
        <div className="mb-4">
          <label className="block text-[11px] font-semibold text-slate-400 mb-1">
            Enlace directo para compartir:
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-300 select-all truncate font-mono"
            />
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium transition-colors shrink-0"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? '¡Copiado!' : 'Copiar'}</span>
            </button>
          </div>
        </div>

        {/* QR Code Toggle */}
        <div className="pt-2 border-t border-slate-800">
          <button
            onClick={() => setShowQr(!showQr)}
            className="flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 font-medium transition-colors"
          >
            <QrCode className="w-4 h-4" />
            <span>{showQr ? 'Ocultar código QR' : 'Mostrar código QR para escanear en móvil'}</span>
          </button>

          {showQr && (
            <div className="mt-3 flex flex-col items-center justify-center p-4 bg-white rounded-xl">
              <img
                src={qrUrl}
                alt="QR Code Carta"
                className="w-40 h-40 object-contain"
                referrerPolicy="no-referrer"
              />
              <span className="text-[11px] text-slate-600 mt-2 font-sans font-medium">
                Escanea con la cámara para abrir la carta en tu móvil
              </span>
            </div>
          )}
        </div>

        {/* Preview link test */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
