"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/posts");
        const posts = await response.json();
        setAllPosts(posts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const searchResults = allPosts
    .filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(query.toLowerCase());
      const authorMatch = Array.isArray(post.author)
        ? post.author.some((author) =>
            author.toLowerCase().includes(query.toLowerCase())
          )
        : post.author.toLowerCase().includes(query.toLowerCase());
      const contentMatch = post.content
        ?.toLowerCase()
        .includes(query.toLowerCase());

      return titleMatch || authorMatch || contentMatch;
    })
    .sort((a, b) => {
      // Helper function to check if post matches in title or author
      const hasMainMatch = (post) => {
        const titleMatch = post.title
          .toLowerCase()
          .includes(query.toLowerCase());
        const authorMatch = Array.isArray(post.author)
          ? post.author.some((author) =>
              author.toLowerCase().includes(query.toLowerCase())
            )
          : post.author.toLowerCase().includes(query.toLowerCase());
        return titleMatch || authorMatch;
      };

      const aHasMainMatch = hasMainMatch(a);
      const bHasMainMatch = hasMainMatch(b);

      if (aHasMainMatch && !bHasMainMatch) return -1;
      if (!aHasMainMatch && bHasMainMatch) return 1;
      return 0;
    });

  if (loading) {
    return <div className="post-container">Carregando...</div>;
  }

  return (
    <Suspense fallback={<div className="post-container">Carregando...</div>}>
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
        )}
        <div className="horizontal-line-container">
          <div className="horizontal-line black-part"></div>
          <div className="horizontal-line salmon-part"></div>
        </div>
      </div>
    </Suspense>
  );
}
