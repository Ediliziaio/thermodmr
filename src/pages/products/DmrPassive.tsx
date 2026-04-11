import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ArrowRight,
  CheckCircle2,
  Crown,
  ThermometerSun,
  Shield,
  Leaf,
  Wind,
  Lock,
  Settings2,
  Thermometer,
  RotateCcw,
  Maximize2,
  Palette,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PublicNavbar from "@/components/PublicNavbar";
import { useLanguage } from "@/i18n/LanguageContext";
import PublicFooter from "@/components/PublicFooter";
import SeoHead from "@/components/SeoHead";
import ProductHero from "@/components/products/ProductHero";
import ProductGallery from "@/components/products/ProductGallery";
import ProductComparison from "@/components/products/ProductComparison";
import RelatedProducts from "@/components/products/RelatedProducts";

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1600566753376-12c8ab7c5a38?w=1200&q=80", alt: "Finestra PVC DMR Passive per casa passiva - architettura contemporanea con profilo tedesco", caption: "Integrazione perfetta in architetture moderne" },
  { src: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200&q=80", alt: "Finestra DMR Passive classe energetica A+ - prestazioni certificate Passivhaus ThermoDMR", caption: "Prestazioni certificate Passivhaus" },
  { src: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80", alt: "Triplo vetro basso emissivo DMR Passive - doppio gas argon isolamento termico massimo", caption: "Triplo vetro basso emissivo con doppio gas argon" },
  { src: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=1200&q=80", alt: "Finestra PVC DMR Passive villa moderna - design minimale profilo a vista ridotta ThermoDMR", caption: "Design minimale con profili a vista ridotta" },
];

import { fadeUp, stagger, inViewOptions as inViewOpts } from "@/lib/animations";

const windowAdvantageIcons = [Wind, Lock, Settings2, Thermometer, RotateCcw, Maximize2];

const availableColors = [
  { name: "Bianco", color: "hsl(0, 0%, 98%)", border: true },
  { name: "Rovere Dorato", color: "hsl(35, 55%, 55%)" },
  { name: "Noce", color: "hsl(25, 45%, 35%)" },
  { name: "Antracite", color: "hsl(0, 0%, 25%)" },
  { name: "Grigio Chiaro", color: "hsl(0, 0%, 78%)" },
  { name: "Verde Scuro", color: "hsl(140, 30%, 25%)" },
  { name: "Bianco Crema", color: "hsl(40, 30%, 90%)", border: true },
  { name: "Jet Black", color: "hsl(0, 0%, 8%)" },
];

const benefitIcons = [ThermometerSun, Leaf, Shield];

const DmrPassive = () => {
  const { t, lang } = useLanguage();
  const isRo = lang === "ro";
  const contattiLink = lang === "ro" ? "/ro/contact" : "/contatti";
  const [specsRef, specsInView] = useInView(inViewOpts);
  const [benefitsRef, benefitsInView] = useInView(inViewOpts);
  const [advantagesRef, advantagesInView] = useInView(inViewOpts);
  const [colorsRef, colorsInView] = useInView(inViewOpts);
  const p = t.products.dmrPassive;

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title={isRo ? "DMR Passive — Fereastră PVC pentru Case Pasive Clasa A+" : "DMR Passive — Finestra PVC per Case Passive e Classe A+"}
        description={isRo ? "Fereastra DMR Passive de la ThermoDMR: izolare termică maximă, certificată pentru case pasive și clasa energetică A+. Vârful gamei ThermoDMR." : "La finestra DMR Passive di ThermoDMR: massimo isolamento termico, certificata per case passive e classe energetica A+. Il top della gamma ThermoDMR."}
        canonical={isRo ? "/ro/produse/dmr-passive" : "/prodotti/dmr-passive"}
        lang={lang}
        hreflangIt="/prodotti/dmr-passive"
        hreflangRo="/ro/produse/dmr-passive"
        keywords={isRo ? "fereastră PVC casă pasivă, clasa energetică A+, triplu vitraj argon, Passivhaus, DMR Passive, ThermoDMR" : "finestra PVC casa passiva, classe energetica A+, triplo vetro argon, Passivhaus, DMR Passive, ThermoDMR"}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": isRo ? "Fereastră PVC DMR Passive — Casă Pasivă Clasa A+" : "Finestra PVC DMR Passive — Casa Passiva Classe A+",
          "description": isRo ? "Fereastră PVC cu izolare termică maximă, certificată pentru case pasive și clasa A+. Triplu vitraj cu argon." : "Finestra PVC a massimo isolamento termico, certificata per case passive e classe energetica A+. Triplo vetro con argon.",
          "brand": { "@type": "Brand", "name": "ThermoDMR" },
          "manufacturer": { "@type": "Organization", "name": "MARYSORYNA SRL", "url": "https://thermodmr.com" },
          "url": isRo ? "https://thermodmr.com/ro/produse/dmr-passive" : "https://thermodmr.com/prodotti/dmr-passive",
          "image": "https://images.unsplash.com/photo-1600566753376-12c8ab7c5a38?w=1200&q=80",
          "category": "Finestre PVC",
          "offers": {
            "@type": "Offer",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock",
            "url": isRo ? "https://thermodmr.com/ro/contact" : "https://thermodmr.com/contatti",
            "seller": { "@type": "Organization", "name": "ThermoDMR" }
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "bestRating": "5",
            "reviewCount": "29"
          }
        }}
      />
      <PublicNavbar />

      <ProductHero
        category={p.category}
        title="DMR"
        titleAccent="PASSIVE"
        description={p.description}
        heroImage="https://images.unsplash.com/photo-1600566753376-12c8ab7c5a38?w=1600&q=80"
        badge={{ label: t.prodottiPubblico.badgeLabels.passive, color: "purple" }}
      />

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative rounded-3xl overflow-hidden shadow-xl">
              <img src="https://images.unsplash.com/photo-1600566753376-12c8ab7c5a38?w=800&q=80" alt="DMR PASSIVE - Edificio contemporaneo" className="w-full aspect-[4/3] object-cover" loading="lazy" />
              <div className="absolute bottom-4 left-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[hsl(195,85%,45%)] text-white shadow-lg">
                <Crown className="h-6 w-6" />
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-[hsl(0,0%,10%)]">{p.mainTitle}</h2>
              <p className="text-[hsl(0,0%,40%)] leading-relaxed">{p.mainDesc}</p>
              <ul className="space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-[hsl(0,0%,35%)]">
                    <CheckCircle2 className="h-5 w-5 text-[hsl(195,85%,45%)] shrink-0" />
                    <span className="text-sm font-medium">{f}</span>
                  </li>
                ))}
              </ul>
              <Link to={contattiLink}>
                <Button className="bg-[hsl(195,85%,45%)] hover:bg-[hsl(195,85%,38%)] text-white font-semibold rounded-full px-8 mt-2 shadow-[0_4px_20px_hsl(195,85%,45%,0.25)]">
                  {t.cta.richiediPreventivo} <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ProductGallery images={galleryImages.map((img, i) => ({ ...img, caption: p.galleryCaptions[i] }))} />

      {/* Specs */}
      <section ref={specsRef} className="py-16 sm:py-24 bg-[hsl(0,0%,97%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" animate={specsInView ? "visible" : "hidden"} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-bold text-[hsl(0,0%,10%)] mb-8 sm:mb-12 text-center">{t.products.specificheTecniche}</motion.h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {p.specs.map((s) => (
                <motion.div key={s.label} variants={fadeUp} className="bg-white rounded-2xl p-6 shadow-sm border border-[hsl(0,0%,92%)]">
                  <p className="text-xs font-bold tracking-wider text-[hsl(195,85%,45%)] uppercase mb-1">{s.label}</p>
                  <p className="text-2xl font-bold text-[hsl(0,0%,10%)]">{s.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Window Advantages */}
      <section ref={advantagesRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" animate={advantagesInView ? "visible" : "hidden"} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <p className="text-xs font-bold tracking-[0.3em] text-[hsl(195,85%,45%)] uppercase mb-3">{t.products.dettagliTecnici}</p>
              <h2 className="text-3xl font-bold text-[hsl(0,0%,10%)]">{t.products.vantaggiFinestra}</h2>
              <p className="text-[hsl(0,0%,45%)] mt-3 max-w-2xl mx-auto">
                {lang === "ro"
                  ? "Fiecare detaliu al DMR PASSIVE este proiectat pentru performanțe maxime, securitate și confort superior."
                  : "Ogni dettaglio del DMR PASSIVE è progettato per prestazioni ai massimi livelli, sicurezza e comfort abitativo superiore."}
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {p.windowAdvantages.map((adv, i) => {
                const Icon = windowAdvantageIcons[i];
                return (
                  <motion.div
                    key={adv.title}
                    variants={fadeUp}
                    className="group bg-[hsl(0,0%,97%)] rounded-2xl p-7 border border-[hsl(0,0%,92%)] hover:border-[hsl(195,85%,45%,0.3)] hover:shadow-lg transition-all duration-300"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[hsl(195,85%,45%,0.1)] group-hover:bg-[hsl(195,85%,45%,0.15)] transition-colors mb-4">
                      <Icon className="h-6 w-6 text-[hsl(195,85%,45%)]" />
                    </div>
                    <h3 className="text-lg font-bold text-[hsl(0,0%,10%)] mb-2">{adv.title}</h3>
                    <p className="text-sm text-[hsl(0,0%,40%)] leading-relaxed">{adv.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Available Colors */}
      <section ref={colorsRef} className="py-16 sm:py-24 bg-[hsl(0,0%,97%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" animate={colorsInView ? "visible" : "hidden"} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-10 sm:mb-14">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[hsl(195,85%,45%,0.1)] mb-4">
                <Palette className="h-6 w-6 text-[hsl(195,85%,45%)]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[hsl(0,0%,10%)]">{t.products.coloriDisponibili}</h2>
              <p className="text-[hsl(0,0%,45%)] mt-3 max-w-2xl mx-auto text-sm sm:text-base">{p.coloriDesc}</p>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {availableColors.map((c, i) => (
                <motion.div key={c.name} variants={fadeUp} className="flex flex-col items-center gap-3">
                  <div
                    className="w-20 h-20 rounded-2xl shadow-md transition-transform hover:scale-110"
                    style={{
                      backgroundColor: c.color,
                      border: c.border ? "2px solid hsl(0, 0%, 85%)" : "none",
                    }}
                  />
                  <span className="text-sm font-medium text-[hsl(0,0%,25%)]">{t.products.colorNames[i]}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section ref={benefitsRef} className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" animate={benefitsInView ? "visible" : "hidden"} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-bold text-[hsl(0,0%,10%)] mb-8 sm:mb-12 text-center">{t.products.vantaggiChiave}</motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {p.benefits.map((b, i) => {
                const Icon = benefitIcons[i];
                return (
                  <motion.div key={b.title} variants={fadeUp} className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[hsl(195,85%,45%,0.1)]">
                      <Icon className="h-7 w-7 text-[hsl(195,85%,45%)]" />
                    </div>
                    <h3 className="text-xl font-bold text-[hsl(0,0%,10%)]">{b.title}</h3>
                    <p className="text-sm text-[hsl(0,0%,40%)] leading-relaxed">{b.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      <ProductComparison currentSlug="/prodotti/dmr-passive" />

      <RelatedProducts currentSlug="/prodotti/dmr-passive" />

      <section className="py-16 sm:py-20 bg-[hsl(195,85%,45%)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{p.ctaTitle}</h2>
          <p className="text-white/80 mb-6 sm:mb-8 text-sm sm:text-base">{t.products.ctaContactDesc}</p>
          <Link to={contattiLink}>
            <Button className="w-full sm:w-auto bg-white text-[hsl(195,85%,45%)] hover:bg-white/90 font-semibold rounded-full px-10 py-3 text-base sm:text-lg shadow-xl min-h-[48px]">
              {t.cta.richiediPreventivo} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};

export default DmrPassive;
