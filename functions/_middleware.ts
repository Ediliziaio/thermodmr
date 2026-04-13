/**
 * Cloudflare Pages Functions Middleware
 *
 * Injects page-specific SEO meta tags (title, description, canonical,
 * Open Graph, hreflang, JSON-LD) server-side before the SPA HTML is delivered.
 *
 * This solves the fundamental CSR-SPA problem: social crawlers and search
 * bots that don't render JavaScript see only index.html. This middleware
 * makes every URL return the correct meta in the initial HTML.
 */

const BASE_URL = "https://thermodmr.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/images/hero-bg.jpg`;

interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  lang: "it" | "ro";
  ogType?: string;
  ogImage?: string;
  alternateIt: string; // full URL
  alternateRo: string; // full URL
  jsonLd?: object | null;
  breadcrumb?: Array<{ name: string; url: string }>;
}

const B = BASE_URL;

const PAGES: Record<string, PageMeta> = {
  // ── ITALIANO ─────────────────────────────────────────────────────────────
  "/": {
    title: "ThermoDMR — Finestre e Serramenti PVC con Profilo Tedesco",
    description: "Finestre PVC con profilo tedesco: isolamento Classe A, garanzia 15 anni. Portoncini, tapparelle coibentate, cassonetti, persiane. Preventivo gratuito.",
    canonical: `${B}/`,
    lang: "it",
    alternateIt: `${B}/`,
    alternateRo: `${B}/ro`,
    jsonLd: null,
  },
  "/chi-siamo": {
    title: "Chi Siamo — ThermoDMR | Produttore Finestre PVC",
    description: "ThermoDMR (MARYSORYNA SRL): produciamo finestre PVC con profilo tedesco. Garanzia 15 anni, certificazioni CE, assistenza in Italia e Romania.",
    canonical: `${B}/chi-siamo`,
    lang: "it",
    alternateIt: `${B}/chi-siamo`,
    alternateRo: `${B}/ro/despre-noi`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "url": `${B}/chi-siamo`,
      "name": "Chi Siamo — ThermoDMR",
      "description": "Produttore di finestre e serramenti in PVC con profilo tedesco. MARYSORYNA SRL, fondata nel 2008.",
      "about": { "@id": `${B}/#organization` },
    },
  },
  "/prodotti-pubblico": {
    title: "Catalogo Finestre PVC — ThermoDMR | Tutti i Prodotti",
    description: "Scopri il catalogo ThermoDMR: finestre DMR Confort, Domus, Passive, portoncini, tapparelle coibentate, cassonetti e persiane. Richiedi preventivo.",
    canonical: `${B}/prodotti-pubblico`,
    lang: "it",
    alternateIt: `${B}/prodotti-pubblico`,
    alternateRo: `${B}/ro/produse`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "url": `${B}/prodotti-pubblico`,
      "name": "Catalogo Finestre e Serramenti PVC ThermoDMR",
      "description": "Finestre DMR Confort, Domus, Passive, portoncini, tapparelle coibentate, cassonetti e persiane in PVC.",
      "publisher": { "@id": `${B}/#organization` },
    },
  },
  "/prodotti/dmr-confort": {
    title: "DMR Confort — Finestra PVC 5 Camere Tecnolegno — ThermoDMR",
    description: "Finestra PVC DMR Confort: 5 camere, profilo Tecnolegno effetto legno, Uf=0.95. Isolamento Classe A, garanzia 15 anni. Preventivo gratuito.",
    canonical: `${B}/prodotti/dmr-confort`,
    lang: "it",
    alternateIt: `${B}/prodotti/dmr-confort`,
    alternateRo: `${B}/ro/produse/dmr-confort`,
    ogType: "product",
    ogImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    breadcrumb: [
      { name: "Home", url: `${B}/` },
      { name: "Prodotti", url: `${B}/prodotti-pubblico` },
      { name: "DMR Confort", url: `${B}/prodotti/dmr-confort` },
    ],
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Finestra PVC DMR Confort — 5 Camere Tecnolegno",
      "description": "Finestra PVC 5 camere con profilo Tecnolegno effetto legno, isolamento termico e acustico superiore. Garanzia 15 anni.",
      "brand": { "@type": "Brand", "name": "ThermoDMR" },
      "manufacturer": { "@type": "Organization", "@id": `${B}/#organization`, "name": "MARYSORYNA SRL", "url": B },
      "url": `${B}/prodotti/dmr-confort`,
      "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "category": "Finestre PVC",
      "offers": { "@type": "Offer", "priceCurrency": "EUR", "priceRange": "Su richiesta", "availability": "https://schema.org/InStock", "url": `${B}/contatti`, "seller": { "@type": "Organization", "name": "ThermoDMR" } },
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "bestRating": "5", "reviewCount": "47" },
    },
  },
  "/prodotti/dmr-domus": {
    title: "DMR Domus — Finestra PVC Efficienza Energetica — ThermoDMR",
    description: "Finestra PVC DMR Domus: design classico, doppio e triplo vetro, alta efficienza energetica. Classe A, garanzia 15 anni. Richiedi preventivo.",
    canonical: `${B}/prodotti/dmr-domus`,
    lang: "it",
    alternateIt: `${B}/prodotti/dmr-domus`,
    alternateRo: `${B}/ro/produse/dmr-domus`,
    ogType: "product",
    ogImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    breadcrumb: [
      { name: "Home", url: `${B}/` },
      { name: "Prodotti", url: `${B}/prodotti-pubblico` },
      { name: "DMR Domus", url: `${B}/prodotti/dmr-domus` },
    ],
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Finestra PVC DMR Domus",
      "description": "Finestra PVC design classico ad alta efficienza energetica, doppio e triplo vetro. Classe A, garanzia 15 anni.",
      "brand": { "@type": "Brand", "name": "ThermoDMR" },
      "manufacturer": { "@type": "Organization", "@id": `${B}/#organization`, "name": "MARYSORYNA SRL", "url": B },
      "url": `${B}/prodotti/dmr-domus`,
      "image": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "category": "Finestre PVC",
      "offers": { "@type": "Offer", "priceCurrency": "EUR", "priceRange": "Su richiesta", "availability": "https://schema.org/InStock", "url": `${B}/contatti`, "seller": { "@type": "Organization", "name": "ThermoDMR" } },
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "bestRating": "5", "reviewCount": "35" },
    },
  },
  "/prodotti/dmr-passive": {
    title: "DMR Passive — Finestra PVC Casa Passiva — ThermoDMR",
    description: "Finestra PVC DMR Passive per case passive A+: triplo vetro argon, Uw=0.8. Massimo isolamento termico. Garanzia 15 anni. Preventivo gratuito.",
    canonical: `${B}/prodotti/dmr-passive`,
    lang: "it",
    alternateIt: `${B}/prodotti/dmr-passive`,
    alternateRo: `${B}/ro/produse/dmr-passive`,
    ogType: "product",
    ogImage: "https://images.unsplash.com/photo-1600566753376-12c8ab7c5a38?w=1200&q=80",
    breadcrumb: [
      { name: "Home", url: `${B}/` },
      { name: "Prodotti", url: `${B}/prodotti-pubblico` },
      { name: "DMR Passive", url: `${B}/prodotti/dmr-passive` },
    ],
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Finestra PVC DMR Passive — Casa Passiva",
      "description": "Finestra PVC per case passive e classe energetica A+, triplo vetro con gas argon. Garanzia 15 anni.",
      "brand": { "@type": "Brand", "name": "ThermoDMR" },
      "manufacturer": { "@type": "Organization", "@id": `${B}/#organization`, "name": "MARYSORYNA SRL", "url": B },
      "url": `${B}/prodotti/dmr-passive`,
      "image": "https://images.unsplash.com/photo-1600566753376-12c8ab7c5a38?w=1200&q=80",
      "category": "Finestre PVC Casa Passiva",
      "offers": { "@type": "Offer", "priceCurrency": "EUR", "priceRange": "Su richiesta", "availability": "https://schema.org/InStock", "url": `${B}/contatti`, "seller": { "@type": "Organization", "name": "ThermoDMR" } },
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "bestRating": "5", "reviewCount": "28" },
    },
  },
  "/prodotti/portoncini": {
    title: "Portoncini Blindati PVC — Sicurezza e Isolamento — ThermoDMR",
    description: "Portoncini blindati in PVC ThermoDMR: massima sicurezza, isolamento termoacustico superiore. Certificati, garanzia 15 anni. Preventivo gratuito.",
    canonical: `${B}/prodotti/portoncini`,
    lang: "it",
    alternateIt: `${B}/prodotti/portoncini`,
    alternateRo: `${B}/ro/produse/portoncini`,
    ogType: "product",
    ogImage: `${B}/images/thermodmr-portoncino-ingresso.avif`,
    breadcrumb: [
      { name: "Home", url: `${B}/` },
      { name: "Prodotti", url: `${B}/prodotti-pubblico` },
      { name: "Portoncini Blindati", url: `${B}/prodotti/portoncini` },
    ],
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Portoncini Blindati PVC ThermoDMR",
      "description": "Portoncini blindati in PVC con massima sicurezza e isolamento termoacustico superiore. Garanzia 15 anni.",
      "brand": { "@type": "Brand", "name": "ThermoDMR" },
      "manufacturer": { "@type": "Organization", "@id": `${B}/#organization`, "name": "MARYSORYNA SRL", "url": B },
      "url": `${B}/prodotti/portoncini`,
      "image": `${B}/images/thermodmr-portoncino-ingresso.avif`,
      "category": "Portoncini PVC",
      "offers": { "@type": "Offer", "priceCurrency": "EUR", "priceRange": "Su richiesta", "availability": "https://schema.org/InStock", "url": `${B}/contatti`, "seller": { "@type": "Organization", "name": "ThermoDMR" } },
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "bestRating": "5", "reviewCount": "31" },
    },
  },
  "/prodotti/tapparelle": {
    title: "Tapparelle Coibentate PVC Alluminio — ThermoDMR",
    description: "Tapparelle coibentate ThermoDMR: risparmio energetico fino al 30%, isolamento termoacustico. Alluminio e PVC, garanzia 15 anni. Preventivo gratuito.",
    canonical: `${B}/prodotti/tapparelle`,
    lang: "it",
    alternateIt: `${B}/prodotti/tapparelle`,
    alternateRo: `${B}/ro/produse/tapparelle`,
    ogType: "product",
    ogImage: `${B}/images/thermodmr-tapparella-coibentata.webp`,
    breadcrumb: [
      { name: "Home", url: `${B}/` },
      { name: "Prodotti", url: `${B}/prodotti-pubblico` },
      { name: "Tapparelle Coibentate", url: `${B}/prodotti/tapparelle` },
    ],
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Tapparelle Coibentate PVC Alluminio ThermoDMR",
      "description": "Tapparelle coibentate in alluminio e PVC, risparmio energetico fino al 30%. Garanzia 15 anni.",
      "brand": { "@type": "Brand", "name": "ThermoDMR" },
      "manufacturer": { "@type": "Organization", "@id": `${B}/#organization`, "name": "MARYSORYNA SRL", "url": B },
      "url": `${B}/prodotti/tapparelle`,
      "image": `${B}/images/thermodmr-tapparella-coibentata.webp`,
      "category": "Tapparelle",
      "offers": { "@type": "Offer", "priceCurrency": "EUR", "priceRange": "Su richiesta", "availability": "https://schema.org/InStock", "url": `${B}/contatti`, "seller": { "@type": "Organization", "name": "ThermoDMR" } },
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "bestRating": "5", "reviewCount": "24" },
    },
  },
  "/prodotti/cassonetti": {
    title: "Cassonetti Coibentati — Senza Ponti Termici — ThermoDMR",
    description: "Cassonetti coibentati ThermoDMR in EPS: eliminano ponti termici, migliorano l'isolamento. Senza dispersioni, garanzia 15 anni. Preventivo gratuito.",
    canonical: `${B}/prodotti/cassonetti`,
    lang: "it",
    alternateIt: `${B}/prodotti/cassonetti`,
    alternateRo: `${B}/ro/produse/cassonetti`,
    ogType: "product",
    ogImage: `${B}/images/thermodmr-cassonetto-installato.jpg`,
    breadcrumb: [
      { name: "Home", url: `${B}/` },
      { name: "Prodotti", url: `${B}/prodotti-pubblico` },
      { name: "Cassonetti Coibentati", url: `${B}/prodotti/cassonetti` },
    ],
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Cassonetti Coibentati EPS ThermoDMR",
      "description": "Cassonetti coibentati in EPS che eliminano i ponti termici e migliorano l'isolamento. Garanzia 15 anni.",
      "brand": { "@type": "Brand", "name": "ThermoDMR" },
      "manufacturer": { "@type": "Organization", "@id": `${B}/#organization`, "name": "MARYSORYNA SRL", "url": B },
      "url": `${B}/prodotti/cassonetti`,
      "image": `${B}/images/thermodmr-cassonetto-installato.jpg`,
      "category": "Cassonetti",
      "offers": { "@type": "Offer", "priceCurrency": "EUR", "priceRange": "Su richiesta", "availability": "https://schema.org/InStock", "url": `${B}/contatti`, "seller": { "@type": "Organization", "name": "ThermoDMR" } },
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "bestRating": "5", "reviewCount": "19" },
    },
  },
  "/prodotti/persiane": {
    title: "Persiane PVC e Alluminio — Colori RAL — ThermoDMR",
    description: "Persiane ThermoDMR in PVC e alluminio: resistenti agli agenti atmosferici, colori RAL personalizzabili. Garanzia 15 anni. Preventivo gratuito.",
    canonical: `${B}/prodotti/persiane`,
    lang: "it",
    alternateIt: `${B}/prodotti/persiane`,
    alternateRo: `${B}/ro/produse/persiane`,
    ogType: "product",
    ogImage: `${B}/images/thermodmr-persiana-verde.webp`,
    breadcrumb: [
      { name: "Home", url: `${B}/` },
      { name: "Prodotti", url: `${B}/prodotti-pubblico` },
      { name: "Persiane PVC e Alluminio", url: `${B}/prodotti/persiane` },
    ],
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Persiane PVC e Alluminio ThermoDMR",
      "description": "Persiane in PVC e alluminio, resistenti agli agenti atmosferici, disponibili in colori RAL. Garanzia 15 anni.",
      "brand": { "@type": "Brand", "name": "ThermoDMR" },
      "manufacturer": { "@type": "Organization", "@id": `${B}/#organization`, "name": "MARYSORYNA SRL", "url": B },
      "url": `${B}/prodotti/persiane`,
      "image": `${B}/images/thermodmr-persiana-verde.webp`,
      "category": "Persiane",
      "offers": { "@type": "Offer", "priceCurrency": "EUR", "priceRange": "Su richiesta", "availability": "https://schema.org/InStock", "url": `${B}/contatti`, "seller": { "@type": "Organization", "name": "ThermoDMR" } },
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "bestRating": "5", "reviewCount": "22" },
    },
  },
  "/blog": {
    title: "Blog ThermoDMR — Guide Finestre PVC e Risparmio Energetico",
    description: "Guide, consigli e aggiornamenti su finestre PVC, isolamento termico, bonus infissi 2025 e risparmio energetico. Blog ufficiale ThermoDMR.",
    canonical: `${B}/blog`,
    lang: "it",
    alternateIt: `${B}/blog`,
    alternateRo: `${B}/ro/blog`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "url": `${B}/blog`,
      "name": "Blog ThermoDMR",
      "description": "Guide e consigli su finestre PVC, isolamento termico e risparmio energetico.",
      "publisher": { "@id": `${B}/#organization` },
      "inLanguage": "it-IT",
    },
  },
  "/contatti": {
    title: "Contatti ThermoDMR — Preventivo Gratuito Finestre PVC",
    description: "Contatta ThermoDMR per preventivo gratuito su finestre PVC, portoncini, tapparelle e serramenti. Italia: +39 348 346 7567. Romania: +40 744 139 565.",
    canonical: `${B}/contatti`,
    lang: "it",
    alternateIt: `${B}/contatti`,
    alternateRo: `${B}/ro/contact`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "url": `${B}/contatti`,
      "name": "Contatti ThermoDMR",
      "description": "Richiedi un preventivo gratuito per finestre PVC, portoncini e serramenti.",
      "about": { "@id": `${B}/#organization` },
    },
  },

  // ── ROMÂNĂ ────────────────────────────────────────────────────────────────
  "/ro": {
    title: "ThermoDMR — Ferestre și Tâmplărie PVC cu Profil German",
    description: "Ferestre PVC cu profil german: izolare Clasa A, garanție 15 ani. Uși blindate, rulouri termoizolante, casete și jaluzele. Ofertă gratuită.",
    canonical: `${B}/ro`,
    lang: "ro",
    alternateIt: `${B}/`,
    alternateRo: `${B}/ro`,
    jsonLd: null,
  },
  "/ro/despre-noi": {
    title: "Despre Noi — ThermoDMR | Producător Ferestre PVC",
    description: "ThermoDMR (MARYSORYNA SRL): producem ferestre PVC cu profil german din 2008. Garanție 15 ani, certificări CE, asistență în Italia și România.",
    canonical: `${B}/ro/despre-noi`,
    lang: "ro",
    alternateIt: `${B}/chi-siamo`,
    alternateRo: `${B}/ro/despre-noi`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "url": `${B}/ro/despre-noi`,
      "name": "Despre Noi — ThermoDMR",
      "inLanguage": "ro-RO",
      "about": { "@id": `${B}/#organization` },
    },
  },
  "/ro/produse": {
    title: "Catalog Ferestre PVC — ThermoDMR | Toate Produsele",
    description: "Descoperă catalogul ThermoDMR: ferestre DMR Confort, Domus, Passive, uși blindate, rulouri termoizolante și jaluzele. Solicită ofertă.",
    canonical: `${B}/ro/produse`,
    lang: "ro",
    alternateIt: `${B}/prodotti-pubblico`,
    alternateRo: `${B}/ro/produse`,
    jsonLd: null,
  },
  "/ro/produse/dmr-confort": {
    title: "DMR Confort — Fereastră PVC 5 Camere Tecnolegno — ThermoDMR",
    description: "Fereastra DMR Confort: 5 camere, profil Tecnolegno efect lemn, Uf=0.95. Izolare termică și acustică superioară. Garanție 15 ani. Ofertă gratuită.",
    canonical: `${B}/ro/produse/dmr-confort`,
    lang: "ro",
    alternateIt: `${B}/prodotti/dmr-confort`,
    alternateRo: `${B}/ro/produse/dmr-confort`,
    ogType: "product",
    ogImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    breadcrumb: [
      { name: "Acasă", url: `${B}/ro` },
      { name: "Produse", url: `${B}/ro/produse` },
      { name: "DMR Confort", url: `${B}/ro/produse/dmr-confort` },
    ],
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Fereastră PVC DMR Confort — 5 Camere Tecnolegno",
      "description": "Fereastră PVC cu 5 camere, profil Tecnolegno efect lemn, izolare termică și acustică superioară. Garanție 15 ani.",
      "brand": { "@type": "Brand", "name": "ThermoDMR" },
      "manufacturer": { "@type": "Organization", "@id": `${B}/#organization`, "name": "MARYSORYNA SRL", "url": B },
      "url": `${B}/ro/produse/dmr-confort`,
      "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "offers": { "@type": "Offer", "priceCurrency": "EUR", "priceRange": "La cerere", "availability": "https://schema.org/InStock", "url": `${B}/ro/contact` },
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "bestRating": "5", "reviewCount": "47" },
    },
  },
  "/ro/produse/dmr-domus": {
    title: "DMR Domus — Fereastră PVC Eficiență Energetică — ThermoDMR",
    description: "Fereastra DMR Domus: design clasic, geam dublu și triplu, eficiență energetică ridicată. Clasa A, garanție 15 ani. Solicită ofertă gratuită.",
    canonical: `${B}/ro/produse/dmr-domus`,
    lang: "ro",
    alternateIt: `${B}/prodotti/dmr-domus`,
    alternateRo: `${B}/ro/produse/dmr-domus`,
    ogType: "product",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Fereastră PVC DMR Domus",
      "description": "Fereastră PVC design clasic cu eficiență energetică ridicată, geam dublu și triplu. Clasa A, garanție 15 ani.",
      "brand": { "@type": "Brand", "name": "ThermoDMR" },
      "url": `${B}/ro/produse/dmr-domus`,
      "image": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "offers": { "@type": "Offer", "priceCurrency": "EUR", "priceRange": "La cerere", "availability": "https://schema.org/InStock", "url": `${B}/ro/contact` },
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "bestRating": "5", "reviewCount": "35" },
    },
  },
  "/ro/produse/dmr-passive": {
    title: "DMR Passive — Fereastră PVC Casă Pasivă — ThermoDMR",
    description: "Fereastra DMR Passive pentru case pasive A+: triplu geam argon, Uw=0.8. Izolare termică maximă. Garanție 15 ani. Ofertă gratuită.",
    canonical: `${B}/ro/produse/dmr-passive`,
    lang: "ro",
    alternateIt: `${B}/prodotti/dmr-passive`,
    alternateRo: `${B}/ro/produse/dmr-passive`,
    ogType: "product",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Fereastră PVC DMR Passive — Casă Pasivă",
      "description": "Fereastră PVC pentru case pasive și clasa energetică A+, triplu geam cu gaz argon. Garanție 15 ani.",
      "brand": { "@type": "Brand", "name": "ThermoDMR" },
      "url": `${B}/ro/produse/dmr-passive`,
      "image": "https://images.unsplash.com/photo-1600566753376-12c8ab7c5a38?w=1200&q=80",
      "offers": { "@type": "Offer", "priceCurrency": "EUR", "priceRange": "La cerere", "availability": "https://schema.org/InStock", "url": `${B}/ro/contact` },
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "bestRating": "5", "reviewCount": "28" },
    },
  },
  "/ro/produse/portoncini": {
    title: "Uși Blindate PVC — Securitate și Izolare — ThermoDMR",
    description: "Uși blindate PVC ThermoDMR: securitate maximă, izolare termoacustică superioară. Certificate, garanție 15 ani. Ofertă gratuită.",
    canonical: `${B}/ro/produse/portoncini`,
    lang: "ro",
    alternateIt: `${B}/prodotti/portoncini`,
    alternateRo: `${B}/ro/produse/portoncini`,
    ogType: "product",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Uși Blindate PVC ThermoDMR",
      "description": "Uși blindate în PVC cu securitate maximă și izolare termoacustică superioară. Garanție 15 ani.",
      "brand": { "@type": "Brand", "name": "ThermoDMR" },
      "url": `${B}/ro/produse/portoncini`,
      "image": `${B}/images/thermodmr-portoncino-ingresso.avif`,
      "offers": { "@type": "Offer", "priceCurrency": "EUR", "priceRange": "La cerere", "availability": "https://schema.org/InStock", "url": `${B}/ro/contact` },
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "bestRating": "5", "reviewCount": "31" },
    },
  },
  "/ro/produse/tapparelle": {
    title: "Rulouri Termoizolante PVC Aluminiu — ThermoDMR",
    description: "Rulouri termoizolante ThermoDMR: economie de energie până la 30%, izolare termoacustică. Aluminiu și PVC, garanție 15 ani. Ofertă gratuită.",
    canonical: `${B}/ro/produse/tapparelle`,
    lang: "ro",
    alternateIt: `${B}/prodotti/tapparelle`,
    alternateRo: `${B}/ro/produse/tapparelle`,
    ogType: "product",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Rulouri Termoizolante PVC Aluminiu ThermoDMR",
      "description": "Rulouri termoizolante în aluminiu și PVC, economie de energie până la 30%. Garanție 15 ani.",
      "brand": { "@type": "Brand", "name": "ThermoDMR" },
      "url": `${B}/ro/produse/tapparelle`,
      "image": `${B}/images/thermodmr-tapparella-coibentata.webp`,
      "offers": { "@type": "Offer", "priceCurrency": "EUR", "priceRange": "La cerere", "availability": "https://schema.org/InStock", "url": `${B}/ro/contact` },
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "bestRating": "5", "reviewCount": "24" },
    },
  },
  "/ro/produse/cassonetti": {
    title: "Casete Termoizolante EPS — Fără Punți Termice — ThermoDMR",
    description: "Casete termoizolante ThermoDMR din EPS: elimină punțile termice, îmbunătățesc izolarea involucru. Garanție 15 ani. Ofertă gratuită.",
    canonical: `${B}/ro/produse/cassonetti`,
    lang: "ro",
    alternateIt: `${B}/prodotti/cassonetti`,
    alternateRo: `${B}/ro/produse/cassonetti`,
    ogType: "product",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Casete Termoizolante EPS ThermoDMR",
      "description": "Casete termoizolante din EPS care elimină punțile termice și îmbunătățesc izolarea. Garanție 15 ani.",
      "brand": { "@type": "Brand", "name": "ThermoDMR" },
      "url": `${B}/ro/produse/cassonetti`,
      "image": `${B}/images/thermodmr-cassonetto-installato.jpg`,
      "offers": { "@type": "Offer", "priceCurrency": "EUR", "priceRange": "La cerere", "availability": "https://schema.org/InStock", "url": `${B}/ro/contact` },
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "bestRating": "5", "reviewCount": "19" },
    },
  },
  "/ro/produse/persiane": {
    title: "Jaluzele PVC și Aluminiu — Culori RAL — ThermoDMR",
    description: "Jaluzele ThermoDMR din PVC și aluminiu: rezistente la intemperii, culori RAL personalizabile. Garanție 15 ani. Ofertă gratuită.",
    canonical: `${B}/ro/produse/persiane`,
    lang: "ro",
    alternateIt: `${B}/prodotti/persiane`,
    alternateRo: `${B}/ro/produse/persiane`,
    ogType: "product",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Jaluzele PVC și Aluminiu ThermoDMR",
      "description": "Jaluzele din PVC și aluminiu, rezistente la intemperii, disponibile în culori RAL. Garanție 15 ani.",
      "brand": { "@type": "Brand", "name": "ThermoDMR" },
      "url": `${B}/ro/produse/persiane`,
      "image": `${B}/images/thermodmr-persiana-verde.webp`,
      "offers": { "@type": "Offer", "priceCurrency": "EUR", "priceRange": "La cerere", "availability": "https://schema.org/InStock", "url": `${B}/ro/contact` },
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "bestRating": "5", "reviewCount": "22" },
    },
  },
  "/ro/blog": {
    title: "Blog ThermoDMR — Ghiduri Ferestre PVC și Economie Energie",
    description: "Ghiduri, sfaturi și noutăți despre ferestre PVC, izolare termică, bonus tâmplărie 2025 și economie de energie. Blog oficial ThermoDMR.",
    canonical: `${B}/ro/blog`,
    lang: "ro",
    alternateIt: `${B}/blog`,
    alternateRo: `${B}/ro/blog`,
    jsonLd: null,
  },
  "/ro/contact": {
    title: "Contact ThermoDMR — Ofertă Gratuită Ferestre PVC",
    description: "Contactează ThermoDMR pentru ofertă gratuită la ferestre PVC, uși, rulouri și tâmplărie. Italia: +39 348 346 7567. România: +40 744 139 565.",
    canonical: `${B}/ro/contact`,
    lang: "ro",
    alternateIt: `${B}/contatti`,
    alternateRo: `${B}/ro/contact`,
    jsonLd: null,
  },
};

