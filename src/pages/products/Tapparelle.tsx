import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, CheckCircle2, Blinds, Zap, Shield, Smartphone } from "lucide-react";
import imgTapparella from "@/assets/thermodmr-tapparella-coibentata.webp";
import { Button } from "@/components/ui/button";
import PublicNavbar from "@/components/PublicNavbar";
import { useLanguage } from "@/i18n/LanguageContext";
import PublicFooter from "@/components/PublicFooter";
import SeoHead from "@/components/SeoHead";
import ProductHero from "@/components/products/ProductHero";
import ProductGallery from "@/components/products/ProductGallery";
import RelatedProducts from "@/components/products/RelatedProducts";

const galleryImages = [
  { src: imgTapparella, alt: "Tapparella coibentata in alluminio ThermoDMR - risparmio energetico fino al 30% e oscuramento totale", caption: "Tapparella in alluminio coibentato ad alta resistenza" },
  { src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80", alt: "Lamella tapparella coibentata ThermoDMR - dettaglio profilo alluminio con schiuma poliuretanica", caption: "Lamelle in alluminio coibentato ad alta resistenza" },
  { src: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200&q=80", alt: "Tapparelle ThermoDMR su facciata moderna - integrazione estetica e protezione anti-intrusione", caption: "Integrazione estetica con facciate contemporanee" },
];

import { fadeUp, stagger, inViewOptions as inViewOpts } from "@/lib/animations";

const benefitIcons = [Zap, Shield, Smartphone];

const Tapparelle = () => {
  const { t, lang } = useLanguage();
  const isRo = lang === "ro";
  const contattiLink = lang === "ro" ? "/ro/contact" : "/contatti";
  const [specsRef, specsInView] = useInView(inViewOpts);
  const [benefitsRef, benefitsInView] = useInView(inViewOpts);
  const p = t.products.tapparelle;

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title={isRo ? "Jaluzele Termoizolante ThermoDMR — Economie de Energie" : "Tapparelle Coibentate ThermoDMR — Risparmio Energetico"}
        description={isRo ? "Jaluzele termoizolante ThermoDMR: economie de energie până la 30%, oscurare totală, anti-efracție. Disponibile în aluminiu și PVC." : "Tapparelle coibentate ThermoDMR: risparmio energetico fino al 30%, oscuramento totale, anti-intrusione. Disponibili in alluminio e PVC."}
        canonical={isRo ? "/ro/produse/jaluzele" : "/prodotti/tapparelle"}
        lang={lang}
        hreflangIt="/prodotti/tapparelle"
        hreflangRo="/ro/produse/jaluzele"
        keywords={isRo ? "jaluzele termoizolante, aluminiu PVC, economie energie, oscurare totală, ThermoDMR" : "tapparelle coibentate, alluminio PVC, risparmio energetico, oscuramento totale, anti-intrusione, ThermoDMR"}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": isRo ? "Jaluzele Termoizolante ThermoDMR" : "Tapparelle Coibentate ThermoDMR",
          "description": isRo ? "Jaluzele termoizolante: economie de energie până la 30%, oscurare totală, rezistente la efracție. Disponibile în aluminiu și PVC." : "Tapparelle coibentate: risparmio energetico fino al 30%, oscuramento totale, anti-intrusione. In alluminio e PVC.",
          "brand": { "@type": "Brand", "name": "ThermoDMR" },
          "manufacturer": { "@type": "Organization", "@id": "https://thermodmr.com/#organization", "name": "MARYSORYNA SRL", "url": "https://thermodmr.com" },
          "url": isRo ? "https://thermodmr.com/ro/produse/jaluzele" : "https://thermodmr.com/prodotti/tapparelle",
          "image": "https://thermodmr.com/images/thermodmr-tapparella-coibentata.webp",
          "category": "Tapparelle",
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
            "ratingValue": "4.8",
            "bestRating": "5",
            "reviewCount": "31"
          }
        }}
      />
      <PublicNavbar />

      <ProductHero
        category={p.category}
        title={p.title}
        titleAccent={p.titleAccent}
        description={p.description}
        heroImage={imgTapparella}
      />

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative rounded-3xl overflow-hidden shadow-xl">
              <img src={imgTapparella} alt="Tapparelle in alluminio coibentato" className="w-full aspect-[4/3] object-cover" loading="lazy" />
              <div className="absolute bottom-4 left-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[hsl(195,85%,45%)] text-white shadow-lg">
                <Blinds className="h-6 w-6" />
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

      <RelatedProducts currentSlug="/prodotti/tapparelle" />

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

export default Tapparelle;
