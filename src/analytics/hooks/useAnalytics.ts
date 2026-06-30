// ─────────────────────────────────────────────────────────────────────────────
// useAnalytics Hook
// ─────────────────────────────────────────────────────────────────────────────
// Primary hook for components to track events.
// Components only ever interact with analytics through this hook.
// Memoized to prevent unnecessary re-renders.

'use client';

import { useCallback, useMemo } from 'react';
import { analytics } from '../index';
import type { AnalyticsEventName, AnalyticsEventMap } from '../types';

export interface UseAnalyticsReturn {
  /** Track a named event with typed properties */
  track: <E extends AnalyticsEventName>(
    event: E,
    properties: E extends keyof AnalyticsEventMap ? AnalyticsEventMap[E] : Record<string, unknown>
  ) => void;

  /** Track a page view */
  page: (path: string, properties?: Record<string, unknown>) => void;

  /** Identify a user (anonymous ID only — never PII) */
  identify: (userId: string, traits?: Record<string, unknown>) => void;

  /** Set user identity (alias for identify) */
  setUser: (userId: string, traits?: Record<string, unknown>) => void;

  /** Reset user identity */
  reset: () => void;
}

export function useAnalytics(): UseAnalyticsReturn {
  const track = useCallback(
    <E extends AnalyticsEventName>(
      event: E,
      properties: E extends keyof AnalyticsEventMap ? AnalyticsEventMap[E] : Record<string, unknown>
    ) => {
      analytics.track(event, properties);
    },
    []
  );

  const page = useCallback((path: string, properties?: Record<string, unknown>) => {
    analytics.page(path, properties);
  }, []);

  const identify = useCallback((userId: string, traits?: Record<string, unknown>) => {
    analytics.identify(userId, traits);
  }, []);

  const setUser = useCallback((userId: string, traits?: Record<string, unknown>) => {
    analytics.setUser(userId, traits);
  }, []);

  const reset = useCallback(() => {
    analytics.reset();
  }, []);

  return useMemo(
    () => ({ track, page, identify, setUser, reset }),
    [track, page, identify, setUser, reset]
  );
}
