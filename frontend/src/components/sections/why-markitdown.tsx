import { SectionLabel } from "@/components/ui/badge";

export function WhyMarkItDown() {
  return (
    <section className="mx-auto max-w-[1100px] px-4 sm:px-6 py-12 sm:py-16 scroll-mt-20">
      <SectionLabel kicker="Why it works">Accurate first, then clear.</SectionLabel>
      <p className="font-mono text-[13px] leading-5 text-body max-w-2xl -mt-3 mb-6">
        We read your PDF accurately first, then make it clear and structured.
      </p>

      <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-4">
        <div className="rounded-[4px] border border-hairline bg-canvas overflow-hidden">
          <div className="grid grid-cols-[1fr_1fr] gap-0 font-mono text-[12px]">
            <div className="bg-surface-soft border-b border-r border-hairline p-3 font-bold text-ink">Others</div>
            <div className="bg-ink border-b border-hairline p-3 font-bold text-canvas">MarkForge</div>

            <div className="border-r border-b border-hairline p-4 space-y-2">
              <div className="text-mute">Dense pages</div>
              <div className="text-ink font-bold">Hard to navigate</div>
              <div className="text-body text-[11px]">Layout lost. Slow to read.</div>
            </div>
            <div className="border-b border-hairline p-4 space-y-2 bg-surface-soft/50">
              <div className="text-mute">Clean document</div>
              <div className="text-ink font-bold">Easy to read</div>
              <div className="text-body text-[11px]">Headings and tables preserved.</div>
            </div>

            <div className="col-span-2 p-3 bg-surface-soft border-t border-hairline font-mono text-[11px] text-body">
              <span className="font-bold text-ink">Result:</span> Same knowledge, 10× more readable.
            </div>
          </div>
        </div>

        <div className="rounded-[4px] border border-hairline bg-surface-dark text-on-dark p-5 flex flex-col">
          <div className="font-mono text-[11px] tracking-widest uppercase text-on-dark-mute">Fast · private</div>
          <pre className="mt-3 rounded-[4px] bg-white/10 p-3 font-mono text-[11px] leading-5 text-on-dark overflow-auto">
{`Drop PDF
→ Get structured doc
→ Read and share`}
          </pre>
          <ul className="mt-4 space-y-1 font-mono text-[11px] leading-4 text-on-dark-mute">
            <li>• Works fast.</li>
            <li>• Keeps layout.</li>
            <li>• Images preserved.</li>
          </ul>
          <div className="mt-auto pt-4 font-mono text-[10px] text-ash">Private · Fast · Accurate</div>
        </div>
      </div>
    </section>
  );
}
