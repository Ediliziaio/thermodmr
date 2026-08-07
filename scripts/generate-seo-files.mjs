/**
 * Genera public/sitemap.xml, public/feed.xml (IT) e public/ro/feed.xml (RO)
 * a partire dalle pagine dichiarate in functions/_middleware.ts e dagli
 * articoli in src/data/blogPosts.ts. Eseguito automaticamente prima di
 * `vite build` — non modificare i file generati a mano.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BASE = "https://thermodmr.com";
const today = new Date().toISOString().slice(0, 10);

// ── Parse PAGES dal middleware ───────────────────────────────────────────────
const mw = fs.readFileSync(path.join(root, "functions/_middleware.ts"), "utf8");
const keyRe = /^  "(\/[^"]*)": \{/gm;
const keys = [...mw.matchAll(keyRe)];
const pages = keys.map((m, i) => {
  const start = m.index;
  const end = i + 1 < keys.length ? keys[i + 1].index : mw.indexOf("\n};", start);
  const block = mw.slice(start, end);
  const g = (re) => {
    const mm = block.match(re);
    return mm ? mm[1] : null;
  };
  return {
    path: m[1],
    lang: g(/lang: "(it|ro)"/) || "it",
    alternateIt: g(/alternateIt: `\$\{B\}([^`]*)`/) ?? m[1],
    alternateRo: g(/alternateRo: `\$\{B\}([^`]*)`/) ?? m[1],
  };
});

// ── Parse articoli blog ──────────────────────────────────────────────────────
const bp = fs.readFileSync(path.join(root, "src/data/blogPosts.ts"), "utf8");
const postRe =
  /slug: "([^"]+)",\s*lang: "(it|ro)",\s*title:\s*"([^"]+)",\s*description:\s*"([^"]+)",\s*date: "([^"]+)",\s*category: "([^"]+)",\s*readingTime: (\d+)/g;
const posts = [...bp.matchAll(postRe)].map((m) => ({
  slug: m[1],
  lang: m[2],
  title: m[3],
  description: m[4],
  date: m[5],
  category: m[6],
  url: m[2] === "ro" ? `${BASE}/ro/blog/${m[1]}` : `${BASE}/blog/${m[1]}`,
}));
const postByPath = new Map(posts.map((p) => [p.url.slice(BASE.length), p]));

if (pages.length < 20 || posts.length < 10) {
  throw new Error(
    `Parse sospetto: ${pages.length} pagine, ${posts.length} post. Controlla i formati sorgente.`
  );
}

// ── Regole priority/changefreq ───────────────────────────────────────────────
function rules(p) {
  if (p === "/" || p === "/ro") return { pri: "1.0", freq: "weekly" };
  if (p === "/prodotti-pubblico" || p === "/ro/produse") return { pri: "0.9", freq: "monthly" };
  if (p.includes("/prodotti/") || p.includes("/ro/produse/")) return { pri: "0.8", freq: "monthly" };
  if (p === "/blog" || p === "/ro/blog") return { pri: "0.8", freq: "weekly" };
  if (p.includes("/blog/")) return { pri: "0.7", freq: "monthly" };
  if (p.includes("privacy") || p.includes("confidentialitate")) return { pri: "0.3", freq: "yearly" };
  if (p.includes("contatti") || p.includes("contact") || p.includes("rivenditore") || p.includes("distribuitor"))
    return { pri: "0.8", freq: "monthly" };
  return { pri: "0.7", freq: "monthly" };
}

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// ── Sitemap ──────────────────────────────────────────────────────────────────
const urls = pages
  .map((p) => {
    const { pri, freq } = rules(p.path);
    const lastmod = postByPath.get(p.path)?.date ?? today;
    return `  <url>
    <loc>${BASE}${esc(p.path)}</loc>
    <xhtml:link rel="alternate" hreflang="it" href="${BASE}${esc(p.alternateIt)}"/>
    <xhtml:link rel="alternate" hreflang="ro" href="${BASE}${esc(p.alternateRo)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE}${esc(p.alternateIt)}"/>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${pri}</priority>
  </url>`;
  })
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
fs.writeFileSync(path.join(root, "public/sitemap.xml"), sitemap);

// ── Feed RSS ─────────────────────────────────────────────────────────────────
function buildFeed(lang) {
  const items = posts
    .filter((p) => p.lang === lang)
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(
      (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${p.url}</link>
      <guid isPermaLink="true">${p.url}</guid>
      <pubDate>${new Date(p.date + "T08:00:00Z").toUTCString()}</pubDate>
      <category>${esc(p.category)}</category>
      <description>${esc(p.description)}</description>
    </item>`
    )
    .join("\n");
  const title =
    lang === "ro"
      ? "Blog ThermoDMR — Ghiduri Ferestre PVC"
      : "Blog ThermoDMR — Guide Finestre PVC";
  const link = lang === "ro" ? `${BASE}/ro/blog` : `${BASE}/blog`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${title}</title>
    <link>${link}</link>
    <description>${
      lang === "ro"
        ? "Ghiduri și sfaturi despre ferestre PVC, izolare termică și economie de energie."
        : "Guide e consigli su finestre PVC, isolamento termico e risparmio energetico."
    }</description>
    <language>${lang === "ro" ? "ro-RO" : "it-IT"}</language>
    <atom:link href="${BASE}${lang === "ro" ? "/ro/feed.xml" : "/feed.xml"}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;
}
fs.writeFileSync(path.join(root, "public/feed.xml"), buildFeed("it"));
fs.mkdirSync(path.join(root, "public/ro"), { recursive: true });
fs.writeFileSync(path.join(root, "public/ro/feed.xml"), buildFeed("ro"));

console.log(
  `SEO files generati: sitemap (${pages.length} URL), feed IT/RO (${posts.length} articoli totali)`
);
