// ─────────────────────────────────────────────────────────────────────────────
// Core Analytics Service (Singleton)
// ─────────────────────────────────────────────────────────────────────────────
// Central orchestrator. Routes all events to all registered providers.
// Components never call providers directly — they call this service.
//
// Public API:
//   analytics.track(event, properties)
//   analytics.page(path, properties)
//   analytics.identify(userId, traits)
//   analytics.setConsent(state)
//   analytics.reset()

import type { AnalyticsProviderInterface, ConsentState, AnalyticsEventMap, AnalyticsEventName } from './types';
import { createProviders } from './providers';
import { getAnalyticsConfig, isAnalyticsEnabled, debugLog, isBrowser } from './utils/environment';
import { collectCustomDimensions } from './utils/userTracking';
import { markUserVisit } from './utils/sessionTracking';

class AnalyticsService {
  private providers: AnalyticsProviderInterface[] = [];
  private consent: ConsentState = 'pending';
  private initialized = false;
  private lastPagePath: string = '';

  // ── Initialization ─────────────────────────────────────────────────────

  /**
   * Initialize the analytics service and all providers.
   * Called once from AnalyticsProvider.tsx on mount.
   */
  init(): void {
    if (this.initialized) {
      debugLog('service', 'Already initialized, skipping');
      return;
    }

    if (!isBrowser()) return;

    if (!isAnalyticsEnabled()) {
      debugLog('service', 'Analytics disabled via feature flag');
      this.initialized = true;
      return;
    }

    const config = getAnalyticsConfig();
    this.providers = createProviders(config);

    // Initialize providers that don't require consent immediately
    for (const provider of this.providers) {
      if (!provider.requiresConsent) {
        provider.initialize();
      }
    }

    // Mark user visit for returning-user detection
    markUserVisit();

    this.initialized = true;
    debugLog('service', 'Initialized with', this.providers.length, 'providers');
  }

  // ── Consent Management ─────────────────────────────────────────────────

  setConsent(state: ConsentState): void {
    this.consent = state;
    debugLog('service', 'Consent set to:', state);

    if (state === 'granted') {
      // Initialize consent-gated providers
      for (const provider of this.providers) {
        if (provider.requiresConsent && !provider.isInitialized) {
          provider.initialize();
        }
      }
    }
  }

  getConsent(): ConsentState {
    return this.consent;
  }

  // ── Public API ─────────────────────────────────────────────────────────

  /**
   * Track a typed analytics event.
   * Dispatches to all initialized providers.
   */
  track<E extends AnalyticsEventName>(
    event: E,
    properties: E extends keyof AnalyticsEventMap ? AnalyticsEventMap[E] : Record<string, unknown>
  ): void {
    if (!this.initialized || !isAnalyticsEnabled()) return;

    // Enrich with custom dimensions
    const dimensions = collectCustomDimensions();
    const enrichedProps = { ...properties, ...dimensions };

    for (const provider of this.providers) {
      if (provider.isInitialized) {
        provider.track(event, enrichedProps as Record<string, unknown>);
      }
    }
  }

  /**
   * Track a page view. De-duplicated: same path won't fire twice in a row.
   */
  page(path: string, properties?: Record<string, unknown>): void {
    if (!this.initialized || !isAnalyticsEnabled()) return;

    // De-duplication guard: prevent double page views on hydration
    if (path === this.lastPagePath) {
      debugLog('service', 'Duplicate page view suppressed:', path);
      return;
    }
    this.lastPagePath = path;

    const dimensions = collectCustomDimensions();
    const enrichedProps = {
      ...dimensions,
      ...properties,
      title: isBrowser() ? document.title : '',
    };

    for (const provider of this.providers) {
      if (provider.isInitialized) {
        provider.page(path, enrichedProps);
      }
    }
  }

  /**
   * Identify a user. Never send PII — use anonymous IDs.
   */
  identify(userId: string, traits?: Record<string, unknown>): void {
    if (!this.initialized || !isAnalyticsEnabled()) return;

    for (const provider of this.providers) {
      if (provider.isInitialized) {
        provider.identify(userId, traits);
      }
    }
  }

  /**
   * Alias for identify (used in some analytics patterns).
   */
  setUser(userId: string, traits?: Record<string, unknown>): void {
    this.identify(userId, traits);
  }

  /**
   * Reset user identity across all providers.
   */
  reset(): void {
    if (!this.initialized) return;

    for (const provider of this.providers) {
      if (provider.isInitialized) {
        provider.reset();
      }
    }

    debugLog('service', 'User identity reset');
  }

  /**
   * Alias: sets user_id across all providers that support it.
   */
  alias(newId: string, previousId?: string): void {
    this.identify(newId, previousId ? { previous_id: previousId } : undefined);
  }
}

// ── Singleton Export ──────────────────────────────────────────────────────────

export const analytics = new AnalyticsService();

// Re-export types and events for convenience
export { AnalyticsEvent } from './types';
export type { AnalyticsEventName, AnalyticsEventMap, ConsentState } from './types';
export * from './events';
