import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import SeoHead from "@/components/SeoHead";
import { useLanguage } from "@/i18n/LanguageContext";
import { getBlogPostsByLang } from "@/data/blogPosts";
import { fadeUp, stagger } from "@/lib/animations";

const BlogList = () => {
  const { lang } = useLanguage();
  const isRo = lang === "ro";
  const posts = getBlogPostsByLang(lang);

  const labels = {
    it: {
      tag: "Blog & Guide",
      title: "Finestre, Serramenti e Risparmio Energetico",
      subtitle: "Guide pratiche, consigli tecnici e novità dal mondo dei serramenti in PVC.",
      readMore: "Leggi l'articolo",
      minRead: "min di lettura",
      noPost: "Nessun articolo disponibile al momento.",
    },
    ro: {
      tag: "Blog & Ghiduri",
      title: "Ferestre, Tâmplărie și Economie de Energie",
      subtitle: "Ghiduri practice, sfaturi tehnice și noutăți din lumea tâmplăriei PVC.",
      readMore: "Citește articolul",
      minRead: "min de citit",
      noPost: "Niciun articol disponibil momentan.",
    },
  };
  const l = isRo ? labels.ro : labels.it;
  const blogBase = isRo ? "/ro/blog" : "/blog";

  return (
    <>
      <SeoHead
        title={isRo ? "Blog Ferestre PVC — Ghiduri și Sfaturi ThermoDMR" : "Blog Finestre PVC — Guide e Consigli ThermoDMR"}
        description={isRo
          ? "Ghiduri practice, sfaturi tehnice și articole despre ferestre PVC, izolare termică și economie de energie. Blog oficial ThermoDMR."
          : "Guide pratiche, consigli tecnici e articoli su finestre PVC, isolamento termico e risparmio energetico. Blog ufficiale ThermoDMR."
        }
        canonical={isRo ? "/ro/blog" : "/blog"}
        lang={lang}
        hreflangIt="/blog"
        hreflangRo="/ro/blog"
      />
      <PublicNavbar />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-[hsl(0,0%,8%)] pt-28 pb-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <motion.div {...fadeUp} className="text-center">
              <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-[hsl(195,85%,55%)] mb-4">
                {l.tag}
              </span>
              <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 leading-tight">
                {l.title}
              </h1>
              <p className="text-white/50 text-lg max-w-2xl mx-auto">{l.subtitle}</p>
            </motion.div>
          </div>
        </section>

        {/* Posts grid */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          {posts.length === 0 ? (
            <p className="text-center text-gray-400">{l.noPost}</p>
          ) : (
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {posts.map((post) => (
                <motion.article
                  key={post.slug}
                  variants={fadeUp}
                  className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                      <span className="bg-[hsl(195,85%,96%)] text-[hsl(195,85%,35%)] font-semibold px-2 py-0.5 rounded-full">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.date).toLocaleDateString(isRo ? "ro-RO" : "it-IT", { year: "numeric", month: "long", day: "numeric" })}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 mb-2 leading-snug group-hover:text-[hsl(195,85%,40%)] transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-gray-500 mb-4 flex-1 line-clamp-3">{post.description}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="h-3 w-3" />
                        {post.readingTime} {l.minRead}
                      </span>
                      <Link
                        to={`${blogBase}/${post.slug}`}
                        className="flex items-center gap-1 text-sm font-semibold text-[hsl(195,85%,40%)] hover:text-[hsl(195,85%,30%)] transition-colors"
                        aria-label={`${l.readMore}: ${post.title}`}
                      >
                        {l.readMore} <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </section>
      </main>

      <PublicFooter />
    </>
  );
};

export default BlogList;
