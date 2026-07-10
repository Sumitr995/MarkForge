class MarkdownCleanerService {
  clean(markdown: string) {
    return markdown

      .replace(/\n{3,}/g, "\n\n")

      .replace(/\s+/g, " ")

      .trim();
  }
}

export const markdownCleanerService = new MarkdownCleanerService();
