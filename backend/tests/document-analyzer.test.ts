import { describe, it, expect } from "vitest";

import { documentAnalyzerService } from "../src/services/ai/analyzer/document-analyzer.service";

const sample = `# The Future of AI

## Introduction

Some introductory text here.

| Name | Value |
|------|-------|
| A    | 1     |

## Methods

A code sample:

\`\`\`python
print("hello")
\`\`\`

An image: ![diagram](./img.png)

### Details

More content.
`;

describe("DocumentAnalyzerService", () => {
  it("detects the title from the first H1", () => {
    const analysis = documentAnalyzerService.analyze(sample);
    expect(analysis.title).toBe("The Future of AI");
  });

  it("counts headings with levels", () => {
    const analysis = documentAnalyzerService.analyze(sample);
    expect(analysis.headingCount).toBe(4);
    expect(analysis.headings[0]).toEqual({
      level: 1,
      text: "The Future of AI",
      line: 0,
    });
    expect(analysis.headings[1].level).toBe(2);
    expect(analysis.headings[2].level).toBe(2);
    expect(analysis.headings[3].level).toBe(3);
  });

  it("counts tables", () => {
    const analysis = documentAnalyzerService.analyze(sample);
    expect(analysis.tableCount).toBe(1);
  });

  it("counts images", () => {
    const analysis = documentAnalyzerService.analyze(sample);
    expect(analysis.imageCount).toBe(1);
  });

  it("counts code blocks, ignoring # inside them", () => {
    const analysis = documentAnalyzerService.analyze(sample);
    expect(analysis.codeBlockCount).toBe(1);
  });

  it("estimates tokens from character count", () => {
    const analysis = documentAnalyzerService.analyze(sample);
    expect(analysis.estimatedTokens).toBe(Math.ceil(sample.length / 4));
    expect(analysis.wordCount).toBeGreaterThan(0);
  });

  it("falls back to first line when no headings exist", () => {
    const analysis = documentAnalyzerService.analyze("Just some plain text\nmore text");
    expect(analysis.title).toBe("Just some plain text");
    expect(analysis.headingCount).toBe(0);
  });

  it("returns null title for empty input", () => {
    const analysis = documentAnalyzerService.analyze("   \n  ");
    expect(analysis.title).toBeNull();
  });
});
