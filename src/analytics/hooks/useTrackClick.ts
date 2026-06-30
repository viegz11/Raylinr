// ─────────────────────────────────────────────────────────────────────────────
// useTrackClick Hook
// ─────────────────────────────────────────────────────────────────────────────
// Returns an onClick handler that fires a tracked event, then calls the
// original handler. Use for buttons, links, and interactive elements.
//
// Usage:
//   const handleClick = useTrackClick(AnalyticsEvent.CTA_CLICK, { cta_id: 'hero', location: 'hero' });
//   <button onClick={handleClick}>Click me</button>
//
//   // With original handler:
//   const handleClick = useTrackClick(AnalyticsEvent.CTA_CLICK, { cta_id: 'hero', location: 'hero' }, originalHandler);

'use client';

import { useCallback, useRef } from 'react';
import { analytics } from '../index';
import type { AnalyticsEventName, AnalyticsEventMap } from '../types';

export function useTrackClick<E extends AnalyticsEventName>(
  event: E,
  properties: E extends keyof AnalyticsEventMap ? AnalyticsEventMap[E] : Record<string, unknown>,
  originalHandler?: (e: React.MouseEvent) => void
): (e: React.MouseEvent) => void {
  const eventRef = useRef(event);
  const propertiesRef = useRef(properties);
  const handlerRef = useRef(originalHandler);

  // Sync refs on every render
  eventRef.current = event;
  propertiesRef.current = properties;
  handlerRef.current = originalHandler;

  return useCallback(
    (e: React.MouseEvent) => {
      analytics.track(eventRef.current, propertiesRef.current);

      if (handlerRef.current) {
        handlerRef.current(e);
      }
    },
    []
  );
}

