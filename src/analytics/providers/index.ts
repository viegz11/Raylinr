// ─────────────────────────────────────────────────────────────────────────────
// Provider Registry
// ─────────────────────────────────────────────────────────────────────────────
// Central registry that creates and manages all analytics providers.
// Adding a new provider (e.g., Mixpanel) requires:
//   1. Implement the provider class extending BaseAnalyticsProvider
//   2. Add it to createProviders() below
// No UI components need to change.

import type { AnalyticsProviderInterface, AnalyticsConfig } from '../types';
import { VercelAnalyticsProvider } from './vercel';
import { GoogleAnalyticsProvider } from './google';
import { ClarityProvider } from './clarity';
import { debugLog } from '../utils/environment';

/**
 * Creates all analytics providers based on configuration and feature flags.
 * Disabled providers are simply not instantiated — zero overhead.
 */
export function createProviders(config: AnalyticsConfig): AnalyticsProviderInterface[] {
  const providers: AnalyticsProviderInterface[] = [];

  if (config.vercelEnabled) {
    providers.push(new VercelAnalyticsProvider());
  }

  if (config.gaEnabled && config.gaMeasurementId) {
    providers.push(new GoogleAnalyticsProvider());
  }

  if (config.clarityEnabled && config.clarityId) {
    providers.push(new ClarityProvider());
  }

  // ── Future providers go here ──────────────────────────────────────────
  // if (config.mixpanelEnabled && config.mixpanelToken) {
  //   providers.push(new MixpanelProvider());
  // }

  debugLog('registry', `Created ${providers.length} providers:`, providers.map((p) => p.name));

  return providers;
}

export { VercelAnalyticsProvider } from './vercel';
export { GoogleAnalyticsProvider } from './google';
export { ClarityProvider } from './clarity';
