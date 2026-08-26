import { useEffect, useRef } from "react";
import gsap from "gsap";

export function useGsapStagger(selector: string, deps: unknown[] = []) {
  const scope = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!scope.current) return;
    const ctx = gsap.context(() => {
      gsap.from(selector, {
        y: 12,
        opacity: 0,
        duration: 0.45,
        stagger: 0.07,
        ease: "power2.out",
      });
    }, scope);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return scope;
}
