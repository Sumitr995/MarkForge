import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "fs/promises";
import os from "os";
import path from "path";
import { sweepOldFiles } from "../src/common/utils/cleanup";

let dir: string;

beforeEach(async () => {
  dir = await fs.mkdtemp(path.join(os.tmpdir(), "markforge-cleanup-"));
});

afterEach(async () => {
  await fs.rm(dir, { recursive: true, force: true });
});

describe("sweepOldFiles", () => {
  it("deletes files older than maxAge and keeps fresh ones", async () => {
    const oldFile = path.join(dir, "old.pdf");
    const freshFile = path.join(dir, "fresh.pdf");
    await fs.writeFile(oldFile, "old");
    await fs.writeFile(freshFile, "fresh");

    const ancient = new Date(Date.now() - 10 * 60 * 1000);
    await fs.utimes(oldFile, ancient, ancient);

    const removed = await sweepOldFiles(dir, 60 * 1000);
    expect(removed).toBe(1);

    const remaining = await fs.readdir(dir);
    expect(remaining).toEqual(["fresh.pdf"]);
  });

  it("ignores missing directories", async () => {
    const removed = await sweepOldFiles(
      path.join(dir, "does-not-exist"),
      1000,
    );
    expect(removed).toBe(0);
  });
});
