import path from "path";

import { UploadedFile, ExtractionResult } from "../../common/types/file.types";
import { ApiError } from "../../common/errors/api-error";
import { markdownService } from "../markdown/markdown.service";
import { deleteFile } from "../../common/utils/file";
import { aiService } from "../ai/ai.service";

class DocumentService {
  async processUpload(file?: UploadedFile) {
    if (!file) {
      throw new ApiError(
        400,

        "PDF file required",
      );
    }

    const filePath = path.resolve(file.path);

    try {
      const extraction = await markdownService.convertPdfToMarkdown(filePath);

const enhancedMarkdown =
  await aiService.generateNotes(extraction.markdown);

      return {
        originalName: file.originalname,

        markdown: enhancedMarkdown,

        assets: extraction.assets
      };
    } finally {
      await deleteFile(filePath);
    }
  }
}

export const documentService = new DocumentService();
