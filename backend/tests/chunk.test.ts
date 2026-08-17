import { describe, it, expect } from "vitest";

import { chunkService } from "../src/services/ai/chunk/chunk.service";

const longMarkdown = `# Title

Intro paragraph with some filler text. ${"word ".repeat(500)}

## Section One

${"Section one content. ".repeat(100)}

## Section Two

${"Section two content. ".repeat(100)}

## Section Three

${"Section three content. ".repeat(100)}
`;

describe("ChunkService", () => {
  it("does not split mid-heading when sections fit", () => {
    const chunks = chunkService.createChunks(longMarkdown, 4000);
    expect(chunks.length).toBeGreaterThan(1);

    for (const chunk of chunks) {
      expect(chunk.length).toBeLessThanOrEqual(4000);
    }
  });

  it("keeps section headings attached to their content", () => {
    const chunks = chunkService.createChunks(longMarkdown, 4000);
    const joined = chunks.join("\n\n");

    expect(joined).toContain("# Title");
    expect(joined).toContain("## Section One");
    expect(joined).toContain("## Section Two");
    expect(joined).toContain("## Section Three");
  });

  it("splits oversized single paragraphs at sentence boundaries", () => {
    const markdown = `# T\n\n${"Sentence one. Sentence two. ".repeat(400)}`;
    const chunks = chunkService.createChunks(markdown, 2000);

    expect(chunks.length).toBeGreaterThan(1);
    for (const chunk of chunks) {
      expect(chunk.length).toBeLessThanOrEqual(2000);
    }
  });

  it("returns a single chunk for small documents", () => {
    const chunks = chunkService.createChunks("# Small\n\nTiny doc.");
    expect(chunks.length).toBe(1);
    expect(chunks[0]).toContain("# Small");
  });

  it("returns empty array for empty input", () => {
    expect(chunkService.createChunks("")).toEqual([]);
  });

  it("never creates empty chunks", () => {
    const markdown = `# A\n\n${"x ".repeat(20000)}\n\n# B\n\n${"y ".repeat(20000)}`;
    const chunks = chunkService.createChunks(markdown, 3000);
    expect(chunks.length).toBeGreaterThan(0);
    for (const chunk of chunks) {
      expect(chunk.trim().length).toBeGreaterThan(0);
    }
  });
});
