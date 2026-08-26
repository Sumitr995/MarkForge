import { SectionLabel } from "@/components/ui/badge";

export function Trust() {
  return (
    <section className="mx-auto max-w-[1100px] px-4 sm:px-6 py-12">
      <SectionLabel kicker="06 — Trust">Privacy, not theater.</SectionLabel>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { t: "Never stored", d: "Your PDF lives in a temp file for one request, then deleted in a finally block. No S3, no database, no retention." },
          { t: "No training", d: "We don't train on your documents. Groq inference only — your markdown is returned and forgotten." },
          { t: "You own the output", d: "Enhanced Markdown + assets are yours. Copy, export to PDF, share — no lock-in, no watermark." },
        ].map((c) => (
          <div key={c.t} className="rounded-[4px] border border-hairline bg-surface-soft p-4">
            <div className="font-mono text-[12px] font-bold text-ink">[✓] {c.t}</div>
            <div className="mt-1 font-mono text-[12.5px] leading-5 text-body">{c.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
