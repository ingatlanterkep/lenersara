// types/globals.d.ts
export {};

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    bp?: {
      (...args: any[]): void;
      q?: any[];
      l?: number;
    };
    dataLayer: any[] & {
      gtmLoaded?: boolean;
    };
    barion_pixel_id?: string;
    _fbq?: any;
    // 🔥 Új: függőben lévő események tárolása
    _pendingEvents?: Array<{ eventName: string; eventParams: any }>;
  }
}