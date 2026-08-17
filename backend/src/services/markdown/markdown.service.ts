import { execFile } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs";

import { ApiError } from "../../common/errors/api-error";
import { ExtractionResult } from "../../common/types/file.types";
import { env } from "../../config/env";

const execFileAsync = promisify(execFile);

const PYTHON_SCRIPT = path.resolve(
  process.cwd(),
  "../python/scripts/convert.py",
);

const ASSETS_DIR = path.resolve(
  env.ASSETS_DIR || path.join(process.cwd(), "uploads", "assets"),
);

function resolvePythonPath(): string {
  if (env.PYTHON_PATH) return path.resolve(env.PYTHON_PATH);

  const venvRoot = path.resolve(process.cwd(), "../python/.venv");
  const candidate =
    process.platform === "win32"
      ? path.join(venvRoot, "Scripts", "python.exe")
      : path.join(venvRoot, "bin", "python");

  return fs.existsSync(candidate) ? candidate : "python";
}

class MarkdownService {
  async convertPdfToMarkdown(
    filePath: string,
    assetsDir: string = ASSETS_DIR,
  ): Promise<ExtractionResult> {
    try {
      const pythonPath = resolvePythonPath();

      const { stdout } = await execFileAsync(
        pythonPath,

        [PYTHON_SCRIPT, filePath, assetsDir],

        {
          encoding: "utf8",
        },
      );

      const result = JSON.parse(stdout);

      if (!result.success) {
        throw new Error(result.error);
      }

      return {
        markdown: result.markdown,
        assets: result.assets ?? [],
      };
    } catch (error) {
      console.error("MARKDOWN ERROR:", error);

      throw new ApiError(
        500,

        "Failed to convert PDF into Markdown",
      );
    }
  }
}

export const markdownService = new MarkdownService();
