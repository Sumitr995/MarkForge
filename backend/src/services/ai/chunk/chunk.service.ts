class ChunkService {
  createChunks(markdown: string) {
    const CHUNK_SIZE = 8000;

    const chunks: string[] = [];

    for (let i = 0; i < markdown.length; i += CHUNK_SIZE) {
      chunks.push(markdown.slice(i, i + CHUNK_SIZE));
    }

    return chunks;
  }
}

export const chunkService = new ChunkService();
