import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ArrowRight,
  CheckCircle2,
  Zap,
  ThermometerSun,
  Shield,
  Volume2,
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
import PublicFooter from "@/components/PublicFooter";
import ProductHero from "@/components/products/ProductHero";
import ProductGallery from "@/components/products/ProductGallery";
import ProductComparison from "@/components/products/ProductComparison";
import RelatedProducts from "@/components/products/RelatedProducts";

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80", alt: "DMR DOMUS - Grande vetrata moderna", caption: "Vetrata a tutta altezza per massima luminosità" },
  { src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80", alt: "DMR DOMUS - Design moderno", caption: "Linee squadrate dal design contemporaneo" },
  { src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80", alt: "DMR DOMUS - Dettaglio ferramenta", caption: "Ferramenta Roto di alta qualità" },
  { src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80", alt: "DMR DOMUS - Ambiente living", caption: "Comfort abitativo superiore" },
];

import { fadeUp, stagger, inViewOptions as inViewOpts } from "@/lib/animations";

const specs = [
  { label: "Profilo", value: "6 camere" },
  { label: "Classe", value: "A" },
  { label: "Profondità", value: "76 mm" },
  { label: "Vetrocamera", value: "Doppio vetro Lowe con gas argon" },
  { label: "Uw (finestra)", value: "1.1 W/m²K" },
  { label: "Abbattimento acustico", value: "47 dB" },
];

const features = [
  "Profilo a 6 camere isolanti per massimo isolamento termico e acustico",
  "Profondità costruttiva 76 mm con 3 livelli di guarnizione e guarnizione mediana",
  "Protezione acustica fino a 47 dB (classe 5) per ambienti silenziosi",
  "Resistenza all'effrazione fino alla classe RC3",
  "Saldatura invisibile per superficie perfettamente piana e aspetto estetico superiore",
  "Vetrocamera doppio vetro 3.3.1 Lowe Laminato con gas argon e canalina calda",
  "Rinforzi in acciaio zincato 1,5–2,5 mm per alta stabilità e lunga durata",
  "Pellicole di alta qualità in vasta gamma di colori",
];

const windowAdvantages = [
  {
    icon: Wind,
    title: "Microventilazione",
    desc: "Funzione di montaggio che consente di ventilare l'ambiente senza aprire l'anta, garantendo un ricambio d'aria costante anche in assenza.",
  },
  {
    icon: Lock,
    title: "Maniglia di Sicurezza",
    desc: "Maniglia in alluminio con funzione di sicurezza, pulsante o chiave. Disponibile in diverse finiture per adattarsi a ogni stile.",
  },
  {
    icon: Settings2,
    title: "Cerniere 3D Regolabili",
    desc: "Disponibile anche nella versione a scomparsa - Designo. Cerniere 3D regolabili su tre livelli con portata fino a 130 kg.",
  },
  {
    icon: Thermometer,
    title: "Canalina Calda",
    desc: "Disponibile in acciaio o in plastica - prodotto con tecnologia polimerica o composita, in un'ampia gamma di colori.",
  },
  {
    icon: RotateCcw,
    title: "Blocco Rotazione Maniglia",
    desc: "Funzione che impedisce la rotazione incontrollata della maniglia in posizione di ribalta, responsabile del corretto posizionamento dell'anta in posizione di chiusura.",
  },
  {
    icon: Maximize2,
    title: "Braccio Oscillo-Battente",
    desc: "Apparecchio per una ventilazione confortevole con funzione aggiuntiva di microventilazione e inclinazione dell'anta regolabile in modalità inverno-estate.",
  },
];

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

const benefits = [
  { icon: ThermometerSun, title: "Efficienza Energetica", desc: "Il profilo a 6 camere isolanti con 3 livelli di guarnizione garantisce un isolamento termico eccellente, riducendo i costi energetici." },
  { icon: Volume2, title: "Silenziosità", desc: "Abbattimento acustico fino a 47 dB (classe 5) grazie alla vetrocamera con gas argon e al triplo livello di guarnizione." },
  { icon: Shield, title: "Robustezza", desc: "Ferramenta ROTO NX antieffrazione fino a classe RC3 con rinforzi in acciaio zincato per massima sicurezza e durata." },
];

const DmrDomus = () => {
  const [specsRef, specsInView] = useInView(inViewOpts);
  const [benefitsRef, benefitsInView] = useInView(inViewOpts);
  const [advantagesRef, advantagesInView] = useInView(inViewOpts);
  const [colorsRef, colorsInView] = useInView(inViewOpts);

  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />

      <ProductHero
        category="Finestre in PVC"
        title="DMR"
        titleAccent="DOMUS"
        description="Il best-seller della gamma. Profilo a 6 camere con profondità costruttiva di 76 mm e 3 livelli di guarnizione. Comfort superiore con protezione termica e acustica ottimale fino a 47 dB, massimo grado di sicurezza fino a RC3 e aspetto classico ed elegante con saldatura invisibile."
        heroImage="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80"
        badge={{ label: "Best Seller", color: "gold" }}
      />

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative rounded-3xl overflow-hidden shadow-xl">
              <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80" alt="DMR DOMUS - Finestra moderna" className="w-full aspect-[4/3] object-cover" loading="lazy" />
              <div className="absolute bottom-4 left-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[hsl(195,85%,45%)] text-white shadow-lg">
                <Zap className="h-6 w-6" />
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-[hsl(0,0%,10%)]">Caratteristiche Principali</h2>
              <p className="text-[hsl(0,0%,40%)] leading-relaxed">
                Il DMR DOMUS è dotato di un profilo a 6 camere isolanti con profondità costruttiva di 76 mm e 3 livelli di guarnizione con guarnizione mediana per una protezione termica e acustica ottimale fino a 47 dB. La saldatura invisibile garantisce una superficie perfettamente piana e un aspetto estetico superiore. La ferramenta ROTO NX antieffrazione consente di raggiungere fino alla classe RC3, mentre i rinforzi in acciaio zincato assicurano alta stabilità e lunga durata.
              </p>
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

      {/* Specs */}
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

      {/* Window Advantages */}
      <section ref={advantagesRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" animate={advantagesInView ? "visible" : "hidden"} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <p className="text-xs font-bold tracking-[0.3em] text-[hsl(195,85%,45%)] uppercase mb-3">Dettagli Tecnici</p>
              <h2 className="text-3xl font-bold text-[hsl(0,0%,10%)]">Vantaggi della Finestra</h2>
              <p className="text-[hsl(0,0%,45%)] mt-3 max-w-2xl mx-auto">
                Ogni dettaglio del DMR DOMUS è progettato per garantire funzionalità, sicurezza e comfort abitativo superiore.
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {windowAdvantages.map((adv) => (
                <motion.div
                  key={adv.title}
                  variants={fadeUp}
                  className="group bg-[hsl(0,0%,97%)] rounded-2xl p-7 border border-[hsl(0,0%,92%)] hover:border-[hsl(195,85%,45%,0.3)] hover:shadow-lg transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[hsl(195,85%,45%,0.1)] group-hover:bg-[hsl(195,85%,45%,0.15)] transition-colors mb-4">
                    <adv.icon className="h-6 w-6 text-[hsl(195,85%,45%)]" />
                  </div>
                  <h3 className="text-lg font-bold text-[hsl(0,0%,10%)] mb-2">{adv.title}</h3>
                  <p className="text-sm text-[hsl(0,0%,40%)] leading-relaxed">{adv.desc}</p>
                </motion.div>
              ))}
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
              <h2 className="text-2xl sm:text-3xl font-bold text-[hsl(0,0%,10%)]">Colori Disponibili</h2>
              <p className="text-[hsl(0,0%,45%)] mt-3 max-w-2xl mx-auto text-sm sm:text-base">
                Scegli tra un'ampia gamma di pellicole di alta qualità per personalizzare le tue finestre e armonizzarle con lo stile della tua abitazione.
              </p>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {availableColors.map((c) => (
                <motion.div key={c.name} variants={fadeUp} className="flex flex-col items-center gap-3">
                  <div
                    className="w-20 h-20 rounded-2xl shadow-md transition-transform hover:scale-110"
                    style={{
                      backgroundColor: c.color,
                      border: c.border ? "2px solid hsl(0, 0%, 85%)" : "none",
                    }}
                  />
                  <span className="text-sm font-medium text-[hsl(0,0%,25%)]">{c.name}</span>
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

      <ProductComparison currentSlug="/prodotti/dmr-domus" />

      <RelatedProducts currentSlug="/prodotti/dmr-domus" />

      <section className="py-16 sm:py-20 bg-[hsl(195,85%,45%)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Interessato al DMR DOMUS?</h2>
          <p className="text-white/80 mb-6 sm:mb-8 text-sm sm:text-base">Contattaci per un preventivo personalizzato e scopri le condizioni riservate ai rivenditori.</p>
          <Link to="/contatti">
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

export default DmrDomus;
