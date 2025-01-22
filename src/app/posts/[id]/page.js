import { getAllPostIds, getPostData } from "../../lib/posts";
import ReactMarkdown from "react-markdown";
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
          <span className="section">{postData.section.toUpperCase()}</span>
        ) : null}
      </div>
      <h1>{postData.title}</h1>
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
        <ReactMarkdown>{postData.content}</ReactMarkdown>
      </div>
      <div className="horizontal-line-container">
        <div className="horizontal-line black-part"></div>
        <div className="horizontal-line salmon-part"></div>
      </div>
    </div>
  );
}
