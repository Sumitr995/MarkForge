import { markdownCleanerService } from "../preprocess/markdown-cleaner.service";

class MergeService {
  merge(chunkResults: string[]): string {
    if (chunkResults.length === 0) return "";

    const cleaned = chunkResults.map((c) => markdownCleanerService.clean(c));

    const merged: string[] = [cleaned[0]];
    const seenHeadings = new Set<string>(this.extractHeadings(cleaned[0]));

    for (let i = 1; i < cleaned.length; i++) {
      const current = cleaned[i];
      const lines = current.split("\n");

      const filteredLines: string[] = [];
      let skipLeadingTitle = true;

      for (const line of lines) {
        const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
        const isHeading = headingMatch !== null;

        if (skipLeadingTitle && isHeading) {
          const headingKey = headingMatch![2].trim().toLowerCase();

          if (seenHeadings.has(headingKey)) {
            continue;
          }

          seenHeadings.add(headingKey);
          filteredLines.push(line);
          skipLeadingTitle = false;
          continue;
        }

        skipLeadingTitle = false;

        if (isHeading) {
          const headingKey = headingMatch![2].trim().toLowerCase();
          seenHeadings.add(headingKey);
        }

        filteredLines.push(line);
      }

      const stitched = this.stitchBoundaries(
        merged[merged.length - 1],
        filteredLines,
      );
      merged.push(stitched.join("\n"));
    }

    return markdownCleanerService.clean(merged.join("\n\n"));
  }

  private extractHeadings(markdown: string): string[] {
    return markdown
      .split("\n")
      .filter((line) => /^#{1,6}\s+/.test(line))
      .map((line) => line.replace(/^#{1,6}\s+/, "").trim().toLowerCase());
  }

  private stitchBoundaries(
    previous: string,
    nextLines: string[],
  ): string[] {
    if (nextLines.length === 0) return nextLines;

    const prevLastLine = previous.split("\n").pop()?.trim() ?? "";
    const nextFirstLine = nextLines[0].trim();

    if (prevLastLine.length > 0 && prevLastLine === nextFirstLine) {
      return nextLines.slice(1);
    }

    return nextLines;
  }
}

export const mergeService = new MergeService();
