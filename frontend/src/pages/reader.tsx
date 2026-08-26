import { useDocumentStore } from "@/stores/document-store";
import { MarkdownView } from "@/components/reader/markdown-view";
import { Gallery } from "@/components/reader/gallery";
import { TOC, extractToc } from "@/components/reader/toc";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { Copy, Download, Search, Share2, ArrowLeft, FileWarning } from "lucide-react";
import { toast } from "sonner";

const SAMPLE_MARKDOWN = `# Attention Is All You Need — Distilled

> **TL;DR** The Transformer replaces recurrence with self-attention. Each position attends to all positions in parallel.

## 1 — Why attention alone?

Recurrent models are sequential — hard to parallelize. Attention is O(1) path length, fully parallel.

\`\`\`python
Attention(Q, K, V) = softmax(QK^T / sqrt(d_k)) V
\`\`\`

| Aspect | RNN | Transformer |
|---|---|---|
| Parallelism | sequential | fully parallel |
| Path | O(n) | O(1) |

## 2 — Multi-head: many lenses

8 heads learn different subspaces — syntax, coreference, position — then concatenate.

> **Callout:** Each head is cheap. Together they are expressive.

## 3 — What it proved

- BLEU 28.4 on WMT14 En-De (+2.0 SOTA), 3.5 days on 8 GPUs
- No recurrence, no convolution — just attention + FFN

---

*This is a demo. Upload your own PDF at /app to see your distilled document here.*
`;

export default function ReaderPage() {
  const doc = useDocumentStore((s) => s.doc);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const markdown = doc?.markdown ?? SAMPLE_MARKDOWN;
  const toc = useMemo(() => extractToc(markdown), [markdown]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(markdown);
    toast.success("Markdown copied", { description: "Paste into Notion, Obsidian, or any editor." });
  };
  const handleDownload = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = (doc?.originalName ?? "markforge-distilled").replace(/\.pdf$/i, ".md");
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Markdown downloaded");
  };

  return (
    <div className="mx-auto max-w-[1100px] px-4 sm:px-6 py-6">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between border border-hairline rounded-[4px] bg-canvas px-3 py-2.5">
        <div className="flex items-center gap-2 min-w-0">
          <Link to="/app" className="inline-flex h-8 w-8 items-center justify-center rounded-[4px] border border-hairline bg-surface-soft text-ink shrink-0">
            <ArrowLeft size={14} />
          </Link>
          <div className="min-w-0">
            <div className="font-mono text-[12px] font-bold text-ink truncate max-w-[220px] sm:max-w-[360px]">{doc?.originalName ?? "Demo — attention-is-all-you-need.md"}</div>
            <div className="font-mono text-[11px] text-mute truncate">{doc ? `${(markdown.length / 1000).toFixed(1)}k chars · ${toc.length} sections · private · not stored` : "demo document · upload yours at /app"} · <span className="text-success">● ready</span></div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-[220px]">
            <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-mute" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search (⌘K)" className="w-full h-8 rounded-[4px] border border-hairline bg-surface-soft pl-7 pr-2 font-mono text-[12px] placeholder:text-mute focus:bg-canvas focus:border-ink focus:outline-none" />
          </div>
          <Button variant="secondary" size="sm" onClick={handleCopy} className="shrink-0"><Copy size={14} className="mr-1" /> Copy</Button>
          <Button variant="primary" size="sm" onClick={handleDownload} className="shrink-0"><Download size={14} className="mr-1" /> Export</Button>
          <button onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success("Link copied"); }} className="hidden sm:inline-flex h-8 w-8 items-center justify-center rounded-[4px] border border-hairline bg-canvas text-mute hover:text-ink"><Share2 size={14} /></button>
        </div>
      </div>

      {!doc && (
        <div className="mt-4 flex items-start gap-2 rounded-[4px] border border-hairline bg-warning/10 px-3 py-2.5 font-mono text-[12px] text-ink">
          <FileWarning size={16} className="shrink-0 mt-0.5 text-warning" />
          <span>You’re viewing a <span className="font-bold">demo</span>. Your uploads open here after distillation. <button onClick={() => navigate("/app")} className="underline underline-offset-4 font-medium">Distill a PDF →</button></span>
        </div>
      )}

      <div className="mt-6 grid lg:grid-cols-[220px_1fr] gap-6">
        <aside className="hidden lg:block"><TOC items={toc} /></aside>
        <div className="min-w-0 rounded-[4px] border border-hairline bg-canvas p-5 sm:p-8">
          <MarkdownView markdown={markdown} />
          {doc?.assets?.length ? <Gallery assets={doc.assets} /> : null}
        </div>
      </div>

      <div className="lg:hidden mt-6">
        <div className="rounded-[4px] border border-hairline bg-surface-soft p-3">
          <div className="font-mono text-[10px] tracking-widest uppercase text-mute mb-2">On this page</div>
          <div className="flex flex-wrap gap-1.5">{toc.map((t) => (<a key={t.id} href={`#${t.id}`} className="rounded-[4px] border border-hairline bg-canvas px-2 py-1 font-mono text-[11px] text-mute hover:text-ink">{t.text}</a>))}</div>
        </div>
      </div>
    </div>
  );
}
