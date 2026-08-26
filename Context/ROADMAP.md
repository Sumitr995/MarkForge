# Roadmap

## Legend

| Symbol | Meaning |
|---|---|
| ✅ | Complete |
| 🚧 | In Progress |
| 📋 | Planned |
| ❌ | Not Started |
| 🗂️ | Stub / Placeholder |

## ✅ Phase 1 — Backend Foundation (Complete)

- Express 5 + TypeScript 6 setup
- AsyncHandler, ApiResponse, ApiError
- Centralized error middleware
- Zod validation middleware
- Clean folder structure

## ✅ Phase 2 — Upload Pipeline (Complete)

- Multer disk storage → `uploads/temp/`
- PDF MIME type validation
- 20 MB file size limit
- Temporary file cleanup in `finally` block

## ✅ Phase 3 — Extraction Engine (Complete)

- Microsoft MarkItDown integration via Python subprocess
- UTF-8 encoding fixes between Node.js and Python
- Child process bridge with JSON stdout protocol
- Python refactored: `convert.py` (orchestrator) → `services/markdown.py` + `services/assets.py`

## ✅ Phase 4 — AI Engine (Complete)

- Groq API integration via `@ai-sdk/groq`
- Vercel AI SDK (`ai` package)
- Document classification (research_paper, book, study_notes, documentation, resume, general)
- Prompt routing — type-specific prompts
- 6 prompt templates: base, book, document, knowledge, notes, research
- AI Markdown Preprocessor (whitespace normalization)
- Fixed-size chunking (8000 chars)

## ✅ Phase 5 — Rich Extraction Foundation (Complete)

- `ExtractionResult` interface with `{ markdown, assets }`
- Asset extraction via PyMuPDF (images) — foundation level
- Python services refactored into modules

## Current AI Pipeline (Implemented)

| Component | Status |
|---|---|
| Document Classifier | ✅ Complete |
| AI Markdown Preprocessor | ✅ Complete |
| Fixed-size Chunking (8000 chars) | ✅ Complete |
| Prompt Router (6 templates) | ✅ Complete |
| Merge (chunk join with `\n\n`) | 🗂️ Stub — no deduplication or coherence stitching |

## Future Document Processing Pipeline (📋 Planned)

| Component | Status |
|---|---|
| Markdown Cleaner | 📋 Planned |
| Document Analyzer (title, headings, tables, tokens) | 📋 Planned |
| Semantic Section Parser | 📋 Planned |
| Semantic Chunk Builder | 📋 Planned |
| Merge Service | 📋 Planned |

## 📋 Planned — Extraction

- Rich asset processing (refined images, diagrams, figures, metadata)
- Asset metadata extraction (page numbers, captions, dimensions)

## ✅ Phase 6 — Frontend MVP (Complete)

- Vite 6 + React 19 + Tailwind 4 + shadcn/ui + bun
- Mono design from `DESIGN.md` — cream `#fdfcfc`, ink `#201d1d`, hairline, 4px on interactives
- Theme: system / light / dark (no flash, `html.dark` + localStorage)
- Layout: clean `MF` logo, sticky navbar with health dot, hash nav, solo footer (`Sumitr995`)
- Landing: hero + features + Why MarkItDown (token math) + pipeline (6 steps) + showcase (reader preview with unsplash) + FAQ + trust + CTA
- App: dropzone (`PDF 20MB`, 120s timeout + abort, guest `3/day`) → Zustand → reader
- Reader: slug `id` headings + TOC highlight + `remark-gfm`/`rehype-highlight` + copy/export
- Polish: `Pricing` + `Testimonials` hidden for solo MVP — add later
- Deploy: `Dockerfile` + `nginx.conf` + `vercel.json` + `.env.example`

## Current AI Pipeline (Enhanced)

| Component | Status |
|---|---|
| Document Classifier | ✅ Complete |
| Analyzer (title, headings, tables, tokens) | ✅ Complete |
| Markdown Cleaner + Preprocessor | ✅ Complete |
| Chunk (8000 chars) + Section Parser | ✅ Complete |
| Prompt Router (6 templates) | ✅ Complete |
| Merge (neat `\n\n`) | 🗂️ Stub — heading-aware next |

## 📋 Next — Extraction

- Rich asset viewer (images with page metadata, currently `/uploads` URLs)
- Mermaid diagram support in MarkdownView
- Figure captions & dimensions

## 📋 Next — Platform

- Auth + guest limits (beyond 3/day UI hint)
- Export PDF, flashcards, quiz
- Study mode, multi-doc, vector search / RAG
- `Early readers + Pricing` — hidden, solo will add with real data
