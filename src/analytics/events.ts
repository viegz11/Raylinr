// ─────────────────────────────────────────────────────────────────────────────
// Event Factory Functions
// ─────────────────────────────────────────────────────────────────────────────
// Pre-built, type-safe event creators for every trackable action.
// Components import these instead of constructing events manually.
//
// PRIVACY: Email domains are extracted from addresses (never the full email).
// No contract content, proposal text, or PII is ever included.

import {
  AnalyticsEvent,
  type AnalyticsEventName,
  type WaitlistClickProperties,
  type WaitlistSuccessProperties,
  type WaitlistErrorProperties,
  type UploadStartedProperties,
  type UploadCompletedProperties,
  type UploadFailedProperties,
  type CompareStartedProperties,
  type CompareCompletedProperties,
  type ExportProperties,
  type FeatureClickProperties,
  type PricingClickProperties,
  type CTAClickProperties,
  type FAQExpandProperties,
  type SocialClickProperties,
  type ContactClickProperties,
  type DemoClickProperties,
  type NavbarClickProperties,
  type FooterClickProperties,
  type ScrollDepthProperties,
  type OutboundLinkProperties,
  type DownloadProperties,
  type SearchProperties,
  type ErrorOccurredProperties,
  type SectionViewedProperties,
  type PerformanceMetricProperties,
} from './types';

interface TrackedEvent<T> {
  event: AnalyticsEventName;
  properties: T;
}

// ── Waitlist Funnel ──────────────────────────────────────────────────────────

export function trackWaitlistClick(source: string): TrackedEvent<WaitlistClickProperties> {
  return { event: AnalyticsEvent.WAITLIST_CLICK, properties: { source } };
}

export function trackWaitlistSuccess(
  source: string,
  email: string,
  isDuplicate: boolean
): TrackedEvent<WaitlistSuccessProperties> {
  // PRIVACY: Only extract the domain — never send the full email
  const domain = email.includes('@') ? email.split('@')[1] : 'unknown';
  return {
    event: AnalyticsEvent.WAITLIST_SUCCESS,
    properties: { source, email_domain: domain, is_duplicate: isDuplicate },
  };
}

export function trackWaitlistError(
  source: string,
  errorType: string
): TrackedEvent<WaitlistErrorProperties> {
  return {
    event: AnalyticsEvent.WAITLIST_ERROR,
    properties: { source, error_type: errorType },
  };
}

// ── Upload Funnel ────────────────────────────────────────────────────────────

export function trackUploadStarted(fileType: string): TrackedEvent<UploadStartedProperties> {
  return { event: AnalyticsEvent.UPLOAD_STARTED, properties: { file_type: fileType } };
}

export function trackUploadCompleted(
  fileType: string,
  durationMs: number
): TrackedEvent<UploadCompletedProperties> {
  return {
    event: AnalyticsEvent.UPLOAD_COMPLETED,
    properties: { file_type: fileType, duration_ms: durationMs },
  };
}

export function trackUploadFailed(
  fileType: string,
  errorType: string
): TrackedEvent<UploadFailedProperties> {
  return {
    event: AnalyticsEvent.UPLOAD_FAILED,
    properties: { file_type: fileType, error_type: errorType },
  };
}

// ── Comparison Funnel ────────────────────────────────────────────────────────

export function trackCompareStarted(source: string): TrackedEvent<CompareStartedProperties> {
  return { event: AnalyticsEvent.COMPARE_STARTED, properties: { source } };
}

export function trackCompareCompleted(
  clauseCount: number,
  riskCount: number,
  durationMs: number
): TrackedEvent<CompareCompletedProperties> {
  return {
    event: AnalyticsEvent.COMPARE_COMPLETED,
    properties: { clause_count: clauseCount, risk_count: riskCount, duration_ms: durationMs },
  };
}

// ── Export ────────────────────────────────────────────────────────────────────

export function trackExport(format: 'pdf' | 'docx' | 'link'): TrackedEvent<ExportProperties> {
  const eventMap = {
    pdf: AnalyticsEvent.EXPORT_PDF,
    docx: AnalyticsEvent.EXPORT_DOCX,
    link: AnalyticsEvent.EXPORT_LINK,
  } as const;
  return { event: eventMap[format], properties: { format } };
}

