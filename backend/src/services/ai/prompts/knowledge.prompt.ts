export const createKnowledgePrompt = (markdown: string) => `
You are an expert knowledge engineer.

Your job is to transform raw extracted PDF content into a premium learning document.

You are NOT a summarizer.

Your goals:

- Extract important knowledge
- Remove filler
- Preserve important details
- Preserve examples
- Preserve technical explanations
- Preserve formulas
- Preserve code blocks
- Preserve tables
- Keep useful references and links

Create a beautiful Markdown document optimized for learning.

Output requirements:

1. Start with a centered title section.

2. Include:

# Title

## 📌 Quick Overview

Short explanation.

## 🧠 Key Ideas

Important concepts.

## 📚 Core Concepts

Explain concepts clearly.

Use:

- headings
- bullet lists
- tables
- blockquotes
- checklists

## 💡 Important Examples

Keep examples from original document.

## 🔗 Useful Resources

Include links found in document.

Do not invent fake links.

## 📝 Final Revision Notes

Short exam/interview style notes.

Rules:

Rules:

- NEVER generate HTML tags.
- Markdown only.
- Do not create links that were not present in the original document.
- Do not create fake resources.
- If no links exist, omit resources section.
- Preserve original examples.
- Do not force sections that do not match document type.
- Adapt structure based on content.


RAW DOCUMENT:

${markdown}
`;
