import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message cannot be empty"),
  _gotcha: z.string().optional(),

});

type ContactData = z.infer<typeof ContactSchema>;

export async function POST(request: Request) {
  const body = await request.json();
  const parseResult = ContactSchema.safeParse(body);
  if (!parseResult.success) {
    return NextResponse.json({ error: "Invalid input", details: parseResult.error.format() }, { status: 400 });
  }
  const { name, email, subject, message, _gotcha } = parseResult.data;

  // Honeypot check – if filled, silently succeed
  if (_gotcha) return NextResponse.json({ ok: true }, { status: 200 });

  // reCAPTCHA verification removed

  // Nodemailer transport (Gmail SMTP)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: "New Portfolio Contact Form Submission",
    text: `New contact form submission (${new Date().toISOString()}):\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage:\n${message}\n`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
