import { Helmet } from "react-helmet-async";

interface SeoHeadProps {
  title: string;           // senza "— ThermoDMR", viene aggiunto automaticamente
  description: string;
  canonical: string;       // path assoluto es. "/chi-siamo" o "/ro/despre-noi"
  lang?: "it" | "ro";
  ogType?: "website" | "article";
  ogImage?: string;
  noindex?: boolean;
  jsonLd?: object;
  // Percorsi alternativi per hreflang (se diversi da canonical)
  hreflangIt?: string;
  hreflangRo?: string;
}

const BASE_URL = "https://thermodmr.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/images/thermodmr-og.jpg`;
const SITE_NAME = "ThermoDMR";

const SeoHead = ({
  title,
  description,
  canonical,
  lang = "it",
  ogType = "website",
  ogImage = DEFAULT_OG_IMAGE,
  noindex = false,
  jsonLd,
  hreflangIt,
  hreflangRo,
}: SeoHeadProps) => {
  const fullTitle = `${title} — ${SITE_NAME}`;
  const canonicalUrl = `${BASE_URL}${canonical}`;

  // hreflang: se non passati esplicitamente, inferisce it↔ro
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

  return (
    <Helmet>
      <html lang={lang} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Hreflang */}
      <link rel="alternate" hreflang="it" href={itUrl} />
      <link rel="alternate" hreflang="ro" href={roUrl} />
      <link rel="alternate" hreflang="x-default" href={itUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={lang === "it" ? "it_IT" : "ro_RO"} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD structured data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SeoHead;
