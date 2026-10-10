import { SectionLabel } from "@/components/ui/badge";

const GROUPS = [
  { t: "Students", d: "Turn chapters and lecture PDFs into revision-ready notes with contents and definitions." },
  { t: "Researchers", d: "Skim papers faster — key ideas, tables, and takeaways in one clean page." },
  { t: "Professionals", d: "Make reports and docs readable. Copy, share, or export in one click." },
];

export function Who() {
  return (
    <section className="mx-auto max-w-[1100px] px-4 sm:px-6 py-12 sm:py-16">
      <SectionLabel kicker="Who it's for">Built for readers.</SectionLabel>
      <div className="grid sm:grid-cols-3 gap-4">
        {GROUPS.map((g) => (
          <div key={g.t} className="rounded-[4px] border border-hairline bg-canvas p-5 hover:bg-surface-soft transition-colors">
            <div className="font-mono text-[13px] font-bold text-ink">{g.t}</div>
            <p className="mt-1 font-mono text-[12px] leading-5 text-body">{g.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
