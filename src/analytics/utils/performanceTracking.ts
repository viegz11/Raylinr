// ─────────────────────────────────────────────────────────────────────────────
// Custom Performance & Core Web Vitals Tracking
// ─────────────────────────────────────────────────────────────────────────────
// Collects standard web performance metrics (TTFB, FCP, LCP, CLS, FID)
// using browser PerformanceObservers, then tracks them via the analytics service.
// Ratings map directly to Google's PageSpeed Insights rating thresholds.

import { analytics, AnalyticsEvent } from '../index';
import { isBrowser } from './environment';

type MetricRating = 'good' | 'needs-improvement' | 'poor';

function getRating(name: string, value: number): MetricRating {
  switch (name) {
    case 'TTFB':
      return value <= 800 ? 'good' : value <= 1800 ? 'needs-improvement' : 'poor';
    case 'FCP':
      return value <= 1800 ? 'good' : value <= 3000 ? 'needs-improvement' : 'poor';
    case 'LCP':
      return value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor';
    case 'FID':
      return value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor';
    case 'CLS':
      return value <= 0.1 ? 'good' : value <= 0.25 ? 'needs-improvement' : 'poor';
    default:
      return 'good';
  }
}

function sendMetric(name: 'LCP' | 'FID' | 'CLS' | 'TTFB' | 'FCP', value: number): void {
  const rating = getRating(name, value);
  analytics.track(AnalyticsEvent.PERFORMANCE_METRIC, {
    metric_name: name,
    metric_value: value,
    metric_rating: rating,
  });
}

/**
 * Installs observers for Core Web Vitals.
 * Returns a cleanup function to disconnect observers.
 */
export function attachPerformanceTracking(): () => void {
  if (!isBrowser() || typeof PerformanceObserver === 'undefined') {
    return () => {};
  }

  const observers: PerformanceObserver[] = [];

  try {
    // 1. TTFB (Time to First Byte)
    const navEntries = performance.getEntriesByType('navigation');
    if (navEntries.length > 0) {
      const nav = navEntries[0] as PerformanceNavigationTiming;
      const ttfb = nav.responseStart - nav.requestStart;
      if (ttfb >= 0) {
        sendMetric('TTFB', Math.round(ttfb));
      }
    } else {
      // Fallback for older browsers
      const navTiming = performance.timing;
      if (navTiming) {
        const ttfb = navTiming.responseStart - navTiming.requestStart;
        if (ttfb >= 0) {
          sendMetric('TTFB', Math.round(ttfb));
        }
      }
    }

    // 2. FCP (First Contentful Paint)
    const fcpObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          sendMetric('FCP', Math.round(entry.startTime));
        }
      }
    });
    fcpObserver.observe({ type: 'paint', buffered: true });
    observers.push(fcpObserver);

    // 3. LCP (Largest Contentful Paint)
    let lcpValue = 0;
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      lcpValue = lastEntry.startTime;
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    observers.push(lcpObserver);

    // 4. FID (First Input Delay)
    const fidObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const firstInput = entry as PerformanceEventTiming;
        const delay = firstInput.processingStart - firstInput.startTime;
        sendMetric('FID', Math.round(delay));
      }
    });
    fidObserver.observe({ type: 'first-input', buffered: true });
    observers.push(fidObserver);

    // 5. CLS (Cumulative Layout Shift)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const layoutShift = entry as { value?: number; hadRecentInput?: boolean };
        if (layoutShift.value !== undefined && !layoutShift.hadRecentInput) {
          clsValue += layoutShift.value;
        }
      }
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });
    observers.push(clsObserver);

    // Document Visibility / Page unload handlers to capture dynamic metrics
    const handleVisibilityChange = (): void => {
      if (document.visibilityState === 'hidden') {
        // Report final LCP and CLS values when user leaves
        if (lcpValue > 0) {
          sendMetric('LCP', Math.round(lcpValue));
          lcpValue = 0; // Prevent reporting multiple times
        }
        if (clsValue > 0) {
          // CLS values are small decimals, scale to 3 decimals
          sendMetric('CLS', Math.round(clsValue * 1000) / 1000);
          clsValue = 0;
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      for (const observer of observers) {
        observer.disconnect();
      }
    };
  } catch (error) {
    // Fail silently in unsupported browsers
    return () => {};
  }
}
