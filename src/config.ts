export const projectName = process.env.PROJECT_NAME;
export const hashnodeHost = process.env.HASHNODE_HOST;
export const subtitle = process.env.SUBTITLE;
export const coverImageURL = process.env.COVER_IMAGE;
export const userWorkspace = process.env.GITHUB_WORKSPACE;
export const blogOnly = process.env.BLOG_ONLY;
export const files = process.env.FILES;

console.log({
  projectName,
  hashnodeHost,
  subtitle,
  coverImageURL,
  blogOnly,
  files,
});
