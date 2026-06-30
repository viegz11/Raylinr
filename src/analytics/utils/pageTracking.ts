// ─────────────────────────────────────────────────────────────────────────────
// Automatic Page View Tracking
// ─────────────────────────────────────────────────────────────────────────────
// React hook that fires page_view on route changes.
// Uses Next.js App Router's usePathname() and useSearchParams().
// De-duplication is handled by the analytics service (same path won't fire twice).

'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { analytics } from '../index';

/**
 * Hook that automatically tracks page views on route changes.
 * Should be rendered once, inside AnalyticsProvider.
 */
export function usePageTracking(): void {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Build the full path including search params
    const search = searchParams.toString();
    const fullPath = search ? `${pathname}?${search}` : pathname;

    // Track page view (analytics service handles de-duplication)
    analytics.page(fullPath);

    // Mark first render complete
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, [pathname, searchParams]);
}
