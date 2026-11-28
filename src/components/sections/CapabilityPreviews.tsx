"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CircleCheck } from "lucide-react";
import { BookingCalendar, nextBookingDate } from "./BookingCalendar";

const initialDates = { arrival: "2027-04-18", departure: "2027-04-21" };
const rooms = [
  { id: "garden", name: "Garden double", detail: "Queen bed · Breakfast included", rate: 128, reserved: ["2027-04-22", "2027-04-23"] },
  { id: "terrace", name: "Terrace suite", detail: "King bed · Private terrace", rate: 182, reserved: ["2027-04-23"] },
] as const;
const bookingSteps = ["Dates", "Room", "Review", "Done"] as const;
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const day = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" });

function BookingStaySummary({ stay, room, total }: { stay: string; room: string; total: string }) {
  return (
    <dl className="capability-booking-summary">
      <div><dt>Stay</dt><dd>{stay}</dd></div>
      <div><dt>Room</dt><dd>{room}</dd></div>
      <div><dt>Total</dt><dd>{total}</dd></div>
    </dl>
  );
}

export function BookingPreview() {
  const id = useId();
  const [dates, setDates] = useState(initialDates);
  const [step, setStep] = useState(0);
  const [roomId, setRoomId] = useState<string | null>(null);
  const navigation = useRef<HTMLOListElement>(null);
  const thankYou = useRef<HTMLHeadingElement>(null);
  const focusOnStepChange = useRef(false);
  const arrival = Date.parse(dates.arrival);
  const departure = Date.parse(dates.departure);
  const nights = (departure - arrival) / 86_400_000;
  const validDates = Number.isInteger(nights) && nights > 0;
  const available = validDates ? rooms.filter(room => !room.reserved.some(night => {
    const time = Date.parse(night);
    return time >= arrival && time < departure;
  })) : [];
  const room = available.find(item => item.id === roomId);
  const confirmed = step === bookingSteps.length - 1;
  const summary = room ? money.format(room.rate * nights) : "—";
  const stay = validDates ? day.format(arrival) + " – " + day.format(departure) : "Choose travel dates";
  const nightLabel = validDates ? nights + (nights === 1 ? " night" : " nights") : "Choose a departure after arrival.";
  const receipt = { stay: stay + " · " + nightLabel, room: room?.name ?? "Choose a room", total: summary };

  useEffect(() => {
    if (!focusOnStepChange.current) return;
    focusOnStepChange.current = false;
    const target = confirmed ? thankYou.current : navigation.current?.querySelector<HTMLButtonElement>('[aria-current="step"]');
    target?.focus({ preventScroll: true });
  }, [step, confirmed]);

  function goToStep(next: number) {
    if (next === step) return;
    focusOnStepChange.current = true;
    setStep(next);
  }

  function updateDate(field: keyof typeof dates, value: string) {
    setDates(previous => {
      if (field === "arrival" && value >= previous.departure) {
        return { arrival: value, departure: nextBookingDate(value) };
      }
      return { ...previous, [field]: value };
    });
    setRoomId(null);
  }

  function reset() {
    setDates(initialDates);
    setRoomId(null);
    goToStep(0);
  }

  return (
    <>
      <ol ref={navigation} className="capability-booking-steps" aria-label="Booking stages">
        {bookingSteps.map((label, index) => (
          <li key={label}>
            <button
              type="button"
              aria-current={index === step ? "step" : undefined}
              disabled={confirmed || index === 3 || (index === 1 && !validDates) || (index === 2 && !room)}
              onClick={() => goToStep(index)}
            >
              <span aria-hidden="true">{index + 1}</span>{label}
            </button>
          </li>
        ))}
      </ol>
      <div className="capability-pane-stack capability-booking-body">
        <div role="group" aria-label="Travel dates" aria-hidden={step !== 0} inert={step !== 0}>
          <BookingCalendar dates={dates} onSelect={updateDate} />
          <p className="capability-stay-note" aria-live="polite">
            {nightLabel}
          </p>
        </div>
        <div role="group" aria-label="Room availability" aria-hidden={step !== 1} inert={step !== 1}>
          <p className="capability-stay-note" aria-live="polite">
            {available.length ? available.length + (available.length === 1 ? " room available" : " rooms available") : "No rooms available. Try a different date range."}
          </p>
          <fieldset className="capability-room-list">
            <legend className="sr-only">Available rooms</legend>
            {available.map(option => (
              <label className="capability-room" key={option.id}>
                <input type="radio" name={id} checked={roomId === option.id} onChange={() => setRoomId(option.id)} />
                <span><strong>{option.name}</strong><small>{option.detail}</small></span>
                <strong>{money.format(option.rate)}<small> / night</small></strong>
              </label>
            ))}
          </fieldset>
        </div>
        <div role="group" aria-label="Booking summary" aria-hidden={step !== 2} inert={step !== 2}>
          <BookingStaySummary {...receipt} />
        </div>
        {confirmed && (
          <div className="capability-thank-you" role="group" aria-labelledby={id + "-thank-you"}>
            <div className="capability-thank-you-heading">
              <CircleCheck size={26} aria-hidden="true" />
              <div>
                <h5 id={id + "-thank-you"} ref={thankYou} tabIndex={-1}>Thank you for booking!</h5>
                <p>Your sample reservation is confirmed.</p>
              </div>
            </div>
            <BookingStaySummary {...receipt} />
          </div>
        )}
      </div>
      <div className="capability-booking-actions">
        {!confirmed && <button type="button" className="capability-quiet-button" disabled={step === 0} onClick={() => goToStep(step - 1)}>Back</button>}
        <button
          type="button"
          className="capability-primary-button"
          disabled={(step === 0 && !validDates) || (step === 1 && !room)}
          onClick={confirmed ? reset : () => goToStep(step + 1)}
        >
          {["Check availability", "Review booking", "Confirm booking", "Start over"][step]}
        </button>
      </div>
    </>
  );
}

