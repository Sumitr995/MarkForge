import { Link } from "react-router-dom";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[760px] px-4 sm:px-6 py-10">
      <div className="rounded-[4px] border border-warning/30 bg-warning/10 px-3 py-2 font-mono text-[11px] text-ink">
        Draft for beta — TODO: needs legal review.
      </div>
      <div className="mt-4 font-mono text-[11px] tracking-widest uppercase text-mute">Privacy Policy</div>
      <h1 className="mt-2 font-mono text-[24px] font-bold text-ink">What happens to your files</h1>
      <p className="mt-2 font-mono text-[13px] leading-6 text-body">
        Short version: your file is processed once, then deleted. We never sell data or train on your documents.
      </p>

      <div className="mt-8 space-y-6 font-mono text-[13px] leading-6 text-body">
        <section>
          <h2 className="text-[13px] font-bold text-ink">1. Third-party AI processing</h2>
          <p className="mt-1">Your document text is sent to a third-party AI provider to restructure it into a readable document. The provider processes your text only to return the result — it does not keep or train on your data under our agreement.</p>
        </section>
        <section>
          <h2 className="text-[13px] font-bold text-ink">2. How long files are kept</h2>
          <p className="mt-1">Uploaded PDFs are deleted immediately after processing. Extracted images are kept up to 24 hours so you can read them, then automatically removed. We do not keep a permanent copy.</p>
        </section>
        <section>
          <h2 className="text-[13px] font-bold text-ink">3. No training on your data</h2>
          <p className="mt-1">We do not train models on your documents. Your content is returned to you and forgotten.</p>
        </section>
        <section>
          <h2 className="text-[13px] font-bold text-ink">4. What we log</h2>
          <p className="mt-1">We log basic request details: time, file size and type, a random request ID, and error messages. We do not log your document content. Logs are used only to keep the service running and debug failures.</p>
        </section>
        <section>
          <h2 className="text-[13px] font-bold text-ink">5. Your choices</h2>
          <p className="mt-1">Don't upload sensitive documents you can't share with an AI provider. Contact us anytime to ask about deletion or handling of your data.</p>
        </section>
      </div>

      <div className="mt-8 flex gap-3 font-mono text-[12px]">
        <Link to="/terms" className="underline underline-offset-4 hover:text-ink text-mute">Terms →</Link>
        <Link to="/contact" className="underline underline-offset-4 hover:text-ink text-mute">Contact →</Link>
      </div>
    </div>
  );
}
