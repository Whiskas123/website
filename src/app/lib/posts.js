import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src/app/posts");

export function getSortedPostsData() {
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

export function getAllSections() {
  const sections = [
    { url: "mesa-controversia", title: "Mesa Controvérsia" },
    { url: "internacional", title: "Internacional" },
    { url: "abecedario-critico", title: "Abecedário Crítico" },
    { url: "retratos", title: "Retratos" },
    { url: "culturas-do-trabalho", title: "Culturas do Trabalho" },
    { url: "recensoes", title: "Recensões" },
    { url: "outros-textos", title: "Outros Textos" },
    { url: "a-ler-e-a-ver", title: "A Ler e a Ver" },
    { url: "consultorio", title: "Consultório" },
  ];

  return sections.map((section) => ({
    params: {
      url: section.url,
      title: section.title,
    },
  }));
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
