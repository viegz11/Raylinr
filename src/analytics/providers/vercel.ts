// ─────────────────────────────────────────────────────────────────────────────
// Vercel Analytics Provider
// ─────────────────────────────────────────────────────────────────────────────
// Wraps @vercel/analytics `track()` for custom events.
// No consent gating needed — Vercel Analytics is first-party, privacy-friendly.
// The <Analytics /> and <SpeedInsights /> React components are rendered
// separately in AnalyticsProvider.tsx (they handle page views automatically).

import { track as vercelTrack } from '@vercel/analytics';
import { BaseAnalyticsProvider } from './base';

export class VercelAnalyticsProvider extends BaseAnalyticsProvider {
  readonly name = 'vercel';
  readonly requiresConsent = false;

  protected doInitialize(): void {
    // Vercel Analytics initializes automatically via the <Analytics /> component.
    // This provider just bridges custom event tracking through the unified API.
  }

  protected doTrack(event: string, properties?: Record<string, unknown>): void {
    // Vercel Analytics track() accepts a flat Record<string, string | number | boolean | null>
    const cleanProps: Record<string, string | number | boolean | null> = {};

    if (properties) {
      for (const [key, value] of Object.entries(properties)) {
        if (
          typeof value === 'string' ||
          typeof value === 'number' ||
          typeof value === 'boolean'
        ) {
          cleanProps[key] = value;
        } else if (value === null || value === undefined) {
          cleanProps[key] = null;
        } else {
          cleanProps[key] = String(value);
        }
      }
    }

    vercelTrack(event, cleanProps);
  }

  protected doPage(): void {
    // Page views are handled automatically by the <Analytics /> component.
    // No manual page call needed.
  }

  protected doIdentify(): void {
    // Vercel Analytics does not support user identification.
  }

  protected doReset(): void {
    // No-op for Vercel Analytics.
  }
}
