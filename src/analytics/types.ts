// ─────────────────────────────────────────────────────────────────────────────
// Analytics Type System
// ─────────────────────────────────────────────────────────────────────────────
// All analytics types are defined here. No `any` types. Strict TypeScript.

// ── Event Names (snake_case) ─────────────────────────────────────────────────

export const AnalyticsEvent = {
  // Page & Navigation
  PAGE_VIEW: 'page_view',
  NAVBAR_CLICK: 'navbar_click',
  FOOTER_CLICK: 'footer_click',

  // Waitlist Funnel
  WAITLIST_CLICK: 'waitlist_click',
  WAITLIST_SUCCESS: 'waitlist_success',
  WAITLIST_ERROR: 'waitlist_error',

  // Upload Funnel
  UPLOAD_STARTED: 'upload_started',
  UPLOAD_COMPLETED: 'upload_completed',
  UPLOAD_FAILED: 'upload_failed',

  // Comparison Funnel
  COMPARE_STARTED: 'compare_started',
  COMPARE_COMPLETED: 'compare_completed',

  // Export
  EXPORT_PDF: 'export_pdf',
  EXPORT_DOCX: 'export_docx',
  EXPORT_LINK: 'export_link',

  // Engagement
  FEATURE_CLICK: 'feature_click',
  PRICING_CLICK: 'pricing_click',
  CTA_CLICK: 'cta_click',
  FAQ_EXPAND: 'faq_expand',
  SOCIAL_CLICK: 'social_click',
  CONTACT_CLICK: 'contact_click',
  DEMO_CLICK: 'demo_click',

  // Content
  SCROLL_DEPTH: 'scroll_depth',
  OUTBOUND_LINK: 'outbound_link',
  DOWNLOAD: 'download',
  SEARCH: 'search',

  // Auth & Account
  LOGIN: 'login',
  LOGOUT: 'logout',
  PROFILE_CREATED: 'profile_created',
  DOCUMENT_DELETED: 'document_deleted',

  // Errors
  ERROR_OCCURRED: 'error_occurred',

  // Sections viewed
  SECTION_VIEWED: 'section_viewed',

  // Performance Monitoring
  PERFORMANCE_METRIC: 'performance_metric',
} as const;

export type AnalyticsEventName = typeof AnalyticsEvent[keyof typeof AnalyticsEvent];

// ── Event Properties (discriminated union) ───────────────────────────────────

export interface PageViewProperties {
  path: string;
  title: string;
  referrer: string;
}

export interface NavbarClickProperties {
  item: string;
  destination: string;
}

export interface FooterClickProperties {
  item: string;
  destination: string;
}

export interface WaitlistClickProperties {
  source: string;
}

export interface WaitlistSuccessProperties {
  source: string;
  /** Only the domain part of the email, never the full address */
  email_domain: string;
  is_duplicate: boolean;
}

export interface WaitlistErrorProperties {
  source: string;
  error_type: string;
}

export interface UploadStartedProperties {
  file_type: string;
}

export interface UploadCompletedProperties {
  file_type: string;
  duration_ms: number;
}

export interface UploadFailedProperties {
  file_type: string;
  error_type: string;
}

export interface CompareStartedProperties {
  source: string;
}

export interface CompareCompletedProperties {
  clause_count: number;
  risk_count: number;
  duration_ms: number;
}

export interface ExportProperties {
  format: 'pdf' | 'docx' | 'link';
}

export interface FeatureClickProperties {
  feature_name: string;
  section: string;
}

export interface PricingClickProperties {
  plan: string;
}

export interface CTAClickProperties {
  cta_id: string;
  location: string;
}

export interface FAQExpandProperties {
  question: string;
}

export interface SocialClickProperties {
  platform: string;
  location: string;
}

export interface ContactClickProperties {
  method: string;
}

export interface DemoClickProperties {
  location: string;
}

export interface ScrollDepthProperties {
  depth: 25 | 50 | 75 | 100;
  path: string;
}

export interface OutboundLinkProperties {
  url: string;
  link_text: string;
}

export interface DownloadProperties {
  file_name: string;
  file_type: string;
}

export interface SearchProperties {
  query: string;
  results_count: number;
}

export interface ErrorOccurredProperties {
  error_type: string;
  message: string;
  page_url: string;
  stack?: string;
}

export interface SectionViewedProperties {
  section_id: string;
  section_name: string;
}

export interface PerformanceMetricProperties {
  metric_name: 'LCP' | 'FID' | 'CLS' | 'TTFB' | 'FCP';
  metric_value: number;
  metric_rating: 'good' | 'needs-improvement' | 'poor';
}

export interface EmptyProperties {
  [key: string]: string | number | boolean | undefined;
}

