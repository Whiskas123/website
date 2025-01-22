import { getAllPostIds, getPostData } from "../../lib/posts";
import ReactMarkdown from "react-markdown";
// This function generates static params for each post
export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths.map((path) => ({ id: path.params.id }));
}

export default async function Post({ params }) {
  const postData = getPostData(params.id);

  return (
    <div className="post-container">
      <div className="sections">
        {Array.isArray(postData.section) ? (
          postData.section.map((name, index) => (
            <span className="section" key={index}>
              {name.toUpperCase()}
              {index < postData.section.length - 1 && " | "}
            </span>
          ))
        ) : (
          <span className="section">{postData.section.toUpperCase()}</span>
        )}
      </div>
      <h1>{postData.title}</h1>
      {postData.subtitle ? <h2>{postData.subtitle}</h2> : null}

      <div className="authors">
        {Array.isArray(postData.author)
          ? postData.author.map((name, index) => (
              <span key={index}>
                {name}
                {index < postData.author.length - 1 && " | "}
              </span>
            ))
          : postData.author}
      </div>
      <div className="post-content">
        <ReactMarkdown>{postData.content}</ReactMarkdown>
      </div>
    </div>
  );
}
