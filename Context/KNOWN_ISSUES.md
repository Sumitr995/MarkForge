# Known Issues

## 1. Large documents exceed Groq free-tier token limits

Research papers or books with long sections produce chunks that exceed Groq's free-tier context window. This causes truncated or failed AI processing.

**Status:** Mitigated by 8000-char chunking, but semantic chunking (by heading boundaries) is the proper fix.

## 2. Fixed-size chunking can split content mid-sentence

The current `ChunkService` splits at exactly 8000 characters regardless of content boundaries. This can cut through paragraphs, sentences, or code blocks, degrading AI output quality.

**Status:** Semantic section parsing is planned.

## 3. Merge service is a stub

The `merge/merge.service.ts` file exists but is empty. After AI processes multiple chunks, results are concatenated with `\n\n` — no deduplication, coherence stitching, or structure recovery.

**Status:** Needs implementation.

## 4. GET /api/v1/health has a body Zod validator

The health check route applies `validate({ body: healthSchema })` despite being a GET endpoint. This is logically wrong — GET requests shouldn't validate a body. The field is optional and the route works, but the middleware is unnecessary overhead.

**Status:** Minor — should be removed or changed to query validation.

## 5. Python venv path is hardcoded (Windows) — FIXED

`markdown.service.ts:21` now detects `win32` vs `bin/python` and respects `PYTHON_PATH` env. `convert.py` accepts `assets_dir` arg.

**Status:** ✅ Resolved — cross-platform + configurable.

## 6. Prisma is a dependency but not set up

`@prisma/client` and `prisma` are in `package.json` but no schema, migrations, or client exist. Any code importing Prisma will fail at runtime.

**Status:** `npx prisma init` before DB use — still stub, not blocking MVP (no DB yet).

## 7. No tests anywhere

There are no unit, integration, or E2E tests configured. Manual dev-server testing only.

**Status:** Still open — define strategy post-MVP.

## 8. Frontend is a default Vite starter template — FIXED

Now Vite 6 + React 19 + Tailwind 4 + shadcn, mono DESIGN.md, theme toggler, landing + reader shipped.

**Status:** ✅ Done — see `Context/FRONTEND.md`.

## 9. Asset extraction outputs to CWD — FIXED

`markdown.service.ts:17` `ASSETS_DIR = env.ASSETS_DIR || uploads/assets`, `document.service.ts:10` uses `uploads/temp/assets`, `convert.py` takes `assets_dir`. No CWD scatter.

**Status:** ✅ Resolved — configurable.

## 10. No CI/CD pipeline

No GitHub Actions yet.

**Status:** Still open — add after tests.
