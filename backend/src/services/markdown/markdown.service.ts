import { execFile } from "child_process";
import { promisify } from "util";
import path from "path";

import { ApiError } from "../../common/errors/api-error";

const execFileAsync = promisify(execFile);

class MarkdownService {
  async convertPdfToMarkdown(filePath: string) {
    try {
      const scriptPath = path.resolve(
        process.cwd(),
        "../python/scripts/convert.py",
      );

      const pythonPath = path.resolve(
        process.cwd(),
        "../python/.venv/Scripts/python.exe",
      );

      const { stdout } = await execFileAsync(pythonPath, [
        scriptPath,
        filePath,
      ]);

      return stdout;
    } catch (error) {
      console.error("MARKDOWN ERROR:", error);

      throw new ApiError(500, "Failed to convert PDF into Markdown");
    }
  }
}

export const markdownService = new MarkdownService();
