export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[760px] px-4 sm:px-6 py-10">
      <div className="font-mono text-[11px] tracking-widest uppercase text-mute">Contact</div>
      <h1 className="mt-2 font-mono text-[24px] font-bold text-ink">Talk to us</h1>
      <p className="mt-2 font-mono text-[13px] leading-6 text-body max-w-2xl">
        Questions, bugs, or deletion requests — we read everything.
      </p>

      <div className="mt-8 grid gap-4">
        <a
          href="mailto:support@markforge.app"
          className="rounded-[4px] border border-hairline bg-canvas p-4 hover:border-hairline-strong transition-colors"
        >
          <div className="font-mono text-[12px] font-bold text-ink">Email</div>
          <div className="mt-1 font-mono text-[13px] text-body">support@markforge.app</div>
          <div className="mt-1 font-mono text-[11px] text-mute">Fastest for privacy and deletion requests.</div>
        </a>
        <a
          href="https://github.com/Sumitr995/MarkForge/issues"
          target="_blank"
          rel="noreferrer"
          className="rounded-[4px] border border-hairline bg-canvas p-4 hover:border-hairline-strong transition-colors"
        >
          <div className="font-mono text-[12px] font-bold text-ink">GitHub Issues ↗</div>
          <div className="mt-1 font-mono text-[13px] text-body">Report a bug or request a feature in public.</div>
          <div className="mt-1 font-mono text-[11px] text-mute">Please don't post private documents there.</div>
        </a>
      </div>
    </div>
  );
}
