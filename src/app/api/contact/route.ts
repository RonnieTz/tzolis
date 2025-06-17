import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';

// Create Resend instance
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Connect to database
    await dbConnect();

    // Save to database
    const contactMessage = new Contact({
      name,
      email,
      phone: phone || '',
      subject,
      message,
    });

    await contactMessage.save();

    // Send email notification via Resend
    const emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
    `;

    try {
      await resend.emails.send({
        from: 'noreply@tzolis.gr', // Replace with your verified domain
        to: 'contact@tzolis.gr',
        subject: `Contact Form: ${subject}`,
        html: emailContent,
        replyTo: email,
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Continue even if email fails - message is still saved to database
    }

    return NextResponse.json(
      { message: 'Contact form submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}
