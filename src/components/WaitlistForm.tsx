'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

interface FormState {
  status: 'idle' | 'loading' | 'success' | 'error'
  message: string
}

export default function WaitlistForm({ source = 'landing_page' }: { source?: string }) {
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [form, setForm] = useState<FormState>({ status: 'idle', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

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
        setEmail('')
        setCompany('')
        setRole('')
      } else {
        setForm({ status: 'error', message: data.error ?? 'Something went wrong.' })
      }
    } catch {
      setForm({ status: 'error', message: 'Network error. Please try again.' })
    }
  }

  if (form.status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-brand-success/10 border border-brand-success/20 rounded-2xl text-center">
        <CheckCircle2 className="w-16 h-16 text-brand-success mb-4" />
        <h3 className="text-xl font-bold text-brand-text-primary mb-2">You're on the list!</h3>
        <p className="text-brand-text-secondary">{form.message}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      {/* Email */}
      <div>
        <label htmlFor={`email-${source}`} className="sr-only">Work Email</label>
        <input
          type="email"
          id={`email-${source}`}
          required
          placeholder="Work email *"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full bg-white border border-black/10 rounded-xl px-4 py-3.5 text-brand-text-primary placeholder:text-brand-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Company */}
        <div>
          <label htmlFor={`company-${source}`} className="sr-only">Company Name</label>
          <input
            type="text"
            id={`company-${source}`}
            placeholder="Company name"
            value={company}
            onChange={e => setCompany(e.target.value)}
            className="w-full bg-white border border-black/10 rounded-xl px-4 py-3.5 text-brand-text-primary placeholder:text-brand-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all"
          />
        </div>

        {/* Role */}
        <div>
          <label htmlFor={`role-${source}`} className="sr-only">Role</label>
          <select
            id={`role-${source}`}
            value={role}
            onChange={e => setRole(e.target.value)}
            className="w-full bg-white border border-black/10 rounded-xl px-4 py-3.5 text-brand-text-primary focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all appearance-none"
          >
            <option value="" className="text-brand-text-secondary">Your role</option>
            <option value="Sales Director / VP Sales">Sales Director / VP Sales</option>
            <option value="Procurement Manager">Procurement Manager</option>
            <option value="In-House Counsel">In-House Counsel</option>
            <option value="Founder / CEO">Founder / CEO</option>
            <option value="Operations">Operations</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Error Message */}
      {form.status === 'error' && (
        <div className="text-brand-risk text-sm text-center font-medium">
          {form.message}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={form.status === 'loading' || !email}
        className="w-full bg-brand-text-primary text-brand-bg rounded-xl font-bold text-lg py-4 hover:bg-brand-text-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,0,0,0.1)] hover:shadow-[0_0_30px_rgba(0,0,0,0.2)]"
      >
        {form.status === 'loading' ? (
          <div className="w-6 h-6 border-2 border-brand-bg border-t-transparent rounded-full animate-spin" />
        ) : (
          <>Join Waitlist <ArrowRight className="w-5 h-5" /></>
        )}
      </button>
    </form>
  )
}
