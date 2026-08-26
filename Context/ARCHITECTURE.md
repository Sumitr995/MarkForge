# Architecture

## Legend

| Symbol | Meaning |
|---|---|
| ✅ | Implemented |
| 🚧 | In Progress |
| 📋 | Planned |
| ❌ | Not Started |
| 🗂️ | Stub / Placeholder |

## Request Runtime Flow

How a single upload request moves through the system:

```
Client
  │ POST /api/v1/documents/upload (multipart/form-data, field: "file")
  ▼
┌──────────────┐
│  Controller   │  thin — delegates to documentService.processUpload()
│  (document)   │
└──────┬───────┘
       ▼
┌──────────────┐
│  Document     │  orchestrates the full workflow
│  Service      │    ├── MarkdownService.extract()
│               │    ├── AIService.generateNotes()
│               │    └── deleteFile() cleanup
└──────┬───────┘
       ▼
┌──────────────┐
│  Markdown     │  child_process → Python convert.py
│  Service      │  → parses JSON → ExtractionResult
└──────┬───────┘
       ▼
┌──────────────┐
│  AI Service   │  classify → preprocess → chunk → Groq → join
└──────┬───────┘
       ▼
┌──────────────┐
│  Response     │  { success, message, data: { originalName, markdown, assets } }
└──────────────┘
```

## Data Flow

How data transforms through processing:

```
UploadedFile (Express.Multer.File)
  │
  ▼
PDF file on disk (uploads/temp/)
  │
  ▼
Python stdout → JSON.parse → ExtractionResult { markdown: string, assets: Asset[] }
  │
  ▼
Cleaned markdown (whitespace normalized)
  │
  ▼
Fixed-size chunks (8000 chars each)
  │
  ▼
Per-chunk AI response (Groq)
  │
  ▼
Joined enhanced markdown
  │
  ▼
ApiResponse { success, message, data: { originalName, markdown, assets } }
```

## Error Flow

```
Python Error (exit code 1, stderr)
  │
  ▼
MarkdownService → ApiError(500, "Failed to convert PDF into Markdown")
  │
  ▼
Error Middleware
  │
  ▼
JSON Response { success: false, message: "...", errors: [...] }
```

Multer errors (wrong file type, too large) and validation errors follow the same path — thrown as `ApiError`, caught by `errorMiddleware`.

## Service Responsibility Table

| Service | File | Responsibility |
|---|---|---|
| **DocumentService** | `services/document/document.service.ts` | Orchestrates upload workflow: extract → AI enhance → cleanup |
| **MarkdownService** | `services/markdown/markdown.service.ts` | Python bridge: spawns convert.py (cross-platform), parses JSON |
| **AIService** | `services/ai/ai.service.ts` | AI orchestration: classify → analyze → clean → chunk → Groq → merge |
| **DocumentClassifier** | `services/ai/classifier/` | Detects document type via Groq (research_paper, book, etc.) |
| **DocumentAnalyzer** | `services/ai/analyzer/` | Title, headings, tables, image count, token estimate |
| **SectionParser** | `services/ai/parser/` | Splits markdown into sections by heading |
| **MarkdownPreprocessor** | `services/ai/preprocess/` | Normalizes whitespace before chunking |
| **ChunkService** | `services/ai/chunk/` | Fixed-size 8000-char splitting |
| **MergeService** | `services/ai/merge/` | 🗂️ Stub — neat `\n\n` join (heading-aware next) |
| **PromptRouter** | `services/ai/prompt-router.ts` | Routes document type to specialized prompt template |
| **UploadMiddleware** | `middleware/upload.middleware.ts` | Multer config: PDF-only filter, 20 MB limit, disk storage |
| **ErrorMiddleware** | `middleware/error.middleware.ts` | Centralized error handler → JSON response |
| **Validate** | `validators/validate.ts` | Generic Zod validation for body/params/query |
| **AsyncHandler** | `common/handlers/` | Wraps async controllers to forward errors via `next()` |

## Dependency Graph

