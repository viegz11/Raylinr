// ─────────────────────────────────────────────────────────────────────────────
// Analytics Provider Component
// ─────────────────────────────────────────────────────────────────────────────
// Client component rendered once in the root layout.
// Responsibilities:
//   1. Initialize all analytics providers
//   2. Render Vercel <Analytics /> and <SpeedInsights /> components
//   3. Attach automatic page tracking
//   4. Attach scroll depth tracking
//   5. Attach error tracking
//   6. Attach outbound link tracking
//
// Renders no visible UI.

'use client';

import { useEffect, Suspense } from 'react';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { analytics } from '../index';
import { usePageTracking } from '../utils/pageTracking';
import { useScrollDepth } from '../hooks/useScrollDepth';
import { usePerformanceTracking } from '../hooks/usePerformanceTracking';
import { attachErrorTracking } from '../utils/errorTracking';
import { attachOutboundTracking } from '../utils/outboundTracking';
import { getAnalyticsConfig } from '../utils/environment';

/**
 * Inner component that uses hooks requiring Suspense boundary
 * (useSearchParams inside usePageTracking needs Suspense).
 */
function AnalyticsTrackers() {
  // Automatic page view tracking on route changes
  usePageTracking();

  // Scroll depth tracking
  useScrollDepth();

  // Custom Performance / Core Web Vitals monitoring
  usePerformanceTracking();

  return null;
}

export function AnalyticsProvider() {
  const config = getAnalyticsConfig();

  // Initialize analytics service on mount (once)
  useEffect(() => {
    analytics.init();

    // Check for user cookie consent preference in localStorage
    try {
      const savedConsent = localStorage.getItem('raylinr_cookie_consent') as 'granted' | 'denied' | null;
      if (savedConsent) {
        analytics.setConsent(savedConsent);
      } else {
        analytics.setConsent('pending');
      }
    } catch {
      // Fallback if localStorage is disabled/fails
      analytics.setConsent('pending');
    }

    // Attach global error tracking
    const cleanupErrors = attachErrorTracking();

    // Attach outbound link tracking
    const cleanupOutbound = attachOutboundTracking();

    return () => {
      cleanupErrors();
      cleanupOutbound();
    };
  }, []);

  return (
    <>
      {/* Vercel Analytics — first-party, no consent needed */}
      {config.vercelEnabled && <Analytics />}

      {/* Vercel Speed Insights — Core Web Vitals */}
      {config.vercelEnabled && <SpeedInsights />}

      {/* Tracking hooks wrapped in Suspense (useSearchParams requirement) */}
      <Suspense fallback={null}>
        <AnalyticsTrackers />
      </Suspense>
    </>
  );
}
