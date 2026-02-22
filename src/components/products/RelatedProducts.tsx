import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

interface Product {
  name: string;
  slug: string;
  image: string;
  short: string;
}

const allProducts: Product[] = [
  { name: "DMR CONFORT", slug: "/prodotti/dmr-confort", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", short: "3 camere · Miglior prezzo" },
  { name: "DMR DOMUS", slug: "/prodotti/dmr-domus", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", short: "5 camere · Best seller" },
  { name: "DMR PASSIVE", slug: "/prodotti/dmr-passive", image: "https://images.unsplash.com/photo-1600566753376-12c8ab7c5a38?w=600&q=80", short: "7 camere · Passivhaus" },
  { name: "Portoncini", slug: "/prodotti/portoncini", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80", short: "Sicurezza RC2" },
  { name: "Tapparelle", slug: "/prodotti/tapparelle", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80", short: "Motorizzate smart" },
  { name: "Persiane", slug: "/prodotti/persiane", image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=600&q=80", short: "Alluminio zero manutenzione" },
  { name: "Cassonetti", slug: "/prodotti/cassonetti", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80", short: "Zero ponti termici" },
];

interface RelatedProductsProps {
  currentSlug: string;
}

const RelatedProducts = ({ currentSlug }: RelatedProductsProps) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const related = allProducts.filter((p) => p.slug !== currentSlug).slice(0, 3);

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}>
          <motion.h2 variants={fadeUp} className="text-3xl font-bold text-[hsl(0,0%,10%)] mb-12 text-center">
            Scopri Anche
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {related.map((p) => (
              <motion.div key={p.slug} variants={fadeUp}>
                <Link to={p.slug} className="group block rounded-2xl overflow-hidden border border-[hsl(0,0%,92%)] shadow-sm hover:shadow-lg transition-shadow">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-[hsl(0,0%,10%)] group-hover:text-[hsl(195,85%,45%)] transition-colors">{p.name}</h3>
                    <p className="text-xs text-[hsl(0,0%,50%)] mt-1">{p.short}</p>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[hsl(195,85%,45%)] mt-3">
                      Scopri di più <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RelatedProducts;
