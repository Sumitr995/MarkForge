import { Request, Response } from "express";

import { asyncHandler } from "../common/handlers/async-handler";

import { ApiResponse } from "../common/utils/api-response";

import { documentService } from "../services/document/document.service";

export const uploadDocument = asyncHandler(
  async (
    req: Request,

    res: Response,
  ) => {
    const document = await documentService.processUpload(req.file);

    return res.status(200).json(
      new ApiResponse(
        200,

        "PDF uploaded successfully",

        document,
      ).toJSON(),
    );
  },
);
