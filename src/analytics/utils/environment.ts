// ─────────────────────────────────────────────────────────────────────────────
// Environment & Configuration Utilities
// ─────────────────────────────────────────────────────────────────────────────
// Typed environment variable validation + feature flag support.
// SSR-safe: all browser-only checks guarded.

import type { AnalyticsConfig } from '../types';

/** Read a string env var, returning fallback if unset or empty */
function envString(key: string, fallback: string = ''): string {
  if (typeof process === 'undefined') return fallback;
  const value = process.env[key];
  return value && value.trim().length > 0 ? value.trim() : fallback;
}

/** Read a boolean env var. Treats 'true' / '1' as true, everything else false */
function envBool(key: string, fallback: boolean = true): boolean {
  if (typeof process === 'undefined') return fallback;
  const value = process.env[key];
  if (value === undefined || value.trim() === '') return fallback;
  return value.trim() === 'true' || value.trim() === '1';
}

/** Resolve the current application environment */
function resolveAppEnv(): 'production' | 'development' | 'preview' {
  const env = envString('NEXT_PUBLIC_APP_ENV', 'development');
  if (env === 'production') return 'production';
  if (env === 'preview') return 'preview';
  return 'development';
}

// ── Singleton config (computed once) ─────────────────────────────────────────

let _config: AnalyticsConfig | null = null;

export function getAnalyticsConfig(): AnalyticsConfig {
  if (_config) return _config;

  const appEnv = resolveAppEnv();

  _config = {
    // Provider IDs
    gaMeasurementId: envString('NEXT_PUBLIC_GA_MEASUREMENT_ID'),
    gtmId: envString('NEXT_PUBLIC_GTM_ID'),
    clarityId: envString('NEXT_PUBLIC_CLARITY_ID'),

    // Environment
    appEnv,
    isProduction: appEnv === 'production',

    // Feature Flags — all default to true so analytics works out-of-the-box
    // when IDs are provided. Set to 'false' to disable.
    analyticsEnabled: envBool('NEXT_PUBLIC_ENABLE_ANALYTICS', true),
    gaEnabled: envBool('NEXT_PUBLIC_ENABLE_GA', true),
    clarityEnabled: envBool('NEXT_PUBLIC_ENABLE_CLARITY', true),
    vercelEnabled: envBool('NEXT_PUBLIC_ENABLE_VERCEL', true),
  };

  return _config;
}

// ── Convenience helpers ──────────────────────────────────────────────────────

export function isProduction(): boolean {
  return getAnalyticsConfig().isProduction;
}

export function isDevelopment(): boolean {
  return getAnalyticsConfig().appEnv === 'development';
}

export function isAnalyticsEnabled(): boolean {
  return getAnalyticsConfig().analyticsEnabled;
}

export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Debug logger — only logs in development mode.
 * All analytics debug output goes through this function.
 */
export function debugLog(category: string, ...args: unknown[]): void {
  if (!isDevelopment()) return;
  // eslint-disable-next-line no-console
  console.log(`[Analytics:${category}]`, ...args);
}

/**
 * Warning logger — logs in development, silently ignored in production.
 * Used for non-fatal analytics issues.
 */
export function warnLog(category: string, ...args: unknown[]): void {
  if (!isDevelopment()) return;
  // eslint-disable-next-line no-console
  console.warn(`[Analytics:${category}]`, ...args);
}
