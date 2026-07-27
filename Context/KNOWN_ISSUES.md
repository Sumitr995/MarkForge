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

## 5. Python venv path is hardcoded (Windows)

`markdown.service.ts` hardcodes `../python/.venv/Scripts/python.exe`. This will fail on non-Windows systems and breaks if the venv is relocated.

**Status:** Needs cross-platform support (e.g., detect OS or use a config/env variable).

## 6. Prisma is a dependency but not set up

`@prisma/client` and `prisma` are in `package.json` but no schema, migrations, or client exist. Any code importing Prisma will fail at runtime.

**Status:** Need `npx prisma init` and schema design before use.

## 7. No tests anywhere

There are no unit, integration, or E2E tests configured. The current testing approach is manual (running the dev server and hitting endpoints).

**Status:** Testing strategy needs to be defined.

## 8. Frontend is a default Vite starter template

The frontend directory contains the out-of-the-box Vite React template — no custom MarkForge UI has been built yet. Dependencies like `react-markdown`, `react-router-dom`, and `lucide-react` are installed but not used.

**Status:** Frontend development hasn't started.

## 9. Asset extraction outputs to CWD

`assets.py` writes extracted images to an `assets/` directory relative to the Python script's current working directory, not a configured output path. This can scatter files depending on where the backend spawns the process.

**Status:** Should use a configurable temp directory.

## 10. No CI/CD pipeline

No GitHub Actions workflows or CI configuration exists. There's no automated linting, type-checking, or testing on push/PR.

**Status:** Needed once testing is in place.
