import { uid } from "uid";
import { projectName, subtitle, coverImageURL, hashnodeHost } from "./config";

export const createPostMutation = (markDown: string, publicationId: string) => {
  const escapedMarkdown = encodeURIComponent(markDown.replace(/"/g, '\\"'));

  return `mutation {
      publishPost(input: {
        title: "${projectName}"
        subtitle: "${subtitle}"
        publicationId: "${publicationId}"
        contentMarkdown: "${escapedMarkdown}"
        publishedAt: "${new Date().toISOString()}"
        coverImageOptions: {
          coverImageURL: "${coverImageURL}"
        }
        tags: [
          { id: "${uid(5)}", name: "${projectName}" },
          { id: "${uid(5)}", name: "${projectName} Project Releases" },
          { id: "${uid(5)}", name: "#APIHackathon" }
        ]
        metaTags: {
          title: "${projectName}"
          description: "${subtitle}"
          image: "${coverImageURL}"
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

export const optimisticPublicationQuery = `query {
    publication(host: "${hashnodeHost}") {
      id
      title
    }
  }`;
