import { API_PUBLIC_URL } from "@/lib/constants";
import { Link } from "react-router-dom";

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-[900px] px-4 sm:px-6 py-10">
      <div className="font-mono text-[11px] tracking-widest uppercase text-mute">Documentation</div>
      <h1 className="mt-2 font-mono text-[24px] font-bold text-ink">API & Product</h1>
      <p className="mt-2 font-mono text-[13px] leading-6 text-body max-w-2xl">
        One upload endpoint in beta. Base URL: <code className="rounded border border-hairline bg-surface-card px-1">{API_PUBLIC_URL}</code>.
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
            <li>Your PDF is processed once and deleted — never stored.</li>
            <li>No training on your data. Your content is never reused.</li>
            <li>You own the output: copy, export, and share freely.</li>
          </ul>
        </div>

        <div className="rounded-[4px] border border-hairline bg-surface-soft p-4 font-mono text-[12px] leading-5 text-body">
          Point your app at the base URL above. Upload a PDF with a single file field named <code className="bg-canvas border border-hairline px-1 rounded">file</code>. See README for local setup.
        </div>

        <div className="text-center">
          <Link to="/app" className="inline-flex rounded-[4px] bg-ink px-5 py-2.5 font-mono text-[13px] font-medium text-canvas">Try the app →</Link>
        </div>
      </div>
    </div>
  );
}
