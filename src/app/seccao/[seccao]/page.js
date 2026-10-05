import { notFound } from "next/navigation";
import { getAllSections } from "../../lib/sections";
import { getSortedPostsData, isArticle } from "../../lib/posts";
import { formatDatePT } from "../../lib/formatDate";

export function generateStaticParams() {
  return getAllSections().map((section) => ({ seccao: section.url }));
}

export async function generateMetadata({ params }) {
  const { seccao } = await params;
  const section = getAllSections().find((section) => section.url === seccao);
  return section ? { title: `${section.title} - Que Força é Essa` } : {};
}

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
      ? allPostsData.filter(isArticle) // Already sorted newest first
      : allPostsData.filter((post) => post.section === pageTitle);

  return (
    <div className="post-container">
      <h1 className="section-title">{pageTitle}</h1>
      <ul>
        {filteredPostsData.map((post) => (
          <li key={post.id}>
            {post.date && (
              <div className="post-date">{formatDatePT(post.date)}</div>
            )}
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
