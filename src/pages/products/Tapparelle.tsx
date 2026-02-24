import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, CheckCircle2, Blinds, Zap, Shield, Smartphone } from "lucide-react";
import imgTapparella from "@/assets/thermodmr-tapparella-coibentata.webp";
import { Button } from "@/components/ui/button";
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import ProductHero from "@/components/products/ProductHero";
import ProductGallery from "@/components/products/ProductGallery";
import RelatedProducts from "@/components/products/RelatedProducts";

const galleryImages = [
  { src: imgTapparella, alt: "Tapparella in alluminio coibentato", caption: "Tapparella in alluminio coibentato ad alta resistenza" },
  { src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80", alt: "Tapparelle - Dettaglio lamella", caption: "Lamelle in alluminio coibentato ad alta resistenza" },
  { src: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200&q=80", alt: "Tapparelle - Facciata moderna", caption: "Integrazione estetica con facciate contemporanee" },
];

import { fadeUp, stagger, inViewOptions as inViewOpts } from "@/lib/animations";

const features = [
  "Alluminio leggero e resistente, non teme intemperie né usura",
  "Isolamento termico superiore: calore in inverno, fresco in estate",
  "Barriera efficace contro tentativi di intrusione",
  "Disponibili in versione coibentata con schiuma poliuretanica",
  "Motorizzazione elettrica con motore tubolare integrato nel rullo",
  "Predisposizione per domotica e Smart Home",
  "Abbattimento acustico dei rumori esterni",
  "Alluminio riciclabile al 100%, scelta sostenibile",
  "Disponibili senza cassonetto (sistema monoblocco)",
];

const specs = [
  { label: "Materiale", value: "Alluminio" },
  { label: "Coibentazione", value: "Schiuma poliuretanica" },
  { label: "Motorizzazione", value: "Motore tubolare" },
  { label: "Domotica", value: "Smart Home ready" },
  { label: "Sostenibilità", value: "100% riciclabile" },
  { label: "Versioni", value: "Coibentate / Estruse" },
];

const benefits = [
  { icon: Zap, title: "Risparmio Energetico", desc: "L'alluminio coibentato con schiuma poliuretanica trattiene il calore in inverno e respinge il caldo estivo, riducendo i costi in bolletta." },
  { icon: Shield, title: "Sicurezza Anti-intrusione", desc: "La robustezza dell'alluminio, unita alla struttura coibentata, crea una protezione ulteriore contro tentativi di intrusione." },
  { icon: Smartphone, title: "Motorizzazione Smart", desc: "Motore tubolare nascosto nel rullo, gestione da remoto tramite domotica. Consumo inferiore a un piccolo elettrodomestico." },
];

const Tapparelle = () => {
  const [specsRef, specsInView] = useInView(inViewOpts);
  const [benefitsRef, benefitsInView] = useInView(inViewOpts);

  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />

      <ProductHero
        category="I Nostri Prodotti"
        title=""
        titleAccent="Tapparelle"
        description="Tapparelle avvolgibili in alluminio: leggerezza, resistenza e isolamento termico superiore. Protezione contro intrusioni, risparmio energetico. Disponibili coibentate, estruse e motorizzate."
        heroImage={imgTapparella}
      />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative rounded-3xl overflow-hidden shadow-xl">
              <img src={imgTapparella} alt="Tapparelle in alluminio coibentato" className="w-full aspect-[4/3] object-cover" loading="lazy" />
              <div className="absolute bottom-4 left-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[hsl(195,85%,45%)] text-white shadow-lg">
                <Blinds className="h-6 w-6" />
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

      <RelatedProducts currentSlug="/prodotti/tapparelle" />

      <section className="py-20 bg-[hsl(195,85%,45%)]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Interessato alle Tapparelle?</h2>
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

export default Tapparelle;
