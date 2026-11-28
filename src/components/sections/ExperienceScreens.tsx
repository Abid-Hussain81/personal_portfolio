import Image from "next/image";
import { ArrowRight, Braces, CalendarDays, Check, CircleCheck, Code2, FolderKanban, Layers3, LayoutGrid, ListChecks } from "lucide-react";

export type ExperienceScene = "mind-gauge" | "gaply" | "independent";

function ProductionScreen() {
  return (
    <div className="workspace-production">
      <div className="workspace-editor">
        <div className="workspace-editor-tab"><Braces /> availability.tsx</div>
        <ol>
          <li><code><b>const</b> dates = getDates();</code></li>
          <li><code><b>const</b> query =</code></li>
          <li><code>{"  "}<i>toSearchParams</i>(dates);</code></li>
          <li><code><b>const</b> path =</code></li>
          <li><code>{"  "}<span>&quot;/availability&quot;</span>;</code></li>
          <li><code><b>const</b> rooms = <b>await</b></code></li>
          <li><code>{"  "}api.get(path, query);</code></li>
          <li><code><b>return</b> rooms;</code></li>
        </ol>
        <div className="workspace-editor-status"><span>TypeScript</span><span>main</span></div>
      </div>
      <div className="workspace-booking">
        <header><span><CalendarDays /> Stay desk</span><span>Reservations</span></header>
        <div className="workspace-booking-content">
          <h3>Room availability</h3>
          <div className="workspace-booking-dates"><span>Check-in <b>Apr 18</b></span><span>Check-out <b>Apr 21</b></span><span>Guests <b>2 adults</b></span></div>
          <div className="workspace-booking-room"><span><b>Garden double</b><small>2 guests · Garden view</small></span><strong>Available</strong></div>
          <div className="workspace-booking-room"><span><b>Terrace suite</b><small>2 guests · Private terrace</small></span><strong>Available</strong></div>
          <p><i /> Availability API connected</p>
        </div>
      </div>
    </div>
  );
}

const milestones = [
  { name: "Design review", date: "Apr 18", complete: true },
  { name: "Development", date: "Apr 24", complete: false },
  { name: "Launch checklist", date: "May 02", complete: false },
];

export function PortalScreen({ mobile = false }: { mobile?: boolean }) {
  return (
    <div className="workspace-portal" data-mobile={mobile}>
      <div className="workspace-portal-side">
        <strong><span>G</span> Gaply</strong>
        <span><LayoutGrid /> Overview</span>
        <span><FolderKanban /> Projects</span>
        <span><ListChecks /> Activity</span>
      </div>
      <div className="workspace-portal-content">
        <header><b>{mobile ? "Gaply" : "Client portal"}</b><span>AM</span></header>
        <h3>{mobile ? "Projects" : "Project overview"}</h3>
        <div className="workspace-portal-project">
          <span>Active project</span>
          <strong>Website refresh</strong>
          <div className="workspace-portal-progress"><i /><b>68%</b></div>
        </div>
        <strong className="workspace-milestone-title">Milestones</strong>
        <ul>
          {milestones.map(item => (
            <li key={item.name}><i data-complete={item.complete}>{item.complete && <Check />}</i><b>{item.name}</b><time>{item.date}</time></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function WebsiteScreen() {
  return (
    <div className="workspace-website">
      <div className="workspace-website-nav"><b>FORM & FIELD</b><span>Studio · Services · Contact</span></div>
      <div className="workspace-website-hero">
        <div>
          <span>Architecture & interiors</span>
          <h3>Spaces to<br />slow down in.</h3>
          <small>Considered spaces for everyday life.</small>
          <b>Explore services <ArrowRight /></b>
        </div>
        <Image src="/models/experience/courtyard.webp" alt="" width={480} height={550} unoptimized />
      </div>
      <div className="workspace-website-footer"><span>01 &nbsp; Architecture</span><span>02 &nbsp; Interiors</span><span>03 &nbsp; Consultation</span></div>
    </div>
  );
}

const screens = { "mind-gauge": ProductionScreen, gaply: PortalScreen, independent: WebsiteScreen };
const tabs = { "mind-gauge": "Stay desk · Development", gaply: "Gaply · Client workspace", independent: "Form & Field · Studio" };

export function WorkspaceDisplay({ active }: { active: ExperienceScene }) {
  return (
    <div className="workspace-display">
      <div className="workspace-display-bar">
        <span className="workspace-window-lights"><i /><i /><i /></span>
        <span>{tabs[active]}</span>
      </div>
      <div className="workspace-screen-stack">
        {Object.entries(screens).map(([scene, Screen]) => (
          <div key={scene} className="workspace-screen" data-active={scene === active}><Screen /></div>
        ))}
      </div>
    </div>
  );
}

export function WorkspaceAnnotations({ active }: { active: ExperienceScene }) {
  return (
    <div className="workspace-annotations">
      <div className="workspace-annotation-set" data-active={active === "mind-gauge"}>
        <div className="workspace-note workspace-note-left">
          <strong><Layers3 /> Component library</strong>
          <div className="workspace-note-controls"><span><b>Apr 18–21</b>Stay dates</span><span><b>2 adults</b>Guests</span></div>
        </div>
        <div className="workspace-note workspace-note-right">
          <strong><Code2 /> Availability API</strong>
          <code>GET <b>/availability</b></code>
          <small><i /> 200 OK · 2 rooms</small>
        </div>
      </div>
      <div className="workspace-annotation-set" data-active={active === "independent"}>
        <div className="workspace-note workspace-note-left">
          <strong><ListChecks /> Project brief</strong>
          <ul><li>Service pages</li><li>Responsive layout</li><li>Contact flow</li></ul>
        </div>
        <div className="workspace-note workspace-note-right workspace-note-delivery">
          <CircleCheck /><div><strong>Ready for handover</strong><small>Site files &amp; guide included</small></div>
        </div>
      </div>
    </div>
  );
}
