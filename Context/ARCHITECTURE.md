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
| **MarkdownService** | `services/markdown/markdown.service.ts` | Python bridge: spawns convert.py, parses JSON result |
| **AIService** | `services/ai/ai.service.ts` | AI orchestration: classify → preprocess → chunk → Groq → join |
| **DocumentClassifier** | `services/ai/classifier/` | Detects document type via Groq (research_paper, book, etc.) |
| **MarkdownPreprocessor** | `services/ai/preprocess/` | Normalizes whitespace before chunking |
| **ChunkService** | `services/ai/chunk/` | Fixed-size 8000-char splitting |
| **MergeService** | `services/ai/merge/` | 🗂️ Stub — planned for chunk reassembly |
| **PromptRouter** | `services/ai/prompt-router.ts` | Routes document type to specialized prompt template |
| **UploadMiddleware** | `middleware/upload.middleware.ts` | Multer config: PDF-only filter, 20 MB limit, disk storage |
| **ErrorMiddleware** | `middleware/error.middleware.ts` | Centralized error handler → JSON response |
| **Validate** | `validators/validate.ts` | Generic Zod validation for body/params/query |
| **AsyncHandler** | `common/handlers/` | Wraps async controllers to forward errors via `next()` |

## Dependency Graph

```
DocumentService
├── MarkdownService ──── Python (child_process)
│                            ├── services/markdown.py (MarkItDown)
│                            └── services/assets.py (PyMuPDF)
└── AIService
    ├── DocumentClassifier ──── Groq
    ├── MarkdownPreprocessor
    ├── ChunkService
    ├── PromptRouter ──── 6 prompt templates
    └── MergeService 🗂️
```

## Current AI Pipeline

```
Markdown (from ExtractionResult)
  │
  ▼
DocumentClassifier → document type (research_paper, book, ...)
  │
  ▼
MarkdownPreprocessor → normalize whitespace, trim
  │
  ▼
ChunkService → fixed 8000-char splits (can split mid-sentence)
  │
  ▼
For each chunk:
  ├── PromptRouter → select type-specific prompt template
  ├── Groq (llama-3.3-70b-versatile) → AI response
  └── Collect result
  │
  ▼
Join responses with \n\n
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
│   └── env.ts                        dotenv → PORT, NODE_ENV, DATABASE_URL, GROQ_API_KEY, OPENAI_API_KEY
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
│   │   └── markdown.service.ts       Python bridge → parse JSON → ExtractionResult
│   └── ai/
│       ├── ai.service.ts             AI orchestration: classify → preprocess → chunk → Groq → join
│       ├── prompt-router.ts          Routes document type to specialized prompt
│       ├── classifier/
│       │   └── document-classifier.service.ts  Groq-based: research_paper, book, study_notes, etc.
│       ├── preprocess/
│       │   └── markdown-cleaner.service.ts     AI Markdown Preprocessor — normalizes whitespace
│       ├── chunk/
│       │   └── chunk.service.ts      Fixed 8000-char splits (📋 semantic chunking planned)
│       ├── merge/
│       │   └── merge.service.ts      🗂️ Stub — reassembles AI chunk outputs
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
│   └── convert.py                    Entry point: parses args, calls services, prints JSON to stdout
├── services/
│   ├── markdown.py                   extract_markdown(file_path) → MarkItDown → text_content
│   └── assets.py                     extract_assets(file_path) → PyMuPDF → image extraction → Asset[]
├── assets/                           Extracted images land here (relative to CWD, 📋 should be configurable)
├── .venv/                            Python virtual environment
└── requirements.txt                  markitdown, PyMuPDF
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
