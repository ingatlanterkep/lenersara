// types/gtag.d.ts (vagy bármelyik .d.ts fájl a projektben)
export {};

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}