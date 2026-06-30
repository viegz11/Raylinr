// ─────────────────────────────────────────────────────────────────────────────
// Cookie Consent Banner Component
// ─────────────────────────────────────────────────────────────────────────────
// A premium, glassmorphism slide-up cookie banner that handles privacy choices.
// Gates Google Analytics 4 and Microsoft Clarity behind user consent.
// Renders inline, animates smoothly on mount, and respects dark/light themes.

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sparkles, X } from 'lucide-react';
import { analytics } from '@/analytics';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user already made a choice
    try {
      const consent = localStorage.getItem('raylinr_cookie_consent');
      if (!consent) {
        // Show banner after a slight delay to feel natural
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1500);
        return () => clearTimeout(timer);
      }
    } catch {
      // LocalStorage access issue, display banner just in case
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('raylinr_cookie_consent', 'granted');
    } catch {
      // Silent catch
    }
    analytics.setConsent('granted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('raylinr_cookie_consent', 'denied');
    } catch {
      // Silent catch
    }
    analytics.setConsent('denied');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-[9999] w-full max-w-md p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-brand-bg/85 backdrop-blur-xl shadow-2xl flex flex-col gap-4 text-left select-none"
        >
          {/* Subtle neon glowing accent */}
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-50" />

          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-brand-accent/10 rounded-lg text-brand-accent">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-brand-text-primary text-base flex items-center gap-1.5">
                Privacy Settings <Sparkles className="w-4 h-4 text-brand-accent-secondary" />
              </h4>
            </div>
            <button
              onClick={handleDecline}
              className="text-brand-text-secondary/50 hover:text-brand-text-primary transition-colors p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
              aria-label="Close settings"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Description */}
          <p className="text-sm text-brand-text-secondary leading-relaxed">
            We use privacy-first cookies and anonymous telemetry to measure site speed, count visits, and analyze landing page effectiveness. **We never track PII, email addresses, or contract data.**
          </p>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 mt-1">
            <button
              onClick={handleDecline}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-brand-text-secondary hover:text-brand-text-primary hover:bg-black/5 dark:hover:bg-white/5 transition-all"
            >
              Reject All
            </button>
            <button
              onClick={handleAccept}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-brand-text-primary text-brand-bg hover:opacity-90 transition-all shadow-md active:scale-98"
            >
              Accept All
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
