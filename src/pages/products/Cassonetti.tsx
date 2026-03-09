import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, CheckCircle2, Box, ThermometerSun, Wrench, Ruler } from "lucide-react";
import imgCassonettoSezione from "@/assets/thermodmr-cassonetto-sezione.jpg";
import imgCassonettoInstallato from "@/assets/thermodmr-cassonetto-installato.jpg";
import { Button } from "@/components/ui/button";
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import ProductHero from "@/components/products/ProductHero";
import ProductGallery from "@/components/products/ProductGallery";
import RelatedProducts from "@/components/products/RelatedProducts";

const galleryImages = [
  { src: imgCassonettoInstallato, alt: "Cassonetto installato", caption: "Cassonetto integrato nella muratura" },
  { src: imgCassonettoSezione, alt: "Cassonetto sezione tecnica", caption: "Coibentazione in EPS ad alta densità" },
  { src: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&q=80", alt: "Cassonetto - Sezione tecnica", caption: "Ispezione frontale facilitata" },
  { src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80", alt: "Cassonetto - Facciata moderna", caption: "Finitura a filo muro per estetica pulita" },
];

import { fadeUp, stagger, inViewOptions as inViewOpts } from "@/lib/animations";

const features = [
  "Contenitore per avvolgibile incassato nel muro o a vista",
  "Coibentazione per eliminare ponti termici e dispersioni",
  "Prevenzione di condensa e muffa nella zona cassonetto",
  "Ispezione frontale facilitata per manutenzione e sostituzione tapparella",
  "Compatibile con tapparelle motorizzate",
  "Dimensioni su misura per ogni vano murario",
  "Linee pulite ed essenziali, soluzioni a scomparsa disponibili",
  "Predisposizione per zanzariere",
];

const specs = [
  { label: "Materiale", value: "PVC / Alluminio / Composito" },
  { label: "Coibentazione", value: "EPS alta densità" },
  { label: "Ispezione", value: "Frontale" },
  { label: "Motorizzazione", value: "Predisposto" },
  { label: "Design", value: "A scomparsa disponibile" },
  { label: "Dimensioni", value: "Su misura" },
];

const benefits = [
  { icon: ThermometerSun, title: "Zero Ponti Termici", desc: "Un cassonetto non isolato causa dispersioni termiche in inverno e surriscaldamento in estate. La coibentazione elimina completamente questo problema." },
  { icon: Wrench, title: "Prevenzione Condensa", desc: "Elimina la formazione di ponti termici con conseguente condensa e muffa, migliorando la salubrità dell'ambiente." },
  { icon: Ruler, title: "Manutenzione Facile", desc: "Accesso semplice per manutenzione e sostituzione della tapparella, senza interventi invasivi." },
];

const Cassonetti = () => {
  const [specsRef, specsInView] = useInView(inViewOpts);
  const [benefitsRef, benefitsInView] = useInView(inViewOpts);

  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />

      <ProductHero
        category="I Nostri Prodotti"
        title="Cassonetti"
        titleAccent="Coibentati"
        description="Il cassonetto è il contenitore che ospita l'avvolgibile, posizionato nella parte superiore della finestra. Ruolo fondamentale nell'isolamento termico e acustico: cassonetti non isolati causano dispersioni, ponti termici, condensa e muffa."
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
              <h2 className="text-2xl sm:text-3xl font-bold text-[hsl(0,0%,10%)]">Caratteristiche Principali</h2>
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

      <RelatedProducts currentSlug="/prodotti/cassonetti" />

      <section className="py-20 bg-[hsl(195,85%,45%)]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Interessato ai Cassonetti?</h2>
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

export default Cassonetti;
