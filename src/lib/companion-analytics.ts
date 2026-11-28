import type { InquiryTopic } from "./companion-inquiry";

export type CompanionEvent =
  | "mascot_impression"
  | "mascot_click"
  | "mascot_message_impression"
  | "mascot_message_click"
  | "mascot_panel_open"
  | "mascot_panel_close"
  | "mascot_project_interest"
  | "mascot_hiring_interest"
  | "mascot_contact_click"
  | "mascot_whatsapp_click"
  | "mascot_resume_click"
  | "mascot_portfolio_click"
  | "mascot_dismiss"
  | "mascot_conversion";

type EventProperties = {
  section?: string;
  message?: string;
  action?: string;
  category?: InquiryTopic;
};

const publicPages = new Set(["/", "/about", "/blog", "/contact", "/projects", "/resume", "/services", "/skills", "/testimonials"]);

export function trackCompanion(event: CompanionEvent, properties: EventProperties = {}) {
  const pathname = window.location.pathname;
  const page = pathname.startsWith("/blog/") ? "/blog/[post]" : publicPages.has(pathname) ? pathname : "/other";
  const device = window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop";
  window.dispatchEvent(new CustomEvent("portfolio:companion", {
    detail: { event, page, device, ...properties },
  }));
}
