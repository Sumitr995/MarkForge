import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-canvas mt-24">
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-[13px] font-mono">
          <div>
            <div className="font-bold text-ink mb-3 tracking-wide uppercase text-[11px]">Product</div>
            <ul className="space-y-1.5 text-mute">
              <li><Link to="/#features" className="hover:text-ink">Features</Link></li>
              <li><Link to="/#pipeline" className="hover:text-ink">How it works</Link></li>
              <li><Link to="/app" className="hover:text-ink">Try now</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-bold text-ink mb-3 tracking-wide uppercase text-[11px]">Developers</div>
            <ul className="space-y-1.5 text-mute">
              <li><Link to="/docs" className="hover:text-ink">API Docs</Link></li>
              <li><Link to="/reader" className="hover:text-ink">Reader demo</Link></li>
              <li><a href="https://github.com/Sumitr995/MarkForge" target="_blank" rel="noreferrer" className="hover:text-ink">GitHub ↗</a></li>
            </ul>
          </div>
          <div>
            <div className="font-bold text-ink mb-3 tracking-wide uppercase text-[11px]">Connect</div>
            <ul className="space-y-1.5 text-mute">
              <li><a href="https://sumitr995.me" target="_blank" rel="noreferrer" className="hover:text-ink">Portfolio ↗</a></li>
              <li><a href="https://www.linkedin.com/in/Sumitr995/" target="_blank" rel="noreferrer" className="hover:text-ink">LinkedIn ↗</a></li>
              <li><a href="https://github.com/Sumitr995/MarkForge" target="_blank" rel="noreferrer" className="hover:text-ink">Project ↗</a></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <img
                src="https://avatars.githubusercontent.com/u/182794567?v=4"
                alt="Sumit Rathod — @Sumitr995"
                className="h-8 w-8 rounded-full border border-hairline object-cover shrink-0"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
              />
              <div className="font-mono text-[12px] font-bold text-ink">MarkForge</div>
            </div>
            <p className="mt-2 text-mute leading-relaxed">
              Solo-built by <a href="https://github.com/Sumitr995" target="_blank" rel="noreferrer" className="text-ink underline underline-offset-4 hover:text-charcoal">Sumit Rathod</a>{" "}
              <span className="text-ash">(@Sumitr995)</span> — Full Stack · Mumbai. No tracking.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <a href="https://sumitr995.me" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-[4px] bg-surface-card border border-hairline px-2 py-1 font-mono text-[11px] text-ink hover:bg-canvas transition-colors">
                <img src="https://avatars.githubusercontent.com/u/182794567?v=4" alt="" className="h-3 w-3 rounded-full object-cover" loading="lazy" /> Portfolio ↗
              </a>
              <a href="https://github.com/Sumitr995/MarkForge" target="_blank" rel="noreferrer" className="inline-flex rounded-[4px] bg-ink px-2 py-1 font-mono text-[11px] text-canvas hover:bg-ink-deep">GitHub ↗</a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-hairline pt-6 font-mono text-[12px] text-mute">
          <span>© 2026 MarkForge — built solo</span>
          <span className="flex items-center gap-2">
            <span>Groq · MarkItDown · PyMuPDF</span>
            <span className="inline-flex h-2 w-2 rounded-full bg-success animate-pulse" />
          </span>
        </div>
      </div>
    </footer>
  );
}
