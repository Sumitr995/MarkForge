# MarkForge — AI Markdown Distiller

## Project structure

```
MarkForge/
├── backend/          Express 5 + TypeScript API
├── frontend/         React 19 + Vite 8 + TypeScript UI (Vite starter, not yet customized)
└── python/           Python virtual env + MarkItDown PDF-to-Markdown script
```

## Useful commands

### Backend (`backend/`)
| Command | What it does |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload (`tsx watch src/server.ts`) |
| `npm run build` | Compile TypeScript to `dist/` via `tsc` |
| `npm start` | Run compiled `dist/server.js` |

### Frontend (`frontend/`)
| Command | What it does |
|---------|-------------|
| `npm run dev` | Vite dev server |
| `npm run build` | `tsc -b && vite build` |
| `npm run lint` | ESLint check |
| `npm run preview` | Preview production build |

### Python (`python/`)
```powershell
.venv\Scripts\activate   # activate venv
pip install -r requirements.txt   # deps: markitdown
```

## Architecture quirks

- **PDF→Markdown** is handled by spawning a subprocess to `python/.venv/Scripts/python.exe` with `python/scripts/convert.py`. The Python venv path is hardcoded (Windows).
- **Prisma** (`@prisma/client`, `prisma`) is a dependency but has **no schema, no migrations, no client** yet — `repositories/` is empty. Run `npx prisma init` before first use.
- **Health route** (`GET /api/v1/health`) has a Zod `body` validation requiring `{ name: string }` — this looks like a bug; the route doesn't actually use the body.
- **Upload**: POST `/api/v1/documents/upload` accepts a single file field named `"file"`, PDF only, max 20 MB. Files land in `backend/uploads/temp/`.
- **No tests** configured anywhere.
- **No CI/CD** workflows.
- `common/logger/` and `common/constants/` directories exist but are empty.

## API

All routes mounted under `/api/v1`:
- `GET /health` — health check (Zod body validation applied despite being GET)
- `POST /documents/upload` — upload PDF, returns `{ originalName, markdown }`

## Python setup

Before running the backend, ensure the Python venv exists and dependencies are installed:
```powershell
cd python
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```
