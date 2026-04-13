import { useEffect } from "react";

interface SeoHeadProps {
  title: string;           // senza "— ThermoDMR", viene aggiunto automaticamente
  description: string;
  canonical: string;       // path assoluto es. "/chi-siamo" o "/ro/despre-noi"
  lang?: "it" | "ro";
  ogType?: "website" | "article";
  ogImage?: string;
  noindex?: boolean;
  jsonLd?: object | object[];
  keywords?: string;
  // Percorsi alternativi per hreflang (se diversi da canonical)
  hreflangIt?: string;
  hreflangRo?: string;
}

const BASE_URL = "https://thermodmr.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/images/thermodmr-og.jpg`;
const SITE_NAME = "ThermoDMR";

const setMeta = (selector: string, attrName: string, attrValue: string, content: string) => {
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setLink = (rel: string, extraAttr?: string, extraVal?: string): HTMLLinkElement => {
  const selector = extraAttr
    ? `link[rel="${rel}"][${extraAttr}="${extraVal}"]`
    : `link[rel="${rel}"]`;
  let el = document.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    if (extraAttr && extraVal) el.setAttribute(extraAttr, extraVal);
    document.head.appendChild(el);
  }
  return el;
};

const SeoHead = ({
  title,
  description,
  canonical,
  lang = "it",
  ogType = "website",
  ogImage = DEFAULT_OG_IMAGE,
  noindex = false,
  jsonLd,
  keywords,
  hreflangIt,
  hreflangRo,
}: SeoHeadProps) => {
  const fullTitle = `${title} — ${SITE_NAME}`;
  const canonicalUrl = `${BASE_URL}${canonical}`;

  const itUrl = hreflangIt
    ? `${BASE_URL}${hreflangIt}`
    : lang === "it"
    ? canonicalUrl
    : `${BASE_URL}${canonical.replace(/^\/ro\//, "/").replace(/^\/ro$/, "/")}`;

  const roUrl = hreflangRo
    ? `${BASE_URL}${hreflangRo}`
    : lang === "ro"
    ? canonicalUrl
    : `${BASE_URL}/ro${canonical === "/" ? "" : canonical}`;

  useEffect(() => {
    // Title + lang
    document.title = fullTitle;
    document.documentElement.lang = lang;

    // Description + robots + keywords
    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[name="robots"]', "name", "robots", noindex ? "noindex, nofollow" : "index, follow");
    if (keywords) {
      setMeta('meta[name="keywords"]', "name", "keywords", keywords);
    }

    // Canonical
    const canonicalEl = setLink("canonical");
    canonicalEl.href = canonicalUrl;

    // Hreflang
    const itEl = setLink("alternate", "hreflang", "it");
    itEl.href = itUrl;
    const roEl = setLink("alternate", "hreflang", "ro");
    roEl.href = roUrl;
    const xdefEl = setLink("alternate", "hreflang", "x-default");
    xdefEl.href = itUrl;

    // Open Graph
    setMeta('meta[property="og:title"]', "property", "og:title", fullTitle);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:type"]', "property", "og:type", ogType);
    setMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    setMeta('meta[property="og:image"]', "property", "og:image", ogImage);
    setMeta('meta[property="og:site_name"]', "property", "og:site_name", SITE_NAME);
    setMeta('meta[property="og:locale"]', "property", "og:locale", lang === "it" ? "it_IT" : "ro_RO");

    // Twitter Card
    setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", fullTitle);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", ogImage);

    // JSON-LD: remove previous page-specific script, add new one
    document.querySelector('script[data-seoh="true"]')?.remove();
    if (jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seoh", "true");
      script.textContent = JSON.stringify(
        Array.isArray(jsonLd)
          ? { "@context": "https://schema.org", "@graph": jsonLd }
          : jsonLd
      );
      document.head.appendChild(script);
    }
  }, [fullTitle, description, canonicalUrl, lang, ogType, ogImage, noindex, jsonLd, keywords, itUrl, roUrl]);

  return null;
};

export default SeoHead;
