import { OpenAI } from 'openai';
import { loadVectorStore } from '../../lib/vectorStore';
import { logger } from '../../lib/logger';

const logChatInteraction = (ip, prompt, response, userAgent, contextMatches, startTime, responseBody) => {
  const timeElapsed = Date.now() - startTime;
  try {
    logger.chat.query(
      ip,
      userAgent,
      prompt,
      contextMatches,
      response.length,
      timeElapsed,
      responseBody
    );
  } catch (error) {
    console.error('Logging error:', error);
  }
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  const startTime = Date.now();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { messages } = req.body;
  const lastUserMessage = messages[messages.length - 1]?.content;
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'] || 'Unknown Browser';

  const store = await loadVectorStore();

  // Get vector search results with minimum relevance threshold
  const results = await store.similaritySearchWithScore(lastUserMessage, 8);
  const relevantResults = results.filter(([_, score]) => score > 0.7); // Only use highly relevant matches

  // Sort by relevance and extract content
  const contextText = relevantResults
    .sort(([, a], [, b]) => b - a)
    .map(([doc]) => doc.pageContent)
    .join('\n\n');

  // Format results for logging with cleaner preview text
  const contextMatches = relevantResults.map(([doc, score]) => ({
    metadata: doc.metadata,
    score: Number(score.toFixed(3)),
    pageContent: doc.pageContent.split('\n')[0].replace(/[#*`]/g, '').trim() // Clean first line for preview
  }));

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    stream: true,
    user: ip, // 👈 IP-based analytics
    messages: [
      {
        role: 'system',
        content: `You are Dom, a PowerBoard Integration Engineer. Help developers implement PowerBoard using official documentation.

        Behavior Instructions:
          — ALWAYS INCLUDE DISCLAIMERS in your responses, clarifying that the user should refer to the official PowerBoard documentation for the most accurate and up-to-date information, ALWAYS USE THIS FORMAT, ONLY AT THE END OF A RESPONSE: **Disclaimer:** Please refer to the official PowerBoard documentation for the most accurate and up-to-date information.
          — Do **not** use bullet points (•, -, *, etc.) in your responses.
          — Format everything as short paragraphs with line breaks instead of lists.
          — When explaining multi-step setup, **use bold section headings only** — do not use numbered lists like "1. 2. 3."

        ${contextText}`,
      },
      ...messages,
    ],
  });

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  let fullReply = '';

  for await (const chunk of response) {
    const content = chunk.choices?.[0]?.delta?.content || '';
    fullReply += content;
    res.write(content);
  }

  // Log the complete interaction with context matches
  logChatInteraction(ip, lastUserMessage, fullReply, userAgent, contextMatches, startTime, fullReply);

  res.end();
}
