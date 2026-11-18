export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} width="36" height="36" fill="none" aria-hidden="true" focusable="false">
      <path d="M7 28V12h12M21 28h12V12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
      <path d="m14 27 12-14" stroke="var(--primary)" strokeWidth="2.5" />
      <circle cx="32.5" cy="7.5" r="2.5" fill="var(--accent)" />
    </svg>
  );
}
