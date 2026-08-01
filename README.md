# Zeekarh Cosmetics

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run the dev server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for production
```bash
npm run build
```
The output will be in the `dist/` folder — ready to deploy to Netlify, Vercel, or GitHub Pages.

---

## Adding your photos

To replace the placeholder gradients with real images, find the `scatter-photo-bg` divs in `src/App.jsx` and swap like this:

```jsx
// Before (gradient placeholder):
<div className="scatter-photo-bg" style={{ background: "linear-gradient(...)" }} />

// After (your real photo):
<img
  src="/images/your-photo.jpg"
  alt="Description"
  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
/>
```

Place your images in the `public/images/` folder and reference them as `/images/filename.jpg`.

---

## File Structure

```
zeekarh/
├── public/              ← static assets (add your images here)
├── src/
│   ├── content/blog/    ← markdown blog posts
│   ├── data/blogPosts.js← markdown loader + frontmatter parser
│   ├── App.jsx          ← all pages and components
│   └── main.jsx         ← React entry point
├── index.html
├── package.json
└── vite.config.js
```

## Adding Blog Posts (Markdown)

Create a new file in `src/content/blog/` using a URL-safe filename. The filename becomes the post slug.

Example:

- `src/content/blog/my-new-post.md` -> `/blog/my-new-post`

Use this template:

```md
---
title: Your blog title
category: Education
date: July 2026
publishedAt: 2026-07-26
readMinutes: 5
excerpt: One short summary sentence for previews and SEO.
---
First paragraph of the post.

Second paragraph of the post.

Third paragraph of the post.
```

Notes:

- Keep a blank line between paragraphs.
- `publishedAt` should use `YYYY-MM-DD` for proper sorting and structured data.
- `excerpt` is used in blog cards and metadata.
- After adding a post, run `npm run build` to verify everything compiles.

## SEO Submission Checklist

Before submitting to search engines, replace all `https://www.yourdomain.com` values in these files with your real live domain:

- `index.html`
- `public/robots.txt`
- `public/sitemap.xml`

Then deploy your site and submit it:

1. Google Search Console
  - Open https://search.google.com/search-console
  - Add your domain property
  - Verify ownership (DNS is recommended)
  - Go to **Sitemaps** and submit: `https://yourdomain.com/sitemap.xml`

2. Bing Webmaster Tools
  - Open https://www.bing.com/webmasters
  - Add your site
  - Verify ownership
  - Submit the same sitemap URL

3. Request indexing
  - In Google Search Console, use URL Inspection for your homepage and key pages, then click **Request Indexing**.

Quick check after deploy:

- `https://yourdomain.com/robots.txt` should load
- `https://yourdomain.com/sitemap.xml` should load
