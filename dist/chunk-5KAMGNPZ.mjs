import {
  __async,
  __esm,
  hashnodeHost,
  init_config
} from "./chunk-ZVTG5VLS.mjs";

// src/publications.ts
import axios from "axios";
var optimisticPublicationQuery, getPublicationId;
var init_publications = __esm({
  "src/publications.ts"() {
    init_config();
    console.log(hashnodeHost);
    optimisticPublicationQuery = `query {
  publication(host: "amosmachora.hashnode.dev") {
    id
    title
  }
}`;
    getPublicationId = () => __async(void 0, null, function* () {
      const response = yield axios.post("https://gql.hashnode.com/", {
        query: optimisticPublicationQuery
      });
      console.log(response.data);
      if (response.data.data.publication && response.data.data.publication.id) {
        return response.data.data.publication.id;
      }
      throw new Error(
        "You don't have a publication under that host. Create a Hashnode host then rerun workflow"
      );
    });
  }
});

export {
  getPublicationId,
  init_publications
};
