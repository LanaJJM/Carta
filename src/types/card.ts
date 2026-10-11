export type OccasionType = 'birthday' | 'anniversary' | 'love' | 'friendship' | 'congrats' | 'special';

export type CardTheme = 'golden_rose' | 'starlight' | 'pastel_confetti' | 'botanical' | 'neon_party';

export type SealSymbol = 'heart' | 'cake' | 'star' | 'crown' | 'sparkle' | 'gift' | 'champagne';

export type MelodicTrack = 'cumpleanos_feliz' | 'dulce_vals' | 'celebracion_magica' | 'none';

export interface BalloonItem {
  id: number;
  color: string;
  message: string;
  popped: boolean;
}

export interface PhotoItem {
  id: string;
  url: string;
  caption: string;
}

export interface SurpriseGift {
  title: string;
  description: string;
  emoji: string;
}

export interface ScratchCardData {
  enabled: boolean;
  title: string;
  hiddenMessage: string;
}

export interface VirtualCardData {
  id: string;
  recipientName: string;
  senderName: string;
  occasion: OccasionType;
  theme: CardTheme;
  sealSymbol: SealSymbol;
  title: string;
  message: string;
  quote?: string;
  musicTrack: MelodicTrack;
  hasCake: boolean;
  candlesCount: number;
  surpriseGift: SurpriseGift;
  scratchCard: ScratchCardData;
  balloons: BalloonItem[];
  photos: PhotoItem[];
  createdAt: string;
  dateText?: string;
}
