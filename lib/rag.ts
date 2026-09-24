/**
 * lib/rag.ts
 *
 * Lightweight Document Chunker and Section Retrieval (RAG)
 * Avoids stuffing entire large contracts on every chat turn.
 */

export interface DocumentChunk {
  id: string;
  sectionTitle: string;
  content: string;
  tokensEstimate: number;
}

/**
 * Splits document text into structured sections/chunks based on clause numbers or headings.
 */
export function chunkDocument(rawText: string): DocumentChunk[] {
  if (!rawText) return [];

  // Split by numbered sections or major paragraph breaks
  const rawSections = rawText.split(/\n(?=(?:[0-9]+\.|\bClause\b|\bSection\b|\bARTICLE\b))/i);

  if (rawSections.length <= 1) {
    // Fallback: split by double newlines
    const paragraphs = rawText.split(/\n\s*\n/);
    return paragraphs
      .filter((p) => p.trim().length > 20)
      .map((p, idx) => {
        const firstLine = p.trim().split('\n')[0].slice(0, 50);
        return {
          id: `chunk-${idx + 1}`,
          sectionTitle: firstLine || `Section ${idx + 1}`,
          content: p.trim(),
          tokensEstimate: Math.ceil(p.length / 4),
        };
      });
  }

  return rawSections
    .filter((sec) => sec.trim().length > 8)
    .map((sec, idx) => {
      const trimmed = sec.trim();
      const firstLine = trimmed.split('\n')[0].replace(/^[0-9.]+\s*/, '').slice(0, 60);
      return {
        id: `chunk-${idx + 1}`,
        sectionTitle: firstLine || `Section ${idx + 1}`,
        content: trimmed,
        tokensEstimate: Math.ceil(trimmed.length / 4),
      };
    });
}

/**
 * Lightweight relevance ranking based on query term frequency and token matching.
 */
export function retrieveRelevantSections(
  question: string,
  chunks: DocumentChunk[],
  topK = 4
): DocumentChunk[] {
  if (chunks.length <= topK) {
    return chunks;
  }

  // Tokenize question into meaningful search keywords (filter out stop words)
  const stopWords = new Set([
    'the', 'is', 'at', 'which', 'on', 'a', 'an', 'in', 'and', 'or', 'for',
    'to', 'of', 'this', 'that', 'it', 'what', 'how', 'when', 'does', 'can',
    'i', 'you', 'my', 'if', 'be', 'do'
  ]);

  const queryTokens = question
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 2 && !stopWords.has(t));

  if (queryTokens.length === 0) {
    return chunks.slice(0, topK);
  }

  const scored = chunks.map((chunk) => {
    const text = (chunk.sectionTitle + ' ' + chunk.content).toLowerCase();
    let score = 0;

    for (const token of queryTokens) {
      if (text.includes(token)) {
        score += 2;
        // Boost if present in the section title
        if (chunk.sectionTitle.toLowerCase().includes(token)) {
          score += 5;
        }
      }
    }

    return { chunk, score };
  });

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  // Return top matches that have at least some relevance, or fallback to first few
  const relevant = scored.filter((s) => s.score > 0).map((s) => s.chunk);
  if (relevant.length === 0) {
    return chunks.slice(0, topK);
  }

  return relevant.slice(0, topK);
}
