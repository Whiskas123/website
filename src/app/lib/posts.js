import fs from "fs";
import path from "path";
import matter from "gray-matter";
export { formatDatePT } from "./formatDate";

const postsDirectory = path.join(process.cwd(), "src/app/posts");

export function getSortedPostsData(includeContent = false) {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => !fileName.startsWith("[id]")) // Ignore files in [id] folder
    .map((fileName) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, "");

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      try {
        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        // Combine the data with the id
        return {
          id,
          ...matterResult.data,
          content: includeContent ? matterResult.content : null,
        };
      } catch (error) {
        throw new Error(`Error parsing file ${fileName}: ${error.message}`);
      }
    });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames
    .filter((fileName) => !fileName.startsWith("[id]")) // Ignore files in [id] folder
    .map((fileName) => {
      return {
        params: {
          id: fileName.replace(/\.md$/, ""),
        },
      };
    });
}

export function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  return {
    id,
    ...matterResult.data,
    content: matterResult.content,
  };
}

/**
 * Resolves an array of slide configs by enriching them with post metadata.
 * Only `id` is required in each config. Any other fields provided will
 * override the post metadata. If no imageUrl is provided, defaults to
 * `/images/{id}.jpg`.
 *
 * NOTE: This function uses `fs` and can only be called from server components
 * or server-side code (getStaticProps, API routes, etc.)
 */
export function resolveSlides(slideConfigs) {
  return slideConfigs.map((config) => {
    const { id, ...overrides } = config;
    const fullPath = path.join(postsDirectory, `${id}.md`);

    let postData = {};
    try {
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const matterResult = matter(fileContents);
      postData = matterResult.data;
    } catch (e) {
      // If post file doesn't exist, just use the overrides
    }

    return {
      id,
      title: postData.title || "",
      subtitle: postData.subtitle || "",
      author: postData.author || "",
      section: postData.section || "",
      imageUrl: `/images/${id}.jpg`,
      ...overrides,
    };
  });
}
