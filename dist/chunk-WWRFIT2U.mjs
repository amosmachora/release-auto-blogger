import {
  hashnodeHost
} from "./chunk-SERWC4PJ.mjs";

// src/publications.ts
import axios from "axios";
var optimisticPublicationQuery = `query {
  publication(host: "${hashnodeHost}") {
    id
    title
  }
}`;
var getPublicationId = async () => {
  const response = await axios.post("https://gql.hashnode.com/", {
    query: optimisticPublicationQuery
  });
  console.log(response.data);
  if (response.data.data.publication && response.data.data.publication.id) {
    return response.data.data.publication.id;
  }
  throw new Error(
    "You don't have a publication under that host. Create a Hashnode host then rerun workflow"
  );
};

export {
  getPublicationId
};
