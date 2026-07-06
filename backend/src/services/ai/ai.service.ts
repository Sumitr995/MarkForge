import { generateText } from "ai";

import { openai } from "@ai-sdk/openai";
import { groq } from "@ai-sdk/groq";

import { createKnowledgePrompt } from "./prompts/knowledge.prompt";

class AIService {
  async generateNotes(markdown: string) {
    const response = await generateText({
      model: groq("llama-3.3-70b-versatile"),

      prompt: createKnowledgePrompt(markdown), // Knowledge prompt for generating notes from markdown content

      temperature: 0.3,
    });

    return response.text;
  }
}

export const aiService = new AIService();
