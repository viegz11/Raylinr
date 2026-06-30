'use client'

import { useState } from 'react'
import { useAnalytics } from '@/analytics/hooks/useAnalytics'
import { AnalyticsEvent } from '@/analytics/types'

interface FormState {
  status: 'idle' | 'loading' | 'success' | 'error'
  message: string
}

export default function WaitlistForm({ source = 'landing_page' }: { source?: string }) {
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [form, setForm] = useState<FormState>({ status: 'idle', message: '' })
  const { track } = useAnalytics()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    // Track waitlist click (form submission intent)
    track(AnalyticsEvent.WAITLIST_CLICK, { source })

    setForm({ status: 'loading', message: '' })

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, company, role, source }),
      })

      const data = await res.json()

      if (data.success) {
        setForm({ status: 'success', message: data.message })

        // Track waitlist success — only domain, never full email
        const emailDomain = email.includes('@') ? email.split('@')[1] : 'unknown'
        track(AnalyticsEvent.WAITLIST_SUCCESS, {
          source,
          email_domain: emailDomain,
          is_duplicate: data.duplicate === true,
        })

        setEmail('')
        setCompany('')
        setRole('')
      } else {
        setForm({ status: 'error', message: data.error ?? 'Something went wrong.' })

        // Track waitlist error
        track(AnalyticsEvent.WAITLIST_ERROR, {
          source,
          error_type: 'api_error',
        })
      }
    } catch {
      setForm({ status: 'error', message: 'Network error. Please try again.' })

      // Track network error
      track(AnalyticsEvent.WAITLIST_ERROR, {
        source,
        error_type: 'network_error',
      })
    }
  }

  if (form.status === 'success') {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center">
        <div className="text-4xl">🎉</div>
        <p className="text-lg font-semibold text-brand-text-primary">{form.message}</p>
        <p className="text-sm text-brand-text-secondary">
          Early access opens soon. We'll email you directly.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-md mx-auto relative z-20">
      <input
        type="email"
        name="email"
        id="email"
        autoComplete="email"
        placeholder="Work email *"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="w-full bg-white dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3.5 text-brand-text-primary placeholder:text-brand-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all"
      />

      <input
        type="text"
        name="company"
        id="company"
        autoComplete="organization"
        placeholder="Company name"
        value={company}
        onChange={e => setCompany(e.target.value)}
        className="w-full bg-white dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3.5 text-brand-text-primary placeholder:text-brand-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all"
      />

      <select
        name="role"
        id="role"
        autoComplete="organization-title"
        value={role}
        onChange={e => setRole(e.target.value)}
        className="w-full bg-white dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3.5 text-brand-text-primary placeholder:text-brand-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all appearance-none"
      >
        <option value="" className="dark:bg-gray-900">Your role</option>
        <option value="Sales Director / VP Sales" className="dark:bg-gray-900">Sales Director / VP Sales</option>
        <option value="Procurement Manager" className="dark:bg-gray-900">Procurement Manager</option>
        <option value="In-House Counsel" className="dark:bg-gray-900">In-House Counsel</option>
        <option value="Founder / CEO" className="dark:bg-gray-900">Founder / CEO</option>
        <option value="Operations" className="dark:bg-gray-900">Operations</option>
        <option value="Other" className="dark:bg-gray-900">Other</option>
      </select>

      {form.status === 'error' && (
        <p className="text-brand-risk text-sm text-center">{form.message}</p>
      )}

      <button
        type="submit"
        disabled={form.status === 'loading' || !email}
        className="w-full bg-brand-text-primary text-brand-bg rounded-xl font-bold text-lg py-4 hover:bg-brand-text-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl relative overflow-hidden"
      >
        {form.status === 'loading' ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            Joining…
          </span>
        ) : (
          'Join Waitlist →'
        )}
      </button>

      <p className="text-center text-xs text-brand-text-secondary mt-2">
        No spam. Early access priority for SaaS sales teams.
      </p>
    </form>
  )
}

