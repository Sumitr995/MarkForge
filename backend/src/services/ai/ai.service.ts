import { generateText } from "ai";

import { openai } from "@ai-sdk/openai";
import { groq } from "@ai-sdk/groq";

import { createPrompt } from "./prompt-router";

import { documentClassifierService } from "./classifier/document-classifier.service";

class AIService {
  async generateNotes(markdown: string) {
    const documentType = await documentClassifierService.classify(markdown);

    console.log("DOCUMENT TYPE:", documentType);

    const response = await generateText({
      model: groq("llama-3.3-70b-versatile"),

      prompt: createPrompt(
        documentType,

        markdown,
      ),

      temperature: 0.3,
    });

    return response.text;
  }
}

export const aiService = new AIService();
