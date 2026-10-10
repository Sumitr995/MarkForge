import { describe, it, expect, vi } from "vitest";
import { healthCheck } from "../src/controllers/health.controller";

describe("GET /api/v1/health", () => {
  it("returns { status: 'ok' } only", () => {
    const json = vi.fn();
    const status = vi.fn(() => ({ json }));
    healthCheck({} as never, { status } as never);
    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith({ status: "ok" });
  });
});
