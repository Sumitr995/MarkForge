# API Reference

Base URL: `/api/v1`

## Health Check

```
GET /api/v1/health
```

Validates a `name` field in the request body via Zod (applied despite being a GET — likely a bug).

**Response** `200 OK`:
```json
{
  "success": true,
  "status": "OK",
  "service": "AI Markdown Distiller",
  "version": "v1",
  "timestamp": "2026-07-27T..."
}
```

## Upload Document

```
POST /api/v1/documents/upload
Content-Type: multipart/form-data
```

| Field | Type | Required | Description |
|---|---|---|---|
| `file` | File | Yes | PDF file only, max 20 MB |

**Response** `200 OK`:
```json
{
  "success": true,
  "message": "PDF uploaded successfully",
  "data": {
    "originalName": "example.pdf",
    "markdown": "# Enhanced Markdown\n\n...",
    "assets": []
  }
}
```

**Response** `400 Bad Request`:
```json
{
  "success": false,
  "message": "Only PDF files are allowed",
  "errors": []
}
```

**Response** `400 Bad Request` (no file):
```json
{
  "success": false,
  "message": "PDF file required",
  "errors": []
}
```

**Response** `500 Internal Server Error`:
```json
{
  "success": false,
  "message": "Failed to convert PDF into Markdown",
  "errors": []
}
```

## Processing Pipeline (per request)

1. Multer receives file, validates PDF type + 20 MB limit, saves to `uploads/temp/`
2. `DocumentService.processUpload` orchestrates:
   - `MarkdownService.convertPdfToMarkdown` → spawns Python, returns `ExtractionResult`
   - `AIService.generateNotes` → classify → clean → chunk → Groq AI → enhanced markdown
   - `deleteFile` cleanup in `finally` block
3. Returns `{ originalName, markdown, assets }`

## Error Format

All errors follow:
```json
{
  "success": false,
  "message": "...",
  "errors": []
}
```

Validation errors populate `errors` as `{ field: string, message: string }[]`.
