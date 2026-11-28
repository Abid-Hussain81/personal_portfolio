import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BriefcaseBusiness, ChevronRight, Compass, FileText, Globe, Handshake, Mail, MessageCircle, Network, Plane, Shapes, Wrench, X, type LucideIcon } from "lucide-react";
import type { RefObject } from "react";
import { companionContactHref, companionWhatsAppHref, hiringTopics, projectTopics, type InquiryTopic } from "@/lib/companion-inquiry";
import type { CompanionEvent } from "@/lib/companion-analytics";

export type PanelView =
  | { step: "home" | "project" | "hire" | "explore" }
  | { step: "project-contact"; topic: keyof typeof projectTopics }
  | { step: "hire-contact"; topic: keyof typeof hiringTopics };

type Destination = { id: string; label: string; Icon: LucideIcon; href?: string; event?: CompanionEvent; external?: boolean; category?: InquiryTopic };

const projectIcons = { website: Globe, traveltech: Plane, integration: Network, improvements: Wrench, other: Shapes };
const hiringIcons = { "full-time": BriefcaseBusiness, freelance: Shapes, contract: FileText, agency: Handshake };

const shortcuts: Destination[] = [
  { id: "demos", label: "Engineering demonstrations", Icon: Network, href: "/#capabilities", event: "mascot_portfolio_click" },
  { id: "experience", label: "Professional experience", Icon: BriefcaseBusiness, href: "/#experience", event: "mascot_portfolio_click" },
  { id: "projects", label: "Projects", Icon: Shapes, href: "/projects", event: "mascot_portfolio_click" },
  { id: "skills", label: "Technical skills", Icon: Wrench, href: "/skills", event: "mascot_portfolio_click" },
  { id: "resume", label: "Résumé", Icon: FileText, href: "/resume", event: "mascot_resume_click" },
];

function Choice({ Icon, label, onClick }: { Icon: LucideIcon; label: string; onClick: () => void }) {
  return (
    <button type="button" className="bit-option" onClick={onClick}>
      <Icon size={16} aria-hidden="true" />
      <span>{label}</span>
      <ChevronRight size={14} aria-hidden="true" />
    </button>
  );
}

function DestinationLink({ destination, onChoose }: { destination: Destination; onChoose: (destination: Destination) => void }) {
  const { Icon, href, label, external } = destination;
  const content = <><Icon size={16} aria-hidden="true" /><span>{label}</span><ArrowUpRight size={13} aria-hidden="true" /></>;
  if (!href) {
    return (
      <button type="button" className="bit-option" disabled>
        <Icon size={16} aria-hidden="true" />
        <span>{label}<small>Unavailable</small></span>
      </button>
    );
  }
  if (external) {
    return <a className="bit-option" href={href} target="_blank" rel="noopener noreferrer" onClick={() => onChoose(destination)}>{content}</a>;
  }
  return <Link className="bit-option" href={href} onNavigate={() => onChoose(destination)}>{content}</Link>;
}

const headings = {
  home: "Hey, I’m Bit!",
  project: "What are you planning to build?",
  hire: "What type of opportunity?",
  explore: "Explore the portfolio",
  "project-contact": "How would you like to continue?",
  "hire-contact": "Continue the conversation",
};

type PanelProps = {
  view: PanelView;
  heading: RefObject<HTMLHeadingElement | null>;
  muted: boolean;
  whatsapp?: string;
  onView: (view: PanelView) => void;
  onDestination: (destination: Destination) => void;
  onClose: () => void;
  onMute: () => void;
  onHide: () => void;
};

export function CompanionPanel({ view, heading, muted, whatsapp, onView, onDestination, onClose, onMute, onHide }: PanelProps) {
  const { step } = view;
  const topic = "topic" in view ? view.topic : undefined;
  const whatsappDestination: Destination = {
    id: "whatsapp", label: step === "home" ? "Chat on WhatsApp" : "WhatsApp", Icon: MessageCircle,
    href: companionWhatsAppHref(whatsapp, topic), external: true, event: "mascot_whatsapp_click", category: topic,
  };
  const contact: Destination = {
    id: "contact", label: step === "project-contact" ? "Contact form" : "Contact Aabi", Icon: Mail,
    href: companionContactHref(topic), event: "mascot_contact_click", category: topic,
  };
  const link = (destination: Destination) => <DestinationLink key={destination.id} destination={destination} onChoose={onDestination} />;
  const back = step === "project-contact" ? "project" : step === "hire-contact" ? "hire" : "home";

  return (
    <div id="bit-panel" className="bit-panel" role="dialog" aria-labelledby="bit-panel-heading" data-step={step}>
      <div className="bit-panel-toolbar">
        {step !== "home" && <button type="button" className="bit-back" onClick={() => onView({ step: back })}><ArrowLeft size={15} aria-hidden="true" />Back</button>}
        <button type="button" className="bit-icon-button bit-close" aria-label="Close Bit" onClick={onClose}><X size={17} aria-hidden="true" /></button>
      </div>
      <div key={step} className="bit-panel-step">
        <h2 id="bit-panel-heading" ref={heading} tabIndex={-1}>{headings[step]}</h2>
        {step === "home" && <p>Abid’s little digital companion. How can I help?</p>}
        {step === "project-contact" && <p>{projectTopics[view.topic]}</p>}
        {step === "hire-contact" && <p>{hiringTopics[view.topic]}</p>}
        <div className="bit-options">
          {step === "home" && <>
            <Choice Icon={MessageCircle} label="Discuss a project" onClick={() => onView({ step: "project" })} />
            <Choice Icon={BriefcaseBusiness} label="Hire Aabi" onClick={() => onView({ step: "hire" })} />
            <Choice Icon={Compass} label="Explore the portfolio" onClick={() => onView({ step: "explore" })} />
            {link(whatsappDestination)}
          </>}
          {step === "project" && Object.entries(projectTopics).map(([id, label]) => {
            const category = id as keyof typeof projectTopics;
            return <Choice key={id} Icon={projectIcons[category]} label={label} onClick={() => onView({ step: "project-contact", topic: category })} />;
          })}
          {step === "hire" && Object.entries(hiringTopics).map(([id, label]) => {
            const category = id as keyof typeof hiringTopics;
            return <Choice key={id} Icon={hiringIcons[category]} label={label} onClick={() => onView({ step: "hire-contact", topic: category })} />;
          })}
          {step === "explore" && shortcuts.map(link)}
          {step === "hire-contact" && link({ ...shortcuts[4], label: "View résumé" })}
          {topic && link(contact)}
          {topic && link(whatsappDestination)}
        </div>
      </div>
      {step === "home" && <div className="bit-preferences">
        <button type="button" onClick={onMute}>{muted ? "Unmute tips" : "Mute tips"}</button>
        <button type="button" onClick={onHide}>Hide Bit</button>
      </div>}
    </div>
  );
}

export type { Destination };
