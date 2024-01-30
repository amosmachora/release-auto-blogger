// import axios, { AxiosError } from "axios";
// import dotenv from "dotenv";
// import fs from "fs/promises";
// import { uid } from "uid";

// dotenv.config();

// const getMarkdownContent = async (filePath: string): Promise<string | null> => {
//   try {
//     const content = await fs.readFile(filePath, "utf-8");
//     return content;
//   } catch (error) {
//     const err = error as Error;
//     console.error("Error reading file:", err.message);

//     return null;
//     // throw error;
//   }
// };

// const createPostMutation = (markDown: string) => {
//   return `mutation {
//     publishPost(input: {
//       title: "react-daraja 0.2.1"
//       subtitle: "better folder structure and created a next js docs app"
//       contentMarkdown: ${JSON.stringify(markDown)}
//       publishedAt: ${new Date().toISOString()}
//       coverImageOptions: {
//         coverImageURL: "https://github.com/amosmachora/react-daraja/raw/main/public/full-logo.png",
//         coverImageAttribution: "RD Logo"
//       }
//       tags: [
//         { id: ${uid(8)}, name: "React Daraja" },
//         { id: ${uid(8)}, name: "Safaricom API" }
//       ]
//       metaTags: {
//         title: "react-daraja 0.2.1"
//         description: "better folder structure and created a next js docs app"
//         image: "https://github.com/amosmachora/react-daraja/raw/main/public/full-logo.png"
//       }
//     }) {
//       post {
//         id
//         title
//         subtitle
//         publishedAt
//       }
//     }
//   }
//   `;
// };

// const postBlogToHashnode = async (): Promise<any> => {
//   const BLOG = await getMarkdownContent("./hashnode/BLOG.MD");
//   const CHANGELOG = await getMarkdownContent("CHANGELOG.md");

//   if (BLOG) {
//     const response = await axios.post(
//       "https://gql.hashnode.com/",
//       {
//         query: createPostMutation(BLOG + CHANGELOG),
//       },
//       {
//         headers: {
//           Authorization: process.env.HASHNODE_PERSONAL_ACCESS_TOKEN,
//         },
//       }
//     );

//     if (response.data.errors || response.data.errors.length > 0) {
//       throw new Error(response.data.errors.at(0).message);
//     }
//     return response.data.data;
//   }

//   console.log(BLOG);
// };

// postBlogToHashnode();

console.log("nigga what");
