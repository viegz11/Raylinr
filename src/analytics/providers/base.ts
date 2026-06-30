// ─────────────────────────────────────────────────────────────────────────────
// Abstract Analytics Provider Base
// ─────────────────────────────────────────────────────────────────────────────
// Shared logic for all providers: consent checking, error isolation, debug logging.
// Every provider call is wrapped in try/catch — a failure in one provider
// never affects another.

import type { AnalyticsProviderInterface } from '../types';
import { debugLog, warnLog } from '../utils/environment';

export abstract class BaseAnalyticsProvider implements AnalyticsProviderInterface {
  abstract readonly name: string;
  abstract readonly requiresConsent: boolean;

  protected _isInitialized = false;

  get isInitialized(): boolean {
    return this._isInitialized;
  }

  // ── Abstract methods providers must implement ────────────────────────────

  protected abstract doInitialize(): void;
  protected abstract doTrack(event: string, properties?: Record<string, unknown>): void;
  protected abstract doPage(path: string, properties?: Record<string, unknown>): void;
  protected abstract doIdentify(userId: string, traits?: Record<string, unknown>): void;
  protected abstract doReset(): void;

  // ── Public API (error-isolated) ──────────────────────────────────────────

  initialize(): void {
    if (this._isInitialized) {
      debugLog(this.name, 'Already initialized, skipping');
      return;
    }

    try {
      this.doInitialize();
      this._isInitialized = true;
      debugLog(this.name, 'Initialized successfully');
    } catch (error) {
      warnLog(this.name, 'Initialization failed:', error);
    }
  }

  track(event: string, properties?: Record<string, unknown>): void {
    if (!this._isInitialized) return;

    try {
      this.doTrack(event, properties);
      debugLog(this.name, 'Track:', event, properties);
    } catch (error) {
      warnLog(this.name, 'Track failed:', event, error);
    }
  }

  page(path: string, properties?: Record<string, unknown>): void {
    if (!this._isInitialized) return;

    try {
      this.doPage(path, properties);
      debugLog(this.name, 'Page:', path, properties);
    } catch (error) {
      warnLog(this.name, 'Page failed:', path, error);
    }
  }

  identify(userId: string, traits?: Record<string, unknown>): void {
    if (!this._isInitialized) return;

    try {
      this.doIdentify(userId, traits);
      debugLog(this.name, 'Identify:', userId);
    } catch (error) {
      warnLog(this.name, 'Identify failed:', userId, error);
    }
  }

  reset(): void {
    if (!this._isInitialized) return;

    try {
      this.doReset();
      debugLog(this.name, 'Reset');
    } catch (error) {
      warnLog(this.name, 'Reset failed:', error);
    }
  }
}
