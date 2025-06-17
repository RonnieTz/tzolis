import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this to other services like 'outlook', 'yahoo', etc.
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_APP_PASSWORD, // Your email app password (not regular password)
  },
});

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

    // Send email notification via Nodemailer
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
      await transporter.sendMail({
        from: process.env.EMAIL_USER, // Your email address
        to: 'contact@tzolis.gr', // Replace with your actual email
        subject: `Contact Form: ${subject}`,
        html: emailContent,
        replyTo: email, // This allows you to reply directly to the person who submitted the form
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
