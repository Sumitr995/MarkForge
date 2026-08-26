import { Sun, Moon, Monitor, ChevronDown } from "lucide-react";
import { useTheme, type Theme } from "@/lib/theme";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const OPTIONS: { id: Theme; label: string; icon: typeof Sun; desc: string }[] = [
  { id: "system", label: "System", icon: Monitor, desc: "Follows OS" },
  { id: "light", label: "Light", icon: Sun, desc: "Cream canvas" },
  { id: "dark", label: "Dark", icon: Moon, desc: "Near-black" },
];

export function ThemeToggle({ variant = "default" }: { variant?: "default" | "compact" }) {
  const { theme, resolved, setTheme, cycle } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const active = OPTIONS.find((o) => o.id === theme) ?? OPTIONS[0];
  const ResolvedIcon = resolved === "dark" ? Moon : Sun;

  if (variant === "compact") {
    return (
      <button
        onClick={cycle}
        aria-label={`Theme: ${theme} (${resolved}) — tap to cycle`}
        title={`Theme: ${theme} (${resolved}) — tap to cycle: system → light → dark`}
        className="inline-flex h-9 w-9 items-center justify-center rounded-[4px] border border-hairline bg-canvas text-ink hover:bg-surface-soft transition-colors"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={`${theme}-${resolved}`}
            initial={{ rotate: -20, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 20, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {theme === "system" ? <Monitor size={16} /> : <ResolvedIcon size={16} />}
          </motion.span>
        </AnimatePresence>
      </button>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Select theme"
        className="inline-flex items-center gap-1.5 h-9 rounded-[4px] border border-hairline bg-canvas px-2.5 font-mono text-[12px] text-ink hover:bg-surface-soft transition-colors"
      >
        <active.icon size={14} className="text-mute" />
        <span className="hidden sm:inline font-medium">{active.label}</span>
        <span className="hidden sm:inline text-mute text-[11px]">· {resolved}</span>
        <ChevronDown size={12} className={`text-ash transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.16 }}
            role="menu"
            className="absolute right-0 top-full mt-2 w-[188px] rounded-[4px] border border-hairline bg-canvas py-1 shadow-lg z-50 overflow-hidden"
          >
            {OPTIONS.map((o) => {
              const isActive = theme === o.id;
              return (
                <button
                  key={o.id}
                  role="menuitemradio"
                  aria-checked={isActive}
                  onClick={() => {
                    setTheme(o.id);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-left font-mono text-[12px] hover:bg-surface-soft transition-colors ${isActive ? "bg-surface-soft text-ink" : "text-body"}`}
                >
                  <o.icon size={14} className={isActive ? "text-ink" : "text-mute"} />
                  <span className={`flex-1 ${isActive ? "font-bold" : ""}`}>{o.label}</span>
                  <span className="text-[11px] text-mute">{o.desc}</span>
                  {isActive && <span className="text-ink text-[11px]">●</span>}
                </button>
              );
            })}
            <div className="border-t border-hairline mt-1 pt-1 px-3 pb-1 font-mono text-[10px] text-mute">
              <span className="hidden sm:inline">System follows OS preference</span>
              <span className="sm:hidden">Follows OS · saved locally</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
