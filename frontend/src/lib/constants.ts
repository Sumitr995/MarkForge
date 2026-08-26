// API base: VITE_API_URL in production (e.g. https://api.markforge.app)
// In dev, leave empty → Vite proxies /api → :5000. In prod, same-origin if empty.
export const API_BASE = ((import.meta as unknown as { env: Record<string, string | undefined> }).env
  .VITE_API_URL ?? "").replace(/\/$/, "");

export const API_URL = API_BASE ? `${API_BASE}/api/v1` : "/api/v1";

// Public site URL (for OG, curl examples, share links)
export const SITE_URL =
  ((import.meta as unknown as { env: Record<string, string | undefined> }).env
    .VITE_SITE_URL as string | undefined) ?? "https://markforge.app";

export const API_PUBLIC_URL =
  ((import.meta as unknown as { env: Record<string, string | undefined> }).env
    .VITE_API_PUBLIC_URL as string | undefined) ?? "https://api.markforge.app";

export const ROUTES = {
  HOME: "/",
  APP: "/app",
  READER: "/reader",
  DOCS: "/docs",
  PRICING: "/#pricing",
} as const;

export const MAX_FILE_SIZE_MB = 20;
export const ACCEPTED_FILE_TYPES = ["application/pdf"] as const;
export const GUEST_DAILY_LIMIT = 3;

// Product copy — single source for curl / API examples (no localhost in UI)
export const CURL_EXAMPLE = `curl -X POST ${API_PUBLIC_URL}/api/v1/documents/upload -F file=@paper.pdf`;
