import { generateText } from "ai";

import { groq } from "@ai-sdk/groq";
import { env } from "../../config/env";
import { createPrompt } from "./prompt-router";
import { documentClassifierService } from "./classifier/document-classifier.service";
import { chunkService } from "./chunk/chunk.service";
import { markdownCleanerService } from "./preprocess/markdown-cleaner.service";
import { documentAnalyzerService } from "./analyzer/document-analyzer.service";
import { mergeService } from "./merge/merge.service";

class AIService {
  async generateNotes(markdown: string) {
    const documentType = await documentClassifierService.classify(markdown);

    console.log("DOCUMENT TYPE:", documentType);

    const cleanedMarkdown = markdownCleanerService.clean(markdown);

    const analysis = documentAnalyzerService.analyze(cleanedMarkdown);

    console.log("ANALYSIS:", {
      title: analysis.title,
      headings: analysis.headingCount,
      tables: analysis.tableCount,
      images: analysis.imageCount,
      tokens: analysis.estimatedTokens,
    });

    const chunks = chunkService.createChunks(cleanedMarkdown);

    const processedChunks: string[] = [];

    for (let i = 0; i < chunks.length; i++) {
      const response = await generateText({
        model: groq(env.GROQ_MODEL),

        prompt: createPrompt(documentType, chunks[i], {
          index: i + 1,
          total: chunks.length,
          title: analysis.title,
        }),

        temperature: 0.3,
        maxOutputTokens: 1500,
      });

      processedChunks.push(response.text);
    }

    return mergeService.merge(processedChunks);
  }
}

export const aiService = new AIService();
