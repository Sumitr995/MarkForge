import { useEffect, useRef, useState } from "react";
import { motion, animate, useInView } from "framer-motion";
import { FileText, Check, Upload, ShieldCheck } from "lucide-react";

// Bento feature grid (stageshow skill rules): one hero UI, one stat, one
// component, one diagram, one statement. One beat per tile, staggered
// 110ms in reading order, played once on scroll-in. One window chrome total.
const STEP = 0.11;

const rise = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-15% 0px" },
};

function Tile({
  className = "",
  delay,
  children,
}: {
  className?: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      {...rise}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
      className={`rounded-[4px] border border-hairline bg-canvas p-5 hover:border-hairline-strong transition-colors ${className}`}
    >
      {children}
    </motion.section>
  );
}

/* ---------------- Hero: the reader ---------------- */

function HeroTile() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setDone(true), 1500);
    return () => clearTimeout(t);
  }, [inView]);

  const tocRows = ["Abstract", "Background", "Method", "Results", "Conclusion"];

  return (
    <Tile delay={0} className="sm:col-span-2 flex flex-col">
      <p className="font-mono text-[14px] font-bold text-ink">
        Your PDF, distilled.
      </p>
      <p className="mt-1 font-mono text-[12px] leading-5 text-body">
        Dense pages in — a structured document out, with contents and callouts.
      </p>

      <div
        ref={ref}
        className="mt-4 flex-1 overflow-hidden rounded-[4px] border border-hairline bg-surface-dark"
      >
        <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="ml-2 font-mono text-[10px] text-white/50">
            reader — paper.pdf
          </span>
          <span className="ml-auto">
            {done ? (
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-1 rounded-[4px] bg-success/15 px-2 py-0.5 font-mono text-[10px] text-success"
              >
                <Check size={10} /> Ready
              </motion.span>
            ) : (
              <span className="font-mono text-[10px] text-white/50">
                Distilling…
              </span>
            )}
          </span>
        </div>

        <div className="grid grid-cols-[92px_1fr] gap-4 p-4">
          <div className="space-y-2">
            {tocRows.map((t, i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, x: -6 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.55 + i * 0.09, duration: 0.3 }}
                className={`truncate font-mono text-[10px] ${i === 0 ? "font-bold text-white" : "text-white/40"}`}
              >
                {i === 0 ? "▸ " : ""}{t}
              </motion.div>
            ))}
          </div>
          <div className="space-y-2.5">
            <div className="h-2 w-3/5 rounded bg-white/40" />
            <div className="h-1.5 w-full rounded bg-white/15" />
            <div className="h-1.5 w-11/12 rounded bg-white/15" />
            <div className="h-1.5 w-4/5 rounded bg-white/15" />
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.3, duration: 0.4 }}
              className="rounded-[4px] border-l-2 border-accent bg-white/5 px-2.5 py-2 font-mono text-[10px] text-white/70"
            >
              Key idea → attention replaces recurrence
            </motion.div>
          </div>
        </div>
      </div>
    </Tile>
  );
}

/* ---------------- Stat ---------------- */

function StatTile() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [secs, setSecs] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const c = animate(0, 20, {
      duration: 1.1,
      ease: "easeOut",
      onUpdate: (v) => setSecs(Math.round(v)),
    });
    return () => c.stop();
  }, [inView]);

  return (
    <Tile delay={STEP} className="bg-surface-dark !border-ink">
      <div ref={ref} className="flex h-full flex-col">
        <p className="font-mono text-[14px] font-bold text-white">
          Ready fast.
        </p>
        <p className="mt-1 font-mono text-[12px] leading-5 text-white/50">
          For a 30-page paper.
        </p>
        <div className="mt-auto pt-4">
          <span className="font-mono text-[44px] font-bold leading-none tracking-tight text-white whitespace-nowrap">
            ~{secs}s
          </span>
        </div>
      </div>
    </Tile>
  );
}

/* ---------------- Component: the drop ---------------- */

function DropTile() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setFilled(true), 1300);
    return () => clearTimeout(t);
  }, [inView]);

  return (
    <Tile delay={STEP * 2}>
      <p className="font-mono text-[14px] font-bold text-ink">Drop, done.</p>
      <p className="mt-1 font-mono text-[12px] leading-5 text-body">
        No sign-up to try. We handle the rest.
      </p>
      <div ref={ref} className="mt-4">
        <div className="flex flex-col items-center gap-1 rounded-[4px] border border-dashed border-hairline-strong bg-surface-soft px-3 py-4">
          <Upload size={14} className="text-mute" />
          <span className="font-mono text-[10px] text-mute">Drop PDF here</span>
        </div>
        <div className="mt-2 flex items-center gap-2 rounded-[4px] border border-hairline bg-canvas px-2.5 py-2">
          <FileText size={13} className="shrink-0 text-ink" />
          <span className="truncate font-mono text-[11px] text-ink">
            paper.pdf
          </span>
          <span className="ml-auto h-1 w-16 shrink-0 overflow-hidden rounded-full bg-hairline">
            <motion.span
              initial={{ width: "0%" }}
              animate={inView ? { width: "100%" } : {}}
              transition={{ duration: 1.1, ease: "easeInOut" }}
              className="block h-full bg-ink"
            />
          </span>
          {filled ? (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Check size={13} className="shrink-0 text-success" />
            </motion.span>
          ) : null}
        </div>
      </div>
    </Tile>
  );
}

/* ---------------- Diagram: structure kept ---------------- */

function DiagramTile() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });

  return (
    <Tile delay={STEP * 3}>
      <p className="font-mono text-[14px] font-bold text-ink">
        Structure, kept.
      </p>
      <p className="mt-1 font-mono text-[12px] leading-5 text-body">
        Headings and tables stay exactly that.
      </p>
      <div ref={ref} className="mt-4 space-y-0">
        {[
          { label: "PDF", w: "w-10" },
          { label: "Text", w: "w-14" },
          { label: "Your doc", w: "w-20" },
        ].map((n, i) => (
          <div key={n.label} className="flex flex-col items-start">
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25 + i * 0.28, duration: 0.3 }}
              className={`rounded-[4px] border border-hairline bg-surface-soft px-2.5 py-1 font-mono text-[10px] font-bold text-ink ${n.w}`}
            >
              {n.label}
            </motion.span>
            {i < 2 && (
              <span className="ml-3 h-4 w-px bg-hairline-strong">
                <motion.span
                  initial={{ height: 0 }}
                  animate={inView ? { height: "100%" } : {}}
                  transition={{ delay: 0.35 + i * 0.28, duration: 0.2 }}
                  className="block h-full w-px bg-ink"
                />
              </span>
            )}
          </div>
        ))}
      </div>
    </Tile>
  );
}

/* ---------------- Statement: privacy ---------------- */

function PrivacyTile() {
  return (
    <Tile delay={STEP * 4} className="bg-surface-soft">
      <ShieldCheck size={18} className="text-success" />
      <p className="mt-3 font-mono text-[15px] font-bold leading-snug text-ink">
        Private by default.
      </p>
      <p className="mt-1 font-mono text-[12px] leading-5 text-body">
        Your file is deleted right after processing. Never stored, never
        trained on.
      </p>
    </Tile>
  );
}

export function Bento() {
  return (
    <section
      id="features"
      className="mx-auto max-w-[1100px] scroll-mt-20 px-4 py-12 sm:px-6 sm:py-16"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <HeroTile />
        <StatTile />
        <DropTile />
        <DiagramTile />
        <PrivacyTile />
      </div>
    </section>
  );
}
