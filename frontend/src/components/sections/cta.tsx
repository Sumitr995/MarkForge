import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="mx-auto max-w-[1100px] px-4 sm:px-6 pb-16">
      <div className="rounded-[4px] border border-ink bg-surface-dark text-on-dark p-6 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <div className="font-mono text-[11px] tracking-widest uppercase text-on-dark-mute">Start in 10 seconds</div>
          <h3 className="mt-2 font-mono text-[18px] sm:text-[20px] font-bold leading-tight">Drop a PDF. Get a document you want to read.</h3>
          <p className="mt-2 font-mono text-[12.5px] leading-5 text-on-dark-mute max-w-xl">
            No sign-up to try. 3 free / day · 20 MB max · deleted after processing · Pro waitlist open.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Link to="/app">
            <Button className="bg-canvas text-ink hover:bg-white min-w-[160px]">Open app →</Button>
          </Link>
          <Link to="/docs">
            <Button variant="secondary" className="bg-transparent border-white/20 text-on-dark hover:bg-white/10">Read API docs</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
