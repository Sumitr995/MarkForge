import { API_PUBLIC_URL, SITE_URL } from "@/lib/constants";
import { Link } from "react-router-dom";

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-[900px] px-4 sm:px-6 py-10">
      <div className="font-mono text-[11px] tracking-widest uppercase text-mute">Documentation</div>
      <h1 className="mt-2 font-mono text-[24px] font-bold text-ink">API & Product</h1>
      <p className="mt-2 font-mono text-[13px] leading-6 text-body max-w-2xl">
        All routes under <code className="rounded border border-hairline bg-surface-card px-1">/api/v1</code>. One upload endpoint in MVP; more (auth, history, export) next. Base URL: <code className="rounded border border-hairline bg-surface-card px-1">{API_PUBLIC_URL}</code> (or <code className="rounded border border-hairline bg-surface-card px-1">{SITE_URL}/api</code> when same-origin).
      </p>

      <div className="mt-8 grid gap-6">
        <div className="rounded-[4px] border border-hairline bg-canvas p-5">
          <h2 className="font-mono text-[13px] font-bold text-ink">POST /api/v1/documents/upload</h2>
          <p className="mt-1 font-mono text-[12px] text-body">multipart/form-data · field: <code className="bg-surface-card border border-hairline px-1 rounded">file</code> · PDF only · 20 MB max · free: 3/day</p>
          <pre className="mt-3 overflow-auto rounded-[4px] bg-surface-dark p-4 font-mono text-[11px] leading-5 text-on-dark">
{`curl -X POST ${API_PUBLIC_URL}/api/v1/documents/upload \\
  -F file=@paper.pdf

# → 200
{
  "success": true,
  "message": "PDF uploaded successfully",
  "data": { "originalName": "paper.pdf", "markdown": "# ...", "assets": [] }
}

# → 400  { "success": false, "message": "Only PDF files are allowed" }
# → 413  { "success": false, "message": "File too large" }
# → 429  { "success": false, "message": "Too many requests" }`}
          </pre>
        </div>

        <div className="rounded-[4px] border border-hairline bg-canvas p-5">
          <h2 className="font-mono text-[13px] font-bold text-ink">GET /api/v1/health</h2>
          <p className="mt-1 font-mono text-[12px] text-body">Liveness probe. No auth.</p>
          <pre className="mt-3 rounded-[4px] bg-surface-card border border-hairline p-3 font-mono text-[11px] text-ink">{`GET ${API_PUBLIC_URL}/api/v1/health → { "success": true, "status": "OK" }`}</pre>
        </div>

        <div className="rounded-[4px] border border-hairline bg-canvas p-5">
          <h2 className="font-mono text-[13px] font-bold text-ink">Product guarantees</h2>
          <ul className="mt-2 space-y-1.5 font-mono text-[12.5px] leading-5 text-body list-disc pl-5 marker:text-mute">
            <li>Your PDF is processed in a temp file and deleted in a <code className="bg-surface-card border border-hairline px-1 rounded">finally</code> block — never persisted.</li>
            <li>No training on your data. Groq inference only.</li>
            <li>You own the output: Markdown + assets. Copy, export, share.</li>
          </ul>
        </div>

        <div className="rounded-[4px] border border-hairline bg-surface-soft p-4 font-mono text-[12px] leading-5 text-body">
          Frontend env: set <code className="bg-canvas border border-hairline px-1 rounded">VITE_API_URL</code> to your API origin (e.g. <code className="bg-canvas border border-hairline px-1 rounded">https://api.markforge.app</code>). Leave empty for same-origin <code className="bg-canvas border border-hairline px-1 rounded">/api</code> (Vite proxies <code className="bg-canvas border border-hairline px-1 rounded">/api → :5000</code> in dev). See <code className="bg-canvas border border-hairline px-1 rounded">.env.example</code>.
        </div>

        <div className="text-center">
          <Link to="/app" className="inline-flex rounded-[4px] bg-ink px-5 py-2.5 font-mono text-[13px] font-medium text-canvas">Try the app →</Link>
        </div>
      </div>
    </div>
  );
}
