import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, CheckCircle2, Shield, Lock, ThermometerSun } from "lucide-react";
import imgPortoncinoIngresso from "@/assets/thermodmr-portoncino-ingresso.avif";
import imgPortoncinoModerno from "@/assets/thermodmr-portoncino-moderno.jpeg";
import imgPortonciniColori from "@/assets/thermodmr-portoncini-colori.jpg";
import { Button } from "@/components/ui/button";
import PublicNavbar from "@/components/PublicNavbar";
import { useLanguage } from "@/i18n/LanguageContext";
import PublicFooter from "@/components/PublicFooter";
import SeoHead from "@/components/SeoHead";
import ProductHero from "@/components/products/ProductHero";
import ProductGallery from "@/components/products/ProductGallery";
import RelatedProducts from "@/components/products/RelatedProducts";

const galleryImages = [
  { src: imgPortoncinoModerno, alt: "Portoncino blindato PVC ThermoDMR moderno con pannello decorativo premium - sicurezza classe 3", caption: "Portoncino d'ingresso con pannello decorativo premium" },
  { src: imgPortonciniColori, alt: "Portoncini in PVC ThermoDMR disponibili in oltre 40 colori RAL - personalizzazione totale", caption: "Ampia gamma di colori e finiture" },
  { src: imgPortoncinoIngresso, alt: "Portoncino ingresso elegante ThermoDMR - isolamento termoacustico superiore e design personalizzato", caption: "Eleganza e sicurezza per ogni ingresso" },
];

import { fadeUp, stagger, inViewOptions as inViewOpts } from "@/lib/animations";

const benefitIcons = [Lock, ThermometerSun, Shield];

const Portoncini = () => {
  const { t, lang } = useLanguage();
  const isRo = lang === "ro";
  const contattiLink = lang === "ro" ? "/ro/contact" : "/contatti";
  const [specsRef, specsInView] = useInView(inViewOpts);
  const [benefitsRef, benefitsInView] = useInView(inViewOpts);
  const p = t.products.portoncini;

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title={isRo ? "Uși de Intrare PVC ThermoDMR — Securitate și Design" : "Portoncini Blindati PVC ThermoDMR — Sicurezza e Design"}
        description={isRo ? "Uși de intrare PVC ThermoDMR: securitate maximă, izolare termoacustică, personalizabile. Garanție 15 ani. Solicită ofertă gratuită." : "Portoncini blindati in PVC ThermoDMR: massima sicurezza, isolamento termoacustico, personalizzabili. Garanzia 15 anni. Richiedi preventivo gratuito."}
        canonical={isRo ? "/ro/produse/usi-intrare" : "/prodotti/portoncini"}
        lang={lang}
        hreflangIt="/prodotti/portoncini"
        hreflangRo="/ro/produse/usi-intrare"
        keywords={isRo ? "uși intrare PVC, ușă blindată, izolare termoacustică, securitate clasă 3, ThermoDMR" : "portoncini blindati PVC, isolamento termoacustico, sicurezza classe 3, portoncino ingresso, ThermoDMR"}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": isRo ? "Ușă de Intrare PVC ThermoDMR — Securitate și Design" : "Portoncino Blindato PVC ThermoDMR — Sicurezza e Design",
          "description": isRo ? "Uși de intrare PVC cu securitate maximă, izolare termoacustică superioară, personalizabile în culori RAL. Garanție 15 ani." : "Portoncini blindati in PVC con massima sicurezza, isolamento termoacustico superiore, personalizzabili in colori RAL. Garanzia 15 anni.",
          "brand": { "@type": "Brand", "name": "ThermoDMR" },
          "manufacturer": { "@type": "Organization", "@id": "https://thermodmr.com/#organization", "name": "MARYSORYNA SRL", "url": "https://thermodmr.com" },
          "url": isRo ? "https://thermodmr.com/ro/produse/usi-intrare" : "https://thermodmr.com/prodotti/portoncini",
          "image": "https://thermodmr.com/images/thermodmr-portoncino-ingresso.avif",
          "category": "Portoncini",
          "offers": {
            "@type": "Offer",
            "priceCurrency": "EUR",
            "priceRange": "Su richiesta",
            "availability": "https://schema.org/InStock",
            "url": isRo ? "https://thermodmr.com/ro/contact" : "https://thermodmr.com/contatti",
            "seller": { "@type": "Organization", "name": "ThermoDMR" }
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "bestRating": "5",
            "reviewCount": "23"
          }
        }}
      />
      <PublicNavbar />

      <ProductHero
        category={p.category}
        title={p.title}
        titleAccent={p.titleAccent}
        description={p.description}
        heroImage={imgPortoncinoIngresso}
      />

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative rounded-3xl overflow-hidden shadow-xl">
              <img src={imgPortoncinoIngresso} alt="Portoncino d'ingresso elegante" className="w-full aspect-[4/3] object-cover" loading="lazy" />
              <div className="absolute bottom-4 left-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[hsl(195,85%,45%)] text-white shadow-lg">
                <Shield className="h-6 w-6" />
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

      <RelatedProducts currentSlug="/prodotti/portoncini" />

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

export default Portoncini;
