import {
  getPublicationId
} from "./chunk-WWRFIT2U.mjs";
import {
  coverImageURL,
  hashnodeHost,
  subtitle
} from "./chunk-SERWC4PJ.mjs";

// src/index.ts
import fs from "fs/promises";

// node_modules/.pnpm/uid@2.0.2/node_modules/uid/dist/index.mjs
var IDX = 256;
var HEX = [];
while (IDX--)
  HEX[IDX] = (IDX + 256).toString(16).substring(1);

// src/index.ts
var getMarkdownContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return content;
  } catch (error) {
    const err = error;
    console.error("Error reading file:", err.message);
    throw err;
  }
};
var postBlogToHashnode = async () => {
  let article = "";
  const BLOG = await getMarkdownContent(".hashnode/BLOG.md");
  article += BLOG;
  try {
    const CHANGELOG = await getMarkdownContent("CHANGELOG.md");
    article += CHANGELOG;
  } catch (error) {
    console.warn(
      "CHANGELOG.md was not found. It wont be included in your blog"
    );
  }
  const publicationId = await getPublicationId();
  console.log(
    `Publishing on ${hashnodeHost} with publicationId ${publicationId}..`
  );
  console.log(article);
  console.log({ subtitle, coverImageURL });
};
postBlogToHashnode();
