export interface HeadingInfo {
  level: number;
  text: string;
  line: number;
}

export interface DocumentAnalysis {
  title: string | null;
  headings: HeadingInfo[];
  headingCount: number;
  tableCount: number;
  imageCount: number;
  codeBlockCount: number;
  wordCount: number;
  characterCount: number;
  estimatedTokens: number;
}

class DocumentAnalyzerService {
  analyze(markdown: string): DocumentAnalysis {
    const lines = markdown.split("\n");

    const headings: HeadingInfo[] = [];
    let tableCount = 0;
    let imageCount = 0;
    let codeBlockCount = 0;
    let inCodeBlock = false;
    let inTable = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line.startsWith("```")) {
        codeBlockCount++;
        inCodeBlock = !inCodeBlock;
        inTable = false;
        continue;
      }

      if (inCodeBlock) continue;

      const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
      if (headingMatch) {
        headings.push({
          level: headingMatch[1].length,
          text: headingMatch[2].trim(),
          line: i,
        });
        inTable = false;
        continue;
      }

      const isTableLine = line.startsWith("|");
      if (isTableLine && !inTable) {
        tableCount++;
        inTable = true;
      } else if (!isTableLine) {
        inTable = false;
      }

      imageCount += (line.match(/!\[[^\]]*\]\([^)]*\)/g) ?? []).length;
    }

    const words = markdown.split(/\s+/).filter(Boolean);
    const characterCount = markdown.length;

    return {
      title: this.detectTitle(headings, lines),
      headings,
      headingCount: headings.length,
      tableCount,
      imageCount,
      codeBlockCount: Math.floor(codeBlockCount / 2),
      wordCount: words.length,
      characterCount,
      estimatedTokens: Math.ceil(characterCount / 4),
    };
  }

  private detectTitle(headings: HeadingInfo[], lines: string[]): string | null {
    const firstH1 = headings.find((h) => h.level === 1);
    if (firstH1) return firstH1.text;

    const firstHeading = headings[0];
    if (firstHeading) return firstHeading.text;

    const firstNonEmpty = lines.find((line) => line.trim().length > 0);
    return firstNonEmpty ? firstNonEmpty.trim().slice(0, 120) : null;
  }
}

export const documentAnalyzerService = new DocumentAnalyzerService();
