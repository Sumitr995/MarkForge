import { SectionLabel } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Showcase() {
  return (
    <section className="mx-auto max-w-[1100px] px-4 sm:px-6 py-12 sm:py-16 scroll-mt-20">
      <SectionLabel kicker="03 — Reading experience">A page you want to revise, not just scroll.</SectionLabel>

      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
        <div className="rounded-[4px] border border-hairline bg-canvas overflow-hidden shadow-sm">
          <div className="flex items-center gap-2 border-b border-hairline px-4 py-2 bg-surface-soft">
            <span className="h-2 w-2 rounded-full bg-danger" />
            <span className="h-2 w-2 rounded-full bg-warning" />
            <span className="h-2 w-2 rounded-full bg-success" />
            <span className="ml-3 font-mono text-[11px] text-mute">reader — quantum-attention.md</span>
            <span className="ml-auto hidden sm:inline font-mono text-[11px] text-mute">TOC · Search · Copy · Export</span>
          </div>
          <div className="grid sm:grid-cols-[180px_1fr] gap-0">
            <div className="hidden sm:block border-r border-hairline bg-surface-soft p-3">
              <div className="font-mono text-[10px] tracking-widest uppercase text-mute mb-2">Contents</div>
              <ul className="space-y-1 font-mono text-[12px] text-mute">
                <li className="text-ink font-bold">▸ 1. Abstract</li>
                <li>2. Introduction</li>
                <li>3. Attention is all you need</li>
                <li>4. Experiments</li>
                <li>5. Conclusion</li>
                <li className="text-ash mt-2">— Figures (3) · Tables (2)</li>
              </ul>
              <div className="mt-4 rounded-[4px] bg-canvas border border-hairline p-2 font-mono text-[11px]">
                <div className="font-bold text-ink">Definition</div>
                <div className="text-body leading-4 mt-1">Scaled dot-product attention: softmax(QKᵀ/√dₖ)V</div>
                <div className="mt-1 text-ash text-[10px]">Extracted from page 3 → definition card</div>
              </div>
              <div className="mt-3 rounded-[4px] bg-ink text-canvas p-2 font-mono text-[10px] leading-4">
                <span className="text-ash">Tip:</span> Press <span className="bg-white/10 px-1 rounded">⌘K</span> to search
              </div>
            </div>
            <div className="p-5 sm:p-6 prose-mono">
              <h3 className="font-mono text-[15px] font-bold text-ink">1 — Abstract, distilled</h3>
              <p className="mt-2 font-mono text-[12.5px] leading-6 text-body">
                The Transformer removes recurrence and relies entirely on attention. Multi-head self-attention lets
                each position attend to all positions in parallel — unlocking training scale.
              </p>
              <div className="mt-4 rounded-[4px] border-l-2 border-accent bg-surface-soft px-3 py-2 font-mono text-[12px] text-body">
                <span className="font-bold text-ink">Key idea →</span> Attention is not an add-on; it <em>is</em> the architecture.
              </div>
              <h4 className="mt-5 font-mono text-[12px] font-bold tracking-wide uppercase text-ink">Takeaways</h4>
              <ul className="mt-2 space-y-1 font-mono text-[12.5px] text-body">
                <li>• Positional encodings inject order without recurrence.</li>
                <li>• 8 heads learn distinct relational subspaces.</li>
                <li>• BLEU +2.0 over prior SOTA with ¼ training time.</li>
              </ul>
              <div className="mt-4 font-mono text-[10.5px] text-ash border-t border-hairline pt-2">
                Source preserved — no hallucination, just restructuring. 42 pages → 12 sections, 9.2k words.
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-[4px] border border-ink bg-surface-dark text-on-dark p-5">
            <div className="font-mono text-[11px] tracking-widest uppercase text-on-dark-mute">Before → After</div>
            <div className="mt-3 grid grid-cols-2 gap-3 font-mono text-[11px]">
              <div className="rounded-[4px] bg-white/5 p-2 border border-white/10 overflow-hidden">
                <img
                  src="/assets/before.png"
                  alt="Before — dense PDF"
                  className="h-[86px] w-full object-cover rounded-[4px] opacity-90"
                  loading="lazy"
                />
                <div className="mt-2 text-ash">Before — dense PDF</div>
                <div className="mt-1 leading-4 text-on-dark-mute line-clamp-2">42 pages, unstructured — hard to revise.</div>
              </div>
              <div className="rounded-[4px] bg-white p-2 text-ink overflow-hidden">
                <img
                  src="/assets/after-1.png"
                  alt="After — distilled"
                  className="h-[86px] w-full object-cover rounded-[4px]"
                  loading="lazy"
                />
                <div className="mt-2 text-mute">After — distilled</div>
                <div className="mt-1 leading-4 font-medium line-clamp-2">12 sections, TOC + callouts — ready to read.</div>
              </div>
            </div>
            <Link to="/app" className="mt-4 block">
              <Button variant="primary" className="w-full bg-canvas text-ink hover:bg-white">
                Try with your PDF →
              </Button>
            </Link>
            <div className="mt-2 text-center font-mono text-[10px] text-on-dark-mute">Free during beta · 3 / day · no card</div>
          </div>

          <div className="rounded-[4px] border border-hairline bg-canvas p-4">
            <div className="font-mono text-[11px] font-bold tracking-wide uppercase text-ink">What you get today</div>
            <ul className="mt-2 space-y-1.5 font-mono text-[12px] text-body">
              <li className="flex gap-2"><span className="text-success">[✓]</span> TOC with anchor links & active highlight</li>
              <li className="flex gap-2"><span className="text-success">[✓]</span> Definition & callout cards</li>
              <li className="flex gap-2"><span className="text-success">[✓]</span> Tables + code blocks preserved</li>
              <li className="flex gap-2"><span className="text-success">[✓]</span> Copy & Markdown export</li>
              <li className="flex gap-2"><span className="text-ash">[→]</span> <span className="text-mute">Mermaid, image viewer & PDF export — coming next</span></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
