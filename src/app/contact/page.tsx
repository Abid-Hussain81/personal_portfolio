import type { Metadata } from "next";
import { ArrowUpRight, MapPin } from "lucide-react";
import { profile, socialLinks } from "@/data/profile";
import { socialIconMap, MailIcon } from "@/components/icons/SocialIcons";
import { Container } from "@/components/layout/Container";
import { InteriorPage, InteriorHero, InteriorPanel, InteriorReveal } from "@/components/layout/InteriorPage";
import { ContactForm } from "@/components/sections/ContactForm";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description: `Get in touch with ${profile.name} for freelance development projects, contracts and international remote roles.`,
  path: "/contact",
});

export default function ContactPage() {
  return <InteriorPage className="contact-page">
    <InteriorHero title="Good work starts" accent="with a conversation." description="A new product, an integration or an extra pair of hands. Tell me what you have in mind, and let's work through the next step." />
    <Container className="interior-content"><div className="contact-layout">
      <div className="interior-stack">
        <InteriorReveal><InteriorPanel tone="teal" className="contact-direct">
          <h2>Let&apos;s connect<br />the right pieces.</h2>
          <p>Tell me what you need to build, what already exists and your expected scope or timeline. I&apos;m also open to international remote development roles.</p>
          <a className="contact-email" href={"mailto:" + profile.email}><MailIcon className="h-4 w-4 shrink-0" />{profile.email}<ArrowUpRight size={16} className="shrink-0" aria-hidden="true" /></a>
          <p className="contact-meta"><MapPin size={16} className="shrink-0" aria-hidden="true" />{profile.location}</p>
          <p className="contact-meta"><span className="status-dot bg-[#c5d8b5]" aria-hidden="true" />Open to freelance projects and remote roles</p>
        </InteriorPanel></InteriorReveal>
        <InteriorReveal delay={.08}><InteriorPanel tone="lilac"><h2 className="resume-section-title">Find me elsewhere</h2><p className="interior-body">A little more about the work, and a direct way to reach me.</p><ul className="contact-socials">
          {socialLinks.map(link => {
            const Icon = socialIconMap[link.name as keyof typeof socialIconMap];
            return <li key={link.name}><a href={link.href} target={link.name === "Email" ? undefined : "_blank"} rel={link.name === "Email" ? undefined : "noopener noreferrer"}><Icon className="h-4 w-4" />{link.name}<ArrowUpRight size={13} aria-hidden="true" /></a></li>;
          })}
        </ul></InteriorPanel></InteriorReveal>
      </div>
      <InteriorReveal delay={.08}><InteriorPanel className="contact-form-panel"><h2>Tell me about your project.</h2><p>A few details about your goals and where you need support are a good place to start.</p><ContactForm className="interior-contact-form" /></InteriorPanel></InteriorReveal>
    </div></Container>
  </InteriorPage>;
}
