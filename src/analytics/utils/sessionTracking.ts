// ─────────────────────────────────────────────────────────────────────────────
// Session & Identity Tracking
// ─────────────────────────────────────────────────────────────────────────────
// Generates and persists session IDs, anonymous IDs, and returning-user flags.
// All data stored in sessionStorage / localStorage (no PII, no cookies).

import { isBrowser } from './environment';

// ── Session ID (per browser tab session) ─────────────────────────────────────

const SESSION_ID_KEY = 'rlnr_session_id';

/** Generate a UUID v4 (browser-safe, no crypto dependency) */
function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older browsers
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getSessionId(): string {
  if (!isBrowser()) return '';

  let sessionId = sessionStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = generateId();
    sessionStorage.setItem(SESSION_ID_KEY, sessionId);
  }
  return sessionId;
}

// ── Anonymous ID (persistent across sessions) ────────────────────────────────

const ANON_ID_KEY = 'rlnr_anon_id';

export function getAnonymousId(): string {
  if (!isBrowser()) return '';

  let anonId = localStorage.getItem(ANON_ID_KEY);
  if (!anonId) {
    anonId = generateId();
    localStorage.setItem(ANON_ID_KEY, anonId);
  }
  return anonId;
}

// ── Returning User Detection ─────────────────────────────────────────────────

const RETURNING_KEY = 'rlnr_has_visited';

export function isReturningUser(): boolean {
  if (!isBrowser()) return false;
  return localStorage.getItem(RETURNING_KEY) === 'true';
}

/** Mark the current user as having visited before. Call once on first page load. */
export function markUserVisit(): void {
  if (!isBrowser()) return;
  localStorage.setItem(RETURNING_KEY, 'true');
}

// ── Session Timing ───────────────────────────────────────────────────────────

const SESSION_START_KEY = 'rlnr_session_start';

export function getSessionStartTime(): number {
  if (!isBrowser()) return Date.now();

  const stored = sessionStorage.getItem(SESSION_START_KEY);
  if (stored) return parseInt(stored, 10);

  const now = Date.now();
  sessionStorage.setItem(SESSION_START_KEY, String(now));
  return now;
}

/** Get session duration in milliseconds */
export function getSessionDuration(): number {
  return Date.now() - getSessionStartTime();
}
