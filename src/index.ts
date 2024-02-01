import fs from "fs/promises";
import { uid } from "uid";
import { getPublicationId } from "./publications";
import { subtitle, coverImageURL, projectName, hashnodeHost } from "./config";

const getMarkdownContent = async (filePath: string): Promise<string> => {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return content;
  } catch (error) {
    const err = error as Error;
    console.error("Error reading file:", err.message);

    throw err;
  }
};

const createPostMutation = (markDown: string, publicationId: string) => {
  return `mutation {
    publishPost(input: {
      title: ${projectName}
      subtitle: ${subtitle}
      publicationId: ${publicationId}
      contentMarkdown: ${JSON.stringify(markDown)}
      publishedAt: ${new Date().toISOString()}
      coverImageOptions: {
        coverImageURL: ${coverImageURL},
      }
      tags: [
        { id: ${uid(8)}, name: ${projectName} },
        { id: ${uid(8)}, name: ${projectName} Project Releases }
      ]
      metaTags: {
        title: ${projectName}
        description: ${subtitle}
        image: ${coverImageURL}
      }
    }) {
      post {
        id
        title
        subtitle
        publishedAt
      }
    }
  }
  `;
};

const postBlogToHashnode = async (): Promise<any> => {
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

  // if (BLOG) {
  //   const response = await axios.post(
  //     "https://gql.hashnode.com/",
  //     {
  //       query: createPostMutation(article, publicationId),
  //     },
  //     {
  //       headers: {
  //         Authorization: process.env.HASHNODE_PERSONAL_ACCESS_TOKEN,
  //       },
  //     }
  //   );

  //   if (response.data.errors || response.data.errors.length > 0) {
  //     throw new Error(response.data.errors.at(0).message);
  //   }
  //   return response.data.data;
  // }
};

postBlogToHashnode();
