import { Request, Response, NextFunction, RequestHandler } from "express";
import { z } from "zod";

import { ApiError } from "../common/errors/api-error";
import { formatZodError } from "./format-zod-error";

type ValidationSchemas = {
  body?: z.ZodTypeAny;
  params?: z.ZodTypeAny;
  query?: z.ZodTypeAny;
};

export const validate =
  (schemas: ValidationSchemas): RequestHandler =>
  (req: Request, _res: Response, next: NextFunction) => {
    const validations = [
      { key: "body", schema: schemas.body, value: req.body },
      { key: "params", schema: schemas.params, value: req.params },
      { key: "query", schema: schemas.query, value: req.query },
    ] as const;

    for (const validation of validations) {
      if (!validation.schema) continue;

      const result = validation.schema.safeParse(validation.value);

      if (!result.success) {
        return next(
          new ApiError(
            400,
            "Validation failed",
            formatZodError(result.error)
          )
        );
      }

      switch (validation.key) {
        case "body":
          req.body = result.data;
          break;
        case "params":
          req.params = result.data as Request["params"];
          break;
        case "query":
          req.query = result.data as Request["query"];
          break;
      }
    }

    next();
  };