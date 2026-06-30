// ─────────────────────────────────────────────────────────────────────────────
// Microsoft Clarity Provider
// ─────────────────────────────────────────────────────────────────────────────
// Dynamically injects Clarity script after consent.
// Supports custom tags, events, and user identification.
// Compatible with session recordings and heatmaps.

import { BaseAnalyticsProvider } from './base';
import { getAnalyticsConfig, isBrowser } from '../utils/environment';

// Extend Window for Clarity
declare global {
  interface Window {
    clarity: ((...args: unknown[]) => void) & {
      q?: unknown[][];
    };
  }
}

export class ClarityProvider extends BaseAnalyticsProvider {
  readonly name = 'clarity';
  readonly requiresConsent = true;

  private clarityId: string = '';

  protected doInitialize(): void {
    if (!isBrowser()) return;

    const config = getAnalyticsConfig();
    this.clarityId = config.clarityId;

    if (!this.clarityId) return;

    // Clarity initialization snippet (official, minified)
    window.clarity =
      window.clarity ||
      function clarity(...args: unknown[]) {
        (window.clarity.q = window.clarity.q || []).push(args);
      };

    const script = document.createElement('script');
    script.src = `https://www.clarity.ms/tag/${this.clarityId}`;
    script.async = true;
    document.head.appendChild(script);
  }

  protected doTrack(event: string, properties?: Record<string, unknown>): void {
    if (!isBrowser() || !window.clarity || !this.clarityId) return;

    // Clarity custom event
    window.clarity('event', event);

    // Set custom tags for each property (Clarity supports key-value tags)
    if (properties) {
      for (const [key, value] of Object.entries(properties)) {
        if (value !== undefined && value !== null) {
          window.clarity('set', key, String(value));
        }
      }
    }
  }

  protected doPage(path: string): void {
    if (!isBrowser() || !window.clarity || !this.clarityId) return;

    // Clarity tracks page views automatically via session recording.
    // We can set custom tags for route-level segmentation.
    window.clarity('set', 'page_path', path);
  }

  protected doIdentify(userId: string, traits?: Record<string, unknown>): void {
    if (!isBrowser() || !window.clarity || !this.clarityId) return;

    const sessionId = (traits?.session_id as string) || '';
    const customPage = (traits?.custom_page as string) || '';

    window.clarity('identify', userId, sessionId, customPage);
  }

  protected doReset(): void {
    // Clarity doesn't support a reset; session recording continues.
  }
}
