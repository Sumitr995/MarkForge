class MarkdownCleanerService {
  clean(markdown: string) {
    return markdown
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
      .split("\n")
      .map((line) => line.replace(/[ \t]+$/g, ""))
      .join("\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }
}

export const markdownCleanerService = new MarkdownCleanerService();
