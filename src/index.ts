import { getPublicationId } from "./publications";
import { hashnodeHost, userWorkspace, blogOnly, files } from "./config";
import axios from "axios";
import { getFilePath, getMarkdownContent } from "./files";
import { createPostMutation } from "./gql";

const postRequest = async (article: string) => {
  const publicationId = await getPublicationId();

  console.log(
    `Publishing on ${hashnodeHost} with publicationId ${publicationId}..`
  );

  if (article.length > 100) {
    const response = await axios.post(
      "https://gql.hashnode.com/",
      {
        query: createPostMutation(article, publicationId),
      },
      {
        headers: {
          Authorization: process.env.HASHNODE_TOKEN,
        },
      }
    );

    if (response.data.data.post.id) {
      console.log("Your article has been published.");
    }

    if (response.data.data.errors || response.data.data.errors.length > 0) {
      throw new Error(response.data.errors.at(0).message);
    }
    return response.data.data;
  } else {
    throw new Error("Your blog ended up becoming too short.");
  }
};

const postBlogToHashnode = async (): Promise<any> => {
  if (blogOnly === "true") {
    // this user only wants the BLOG.md file published

    try {
      const BLOG = await getMarkdownContent(
        `${userWorkspace}/.hashnode/BLOG.md`
      );

      await postRequest(BLOG);
    } catch (error) {
      console.warn(
        "BLOG.md was not found. It wont be included in your blog. It has to be in a folder called .hashnode/BLOG.md"
      );
    }

    return;
  }

  if (files! && files.length > 2) {
    // this user explicitly defined what files he wants published.
    let article = "";

    const filesArray = files.split(",");

    for (let i = 0; i < filesArray.length; i++) {
      const fileName = filesArray[i];
      // look for the filepath in the directory
      const filePath: string = await getFilePath(fileName);

      try {
        const markDown = await getMarkdownContent(filePath);
        article += markDown;
      } catch (error) {
        console.warn(
          `${fileName} was not found or couldn't be read. It wont be included in your blog.`
        );
      }
    }

    await postRequest(article);
    return;
  } else {
    // this user wants the blog auto constructed.
    let article = "";

    try {
      const BLOG = await getMarkdownContent(
        `${userWorkspace}/.hashnode/BLOG.md`
      );

      article += BLOG;
    } catch (error) {
      console.warn(
        "BLOG.md was not found. It wont be included in your blog. It has to be in a folder called .hashnode/BLOG.md"
      );
    }

    try {
      const CHANGELOG = await getMarkdownContent(
        `${userWorkspace}/CHANGELOG.md`
      );
      article += "## CHANGELOG";
      article += CHANGELOG;
    } catch (error) {
      console.warn(
        "CHANGELOG.md was not found. It wont be included in your blog"
      );
    }

    try {
      const README = await getMarkdownContent(`${userWorkspace}/README.md`);

      article += "## README";
      article += README;
    } catch (error) {
      console.warn("README.md was not found. It wont be included in your blog");
    }

    try {
      const RELEASE_NOTES = await getMarkdownContent(
        `${userWorkspace}/RELEASE-NOTES.md`
      );

      article += "## RELEASE NOTES";
      article += RELEASE_NOTES;
    } catch (error) {
      console.warn(
        "RELEASE-NOTES.md was not found. It wont be included in your blog"
      );
    }

    await postRequest(article);
    return;
  }
};

postBlogToHashnode();
