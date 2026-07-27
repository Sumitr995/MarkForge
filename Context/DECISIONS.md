# Architectural Decisions

## Why Python for PDF extraction instead of a Node.js library?

`markitdown` (Microsoft) and `PyMuPDF` offer the best PDF-to-Markdown conversion quality. The Python ecosystem is more mature for document processing. Communication happens via `child_process.execFile` with JSON over stdout.

## Why Groq instead of OpenAI as the primary AI provider?

Groq's `llama-3.3-70b-versatile` offers fast inference on the free tier, suitable for development. `@ai-sdk/openai` is also installed as a fallback. The Vercel AI SDK abstracts the provider, making switching trivial.

## Why fixed-size chunking instead of semantic chunking?

Semantic chunking based on document headings is planned but not yet implemented. The current 8000-char fixed split is a temporary measure to stay within Groq free-tier token limits. It works but can split mid-sentence or mid-section.

## Why `child_process.execFile` instead of `spawn`?

`execFile` buffers stdout, which is simpler for the small JSON payloads currently returned by the Python script. If extraction results grow large (e.g., embedded images), this should switch to streaming via `spawn`.

## Why is temp file cleanup in a `finally` block?

Guarantees the uploaded PDF is deleted even if AI processing throws an error. Privacy-conscious: uploaded documents are never persisted beyond the request lifecycle.

## Why an `ExtractionResult` interface with an `assets` placeholder?

Forward-compatibility. Adding images, diagrams, tables, or metadata later won't require API or service signature changes — only the extraction logic and response shape.

## Why is the health endpoint a GET with a body validator?

This appears to be a bug: `healthSchema` validates `req.body` on a GET route. The schema field is now optional, so the endpoint works without a body, but the validator middleware still runs unnecessarily.

## Why is the merge service a stub?

Merge is needed for assembling AI outputs from multiple chunks into a coherent document. The chunking service exists and is used, but merging is not yet implemented — the AI service currently just joins chunks with `\n\n`.

## Why Prisma as a dependency with no schema?

Prisma was included early for future database integration. The `DATABASE_URL` environment variable is defined in `env.ts`. Schema design is deferred until a data model is needed (e.g., user accounts, document history).
