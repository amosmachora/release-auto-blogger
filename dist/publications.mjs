var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/publications.ts
import axios from "axios";
var createPublication = (title, description) => __async(void 0, null, function* () {
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
  const response = yield axios.post(
    "https://gql.hashnode.com/",
    {
      query: createPublicationMutation
    },
    {
      headers: {
        Authorization: process.env.HASHNODE_PERSONAL_ACCESS_TOKEN
      }
    }
  );
  if (response.data.errors || response.data.errors.length > 0) {
    throw new Error(response.data.errors.at(0).message);
  }
  return response.data.data;
});
export {
  createPublication
};
