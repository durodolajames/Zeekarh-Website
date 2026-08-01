const markdownFiles = import.meta.glob("../content/blog/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { metadata: {}, content: raw };

  const metadataText = match[1] || "";
  const contentText = match[2] || "";
  const metadata = {};

  metadataText.split(/\r?\n/).forEach((line) => {
    const index = line.indexOf(":");
    if (index < 0) return;
    const key = line.slice(0, index).trim();
    const value = line.slice(index + 1).trim();
    if (key) metadata[key] = value;
  });

  return { metadata, content: contentText.trim() };
}

function toPost(filePath, raw) {
  const slug = filePath.split("/").pop().replace(/\.md$/i, "");
  const { metadata, content } = parseFrontmatter(raw);
  const body = content.split(/\n\s*\n/g).map((part) => part.trim()).filter(Boolean);
  const readMinutes = Number.parseInt(metadata.readMinutes || "", 10);

  return {
    slug,
    title: metadata.title || slug.replace(/-/g, " "),
    category: metadata.category || "General",
    readMinutes: Number.isFinite(readMinutes) ? readMinutes : Math.max(1, Math.round(body.join(" ").split(/\s+/).length / 180)),
    date: metadata.date || "",
    publishedAt: metadata.publishedAt || "",
    excerpt: metadata.excerpt || body[0] || "",
    body,
  };
}

const BLOG_POSTS = Object.entries(markdownFiles)
  .map(([path, raw]) => toPost(path, raw))
  .sort((a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime());

export default BLOG_POSTS;
