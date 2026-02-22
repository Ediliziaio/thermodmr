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
import PublicFooter from "@/components/PublicFooter";
import ProductHero from "@/components/products/ProductHero";
import ProductGallery from "@/components/products/ProductGallery";
import ProductComparison from "@/components/products/ProductComparison";
import RelatedProducts from "@/components/products/RelatedProducts";

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1600566753376-12c8ab7c5a38?w=1200&q=80", alt: "DMR PASSIVE - Architettura contemporanea", caption: "Integrazione perfetta in architetture moderne" },
  { src: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200&q=80", alt: "DMR PASSIVE - Efficienza energetica", caption: "Prestazioni certificate Passivhaus" },
  { src: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80", alt: "DMR PASSIVE - Vetro triplo dettaglio", caption: "Triplo vetro basso emissivo con doppio gas argon" },
  { src: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=1200&q=80", alt: "DMR PASSIVE - Villa moderna", caption: "Design minimale con profili a vista ridotta" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };
const inViewOpts = { triggerOnce: true, threshold: 0.05, rootMargin: "0px 0px -50px 0px" };

const specs = [
  { label: "Profilo", value: "7 camere" },
  { label: "Classe", value: "A+" },
  { label: "Vetrocamera", value: "Triplo vetro basso emissivo" },
  { label: "Uf (telaio)", value: "0.85 W/m²K" },
  { label: "Uw (finestra)", value: "1.3 W/m²K" },
  { label: "Abbattimento acustico", value: "45 dB" },
];

const features = [
  "Struttura a 6 camere in PVC di altissima qualità per eccellente isolamento termico e acustico",
  "Profondità di installazione 82 mm con pacchetti di 3 vetri fino a 52 mm",
  "Rinforzo anta in acciaio zincato per resistenza statica e massima sicurezza",
  "Tripla guarnizione in gomma siliconica con forma innovativa per ridurre le forze di apertura e chiusura",
  "Battuta ferramenta nell'asse di 13 mm per elementi ROTO più resistenti",
  "Ampia superficie delle camere per ventilazione e raffreddamento efficace",
  "Resistente a radiazioni solari e sollecitazioni meccaniche",
  "Uw fino a 1.3 W/m²K per edifici NZEB e certificazione Passivhaus",
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
  { icon: ThermometerSun, title: "Passivhaus Ready", desc: "Prestazioni certificate per edifici passivi e NZEB, con valori Uw fino a 0.8 W/m²K." },
  { icon: Leaf, title: "Sostenibilità", desc: "Riduzione drastica dei consumi energetici e materiali riciclabili al 100% a fine vita." },
  { icon: Shield, title: "Design Premium", desc: "Linee minimali e moderne, con profili a vista ridotta per massima luminosità." },
];

const DmrPassive = () => {
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
        titleAccent="PASSIVE"
        description="Il top di gamma per progetti di alto livello. Struttura a 6 camere in PVC con profondità di installazione 82 mm, tripla guarnizione in gomma siliconica e prestazioni certificate Passivhaus per edifici a consumo quasi zero."
        heroImage="https://images.unsplash.com/photo-1600566753376-12c8ab7c5a38?w=1600&q=80"
        badge={{ label: "Top di Gamma", color: "purple" }}
      />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative rounded-3xl overflow-hidden shadow-xl">
              <img src="https://images.unsplash.com/photo-1600566753376-12c8ab7c5a38?w=800&q=80" alt="DMR PASSIVE - Edificio contemporaneo" className="w-full aspect-[4/3] object-cover" loading="lazy" />
              <div className="absolute bottom-4 left-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[hsl(195,85%,45%)] text-white shadow-lg">
                <Crown className="h-6 w-6" />
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-[hsl(0,0%,10%)]">Caratteristiche Principali</h2>
              <p className="text-[hsl(0,0%,40%)] leading-relaxed">
                Il DMR PASSIVE è realizzato con una struttura a 6 camere in PVC di altissima qualità e una profondità di installazione di 82 mm che accoglie pacchetti di 3 vetri fino a 52 mm. Il rinforzo anta in acciaio zincato garantisce resistenza statica e sicurezza, mentre la tripla guarnizione in gomma siliconica con forma innovativa riduce le forze di apertura e chiusura. Resistente a radiazioni solari e sollecitazioni meccaniche.
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

      {/* Window Advantages */}
      <section ref={advantagesRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" animate={advantagesInView ? "visible" : "hidden"} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <p className="text-xs font-bold tracking-[0.3em] text-[hsl(195,85%,45%)] uppercase mb-3">Dettagli Tecnici</p>
              <h2 className="text-3xl font-bold text-[hsl(0,0%,10%)]">Vantaggi della Finestra</h2>
              <p className="text-[hsl(0,0%,45%)] mt-3 max-w-2xl mx-auto">
                Ogni dettaglio del DMR PASSIVE è progettato per prestazioni ai massimi livelli, sicurezza e comfort abitativo superiore.
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
      <section ref={colorsRef} className="py-24 bg-[hsl(0,0%,97%)]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" animate={colorsInView ? "visible" : "hidden"} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[hsl(195,85%,45%,0.1)] mb-4">
                <Palette className="h-6 w-6 text-[hsl(195,85%,45%)]" />
              </div>
              <h2 className="text-3xl font-bold text-[hsl(0,0%,10%)]">Colori Disponibili</h2>
              <p className="text-[hsl(0,0%,45%)] mt-3 max-w-2xl mx-auto">
                Scegli tra un'ampia gamma di colori e finiture per personalizzare le tue finestre e armonizzarle con lo stile della tua abitazione.
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

      <ProductComparison currentSlug="/prodotti/dmr-passive" />

      <RelatedProducts currentSlug="/prodotti/dmr-passive" />

      <section className="py-20 bg-[hsl(195,85%,45%)]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Interessato al DMR PASSIVE?</h2>
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

export default DmrPassive;
