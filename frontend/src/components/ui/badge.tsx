import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[4px] bg-surface-dark text-on-dark px-2 py-0.5 font-mono text-[11px] font-medium tracking-widest uppercase",
        className
      )}
      {...props}
    />
  );
}

export function SectionLabel({ children, kicker, className }: { children: React.ReactNode; kicker?: string; className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 border-b border-hairline pb-3 mb-6", className)}>
      {kicker && <span className="font-mono text-[11px] tracking-widest uppercase text-mute">{kicker}</span>}
      <h2 className="font-mono text-[13px] font-bold tracking-wide uppercase text-ink">{children}</h2>
    </div>
  );
}
