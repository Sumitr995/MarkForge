import { SectionLabel } from "@/components/ui/badge";
import { motion } from "framer-motion";

const FEATURES = [
  {
    bracket: "[+]",
    title: "Accurate reading",
    desc: "Your PDF is read carefully. Tables and headings stay intact.",
    meta: "Fast and accurate",
  },
  {
    bracket: "[+]",
    title: "Knows your doc type",
    desc: "Research paper or textbook — we adjust to your document automatically.",
    meta: "Automatic",
  },
  {
    bracket: "[+]",
    title: "Built for long docs",
    desc: "Long documents handled in parts, stitched back cleanly.",
    meta: "Handles long docs",
  },
  {
    bracket: "[✓]",
    title: "Structure, not summary",
    desc: "Contents, callouts, tables. Easy to read and revise. Nothing important dropped.",
    meta: "Ready to read",
  },
  {
    bracket: "[✓]",
    title: "Private by default",
    desc: "Processed once, then deleted. Never stored.",
    meta: "Private by design",
  },
  {
    bracket: "[→]",
    title: "What's next",
    desc: "Image viewer, PDF export, flashcards — coming soon.",
    meta: "Roadmap · /docs",
  },
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-[1100px] px-4 sm:px-6 py-12 sm:py-16 scroll-mt-20">
      <SectionLabel kicker="01 — Why MarkForge">Not a summarizer. A distiller.</SectionLabel>
      <p className="font-mono text-[13px] leading-5 text-body max-w-2xl -mt-3 mb-6">
        ChatPDF answers. Summarizers shorten. <span className="font-bold text-ink">MarkForge restructures</span> — same knowledge, 10× more readable.
      </p>

      <div className="grid md:grid-cols-2 gap-0 border border-hairline rounded-[4px] overflow-hidden">
        <div className="divide-y divide-hairline">
          {FEATURES.slice(0, 3).map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="p-5 sm:p-6 bg-canvas hover:bg-surface-soft transition-colors group"
            >
              <div className="flex gap-3">
                <span className="font-mono text-[11px] font-bold tracking-widest text-ink mt-0.5 group-hover:text-accent transition-colors">{f.bracket}</span>
                <div className="min-w-0">
                  <div className="font-mono text-[13px] font-bold text-ink leading-tight">{f.title}</div>
                  <p className="mt-1 font-mono text-[12px] leading-5 text-body">{f.desc}</p>
                  <div className="mt-2 font-mono text-[10px] tracking-wide text-ash border-t border-hairline pt-2">{f.meta}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="divide-y divide-hairline border-t md:border-t-0 md:border-l border-hairline">
          {FEATURES.slice(3).map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i + 3) * 0.06 }}
              className="p-5 sm:p-6 bg-canvas hover:bg-surface-soft transition-colors group"
            >
              <div className="flex gap-3">
                <span className="font-mono text-[11px] font-bold tracking-widest text-ink mt-0.5 group-hover:text-accent transition-colors">{f.bracket}</span>
                <div className="min-w-0">
                  <div className="font-mono text-[13px] font-bold text-ink leading-tight">{f.title}</div>
                  <p className="mt-1 font-mono text-[12px] leading-5 text-body">{f.desc}</p>
                  <div className="mt-2 font-mono text-[10px] tracking-wide text-ash border-t border-hairline pt-2">{f.meta}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { k: "Fig 1.", v: "Accurate reading", d: "Your layout preserved, ready to revise" },
          { k: "Fig 2.", v: "Adapts to you", d: "Right format for your doc type" },
          { k: "Fig 3.", v: "You see everything", d: "Extracted vs enhanced — fully transparent" },
        ].map((s) => (
          <div key={s.k} className="rounded-[4px] border border-hairline bg-canvas p-4 hover:border-hairline-strong transition-colors">
            <div className="h-[56px] flex items-end gap-px opacity-50">
              {Array.from({ length: 20 }).map((_, j) => (
                <div key={j} className="flex-1 bg-ink" style={{ height: `${28 + Math.sin(j * 0.9) * 18 + Math.random() * 16}%` }} />
              ))}
            </div>
            <div className="mt-3 font-mono text-[11px] text-mute">
              {s.k} <span className="text-ink font-bold">{s.v}</span> — {s.d}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
