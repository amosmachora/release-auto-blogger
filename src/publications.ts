import axios from "axios";
import { hashnodeHost } from "./config";

const optimisticPublicationQuery = `query {
  publication(host: "${hashnodeHost}") {
    id
    title
  }
}`;

export const getPublicationId = async () => {
  const response = await axios.post("https://gql.hashnode.com/", {
    query: optimisticPublicationQuery,
  });

  // Check if the user has a publication
  if (response.data.data.publication && response.data.data.publication.id) {
    return response.data.data.publication.id;
  }

  throw new Error(
    "You don't have a publication under that host. Create a Hashnode host then rerun workflow"
  );
};