// Map event names to their properties
export interface AnalyticsEventMap {
  [AnalyticsEvent.PAGE_VIEW]: PageViewProperties;
  [AnalyticsEvent.NAVBAR_CLICK]: NavbarClickProperties;
  [AnalyticsEvent.FOOTER_CLICK]: FooterClickProperties;
  [AnalyticsEvent.WAITLIST_CLICK]: WaitlistClickProperties;
  [AnalyticsEvent.WAITLIST_SUCCESS]: WaitlistSuccessProperties;
  [AnalyticsEvent.WAITLIST_ERROR]: WaitlistErrorProperties;
  [AnalyticsEvent.UPLOAD_STARTED]: UploadStartedProperties;
  [AnalyticsEvent.UPLOAD_COMPLETED]: UploadCompletedProperties;
  [AnalyticsEvent.UPLOAD_FAILED]: UploadFailedProperties;
  [AnalyticsEvent.COMPARE_STARTED]: CompareStartedProperties;
  [AnalyticsEvent.COMPARE_COMPLETED]: CompareCompletedProperties;
  [AnalyticsEvent.EXPORT_PDF]: ExportProperties;
  [AnalyticsEvent.EXPORT_DOCX]: ExportProperties;
  [AnalyticsEvent.EXPORT_LINK]: ExportProperties;
  [AnalyticsEvent.FEATURE_CLICK]: FeatureClickProperties;
  [AnalyticsEvent.PRICING_CLICK]: PricingClickProperties;
  [AnalyticsEvent.CTA_CLICK]: CTAClickProperties;
  [AnalyticsEvent.FAQ_EXPAND]: FAQExpandProperties;
  [AnalyticsEvent.SOCIAL_CLICK]: SocialClickProperties;
  [AnalyticsEvent.CONTACT_CLICK]: ContactClickProperties;
  [AnalyticsEvent.DEMO_CLICK]: DemoClickProperties;
  [AnalyticsEvent.SCROLL_DEPTH]: ScrollDepthProperties;
  [AnalyticsEvent.OUTBOUND_LINK]: OutboundLinkProperties;
  [AnalyticsEvent.DOWNLOAD]: DownloadProperties;
  [AnalyticsEvent.SEARCH]: SearchProperties;
  [AnalyticsEvent.LOGIN]: EmptyProperties;
  [AnalyticsEvent.LOGOUT]: EmptyProperties;
  [AnalyticsEvent.PROFILE_CREATED]: EmptyProperties;
  [AnalyticsEvent.DOCUMENT_DELETED]: EmptyProperties;
  [AnalyticsEvent.ERROR_OCCURRED]: ErrorOccurredProperties;
  [AnalyticsEvent.SECTION_VIEWED]: SectionViewedProperties;
  [AnalyticsEvent.PERFORMANCE_METRIC]: PerformanceMetricProperties;
}

// ── Custom Dimensions ────────────────────────────────────────────────────────

export interface CustomDimensions {
  // Device & Browser
  device_type: string;
  browser: string;
  os: string;
  screen_resolution: string;
  viewport: string;
  language: string;
  theme: 'light' | 'dark' | 'system';

  // Traffic Source
  referrer: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  landing_page: string;

  // Session
  session_id: string;
  anonymous_id: string;
  is_returning_user: boolean;

  // Location (populated by GA4 automatically)
  country?: string;
  region?: string;
}

// ── Provider Interface ───────────────────────────────────────────────────────

export interface AnalyticsProviderInterface {
  /** Unique name for this provider (used in logs and feature flags) */
  readonly name: string;

  /** Initialize the provider. Called once after consent (if required). */
  initialize(): void;

  /** Track a named event with properties */
  track(event: string, properties?: Record<string, unknown>): void;

  /** Track a page view */
  page(path: string, properties?: Record<string, unknown>): void;

  /** Identify a user */
  identify(userId: string, traits?: Record<string, unknown>): void;

  /** Reset user identity */
  reset(): void;

  /** Whether this provider requires cookie consent */
  readonly requiresConsent: boolean;

  /** Whether this provider has been initialized */
  readonly isInitialized: boolean;
}

// ── Consent ──────────────────────────────────────────────────────────────────

export type ConsentState = 'granted' | 'denied' | 'pending';

// ── Configuration ────────────────────────────────────────────────────────────

export interface AnalyticsConfig {
  // Provider IDs
  gaMeasurementId: string;
  gtmId: string;
  clarityId: string;

  // Environment
  appEnv: 'production' | 'development' | 'preview';
  isProduction: boolean;

  // Feature Flags
  analyticsEnabled: boolean;
  gaEnabled: boolean;
  clarityEnabled: boolean;
  vercelEnabled: boolean;
}
