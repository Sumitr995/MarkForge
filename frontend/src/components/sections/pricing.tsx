import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const TIERS = [
  {
    name: "Free",
    price: "$0",
    note: "during beta",
    features: ["3 distills / day", "20 MB per PDF", "TOC + callouts + tables", "Copy & Markdown export", "File deleted after processing"],
    cta: "Start free",
    href: "/app",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$12",
    note: "/ month",
    badge: "Most popular",
    features: ["100 distills / month", "50 MB per PDF", "Image extraction & figure viewer", "PDF export & share links", "Priority queue", "API key"],
    cta: "Join waitlist",
    href: "/app",
    highlight: true,
  },
  {
    name: "Team",
    price: "$29",
    note: "/ seat / month",
    features: ["Unlimited distills", "Team workspace", "SSO (coming)", "Audit log", "Custom prompts", "SLA"],
    cta: "Contact us",
    href: "/docs",
    highlight: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-[1100px] px-4 sm:px-6 py-12 sm:py-16">
      <SectionLabel kicker="05 — Plans">Simple pricing. No surprises.</SectionLabel>
      <div className="mt-2 font-mono text-[13px] text-body">Start free. Upgrade when you need more. All plans are privacy-first — we never store your PDFs.</div>
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        {TIERS.map((t) => (
          <div key={t.name} className={`rounded-[4px] border p-5 flex flex-col ${t.highlight ? "border-ink bg-ink text-canvas" : "border-hairline bg-canvas text-ink"}`}>
            <div className="flex items-center justify-between">
              <div className="font-mono text-[12px] font-bold tracking-widest uppercase">{t.name}</div>
              {t.badge && <span className="rounded-[4px] bg-canvas px-2 py-0.5 font-mono text-[10px] font-bold text-ink">{t.badge}</span>}
            </div>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="font-mono text-[28px] font-bold leading-none">{t.price}</span>
              <span className={`font-mono text-[11px] ${t.highlight ? "text-white/60" : "text-mute"}`}>{t.note}</span>
            </div>
            <ul className={`mt-4 space-y-1.5 font-mono text-[12.5px] leading-5 ${t.highlight ? "text-white/80" : "text-body"}`}>
              {t.features.map((f) => (
                <li key={f} className="flex gap-2"><span>{t.highlight ? "—" : "[✓]"}</span><span>{f}</span></li>
              ))}
            </ul>
            {t.name === "Pro" || t.name === "Team" ? (
              <button
                onClick={() => toast.info(t.name === "Pro" ? "Pro waitlist — you're in!" : "Team — let's talk", { description: t.name === "Pro" ? "We'll email you when Pro opens. First 100 get 50% off." : "Email hello@markforge.app with team size." })}
                className="mt-6 w-full"
              >
                <Button variant={t.highlight ? "secondary" : "primary"} className={t.highlight ? "w-full bg-canvas text-ink hover:bg-white" : "w-full"}>
                  {t.cta} →
                </Button>
              </button>
            ) : (
              <Link to={t.href} className="mt-6 block">
                <Button variant="primary" className="w-full">
                  {t.cta} →
                </Button>
              </Link>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 text-center font-mono text-[11px] text-mute">Prices in USD. Beta is free — no card required. Pro waitlist → first 100 get 50% off 3 months.</div>
    </section>
  );
}
