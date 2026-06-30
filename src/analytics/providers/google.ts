// ─────────────────────────────────────────────────────────────────────────────
// Google Analytics 4 Provider
// ─────────────────────────────────────────────────────────────────────────────
// Dynamically loads gtag.js after consent. Supports debug mode for GA4 DebugView.
// Consent-gated: will not load until the user grants analytics consent.

import { BaseAnalyticsProvider } from './base';
import { getAnalyticsConfig, isDevelopment, isBrowser } from '../utils/environment';

// Extend Window to include gtag and dataLayer
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export class GoogleAnalyticsProvider extends BaseAnalyticsProvider {
  readonly name = 'google';
  readonly requiresConsent = true;

  private measurementId: string = '';

  protected doInitialize(): void {
    if (!isBrowser()) return;

    const config = getAnalyticsConfig();
    this.measurementId = config.gaMeasurementId;

    if (!this.measurementId) {
      // No measurement ID configured — skip silently
      return;
    }

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };
    window.gtag('js', new Date());

    // Configure with debug mode in development
    const gtagConfig: Record<string, unknown> = {
      send_page_view: false, // We handle page views manually to prevent duplicates
    };

    if (isDevelopment()) {
      gtagConfig.debug_mode = true;
    }

    window.gtag('config', this.measurementId, gtagConfig);

    // Dynamically load the gtag.js script (non-blocking)
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`;
    script.async = true;
    document.head.appendChild(script);
  }

  protected doTrack(event: string, properties?: Record<string, unknown>): void {
    if (!isBrowser() || !window.gtag || !this.measurementId) return;

    window.gtag('event', event, {
      ...properties,
      send_to: this.measurementId,
    });
  }

  protected doPage(path: string, properties?: Record<string, unknown>): void {
    if (!isBrowser() || !window.gtag || !this.measurementId) return;

    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: properties?.title || document.title,
      page_location: window.location.href,
      send_to: this.measurementId,
    });
  }

  protected doIdentify(userId: string): void {
    if (!isBrowser() || !window.gtag || !this.measurementId) return;

    window.gtag('config', this.measurementId, {
      user_id: userId,
    });
  }

  protected doReset(): void {
    // GA4 doesn't have a native reset — handled by not sending user_id
  }
}
