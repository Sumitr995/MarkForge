import { SectionLabel } from "@/components/ui/badge";

export function Trust() {
  return (
    <section className="mx-auto max-w-[1100px] px-4 sm:px-6 py-12">
      <SectionLabel kicker="06 — Trust">Privacy, not theater.</SectionLabel>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { t: "Never stored", d: "Your PDF is processed once, then deleted. Never stored." },
          { t: "No training", d: "We never train on your documents. Your content is returned and forgotten." },
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
