// ─────────────────────────────────────────────────────────────────────────────
// User & Custom Dimensions Tracking
// ─────────────────────────────────────────────────────────────────────────────
// Collects anonymous device/browser/traffic metadata for custom dimensions.
// PRIVACY: No PII is ever collected. Only anonymous metadata.

import type { CustomDimensions } from '../types';
import { isBrowser } from './environment';
import { getSessionId, getAnonymousId, isReturningUser } from './sessionTracking';

// ── Device & Browser Detection ───────────────────────────────────────────────

function getDeviceType(): string {
  if (!isBrowser()) return 'unknown';
  const ua = navigator.userAgent;
  if (/Mobi|Android/i.test(ua)) return 'mobile';
  if (/Tablet|iPad/i.test(ua)) return 'tablet';
  return 'desktop';
}

function getBrowser(): string {
  if (!isBrowser()) return 'unknown';
  const ua = navigator.userAgent;
  if (ua.includes('Firefox')) return 'firefox';
  if (ua.includes('Edg')) return 'edge';
  if (ua.includes('Chrome') && !ua.includes('Edg')) return 'chrome';
  if (ua.includes('Safari') && !ua.includes('Chrome')) return 'safari';
  if (ua.includes('Opera') || ua.includes('OPR')) return 'opera';
  return 'other';
}

function getOS(): string {
  if (!isBrowser()) return 'unknown';
  const ua = navigator.userAgent;
  if (ua.includes('Win')) return 'windows';
  if (ua.includes('Mac')) return 'macos';
  if (ua.includes('Linux') && !ua.includes('Android')) return 'linux';
  if (ua.includes('Android')) return 'android';
  if (/iPhone|iPad|iPod/.test(ua)) return 'ios';
  return 'other';
}

function getScreenResolution(): string {
  if (!isBrowser()) return '';
  return `${screen.width}x${screen.height}`;
}

function getViewport(): string {
  if (!isBrowser()) return '';
  return `${window.innerWidth}x${window.innerHeight}`;
}

function getLanguage(): string {
  if (!isBrowser()) return '';
  return navigator.language || '';
}

function getTheme(): 'light' | 'dark' | 'system' {
  if (!isBrowser()) return 'system';
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
  return 'system';
}

// ── UTM Parameters ───────────────────────────────────────────────────────────

const UTM_STORAGE_KEY = 'rlnr_utm_params';

interface UTMParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
}

function extractUTMParams(): UTMParams {
  const empty: UTMParams = {
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_term: '',
    utm_content: '',
  };

  if (!isBrowser()) return empty;

  const params = new URLSearchParams(window.location.search);
  const utm: UTMParams = {
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
    utm_term: params.get('utm_term') || '',
    utm_content: params.get('utm_content') || '',
  };

  // Persist UTM params for the session (first-touch attribution)
  const hasUTM = Object.values(utm).some((v) => v.length > 0);
  if (hasUTM) {
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utm));
    return utm;
  }

  // Fall back to stored UTM params from this session
  const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as UTMParams;
    } catch {
      return empty;
    }
  }

  return empty;
}

// ── Landing Page ─────────────────────────────────────────────────────────────

const LANDING_PAGE_KEY = 'rlnr_landing_page';

function getLandingPage(): string {
  if (!isBrowser()) return '';

  let landingPage = sessionStorage.getItem(LANDING_PAGE_KEY);
  if (!landingPage) {
    landingPage = window.location.pathname + window.location.search;
    sessionStorage.setItem(LANDING_PAGE_KEY, landingPage);
  }
  return landingPage;
}

// ── Collect All Custom Dimensions ────────────────────────────────────────────

export function collectCustomDimensions(): CustomDimensions {
  const utm = extractUTMParams();

  return {
    // Device & Browser
    device_type: getDeviceType(),
    browser: getBrowser(),
    os: getOS(),
    screen_resolution: getScreenResolution(),
    viewport: getViewport(),
    language: getLanguage(),
    theme: getTheme(),

    // Traffic Source
    referrer: isBrowser() ? document.referrer : '',
    utm_source: utm.utm_source,
    utm_medium: utm.utm_medium,
    utm_campaign: utm.utm_campaign,
    utm_term: utm.utm_term,
    utm_content: utm.utm_content,
    landing_page: getLandingPage(),

    // Session
    session_id: getSessionId(),
    anonymous_id: getAnonymousId(),
    is_returning_user: isReturningUser(),
  };
}
