import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, ChevronRight } from "lucide-react";
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import SeoHead from "@/components/SeoHead";
import { useLanguage } from "@/i18n/LanguageContext";
import { getBlogPostBySlug, getBlogPostsByLang } from "@/data/blogPosts";
import { fadeUp } from "@/lib/animations";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useLanguage();
  const isRo = lang === "ro";

  const post = slug ? getBlogPostBySlug(slug, lang) : undefined;

  if (!post) return <Navigate to={isRo ? "/ro/blog" : "/blog"} replace />;

  const relatedPosts = getBlogPostsByLang(lang)
    .filter((p) => p.slug !== slug)
    .slice(0, 2);

  const blogBase = isRo ? "/ro/blog" : "/blog";
  const canonicalPath = `${blogBase}/${post.slug}`;
  const hreflangOther = isRo
    ? `/blog/${post.slug}`
    : `/ro/blog/${post.slug}`;

  const labels = {
    back: isRo ? "Înapoi la blog" : "Torna al blog",
    related: isRo ? "Articole similare" : "Articoli correlati",
    readMore: isRo ? "Citește" : "Leggi",
    minRead: isRo ? "min de citit" : "min di lettura",
    cta: isRo
      ? "Solicită o ofertă gratuită"
      : "Richiedi un preventivo gratuito",
    ctaLink: isRo ? "/ro/contact" : "/contatti",
    ctaDesc: isRo
      ? "Ai întrebări? Echipa ThermoDMR îți răspunde în 24 de ore."
      : "Hai domande? Il team ThermoDMR risponde entro 24 ore.",
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "ThermoDMR",
      url: "https://thermodmr.com",
    },
    publisher: {
      "@type": "Organization",
      name: "ThermoDMR",
      logo: {
        "@type": "ImageObject",
        url: "https://thermodmr.com/images/logo_Thermodmr.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://thermodmr.com${canonicalPath}`,
    },
  };

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
        jsonLd={articleJsonLd}
      />
      <PublicNavbar />

      <main className="min-h-screen bg-white">
        {/* Header */}
        <section className="bg-[hsl(0,0%,8%)] pt-28 pb-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <motion.div {...fadeUp}>
              <Link
                to={blogBase}
                className="inline-flex items-center gap-1 text-white/40 hover:text-white/70 text-sm mb-6 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> {labels.back}
              </Link>
              <div className="flex items-center gap-3 text-xs text-white/40 mb-4">
                <span className="bg-white/10 text-white/70 font-semibold px-2 py-0.5 rounded-full">
                  {post.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(post.date).toLocaleDateString(isRo ? "ro-RO" : "it-IT", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readingTime} {labels.minRead}
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold text-white leading-tight">
                {post.title}
              </h1>
              <p className="mt-4 text-white/50 text-lg">{post.description}</p>
            </motion.div>
          </div>
        </section>

        {/* Article body */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <motion.div
            {...fadeUp}
            className="prose prose-lg prose-gray max-w-none
              prose-headings:font-bold prose-headings:text-gray-900
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8
              prose-p:text-gray-600 prose-p:leading-relaxed
              prose-a:text-[hsl(195,85%,40%)] prose-a:no-underline hover:prose-a:underline
              prose-ul:text-gray-600 prose-li:mb-1
              prose-table:text-sm prose-th:bg-gray-50 prose-th:font-semibold
              prose-strong:text-gray-800"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </section>

        {/* CTA Banner */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-12">
          <div className="bg-[hsl(0,0%,8%)] rounded-2xl p-8 text-center">
            <p className="text-white/60 text-sm mb-2">{labels.ctaDesc}</p>
            <Link
              to={labels.ctaLink}
              className="inline-flex items-center gap-2 bg-[hsl(195,85%,45%)] hover:bg-[hsl(195,85%,40%)] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              {labels.cta} <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
            <h2 className="text-xl font-bold text-gray-900 mb-6">{labels.related}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  to={`${blogBase}/${related.slug}`}
                  className="group flex flex-col gap-2 border border-gray-100 rounded-xl p-5 hover:border-[hsl(195,85%,55%)] transition-colors"
                >
                  <span className="text-xs font-semibold text-[hsl(195,85%,40%)]">
                    {related.category}
                  </span>
                  <span className="font-semibold text-gray-900 group-hover:text-[hsl(195,85%,40%)] transition-colors leading-snug">
                    {related.title}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1 mt-auto">
                    {labels.readMore} <ChevronRight className="h-3 w-3" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <PublicFooter />
    </>
  );
};

export default BlogPost;
