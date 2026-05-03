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
│   ├── App.jsx          ← all pages and components
│   └── main.jsx         ← React entry point
├── index.html
├── package.json
└── vite.config.js
```
