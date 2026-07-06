import { generateText } from "ai";

import { groq } from "@ai-sdk/groq";

export type DocumentType =
  | "research_paper"
  | "book"
  | "study_notes"
  | "documentation"
  | "resume"
  | "general";

class DocumentClassifierService {
  async classify(markdown: string): Promise<DocumentType> {
    const response = await generateText({
      model: groq("llama-3.3-70b-versatile"),

      temperature: 0,

      prompt: `

You are a document classifier.

Analyze the document and classify it.


Return ONLY ONE of these values:

research_paper
book
study_notes
documentation
resume
general


Rules:

- Do not explain.
- Do not add punctuation.
- Return only the category name.


DOCUMENT:


${markdown.slice(0, 3000)}

`,
    });

    const type = response.text.trim().toLowerCase();

    const allowedTypes: DocumentType[] = [
      "research_paper",

      "book",

      "study_notes",

      "documentation",

      "resume",

      "general",
    ];

    if (allowedTypes.includes(type as DocumentType)) {
      return type as DocumentType;
    }

    return "general";
  }
}

export const documentClassifierService = new DocumentClassifierService();
