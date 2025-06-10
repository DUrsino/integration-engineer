import crypto from "crypto";
import fs from "fs";
import path from "path";

const docsPath = path.join(process.cwd(), "public/docs");

// Add utility functions
const formatBrowser = (userAgent) => {
  const match = userAgent.match(/(Chrome|Firefox|Safari|Edge)\/(\d+)/);
  return match ? `${match[1]} ${match[2]}` : "Unknown Browser";
};

const formatIP = (ip) => ip.replace("::ffff:", "");

const baseLogFormat = {
  formatLog: (type, action, data) => {
    try {
      return {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV,
        version: process.env.APP_VERSION || "1.0.0",
        type,
        action,
        duration_ms: data.timeMs,
        ...data,
      };
    } catch (error) {
      console.error("Error formatting log:", error);
      return null;
    }
  },
};

const calculateAverageScore = (matches) => {
  return Number(
    (matches.reduce((acc, m) => acc + m.score, 0) / matches.length).toFixed(3)
  );
};

const estimateTokenCount = (text) => Math.ceil(text.length / 4);

const detectLanguage = (text) => {
  // Simple language detection - extend as needed
  return "en";
};

// Add console output for debugging
export const logger = {
  chat: {
    query: (
      ip,
      browser,
      query,
      matches,
      responseChars,
      timeMs,
      responseBody
    ) => {
      const log = baseLogFormat.formatLog("chat", "query", {
        request: {
          client: {
            ip: formatIP(ip),
            browser: formatBrowser(browser),
          },
          query: {
            text: query,
            length: query.length,
            language: detectLanguage(query),
          },
        },
        vector_search: {
          matches: matches
            .filter((m) => m.score > 0.7)
            .map((m) => ({
              file: m.metadata.source,
              score: Number(m.score.toFixed(3)),
              snippet: m.pageContent.substring(0, 100),
            })),
          total_matches: matches.length,
          avg_score: calculateAverageScore(matches),
        },
        response: {
          chars: responseChars,
          tokens: estimateTokenCount(responseBody),
          processing_time_ms: timeMs,
          completion_tokens: responseBody.length / 4,
          text: responseBody, // Add the full response text
        },
      });

      console.log(JSON.stringify(log, null, 2));
      return log;
    },
  },
  system: {
    docsLoad: (files, totalBytes, timeMs) =>
      baseLogFormat.formatLog("system", "docs_load", {
        docs: {
          files: files.map((f) => ({
            name: f.filename,
            bytes: f.chars,
            type: path.extname(f.filename),
            last_modified: fs.statSync(path.join(docsPath, f.filename)).mtime,
          })),
          summary: {
            total_files: files.length,
            total_bytes: totalBytes,
            avg_file_size: Math.round(totalBytes / files.length),
          },
        },
        memory: process.memoryUsage(),
        timeMs,
      }),

    chunksCreate: (chunks, avgSize, fileCount, timeMs) =>
      baseLogFormat.formatLog("system", "chunks_create", {
        chunks: {
          count: chunks,
          avg_size: avgSize,
          total_size: chunks * avgSize,
          source_files: fileCount,
        },
        performance: {
          chunks_per_second: Math.round(chunks / (timeMs / 1000)),
          processing_time_ms: timeMs,
        },
      }),
  },
};
