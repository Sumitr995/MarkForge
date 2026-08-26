import { useEffect, useState } from "react";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function extractToc(markdown: string): TocItem[] {
  const lines = markdown.split("\n");
  const items: TocItem[] = [];
  for (const line of lines) {
    const m = line.match(/^(#{1,3})\s+(.+)$/);
    if (m) {
      const level = m[1].length;
      const text = m[2].trim().replace(/\*\*/g, "");
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      items.push({ id, text, level });
    }
  }
  return items.slice(0, 20);
}

export function TOC({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <nav className="sticky top-[64px] max-h-[calc(100dvh-80px)] overflow-auto">
      <div className="rounded-[4px] border border-hairline bg-surface-soft p-3">
        <div className="font-mono text-[10px] tracking-widest uppercase text-mute mb-2">Contents</div>
        <ul className="space-y-1">
          {items.map((it) => (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                className={`block font-mono text-[12px] leading-5 hover:text-ink transition-colors ${active === it.id ? "text-ink font-bold" : "text-mute"} ${it.level === 1 ? "" : it.level === 2 ? "pl-3" : "pl-6"}`}
              >
                {it.level === 1 ? "▸ " : "· "}
                {it.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-3 rounded-[4px] border border-hairline bg-canvas p-3 font-mono text-[11px] text-mute">
        Tip: Press <span className="rounded bg-surface-card border border-hairline px-1">⌘</span> + <span className="rounded bg-surface-card border border-hairline px-1">K</span> to search
      </div>
    </nav>
  );
}
