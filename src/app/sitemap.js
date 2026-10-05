import { getSortedPostsData } from "./lib/posts";
import { getAllSections } from "./lib/sections";
import { SITE_URL } from "./lib/site";

export default function sitemap() {
  return [
    { url: SITE_URL },
    ...getAllSections().map((section) => ({
      url: `${SITE_URL}/seccao/${section.url}`,
    })),
    ...getSortedPostsData().map((post) => ({
      url: `${SITE_URL}/posts/${post.id}`,
      lastModified: post.date,
    })),
  ];
}
