import { describe, it, expect } from "vitest";

import { sectionParserService } from "../src/services/ai/parser/section-parser.service";

const sample = `Preamble text before any heading.

# Chapter One

Content of chapter one.

## Section A

Section A content.

## Section B

Section B content.

# Chapter Two

Content of chapter two.

## Nested

Nested content with code:

\`\`\`
# not a heading

\`\`\`
`;

describe("SectionParserService", () => {
  it("creates a preamble section for content before the first heading", () => {
    const sections = sectionParserService.parse(sample);
    expect(sections.length).toBeGreaterThan(0);
    expect(sections[0].heading).toBeNull();
    expect(sections[0].level).toBe(0);
    expect(sections[0].content).toContain("Preamble text");
  });

  it("builds a nested tree of sections", () => {
    const sections = sectionParserService.parse(sample);
    const chapters = sections.filter((s) => s.level === 1);

    expect(chapters.length).toBe(2);
    expect(chapters[0].heading).toBe("Chapter One");
    expect(chapters[0].subsections.map((s) => s.heading)).toEqual([
      "Section A",
      "Section B",
    ]);
    expect(chapters[1].subsections.map((s) => s.heading)).toEqual(["Nested"]);
  });

  it("ignores headings inside code blocks", () => {
    const sections = sectionParserService.parse(sample);
    const chapters = sections.filter((s) => s.level === 1);
    expect(chapters.map((s) => s.heading)).toEqual(["Chapter One", "Chapter Two"]);
  });

  it("flattens the tree in document order", () => {
    const sections = sectionParserService.parse(sample);
    const flat = sectionParserService.flatten(sections);
    expect(flat.map((s) => s.heading ?? "(preamble)")).toEqual([
      "(preamble)",
      "Chapter One",
      "Section A",
      "Section B",
      "Chapter Two",
      "Nested",
    ]);
  });

  it("renders a section including its subsections", () => {
    const sections = sectionParserService.parse(sample);
    const chapterOne = sections.find((s) => s.heading === "Chapter One")!;
    const rendered = sectionParserService.render(chapterOne);
    expect(rendered).toContain("# Chapter One");
    expect(rendered).toContain("## Section A");
    expect(rendered).toContain("## Section B");
    expect(rendered).toContain("Section A content");
  });
});
