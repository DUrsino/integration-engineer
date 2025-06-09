import fs from "fs";
import path from "path";
import { MarkdownTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { logger } from "./logger";

const docsPath = path.join(process.cwd(), "public/docs");

export async function loadVectorStore() {
  const startTime = Date.now();

  if (!fs.existsSync(docsPath)) {
    logger.system.error({ msg: "Docs not found", path: docsPath });
    return MemoryVectorStore.fromDocuments([], new OpenAIEmbeddings());
  }

  const files = fs.readdirSync(docsPath);
  const docsStats = files.map((file) => ({
    filename: file,
    chars: fs.readFileSync(path.join(docsPath, file), "utf-8").length,
  }));

  const totalBytes = docsStats.reduce((sum, f) => sum + f.chars, 0);
  logger.system.docsLoad(docsStats, totalBytes, Date.now() - startTime);

  const rawTexts = docsStats.map(({ filename }) => ({
    content: fs.readFileSync(path.join(docsPath, filename), "utf-8"),
    file: filename,
  }));

  const splitter = new MarkdownTextSplitter({
    chunkSize: 2000,
    chunkOverlap: 200,
  });

  const documents = [];

  for (const { content, file } of rawTexts) {
    const chunks = await splitter.createDocuments(
      [content],
      [{ source: file }]
    );
    documents.push(...chunks);
  }

  logger.system.chunksCreate(
    documents.length,
    Math.round(
      documents.reduce((acc, doc) => acc + doc.pageContent.length, 0) /
        documents.length
    ),
    files.length,
    Date.now() - startTime
  );

  const store = await MemoryVectorStore.fromDocuments(
    documents,
    new OpenAIEmbeddings()
  );

  return store;
}
