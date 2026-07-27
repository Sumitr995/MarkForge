# MarkForge

**Status:** Active Development  
**Category:** AI-Powered Document Intelligence Platform  
**Tagline:** Transform PDFs into structured, readable, knowledge-rich documents.

## Legend

| Symbol | Meaning |
|---|---|
| ✅ | Implemented |
| 🚧 | In Progress |
| 📋 | Planned |
| ❌ | Not Started |
| 🗂️ | Stub / Placeholder |

## Vision

MarkForge is an AI-powered platform that transforms PDFs into structured, readable, and knowledge-rich documents. Unlike traditional PDF summarizers or chat-with-PDF tools, MarkForge focuses on **knowledge transformation** — preserving important concepts while reorganizing information into a format that is easier to read, revise, and understand.

The long-term goal: make reading books, research papers, documentation, lecture notes, and technical PDFs feel like reading a beautifully written article on Medium or Notion.

## What MarkForge Is NOT (Non-Goals)

- ChatPDF / AI Chatbot
- PDF Summarizer
- PDF to Markdown Converter — Markdown is an intermediate representation, not the final product
- Permanent document storage platform
- Citation generator
- Academic paper replacement

## Problem Statement

Traditional PDFs suffer from dense paragraphs, academic writing style, poor formatting, difficult navigation, filler content, and hard revision experience.

Existing tools only summarize, provide AI chat, or convert to Markdown. MarkForge restructures knowledge into an organized learning document.

## Target Audience

Students, developers, researchers, software engineers, professionals, competitive exam aspirants.

## Core Workflow

```
PDF → Knowledge Extraction → Markdown Conversion → Document Understanding → AI Knowledge Transformation → Structured Knowledge Document → Beautiful Reading Experience
```

## Current Progress

| Component | Status |
|---|---|
| Backend Foundation (Express, TypeScript, error handling) | ✅ Complete |
| Upload Pipeline (Multer, validation, temp files) | ✅ Complete |
| Node ↔ Python Bridge | ✅ Complete |
| MarkItDown Integration | ✅ Complete |
| AI Integration (Groq) | ✅ Complete |
| Document Classification | ✅ Complete |
| Prompt Routing | ✅ Complete |
| Fixed-size Chunking (8000 chars) | ✅ Complete |
| AI Markdown Preprocessor (cleaner) | ✅ Complete |
| Asset Extraction Foundation (PyMuPDF) | ✅ Complete |
| ExtractionResult Interface | ✅ Complete |
| Semantic Chunking | 📋 Planned |
| Merge Service | 🗂️ Stub |
| Rich Asset Processing (images, diagrams, metadata) | 📋 Planned |
| Frontend Reader | ❌ Not Started |

## Current Limitations

- Large documents may exceed Groq free-tier limits (mitigated by 8000-char chunks)
- Fixed-size chunking can split content mid-sentence or mid-section
- Merge service is a stub — AI chunk outputs concatenated naively with `\n\n`
- Python venv path hardcoded to Windows (`../python/.venv/Scripts/python.exe`)
- No database (Prisma dependency exists without schema)
- No tests configured
- Asset extraction outputs to CWD, not a configured temp directory
- No CI/CD pipeline

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React 19, TypeScript 6, Vite 8, Tailwind CSS (📋 planned), shadcn/ui (📋 planned) |
| Backend | Express 5, TypeScript 6, Multer, Zod |
| AI | Vercel AI SDK, Groq API (`@ai-sdk/groq`), OpenAI SDK (`@ai-sdk/openai`) |
| Python | Microsoft MarkItDown, PyMuPDF |
| Utilities | `child_process`, `fs`, `path` |
