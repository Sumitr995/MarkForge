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
| Node ↔ Python Bridge (cross-platform) | ✅ Complete |
| MarkItDown Integration | ✅ Complete |
| AI Integration (Groq llama-3.3-70b) | ✅ Complete |
| Document Classification (6 types) | ✅ Complete |
| Prompt Routing (6 templates) | ✅ Complete |
| Fixed-size Chunking (8000 chars) | ✅ Complete |
| AI Markdown Preprocessor + Analyzer | ✅ Complete |
| Asset Extraction (PyMuPDF, configurable dir) | ✅ Complete |
| ExtractionResult Interface | ✅ Complete |
| Frontend MVP — Vite + React + Tailwind + shadcn | ✅ Complete |
| Theme (system/light/dark) + Solo Maker UX | ✅ Complete |
| Reader (TOC, markdown, copy/export, health dot) | ✅ Complete |
| Deploy Artifacts (Docker, nginx, Vercel) | ✅ Complete |
| Semantic Chunking | 🚧 Next |
| Merge Service (heading-aware stitching) | 🗂️ Stub (neat \n\n now) |
| Rich Asset Viewer (images, Mermaid) | 📋 Planned |

## Current Limitations

- Fixed-size chunking can split mid-sentence — semantic chunking next
- Merge is neat `\n\n` join — coherent heading-aware merge planned
- Large docs still hit Groq free-tier if many chunks in parallel
- Prisma dependency exists without schema — `npx prisma init` before DB use
- No tests, no CI/CD yet
- `Early readers` + `Pricing` hidden — solo MVP, coming soon

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React 19, TypeScript 6, Vite 6, Tailwind 4, shadcn/ui, Framer Motion, GSAP, Zustand, bun |
| Backend | Express 5, TypeScript 6, Multer, Zod, helmet/cors/morgan |
| AI | Vercel AI SDK, Groq API (`@ai-sdk/groq`), OpenAI SDK (`@ai-sdk/openai`) |
| Python | Microsoft MarkItDown 0.1.6, PyMuPDF 1.28 |
| Infra | Docker + nginx, Vercel (frontend), `child_process.execFile` bridge |
