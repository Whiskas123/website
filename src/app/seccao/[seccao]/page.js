import { notFound } from "next/navigation";
import { getAllSections } from "../../lib/sections";
import { getSortedPostsData } from "../../lib/posts";

export default async function Seccao({ params }) {
  const resolvedParams = await params;
  const sections = getAllSections();

  // Check if params.seccao is not in any sections.url
  const sectionExists = sections.some(
    (section) => section.url === resolvedParams.seccao
  );
  if (!sectionExists) {
    notFound();
  }

  // Find the section with the matching URL
  const currentSection = sections.find(
    (section) => section.url === resolvedParams.seccao
  );
  const pageTitle = currentSection ? currentSection.title : "";
  const sectionFiles = currentSection?.files || [];
  const allPostsData = getSortedPostsData();
  const filteredPostsData =
    resolvedParams.seccao === "todos-os-textos"
      ? allPostsData.sort((a, b) => a.id - b.id) // Sort by id in ascending order
      : allPostsData.filter((post) => post.section === pageTitle);

  return (
    <div className="post-container">
      <h1 className="section-title">{pageTitle}</h1>
      <ul>
        {filteredPostsData.map((post) => (
          <li key={post.id}>
            <a className="section-post-title" href={`/posts/${post.id}`}>
              {post.title}
            </a>
            <div className="author">
              {post.author
                ? Array.isArray(post.author)
                  ? post.author.join(" | ")
                  : post.author
                : ""}
            </div>
          </li>
        ))}
        {sectionFiles.map((file, index) => (
          <li key={`file-${index}`}>
            <a
              className="section-post-title"
              href={file.path}
              target="_blank"
              rel="noopener noreferrer"
            >
              {file.title}
            </a>
            <div className="author">PDF</div>
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