// Static asset extensions to skip
const STATIC_EXTS = new Set([
  ".js", ".css", ".png", ".jpg", ".jpeg", ".webp", ".avif",
  ".svg", ".ico", ".woff", ".woff2", ".ttf", ".map",
  ".json", ".xml", ".txt",
]);

function isStaticAsset(pathname: string): boolean {
  const last = pathname.lastIndexOf(".");
  if (last === -1) return false;
  return STATIC_EXTS.has(pathname.slice(last).toLowerCase());
}

function buildBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
}

function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export const onRequest = async (context: {
  request: Request;
  next: () => Promise<Response>;
}) => {
  const url = new URL(context.request.url);
  const pathname = url.pathname;

  // Skip static assets immediately
  if (isStaticAsset(pathname)) {
    return context.next();
  }

  // Only handle text/html requests
  const accept = context.request.headers.get("accept") || "";
  if (pathname.startsWith("/assets/") || pathname.startsWith("/_next/")) {
    return context.next();
  }

  const response = await context.next();

  // Only transform HTML
  const ct = response.headers.get("content-type") || "";
  if (!ct.includes("text/html")) {
    return response;
  }

  const meta = PAGES[pathname];
  if (!meta) {
    // Unknown page — serve as-is (fallback to index.html defaults)
    return response;
  }

  const lang = meta.lang;
  const ogLocale = lang === "ro" ? "ro_RO" : "it_IT";
  const ogImage = meta.ogImage || DEFAULT_OG_IMAGE;

  // Build extra <head> scripts to inject
  let extraHead = "";
  if (meta.jsonLd) {
    extraHead += `\n<script type="application/ld+json">${JSON.stringify(meta.jsonLd)}</script>`;
  }
  if (meta.breadcrumb) {
    extraHead += `\n<script type="application/ld+json">${JSON.stringify(buildBreadcrumbSchema(meta.breadcrumb))}</script>`;
  }

  return (
    new HTMLRewriter()
      // html[lang]
      .on("html", {
        element(el) {
          el.setAttribute("lang", lang);
        },
      })
      // <title>
      .on("title", {
        element(el) {
          el.setInnerContent(esc(meta.title));
        },
      })
      // <meta name="description">
      .on('meta[name="description"]', {
        element(el) {
          el.setAttribute("content", meta.description);
        },
      })
      // <link rel="canonical">
      .on('link[rel="canonical"]', {
        element(el) {
          el.setAttribute("href", meta.canonical);
        },
      })
      // hreflang
      .on('link[hreflang="it"]', {
        element(el) {
          el.setAttribute("href", meta.alternateIt);
        },
      })
      .on('link[hreflang="ro"]', {
        element(el) {
          el.setAttribute("href", meta.alternateRo);
        },
      })
      .on('link[hreflang="x-default"]', {
        element(el) {
          el.setAttribute("href", meta.alternateIt);
        },
      })
      // Open Graph
      .on('meta[property="og:title"]', {
        element(el) {
          el.setAttribute("content", meta.title);
        },
      })
      .on('meta[property="og:description"]', {
        element(el) {
          el.setAttribute("content", meta.description);
        },
      })
      .on('meta[property="og:url"]', {
        element(el) {
          el.setAttribute("content", meta.canonical);
        },
      })
      .on('meta[property="og:type"]', {
        element(el) {
          el.setAttribute("content", meta.ogType || "website");
        },
      })
      .on('meta[property="og:image"]', {
        element(el) {
          el.setAttribute("content", ogImage);
        },
      })
      .on('meta[property="og:locale"]', {
        element(el) {
          el.setAttribute("content", ogLocale);
        },
      })
      // Twitter Card
      .on('meta[name="twitter:title"]', {
        element(el) {
          el.setAttribute("content", meta.title);
        },
      })
      .on('meta[name="twitter:description"]', {
        element(el) {
          el.setAttribute("content", meta.description);
        },
      })
      .on('meta[name="twitter:image"]', {
        element(el) {
          el.setAttribute("content", ogImage);
        },
      })
      // Inject extra JSON-LD scripts before </head>
      .on("head", {
        element(el) {
          if (extraHead) {
            el.append(extraHead, { html: true });
          }
        },
      })
      .transform(response)
  );
};
