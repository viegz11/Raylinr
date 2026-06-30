// ─────────────────────────────────────────────────────────────────────────────
// usePerformanceTracking Hook
// ─────────────────────────────────────────────────────────────────────────────
// Attaches native Core Web Vitals performance observers on mount,
// and ensures proper cleanup of listeners and observers on unmount.

'use client';

import { useEffect } from 'react';
import { attachPerformanceTracking } from '../utils/performanceTracking';

export function usePerformanceTracking(): void {
  useEffect(() => {
    const cleanup = attachPerformanceTracking();
    return cleanup;
  }, []);
}
