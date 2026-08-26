import { useState } from "react";
import { API_BASE } from "@/lib/constants";
import { X, ZoomIn, Image as ImageIcon } from "lucide-react";

interface Asset {
  type: string;
  path: string;
  page: number;
  width?: number;
  height?: number;
}

function assetUrl(path: string) {
  // backend now returns absolute http://localhost:5000/uploads/... — use directly
  if (path.startsWith("http")) return path;
  const base = API_BASE || "http://localhost:5000";
  return `${base}${path}`;
}

export function Gallery({ assets }: { assets: Asset[] }) {
  const [active, setActive] = useState<Asset | null>(null);
  if (!assets.length) return null;

  return (
    <>
      <div className="mt-8 rounded-[4px] border border-hairline bg-canvas overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 border-b border-hairline bg-surface-soft">
          <div className="flex items-center gap-2 font-mono text-[11px] font-bold tracking-wide uppercase text-ink">
            <ImageIcon size={12} className="text-mute" /> Figures — {assets.length}
          </div>
          <span className="font-mono text-[10px] text-mute">kept 24h · page order</span>
        </div>

        <div className="p-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {assets.map((a, i) => (
            <button
              key={i}
              onClick={() => setActive(a)}
              className="group text-left rounded-[4px] border border-hairline bg-surface-soft overflow-hidden hover:border-hairline-strong transition-colors"
            >
              <div className="aspect-[4/3] bg-canvas overflow-hidden flex items-center justify-center relative">
                <img
                  src={assetUrl(a.path)}
                  alt={`Figure p.${a.page} — ${a.width ?? "?"}×${a.height ?? "?"}`}
                  className="h-full w-full object-contain p-1 group-hover:scale-[1.02] transition-transform"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove("hidden");
                  }}
                />
                <div className="hidden absolute inset-0 flex flex-col items-center justify-center gap-1 bg-surface-soft p-2 text-center">
                  <span className="font-mono text-[11px] text-mute">image unavailable</span>
                  <span className="font-mono text-[10px] text-ash truncate max-w-[120px]">{a.path}</span>
                </div>
                <span className="absolute top-1.5 right-1.5 rounded-[4px] bg-ink/80 px-1.5 py-0.5 font-mono text-[10px] text-canvas flex items-center gap-1">
                  <ZoomIn size={10} /> p.{a.page}
                </span>
              </div>
              <div className="px-2 py-1.5 border-t border-hairline">
                <div className="font-mono text-[11px] text-ink truncate">Fig {i + 1} · p.{a.page}</div>
                <div className="font-mono text-[10px] text-mute">{a.width && a.height ? `${a.width}×${a.height}` : "image"} · {a.path.split("/").pop()?.slice(0, 12)}…</div>
              </div>
            </button>
          ))}
        </div>
        <div className="px-3 pb-2 font-mono text-[10px] text-mute">Tap to enlarge · kept 24h</div>
      </div>

      {active && (
        <div className="fixed inset-0 z-50 bg-ink/90 backdrop-blur-sm flex flex-col p-4 sm:p-6" onClick={() => setActive(null)}>
          <div className="flex items-center justify-between text-canvas font-mono text-[12px] mb-3">
            <span>Fig · p.{active.page} · {active.width}×{active.height}</span>
            <button onClick={() => setActive(null)} className="h-8 w-8 rounded-[4px] bg-white/10 flex items-center justify-center hover:bg-white/20">
              <X size={16} />
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center min-h-0">
            <img
              src={assetUrl(active.path)}
              alt={`Figure p.${active.page}`}
              className="max-h-full max-w-full object-contain rounded-[4px] bg-white"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="mt-3 text-center font-mono text-[11px] text-white/60 truncate">{active.path}</div>
        </div>
      )}
    </>
  );
}
