import { execFile } from "child_process";
import { promisify } from "util";
import path from "path";

import { ApiError } from "../../common/errors/api-error";

const execFileAsync = promisify(execFile);

class MarkdownService {
  async convertPdfToMarkdown(filePath: string): Promise<string> {
    try {
      const pythonPath = path.resolve(
        process.cwd(),
        "../python/.venv/Scripts/python.exe",
      );

      const scriptPath = path.resolve(
        process.cwd(),
        "../python/scripts/convert.py",
      );

      const { stdout } = await execFileAsync(
        pythonPath,

        [scriptPath, filePath],

        {
          encoding: "utf8",
        },
      );

      const result = JSON.parse(stdout);

      if (!result.success) {
        throw new Error(result.error);
      }

      return result.markdown;
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
