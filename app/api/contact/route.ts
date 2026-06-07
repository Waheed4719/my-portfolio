import { NextResponse } from 'next/server';

const CONTACT_EMAIL = 'dmc4719@gmail.com';

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  company?: string;
};

function getEmailJsConfig() {
  const serviceId =
    process.env.EMAILJS_SERVICE_ID ??
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId =
    process.env.EMAILJS_TEMPLATE_ID ??
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey =
    process.env.EMAILJS_PUBLIC_KEY ??
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;

  return { serviceId, templateId, publicKey, privateKey };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const name = body.name?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();

    if (body.company) {
      return NextResponse.json({ success: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 },
      );
    }

    const { serviceId, templateId, publicKey, privateKey } =
      getEmailJsConfig();

    if (!serviceId || !templateId || !publicKey) {
      return NextResponse.json(
        {
          error:
            'Email service is not configured. Add EmailJS keys to .env.local.',
        },
        { status: 503 },
      );
    }

    const payload: Record<string, unknown> = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        from_name: name,
        name,
        reply_to: email,
        from_email: email,
        user_email: email,
        email,
        message,
        to_email: CONTACT_EMAIL,
        subject: `Portfolio message from ${name}`,
      },
    };

    if (privateKey) {
      payload.accessToken = privateKey;
    }

    const response = await fetch(
      'https://api.emailjs.com/api/v1.0/email/send',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      const details = await response.text();
      console.error('EmailJS send failed:', details);
      return NextResponse.json(
        { error: 'Could not send your message. Please try again later.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 },
    );
  }
}
