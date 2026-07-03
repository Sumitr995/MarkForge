import { UploadedFile } from "../../common/types/file.types";

import { ApiError } from "../../common/errors/api-error";

class DocumentService {
  async processUpload(file?: UploadedFile) {
    if (!file) {
      throw new ApiError(400, "PDF file is required");
    }

    return {
      originalName: file.originalname,

      filename: file.filename,

      size: file.size,

      mimetype: file.mimetype,

      path: file.path,
    };
  }
}

export const documentService = new DocumentService();
