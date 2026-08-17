export type UploadedFile = Express.Multer.File;

export interface Asset {
  type: "image";
  path: string;
  page: number;
  width: number;
  height: number;
  extension: string;
  size: number;
}

export interface ExtractionResult {
  markdown: string;
  assets: Asset[];
}