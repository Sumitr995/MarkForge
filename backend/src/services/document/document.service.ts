import path from "path";

import { UploadedFile } from "../../common/types/file.types";

import { ApiError } from "../../common/errors/api-error";

import { markdownService } from "../markdown/markdown.service";

import { deleteFile } from "../../common/utils/file";

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
      const markdown = await markdownService.convertPdfToMarkdown(filePath);

      return {
        originalName: file.originalname,

        markdown,
      };
    } finally {
      await deleteFile(filePath);
    }
  }
}

export const documentService = new DocumentService();
