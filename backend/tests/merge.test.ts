import { describe, it, expect } from "vitest";

import { mergeService } from "../src/services/ai/merge/merge.service";

describe("MergeService", () => {
  it("returns empty string for no chunks", () => {
    expect(mergeService.merge([])).toBe("");
  });

  it("returns the single chunk unchanged for one chunk", () => {
    expect(mergeService.merge(["# Title\n\nSome content"])).toBe(
      "# Title\n\nSome content",
    );
  });

  it("deduplicates a repeated title heading across chunks", () => {
    const merged = mergeService.merge([
      "# The Report\n\nFirst chunk content.",
      "# The Report\n\nSecond chunk content.",
      "# The Report\n\nThird chunk content.",
    ]);

    expect(merged.match(/# The Report/g)).toHaveLength(1);
    expect(merged).toContain("Second chunk content.");
    expect(merged).toContain("Third chunk content.");
  });

  it("deduplicates repeated section headings at chunk boundaries", () => {
    const merged = mergeService.merge([
      "## Methods\n\nDetails about methods.",
      "## Methods\n\nMore method details.",
    ]);

    expect(merged.match(/## Methods/g)).toHaveLength(1);
    expect(merged).toContain("More method details.");
  });

  it("keeps unique headings that legitimately repeat later", () => {
    const merged = mergeService.merge([
      "# Doc\n\n## Summary\n\nSummary text.",
      "## Discussion\n\nDiscussion text.\n\n## Summary\n\nFinal summary.",
    ]);

    expect(merged.match(/## Summary/g)).toHaveLength(2);
    expect(merged).toContain("Final summary.");
  });

  it("does not duplicate the last line of the previous chunk when stitched", () => {
    const merged = mergeService.merge([
      "Para one ends with same line\n\nEnding line",
      "Ending line\n\nContinuing content",
    ]);

    expect(merged.match(/Ending line/g)).toHaveLength(1);
    expect(merged).toContain("Continuing content");
  });

  it("normalizes whitespace in the merged output", () => {
    const merged = mergeService.merge([
      "Chunk one   \n\n\n\nChunk one continues.",
      "   Chunk two.",
    ]);

    expect(merged).not.toContain("   ");
    expect(merged).not.toMatch(/\n{3,}/);
  });
});
