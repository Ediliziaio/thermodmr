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

  // ─── Blog post IT ───────────────────────────────────────────────────────────
  "/blog/finestre-pvc-profilo-tedesco-guida-completa": {
    title: "Finestre in PVC con Profilo Tedesco: Guida Completa 2026",
    description: "Cosa sono le finestre PVC con profilo tedesco? Vantaggi, camere, certificazioni e perché costano meno di quanto pensi. Guida aggiornata 2026.",
    canonical: `${B}/blog/finestre-pvc-profilo-tedesco-guida-completa`,
    lang: "it", alternateIt: `${B}/blog/finestre-pvc-profilo-tedesco-guida-completa`, alternateRo: `${B}/ro/blog/ferestre-pvc-profil-german-ghid-complet`,
    breadcrumb: [{name:"Home",url:`${B}/`},{name:"Blog",url:`${B}/blog`},{name:"Finestre PVC Profilo Tedesco",url:`${B}/blog/finestre-pvc-profilo-tedesco-guida-completa`}],
  },
  "/blog/risparmio-energetico-finestre-pvc-quanto-si-risparmia": {
    title: "Risparmio Energetico con Finestre in PVC: Cifre Reali",
    description: "Quanto si risparmia in bolletta sostituendo le finestre con PVC Classe A? Calcoli reali, percentuali e tempi di recupero dell'investimento.",
    canonical: `${B}/blog/risparmio-energetico-finestre-pvc-quanto-si-risparmia`,
    lang: "it", alternateIt: `${B}/blog/risparmio-energetico-finestre-pvc-quanto-si-risparmia`, alternateRo: `${B}/ro/blog/economie-energie-ferestre-pvc-calcul-real`,
    breadcrumb: [{name:"Home",url:`${B}/`},{name:"Blog",url:`${B}/blog`},{name:"Risparmio Energetico Finestre PVC",url:`${B}/blog/risparmio-energetico-finestre-pvc-quanto-si-risparmia`}],
  },
  "/blog/tapparelle-coibentate-vs-tradizionali-differenze": {
    title: "Tapparelle Coibentate vs Tradizionali: Differenze e Quando Conviene",
    description: "Tapparelle coibentate o normali? Differenze tecniche, risparmio energetico reale e quando vale la pena passare al coibentato. Guida 2026.",
    canonical: `${B}/blog/tapparelle-coibentate-vs-tradizionali-differenze`,
    lang: "it", alternateIt: `${B}/blog/tapparelle-coibentate-vs-tradizionali-differenze`, alternateRo: `${B}/ro/blog/jaluzele-termoizolante-vs-standard-diferente`,
    breadcrumb: [{name:"Home",url:`${B}/`},{name:"Blog",url:`${B}/blog`},{name:"Tapparelle Coibentate vs Tradizionali",url:`${B}/blog/tapparelle-coibentate-vs-tradizionali-differenze`}],
  },
  "/blog/finestre-pvc-prezzi-2025": {
    title: "Finestre PVC Prezzi 2026: Quanto Costano e Come Non Pagare Troppo",
    description: "Prezzi reali finestre PVC 2026: dal doppio al triplo vetro. Cosa incide sul costo, come confrontare offerte e dove risparmiare senza rinunciare.",
    canonical: `${B}/blog/finestre-pvc-prezzi-2025`,
    lang: "it", alternateIt: `${B}/blog/finestre-pvc-prezzi-2025`, alternateRo: `${B}/ro/blog/ferestre-pvc-preturi-2025`,
    breadcrumb: [{name:"Home",url:`${B}/`},{name:"Blog",url:`${B}/blog`},{name:"Finestre PVC Prezzi 2026",url:`${B}/blog/finestre-pvc-prezzi-2025`}],
  },
  "/blog/bonus-finestre-2025-detrazione-fiscale": {
    title: "Bonus Finestre 2026: Detrazione 50% Irpef — Come Funziona",
    description: "Guida completa al Bonus Finestre 2026: detrazione 50% Irpef per sostituzione serramenti. Requisiti, documentazione ENEA e come richiedere.",
    canonical: `${B}/blog/bonus-finestre-2025-detrazione-fiscale`,
    lang: "it", alternateIt: `${B}/blog/bonus-finestre-2025-detrazione-fiscale`, alternateRo: `${B}/ro/blog/program-reabilitare-termica-finantare-ferestre-2025`,
    breadcrumb: [{name:"Home",url:`${B}/`},{name:"Blog",url:`${B}/blog`},{name:"Bonus Finestre 2026",url:`${B}/blog/bonus-finestre-2025-detrazione-fiscale`}],
  },
  "/blog/doppio-vetro-vs-triplo-vetro-quale-scegliere": {
    title: "Doppio Vetro vs Triplo Vetro: Quale Scegliere nel 2026?",
    description: "Confronto tecnico tra finestre a doppio e triplo vetro: isolamento, costi, peso e quando vale davvero la pena scegliere il triplo. Guida 2026.",
    canonical: `${B}/blog/doppio-vetro-vs-triplo-vetro-quale-scegliere`,
    lang: "it", alternateIt: `${B}/blog/doppio-vetro-vs-triplo-vetro-quale-scegliere`, alternateRo: `${B}/ro/blog/geam-dublu-vs-geam-triplu-care-alegi`,
    breadcrumb: [{name:"Home",url:`${B}/`},{name:"Blog",url:`${B}/blog`},{name:"Doppio vs Triplo Vetro 2026",url:`${B}/blog/doppio-vetro-vs-triplo-vetro-quale-scegliere`}],
  },
  "/blog/sostituzione-finestre-ristrutturazione-guida": {
    title: "Sostituzione Finestre in Ristrutturazione: Guida Completa 2026",
    description: "Come sostituire le finestre in ristrutturazione: tempistiche, ordine dei lavori, scelta del serramento giusto e come accedere ai bonus fiscali.",
    canonical: `${B}/blog/sostituzione-finestre-ristrutturazione-guida`,
    lang: "it", alternateIt: `${B}/blog/sostituzione-finestre-ristrutturazione-guida`, alternateRo: `${B}/ro/blog/inlocuire-ferestre-renovare-casa-ghid-complet`,
    breadcrumb: [{name:"Home",url:`${B}/`},{name:"Blog",url:`${B}/blog`},{name:"Sostituzione Finestre Ristrutturazione",url:`${B}/blog/sostituzione-finestre-ristrutturazione-guida`}],
  },
  "/blog/come-scegliere-le-finestre-guida-acquisto-2025": {
    title: "Come Scegliere le Finestre: Guida all'Acquisto 2026",
    description: "Guida completa per scegliere le finestre giuste nel 2026: materiali, vetri, aperture, colori e certificazioni. Evita gli errori più comuni.",
    canonical: `${B}/blog/come-scegliere-le-finestre-guida-acquisto-2025`,
    lang: "it", alternateIt: `${B}/blog/come-scegliere-le-finestre-guida-acquisto-2025`, alternateRo: `${B}/ro/blog/cum-alegi-ferestrele-ghid-cumparaturi-2025`,
    breadcrumb: [{name:"Home",url:`${B}/`},{name:"Blog",url:`${B}/blog`},{name:"Come Scegliere le Finestre 2026",url:`${B}/blog/come-scegliere-le-finestre-guida-acquisto-2025`}],
  },
  "/blog/bonus-infissi-2026-detrazioni-finestre-pvc": {
    title: "Bonus Infissi 2026: Detrazioni Finestre PVC e Serramenti",
    description: "Bonus infissi 2026: detrazioni 50% e 65% per finestre PVC e serramenti. Requisiti, documentazione ENEA, esempi pratici e come ottenerlo.",
    canonical: `${B}/blog/bonus-infissi-2026-detrazioni-finestre-pvc`,
    lang: "it", alternateIt: `${B}/blog/bonus-infissi-2026-detrazioni-finestre-pvc`, alternateRo: `${B}/ro/blog/bonus-tamplarie-2026-deduceri-ferestre-pvc`,
    breadcrumb: [{name:"Home",url:`${B}/`},{name:"Blog",url:`${B}/blog`},{name:"Bonus Infissi 2026",url:`${B}/blog/bonus-infissi-2026-detrazioni-finestre-pvc`}],
  },
  "/blog/classe-energetica-casa-2026-finestre-pvc": {
    title: "Classe Energetica A con Finestre PVC: Guida 2026",
    description: "Come migliorare la classe energetica della tua casa con finestre PVC nel 2026. Valori Uw, trasmittanza termica e impatto sull'APE spiegati.",
    canonical: `${B}/blog/classe-energetica-casa-2026-finestre-pvc`,
    lang: "it", alternateIt: `${B}/blog/classe-energetica-casa-2026-finestre-pvc`, alternateRo: `${B}/ro/blog/clasa-energetica-casa-2026-ferestre-pvc`,
    breadcrumb: [{name:"Home",url:`${B}/`},{name:"Blog",url:`${B}/blog`},{name:"Classe Energetica 2026 Finestre PVC",url:`${B}/blog/classe-energetica-casa-2026-finestre-pvc`}],
  },
  "/blog/triplo-vetro-o-doppio-vetro-guida-2026": {
    title: "Triplo Vetro o Doppio Vetro? La Scelta Giusta nel 2026",
    description: "Triplo vetro o doppio vetro? Confronto completo 2026: costi, isolamento termico, risparmio energetico e ROI reale. Guida tecnica ThermoDMR.",
    canonical: `${B}/blog/triplo-vetro-o-doppio-vetro-guida-2026`,
    lang: "it", alternateIt: `${B}/blog/triplo-vetro-o-doppio-vetro-guida-2026`, alternateRo: `${B}/ro/blog/geam-triplu-sau-dublu-ghid-2026`,
    breadcrumb: [{name:"Home",url:`${B}/`},{name:"Blog",url:`${B}/blog`},{name:"Triplo Vetro o Doppio 2026",url:`${B}/blog/triplo-vetro-o-doppio-vetro-guida-2026`}],
  },

  // ─── Blog post RO ───────────────────────────────────────────────────────────
  "/ro/blog/ferestre-pvc-profil-german-ghid-complet": {
    title: "Ferestre PVC cu Profil German: Ghid Complet 2026",
    description: "Ce sunt ferestrele PVC cu profil german? Avantaje, camere, certificări și de ce costă mai puțin decât crezi. Ghid actualizat 2026.",
    canonical: `${B}/ro/blog/ferestre-pvc-profil-german-ghid-complet`,
    lang: "ro", alternateIt: `${B}/blog/finestre-pvc-profilo-tedesco-guida-completa`, alternateRo: `${B}/ro/blog/ferestre-pvc-profil-german-ghid-complet`,
    breadcrumb: [{name:"Acasă",url:`${B}/ro`},{name:"Blog",url:`${B}/ro/blog`},{name:"Ferestre PVC Profil German",url:`${B}/ro/blog/ferestre-pvc-profil-german-ghid-complet`}],
  },
  "/ro/blog/economie-energie-ferestre-pvc-calcul-real": {
    title: "Economie de Energie cu Ferestre PVC: Cifre Reale pentru România",
    description: "Cât economisești la factură înlocuind ferestrele cu PVC Clasa A? Calcule reale, procente și timp de recuperare a investiției pentru România.",
    canonical: `${B}/ro/blog/economie-energie-ferestre-pvc-calcul-real`,
    lang: "ro", alternateIt: `${B}/blog/risparmio-energetico-finestre-pvc-quanto-si-risparmia`, alternateRo: `${B}/ro/blog/economie-energie-ferestre-pvc-calcul-real`,
    breadcrumb: [{name:"Acasă",url:`${B}/ro`},{name:"Blog",url:`${B}/ro/blog`},{name:"Economie Energie Ferestre PVC",url:`${B}/ro/blog/economie-energie-ferestre-pvc-calcul-real`}],
  },
  "/ro/blog/jaluzele-termoizolante-vs-standard-diferente": {
    title: "Jaluzele Termoizolante vs Standard: Diferențe și Când Merită",
    description: "Jaluzele termoizolante sau standard? Diferențe tehnice, economie reală de energie și când merită să faci upgrade. Ghid complet 2026.",
    canonical: `${B}/ro/blog/jaluzele-termoizolante-vs-standard-diferente`,
    lang: "ro", alternateIt: `${B}/blog/tapparelle-coibentate-vs-tradizionali-differenze`, alternateRo: `${B}/ro/blog/jaluzele-termoizolante-vs-standard-diferente`,
    breadcrumb: [{name:"Acasă",url:`${B}/ro`},{name:"Blog",url:`${B}/ro/blog`},{name:"Jaluzele Termoizolante vs Standard",url:`${B}/ro/blog/jaluzele-termoizolante-vs-standard-diferente`}],
  },
  "/ro/blog/ferestre-pvc-preturi-2025": {
    title: "Ferestre PVC Prețuri 2026: Cât Costă și Cum Eviți să Plătești Prea Mult",
    description: "Prețuri reale ferestre PVC 2026: de la geam dublu la triplu. Ce influențează costul, cum compari ofertele și unde economisești fără compromisuri.",
    canonical: `${B}/ro/blog/ferestre-pvc-preturi-2025`,
    lang: "ro", alternateIt: `${B}/blog/finestre-pvc-prezzi-2025`, alternateRo: `${B}/ro/blog/ferestre-pvc-preturi-2025`,
    breadcrumb: [{name:"Acasă",url:`${B}/ro`},{name:"Blog",url:`${B}/ro/blog`},{name:"Ferestre PVC Prețuri 2026",url:`${B}/ro/blog/ferestre-pvc-preturi-2025`}],
  },
  "/ro/blog/program-reabilitare-termica-finantare-ferestre-2025": {
    title: "Finanțare Ferestre PVC 2026: Programe și Fonduri Renovare Termică",
    description: "Ghid complet programe finanțare renovare termică România 2026: Casa Verde, fonduri europene, deduceri fiscale și cum obții subvenția.",
    canonical: `${B}/ro/blog/program-reabilitare-termica-finantare-ferestre-2025`,
    lang: "ro", alternateIt: `${B}/blog/bonus-finestre-2025-detrazione-fiscale`, alternateRo: `${B}/ro/blog/program-reabilitare-termica-finantare-ferestre-2025`,
    breadcrumb: [{name:"Acasă",url:`${B}/ro`},{name:"Blog",url:`${B}/ro/blog`},{name:"Finanțare Ferestre 2026",url:`${B}/ro/blog/program-reabilitare-termica-finantare-ferestre-2025`}],
  },
  "/ro/blog/geam-dublu-vs-geam-triplu-care-alegi": {
    title: "Geam Dublu vs Geam Triplu: Care Alegi în 2026?",
    description: "Comparație tehnică completă geam dublu vs triplu: izolare, costuri, greutate și când merită cu adevărat geamul triplu. Ghid 2026 ThermoDMR.",
    canonical: `${B}/ro/blog/geam-dublu-vs-geam-triplu-care-alegi`,
    lang: "ro", alternateIt: `${B}/blog/doppio-vetro-vs-triplo-vetro-quale-scegliere`, alternateRo: `${B}/ro/blog/geam-dublu-vs-geam-triplu-care-alegi`,
    breadcrumb: [{name:"Acasă",url:`${B}/ro`},{name:"Blog",url:`${B}/ro/blog`},{name:"Geam Dublu vs Triplu 2026",url:`${B}/ro/blog/geam-dublu-vs-geam-triplu-care-alegi`}],
  },
  "/ro/blog/inlocuire-ferestre-renovare-casa-ghid-complet": {
    title: "Înlocuire Ferestre la Renovare: Ghid Complet 2026 pentru România",
    description: "Cum înlocuiești ferestrele în renovare: etape, ordinea lucrărilor, alegerea tâmplăriei și accesul la finanțare. Ghid practic 2026.",
    canonical: `${B}/ro/blog/inlocuire-ferestre-renovare-casa-ghid-complet`,
    lang: "ro", alternateIt: `${B}/blog/sostituzione-finestre-ristrutturazione-guida`, alternateRo: `${B}/ro/blog/inlocuire-ferestre-renovare-casa-ghid-complet`,
    breadcrumb: [{name:"Acasă",url:`${B}/ro`},{name:"Blog",url:`${B}/ro/blog`},{name:"Înlocuire Ferestre Renovare",url:`${B}/ro/blog/inlocuire-ferestre-renovare-casa-ghid-complet`}],
  },
  "/ro/blog/cum-alegi-ferestrele-ghid-cumparaturi-2025": {
    title: "Cum Alegi Ferestrele: Ghid Complet de Cumpărare 2026",
    description: "Ghid complet pentru alegerea ferestrelor în 2026: materiale, geamuri, tipuri de deschidere, culori și certificări. Evită greșelile frecvente.",
    canonical: `${B}/ro/blog/cum-alegi-ferestrele-ghid-cumparaturi-2025`,
    lang: "ro", alternateIt: `${B}/blog/come-scegliere-le-finestre-guida-acquisto-2025`, alternateRo: `${B}/ro/blog/cum-alegi-ferestrele-ghid-cumparaturi-2025`,
    breadcrumb: [{name:"Acasă",url:`${B}/ro`},{name:"Blog",url:`${B}/ro/blog`},{name:"Cum Alegi Ferestrele 2026",url:`${B}/ro/blog/cum-alegi-ferestrele-ghid-cumparaturi-2025`}],
  },
  "/ro/blog/bonus-tamplarie-2026-deduceri-ferestre-pvc": {
    title: "Bonus Tâmplărie 2026: Deduceri Ferestre PVC România",
    description: "Bonus tâmplărie 2026 în România: programe de finanțare, deduceri fiscale și subvenții pentru ferestre PVC. Ghid complet cu documente necesare.",
    canonical: `${B}/ro/blog/bonus-tamplarie-2026-deduceri-ferestre-pvc`,
    lang: "ro", alternateIt: `${B}/blog/bonus-infissi-2026-detrazioni-finestre-pvc`, alternateRo: `${B}/ro/blog/bonus-tamplarie-2026-deduceri-ferestre-pvc`,
    breadcrumb: [{name:"Acasă",url:`${B}/ro`},{name:"Blog",url:`${B}/ro/blog`},{name:"Bonus Tâmplărie 2026",url:`${B}/ro/blog/bonus-tamplarie-2026-deduceri-ferestre-pvc`}],
  },
  "/ro/blog/clasa-energetica-casa-2026-ferestre-pvc": {
    title: "Clasa Energetică A cu Ferestre PVC: Ghid 2026",
    description: "Cum îmbunătățești clasa energetică a casei cu ferestre PVC în 2026. Valori Uw, transmitanță termică și impactul asupra certificatului energetic.",
    canonical: `${B}/ro/blog/clasa-energetica-casa-2026-ferestre-pvc`,
    lang: "ro", alternateIt: `${B}/blog/classe-energetica-casa-2026-finestre-pvc`, alternateRo: `${B}/ro/blog/clasa-energetica-casa-2026-ferestre-pvc`,
    breadcrumb: [{name:"Acasă",url:`${B}/ro`},{name:"Blog",url:`${B}/ro/blog`},{name:"Clasa Energetică 2026 Ferestre PVC",url:`${B}/ro/blog/clasa-energetica-casa-2026-ferestre-pvc`}],
  },
  "/ro/blog/geam-triplu-sau-dublu-ghid-2026": {
    title: "Geam Triplu sau Dublu? Alegerea Corectă în 2026",
    description: "Geam triplu sau dublu pentru ferestre PVC? Comparație completă 2026: costuri, izolare termică, economie reală și ROI calculat pentru România.",
    canonical: `${B}/ro/blog/geam-triplu-sau-dublu-ghid-2026`,
    lang: "ro", alternateIt: `${B}/blog/triplo-vetro-o-doppio-vetro-guida-2026`, alternateRo: `${B}/ro/blog/geam-triplu-sau-dublu-ghid-2026`,
    breadcrumb: [{name:"Acasă",url:`${B}/ro`},{name:"Blog",url:`${B}/ro/blog`},{name:"Geam Triplu sau Dublu 2026",url:`${B}/ro/blog/geam-triplu-sau-dublu-ghid-2026`}],
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
