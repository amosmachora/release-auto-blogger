import { hashnodeHost } from ".";

const optimisticPublicationQuery = `query {
  publication(host: "${hashnodeHost}") {
    id
    title
  }
}`;

export const getPublicationId = async () => {
  // Make a POST request using fetch
  const response = await fetch("https://gql.hashnode.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: optimisticPublicationQuery,
  });

  if (response.ok) {
    const responseData = await response.json();

    // Check if the user has a publication
    if (responseData.data.publication && responseData.data.publication.id) {
      return responseData.data.publication.id;
    }
  }

  // Doesn't have a publication, throw an error
  throw new Error(
    "You don't have a publication under that host. Create a Hashnode host then rerun workflow"
  );
};
