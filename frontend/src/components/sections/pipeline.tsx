import { SectionLabel } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

const STEPS = [
  { n: "01", title: "Upload", desc: "Drop PDF · 20 MB max · validated before disk.", tech: "Multer · PDF-only · uploads/temp" },
  { n: "02", title: "Extract", desc: "MarkItDown parses locally. 0 tokens. Headings & tables intact.", tech: "Python → MarkItDown + PyMuPDF → JSON" },
  { n: "03", title: "Split", desc: "Clean → 8000-char chunks. Cheap, fast, free-tier safe.", tech: "Preprocessor · 8000 chars" },
  { n: "04", title: "Route", desc: "Groq classifies: paper / book / notes / docs. Picks 1 of 6 prompts.", tech: "Classifier → 6 prompts" },
  { n: "05", title: "Enhance", desc: "Per-chunk Groq enhance, then stitch. Parallel & prompt-aware.", tech: "Groq llama-3.3-70b" },
  { n: "06", title: "Read", desc: "Markdown + assets back. Copy / export. File already deleted.", tech: "ApiResponse · delete in finally" },
];

export function Pipeline() {
  return (
    <section id="pipeline" className="mx-auto max-w-[1100px] px-4 sm:px-6 py-12 sm:py-16 scroll-mt-20">
      <SectionLabel kicker="02 — How it works">Six steps. No mystery.</SectionLabel>

      <div className="relative">
        <div className="absolute left-[19px] top-2 bottom-2 w-px bg-hairline hidden sm:block" />
        <div className="grid gap-3">
          {STEPS.map((s) => (
            <div key={s.n} className="relative flex gap-4 rounded-[4px] border border-hairline bg-canvas p-4 sm:p-5 hover:bg-surface-soft hover:border-hairline-strong transition-colors group">
              <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-[4px] bg-ink text-canvas font-mono text-[12px] font-bold group-hover:bg-ink-deep transition-colors">
                {s.n}
              </div>
              <div className="sm:hidden font-mono text-[11px] font-bold text-ink">{s.n}</div>
              <div className="flex-1 min-w-0">
                <div className="font-mono text-[13px] font-bold text-ink">{s.title}</div>
                <div className="font-mono text-[12px] text-body leading-5 mt-1">{s.desc}</div>
                <div className="mt-2 inline-flex rounded-[4px] bg-surface-soft border border-hairline px-2 py-1 font-mono text-[10px] text-mute">{s.tech}</div>
              </div>
              <div className="hidden lg:flex self-center text-ash group-hover:text-ink transition-colors">
                <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-[4px] border border-hairline bg-surface-soft p-3 flex gap-2 font-mono text-[11px] text-body">
        <span className="font-bold text-ink shrink-0">[→] Next:</span>
        <span>Semantic chunking (heading-aware) so tables & sections never split. Today: clean \n\n join.</span>
      </div>
    </section>
  );
}
