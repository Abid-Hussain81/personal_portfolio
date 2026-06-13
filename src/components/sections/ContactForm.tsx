// Contact form component without reCAPTCHA integration
"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle } from "lucide-react";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type ContactFormProps = {
  className?: string;
};

const inputClass =
  "w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/15";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message cannot be empty"),
  _gotcha: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function ContactForm({ className }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Server error");
      setSubmitted(true);
      reset();
    } catch (e) {
      console.error(e);
      alert("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className={cn("flex flex-col items-center justify-center rounded-2xl border border-border bg-white p-10 text-center shadow-sm", className)}>
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 border border-green-200">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="mt-5 text-xl font-semibold text-foreground">Message Sent!</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
          Thank you for reaching out. I&apos;ll get back to you at{' '}
          <span className="font-medium text-foreground">{profile.email}</span>{' '}within 24–48 hours.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8", className)}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
            Name <span className="text-primary">*</span>
          </label>
          <input id="name" {...register("name")} placeholder="Your name" className={inputClass + (errors.name ? " border-red-500" : "")} />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
            Email <span className="text-primary">*</span>
          </label>
          <input id="email" {...register("email")} placeholder="you@example.com" className={inputClass + (errors.email ? " border-red-500" : "")} />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>
      </div>
      <div className="mt-5">
        <label htmlFor="subject" className="mb-2 block text-sm font-medium text-foreground">
          Subject <span className="text-primary">*</span>
        </label>
        <input id="subject" {...register("subject")} placeholder="Project inquiry" className={inputClass + (errors.subject ? " border-red-500" : "")} />
        {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>}
      </div>
      <div className="mt-5">
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
          Message <span className="text-primary">*</span>
        </label>
        <textarea id="message" {...register("message")} rows={5} placeholder="Tell me about your project..." className={`${inputClass} resize-none ${errors.message ? "border-red-500" : ""}`} />
        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
      </div>
      {/* Honeypot field */}
      <input type="text" {...register("_gotcha")} className="hidden" />
      <div className="mt-6">
        <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
