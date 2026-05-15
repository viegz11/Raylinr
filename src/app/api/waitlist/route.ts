import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    // --- Parse Request Body ---
    const body = await req.json()
    const { email, company, role, source } = body

    // --- Validation ---
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    if (email.length > 255) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      )
    }

    // --- Get IP + User Agent ---
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      'unknown'

    const userAgent = req.headers.get('user-agent') ?? ''

    // --- Save to Supabase ---
    const { data, error } = await supabaseAdmin
      .from('waitlist')
      .insert({
        email: email.toLowerCase().trim(),
        company: company?.trim() || null,
        role: role?.trim() || null,
        source: source || 'landing_page',
        ip_address: ip,
        user_agent: userAgent,
      })
      .select('id, created_at')
      .single()

    // --- Duplicate Email Handling ---
    if (error?.code === '23505') {
      return NextResponse.json({
        success: true,
        duplicate: true,
        message: "You're already on the waitlist!",
      })
    }

    // --- Supabase Error ---
    if (error) {
      console.error('Supabase insert error:', error)

      return NextResponse.json(
        { error: 'Database error. Please try again.' },
        { status: 500 }
      )
    }
    /*
    // --- Send Confirmation Email via Resend ---
    try {
      const resendResponse = await fetch(
        'https://api.resend.com/emails',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Raylinr <onboarding@resend.dev>',
            to: email,
            subject: "You're on the Raylinr waitlist 🎉",
            html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2>Welcome to Raylinr 🚀</h2>

                <p>Hi there,</p>

                <p>
                  You're officially on the waitlist for
                  <strong>Raylinr</strong> —
                  AI-powered contract comparison.
                </p>

                <p>
                  We'll let you know as soon as early access opens.
                </p>

                <p>Thanks for joining us.</p>

                <p>
                  — The Raylinr Team
                </p>
              </div>
            `,
          }),
        }
      )

      const resendData = await resendResponse.json()

      console.log('Resend response:', resendData)

      if (!resendResponse.ok) {
        console.error('Resend failed:', resendData)
      }
    } catch (emailError) {
      // Don't fail the whole request if email fails
      console.error('Email sending error:', emailError)
    }
    */
    // --- Success Response ---
    return NextResponse.json({
      success: true,
      message:
        "You're on the waitlist! We'll reach out when early access opens.",
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