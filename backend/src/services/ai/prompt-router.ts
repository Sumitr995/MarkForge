import { DocumentType } from "../ai/classifier/document-classifier.service";

import { createKnowledgePrompt } from "./prompts/knowledge.prompt";

export const createPrompt = (type: DocumentType, markdown: string) => {
  switch (type) {
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

${markdown}

`;

    default:
      return createKnowledgePrompt(markdown);
  }
};
