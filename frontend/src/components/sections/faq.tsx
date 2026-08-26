import { useState } from "react";
import { SectionLabel } from "@/components/ui/badge";

const FAQS = [
  { q: "Summarizer?", a: "No. We restructure, not shorten. Headings stay headings. Nothing dropped." },
  { q: "Best PDFs?", a: "Papers, textbooks, notes, docs. Auto-classified → 1 of 6 prompts." },
  { q: "Stored or trained on?", a: "Never. Temp file → deleted in finally. You own the output." },
  { q: "Why not PDF → GPT directly?", a: "That costs ~30k tokens. We parse locally for 0, then enhance markdown only — 10× cheaper." },
  { q: "Long docs?", a: "8000-char chunks. Free-tier safe. Semantic chunking (heading-aware) next." },
  { q: "What do I get?", a: "Clean markdown + assets. Copy, download, or read with TOC. Images & PDF export next." },
  { q: "Which AI?", a: "Groq llama-3.3-70b via Vercel AI SDK. Swap via GROQ_MODEL. OpenAI fallback ready." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-[1100px] px-4 sm:px-6 py-12 sm:py-16">
      <SectionLabel kicker="05 — FAQ">Quick answers</SectionLabel>
      <div className="divide-y divide-hairline border-y border-hairline">
        {FAQS.map((f, i) => (
          <div key={f.q} className="py-3">
            <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 text-left">
              <span className="font-mono text-[13px] font-medium text-ink flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-[4px] border border-hairline bg-surface-card text-[11px]">{open === i ? "−" : "+"}</span>
                {f.q}
              </span>
              <span className="font-mono text-[11px] text-mute hidden sm:inline">{open === i ? "[-]" : "[+]"}</span>
            </button>
            {open === i && <p className="mt-2 pl-7 font-mono text-[12px] leading-5 text-body">{f.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
