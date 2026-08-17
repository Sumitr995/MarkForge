import {
  sectionParserService,
  MarkdownSection,
} from "../parser/section-parser.service";

class ChunkService {
  createChunks(markdown: string, maxChunkSize = 8000): string[] {
    const sections = sectionParserService.parse(markdown);

    const chunks: string[] = [];
    let current: string[] = [];
    let currentSize = 0;

    const flush = () => {
      if (current.length === 0) return;
      chunks.push(current.join("\n\n"));
      current = [];
      currentSize = 0;
    };

    for (const section of sections) {
      const sectionParts = this.splitSection(section, maxChunkSize);

      for (const part of sectionParts) {
        if (currentSize > 0 && currentSize + part.length > maxChunkSize) {
          flush();
        }
        current.push(part);
        currentSize += part.length + 2;
      }
    }

    flush();

    return chunks;
  }

  private splitSection(
    section: MarkdownSection,
    maxChunkSize: number,
  ): string[] {
    const rendered = sectionParserService.render(section);

    if (rendered.length <= maxChunkSize) {
      return [rendered];
    }

    return this.splitByParagraphs(rendered, maxChunkSize);
  }

  private splitByParagraphs(text: string, maxChunkSize: number): string[] {
    const paragraphs = text.split(/\n\s*\n/);
    const parts: string[] = [];
    let current: string[] = [];
    let currentSize = 0;

    for (const paragraph of paragraphs) {
      if (currentSize > 0 && currentSize + paragraph.length > maxChunkSize) {
        parts.push(current.join("\n\n"));
        current = [];
        currentSize = 0;
      }

      if (paragraph.length > maxChunkSize) {
        if (current.length > 0) {
          parts.push(current.join("\n\n"));
          current = [];
          currentSize = 0;
        }
        parts.push(...this.splitBySize(paragraph, maxChunkSize));
      } else {
        current.push(paragraph);
        currentSize += paragraph.length + 2;
      }
    }

    if (current.length > 0) {
      parts.push(current.join("\n\n"));
    }

    return parts;
  }

  private splitBySize(text: string, maxChunkSize: number): string[] {
    const chunks: string[] = [];
    let remaining = text;

    while (remaining.length > maxChunkSize) {
      const slice = remaining.slice(0, maxChunkSize);
      const lastBreak = Math.max(
        slice.lastIndexOf(". "),
        slice.lastIndexOf("? "),
        slice.lastIndexOf("! "),
      );

      const splitAt = lastBreak > maxChunkSize * 0.5 ? lastBreak + 1 : maxChunkSize;

      chunks.push(remaining.slice(0, splitAt).trim());
      remaining = remaining.slice(splitAt).trim();
    }

    if (remaining.length > 0) {
      chunks.push(remaining);
    }

    return chunks;
  }
}

export const chunkService = new ChunkService();
