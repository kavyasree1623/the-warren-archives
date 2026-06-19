/**
 * THE CONJURING UNIVERSE - DATA TYPES
 */

export interface Movie {
  id: string;
  title: string;
  year: number;
  tagline: string;
  story: string;
  poster: string;
  characters: string[];
  demonInvolved: string;
  gallery: string[];
  trailerUrl: string; // Embeddable youtube or placeholder
  keyEvents: string[];
  connections: string;
}

export interface Artifact {
  id: string;
  name: string;
  imageUrl: string;
  hoverSound: string; // description or event identifier
  description: string;
  history: string;
  movieAppearances: string[];
  dangerLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME';
}

export interface Demon {
  id: string;
  name: string;
  origin: string;
  history: string;
  abilities: string[];
  victims: string[];
  moviesAppearedIn: string[];
  threatLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME';
  imageUrl: string;
}

export interface TimelineEvent {
  year: number;
  title: string;
  movie: string;
  description: string;
  glowingConnections: string[]; // Connected years
  poster: string;
  details: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  type: 'poster' | 'bts' | 'concept' | 'production';
  imageUrl: string;
}