// ── Navigation ───────────────────────────────────────────────────────────────

export function trackNavbarClick(
  item: string,
  destination: string
): TrackedEvent<NavbarClickProperties> {
  return { event: AnalyticsEvent.NAVBAR_CLICK, properties: { item, destination } };
}

export function trackFooterClick(
  item: string,
  destination: string
): TrackedEvent<FooterClickProperties> {
  return { event: AnalyticsEvent.FOOTER_CLICK, properties: { item, destination } };
}

// ── Engagement ───────────────────────────────────────────────────────────────

export function trackFeatureClick(
  featureName: string,
  section: string
): TrackedEvent<FeatureClickProperties> {
  return {
    event: AnalyticsEvent.FEATURE_CLICK,
    properties: { feature_name: featureName, section },
  };
}

export function trackPricingClick(plan: string): TrackedEvent<PricingClickProperties> {
  return { event: AnalyticsEvent.PRICING_CLICK, properties: { plan } };
}

export function trackCTAClick(
  ctaId: string,
  location: string
): TrackedEvent<CTAClickProperties> {
  return { event: AnalyticsEvent.CTA_CLICK, properties: { cta_id: ctaId, location } };
}

export function trackFAQExpand(question: string): TrackedEvent<FAQExpandProperties> {
  return { event: AnalyticsEvent.FAQ_EXPAND, properties: { question } };
}

export function trackSocialClick(
  platform: string,
  location: string
): TrackedEvent<SocialClickProperties> {
  return { event: AnalyticsEvent.SOCIAL_CLICK, properties: { platform, location } };
}

export function trackContactClick(method: string): TrackedEvent<ContactClickProperties> {
  return { event: AnalyticsEvent.CONTACT_CLICK, properties: { method } };
}

export function trackDemoClick(location: string): TrackedEvent<DemoClickProperties> {
  return { event: AnalyticsEvent.DEMO_CLICK, properties: { location } };
}

// ── Content ──────────────────────────────────────────────────────────────────

export function trackScrollDepth(
  depth: 25 | 50 | 75 | 100,
  path: string
): TrackedEvent<ScrollDepthProperties> {
  return { event: AnalyticsEvent.SCROLL_DEPTH, properties: { depth, path } };
}

export function trackOutboundLink(
  url: string,
  linkText: string
): TrackedEvent<OutboundLinkProperties> {
  return { event: AnalyticsEvent.OUTBOUND_LINK, properties: { url, link_text: linkText } };
}

export function trackDownload(
  fileName: string,
  fileType: string
): TrackedEvent<DownloadProperties> {
  return { event: AnalyticsEvent.DOWNLOAD, properties: { file_name: fileName, file_type: fileType } };
}

export function trackSearch(
  query: string,
  resultsCount: number
): TrackedEvent<SearchProperties> {
  return { event: AnalyticsEvent.SEARCH, properties: { query, results_count: resultsCount } };
}

// ── Errors ───────────────────────────────────────────────────────────────────

export function trackError(
  errorType: string,
  message: string,
  pageUrl: string,
  stack?: string
): TrackedEvent<ErrorOccurredProperties> {
  return {
    event: AnalyticsEvent.ERROR_OCCURRED,
    properties: { error_type: errorType, message, page_url: pageUrl, stack },
  };
}

// ── Section Visibility ───────────────────────────────────────────────────────

export function trackSectionViewed(
  sectionId: string,
  sectionName: string
): TrackedEvent<SectionViewedProperties> {
  return {
    event: AnalyticsEvent.SECTION_VIEWED,
    properties: { section_id: sectionId, section_name: sectionName },
  };
}

// ── Performance Monitoring ───────────────────────────────────────────────────

export function trackPerformanceMetric(
  name: 'LCP' | 'FID' | 'CLS' | 'TTFB' | 'FCP',
  value: number,
  rating: 'good' | 'needs-improvement' | 'poor'
): TrackedEvent<PerformanceMetricProperties> {
  return {
    event: AnalyticsEvent.PERFORMANCE_METRIC,
    properties: { metric_name: name, metric_value: value, metric_rating: rating },
  };
}

