# Frontend — MarkForge (MVP Product)

> Not a local demo. Shippable MVP: env-driven API, product copy, guest limits, SEO, deploy configs, error/empty states.

Stack: React 19 + TypeScript 6 + Vite 6 + Tailwind CSS 4 + shadcn/ui + bun + Framer Motion + GSAP + Zustand + React Router 7 + Sonner

## What changed for MVP

| Before (local project) | After (MVP product) |
|---|---|
| `API_BASE = http://localhost:5000` hardcoded | `API_BASE = VITE_API_URL ?? ""` → `API_URL = API_BASE ? ${API_BASE}/api/v1 : /api/v1` (relative = same-origin or Vite proxy) |
| `curl http://localhost:5000/...` in UI | `CURL_EXAMPLE` from `VITE_API_PUBLIC_URL` (default `https://api.markforge.app`) — zero localhost in prod UI |
| `vite.config.ts` proxy target `localhost:5000` literal | `process.env.VITE_API_URL ?? http://localhost:5000` (dev only) |
| Dev internals exposed on `/app` (Python path, stub join) | Product voice: privacy, limits, no storage. Internals moved to `/docs` only |
| No SEO, no OG, no theme-color | Full `index.html` SEO: description, canonical, OG/Twitter, theme-color #fdfcfc, noscript |
| No deploy story | `vercel.json` (SPA rewrite + asset cache), `Dockerfile` + `nginx.conf` (SPA fallback + gzip), `.env.example` with 3 vars |
| No guest limits, no error handling | Dropzone: progress bar, abort + cancel, timeout 120s, 413/429/502 handling, `GUEST_DAILY_LIMIT=3` UI, pricing |
| No ErrorBoundary, no 404 product page | `components/ui/error-boundary.tsx` + `App.tsx` `NotFound` + reader demo fallback |
| Static liveness text | Navbar polls `checkHealth()` every 30s, live/offline dot |

## Env

```
# .env.example
VITE_API_URL=               # empty → same-origin /api (prod) or Vite proxy (dev)
VITE_API_PUBLIC_URL=https://api.markforge.app
VITE_SITE_URL=https://markforge.app
```

- Dev: `VITE_API_URL=http://localhost:5000` → fetch `${API_URL}/documents/upload` → proxied.
- Prod (Vercel same-origin): leave `VITE_API_URL` empty and deploy API on same domain `/api/*`.
- Prod (split): set `VITE_API_URL=https://api.markforge.app` → absolute fetch.

## Folder (same scalable structure, now deploy-ready)

```
frontend/
├── index.html              # SEO + OG + twitter + canonical + noscript
├── vercel.json             # SPA rewrite, asset immutable cache
├── Dockerfile              # bun build → nginx alpine, ARG VITE_* → build-time env
├── nginx.conf              # SPA try_files, gzip, optional /api proxy commented
├── vite.config.ts          # @ alias, dev proxy env-driven, manualChunks vendor/motion/markdown
├── src/
│   ├── App.tsx             # BrowserRouter + ErrorBoundary + Routes (+ NotFound)
│   ├── main.tsx
│   ├── styles/index.css    # @theme tokens from DESIGN.md
│   ├── lib/constants.ts    # API_BASE/API_URL/SITE_URL/API_PUBLIC_URL/CURL_EXAMPLE/GUEST_DAILY_LIMIT
│   ├── lib/api.ts          # uploadPdf with timeout 120s, abort, safeJson, ApiError mapping 413/429/502
│   ├── hooks/use-gsap.ts   # GSAP stagger helper
│   ├── stores/document-store.ts
│   ├── components/
│   │   ├── ui/{button,badge,card,input,separator,error-boundary}
│   │   ├── layout/{navbar,footer,layout}  # navbar polls health, footer product links
│   │   ├── sections/{hero,features,pipeline,showcase,testimonials,faq,pricing,trust,cta}
│   │   └── reader/{dropzone,markdown-view,toc}
│   └── pages/{home,app,reader,docs}
```

## Pages & product flow

- `/` marketing: hero (beta badge + live dot), features, pipeline (user-facing, not internals), showcase, testimonials, FAQ, **pricing** (Free $0 / Pro $12 / Team $29), trust (never stored), CTA.
- `/app` dropzone → `uploadPdf` → Zustand → `/reader`. Shows progress, cancel, 429 limit message, privacy note, API snippet with `API_PUBLIC_URL`.
- `/reader` TOC + MarkdownView + copy/export/share. Demo fallback (`SAMPLE_MARKDOWN`) when no upload yet. Assets list if present.
- `/docs` product-grade API reference:curl with `API_PUBLIC_URL`, health, guarantees (no storage, no training), env note.

## API (same backend, product surface)

- `POST /api/v1/documents/upload` — multipart `file` PDF 20 MB, 120s timeout, returns `{ originalName, markdown, assets }`. Maps 413/429/502 to product messages.
- `GET /api/v1/health` — polled for navbar dot.

## Design — unchanged (DESIGN.md)

Mono everywhere, cream #fdfcfc, ink #201d1d, hairline 1px, 4px on interactives, ASCII markers, one dark hero. Pricing adds highlighted ink card for Pro. All tokens via `@theme`.

## Deploy

```powershell
# Vercel
vercel --prod  # reads vercel.json, bun run build

# Docker
docker build --build-arg VITE_API_URL=https://api.markforge.app -t markforge-frontend .
docker run -p 80:80 markforge-frontend
# or same-origin: omit build-arg → API_BASE="" → /api proxied by nginx (uncomment location /api/)
```

## Roadmap → next MVP slices

- Persist Zustand to sessionStorage
- Auth (guest 3/day → signed-in 20/day)
- Image/figure viewer + Mermaid
- PDF export, share links, history
- Vector search / RAG
