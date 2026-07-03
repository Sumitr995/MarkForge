import { UploadedFile } from "../../common/types/file.types";
import { ApiError } from "../../common/errors/api-error";
import { markdownService } from "../markdown/markdown.service";

class DocumentService {
  async processUpload(file?: UploadedFile) {
    if (!file) {
      throw new ApiError(400, "PDF file required");
    }

    const markdown = await markdownService.convertPdfToMarkdown(file.path);

    return {
      originalName: file.originalname,

      markdown,
    };
  }
}

export const documentService = new DocumentService();
