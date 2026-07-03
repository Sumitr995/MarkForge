import { Request, Response } from "express";

import { asyncHandler } from "../common/handlers/async-handler";
import { ApiResponse } from "../common/utils/api-response";
import { ApiError } from "../common/errors/api-error";



export const uploadDocument = asyncHandler(
  async (req: Request, res: Response) => {
    console.log(req.file);

    if (!req.file) {
      throw new ApiError(
        400,
        "PDF file is required"
      );
    }



    return res.status(200).json(
      new ApiResponse(
        200,

        "PDF uploaded successfully",

        {
          filename: req.file?.filename,

          path: req.file?.path,

          size: req.file?.size,
        },
      ).toJSON(),
    );
  },
);
