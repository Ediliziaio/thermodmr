import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, CheckCircle2, Shield, Lock, ThermometerSun } from "lucide-react";
import imgPortoncinoIngresso from "@/assets/thermodmr-portoncino-ingresso.avif";
import imgPortoncinoModerno from "@/assets/thermodmr-portoncino-moderno.jpeg";
import imgPortonciniColori from "@/assets/thermodmr-portoncini-colori.jpg";
import { Button } from "@/components/ui/button";
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import ProductHero from "@/components/products/ProductHero";
import ProductGallery from "@/components/products/ProductGallery";
import RelatedProducts from "@/components/products/RelatedProducts";

const galleryImages = [
  { src: imgPortoncinoModerno, alt: "Portoncino moderno in PVC", caption: "Portoncino d'ingresso con pannello decorativo premium" },
  { src: imgPortonciniColori, alt: "Portoncini disponibili in vari colori", caption: "Ampia gamma di colori e finiture" },
  { src: imgPortoncinoIngresso, alt: "Portoncino d'ingresso elegante", caption: "Eleganza e sicurezza per ogni ingresso" },
];

import { fadeUp, stagger, inViewOptions as inViewOpts } from "@/lib/animations";

const features = [
  "Profondità costruttiva disponibile in 76, 82 e 92 mm",
  "6 camere di isolamento per massima efficienza termica",
  "3 guarnizioni con guarnizione mediana per tenuta superiore",
  "Coefficiente termico Uw fino a 0,72 W/m²K",
  "Prestazioni acustiche fino a 47 dB (classe 5)",
  "Resistenza all'effrazione fino a classe RC3",
  "Serratura multipunto meccanico-automatica con bloccaggio automatico",
  "Soglia standard in alluminio 20 mm o soluzione senza soglia",
  "Pannelli ornamentali HPL, vetro termoisolante e applicazioni in acciaio inox",
  "Ampia gamma di colori e pellicole decorative",
];

const specs = [
  { label: "Profondità", value: "76 / 82 / 92 mm" },
  { label: "Camere", value: "6" },
  { label: "Uw", value: "fino a 0,72 W/m²K" },
  { label: "Acustica", value: "47 dB (classe 5)" },
  { label: "Sicurezza", value: "Fino a RC3" },
  { label: "Serratura", value: "Multipunto automatica" },
];

const benefits = [
  { icon: Lock, title: "Massima Sicurezza", desc: "Serratura multipunto meccanico-automatica con 3 punti di chiusura a fuoriuscita automatica, resistenza fino a classe RC3." },
  { icon: ThermometerSun, title: "Isolamento Perfetto", desc: "Uw fino a 0,72 W/m²K grazie a 6 camere di isolamento e 3 guarnizioni con guarnizione mediana." },
  { icon: Shield, title: "Personalizzazione Totale", desc: "Pannelli ornamentali HPL, barre e maniglie in acciaio inox, sopraluce e luci laterali per ogni esigenza." },
];

const Portoncini = () => {
  const [specsRef, specsInView] = useInView(inViewOpts);
  const [benefitsRef, benefitsInView] = useInView(inViewOpts);

  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />

      <ProductHero
        category="I Nostri Prodotti"
        title="Portoncini in"
        titleAccent="PVC"
        description="Portoncini d'ingresso in PVC con profondità costruttiva 76-82-92 mm, 6 camere di isolamento e 3 guarnizioni. Uw fino a 0,72 W/m²K, acustica fino a 47 dB, sicurezza fino a RC3."
        heroImage={imgPortoncinoIngresso}
      />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative rounded-3xl overflow-hidden shadow-xl">
              <img src={imgPortoncinoIngresso} alt="Portoncino d'ingresso elegante" className="w-full aspect-[4/3] object-cover" loading="lazy" />
              <div className="absolute bottom-4 left-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[hsl(195,85%,45%)] text-white shadow-lg">
                <Shield className="h-6 w-6" />
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-[hsl(0,0%,10%)]">Caratteristiche Principali</h2>
              <ul className="space-y-3">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-[hsl(0,0%,35%)]">
                    <CheckCircle2 className="h-5 w-5 text-[hsl(195,85%,45%)] shrink-0" />
                    <span className="text-sm font-medium">{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contatti">
                <Button className="bg-[hsl(195,85%,45%)] hover:bg-[hsl(195,85%,38%)] text-white font-semibold rounded-full px-8 mt-2 shadow-[0_4px_20px_hsl(195,85%,45%,0.25)]">
                  Richiedi Preventivo <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ProductGallery images={galleryImages} />

      <section ref={specsRef} className="py-24 bg-[hsl(0,0%,97%)]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" animate={specsInView ? "visible" : "hidden"} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-[hsl(0,0%,10%)] mb-12 text-center">Specifiche Tecniche</motion.h2>
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

      <section ref={benefitsRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" animate={benefitsInView ? "visible" : "hidden"} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-[hsl(0,0%,10%)] mb-12 text-center">Vantaggi Chiave</motion.h2>
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

      <RelatedProducts currentSlug="/prodotti/portoncini" />

      <section className="py-20 bg-[hsl(195,85%,45%)]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Interessato ai Portoncini in PVC?</h2>
          <p className="text-white/80 mb-8">Contattaci per un preventivo personalizzato e scopri le condizioni riservate ai rivenditori.</p>
          <Link to="/contatti">
            <Button className="bg-white text-[hsl(195,85%,45%)] hover:bg-white/90 font-semibold rounded-full px-10 py-3 text-lg shadow-xl">
              Richiedi Preventivo <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};

export default Portoncini;
