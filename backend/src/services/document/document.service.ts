import path from "path";
import fs from "fs/promises";

import { UploadedFile, Asset } from "../../common/types/file.types";
import { ApiError } from "../../common/errors/api-error";
import { markdownService } from "../markdown/markdown.service";
import { deleteFile } from "../../common/utils/file";
import { aiService } from "../ai/ai.service";
import { env } from "../../config/env";

const ASSETS_DIR = path.join(process.cwd(), "uploads", "temp", "assets");

export interface ProcessedDocument {
  originalName: string;
  markdown: string;
  assets: Asset[];
}

class DocumentService {
  async processUpload(file?: UploadedFile): Promise<{
    data: ProcessedDocument;
    cleanup: () => Promise<void>;
  }> {
    if (!file) {
      throw new ApiError(400, "PDF file required");
    }

    const filePath = path.resolve(file.path);

    await fs.mkdir(ASSETS_DIR, { recursive: true });

    try {
      const extraction = await markdownService.convertPdfToMarkdown(
        filePath,
        ASSETS_DIR,
      );

      const enhancedMarkdown = await aiService.generateNotes(extraction.markdown);

      const absoluteAssetPaths = extraction.assets.map((asset) => asset.path);

      return {
        data: {
          originalName: file.originalname,
          markdown: enhancedMarkdown,
          assets: this.toAssetUrls(extraction.assets),
        },
        cleanup: () => this.deleteAssetFiles(absoluteAssetPaths),
      };
    } finally {
      await deleteFile(filePath);
    }
  }

  private async deleteAssetFiles(paths: string[]) {
    await Promise.all(paths.map((assetPath) => deleteFile(assetPath)));
  }

  private toAssetUrls(assets: Asset[]): Asset[] {
    return assets.map((asset) => ({
      ...asset,
      path: this.absoluteToUrl(asset.path),
    }));
  }

  private absoluteToUrl(absolutePath: string): string {
    const uploadsRoot = path.join(process.cwd(), "uploads");
    const relative = path.relative(uploadsRoot, absolutePath);
    const relUrl = "/uploads/" + relative.split(path.sep).join("/");
    // Use BACKEND_URL in production (Render) so assets are https://markforge.onrender.com/uploads/...
    // Locally falls back to http://localhost:5000
    const base = env.BACKEND_URL || `http://localhost:${env.PORT}`;
    return `${base}${relUrl}`;
  }
}

export const documentService = new DocumentService();