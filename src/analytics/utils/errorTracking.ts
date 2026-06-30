// ─────────────────────────────────────────────────────────────────────────────
// Error Tracking
// ─────────────────────────────────────────────────────────────────────────────
// Global error and unhandled rejection handlers.
// Rate-limited: max 10 errors per session to prevent analytics flood.
// Never sends sensitive data — only error metadata.

import { analytics, AnalyticsEvent } from '../index';
import { isBrowser } from './environment';

const MAX_ERRORS_PER_SESSION = 10;
let errorCount = 0;

/**
 * Attaches global error tracking handlers.
 * Returns a cleanup function.
 */
export function attachErrorTracking(): () => void {
  if (!isBrowser()) return () => {};

  function handleError(event: ErrorEvent): void {
    if (errorCount >= MAX_ERRORS_PER_SESSION) return;
    errorCount++;

    analytics.track(AnalyticsEvent.ERROR_OCCURRED, {
      error_type: 'runtime_error',
      message: event.message || 'Unknown error',
      page_url: window.location.pathname,
      stack: event.error?.stack?.substring(0, 500), // Truncate stack traces
    });
  }

  function handleRejection(event: PromiseRejectionEvent): void {
    if (errorCount >= MAX_ERRORS_PER_SESSION) return;
    errorCount++;

    const reason = event.reason;
    const message =
      reason instanceof Error
        ? reason.message
        : typeof reason === 'string'
          ? reason
          : 'Unhandled promise rejection';

    analytics.track(AnalyticsEvent.ERROR_OCCURRED, {
      error_type: 'unhandled_rejection',
      message,
      page_url: window.location.pathname,
      stack: reason instanceof Error ? reason.stack?.substring(0, 500) : undefined,
    });
  }

  window.addEventListener('error', handleError);
  window.addEventListener('unhandledrejection', handleRejection);

  return () => {
    window.removeEventListener('error', handleError);
    window.removeEventListener('unhandledrejection', handleRejection);
  };
}
