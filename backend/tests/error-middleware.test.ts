import { describe, it, expect, vi } from "vitest";
import multer from "multer";
import { errorMiddleware } from "../src/middleware/error.middleware";
import { ApiError } from "../src/common/errors/api-error";

function mockRes() {
  const json = vi.fn();
  const status = vi.fn(() => ({ json }));
  return { json, status };
}

describe("errorMiddleware", () => {
  it("returns generic message + requestId for unknown errors (no leak)", () => {
    const { json, status } = mockRes();
    const err = new Error("secret path /app/python/convert.py failed: boom");
    errorMiddleware(
      err,
      { requestId: "req-123" } as never,
      { status } as never,
      (() => {}) as never,
    );
    expect(status).toHaveBeenCalledWith(500);
    const body = json.mock.calls[0][0];
    expect(body).toEqual({
      success: false,
      message: "Something went wrong — please try again.",
      requestId: "req-123",
    });
    expect(JSON.stringify(body)).not.toContain("/app/python");
  });

  it("passes ApiError messages through with requestId", () => {
    const { json, status } = mockRes();
    errorMiddleware(
      new ApiError(400, "Only PDF files are allowed"),
      { requestId: "req-abc" } as never,
      { status } as never,
      (() => {}) as never,
    );
    expect(status).toHaveBeenCalledWith(400);
    expect(json.mock.calls[0][0]).toMatchObject({
      success: false,
      message: "Only PDF files are allowed",
      requestId: "req-abc",
    });
  });

  it("maps Multer file-size errors to 413 without internals", () => {
    const { json, status } = mockRes();
    errorMiddleware(
      new multer.MulterError("LIMIT_FILE_SIZE"),
      { requestId: "req-413" } as never,
      { status } as never,
      (() => {}) as never,
    );
    expect(status).toHaveBeenCalledWith(413);
    expect(json.mock.calls[0][0].requestId).toBe("req-413");
  });
});
