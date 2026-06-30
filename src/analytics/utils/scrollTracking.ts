// ─────────────────────────────────────────────────────────────────────────────
// Scroll Depth Tracking
// ─────────────────────────────────────────────────────────────────────────────
// Tracks scroll depth at 25%, 50%, 75%, 100% thresholds.
// Each threshold fires only once per page view.
// Properly cleans up on unmount — no memory leaks.

import { analytics, AnalyticsEvent } from '../index';
import { isBrowser } from './environment';

const THRESHOLDS = [25, 50, 75, 100] as const;

/**
 * Attaches scroll depth tracking to the current page.
 * Returns a cleanup function to remove the listener.
 */
export function attachScrollTracking(path: string): () => void {
  if (!isBrowser()) return () => {};

  const fired = new Set<number>();

  function handleScroll(): void {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return;

    const scrollPercent = (window.scrollY / scrollHeight) * 100;

    for (const threshold of THRESHOLDS) {
      if (scrollPercent >= threshold && !fired.has(threshold)) {
        fired.add(threshold);
        analytics.track(AnalyticsEvent.SCROLL_DEPTH, {
          depth: threshold,
          path,
        });
      }
    }
  }

  // Use passive listener for scroll performance
  window.addEventListener('scroll', handleScroll, { passive: true });

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}
