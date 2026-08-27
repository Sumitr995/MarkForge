import { useState } from "react";
import { ChevronLeft, ChevronRight, Image as ImageIcon, ExternalLink } from "lucide-react";

interface Asset {
  type: string;
  path: string; // now absolute http://localhost:5000/uploads/... from backend
  page: number;
  width?: number;
  height?: number;
}

export function Gallery({ assets }: { assets: Asset[] }) {
  const [idx, setIdx] = useState(0);
  if (!assets.length) return null;
  const cur = assets[idx];

  return (
    <div className="mt-8 rounded-[4px] border border-hairline bg-canvas overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b border-hairline bg-surface-soft">
        <div className="flex items-center gap-2 font-mono text-[11px] font-bold tracking-wide uppercase text-ink">
          <ImageIcon size={12} className="text-mute" /> Figures — {assets.length}
        </div>
        <span className="font-mono text-[10px] text-mute">{idx + 1} / {assets.length} · p.{cur.page}</span>
      </div>

      {/* direct image — no proxy, no transform */}
      <div className="relative bg-surface-soft">
        <div className="aspect-[16/10] flex items-center justify-center bg-canvas p-2">
          <img
            src={cur.path}
            alt={`Fig ${idx + 1} p.${cur.page}`}
            className="max-h-full max-w-full object-contain"
            loading="lazy"
            crossOrigin="anonymous"
            onError={(e) => {
              const t = e.target as HTMLImageElement;
              t.style.display = "none";
              const err = document.getElementById(`err-${idx}`);
              if (err) err.classList.remove("hidden");
            }}
          />
          <div id={`err-${idx}`} className="hidden absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
            <span className="font-mono text-[11px] text-mute">image failed to load</span>
            <a href={cur.path} target="_blank" rel="noreferrer" className="font-mono text-[10px] text-accent underline break-all">{cur.path}</a>
          </div>
        </div>

        <button onClick={() => setIdx((i) => (i - 1 + assets.length) % assets.length)} className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-[4px] bg-ink text-canvas flex items-center justify-center hover:bg-ink-deep">
          <ChevronLeft size={16} />
        </button>
        <button onClick={() => setIdx((i) => (i + 1) % assets.length)} className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-[4px] bg-ink text-canvas flex items-center justify-center hover:bg-ink-deep">
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="px-3 py-2 border-t border-hairline space-y-2">
        <div className="flex items-center justify-between font-mono text-[11px]">
          <span className="text-ink font-bold">Fig {idx + 1} · p.{cur.page} {cur.width ? `· ${cur.width}×${cur.height}` : ""}</span>
          <a href={cur.path} target="_blank" rel="noreferrer" className="text-mute hover:text-ink flex items-center gap-1 text-[10px]">
            open direct <ExternalLink size={10} />
          </a>
        </div>
        <div className="font-mono text-[10px] text-ash break-all bg-surface-soft border border-hairline rounded-[4px] px-2 py-1">
          {cur.path}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {assets.map((a, i) => (
            <button key={i} onClick={() => setIdx(i)} className={`shrink-0 h-14 w-20 rounded-[4px] border overflow-hidden ${i === idx ? "border-ink" : "border-hairline"}`}>
              <img src={a.path} alt="" className="h-full w-full object-cover" loading="lazy" crossOrigin="anonymous" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
