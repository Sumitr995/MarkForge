import { execFile } from "child_process";
import { promisify } from "util";
import path from "path";

import { ApiError } from "../../common/errors/api-error";
import { ExtractionResult } from "../../common/types/file.types";


const execFileAsync = promisify(execFile);

class MarkdownService {
  async convertPdfToMarkdown(filePath: string): Promise<ExtractionResult> {
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

      // Return the markdown and assets, ensuring assets is an array even if it's undefined
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
