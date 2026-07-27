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

## 📋 Planned — Frontend

Custom document reader with:
- Hero section
- Table of contents
- Callouts
- Definition cards
- Resource cards
- Image viewer
- Mermaid diagram support
- Interactive learning UI

## 📋 Planned — Platform Features

- Authentication
- Guest upload limits
- Export Markdown / PDF
- Flashcards
- Quiz generator
- Study mode
- Multi-document support
- Vector search / RAG
