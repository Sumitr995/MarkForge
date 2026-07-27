export type UploadedFile = Express.Multer.File;
export interface ExtractionResult {
  markdown: string;
  assets: unknown[]; // We'll define a proper Asset type later
}