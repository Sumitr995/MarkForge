export interface MarkdownSection {
  level: number;
  heading: string | null;
  content: string;
  startLine: number;
  endLine: number;
  subsections: MarkdownSection[];
}

class SectionParserService {
  parse(markdown: string): MarkdownSection[] {
    const lines = markdown.split("\n");
    const root: MarkdownSection[] = [];
    const stack: MarkdownSection[] = [];
    let inCodeBlock = false;
    let preamble = "";
    let lastLine = -1;

    const pushPreamble = () => {
      if (!preamble.trim()) return;
      root.push({
        level: 0,
        heading: null,
        content: preamble.trim(),
        startLine: 0,
        endLine: lastLine,
        subsections: [],
      });
      preamble = "";
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      if (trimmed.startsWith("```")) {
        inCodeBlock = !inCodeBlock;
        continue;
      }

      if (inCodeBlock) continue;

      const match = trimmed.match(/^(#{1,6})\s+(.*)$/);
      if (!match) {
        lastLine = i;
        if (stack.length === 0) {
          preamble += line + "\n";
        } else {
          stack[stack.length - 1].content += line + "\n";
        }
        continue;
      }

      const level = match[1].length;
      const heading = match[2].trim();
      const section: MarkdownSection = {
        level,
        heading,
        content: "",
        startLine: i,
        endLine: i,
        subsections: [],
      };

      pushPreamble();

      while (stack.length > 0 && stack[stack.length - 1].level >= level) {
        stack.pop();
      }

      if (stack.length === 0) {
        root.push(section);
      } else {
        stack[stack.length - 1].subsections.push(section);
      }

      stack.push(section);
    }

    pushPreamble();

    return root;
  }

  flatten(sections: MarkdownSection[]): MarkdownSection[] {
    const flat: MarkdownSection[] = [];
    for (const section of sections) {
      flat.push(section);
      flat.push(...this.flatten(section.subsections));
    }
    return flat;
  }

  render(section: MarkdownSection): string {
    const heading = section.heading
      ? `${"#".repeat(section.level)} ${section.heading}\n\n`
      : "";
    const subsections = section.subsections.map((s) => this.render(s)).join("\n\n");
    const body = [section.content.trim(), subsections].filter(Boolean).join("\n\n");
    return [heading.trim(), body].filter(Boolean).join("\n\n");
  }
}

export const sectionParserService = new SectionParserService();
