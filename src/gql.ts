import {
  projectName,
  subtitle,
  coverImageURL,
  hashnodeHost,
  tags,
} from "./config";
import axios from "axios";
// import { gql } from "graphql-tag";

export const createPostMutation = async (
  markDown: string,
  publicationId: string
): Promise<string> => {
  const tagsArray = tags!.split(",");
  const validTags: { tag: string; id: string }[] = [];

  for (let i = 0; i < tagsArray.length; i++) {
    const tag = tagsArray[i];

    const tagData = await getTagData(tag);
    if (tagData) {
      validTags.push(tagData);
    }

    if (tagData === null) {
      console.error(`Couldn't find tag data for ${tag}`);
    }
  }

  if (validTags.length === 0) {
    throw new Error(
      "couldn't find any tag info for the passed-in tags. Make sure it's valid. Try tweaking the casing"
    );
  }

  const tagsSection = validTags
    .map((tagData) => `{ id: "${tagData.id}", name: "${tagData.tag}" }`)
    .join(", ");

  const mutation = `
    mutation {
      publishPost(input: {
        title: "${projectName}"
        subtitle: "${subtitle}"
        publicationId: "${publicationId}"
        contentMarkdown: ${JSON.stringify(markDown.replace(/"/g, "'"))}
        publishedAt: "${new Date().toISOString()}"
        ${
          coverImageURL &&
          `coverImageOptions: {
          coverImageURL: "${coverImageURL}"
        }`
        }      
        tags: [${tagsSection}]
        metaTags: {
          title: "${projectName}"
          description: "${subtitle}"
          ${coverImageURL && `image: "${coverImageURL}"`}
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

  return mutation;
};

export const optimisticPublicationQuery = `query {
    publication(host: "${hashnodeHost}") {
      id
      title
    }
  }`;

export const getTagData = async (tag: string) => {
  const myQuery = `query {
    tag(slug: "${tag}") {
      id
    }
  }
`;

  const response = await axios.post(
    "https://gql.hashnode.com/",
    {
      query: myQuery,
    },
    {
      headers: {
        Authorization: process.env.HASHNODE_TOKEN,
      },
    }
  );

  if (
    response.data.data &&
    response.data.data.tag &&
    response.data.data.tag.id
  ) {
    return {
      tag: tag,
      id: response.data.data.tag.id,
    };
  }

  if (response.data.data && response.data.data.tag === null) {
    return null;
  }

  if (response.data.errors && response.data.errors.length > 0) {
    throw new Error(response.data.errors[0].message);
  }
};
