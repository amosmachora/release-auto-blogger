import axios from "axios";
import { hashnodeHost } from ".";

const optimisticPublicationQuery = `query {
  publication(host: "${hashnodeHost}") {
    id
    title
  }
}`;

export const getPublicationId = async () => {
  //checking to see if the user has a publication
  const response = await axios.post("https://gql.hashnode.com/", {
    query: optimisticPublicationQuery,
  });

  if (response.data.data.publication.id) {
    return response.data.data.publication.id;
  }

  //doesn't have a publication now let`s throw an error and ask the user to create one and retry.

  throw new Error(
    "You don`t have a publication under that host. Create a hashnode host then rerun workflow"
  );
};
