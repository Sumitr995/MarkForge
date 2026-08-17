import { describe, it, expect } from "vitest";

import { markdownCleanerService } from "../src/services/ai/preprocess/markdown-cleaner.service";

describe("MarkdownCleanerService", () => {
  it("normalizes CRLF line endings to LF", () => {
    const input = "# Title\r\n\r\nSome text\r\nwith lines\r\n";
    expect(markdownCleanerService.clean(input)).toBe("# Title\n\nSome text\nwith lines");
  });

  it("removes trailing whitespace from each line", () => {
    const input = "# Title   \n\nSome text  \nend";
    expect(markdownCleanerService.clean(input)).toBe("# Title\n\nSome text\nend");
  });

  it("collapses 3+ blank lines into a single blank line", () => {
    const input = "a\n\n\n\n\nb\n\n\nc";
    expect(markdownCleanerService.clean(input)).toBe("a\n\nb\n\nc");
  });

  it("does not flatten markdown structure", () => {
    const input = "# H1\n\n## H2\n\n- item one\n- item two";
    expect(markdownCleanerService.clean(input)).toBe("# H1\n\n## H2\n\n- item one\n- item two");
  });

  it("trims leading and trailing whitespace", () => {
    expect(markdownCleanerService.clean("  \n\nhello\n\n  ")).toBe("hello");
  });
});
