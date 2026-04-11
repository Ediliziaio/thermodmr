import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, CheckCircle2, Box, ThermometerSun, Wrench, Ruler } from "lucide-react";
import imgCassonettoSezione from "@/assets/thermodmr-cassonetto-sezione.jpg";
import imgCassonettoInstallato from "@/assets/thermodmr-cassonetto-installato.jpg";
import { Button } from "@/components/ui/button";
import PublicNavbar from "@/components/PublicNavbar";
import { useLanguage } from "@/i18n/LanguageContext";
import PublicFooter from "@/components/PublicFooter";
import SeoHead from "@/components/SeoHead";
import ProductHero from "@/components/products/ProductHero";
import ProductGallery from "@/components/products/ProductGallery";
import RelatedProducts from "@/components/products/RelatedProducts";

const galleryImages = [
  { src: imgCassonettoInstallato, alt: "Cassonetto coibentato ThermoDMR installato a filo muro - eliminazione ponti termici certificata", caption: "Cassonetto integrato nella muratura" },
  { src: imgCassonettoSezione, alt: "Sezione tecnica cassonetto coibentato ThermoDMR - EPS ad alta densità per isolamento superiore", caption: "Coibentazione in EPS ad alta densità" },
  { src: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&q=80", alt: "Cassonetto tapparella ThermoDMR - ispezione frontale facilitata per manutenzione semplice", caption: "Ispezione frontale facilitata" },
  { src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80", alt: "Facciata moderna con cassonetto a filo muro ThermoDMR - estetica pulita e risparmio energetico", caption: "Finitura a filo muro per estetica pulita" },
];

import { fadeUp, stagger, inViewOptions as inViewOpts } from "@/lib/animations";

const benefitIcons = [ThermometerSun, Wrench, Ruler];

const Cassonetti = () => {
  const { t, lang } = useLanguage();
  const isRo = lang === "ro";
  const contattiLink = lang === "ro" ? "/ro/contact" : "/contatti";
  const [specsRef, specsInView] = useInView(inViewOpts);
  const [benefitsRef, benefitsInView] = useInView(inViewOpts);
  const p = t.products.cassonetti;

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title={isRo ? "Casete Rulou Termoizolate ThermoDMR — Izolare Superioară" : "Cassonetti Coibentati ThermoDMR — Isolamento Superiore"}
        description={isRo ? "Casete rulou termoizolate ThermoDMR: elimină punții termice, îmbunătățește izolarea și reduce consumul energetic. Calitate garantată." : "Cassonetti coibentati ThermoDMR per avvolgibili e tapparelle: elimina i ponti termici, migliora l'isolamento e riduce i consumi energetici."}
        canonical={isRo ? "/ro/produse/casete-rulou" : "/prodotti/cassonetti"}
        lang={lang}
        hreflangIt="/prodotti/cassonetti"
        hreflangRo="/ro/produse/casete-rulou"
        keywords={isRo ? "casete rulou termoizolate, punți termice, izolare EPS, economie energie, ThermoDMR" : "cassonetti coibentati, ponti termici, isolamento EPS, risparmio energetico, tapparelle, ThermoDMR"}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": isRo ? "Casete Rulou Termoizolate ThermoDMR" : "Cassonetti Coibentati ThermoDMR",
          "description": isRo ? "Casete rulou termoizolate care elimină punții termice și reduc consumul energetic. Fabricate din EPS de înaltă densitate." : "Cassonetti coibentati in EPS ad alta densità che eliminano i ponti termici e riducono i consumi energetici.",
          "brand": { "@type": "Brand", "name": "ThermoDMR" },
          "manufacturer": { "@type": "Organization", "name": "MARYSORYNA SRL", "url": "https://thermodmr.com" },
          "url": isRo ? "https://thermodmr.com/ro/produse/casete-rulou" : "https://thermodmr.com/prodotti/cassonetti",
          "image": "https://thermodmr.com/images/thermodmr-cassonetto-installato.jpg",
          "category": "Cassonetti",
          "offers": {
            "@type": "Offer",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock",
            "url": isRo ? "https://thermodmr.com/ro/contact" : "https://thermodmr.com/contatti",
            "seller": { "@type": "Organization", "name": "ThermoDMR" }
          }
        }}
      />
      <PublicNavbar />

      <ProductHero
        category={p.category}
        title={p.title}
        titleAccent={p.titleAccent}
        description={p.description}
        heroImage={imgCassonettoSezione}
      />

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative rounded-3xl overflow-hidden shadow-xl">
              <img src={imgCassonettoInstallato} alt="Cassonetto coibentato" className="w-full aspect-[4/3] object-cover" loading="lazy" />
              <div className="absolute bottom-4 left-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[hsl(195,85%,45%)] text-white shadow-lg">
                <Box className="h-6 w-6" />
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-[hsl(0,0%,10%)]">{t.products.caratteristichePrincipali}</h2>
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

      <RelatedProducts currentSlug="/prodotti/cassonetti" />

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

export default Cassonetti;
