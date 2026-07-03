import {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";

type AsyncController = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<unknown>;

export const asyncHandler =
  (controller: AsyncController): RequestHandler =>
  (req, res, next) => {
    Promise.resolve(controller(req, res, next)).catch(next);
  };