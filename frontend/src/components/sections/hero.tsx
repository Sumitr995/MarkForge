import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="mx-auto max-w-[1100px] px-4 sm:px-6 pt-10 sm:pt-16 pb-12">
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-[4px] border border-hairline bg-surface-card px-3 py-1.5 font-mono text-[12px]">
          <Badge>New</Badge>
          <span className="text-ink">Public beta — free during MVP</span>
          <span className="hidden sm:inline text-mute">· 3 free distills / day</span>
        </div>
      </div>

      <div className="mt-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl font-mono text-[28px] sm:text-[38px] font-bold leading-[1.25] tracking-tight text-ink"
        >
          PDFs, distilled
          <br />
          into knowledge.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mx-auto mt-4 max-w-xl font-mono text-[14px] leading-6 text-body"
        >
          Dense PDF in. Structured doc out. TOC, callouts, tables — ready to read.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link to="/app">
            <Button variant="primary" size="lg" className="min-w-[184px]">Distill a PDF — free →</Button>
          </Link>
          <a href="#pipeline" className="font-mono text-[13px] text-mute hover:text-ink underline underline-offset-4">
            See how it works
          </a>
        </motion.div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 font-mono text-[11px] text-mute">
          <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-success animate-pulse" /> Live</span>
          <span>·</span><span>No sign-up to try</span>
          <span>·</span><span>Deletes after processing</span>
          <span>·</span><span>PDF · 20 MB max</span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.22 }}
        className="mt-10 overflow-hidden rounded-none border border-ink bg-surface-dark text-on-dark"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 font-mono text-[11px] text-on-dark-mute">
          <span>markforge — 80×24</span>
          <span className="hidden sm:inline">privacy-first · no persistence</span>
        </div>

        <div className="px-6 sm:px-10 py-8 sm:py-10 text-center">
          <pre className="mx-auto inline-block text-left font-mono text-[6px] sm:text-[8px] leading-none text-on-dark tracking-widest">
{` ███╗   ███╗ █████╗ ██████╗ ██╗  ██╗███████╗ ██████╗ ██████╗  ██████╗ ███████╗
 ████╗ ████║██╔══██╗██╔══██╗██║ ██╔╝██╔════╝██╔═══██╗██╔══██╗██╔════╝ ██╔════╝
 ██╔████╔██║███████║██████╔╝█████╔╝ █████╗  ██║   ██║██████╔╝██║  ███╗█████╗  
 ██║╚██╔╝██║██╔══██║██╔══██╗██╔═██╗ ██╔══╝  ██║   ██║██╔══██╗██║   ██║██╔══╝  
 ██║ ╚═╝ ██║██║  ██║██║  ██║██║  ██╗██║     ╚██████╔╝██║  ██║╚██████╔╝███████╗
 ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝`}
          </pre>
          <div className="mt-6 font-mono text-[12px] tracking-widest uppercase text-on-dark-mute">
            AI Markdown Distiller · Private beta
          </div>

          <div className="mx-auto mt-6 max-w-2xl rounded-[4px] bg-surface-dark-elevated px-3 py-2.5 text-left font-mono text-[13px] flex items-center gap-2">
            <span className="text-ash">│</span>
            <span className="text-on-dark">Distill</span>
            <span className="rounded-[4px] bg-white/10 px-1.5 py-0.5 text-[11px] text-on-dark">auto • research_paper</span>
            <span className="text-on-dark-mute hidden sm:inline">→ TOC + callouts</span>
            <span className="ml-auto hidden sm:inline-flex h-4 w-px bg-white/20" />
            <span className="ml-auto sm:ml-0 text-ash text-[11px]">↵ run</span>
          </div>

          <div className="mx-auto mt-4 max-w-2xl text-left font-mono text-[11px] leading-5">
            <div className="text-ash">$ markforge upload ./paper.pdf --enhance</div>
            <div className="text-on-dark-mute"><span className="text-success">[✓]</span> 42 pages → structured (12 sections, 9.2k words)</div>
            <div className="text-on-dark-mute"><span className="text-success">[✓]</span> figures & tables preserved</div>
            <div className="text-accent">→ ready to read · share · export</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-white/10 px-4 py-2.5 font-mono text-[11px] text-ash">
          <span>Your file is deleted after processing — never stored.</span>
          <span className="rounded-[4px] bg-white/10 px-2 py-1 text-on-dark">⌘ K — open reader</span>
        </div>
      </motion.div>

      <div className="mx-auto mt-6 text-center">
        <Link to="/docs" className="font-mono text-[11px] text-mute hover:text-ink underline underline-offset-4">
          Developer? → API docs
        </Link>
      </div>
    </section>
  );
}
