import axios from "axios";

export const createPublication = async (title: string, description: string) => {
  const createPublicationMutation = `mutation {
          createPublication(input: {
            title: ${title}
            description: ${description}
            tags: ["tag1", "tag2"] 
          }) {
            publication {
              _id
            }
          }
        }
        `;

  const response = await axios.post(
    "https://gql.hashnode.com/",
    {
      query: createPublicationMutation,
    },
    {
      headers: {
        Authorization: process.env.HASHNODE_PERSONAL_ACCESS_TOKEN,
      },
    }
  );

  if (response.data.errors || response.data.errors.length > 0) {
    throw new Error(response.data.errors.at(0).message);
  }

  return response.data.data;
};
