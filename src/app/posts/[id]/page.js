import { getAllPostIds, getPostData } from "../../lib/posts";
import { getUrlByTitle } from "@/app/lib/sections";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
// This function generates static params for each post
export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths.map((path) => ({ url: path.params.id }));
}

export default async function Post({ params }) {
  const resolvedParams = await params;
  const postData = getPostData(resolvedParams.id);

  return (
    <div className="post-container">
      <div className="sections">
        {postData.section && Array.isArray(postData.section) ? (
          postData.section.map((name, index) => (
            <span className="section" key={index}>
              {name.toUpperCase()}
              {index < postData.section.length - 1 && " | "}
            </span>
          ))
        ) : postData.section ? (
          <Link href={`/seccao/${getUrlByTitle(postData.section)}`}>
            <span className="section">{postData.section.toUpperCase()}</span>
          </Link>
        ) : null}
      </div>
      <h1 className="post-title">{postData.title}</h1>
      {postData.subtitle ? <h2>{postData.subtitle}</h2> : null}

      <div className="authors">
        {postData.author && Array.isArray(postData.author)
          ? postData.author.map((name, index) => (
              <span key={index}>
                {name}
                {index < postData.author.length - 1 && " | "}
              </span>
            ))
          : postData.author
          ? postData.author
          : null}
      </div>
      <div className="post-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ node, children }) => {
              if (node.children[0].tagName === "img") {
                const image = node.children[0];
                return (
                  <div className="image">
                    <img
                      src={image.properties.src}
                      alt={image.properties.alt}
                      style={{ width: "100%", height: "auto" }} // Make width match parent
                    />
                  </div>
                );
              }
              // Return default child if it's not an image
              return <p>{children}</p>;
            },
          }}
        >
          {postData.content}
        </ReactMarkdown>
      </div>
      <div className="horizontal-line-container">
        <div className="horizontal-line black-part"></div>
        <div className="horizontal-line salmon-part"></div>
      </div>
    </div>
  );
}
