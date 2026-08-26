import { Dropzone } from "@/components/reader/dropzone";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { API_PUBLIC_URL, GUEST_DAILY_LIMIT } from "@/lib/constants";

export default function AppPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 sm:px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="inline-flex rounded-[4px] border border-hairline bg-surface-card px-2 py-1 font-mono text-[11px] tracking-widest uppercase text-mute">
          Distill — free during beta
        </div>
        <h1 className="mt-3 font-mono text-[22px] sm:text-[26px] font-bold text-ink">Turn your PDF into knowledge</h1>
        <p className="mx-auto mt-2 max-w-xl font-mono text-[13px] leading-6 text-body">
          Research papers, book chapters, docs. We extract and restructure them into a readable document with TOC, callouts, and definitions. Your file is deleted after processing.
        </p>
      </motion.div>

      <div className="mt-8">
        <Dropzone />
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-4">
        {[
          { k: "[01]", t: "Extract", d: "High-fidelity PDF → Markdown, with tables and metadata preserved." },
          { k: "[02]", t: "Enhance", d: "AI restructures by document type — paper, book, notes, docs — each with its own lens." },
          { k: "[03]", t: "Read", d: "TOC, callouts, definition cards, code blocks. Copy, share, or export Markdown." },
        ].map((s) => (
          <div key={s.k} className="rounded-[4px] border border-hairline bg-canvas p-4">
            <div className="font-mono text-[11px] font-bold text-ink">{s.k} — {s.t}</div>
            <div className="mt-1 font-mono text-[12px] leading-5 text-body">{s.d}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-[4px] border border-ink bg-surface-dark text-on-dark p-4 font-mono text-[12px]">
        <div className="flex items-center justify-between">
          <span className="text-on-dark-mute">API — for automation</span>
          <Link to="/docs" className="text-[11px] underline underline-offset-4 text-on-dark-mute hover:text-on-dark">Full docs →</Link>
        </div>
        <div className="mt-2 overflow-auto rounded-[4px] bg-white/10 px-3 py-2">
          <span className="text-success">POST</span> <span className="text-on-dark">{API_PUBLIC_URL}/api/v1/documents/upload</span>
          <span className="text-on-dark-mute"> — multipart/form-data · field: file · PDF · 20 MB</span>
        </div>
        <div className="mt-2 font-mono text-[11px] text-on-dark-mute">
          Free beta: {GUEST_DAILY_LIMIT}/day per IP. Pro adds higher limits + API key. File is never stored.
        </div>
      </div>
    </div>
  );
}
