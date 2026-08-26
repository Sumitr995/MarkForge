import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { checkHealth } from "@/lib/api";
import { toast } from "sonner";

const NAV_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#pipeline" },
  // { label: "Pricing", href: "/#pricing" }, // hidden for now — coming soon
  { label: "Docs", href: "/docs" },
];

function scrollToHash(hash: string) {
  const id = hash.replace(/^#/, "");
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [live, setLive] = useState<boolean | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    checkHealth().then((ok) => mounted && setLive(ok));
    const id = setInterval(() => checkHealth().then((ok) => mounted && setLive(ok)), 30_000);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  // if navigated with hash (e.g. /#pricing from /app), scroll after route change
  useEffect(() => {
    if (location.hash) setTimeout(() => scrollToHash(location.hash), 80);
  }, [location.pathname, location.hash]);

  const handleNav = (href: string) => {
    if (href.startsWith("/#")) {
      const hash = href.slice(1); // "#features"
      if (location.pathname !== "/") {
        navigate(href);
      } else {
        scrollToHash(hash);
        history.replaceState(null, "", hash);
      }
      setOpen(false);
      return;
    }
    // normal route
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-canvas/90 backdrop-blur border-b border-hairline">
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 h-[56px] flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="h-7 w-7 rounded-[4px] bg-ink flex items-center justify-center shrink-0 group-hover:bg-ink-deep transition-colors">
            <span className="font-mono text-[11px] font-bold tracking-widest text-canvas">MF</span>
          </div>
          <span className="font-mono text-[14px] font-bold tracking-tight text-ink group-hover:text-charcoal transition-colors">MarkForge</span>
          <span className="hidden lg:inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-mute border border-hairline rounded-[4px] px-1.5 py-0.5">
            <span className={`h-1.5 w-1.5 rounded-full ${live === null ? "bg-ash animate-pulse" : live ? "bg-success" : "bg-danger"}`} />
            {live === null ? "checking" : live ? "live" : "offline"}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-5">
          {NAV_LINKS.map((l) =>
            l.href.startsWith("/#") ? (
              <button
                key={l.label}
                onClick={() => handleNav(l.href)}
                className="font-mono text-[13px] font-medium text-mute hover:text-ink transition-colors"
              >
                {l.label}
              </button>
            ) : (
              <Link
                key={l.label}
                to={l.href}
                className="font-mono text-[13px] font-medium text-mute hover:text-ink transition-colors"
              >
                {l.label}
              </Link>
            )
          )}
          <a
            href="https://github.com/Sumitr995/MarkForge"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[13px] text-mute hover:text-ink flex items-center gap-1"
          >
            GitHub <span className="text-ash text-[11px]">↗</span>
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <div className="sm:hidden">
            <ThemeToggle variant="compact" />
          </div>
          <Link to="/app" className="hidden sm:inline-flex">
            <Button variant="primary">Try free →</Button>
          </Link>
          <Link to="/app" className="sm:hidden">
            <Button variant="primary" size="sm">
              Try
            </Button>
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-[4px] border border-hairline bg-canvas text-ink hover:bg-surface-soft transition-colors"
            aria-label="menu"
            aria-expanded={open}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-hairline bg-canvas overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((l) =>
                l.href.startsWith("/#") ? (
                  <button
                    key={l.label}
                    onClick={() => handleNav(l.href)}
                    className="text-left font-mono text-[14px] text-ink py-2 border-b border-hairline last:border-0 hover:text-charcoal"
                  >
                    {l.label}
                  </button>
                ) : (
                  <Link
                    key={l.label}
                    to={l.href}
                    onClick={() => setOpen(false)}
                    className="font-mono text-[14px] text-ink py-2 border-b border-hairline last:border-0"
                  >
                    {l.label}
                  </Link>
                )
              )}
              <a
                href="https://github.com/Sumitr995/MarkForge"
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="text-left font-mono text-[14px] text-mute py-2 hover:text-ink"
              >
                GitHub ↗
              </a>
              <Link to="/app" onClick={() => setOpen(false)} className="mt-2">
                <Button variant="primary" className="w-full">
                  Try free →
                </Button>
              </Link>
              <div className="flex items-center justify-between pt-3 gap-2">
                <div className="font-mono text-[11px] text-mute flex items-center gap-1.5">
                  <span className={`h-1.5 w-1.5 rounded-full ${live ? "bg-success" : "bg-ash"}`} /> API {live ? "live" : "checking…"}
                </div>
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
