import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Shield, Truck, BadgePercent, Headphones, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import { useLanguage } from "@/i18n/LanguageContext";
import SeoHead from "@/components/SeoHead";

import { fadeUp, stagger, inViewOptions } from "@/lib/animations";

const guaranteeIcons = [Shield, Truck, BadgePercent, Headphones];

const GaranziePage = () => {
  const { t, lang } = useLanguage();
  const [ref, inView] = useInView(inViewOptions);

  const isRo = lang === "ro";
  const contattiLink = lang === "ro" ? "/ro/contact" : "/contatti";

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title={isRo ? "Garanții ThermoDMR — 15 Ani pe Ferestre PVC" : "Garanzie ThermoDMR — 15 Anni su Finestre PVC"}
        description={isRo ? "ThermoDMR oferă 15 ani garanție pe ferestre și tâmplărie PVC. Profil german certificat, asistență post-vânzare, livrare în România și Italia." : "ThermoDMR offre 15 anni di garanzia su finestre e serramenti in PVC. Profilo tedesco certificato, assistenza post-vendita, consegna in tutta Italia."}
        canonical={isRo ? "/ro/garantii" : "/garanzie"}
        lang={lang}
        hreflangIt="/garanzie"
        hreflangRo="/ro/garantii"
        keywords={isRo
          ? "garanție 15 ani ferestre PVC, garanție ThermoDMR, suport post-vânzare, calitate certificată"
          : "garanzia 15 anni finestre PVC, garanzia ThermoDMR, assistenza post-vendita, qualità certificata, profilo tedesco"
        }
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": isRo ? [
            { "@type": "Question", "name": "Câți ani de garanție oferă ThermoDMR?", "acceptedAnswer": { "@type": "Answer", "text": "ThermoDMR oferă 15 ani garanție pe toate produsele din tâmplărie PVC, inclusiv ferestre, uși și accesorii." } },
            { "@type": "Question", "name": "Ce acoperă garanția ThermoDMR?", "acceptedAnswer": { "@type": "Answer", "text": "Garanția acoperă defecte de fabricație, probleme cu profilele PVC, etanșeitate și feroneria. Intervenție gratuită în toată perioada de garanție." } },
            { "@type": "Question", "name": "ThermoDMR livrează în România?", "acceptedAnswer": { "@type": "Answer", "text": "Da, ThermoDMR livrează în toată România și Italia. Avem distribuitori în principalele orașe." } }
          ] : [
            { "@type": "Question", "name": "Quanti anni di garanzia offre ThermoDMR?", "acceptedAnswer": { "@type": "Answer", "text": "ThermoDMR offre 15 anni di garanzia su tutti i prodotti in PVC, incluse finestre, portoncini e accessori." } },
            { "@type": "Question", "name": "Cosa copre la garanzia ThermoDMR?", "acceptedAnswer": { "@type": "Answer", "text": "La garanzia copre difetti di fabbricazione, problemi con i profili PVC, tenuta stagna e ferramenta. Intervento gratuito durante tutto il periodo di garanzia." } },
            { "@type": "Question", "name": "ThermoDMR consegna in tutta Italia?", "acceptedAnswer": { "@type": "Answer", "text": "Sì, ThermoDMR consegna in tutta Italia attraverso la sua rete di rivenditori autorizzati." } }
          ]
        }}
      />
      <PublicNavbar />

      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-14 sm:pb-20 bg-[hsl(0,0%,97%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.3em] text-[hsl(195,85%,45%)] uppercase mb-3 sm:mb-4">
              {t.garanzie.heroTag}
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-2xl sm:text-5xl font-extrabold text-[hsl(0,0%,10%)] leading-tight mb-4 sm:mb-6">
              {t.garanzie.heroTitle}{" "}
              <span className="text-[hsl(195,85%,45%)]">{t.garanzie.heroTitleHighlight}</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-base sm:text-lg text-[hsl(0,0%,40%)] leading-relaxed">
              {t.garanzie.heroDesc}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Guarantees */}
      <section ref={ref} className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-12">
          {t.garanzie.guarantees.map((g, i) => {
            const Icon = guaranteeIcons[i];
            return (
              <motion.div
                key={g.title}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeUp}
                className="grid lg:grid-cols-2 gap-6 sm:gap-12 items-start p-5 sm:p-8 rounded-2xl bg-[hsl(0,0%,97%)] border-l-4 border-[hsl(195,85%,45%)]"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[hsl(195,85%,45%)] text-white">
                      <Icon className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[hsl(0,0%,10%)]">{g.title}</h3>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[hsl(195,85%,45%)] bg-[hsl(195,85%,45%)]/10 px-2 py-0.5 rounded-full">
                        {t.cta.garantitoContrattualmente}
                      </span>
                    </div>
                  </div>
                  <p className="text-[hsl(0,0%,40%)] leading-relaxed">{g.desc}</p>
                </div>
                <ul className="space-y-3">
                  {g.details.map((d) => (
                    <li key={d} className="flex items-center gap-3 text-[hsl(0,0%,35%)]">
                      <CheckCircle2 className="h-5 w-5 text-[hsl(195,85%,45%)] shrink-0" />
                      <span className="text-sm font-medium">{d}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[hsl(195,85%,40%)] to-[hsl(210,80%,40%)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4 sm:mb-6">{t.garanzie.ctaTitle}</h2>
          <p className="text-white/80 text-base sm:text-lg mb-6 sm:mb-8">{t.garanzie.ctaDesc}</p>
          <Link to={contattiLink} className="w-full sm:w-auto inline-block">
            <Button size="lg" className="w-full sm:w-auto bg-white text-[hsl(195,85%,40%)] hover:bg-white/90 font-bold rounded-full px-12 text-base shadow-xl min-h-[48px]">
              {t.cta.richiediContratto} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};

export default GaranziePage;
