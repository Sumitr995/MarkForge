import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "markforge-theme";

interface ThemeCtx {
  theme: Theme;
  resolved: "light" | "dark";
  setTheme: (t: Theme) => void;
  cycle: () => void;
}

const ThemeContext = createContext<ThemeCtx | null>(null);

function getSystem(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getStored(): Theme {
  try {
    const v = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (v === "light" || v === "dark" || v === "system") return v;
  } catch {
    // ignore
  }
  return "system";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => getStored());
  const [resolved, setResolved] = useState<"light" | "dark">(() => (getStored() === "system" ? getSystem() : (getStored() as "light" | "dark")));

  const setTheme = (t: Theme) => {
    setThemeState(t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {
      // ignore
    }
  };

  const cycle = () => {
    // system -> light -> dark -> system
    setTheme(theme === "system" ? "light" : theme === "light" ? "dark" : "system");
  };

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      const r: "light" | "dark" = theme === "system" ? (media.matches ? "dark" : "light") : theme;
      setResolved(r);
      document.documentElement.classList.toggle("dark", r === "dark");
      // keep theme-color in sync
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", r === "dark" ? "#0f0f0f" : "#fdfcfc");
    };
    apply();
    if (theme === "system") {
      media.addEventListener("change", apply);
      return () => media.removeEventListener("change", apply);
    }
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, resolved, setTheme, cycle }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be inside ThemeProvider");
  return ctx;
}
