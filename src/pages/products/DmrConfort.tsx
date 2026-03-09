import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
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
import dmrConfortProfile from "@/assets/dmr-confort-profile.webp";

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80", alt: "DMR CONFORT - Finestra PVC classica", caption: "Finestra a due ante con profilo classico bianco" },
  { src: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&q=80", alt: "DMR CONFORT - Interni luminosi", caption: "Massima luminosità negli ambienti interni" },
  { src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80", alt: "DMR CONFORT - Dettaglio profilo", caption: "Profilo a 3 camere con rinforzo in acciaio" },
  { src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80", alt: "DMR CONFORT - Vista esterna", caption: "Integrazione perfetta con qualsiasi facciata" },
];

import { fadeUp, stagger, inViewOptions as inViewOpts } from "@/lib/animations";

const specs = [
  { label: "Profilo", value: "5 camere (telaio/anta)" },
  { label: "Classe", value: "B" },
  { label: "Profondità installazione", value: "72 mm" },
  { label: "Pacchetto vetri", value: "fino a 49 mm" },
  { label: "Uw (finestra)", value: "1.3 W/m²K" },
  { label: "Abbattimento acustico", value: "46 dB" },
];

const features = [
  "Profili alti solo 113 mm per massimizzare la luce naturale negli ambienti",
  "Pacchetto vetro fino a 49 mm per eccellente isolamento termico",
  "5 camere nel telaio e nell'anta, 4 camere nel montante",
  "Protezione acustica fino a 46 dB per ambienti silenziosi anche in centro città",
  "Durevole e resistente agli agenti esterni per molti anni di utilizzo",
  "Sistema ecologico sviluppato pensando al riciclaggio",
  "Forma versatile per progetti architettonici sia moderni che classici",
  "Guarnizioni a doppia battuta per tenuta all'aria e all'acqua",
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
  { icon: ThermometerSun, title: "Isolamento Termico", desc: "Efficace isolamento del calore con bollette più basse e temperature confortevoli tutto l'anno grazie al profilo a 5 camere e al pacchetto vetro fino a 49 mm." },
  { icon: Volume2, title: "Comfort Acustico", desc: "Riduzione del rumore esterno fino a 46 dB per ambienti silenziosi e confortevoli, ideale per abitazioni in zone trafficate." },
  { icon: Shield, title: "Sicurezza", desc: "Ferramenta anti-effrazione di serie con possibilità di upgrade a classe RC2. Protezione e tranquillità per la tua famiglia." },
];

const DmrConfort = () => {
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
        titleAccent="CONFORT"
        description="Finestre che combinano design moderno, profili sottili e prestazioni eccellenti. Progettate per fornire la massima luce naturale con elevati livelli di isolamento termico e acustico. Si adattano a progetti architettonici sia classici che moderni: la scelta per chi cerca forma leggera, efficienza energetica e prestazioni affidabili per anni."
        heroImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"
        badge={{ label: "Miglior Prezzo", color: "green" }}
      />

      {/* Image + Features */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative rounded-3xl overflow-hidden shadow-xl bg-[hsl(0,0%,96%)] flex items-center justify-center p-8">
              <img
                src={dmrConfortProfile}
                alt="DMR CONFORT - Sezione trasversale profilo PVC"
                className="w-full max-w-md object-contain"
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[hsl(195,85%,45%)] text-white shadow-lg">
                <Sparkles className="h-6 w-6" />
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-[hsl(0,0%,10%)]">Caratteristiche Principali</h2>
              <p className="text-[hsl(0,0%,40%)] leading-relaxed">
                Il DMR CONFORT presenta profili alti solo 113 mm e un pacchetto vetro accuratamente selezionato per far entrare molta più luce naturale negli ambienti. Garantisce un efficace isolamento del calore con bollette più basse e temperature confortevoli tutto l'anno, oltre a una riduzione del rumore esterno fino a 46 dB. I profili sono realizzati per molti anni di utilizzo, resistenti agli agenti esterni e di facile manutenzione. Sistema sviluppato pensando al riciclaggio, con una forma versatile per progetti sia moderni che classici.
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

      {/* Window Advantages - Inspired by Petecki */}
      <section ref={advantagesRef} className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" animate={advantagesInView ? "visible" : "hidden"} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-10 sm:mb-14">
              <p className="text-xs font-bold tracking-[0.3em] text-[hsl(195,85%,45%)] uppercase mb-3">Dettagli Tecnici</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[hsl(0,0%,10%)]">Vantaggi della Finestra</h2>
              <p className="text-[hsl(0,0%,45%)] mt-3 max-w-2xl mx-auto text-sm sm:text-base">
                Ogni dettaglio del DMR CONFORT è progettato per garantire funzionalità, sicurezza e comfort abitativo superiore.
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
                Scegli tra un'ampia gamma di colori e finiture legno per personalizzare le tue finestre e armonizzarle con lo stile della tua abitazione.
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

      <ProductComparison currentSlug="/prodotti/dmr-confort" />

      <RelatedProducts currentSlug="/prodotti/dmr-confort" />

      {/* CTA */}
      <section className="py-20 bg-[hsl(195,85%,45%)]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Interessato al DMR CONFORT?</h2>
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

export default DmrConfort;
