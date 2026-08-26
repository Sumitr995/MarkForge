import { API_URL } from "./constants";

export interface UploadResponse {
  success: boolean;
  message: string;
  data: {
    originalName: string;
    markdown: string;
    assets: { type: string; path: string; page: number }[];
  };
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function safeJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export async function uploadPdf(file: File, signal?: AbortSignal): Promise<UploadResponse> {
  const form = new FormData();
  form.append("file", file);

  // product-grade timeout: 120s for large PDFs + AI
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 120_000);
  const combinedSignal = signal
    ? AbortSignal.any([signal, controller.signal])
    : controller.signal;

  try {
    const res = await fetch(`${API_URL}/documents/upload`, {
      method: "POST",
      body: form,
      signal: combinedSignal,
    });
    const json = await safeJson(res);

    if (!res.ok) {
      const msg =
        json?.message ??
        (res.status === 413
          ? "File too large — max 20 MB"
          : res.status === 429
            ? "Too many requests — please try again in a minute"
            : res.status === 502
              ? "Conversion service temporarily unavailable"
              : `Upload failed (${res.status})`);
      throw new ApiError(msg, res.status);
    }
    if (!json?.data?.markdown) throw new ApiError("Invalid server response", 500);
    return json as UploadResponse;
  } catch (e) {
    if (e instanceof DOMException && e.name === "AbortError") {
      throw new ApiError("Request timed out — your PDF may be too large. Try a smaller file or retry.", 408);
    }
    throw e;
  } finally {
    clearTimeout(timeout);
  }
}

export async function checkHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/health`, { method: "GET" });
    // health route has Zod bug requiring body, but we treat any 200-399 as ok
    return res.ok;
  } catch {
    return false;
  }
}
