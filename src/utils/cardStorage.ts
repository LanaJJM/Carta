import { VirtualCardData } from '../types/card';

const STORAGE_KEY = 'festeja_saved_cards_v1';
const ACTIVE_CARD_KEY = 'festeja_active_card_v1';

export const DEFAULT_BIRTHDAY_CARD: VirtualCardData = {
  id: 'cumple-demo-01',
  recipientName: 'Valentina',
  senderName: 'Sofía & Lucas',
  occasion: 'birthday',
  theme: 'golden_rose',
  sealSymbol: 'cake',
  title: '¡Feliz Cumpleaños, Valentina! 🎂✨',
  message: `Hoy celebramos a una de las personas más maravillosas y luminosas de nuestras vidas. 

Gracias por cada risa compartida, por estar siempre en los momentos buenos y en los difíciles, y por llenar el mundo de tanta alegría y magia. Deseamos que este nuevo año de vida venga cargado de sueños cumplidos, viajes inolvidables, salud y todo el amor que te mereces.

¡Prepárate porque hemos preparado varias sorpresitas interactivas para ti aquí abajo! Sopla tus velitas y descubre tu regalo especial.`,
  quote: '«Que tu día sea tan brillante, dulce y extraordinario como tú.»',
  musicTrack: 'cumpleanos_feliz',
  hasCake: true,
  candlesCount: 24,
  surpriseGift: {
    title: '¡Vale por una Cena Especial & Tarde de Cine!',
    description: 'Válido para canjear cuando quieras. Tú eliges el restaurante y nosotros nos encargamos de todo.',
    emoji: '🍕🎬✨',
  },
  scratchCard: {
    enabled: true,
    title: 'Rasca con tu dedo para revelar tu secreto',
    hiddenMessage: '¡Te queremos hasta el infinito! Además tienes un regalo físico esperándote en casa 🎁💖',
  },
  balloons: [
    { id: 1, color: '#f43f5e', message: '¡Que nunca te falte una sonrisa!', popped: false },
    { id: 2, color: '#8b5cf6', message: '¡Éxitos en todos tus nuevos proyectos!', popped: false },
    { id: 3, color: '#06b6d4', message: '¡Salud, paz y abundancia!', popped: false },
    { id: 4, color: '#eab308', message: '¡Momentos mágicos que recordar por siempre!', popped: false },
  ],
  photos: [
    {
      id: 'p1',
      url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80',
      caption: 'Recuerdo de momentos inolvidables ✨',
    },
    {
      id: 'p2',
      url: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=600&q=80',
      caption: '¡Por muchos más años de risas juntos! 🥂',
    },
  ],
  createdAt: '2026-10-11T12:00:00.000Z',
  dateText: '11 de octubre de 2026',
};

export const TEMPLATE_ANNIVERSARY: VirtualCardData = {
  id: 'aniversario-demo-02',
  recipientName: 'Mi Amor',
  senderName: 'Tu compañero/a de vida',
  occasion: 'anniversary',
  theme: 'starlight',
  sealSymbol: 'heart',
  title: 'Feliz Aniversario, Mi Amor 💖🌌',
  message: `Cada día a tu lado es un regalo que agradezco con el corazón. Mirar atrás y ver todo lo que hemos construido juntos me llena de orgullo y emoción.

Gracias por tu ternura, por tu paciencia y por ser mi refugio seguro. No imagino este viaje de la vida con nadie más. ¡Brindemos por nuestro amor hoy y siempre!`,
  quote: '«Si tuviera que elegirte de nuevo, te elegiría mil veces sin dudar.»',
  musicTrack: 'dulce_vals',
  hasCake: false,
  candlesCount: 3,
  surpriseGift: {
    title: 'Escapada de Fin de Semana Romántica',
    description: 'Prepara las maletas: ¡nos vamos a desconectar en una cabaña mágica con chimenea!',
    emoji: '🏕️✨🍷',
  },
  scratchCard: {
    enabled: true,
    title: 'Rasca tu sorpresa de aniversario',
    hiddenMessage: '¡Te amo más de lo que las palabras pueden expresar! Eres mi persona favorita en el universo.',
  },
  balloons: [
    { id: 1, color: '#f43f5e', message: 'Por mil amaneceres más juntos ❤️', popped: false },
    { id: 2, color: '#ec4899', message: 'Gracias por hacerme tan feliz 🌸', popped: false },
    { id: 3, color: '#a855f7', message: 'Nuestro amor sigue creciendo ✨', popped: false },
  ],
  photos: [],
  createdAt: '2026-10-11T12:00:00.000Z',
  dateText: '11 de octubre de 2026',
};

