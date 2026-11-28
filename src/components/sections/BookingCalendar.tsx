"use client";

import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

type Dates = { arrival: string; departure: string };
type DateField = keyof Dates;

const dayMs = 86_400_000;
const monthLabel = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
const dateLabel = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
const fullDate = new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeZone: "UTC" });
const labels = { arrival: "Check-in", departure: "Check-out" };
const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function isoDate(time: number) {
  return new Date(time).toISOString().slice(0, 10);
}

export function nextBookingDate(value: string) {
  return isoDate(Date.parse(value) + dayMs);
}

function startOfMonth(time: number, offset = 0) {
  const month = new Date(time);
  month.setUTCDate(1);
  month.setUTCMonth(month.getUTCMonth() + offset);
  return month.getTime();
}

export function BookingCalendar({ dates, onSelect }: { dates: Dates; onSelect: (field: DateField, value: string) => void }) {
  const id = useId();
  const picker = useRef<HTMLDivElement>(null);
  const activeDay = useRef<HTMLButtonElement>(null);
  const shouldFocusDay = useRef(false);
  const triggers = useRef<Partial<Record<DateField, HTMLButtonElement>>>({});
  const [field, setField] = useState<DateField | null>(null);
  const [cursor, setCursor] = useState(() => Date.parse(dates.arrival));
  const minimum = field === "departure" ? Date.parse(dates.arrival) + dayMs : -Infinity;
  const month = startOfMonth(cursor);
  const start = month - new Date(month).getUTCDay() * dayMs;
  const nextMonth = startOfMonth(cursor, 1);

  useEffect(() => {
    if (!field) return;
    function dismiss(event: PointerEvent) {
      if (event.target instanceof Node && !picker.current?.contains(event.target)) setField(null);
    }
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [field]);

  useEffect(() => {
    if (!field || !shouldFocusDay.current) return;
    shouldFocusDay.current = false;
    activeDay.current?.focus({ preventScroll: true });
  }, [cursor, field]);

  function close() {
    if (field) triggers.current[field]?.focus({ preventScroll: true });
    setField(null);
  }

  function move(time: number, focus: boolean) {
    const next = Math.max(time, minimum);
    if (next === cursor) return;
    shouldFocusDay.current = focus;
    setCursor(next);
  }

  function handleDayKey(event: KeyboardEvent<HTMLButtonElement>) {
    const weekday = new Date(cursor).getUTCDay();
    const offsets: Partial<Record<string, number>> = {
      ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7, Home: -weekday, End: 6 - weekday,
    };
    const days = offsets[event.key];
    if (days === undefined) return;
    event.preventDefault();
    move(cursor + days * dayMs, true);
  }

  return (
    <div
      className="capability-date-picker"
      ref={picker}
      onBlur={event => {
        if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) setField(null);
      }}
      onKeyDown={event => {
        if (event.key === "Escape" && field) {
          event.stopPropagation();
          close();
        }
      }}
    >
      <div className="capability-date-fields">
        {(Object.keys(labels) as DateField[]).map(key => (
          <div key={key}>
            <span className="capability-date-label" id={id + key}>{labels[key]}</span>
            <button
              ref={node => { if (node) triggers.current[key] = node; }}
              type="button"
              className="capability-date-trigger"
              aria-labelledby={id + key + " " + id + key + "-value"}
              aria-expanded={field === key}
              aria-haspopup="dialog"
              aria-controls={field === key ? id + "-calendar" : undefined}
              onClick={() => {
                if (field === key) {
                  close();
                  return;
                }
                shouldFocusDay.current = true;
                setCursor(Date.parse(dates[key]));
                setField(key);
              }}
            >
              <span id={id + key + "-value"}>{dateLabel.format(Date.parse(dates[key]))}</span>
              <CalendarDays size={16} aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
      {field && (
        <div id={id + "-calendar"} className="capability-calendar" data-field={field} role="dialog" aria-label={labels[field] + " calendar"}>
          <div className="capability-calendar-header">
            <button type="button" aria-label="Previous month" disabled={month <= minimum} onClick={() => move(startOfMonth(cursor, -1), false)}>
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <strong id={id + "-month"} aria-live="polite">{monthLabel.format(month)}</strong>
            <button type="button" aria-label="Next month" onClick={() => move(nextMonth, false)}>
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
          <table aria-labelledby={id + "-month"}>
            <thead><tr>{weekdays.map(label => <th scope="col" key={label}>{label}</th>)}</tr></thead>
            <tbody>
              {Array.from({ length: 6 }, (_, week) => (
                <tr key={week}>
                  {weekdays.map((label, index) => {
                    const time = start + (week * 7 + index) * dayMs;
                    const value = isoDate(time);
                    const selected = dates[field] === value;
                    return (
                      <td key={label}>
                        <button
                          ref={time === cursor ? activeDay : undefined}
                          type="button"
                          aria-label={fullDate.format(time)}
                          aria-pressed={selected}
                          data-outside={time < month || time >= nextMonth}
                          data-stay={value >= dates.arrival && value <= dates.departure}
                          disabled={time < minimum}
                          tabIndex={time === cursor ? 0 : -1}
                          onKeyDown={handleDayKey}
                          onClick={() => {
                            onSelect(field, value);
                            close();
                          }}
                        >
                          {new Date(time).getUTCDate()}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
