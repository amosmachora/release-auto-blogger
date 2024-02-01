import {
  getPublicationId,
  init_publications
} from "./chunk-3ACS7XLN.mjs";
import {
  __async,
  __commonJS,
  __esm,
  coverImageURL,
  hashnodeHost,
  init_config,
  subtitle
} from "./chunk-S6SOEN4Y.mjs";

// node_modules/.pnpm/uid@2.0.2/node_modules/uid/dist/index.mjs
var IDX, HEX;
var init_dist = __esm({
  "node_modules/.pnpm/uid@2.0.2/node_modules/uid/dist/index.mjs"() {
    "use strict";
    IDX = 256;
    HEX = [];
    while (IDX--)
      HEX[IDX] = (IDX + 256).toString(16).substring(1);
  }
});

// src/index.ts
import fs from "fs/promises";
var require_src = __commonJS({
  "src/index.ts"(exports) {
    init_dist();
    init_publications();
    init_config();
    var getMarkdownContent = (filePath) => __async(exports, null, function* () {
      try {
        const content = yield fs.readFile(filePath, "utf-8");
        return content;
      } catch (error) {
        const err = error;
        console.error("Error reading file:", err.message);
        throw err;
      }
    });
    var postBlogToHashnode = () => __async(exports, null, function* () {
      let article = "";
      const BLOG = yield getMarkdownContent(".hashnode/BLOG.MD");
      article += BLOG;
      try {
        const CHANGELOG = yield getMarkdownContent("CHANGELOG.md");
        article += CHANGELOG;
      } catch (error) {
        console.warn(
          "CHANGELOG.md was not found. It wont be included in your blog"
        );
      }
      const publicationId = yield getPublicationId();
      console.log(
        `Publishing on ${hashnodeHost} with publicationId ${publicationId}..`
      );
      console.log(article);
      console.log({ subtitle, coverImageURL });
    });
    postBlogToHashnode();
  }
});
export default require_src();