export const TEMPLATE_CONGRATS: VirtualCardData = {
  id: 'congrats-demo-03',
  recipientName: 'Campeón / Campeona',
  senderName: 'Tus amigos y familia',
  occasion: 'congrats',
  theme: 'botanical',
  sealSymbol: 'crown',
  title: '¡Enhorabuena por este Gran Logro! 🎓🌟',
  message: `Sabemos todo el esfuerzo, las horas de dedicación y la constancia que le pusiste para llegar hasta aquí. Hoy ves el fruto de tu talento y trabajo duro.

¡Nos sentimos inmensamente orgullosos de ti! Este es solo el comienzo de una carrera brillante llena de metas alcanzadas.`,
  quote: '«El futuro pertenece a quienes creen en la belleza de sus sueños.»',
  musicTrack: 'celebracion_magica',
  hasCake: false,
  candlesCount: 1,
  surpriseGift: {
    title: '¡Brindis y Celebración Todo Pagado!',
    description: 'Nos vemos este viernes para festejar como te mereces por todo lo alto.',
    emoji: '🥂🎉🏆',
  },
  scratchCard: {
    enabled: true,
    title: 'Rasca para leer tu mensaje secreto',
    hiddenMessage: '¡Eres un crack imparable! Nada te detiene hacia la cima.',
  },
  balloons: [
    { id: 1, color: '#10b981', message: '¡Bravo por tu dedicación! 👏', popped: false },
    { id: 2, color: '#06b6d4', message: '¡Que sigan los éxitos! 🚀', popped: false },
    { id: 3, color: '#f59e0b', message: '¡Orgullo total! 🌟', popped: false },
  ],
  photos: [],
  createdAt: '2026-10-11T12:00:00.000Z',
  dateText: '11 de octubre de 2026',
};

// Encode card safely to URL Hash
export function encodeCardToHash(card: VirtualCardData): string {
  try {
    const jsonStr = JSON.stringify(card);
    // Base64 encoding compatible with UTF-8 unicode
    const utf8Bytes = new TextEncoder().encode(jsonStr);
    let binary = '';
    utf8Bytes.forEach((b) => (binary += String.fromCharCode(b)));
    const base64 = btoa(binary);
    return '#card=' + encodeURIComponent(base64);
  } catch (err) {
    console.error('Error encoding card to URL hash:', err);
    return '';
  }
}

// Decode card from URL hash
export function decodeCardFromHash(hashString?: string): VirtualCardData | null {
  try {
    const rawHash = hashString || (typeof window !== 'undefined' ? window.location.hash : '');
    if (!rawHash || !rawHash.includes('#card=')) return null;

    const base64Part = decodeURIComponent(rawHash.replace(/^#card=/, ''));
    const binary = atob(base64Part);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const jsonStr = new TextDecoder().decode(bytes);
    const parsed = JSON.parse(jsonStr) as VirtualCardData;
    if (parsed && parsed.recipientName && parsed.title) {
      return parsed;
    }
  } catch (err) {
    console.warn('Could not decode card from hash:', err);
  }
  return null;
}

// LocalStorage helpers
export function getSavedCards(): VirtualCardData[] {
  if (typeof window === 'undefined') return [DEFAULT_BIRTHDAY_CARD];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const list = JSON.parse(raw);
      if (Array.isArray(list) && list.length > 0) return list;
    }
  } catch {}
  return [DEFAULT_BIRTHDAY_CARD];
}

export function saveCardToStorage(card: VirtualCardData): void {
  if (typeof window === 'undefined') return;
  try {
    const cards = getSavedCards();
    const existingIdx = cards.findIndex((c) => c.id === card.id);
    if (existingIdx >= 0) {
      cards[existingIdx] = card;
    } else {
      cards.unshift(card);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
    localStorage.setItem(ACTIVE_CARD_KEY, JSON.stringify(card));
  } catch (err) {
    console.error('Error saving card to localStorage:', err);
  }
}

export function getActiveCard(): VirtualCardData {
  // 1. Try URL hash first
  const fromHash = decodeCardFromHash();
  if (fromHash) {
    if (!fromHash.dateText) fromHash.dateText = '11 de octubre de 2026';
    return fromHash;
  }

  // 2. Try localStorage active card
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(ACTIVE_CARD_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.title) {
          if (!parsed.dateText) parsed.dateText = '11 de octubre de 2026';
          return parsed;
        }
      }
    } catch {}
  }

  return DEFAULT_BIRTHDAY_CARD;
}
