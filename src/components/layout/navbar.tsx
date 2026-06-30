"use client";

import Link from "next/link";
import Image from "next/image";
import { useAnalytics } from "@/analytics/hooks/useAnalytics";
import { AnalyticsEvent } from "@/analytics/types";

export function Navbar() {
  const { track } = useAnalytics();

  return (
    <header className="fixed top-0 w-full z-50 glass border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image
              src="/raylinr_light.png"
              alt="raylinr Logo"
              width={40}
              height={40}
              style={{ width: 'auto' }}
              className="h-10 w-auto object-contain dark:hidden"
              priority
            />
            <Image
              src="/raylinr_dark.png"
              alt="raylinr Logo"
              width={40}
              height={40}
              style={{ width: 'auto' }}
              className="h-10 w-auto object-contain hidden dark:block"
              priority
            />
            <span className="text-2xl font-bold tracking-tight text-brand-text-primary">
              rayl<span className="text-brand-accent">i</span>nr
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex gap-8 items-center text-sm font-medium text-brand-text-secondary">
          <Link
            href="#how-it-works"
            className="hover:text-brand-text-primary transition-colors"
            onClick={() => track(AnalyticsEvent.NAVBAR_CLICK, { item: 'how_it_works', destination: '#how-it-works' })}
          >How it Works</Link>
          <Link
            href="#features"
            className="hover:text-brand-text-primary transition-colors"
            onClick={() => track(AnalyticsEvent.NAVBAR_CLICK, { item: 'features', destination: '#features' })}
          >Features</Link>
          <Link
            href="#demo"
            className="hover:text-brand-text-primary transition-colors"
            onClick={() => track(AnalyticsEvent.NAVBAR_CLICK, { item: 'demo', destination: '#demo' })}
          >Demo</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="#waitlist"
            className="text-sm font-medium hidden sm:block text-brand-text-primary hover:text-brand-accent transition-colors"
            onClick={() => track(AnalyticsEvent.CTA_CLICK, { cta_id: 'sign_in', location: 'navbar' })}
          >
            Sign In
          </Link>
          <Link
            href="#waitlist"
            className="bg-brand-accent text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-brand-accent/90 transition-colors shadow-md"
            onClick={() => track(AnalyticsEvent.CTA_CLICK, { cta_id: 'join_waitlist', location: 'navbar' })}
          >
            Join Waitlist
          </Link>
        </div>
      </div>
    </header>
  );
}
