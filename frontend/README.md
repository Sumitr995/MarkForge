# MarkForge Frontend — MVP

Product-ready React 19 + Vite 6 + Tailwind 4 + shadcn/ui + bun. No `localhost` in production.

> Design: `DESIGN.md` (Berkeley Mono → JetBrains Mono substitute, cream #fdfcfc, ink #201d1d, 4px radius on interactives, ASCII `[+]`). Product docs: `Context/FRONTEND.md`.

## Run

```powershell
cd frontend
bun install
bun run dev          # http://localhost:3000  (/api → VITE_API_URL or :5000)
bun run build        # → dist/
bun run preview
```

## Env

Copy `.env.example` → `.env.local`:

```
VITE_API_URL=                  # empty = same-origin /api (prod) ; http://localhost:5000 in dev
VITE_API_PUBLIC_URL=https://api.markforge.app   # shown in docs/curl
VITE_SITE_URL=https://markforge.app             # OG/canonical
```

## Deploy

- **Vercel**: `vercel --prod` (uses `vercel.json` — SPA rewrite + immutable assets)
- **Docker**: `docker build --build-arg VITE_API_URL=https://api.markforge.app -t mf . && docker run -p 80:80 mf` (nginx + gzip, see `nginx.conf`)

## Routes

`/` marketing (hero, pricing, trust) · `/app` distill (dropzone + guest 3/day) · `/reader` markdown + TOC + export · `/docs` API

## Product notes

- File deleted after processing (privacy-first), 120s timeout, 413/429 handling.
- No localhost leaked in UI — curl/docs use `VITE_API_PUBLIC_URL`.
- Navbar live dot polls `GET /api/v1/health` every 30s.
