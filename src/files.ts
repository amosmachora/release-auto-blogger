import fs from "fs/promises";
import path from "path";

export const getMarkdownContent = async (filePath: string): Promise<string> => {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return content;
  } catch (error) {
    const err = error as Error;
    console.error("Error reading file:", err.message);

    throw err;
  }
};

export const getFilePath = async (
  fileName: string,
  dir: string = process.env.GITHUB_WORKSPACE!
): Promise<string> => {
  try {
    const files = await fs.readdir(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stats = await fs.stat(filePath);

      if (stats.isDirectory()) {
        // Recursively search in subdirectories
        const subDirectoryResult = await getFilePath(fileName, filePath);
        if (subDirectoryResult) {
          return subDirectoryResult;
        }
      } else if (file === fileName) {
        // Found the file
        return filePath;
      }
    }

    throw new Error(`${fileName} couldn't be found. maybe you misspelt it?`);
  } catch (error) {
    // Handle errors
    const err = error as Error;
    console.warn(`Error while searching for ${fileName}: ${err.message}`);
    throw err;
  }
};
