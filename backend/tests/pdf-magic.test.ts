import { describe, it, expect } from "vitest";
import { hasPdfMagicBytes } from "../src/middleware/validate-pdf";

describe("hasPdfMagicBytes", () => {
  it("accepts a valid PDF header", () => {
    expect(hasPdfMagicBytes(Buffer.from("%PDF-1.7 rest"))).toBe(true);
  });

  it("rejects non-PDF content", () => {
    expect(hasPdfMagicBytes(Buffer.from("<!DOCTYPE html>"))).toBe(false);
    expect(hasPdfMagicBytes(Buffer.from("MZ\x90\x00"))).toBe(false);
  });

  it("rejects short buffers", () => {
    expect(hasPdfMagicBytes(Buffer.from("%P"))).toBe(false);
    expect(hasPdfMagicBytes(Buffer.alloc(0))).toBe(false);
  });
});
