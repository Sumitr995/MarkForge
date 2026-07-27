# Project Contracts

Single source of truth for shared interfaces between layers.

## Python Bridge Protocol

Communication between Node.js (`markdown.service.ts`) and Python (`convert.py`) uses `child_process.execFile` with JSON over stdout.

### Request (Node.js → Python)

```bash
python.exe ../python/scripts/convert.py <pdf_path>
```

### Success Response (stdout)

```json
{
  "success": true,
  "markdown": "# Extracted Markdown...",
  "assets": []
}
```

### Error Response (stderr, exit code 1)

```json
{
  "success": false,
  "error": "Error message"
}
```

### Notes

- stdout is wrapped with `utf-8` encoding in Python (`io.TextIOWrapper`)
- `sys.path` is modified in `convert.py` to import from `services/`
- Output uses `json.dumps(ensure_ascii=False)`

## ExtractionResult

```typescript
// backend/src/common/types/file.types.ts
interface ExtractionResult {
  markdown: string;
  assets: unknown[]; // Asset type TBD — currently inferred from Python
}
```

## Asset (from Python)

```typescript
// Returned by assets.py, consumed in markdown.service.ts
interface Asset {
  type: "image";
  path: string;   // relative path, e.g. "assets/uuid.jpg"
  page: number;   // 1-indexed page number
}
```

`assets` is typed as `unknown[]` in TypeScript — the concrete shape comes from Python.

## UploadedFile

```typescript
// backend/src/common/types/file.types.ts
type UploadedFile = Express.Multer.File;
```

## ApiResponse<T>

```typescript
// backend/src/common/utils/api-response.ts
class ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;

  toJSON(): {
    success: true;
    message: string;
    data: T;
  };
}

// Usage:
new ApiResponse(200, "PDF uploaded successfully", document).toJSON();
// → { success: true, message: "PDF uploaded successfully", data: {...} }
```

## ApiError

```typescript
// backend/src/common/errors/api-error.ts
class ApiError extends Error {
  statusCode: number;
  errors?: unknown; // ValidationError[] when from Zod validation

  constructor(statusCode: number, message: string, errors?: unknown);
}

// ValidationError shape:
interface ValidationError {
  field: string;   // dotted path, e.g. "body.name"
  message: string; // human-readable error
}
```

### Error Response Shape (from error middleware)

```json
{
  "success": false,
  "message": "...",
  "errors": []
}
```

## Upload Constraints

| Constraint | Value |
|---|---|
| Field name | `file` |
| MIME type | `application/pdf` only |
| Max size | 20 MB |
| Storage | `uploads/temp/` (disk, cleaned after request) |
