import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, CheckCircle2, SunDim, Paintbrush, Wind, Eye } from "lucide-react";
import imgPersianaVerde from "@/assets/thermodmr-persiana-verde.webp";
import imgPersianaLegno from "@/assets/thermodmr-persiana-legno.jpg";
import { Button } from "@/components/ui/button";
import PublicNavbar from "@/components/PublicNavbar";
import { useLanguage } from "@/i18n/LanguageContext";
import PublicFooter from "@/components/PublicFooter";
import ProductHero from "@/components/products/ProductHero";
import ProductGallery from "@/components/products/ProductGallery";
import RelatedProducts from "@/components/products/RelatedProducts";

const galleryImages = [
  { src: imgPersianaVerde, alt: "Persiana in alluminio verde", caption: "Persiane in alluminio con finitura classica" },
  { src: imgPersianaLegno, alt: "Persiane effetto legno", caption: "Lamelle in alluminio con sublimazione effetto legno" },
  { src: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=1200&q=80", alt: "Persiane - Colori RAL", caption: "Ampia scelta di colori dalla gamma RAL" },
  { src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80", alt: "Persiane - Facciata mediterranea", caption: "Eleganza senza tempo per ogni facciata" },
];

import { fadeUp, stagger, inViewOptions as inViewOpts } from "@/lib/animations";

const features = [
  "Sezione profili: 56 mm telai e 46 mm anta",
  "Lamelle fisse (83x25 mm planari o 40x25 mm simmetriche) o orientabili (72x12 mm, da 0° a 180°)",
  "Zoccolatura di base regolabile H 75-113 mm",
  "Guarnizione su telai e anta",
  "Telai tipo Z o L, oppure senza telai con anta a muro",
  "Verniciatura RAL a scelta o sublimazione effetto legno",
  "Tipologie: a battente, a libro, scorrevole interno o esterno muro",
  "Superfici piane, facili da pulire",
];

const specs = [
  { label: "Telai", value: "56 mm" },
  { label: "Anta", value: "46 mm" },
  { label: "Lamelle", value: "Fisse o orientabili" },
  { label: "Orientamento", value: "0 - 180 gradi" },
  { label: "Zoccolatura", value: "H 75-113 mm" },
  { label: "Finiture", value: "RAL / Effetto legno" },
];

const benefits = [
  { icon: Eye, title: "Controllo Luce", desc: "Lamelle orientabili da 0° a 180° a comando manuale per regolare luminosità e ventilazione in modo preciso." },
  { icon: Paintbrush, title: "Versatilità", desc: "Realizzabili a battente, a libro o scorrevole, per integrarsi con ogni soluzione costruttiva in nuova costruzione o ristrutturazione." },
  { icon: Wind, title: "Design e Finiture", desc: "Superfici piane facili da pulire, verniciatura RAL a scelta o sublimazione in tinta legno per un aspetto elegante e naturale." },
];

const Persiane = () => {
  const { lang } = useLanguage();
  const contattiLink = lang === "ro" ? "/ro/contact" : "/contatti";
  const [specsRef, specsInView] = useInView(inViewOpts);
  const [benefitsRef, benefitsInView] = useInView(inViewOpts);

  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />

      <ProductHero
        category="I Nostri Prodotti"
        title="Persiane in"
        titleAccent="Alluminio"
        description="Persiane esterne in alluminio con lamelle fisse o orientabili. Sezione profili 56 mm telai e 46 mm anta. Verniciatura RAL a scelta o sublimazione effetto legno."
        heroImage={imgPersianaVerde}
      />

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative rounded-3xl overflow-hidden shadow-xl">
              <img src={imgPersianaLegno} alt="Persiane in alluminio" className="w-full aspect-[4/3] object-cover" loading="lazy" />
              <div className="absolute bottom-4 left-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[hsl(195,85%,45%)] text-white shadow-lg">
                <SunDim className="h-6 w-6" />
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-[hsl(0,0%,10%)]">Caratteristiche Principali</h2>
              <ul className="space-y-3">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-[hsl(0,0%,35%)]">
                    <CheckCircle2 className="h-5 w-5 text-[hsl(195,85%,45%)] shrink-0" />
                    <span className="text-sm font-medium">{f}</span>
                  </li>
                ))}
              </ul>
              <Link to={contattiLink}>
                <Button className="bg-[hsl(195,85%,45%)] hover:bg-[hsl(195,85%,38%)] text-white font-semibold rounded-full px-8 mt-2 shadow-[0_4px_20px_hsl(195,85%,45%,0.25)]">
                  Richiedi Preventivo <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ProductGallery images={galleryImages} />

      <section ref={specsRef} className="py-16 sm:py-24 bg-[hsl(0,0%,97%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" animate={specsInView ? "visible" : "hidden"} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-bold text-[hsl(0,0%,10%)] mb-8 sm:mb-12 text-center">Specifiche Tecniche</motion.h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {specs.map((s) => (
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
            <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-bold text-[hsl(0,0%,10%)] mb-8 sm:mb-12 text-center">Vantaggi Chiave</motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((b) => (
                <motion.div key={b.title} variants={fadeUp} className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[hsl(195,85%,45%,0.1)]">
                    <b.icon className="h-7 w-7 text-[hsl(195,85%,45%)]" />
                  </div>
                  <h3 className="text-xl font-bold text-[hsl(0,0%,10%)]">{b.title}</h3>
                  <p className="text-sm text-[hsl(0,0%,40%)] leading-relaxed">{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <RelatedProducts currentSlug="/prodotti/persiane" />

      <section className="py-16 sm:py-20 bg-[hsl(195,85%,45%)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Interessato alle Persiane?</h2>
          <p className="text-white/80 mb-6 sm:mb-8 text-sm sm:text-base">Contattaci per un preventivo personalizzato e scopri le condizioni riservate ai rivenditori.</p>
          <Link to={contattiLink}>
            <Button className="w-full sm:w-auto bg-white text-[hsl(195,85%,45%)] hover:bg-white/90 font-semibold rounded-full px-10 py-3 text-base sm:text-lg shadow-xl min-h-[48px]">
              Richiedi Preventivo <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};

export default Persiane;
