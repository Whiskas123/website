import { getSortedPostsData } from "../lib/posts";
import { formatDatePT } from "../lib/formatDate";

// Lowercase and strip accents, so "imigracao" matches "imigração"
const normalize = (text) =>
  String(text ?? "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

async function getQuery(searchParams) {
  const { q } = await searchParams;
  return String([].concat(q ?? "")[0]).trim();
}

export async function generateMetadata({ searchParams }) {
  const query = await getQuery(searchParams);
  return {
    title: query
      ? `Pesquisa: ${query} - Que Força é Essa`
      : "Pesquisa - Que Força é Essa",
    robots: { index: false },
  };
}

export default async function SearchResults({ searchParams }) {
  const query = await getQuery(searchParams);
  const needle = normalize(query);

  // Title/author matches first, then content-only matches
  const searchResults = (needle ? getSortedPostsData(true) : [])
    .map((post) => ({
      post,
      mainMatch: [post.title, ...[].concat(post.author ?? [])].some((text) =>
        normalize(text).includes(needle)
      ),
    }))
    .filter(
      ({ post, mainMatch }) =>
        mainMatch || normalize(post.content).includes(needle)
    )
    .sort((a, b) => b.mainMatch - a.mainMatch)
    .map(({ post }) => post);

  return (
    <div className="post-container">
      <h1 className="section-title">
        <span style={{ color: "#231f20" }}>Resultados da pesquisa: </span>
        {query}
      </h1>
      {searchResults.length === 0 ? (
        <p>Nenhum resultado encontrado.</p>
      ) : (
        <ul>
          {searchResults.map((post) => (
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
        </ul>
      )}
      <div className="horizontal-line-container">
        <div className="horizontal-line black-part"></div>
        <div className="horizontal-line salmon-part"></div>
      </div>
    </div>
  );
}
