export const projectTopics = {
  website: "Website or web application",
  traveltech: "TravelTech or booking platform",
  integration: "API integration",
  improvements: "Existing platform improvements",
  other: "Something else",
} as const;

export const hiringTopics = {
  "full-time": "Full-time remote role",
  freelance: "Freelance project",
  contract: "Contract opportunity",
  agency: "Agency collaboration",
} as const;

const topics = { ...projectTopics, ...hiringTopics };
export type InquiryTopic = keyof typeof topics;

type Query = Pick<URLSearchParams, "get">;

export function readCompanionInquiry(query: Query) {
  const topic = query.get("topic");
  const referred = query.get("via") === "bit";
  const category = referred && topic && Object.hasOwn(topics, topic) ? topic as InquiryTopic : undefined;
  return { referred, category, subject: category ? topics[category] : undefined };
}

export function companionContactHref(topic?: InquiryTopic) {
  const query = new URLSearchParams({ via: "bit" });
  if (topic) query.set("topic", topic);
  return "/contact?" + query.toString() + "#contact-form";
}

export function companionWhatsAppHref(destination: string | undefined, topic?: InquiryTopic) {
  if (!destination) return undefined;
  try {
    const url = new URL(destination);
    if (url.protocol !== "https:" || url.username || url.password || url.port) return undefined;
    const number = url.hostname === "wa.me" && /^\/\d{7,15}\/?$/.test(url.pathname)
      ? url.pathname.replaceAll("/", "")
      : url.hostname === "api.whatsapp.com" && url.pathname === "/send"
        ? url.searchParams.get("phone") : undefined;
    if (!number || !/^\d{7,15}$/.test(number)) return undefined;

    const message = topic
      ? "Hi Aabi, I visited your portfolio and would like to discuss this inquiry: " + topics[topic] + "."
      : "Hi Aabi, I visited your portfolio and would like to discuss a development project.";
    return "https://wa.me/" + number + "?" + new URLSearchParams({ text: message });
  } catch {
    return undefined;
  }
}
