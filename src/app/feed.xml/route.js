import { getSortedPostsData, isArticle } from "../lib/posts";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "../lib/site";

export const dynamic = "force-static";

const escapeXml = (text) =>
  String(text ?? "").replace(/[<>&'"]/g, (char) => `&#${char.charCodeAt(0)};`);

export function GET() {
  const items = getSortedPostsData()
    .filter(isArticle)
    .slice(0, 30)
    .map((post) => {
      const url = `${SITE_URL}/posts/${post.id}`;
      return `<item>
<title>${escapeXml(post.title)}</title>
<link>${url}</link>
<guid>${url}</guid>
<pubDate>${new Date(post.date).toUTCString()}</pubDate>
<description>${escapeXml(post.subtitle)}</description>
</item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
<title>${escapeXml(SITE_NAME)}</title>
<link>${SITE_URL}</link>
<description>${escapeXml(SITE_DESCRIPTION)}</description>
<language>pt-PT</language>
${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
