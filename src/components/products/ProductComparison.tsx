import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import { fadeUp, stagger } from "@/lib/animations";

interface ModelData {
  name: string;
  slug: string;
  badge?: string;
  badgeColor?: string;
  specs: Record<string, string>;
}

const models: ModelData[] = [
  {
    name: "DMR CONFORT",
    slug: "/prodotti/dmr-confort",
    badge: "Miglior Prezzo",
    badgeColor: "hsl(145, 60%, 40%)",
    specs: {
      Camere: "5",
      "Profondità": "72 mm",
      "Uw": "1.3 W/m²K",
      Vetro: "fino a 49 mm",
      Acustica: "46 dB",
      Sicurezza: "Anti-effrazione",
    },
  },
  {
    name: "DMR DOMUS",
    slug: "/prodotti/dmr-domus",
    badge: "Best Seller",
    badgeColor: "hsl(195, 85%, 45%)",
    specs: {
      Camere: "6",
      "Profondità": "76 mm",
      "Uw": "1.1 W/m²K",
      Vetro: "Doppio Lowe + argon",
      Acustica: "47 dB",
      Sicurezza: "Fino a RC3",
    },
  },
  {
    name: "DMR PASSIVE",
    slug: "/prodotti/dmr-passive",
    badge: "Top di Gamma",
    badgeColor: "hsl(40, 70%, 45%)",
    specs: {
      Camere: "7",
      "Profondità": "82 mm",
      "Uw": "0.8 W/m²K",
      Vetro: "Triplo basso emissivo",
      Acustica: "45 dB",
      Sicurezza: "RC2 + perimetrale",
    },
  },
];

const specKeys = ["Camere", "Profondità", "Uw", "Vetro", "Acustica", "Sicurezza"];

interface ProductComparisonProps {
  currentSlug: string;
}

const ProductComparison = ({ currentSlug }: ProductComparisonProps) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05, rootMargin: "0px 0px -50px 0px" });

  return (
    <section ref={ref} className="py-16 sm:py-24 bg-[hsl(0,0%,97%)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-bold text-[hsl(0,0%,10%)] mb-4 text-center">
            Confronta i Modelli
          </motion.h2>
          <motion.p variants={fadeUp} className="text-sm text-[hsl(0,0%,45%)] text-center mb-8 sm:mb-12">
            Scopri le differenze tra le nostre finestre in PVC e scegli quella giusta per te.
          </motion.p>

          {/* Desktop table */}
          <motion.div variants={fadeUp} className="hidden md:block overflow-hidden rounded-2xl border border-[hsl(0,0%,90%)] bg-white shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[hsl(0,0%,92%)]">
                  <th className="text-left text-xs font-bold text-[hsl(0,0%,45%)] uppercase tracking-wider p-4 w-1/4" />
                  {models.map((m) => (
                    <th
                      key={m.name}
                      className={`text-center p-4 ${m.slug === currentSlug ? "bg-[hsl(195,85%,45%,0.06)]" : ""}`}
                    >
                      <p className="text-sm font-bold text-[hsl(0,0%,10%)]">{m.name}</p>
                      {m.badge && (
                        <span className="inline-block text-[10px] font-bold mt-1" style={{ color: m.badgeColor || "hsl(195,85%,45%)" }}>{m.badge}</span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {specKeys.map((key, idx) => (
                  <tr key={key} className={idx < specKeys.length - 1 ? "border-b border-[hsl(0,0%,95%)]" : ""}>
                    <td className="text-xs font-semibold text-[hsl(0,0%,40%)] uppercase tracking-wider p-4">{key}</td>
                    {models.map((m) => (
                      <td
                        key={m.name}
                        className={`text-center p-4 text-sm font-medium text-[hsl(0,0%,20%)] ${m.slug === currentSlug ? "bg-[hsl(195,85%,45%,0.06)]" : ""}`}
                      >
                        {m.specs[key]}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="border-t border-[hsl(0,0%,90%)]">
                  <td />
                  {models.map((m) => (
                    <td key={m.name} className={`text-center p-4 ${m.slug === currentSlug ? "bg-[hsl(195,85%,45%,0.06)]" : ""}`}>
                      {m.slug === currentSlug ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-[hsl(195,85%,45%)]">
                          <CheckCircle2 className="h-4 w-4" /> Stai visualizzando
                        </span>
                      ) : (
                        <Link to={m.slug}>
                          <Button variant="outline" size="sm" className="rounded-full text-xs border-[hsl(195,85%,45%)] text-[hsl(195,85%,45%)] hover:bg-[hsl(195,85%,45%,0.08)]">
                            Scopri <ArrowRight className="ml-1 h-3 w-3" />
                          </Button>
                        </Link>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </motion.div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-4">
            {models.filter((m) => m.slug !== currentSlug).map((m) => (
              <motion.div key={m.name} variants={fadeUp} className="bg-white rounded-2xl p-5 border border-[hsl(0,0%,92%)] shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-bold text-[hsl(0,0%,10%)]">{m.name}</p>
                  {m.badge && <span className="text-[10px] font-bold" style={{ color: m.badgeColor || "hsl(195,85%,45%)" }}>{m.badge}</span>}
                </div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {specKeys.map((key) => (
                    <div key={key}>
                      <p className="text-[10px] text-[hsl(0,0%,50%)] uppercase tracking-wider">{key}</p>
                      <p className="text-sm font-semibold text-[hsl(0,0%,15%)]">{m.specs[key]}</p>
                    </div>
                  ))}
                </div>
                <Link to={m.slug}>
                  <Button variant="outline" size="sm" className="w-full rounded-full text-xs border-[hsl(195,85%,45%)] text-[hsl(195,85%,45%)]">
                    Scopri {m.name} <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductComparison;
