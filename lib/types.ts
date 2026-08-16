// lib/types.ts
export type MediaItem = {
  type: "image" | "video";
  src: string; // ruta dentro de /public, ej: "/media/landing/hero.jpg"
  alt: string; // obligatorio, para accesibilidad y SEO
  poster?: string; // solo para video: imagen mientras carga
};

export type LandingData = {
  hero: {
    headline: string;
    subheadline: string;
    media: MediaItem;
  };
  highlights: {
    title: string;
    description: string;
    media: MediaItem;
  }[];
};

export type PortfolioProject = {
  id: string;
  title: string;
  category: string;
  description: string;
  media: MediaItem[];
};

export type PortfolioData = {
  intro: string;
  projects: PortfolioProject[];
};

export type StoreProduct = {
  id: string;
  name: string;
  price: number;
  description: string;
  available: boolean;
  media: MediaItem[];
};

export type StoreData = {
  intro: string;
  products: StoreProduct[];
};

export type AboutData = {
  title: string;
  bio: string[];
  portrait: MediaItem;
  gallery: MediaItem[];
};
