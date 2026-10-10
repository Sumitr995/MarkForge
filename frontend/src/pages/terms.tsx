import { Link } from "react-router-dom";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-[760px] px-4 sm:px-6 py-10">
      <div className="rounded-[4px] border border-warning/30 bg-warning/10 px-3 py-2 font-mono text-[11px] text-ink">
        Draft for beta — TODO: needs legal review.
      </div>
      <div className="mt-4 font-mono text-[11px] tracking-widest uppercase text-mute">Terms of Use</div>
      <h1 className="mt-2 font-mono text-[24px] font-bold text-ink">Simple rules for using MarkForge</h1>
      <p className="mt-2 font-mono text-[13px] leading-6 text-body">
        MarkForge turns your PDF into a structured, readable document. By uploading a file, you agree to these terms.
      </p>

      <div className="mt-8 space-y-6 font-mono text-[13px] leading-6 text-body">
        <section>
          <h2 className="text-[13px] font-bold text-ink">1. Acceptable use</h2>
          <p className="mt-1">Use MarkForge for lawful purposes only. Only upload files you have the right to process. Do not attempt to abuse, overload, or circumvent the service.</p>
        </section>
        <section>
          <h2 className="text-[13px] font-bold text-ink">2. Limits</h2>
          <p className="mt-1">PDFs only, max 20 MB per file. Free beta: 3 distills per day, 20 uploads per hour per address. We may rate-limit or block abuse to keep the service running.</p>
        </section>
        <section>
          <h2 className="text-[13px] font-bold text-ink">3. Your content</h2>
          <p className="mt-1">You keep all rights to your files and outputs. Your upload is processed once, then deleted. Extracted images are kept up to 24 hours so you can read them, then removed.</p>
        </section>
        <section>
          <h2 className="text-[13px] font-bold text-ink">4. No warranty</h2>
          <p className="mt-1">MarkForge is a beta provided as-is, without warranties of any kind. Outputs are AI-restructured and may contain errors — please verify important details.</p>
        </section>
        <section>
          <h2 className="text-[13px] font-bold text-ink">5. Changes</h2>
          <p className="mt-1">We may update these terms as the product evolves. Continued use after changes means you accept the new terms.</p>
        </section>
      </div>

      <div className="mt-8 flex gap-3 font-mono text-[12px]">
        <Link to="/privacy" className="underline underline-offset-4 hover:text-ink text-mute">Privacy Policy →</Link>
        <Link to="/contact" className="underline underline-offset-4 hover:text-ink text-mute">Contact →</Link>
      </div>
    </div>
  );
}
