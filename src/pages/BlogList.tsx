import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, BookOpen, ChevronRight } from "lucide-react";
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import SeoHead from "@/components/SeoHead";
import { useLanguage } from "@/i18n/LanguageContext";
import { getBlogPostsByLang, type BlogPost } from "@/data/blogPosts";
import { fadeUp } from "@/lib/animations";

// ── Category pill ──────────────────────────────────────────────────────────
const CategoryPill = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all border ${
      active
        ? "bg-[hsl(195,85%,45%)] border-[hsl(195,85%,45%)] text-white shadow-sm"
        : "bg-white border-gray-200 text-gray-500 hover:border-[hsl(195,85%,55%)] hover:text-[hsl(195,85%,40%)]"
    }`}
  >
    {label}
  </button>
);

// ── Featured article card (large) ──────────────────────────────────────────
const FeaturedCard = ({
  post,
  blogBase,
  labels,
}: {
  post: BlogPost;
  blogBase: string;
  labels: { readMore: string; minRead: string };
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="group relative overflow-hidden rounded-3xl bg-[hsl(0,0%,8%)] col-span-full"
  >
    {/* Background image overlay */}
    <div
      className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-500"
      style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
    />
    <div className="absolute inset-0 bg-gradient-to-r from-[hsl(0,0%,4%)] via-[hsl(0,0%,8%)]/80 to-transparent" />

    <div className="relative z-10 p-8 sm:p-12 flex flex-col sm:flex-row items-start gap-6 sm:gap-12">
      <div className="flex-1 max-w-2xl">
        {/* Badge */}
        <div className="flex items-center gap-3 mb-5">
          <span className="bg-[hsl(195,85%,45%)]/20 text-[hsl(195,85%,60%)] text-xs font-bold uppercase tracking-[2px] px-3 py-1 rounded-full border border-[hsl(195,85%,45%)]/30">
            {post.category}
          </span>
          <span className="text-white/30 text-xs flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            {post.readingTime} {labels.minRead}
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-4 group-hover:text-[hsl(195,85%,70%)] transition-colors">
          {post.title}
        </h2>
        <p className="text-white/50 text-base leading-relaxed mb-8 line-clamp-3">
          {post.description}
        </p>

        <Link
          to={`${blogBase}/${post.slug}`}
          className="inline-flex items-center gap-2 bg-[hsl(195,85%,45%)] hover:bg-[hsl(195,85%,38%)] text-white font-semibold px-6 py-3 rounded-xl transition-all hover:gap-3"
        >
          {labels.readMore} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Date block */}
      <div className="shrink-0 text-right hidden sm:block">
        <p className="text-white/20 text-xs uppercase tracking-wider mb-1">
          {new Date(post.date).toLocaleDateString("it-IT", { month: "long" })}
        </p>
        <p className="text-white/60 text-5xl font-black leading-none">
          {new Date(post.date).getDate().toString().padStart(2, "0")}
        </p>
        <p className="text-white/20 text-sm">{new Date(post.date).getFullYear()}</p>
      </div>
    </div>
  </motion.div>
);

// ── Regular article card ────────────────────────────────────────────────────
const ArticleCard = ({
  post,
  blogBase,
  labels,
  index,
}: {
  post: BlogPost;
  blogBase: string;
  labels: { readMore: string; minRead: string };
  index: number;
}) => (
  <motion.article
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.08 }}
    className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
  >
    {/* Color accent bar */}
    <div className="h-1 w-full bg-gradient-to-r from-[hsl(195,85%,45%)] to-[hsl(195,85%,65%)] opacity-0 group-hover:opacity-100 transition-opacity" />

    <div className="p-6 flex flex-col flex-1">
      {/* Meta */}
      <div className="flex items-center gap-2 flex-wrap mb-4">
        <span className="bg-[hsl(195,85%,96%)] text-[hsl(195,85%,32%)] text-xs font-bold px-3 py-1 rounded-full">
          {post.category}
        </span>
        <span className="flex items-center gap-1 text-xs text-gray-400 ml-auto">
          <Calendar className="h-3 w-3" />
          {new Date(post.date).toLocaleDateString("it-IT", { day: "numeric", month: "short", year: "numeric" })}
        </span>
      </div>

      {/* Title */}
      <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug mb-3 group-hover:text-[hsl(195,85%,35%)] transition-colors flex-1">
        {post.title}
      </h2>

      {/* Excerpt */}
      <p className="text-sm text-gray-500 leading-relaxed mb-5 line-clamp-3">{post.description}</p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
        <span className="flex items-center gap-1 text-xs text-gray-400">
          <Clock className="h-3 w-3" />
          {post.readingTime} {labels.minRead}
        </span>
        <Link
          to={`${blogBase}/${post.slug}`}
          className="flex items-center gap-1 text-sm font-semibold text-[hsl(195,85%,40%)] hover:text-[hsl(195,85%,28%)] transition-colors group/link"
          aria-label={`Leggi: ${post.title}`}
        >
          {labels.readMore}
          <ChevronRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  </motion.article>
);

// ── Main component ──────────────────────────────────────────────────────────
const BlogList = () => {
  const { lang } = useLanguage();
  const isRo = lang === "ro";
  const allPosts = getBlogPostsByLang(lang);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const labels = {
    it: {
      tag: "Blog ThermoDMR",
      title: "Guide, Consigli e Novità",
      titleHighlight: "sul Mondo dei Serramenti",
      subtitle: "Articoli tecnici, guide all'acquisto, normative e consigli pratici su finestre PVC, portoncini, tapparelle e risparmio energetico.",
      readMore: "Leggi l'articolo",
      minRead: "min di lettura",
      noPost: "Nessun articolo disponibile al momento.",
      allCategories: "Tutti",
      articlesCount: (n: number) => `${n} articol${n === 1 ? "o" : "i"}`,
      featured: "Articolo in evidenza",
    },
    ro: {
      tag: "Blog ThermoDMR",
      title: "Ghiduri, Sfaturi și Noutăți",
      titleHighlight: "despre Tâmplăria PVC",
      subtitle: "Articole tehnice, ghiduri de cumpărare, norme și sfaturi practice despre ferestre PVC, uși, jaluzele și economie de energie.",
      readMore: "Citește articolul",
      minRead: "min de citit",
      noPost: "Niciun articol disponibil momentan.",
      allCategories: "Toate",
      articlesCount: (n: number) => `${n} articol${n === 1 ? "" : "e"}`,
      featured: "Articol recomandat",
    },
  };
  const l = isRo ? labels.ro : labels.it;
  const blogBase = isRo ? "/ro/blog" : "/blog";

  // Build category list
  const categories = ["all", ...Array.from(new Set(allPosts.map((p) => p.category)))];
  const filtered = activeCategory === "all" ? allPosts : allPosts.filter((p) => p.category === activeCategory);
  const [featured, ...rest] = filtered;

  return (
    <>
      <SeoHead
        title={isRo ? "Blog Ferestre PVC — Ghiduri și Sfaturi ThermoDMR" : "Blog Finestre PVC — Guide, Consigli e Prezzi 2025"}
        description={isRo
          ? "Ghiduri practice, comparații tehnice și articole despre ferestre PVC, izolare termică și economie de energie. Blog oficial ThermoDMR."
          : "Guide pratiche, confronti tecnici e articoli su finestre PVC, isolamento termico, prezzi e risparmio energetico. Blog ufficiale ThermoDMR."
        }
        canonical={isRo ? "/ro/blog" : "/blog"}
        lang={lang}
        hreflangIt="/blog"
        hreflangRo="/ro/blog"
        keywords={isRo
          ? "blog ferestre PVC, ghid ferestre, izolare termică, economie energie, ThermoDMR"
          : "blog finestre PVC, guida finestre, isolamento termico, risparmio energetico, prezzi finestre 2025, ThermoDMR"
        }
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": isRo ? "Blog ThermoDMR — Ferestre PVC" : "Blog ThermoDMR — Finestre PVC",
          "description": isRo
            ? "Ghiduri practice și articole tehnice despre ferestre PVC, izolare termică și economie de energie."
            : "Guide pratiche e articoli tecnici su finestre PVC, isolamento termico e risparmio energetico.",
          "url": isRo ? "https://thermodmr.com/ro/blog" : "https://thermodmr.com/blog",
          "publisher": {
            "@type": "Organization",
            "name": "ThermoDMR",
            "url": "https://thermodmr.com",
            "logo": { "@type": "ImageObject", "url": "https://thermodmr.com/logo_Thermodmr.png" }
          },
          "inLanguage": isRo ? "ro-RO" : "it-IT"
        }}
      />
      <PublicNavbar />

      <main className="min-h-screen bg-gray-50">
        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <section className="bg-[hsl(0,0%,6%)] pt-28 pb-20 relative overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[hsl(195,85%,45%)] opacity-[0.07] blur-[120px] pointer-events-none" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
            <motion.div {...fadeUp} className="text-center">
              <span className="inline-flex items-center gap-2 text-[hsl(195,85%,55%)] text-xs font-bold uppercase tracking-[3px] mb-5">
                <BookOpen className="h-3.5 w-3.5" />
                {l.tag}
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-4">
                {l.title}{" "}
                <span className="text-[hsl(195,85%,55%)]">{l.titleHighlight}</span>
              </h1>
              <p className="text-white/45 text-lg max-w-2xl mx-auto leading-relaxed">
                {l.subtitle}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Category filters ─────────────────────────────────────────── */}
        <div className="sticky top-[72px] z-20 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 overflow-x-auto scrollbar-none">
            {categories.map((cat) => (
              <CategoryPill
                key={cat}
                label={cat === "all" ? l.allCategories : cat}
                active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              />
            ))}
            <span className="ml-auto shrink-0 text-xs text-gray-400 font-medium">
              {l.articlesCount(filtered.length)}
            </span>
          </div>
        </div>

        {/* ── Content ──────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-400 py-20">{l.noPost}</p>
          ) : (
            <div className="space-y-10">
              {/* Featured */}
              {featured && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-[2px] text-gray-400 mb-4 flex items-center gap-2">
                    <span className="w-6 h-px bg-gray-300 inline-block" />
                    {l.featured}
                  </p>
                  <FeaturedCard post={featured} blogBase={blogBase} labels={l} />
                </div>
              )}

              {/* Grid */}
              {rest.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post, i) => (
                    <ArticleCard
                      key={post.slug}
                      post={post}
                      blogBase={blogBase}
                      labels={l}
                      index={i}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </section>

        {/* ── CTA bottom ───────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[hsl(0,0%,8%)] rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center gap-6 justify-between"
          >
            <div>
              <p className="text-white font-bold text-xl mb-1">
                {isRo ? "Vrei o ofertă pentru fereastra ta?" : "Vuoi un preventivo per le tue finestre?"}
              </p>
              <p className="text-white/40 text-sm">
                {isRo ? "Răspundem în 24 de ore." : "Rispondiamo entro 24 ore."}
              </p>
            </div>
            <Link
              to={isRo ? "/ro/contact" : "/contatti"}
              className="shrink-0 inline-flex items-center gap-2 bg-[hsl(195,85%,45%)] hover:bg-[hsl(195,85%,38%)] text-white font-semibold px-7 py-3.5 rounded-xl transition-all hover:gap-3"
            >
              {isRo ? "Solicită ofertă gratuită" : "Richiedi preventivo gratuito"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </section>
      </main>

      <PublicFooter />
    </>
  );
};

export default BlogList;
