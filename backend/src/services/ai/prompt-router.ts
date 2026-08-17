import { DocumentType } from "../ai/classifier/document-classifier.service";

import { createKnowledgePrompt } from "./prompts/knowledge.prompt";
import { createBookPrompt } from "./prompts/book.prompt";
import { createDocumentPrompt } from "./prompts/document.prompt";
import { createNotesPrompt } from "./prompts/notes.prompt";
import { createResearchPrompt } from "./prompts/research.prompt";

export interface ChunkContext {
  index: number;
  total: number;
  title: string | null;
}

export const createPrompt = (
  type: DocumentType,
  markdown: string,
  chunkContext?: ChunkContext,
) => {
  const contextNote = chunkContext
    ? `CONTEXT: This is chunk ${chunkContext.index} of ${chunkContext.total}${chunkContext.title ? ` of "${chunkContext.title}"` : ""}.\nIf you are not processing the first chunk, DO NOT repeat the document title or re-introduce the document. Continue the content seamlessly where the previous chunk ended.\n\n`
    : "";

  const body = `${contextNote}${markdown}`;

  switch (type) {
    case "book":
      return createBookPrompt(body);

    case "research_paper":
      return createResearchPrompt(body);

    case "study_notes":
      return createNotesPrompt(body);

    case "documentation":
      return createDocumentPrompt(body);

    case "resume":
      return `
Transform this resume into a clean professional profile document.

Create:

# Candidate Name

## Professional Summary

## Technical Skills

## Experience

## Projects

## Achievements

## Education


Rules:

- Keep facts accurate.
- Do not invent skills.
- Do not create fake links.
- Markdown only.


RESUME:

${body}

`;

    default:
      return createKnowledgePrompt(body);
  }
};
