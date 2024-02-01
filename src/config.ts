const core = require("@actions/core");

export const projectName = core.getInput("project-name");
export const hashnodeHost = core.getInput("hashnode-host");
export const subtitle = core.getInput("subtitle");
export const coverImageURL = core.getInput("cover-image");

// export const projectName = "New Name";
// export const hashnodeHost = "amosmachora.hashnode.dev";
// export const subtitle = "sub";
// export const coverImageURL = "some uri";

console.log(process.env.PROJECT_NAME, "project-name");
