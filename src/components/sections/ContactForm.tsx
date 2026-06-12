"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle } from "lucide-react";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type ContactFormProps = {
  className?: string;
};

const inputClass =
  "w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/15";

export function ContactForm({ className }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center rounded-2xl border border-border bg-white p-10 text-center shadow-sm",
          className,
        )}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 border border-green-200">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="mt-5 text-xl font-semibold text-foreground">
          Message Sent!
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
          Thank you for reaching out. I&apos;ll get back to you at{" "}
          <span className="font-medium text-foreground">{profile.email}</span>{" "}
          within 24–48 hours.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setSubmitted(false)}
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8",
        className,
      )}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
            Name <span className="text-primary">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
            Email <span className="text-primary">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>
      </div>
      <div className="mt-5">
        <label htmlFor="subject" className="mb-2 block text-sm font-medium text-foreground">
          Subject <span className="text-primary">*</span>
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          placeholder="Project inquiry"
          className={inputClass}
        />
      </div>
      <div className="mt-5">
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
          Message <span className="text-primary">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell me about your project..."
          className={`${inputClass} resize-none`}
        />
      </div>
      <div className="mt-6">
        <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
