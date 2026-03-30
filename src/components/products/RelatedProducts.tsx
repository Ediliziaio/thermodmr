import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

import { fadeUp, stagger } from "@/lib/animations";

interface Product {
  name: string;
  slugIt: string;
  slugRo: string;
  image: string;
  shortIt: string;
  shortRo: string;
}

const allProducts: Product[] = [
  { name: "DMR CONFORT", slugIt: "/prodotti/dmr-confort", slugRo: "/ro/produse/dmr-confort", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", shortIt: "3 camere · Miglior prezzo", shortRo: "3 camere · Cel mai bun preț" },
  { name: "DMR DOMUS", slugIt: "/prodotti/dmr-domus", slugRo: "/ro/produse/dmr-domus", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", shortIt: "5 camere · Best seller", shortRo: "5 camere · Best seller" },
  { name: "DMR PASSIVE", slugIt: "/prodotti/dmr-passive", slugRo: "/ro/produse/dmr-passive", image: "https://images.unsplash.com/photo-1600566753376-12c8ab7c5a38?w=600&q=80", shortIt: "7 camere · Passivhaus", shortRo: "7 camere · Passivhaus" },
  { name: "Portoncini", slugIt: "/prodotti/portoncini", slugRo: "/ro/produse/usi-intrare", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80", shortIt: "Sicurezza RC2", shortRo: "Securitate RC2" },
  { name: "Tapparelle", slugIt: "/prodotti/tapparelle", slugRo: "/ro/produse/jaluzele", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80", shortIt: "Motorizzate smart", shortRo: "Motorizate smart" },
  { name: "Persiane", slugIt: "/prodotti/persiane", slugRo: "/ro/produse/obloane", image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=600&q=80", shortIt: "Alluminio zero manutenzione", shortRo: "Aluminiu zero întreținere" },
  { name: "Cassonetti", slugIt: "/prodotti/cassonetti", slugRo: "/ro/produse/casete-rulou", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80", shortIt: "Zero ponti termici", shortRo: "Zero punți termice" },
];

interface RelatedProductsProps {
  currentSlug: string;
}

const RelatedProducts = ({ currentSlug }: RelatedProductsProps) => {
  const { lang, t } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const related = allProducts
    .filter((p) => p.slugIt !== currentSlug && p.slugRo !== currentSlug)
    .slice(0, 3);

  return (
    <section ref={ref} className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-bold text-[hsl(0,0%,10%)] mb-8 sm:mb-12 text-center">
            {lang === "ro" ? "Descoperă și" : "Scopri Anche"}
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {related.map((p) => {
              const slug = lang === "ro" ? p.slugRo : p.slugIt;
              const short = lang === "ro" ? p.shortRo : p.shortIt;
              return (
                <motion.div key={slug} variants={fadeUp}>
                  <Link to={slug} className="group block rounded-2xl overflow-hidden border border-[hsl(0,0%,92%)] shadow-sm hover:shadow-lg transition-shadow">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-[hsl(0,0%,10%)] group-hover:text-[hsl(195,85%,45%)] transition-colors">{p.name}</h3>
                      <p className="text-xs text-[hsl(0,0%,50%)] mt-1">{short}</p>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[hsl(195,85%,45%)] mt-3">
                        {t.cta.scopriDiPiu} <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RelatedProducts;
