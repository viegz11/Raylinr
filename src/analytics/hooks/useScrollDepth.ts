// ─────────────────────────────────────────────────────────────────────────────
// useScrollDepth Hook
// ─────────────────────────────────────────────────────────────────────────────
// Attaches scroll depth tracking on mount, cleans up on unmount.
// Each threshold (25/50/75/100%) fires only once per page view.

'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { attachScrollTracking } from '../utils/scrollTracking';

/**
 * Hook that enables scroll depth tracking for the current page.
 * Include once per page layout.
 */
export function useScrollDepth(): void {
  const pathname = usePathname();

  useEffect(() => {
    const cleanup = attachScrollTracking(pathname);
    return cleanup;
  }, [pathname]);
}
