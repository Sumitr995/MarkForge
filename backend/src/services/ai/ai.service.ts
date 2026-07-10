import { generateText } from "ai";

import { openai } from "@ai-sdk/openai";
import { groq } from "@ai-sdk/groq";
import { createPrompt } from "./prompt-router";
import { documentClassifierService } from "./classifier/document-classifier.service";
import { chunkService } from "./chunk/chunk.service";
import { markdownCleanerService } from "./preprocess/markdown-cleaner.service";

class AIService {
  async generateNotes(markdown: string) {
    const documentType = await documentClassifierService.classify(markdown);

    console.log("DOCUMENT TYPE:", documentType);

    const cleanedMarkdown = markdownCleanerService.clean(markdown);

    const chunks = chunkService.createChunks(cleanedMarkdown);

    const processedChunks: string[] = [];

    for (const chunk of chunks) {
      const response = await generateText({
        model: groq("llama-3.3-70b-versatile"),

        prompt: createPrompt(documentType, chunk),

        temperature: 0.3,
        maxOutputTokens: 1500,
      });

      processedChunks.push(response.text);
    }

    return processedChunks.join("\n\n");
  }
}

export const aiService = new AIService();
