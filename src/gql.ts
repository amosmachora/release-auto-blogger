import { ObjectId } from "bson";
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
          { id: "${new ObjectId().toString()}", name: "${projectName}" },
          { id: "${new ObjectId().toString()}", name: "${projectName} Project Releases" },
          { id: "${new ObjectId().toString()}", name: "#APIHackathon" }
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
