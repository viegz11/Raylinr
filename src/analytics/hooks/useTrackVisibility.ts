// ─────────────────────────────────────────────────────────────────────────────
// useTrackVisibility Hook
// ─────────────────────────────────────────────────────────────────────────────
// Fires an analytics event when a component enters the viewport.
// Uses IntersectionObserver for performance. Fires only once per component.
//
// Usage:
//   const ref = useTrackVisibility('features', 'Features Section');
//   <section ref={ref}>...</section>

'use client';

import { useRef, useEffect, useCallback } from 'react';
import { analytics, AnalyticsEvent } from '../index';

/**
 * Returns a ref callback to attach to a DOM element.
 * When the element becomes visible (50% threshold), fires a section_viewed event.
 */
export function useTrackVisibility(
  sectionId: string,
  sectionName: string
): (node: HTMLElement | null) => void {
  const hasFired = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const nodeRef = useRef<HTMLElement | null>(null);

  // Cleanup observer
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  const refCallback = useCallback(
    (node: HTMLElement | null) => {
      // Disconnect previous observer if node changed
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      nodeRef.current = node;

      if (!node || hasFired.current) return;
      if (typeof IntersectionObserver === 'undefined') return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting && !hasFired.current) {
              hasFired.current = true;
              analytics.track(AnalyticsEvent.SECTION_VIEWED, {
                section_id: sectionId,
                section_name: sectionName,
              });
              observerRef.current?.disconnect();
            }
          }
        },
        { threshold: 0.5 }
      );

      observerRef.current.observe(node);
    },
    [sectionId, sectionName]
  );

  return refCallback;
}