```
DocumentService
├── MarkdownService ──── Python (child_process.execFile)
│                            ├── services/markdown.py (MarkItDown)
│                            └── services/assets.py (PyMuPDF, configurable dir)
└── AIService
    ├── DocumentClassifier ──── Groq
    ├── DocumentAnalyzer
    ├── SectionParser
    ├── MarkdownPreprocessor
    ├── ChunkService
    ├── PromptRouter ──── 6 prompt templates
    └── MergeService 🗂️
```

## Current AI Pipeline (Enhanced)

```
Markdown (from ExtractionResult)
  │
  ▼
DocumentClassifier → document type (research_paper, book, ...)
  │
  ▼
DocumentAnalyzer → title, headings, tables, images, tokens
  │
  ▼
MarkdownPreprocessor → normalize whitespace, trim
  │
  ▼
SectionParser → sections by heading
  │
  ▼
ChunkService → fixed 8000-char splits (can split mid-sentence)
  │
  ▼
For each chunk:
  ├── PromptRouter → select type-specific prompt template
  ├── Groq (llama-3.3-70b via Vercel AI SDK) → AI response
  └── Collect result
  │
  ▼
MergeService → neat \n\n join (heading-aware next)
  │
  ▼
Enhanced markdown
```

## Future Document Processing Pipeline (📋 Planned)

```
Markdown
  │
  ▼
Cleaner → normalize line endings, remove blanks, trailing spaces
  │
  ▼
Analyzer → detect title, count headings/tables/images, estimate tokens
  │
  ▼
Section Parser → convert markdown into semantic sections by heading
  │
  ▼
Semantic Chunk Builder → chunks aligned to document structure
  │
  ▼
Merge → stitch AI outputs into coherent document
  │
  ▼
AI (existing)
```

## Architecture Evolution

```
v0 (initial)      v1              v2 (current)         Future
                                   
PDF               PDF              PDF                  PDF
  │                 │                │                    │
  ▼                 ▼                ▼                    ▼
Markdown          Markdown         ExtractionResult      Extraction
  │                 │                │                    │
                    ▼                ▼                    ▼
                   AI               AI                  Document
                                      │                Processing
                                      │                    │
                                                           ▼
                                                          AI
                                                           │
                                                           ▼
                                                        Renderer
```

- **v0**: Raw PDF → Markdown (MarkItDown only)
- **v1**: Added AI transformation on top of Markdown
- **v2 (current)**: Structured `ExtractionResult` with assets, AI pipeline with classification/preprocessing/chunking
- **Future**: Dedicated document processing layer between extraction and AI, semantic understanding, rich frontend

## Backend Folder Structure

```
src/
├── server.ts                         Entry point
├── app.ts                            Express app setup (helmet, cors, morgan, routes, error middleware)
├── config/
│   └── env.ts                        dotenv → PORT, NODE_ENV, DATABASE_URL, GROQ_API_KEY, OPENAI_API_KEY, PYTHON_PATH, ASSETS_DIR
├── routes/
│   ├── index.ts                      Mounts /health, /documents under /api/v1
│   ├── health.routes.ts              GET /api/v1/health (with Zod body validation)
│   └── document.routes.ts            POST /api/v1/documents/upload
├── controllers/
│   ├── health.controller.ts          Returns { success, status, service, version, timestamp }
│   └── document.controller.ts        Calls documentService.processUpload(req.file)
├── middleware/
│   ├── upload.middleware.ts          Multer config: disk storage → uploads/temp/, PDF filter, 20 MB limit
│   └── error.middleware.ts           Catches ApiError + generic errors → JSON response
├── services/
│   ├── document/
│   │   └── document.service.ts       Orchestrates: extract → AI enhance → cleanup temp file
│   ├── markdown/
│   │   └── markdown.service.ts       Python bridge (cross-platform) → parse JSON → ExtractionResult
│   └── ai/
│       ├── ai.service.ts             AI orchestration: classify → analyze → clean → chunk → Groq → merge
│       ├── prompt-router.ts          Routes document type to specialized prompt
│       ├── classifier/
│       │   └── document-classifier.service.ts  Groq-based: research_paper, book, study_notes, etc.
│       ├── analyzer/
│       │   └── document-analyzer.service.ts    Title, headings, tables, tokens
│       ├── parser/
│       │   └── section-parser.service.ts       Sections by heading
│       ├── preprocess/
│       │   └── markdown-cleaner.service.ts     Normalizes whitespace
│       ├── chunk/
│       │   └── chunk.service.ts      Fixed 8000-char splits (semantic next)
│       ├── merge/
│       │   └── merge.service.ts      🗂️ Stub — neat \n\n join
│       └── prompts/
│           ├── base.prompt.ts
│           ├── book.prompt.ts
│           ├── document.prompt.ts
│           ├── knowledge.prompt.ts
│           ├── notes.prompt.ts
│           └── research.prompt.ts
├── validators/
│   ├── validate.ts                   Generic Zod validation middleware for body/params/query
│   ├── document.validator.ts         healthSchema (name: string, optional)
│   └── format-zod-error.ts           Maps Zod issues → { field, message }[]
├── common/
│   ├── errors/
│   │   └── api-error.ts              Custom error class with statusCode
│   ├── handlers/
│   │   └── async-handler.ts          Wraps async controllers to forward errors to next()
│   ├── types/
│   │   └── file.types.ts             UploadedFile alias, ExtractionResult interface
│   └── utils/
│       ├── api-response.ts           Standardized { success, message, data } wrapper
│       └── file.ts                   deleteFile() helper with error swallowing
├── repositories/                     Empty — Prisma not yet initialized
└── lib/                              Empty
```

