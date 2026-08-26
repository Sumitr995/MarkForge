import { SectionLabel } from "@/components/ui/badge";

const QUOTES = [
  { name: "Aarav S.", role: "M.Tech, IIT Bombay", text: "I dropped a 300-page ML textbook. Got back a revision doc I actually want to read. The callouts alone saved me a week.", color: "#007aff" },
  { name: "Maya P.", role: "Researcher, NLP", text: "Unlike chat-PDF tools, it doesn't answer — it restructures. My papers now read like Notion docs.", color: "#ff9f0a" },
  { name: "Dev R.", role: "Backend Engineer", text: "The pipeline is transparent: MarkItDown → clean → chunk → Groq → merge. No magic, just good engineering.", color: "#30d158" },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-[1100px] px-4 sm:px-6 py-12 sm:py-16">
      <SectionLabel kicker="04 — Voices">Early readers — private beta</SectionLabel>
      <div className="grid md:grid-cols-3 gap-4">
        {QUOTES.map((q) => (
          <div key={q.name} className="rounded-[4px] border border-hairline bg-surface-soft p-4 flex gap-3 hover:bg-canvas transition-colors">
            <div className="h-8 w-8 rounded-full shrink-0 border border-white/20" style={{ background: q.color }} />
            <div className="min-w-0">
              <div className="font-mono text-[12px] font-bold text-ink">{q.name} · <span className="font-normal text-mute">{q.role}</span></div>
              <p className="mt-1 font-mono text-[12.5px] leading-5 text-body">“{q.text}”</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 text-center font-mono text-[11px] text-mute">Beta interviews — not paid. Want to be featured? Distill a PDF and tell us what broke.</div>
    </section>
  );
}
