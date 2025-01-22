import { notFound } from "next/navigation";
import { getAllSections } from "../../lib/sections";
import { getSortedPostsData } from "../../lib/posts";

export default async function Seccao({ params }) {
  const sections = getAllSections();

  // Check if params.seccao is not in any sections.url
  const sectionExists = sections.some(
    (section) => section.url === params.seccao
  );
  if (!sectionExists) {
    notFound();
  }

  // Find the section with the matching URL
  const currentSection = sections.find(
    (section) => section.url === params.seccao
  );
  const pageTitle = currentSection ? currentSection.title : "";
  const allPostsData = getSortedPostsData();
  const filteredPostsData = allPostsData.filter(
    (post) => post.section === pageTitle
  );

  return (
    <div className="post-container">
      <h1>{pageTitle}</h1>
      <ul>
        {filteredPostsData.map((post) => (
          <li key={post.id}>
            <a className="section-post-title" href={`/posts/${post.id}`}>
              {post.title}
            </a>
            <div className="author">
              {Array.isArray(post.author)
                ? post.author.join(" | ")
                : post.author}
            </div>
          </li>
        ))}
      </ul>
      <div className="horizontal-line-container">
        <div className="horizontal-line black-part"></div>
        <div className="horizontal-line salmon-part"></div>
      </div>
    </div>
  );
}
