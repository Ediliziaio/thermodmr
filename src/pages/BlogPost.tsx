import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, ChevronRight, ArrowRight, BookOpen, Tag } from "lucide-react";
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import SeoHead from "@/components/SeoHead";
import { useLanguage } from "@/i18n/LanguageContext";
import { getBlogPostBySlug, getBlogPostsByLang } from "@/data/blogPosts";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useLanguage();
  const isRo = lang === "ro";

  const post = slug ? getBlogPostBySlug(slug, lang) : undefined;

  if (!post) return <Navigate to={isRo ? "/ro/blog" : "/blog"} replace />;

  const relatedPosts = getBlogPostsByLang(lang)
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  const blogBase = isRo ? "/ro/blog" : "/blog";
  const canonicalPath = `${blogBase}/${post.slug}`;
  const hreflangOther = isRo ? `/blog/${post.slug}` : `/ro/blog/${post.slug}`;

  const labels = {
    back: isRo ? "Înapoi la blog" : "Torna al blog",
    related: isRo ? "Articole similare" : "Articoli correlati",
    readMore: isRo ? "Citește articolul" : "Leggi l'articolo",
    minRead: isRo ? "min de citit" : "min di lettura",
    cta: isRo ? "Solicită ofertă gratuită" : "Richiedi preventivo gratuito",
    ctaLink: isRo ? "/ro/contact" : "/contatti",
    ctaTitle: isRo ? "Pronto per un preventivo?" : "Pronto per un preventivo?",
    ctaDesc: isRo
      ? "Spune-ne dimensiunile ferestrelor tale și primești o ofertă detaliată în 24 de ore. Fără obligații."
      : "Dimmi le misure delle tue finestre e ricevi un preventivo dettagliato in 24 ore. Senza impegno.",
    by: isRo ? "di" : "di",
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: lang === "ro" ? "ro-RO" : "it-IT",
    image: {
      "@type": "ImageObject",
      url: heroImage.startsWith("http") ? heroImage : `https://thermodmr.com${heroImage}`,
      width: 1200,
      height: 630,
    },
    author: {
      "@type": "Organization",
      name: "ThermoDMR",
      url: "https://thermodmr.com",
      logo: { "@type": "ImageObject", url: "https://thermodmr.com/logo_Thermodmr.png" },
    },
    publisher: {
      "@type": "Organization",
      name: "ThermoDMR",
      url: "https://thermodmr.com",
      logo: { "@type": "ImageObject", url: "https://thermodmr.com/logo_Thermodmr.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://thermodmr.com${canonicalPath}` },
    keywords: post.category,
    articleSection: post.category,
    wordCount: (post.readingTime ?? 5) * 200,
  };

  const heroImage = post.heroImage ?? "/images/hero-bg.jpg";

  return (
    <>
      <SeoHead
        title={post.title}
        description={post.description}
        canonical={canonicalPath}
        lang={lang}
        hreflangIt={isRo ? hreflangOther : canonicalPath}
        hreflangRo={isRo ? canonicalPath : hreflangOther}
        ogType="article"
        ogImage={heroImage}
        jsonLd={articleJsonLd}
      />
      <PublicNavbar />

      <main className="min-h-screen bg-gray-50">

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <div className="relative min-h-[520px] sm:min-h-[580px] flex flex-col justify-end overflow-hidden">
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${heroImage}')` }}
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0,0%,4%)] via-[hsl(0,0%,8%)]/70 to-[hsl(0,0%,8%)]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(0,0%,4%)]/60 to-transparent" />

          {/* Decorative glow */}
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[200px] bg-[hsl(195,85%,45%)] opacity-[0.06] blur-[100px] pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pb-14 pt-32">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Link
                to={blogBase}
                className="inline-flex items-center gap-1.5 text-white/50 hover:text-white text-sm mb-8 transition-colors group"
              >
                <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
                {labels.back}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {/* Category + meta row */}
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="inline-flex items-center gap-1.5 bg-[hsl(195,85%,45%)]/20 text-[hsl(195,85%,60%)] text-xs font-bold uppercase tracking-[2px] px-3 py-1.5 rounded-full border border-[hsl(195,85%,45%)]/30">
                  <Tag className="h-3 w-3" />
                  {post.category}
                </span>
                <span className="flex items-center gap-1.5 text-white/40 text-xs">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(post.date).toLocaleDateString(isRo ? "ro-RO" : "it-IT", {
                    year: "numeric", month: "long", day: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1.5 text-white/40 text-xs">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readingTime} {labels.minRead}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-5 max-w-3xl">
                {post.title}
              </h1>

              {/* Description */}
              <p className="text-white/60 text-lg leading-relaxed max-w-2xl">
                {post.description}
              </p>

              {/* Divider */}
              <div className="mt-8 flex items-center gap-3">
                <div className="w-8 h-0.5 bg-[hsl(195,85%,45%)]" />
                <span className="text-white/30 text-xs uppercase tracking-widest font-medium">ThermoDMR</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── ARTICLE LAYOUT ────────────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          {/* Article card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 -mt-8 relative z-10 overflow-hidden"
          >
            {/* Top accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-[hsl(195,85%,45%)] via-[hsl(195,85%,55%)] to-[hsl(195,85%,40%)]" />

            {/* Article body */}
            <div className="px-6 sm:px-12 py-12">
              <div
                className="
                  prose prose-lg max-w-none
                  prose-headings:font-black prose-headings:text-gray-900 prose-headings:tracking-tight
                  prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-5
                  prose-h2:pb-3 prose-h2:border-b prose-h2:border-gray-100
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-gray-800
                  prose-p:text-gray-600 prose-p:leading-[1.85] prose-p:text-[17px]
                  prose-a:text-[hsl(195,85%,38%)] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-gray-900 prose-strong:font-bold
                  prose-ul:text-gray-600 prose-ul:space-y-1
                  prose-ol:text-gray-600
                  prose-li:leading-relaxed prose-li:text-[17px]
                  prose-table:w-full prose-table:text-sm prose-table:border-collapse
                  prose-thead:bg-gray-900 prose-th:text-white prose-th:font-semibold prose-th:px-4 prose-th:py-3 prose-th:text-left
                  prose-td:px-4 prose-td:py-3 prose-td:border-b prose-td:border-gray-100
                  prose-tr:even:bg-gray-50/50
                  prose-blockquote:border-l-4 prose-blockquote:border-[hsl(195,85%,45%)] prose-blockquote:bg-[hsl(195,85%,97%)] prose-blockquote:rounded-r-xl prose-blockquote:py-4 prose-blockquote:px-6
                  prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-gray-800 prose-code:text-sm
                "
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* Article footer */}
            <div className="px-6 sm:px-12 pb-10">
              <div className="flex items-center gap-3 pt-8 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-[hsl(195,85%,45%)] flex items-center justify-center shrink-0">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">ThermoDMR</p>
                  <p className="text-xs text-gray-400">MARYSORYNA SRL — Produzione diretta serramenti PVC</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── CTA BANNER ──────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="my-12 relative overflow-hidden rounded-3xl bg-[hsl(0,0%,6%)]"
          >
            {/* BG glow */}
            <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('/images/hero-bg.jpg')" }} />
            <div className="absolute top-0 right-0 w-[300px] h-[200px] bg-[hsl(195,85%,45%)] opacity-20 blur-[80px]" />

            <div className="relative z-10 p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center gap-8 justify-between">
              <div className="flex-1">
                <span className="text-[hsl(195,85%,55%)] text-xs font-bold uppercase tracking-[2px] mb-3 block">
                  ThermoDMR
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
                  {labels.ctaTitle}
                </h3>
                <p className="text-white/50 text-base leading-relaxed max-w-lg">
                  {labels.ctaDesc}
                </p>
              </div>
              <Link
                to={labels.ctaLink}
                className="shrink-0 inline-flex items-center gap-2 bg-[hsl(195,85%,45%)] hover:bg-[hsl(195,85%,38%)] text-white font-bold px-8 py-4 rounded-2xl transition-all hover:gap-3 text-base shadow-lg shadow-[hsl(195,85%,45%)]/30"
              >
                {labels.cta}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>

          {/* ── RELATED ARTICLES ────────────────────────────────────────────── */}
          {relatedPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="pb-20"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-0.5 bg-[hsl(195,85%,45%)]" />
                <h2 className="text-xl font-black text-gray-900 uppercase tracking-wider text-sm">
                  {labels.related}
                </h2>
              </div>

              <div className="grid gap-5 sm:grid-cols-3">
                {relatedPosts.map((related, i) => (
                  <motion.div
                    key={related.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                  >
                    <Link
                      to={`${blogBase}/${related.slug}`}
                      className="group flex flex-col h-full bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                      {/* Accent top */}
                      <div className="h-0.5 w-full bg-gradient-to-r from-[hsl(195,85%,45%)] to-[hsl(195,85%,65%)] opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="p-6 flex flex-col flex-1">
                        <span className="text-[10px] font-bold uppercase tracking-[2px] text-[hsl(195,85%,40%)] mb-3">
                          {related.category}
                        </span>
                        <h3 className="font-bold text-gray-900 text-sm leading-snug group-hover:text-[hsl(195,85%,35%)] transition-colors flex-1 mb-4">
                          {related.title}
                        </h3>
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                          <span className="flex items-center gap-1 text-xs text-gray-400">
                            <Clock className="h-3 w-3" />
                            {related.readingTime} {labels.minRead}
                          </span>
                          <span className="flex items-center gap-1 text-xs font-semibold text-[hsl(195,85%,40%)] group-hover:gap-1.5 transition-all">
                            {isRo ? "Citește" : "Leggi"}
                            <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <PublicFooter />
    </>
  );
};

export default BlogPost;
