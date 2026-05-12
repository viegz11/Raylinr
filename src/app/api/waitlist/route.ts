import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, company, role, source } = body

    // --- Validation ---
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    if (email.length > 255) {
      return NextResponse.json(
        { error: 'Invalid email.' },
        { status: 400 }
      )
    }

    // --- Get IP for abuse detection ---
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
    const userAgent = req.headers.get('user-agent') ?? ''

    // --- Insert into Supabase ---
    const { data, error } = await supabaseAdmin
      .from('waitlist')
      .insert({
        email: email.toLowerCase().trim(),
        company: company?.trim() ?? null,
        role: role?.trim() ?? null,
        source: source ?? 'landing_page',
        ip_address: ip,
        user_agent: userAgent,
      })
      .select('id, created_at')
      .single()

    // --- Handle duplicate email gracefully ---
    if (error?.code === '23505') {
      // Unique constraint violation = email already registered
      return NextResponse.json({
        success: true,
        message: "You're already on the list! We'll be in touch soon.",
        duplicate: true,
      })
    }

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json(
        { error: 'Something went wrong. Please try again.' },
        { status: 500 }
      )
    }

    // --- : send welcome email via Resend ---
    // Uncomment this block after setting up Resend (Part 4 below)
    /*
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Raylinr <hello@raylinr.com>',
        to: email,
        subject: "You're on the Raylinr waitlist 🎉",
        html: `
          <p>Hi there,</p>
          <p>You're on the list for <strong>Raylinr</strong> — AI-powered contract comparison.</p>
          <p>We'll reach out when early access opens. Expect to hear from us soon.</p>
          <p>— The Raylinr team</p>
        `
      })
    })
    */

    return NextResponse.json({
      success: true,
      message: "You're on the waitlist! We'll reach out when early access opens.",
      id: data.id,
    })

  } catch (err) {
    console.error('Waitlist API error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
