import { SectionLabel } from "@/components/ui/badge";

export function WhyMarkItDown() {
  return (
    <section className="mx-auto max-w-[1100px] px-4 sm:px-6 py-12 sm:py-16 scroll-mt-20">
      <SectionLabel kicker="Why this architecture">Why MarkItDown first? 10× cheaper.</SectionLabel>
      <p className="font-mono text-[13px] leading-5 text-body max-w-2xl -mt-3 mb-6">
        Direct PDF → LLM wastes tokens on every pixel. We parse locally for <span className="font-bold text-ink">0 tokens</span>, then enhance only clean markdown.
      </p>

      <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-4">
        <div className="rounded-[4px] border border-hairline bg-canvas overflow-hidden">
          <div className="grid grid-cols-[1fr_1fr] gap-0 font-mono text-[12px]">
            <div className="bg-surface-soft border-b border-r border-hairline p-3 font-bold text-ink">PDF → LLM</div>
            <div className="bg-ink border-b border-hairline p-3 font-bold text-canvas">MarkItDown → LLM</div>

            <div className="border-r border-b border-hairline p-4 space-y-2">
              <div className="text-mute">40 pages as images</div>
              <div className="text-ink font-bold">~30k tokens</div>
              <div className="text-body text-[11px]">Vision model. Layout lost. Pay per pixel.</div>
              <div className="inline-flex rounded-[4px] bg-danger/10 border border-danger/20 px-2 py-1 text-danger text-[11px]">$0.30–$1.20</div>
            </div>
            <div className="border-b border-hairline p-4 space-y-2 bg-surface-soft/50">
              <div className="text-mute">Local extract</div>
              <div className="text-ink font-bold">0 tokens</div>
              <div className="text-body text-[11px]">Headings & tables preserved. LLM sees markdown only.</div>
              <div className="inline-flex rounded-[4px] bg-success/10 border border-success/20 px-2 py-1 text-success text-[11px]">$0.01–$0.04</div>
            </div>

            <div className="col-span-2 p-3 bg-surface-soft border-t border-hairline font-mono text-[11px] text-body">
              <span className="font-bold text-ink">Saving:</span> 10–30× cheaper. More accurate.
            </div>
          </div>
        </div>

        <div className="rounded-[4px] border border-hairline bg-surface-dark text-on-dark p-5 flex flex-col">
          <div className="font-mono text-[11px] tracking-widest uppercase text-on-dark-mute">Local · fast · private</div>
          <pre className="mt-3 rounded-[4px] bg-white/10 p-3 font-mono text-[11px] leading-5 text-on-dark overflow-auto">
{`python convert.py paper.pdf
→ MarkItDown → markdown
→ PyMuPDF → assets
→ { markdown, assets }`}
          </pre>
          <ul className="mt-4 space-y-1 font-mono text-[11px] leading-4 text-on-dark-mute">
            <li>• No API call — works offline.</li>
            <li>• Layout-aware.</li>
            <li>• Assets → future image viewer.</li>
          </ul>
          <div className="mt-auto pt-4 font-mono text-[10px] text-ash">MarkItDown + PyMuPDF · Groq · execFile</div>
        </div>
      </div>
    </section>
  );
}
