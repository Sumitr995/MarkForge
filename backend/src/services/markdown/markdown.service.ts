import { execFile } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs";

import { ApiError } from "../../common/errors/api-error";
import { ExtractionResult } from "../../common/types/file.types";
import { env } from "../../config/env";

const execFileAsync = promisify(execFile);

function resolvePythonScript(): string {
  // 1) Explicit env override (Docker / custom deploy)
  if (env.PYTHON_SCRIPT && fs.existsSync(env.PYTHON_SCRIPT)) {
    return path.resolve(env.PYTHON_SCRIPT);
  }
  if (env.PYTHON_SCRIPT) return path.resolve(env.PYTHON_SCRIPT);

  // Candidates cover: local dev (backend/), Docker (/app/backend), flat layout (/app)
  const candidates = [
    path.resolve(process.cwd(), "../python/scripts/convert.py"), // local: backend -> ../python
    path.resolve(process.cwd(), "python/scripts/convert.py"), // flat: /app/python
    path.resolve("/app/python/scripts/convert.py"), // Docker absolute
    path.resolve(process.cwd(), "../../python/scripts/convert.py"), // fallback
  ];

  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  // default to first candidate so error message shows expected path
  return candidates[0];
}

const ASSETS_DIR = path.resolve(
  env.ASSETS_DIR || path.join(process.cwd(), "uploads", "assets"),
);

function resolvePythonPath(): string {
  // env var takes precedence — in Docker it's /usr/bin/python3
  if (env.PYTHON_PATH) {
    // if absolute path exists, use as-is; otherwise resolve relative
    return path.isAbsolute(env.PYTHON_PATH)
      ? env.PYTHON_PATH
      : path.resolve(env.PYTHON_PATH);
  }

  const venvRoot = path.resolve(process.cwd(), "../python/.venv");
  const candidate =
    process.platform === "win32"
      ? path.join(venvRoot, "Scripts", "python.exe")
      : path.join(venvRoot, "bin", "python");

  if (fs.existsSync(candidate)) return candidate;

  // Docker/system python fallbacks (python:3.12-slim uses /usr/local/bin/python)
  if (fs.existsSync("/usr/local/bin/python")) return "/usr/local/bin/python";
  if (fs.existsSync("/usr/bin/python3")) return "/usr/bin/python3";
  if (fs.existsSync("/usr/local/bin/python3")) return "/usr/local/bin/python3";

  return "python3";
}

class MarkdownService {
  async convertPdfToMarkdown(
    filePath: string,
    assetsDir: string = ASSETS_DIR,
  ): Promise<ExtractionResult> {
    try {
      const pythonPath = resolvePythonPath();
      const pythonScript = resolvePythonScript();

      if (!fs.existsSync(pythonScript)) {
        throw new Error(`Python script not found at ${pythonScript}`);
      }

      const { stdout, stderr } = await execFileAsync(
        pythonPath,

        [pythonScript, filePath, assetsDir],

        {
          encoding: "utf8",
          maxBuffer: 10 * 1024 * 1024,
        },
      );

      if (stderr) console.error("PYTHON STDERR:", stderr);

      const result = JSON.parse(stdout);

      if (!result.success) {
        throw new Error(result.error);
      }

      return {
        markdown: result.markdown,
        assets: result.assets ?? [],
      };
    } catch (error: any) {
      console.error("MARKDOWN ERROR:", error);
      console.error("MARKDOWN ERROR stdout:", error?.stdout);
      console.error("MARKDOWN ERROR stderr:", error?.stderr);
      console.error("MARKDOWN ERROR message:", error?.message);

      // Expose details temporarily for Render debugging — revert after fix
      const detail =
        error?.stderr || error?.stdout || error?.message || String(error);
      throw new ApiError(
        500,
        `Failed to convert PDF into Markdown: ${detail.slice(0, 500)}`,
      );
    }
  }
}

export const markdownService = new MarkdownService();
