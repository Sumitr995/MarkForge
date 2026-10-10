import { SectionLabel } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const STEPS = [
  { n: "01", title: "Upload your PDF", desc: "Drop a PDF up to 20 MB. No sign-up needed." },
  { n: "02", title: "We distill it", desc: "Your document is read and restructured for clarity." },
  { n: "03", title: "Read and share", desc: "Contents, tables, and highlights. Copy, download, or share." },
];

export function Pipeline() {
  return (
    <section id="pipeline" className="mx-auto max-w-[1100px] px-4 sm:px-6 py-12 sm:py-16 scroll-mt-20">
      <SectionLabel kicker="How it works">Three steps. Done in seconds.</SectionLabel>

      <div className="grid sm:grid-cols-3 gap-4">
        {STEPS.map((s) => (
          <div key={s.n} className="rounded-[4px] border border-hairline bg-canvas p-5 hover:bg-surface-soft transition-colors">
            <div className="font-mono text-[11px] font-bold text-mute">{s.n}</div>
            <div className="mt-1 font-mono text-[14px] font-bold text-ink">{s.title}</div>
            <div className="mt-1 font-mono text-[12px] leading-5 text-body">{s.desc}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link to="/app" className="inline-flex rounded-[4px] bg-ink px-5 py-2.5 font-mono text-[13px] font-medium text-canvas">
          Try it now — free →
        </Link>
        <div className="mt-2 font-mono text-[11px] text-mute">
          <Link to="/docs" className="underline underline-offset-4 hover:text-ink">How it works in detail →</Link>
        </div>
      </div>
    </section>
  );
}