## Python Folder Structure

```
python/
├── scripts/
│   └── convert.py                    Entry point: parses args (pdf_path, assets_dir), calls services, prints JSON
├── services/
│   ├── markdown.py                   extract_markdown(file_path) → MarkItDown → text_content
│   └── assets.py                     extract_assets(file_path, assets_dir) → PyMuPDF → Asset[]
├── assets/                           Configurable via env ASSETS_DIR (default uploads/assets)
├── .venv/                            Python virtual environment
└── requirements.txt                  markitdown 0.1.6, PyMuPDF 1.28, + deps
```

## Frontend Folder Structure (Vite + React + bun)

```
frontend/
├── index.html                        SEO, OG, noscript, theme flash script
├── vite.config.ts                    @ alias, /api proxy, manualChunks vendor/motion/markdown
├── vercel.json / Dockerfile / nginx.conf  Deploy artifacts
├── src/
│   ├── main.tsx                      ThemeProvider + App
│   ├── App.tsx                       Router /, /app, /reader, /docs + ErrorBoundary
│   ├── styles/index.css              @theme tokens (DESIGN.md) + html.dark overrides
│   ├── lib/
│   │   ├── constants.ts              API_BASE (env-driven), CURL_EXAMPLE, GUEST_LIMIT
│   │   ├── api.ts                    uploadPdf (120s + abort, 413/429), checkHealth
│   │   ├── theme.tsx                 system/light/dark provider
│   │   └── utils.ts                  cn()
│   ├── hooks/                        use-mobile, use-gsap
│   ├── stores/document-store.ts      Zustand { doc, setDoc }
│   ├── components/
│   │   ├── ui/                       button/badge/card/input/separator/theme-toggle/error-boundary
│   │   ├── layout/                   navbar (MF logo + health dot + theme), footer (solo Sumitr995 + avatar), layout
│   │   ├── sections/                 hero, features, why-markitdown, pipeline, showcase, trust, faq, cta (+ pricing/testimonials hidden)
│   │   └── reader/                   dropzone, markdown-view (slug ids + highlight), toc
│   └── pages/                        home, app, reader, docs
└── DESIGN.md                         Mono design system (Berkeley Mono → JetBrains, cream #fdfcfc, 4px)
```

## Design Principles

- **Thin controllers** — controllers contain no business logic, only delegation
- **Single responsibility** — every service has exactly one job
- **Python independence** — Python extraction layer is decoupled from Express; communicates via JSON over stdout
- **AI independence** — AI services know nothing about HTTP; they receive markdown, return markdown
- **Future-proof interfaces** — `ExtractionResult` with `assets[]` enables rich extraction without API changes
- **Automatic cleanup** — uploaded PDFs deleted in `finally` block; never persisted beyond request lifecycle
- **Cross-language bridge** — Node.js spawns Python via `child_process.execFile`, communicates via JSON
- **Prefer readable evolution** — architecture evolved from simple to layered as needs grew (see Architecture Evolution)
