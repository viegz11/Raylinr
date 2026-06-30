// ─────────────────────────────────────────────────────────────────────────────
// Outbound Link & Download Tracking
// ─────────────────────────────────────────────────────────────────────────────
// Automatically detects and tracks clicks on:
//   - External links (different hostname)
//   - Download links (.pdf, .docx, .xlsx, .zip, .csv)
// Uses event delegation on document.body for efficiency.
// Properly cleans up on unmount.

import { analytics, AnalyticsEvent } from '../index';
import { isBrowser } from './environment';

const DOWNLOAD_EXTENSIONS = ['.pdf', '.docx', '.xlsx', '.zip', '.csv', '.pptx'];

/**
 * Attaches outbound link and download tracking via event delegation.
 * Returns a cleanup function.
 */
export function attachOutboundTracking(): () => void {
  if (!isBrowser()) return () => {};

  function handleClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const anchor = target.closest('a');
    if (!anchor) return;

    const href = anchor.href;
    if (!href) return;

    try {
      const url = new URL(href, window.location.origin);

      // Check if outbound link
      if (url.hostname !== window.location.hostname && url.protocol.startsWith('http')) {
        analytics.track(AnalyticsEvent.OUTBOUND_LINK, {
          url: url.href,
          link_text: (anchor.textContent || '').trim().substring(0, 100),
        });
      }

      // Check if download link
      const pathname = url.pathname.toLowerCase();
      const isDownload = DOWNLOAD_EXTENSIONS.some((ext) => pathname.endsWith(ext));
      if (isDownload) {
        const fileName = pathname.split('/').pop() || 'unknown';
        const extension = pathname.split('.').pop() || 'unknown';
        analytics.track(AnalyticsEvent.DOWNLOAD, {
          file_name: fileName,
          file_type: extension,
        });
      }
    } catch {
      // Invalid URL — skip silently
    }
  }

  document.addEventListener('click', handleClick, { capture: true });

  return () => {
    document.removeEventListener('click', handleClick, { capture: true });
  };
}