const endpoints = {
  "/availability": { availableRooms: 2, currency: "USD", from: 128 },
  "/rooms": { rooms: ["Garden double", "Terrace suite"], count: 2 },
} as const;

const apiResponses = {
  healthy: { label: "Healthy", status: "200 OK", error: null },
  unavailable: { label: "Service unavailable", status: "503 Unavailable", error: { code: "SERVICE_UNAVAILABLE", retryAfter: 30 } },
  limited: { label: "Rate limit", status: "429 Rate limit", error: { code: "RATE_LIMIT", retryAfter: 60 } },
} as const;

type Endpoint = keyof typeof endpoints;
type Scenario = keyof typeof apiResponses;

function JsonResponse({ value }: { value: object }) {
  const tokens = JSON.stringify(value, null, 2).split(/("(?:[^"\\]|\\.)*"|\b\d+\b)/g);

  return (
    <pre className="capability-json" tabIndex={0} aria-label="JSON response"><code>
      {tokens.map((token, index) => {
        const color = token.startsWith('"') ? (tokens[index + 1]?.startsWith(":") ? "key" : "string") : /^\d+$/.test(token) ? "number" : undefined;
        return <span key={index} data-token={color}>{token}</span>;
      })}
    </code></pre>
  );
}

export function DashboardPreview() {
  const [endpoint, setEndpoint] = useState<Endpoint>("/availability");
  const [scenario, setScenario] = useState<Scenario>("healthy");
  const [pending, setPending] = useState(false);
  const [response, setResponse] = useState({ endpoint, scenario });
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const result = apiResponses[response.scenario];

  useEffect(() => () => clearTimeout(timer.current), []);

  function runRequest() {
    if (pending) return;
    setPending(true);
    timer.current = setTimeout(() => {
      setResponse({ endpoint, scenario });
      setPending(false);
    }, 650);
  }

  return (
    <>
      <div className="capability-request-fields">
        <div className="capability-endpoint">
          <span>GET</span>
          <select aria-label="Endpoint" value={endpoint} disabled={pending} onChange={event => setEndpoint(event.target.value as Endpoint)}>
            {Object.keys(endpoints).map(path => <option key={path}>{path}</option>)}
          </select>
        </div>
        <button type="button" className="capability-primary-button" aria-disabled={pending} onClick={runRequest}>
          {pending ? "Sending…" : "Send request"}
        </button>
      </div>
      <label className="capability-scenario">
        Scenario
        <select value={scenario} disabled={pending} onChange={event => setScenario(event.target.value as Scenario)}>
          {(Object.keys(apiResponses) as Scenario[]).map(key => <option value={key} key={key}>{apiResponses[key].label}</option>)}
        </select>
      </label>
      <div className="capability-response-heading" role="status">
        <code>{pending ? endpoint : response.endpoint}</code>
        <span data-status={pending ? "pending" : result.error ? "error" : "success"}>{pending ? "Waiting for response" : result.status}</span>
      </div>
      <div className="capability-response" aria-busy={pending}>
        {pending ? <p role="status">Sending simulated request…</p> : <JsonResponse value={result.error ?? endpoints[response.endpoint]} />}
      </div>
    </>
  );
}

const projects = [
  { name: "Client portal", area: "Account views", status: "In progress" },
  { name: "Booking dashboard", area: "Reservation views", status: "In review" },
] as const;

function ProjectTile({ project }: { project: (typeof projects)[number] }) {
  return (
    <li className="capability-project-tile">
      <strong>{project.name}</strong>
      <span>{project.area}</span>
      <small>{project.status}</small>
    </li>
  );
}

export function DesignSystemPreview() {
  const [compact, setCompact] = useState(false);

  return (
    <>
      <div className="capability-segmented" role="group" aria-label="Preview viewport">
        <button type="button" aria-pressed={!compact} onClick={() => setCompact(false)}>Desktop</button>
        <button type="button" aria-pressed={compact} onClick={() => setCompact(true)}>Mobile</button>
      </div>
      <div className="capability-component-preview" data-compact={compact}>
        <div className="capability-projects">
          <strong className="capability-projects-title">Projects</strong>
          <ul className="capability-project-grid">
            {projects.map(project => <ProjectTile project={project} key={project.name} />)}
          </ul>
        </div>
      </div>
    </>
  );
}
