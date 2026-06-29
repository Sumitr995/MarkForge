export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public errors?: unknown
  ) {
    super(message);

    Error.captureStackTrace(this, this.constructor);
  }
}