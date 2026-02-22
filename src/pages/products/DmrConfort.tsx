import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, CheckCircle2, Sparkles, ThermometerSun, Shield, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };
const inViewOpts = { triggerOnce: true, threshold: 0.05, rootMargin: "0px 0px -50px 0px" };

const specs = [
  { label: "Profilo", value: "3 camere" },
  { label: "Classe", value: "B" },
  { label: "Vetrocamera", value: "Standard 4/16/4" },
  { label: "Uf (telaio)", value: "1.3 W/m²K" },
  { label: "Uw (finestra)", value: "1.4 W/m²K" },
  { label: "Abbattimento acustico", value: "32 dB" },
];

const features = [
  "Profilo a 3 camere con rinforzo in acciaio",
  "Vetrocamera standard con ottimo rapporto qualità/prezzo",
  "Ampia gamma di colori e finiture legno",
  "Guarnizioni a doppia battuta",
  "Ferramenta anti-effrazione di serie",
  "Drenaggio nascosto dell'acqua piovana",
];

const benefits = [
  { icon: ThermometerSun, title: "Isolamento Termico", desc: "Riduzione dei consumi energetici grazie al profilo multi-camera e alla vetrocamera performante." },
  { icon: Volume2, title: "Comfort Acustico", desc: "Abbattimento acustico fino a 32 dB per ambienti più silenziosi e confortevoli." },
  { icon: Shield, title: "Sicurezza", desc: "Ferramenta anti-effrazione di serie con possibilità di upgrade a classe RC2." },
];

const DmrConfort = () => {
  const [heroRef, heroInView] = useInView(inViewOpts);
  const [specsRef, specsInView] = useInView(inViewOpts);
  const [benefitsRef, benefitsInView] = useInView(inViewOpts);

  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />

      {/* Hero */}
      <section ref={heroRef} className="pt-32 pb-20 bg-[hsl(0,0%,97%)]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" animate={heroInView ? "visible" : "hidden"} variants={stagger}>
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.3em] text-[hsl(195,85%,45%)] uppercase mb-4">
              Finestre in PVC
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-extrabold text-[hsl(0,0%,10%)] leading-tight mb-6">
              DMR <span className="text-[hsl(195,85%,45%)]">CONFORT</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-[hsl(0,0%,40%)] leading-relaxed max-w-2xl">
              La soluzione ideale per chi cerca qualità e convenienza. Profilo a 3 camere con ottime prestazioni
              termiche e acustiche, perfetto per ristrutturazioni e nuove costruzioni.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Image + Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative rounded-3xl overflow-hidden shadow-xl">
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" alt="DMR CONFORT - Finestra PVC classica" className="w-full aspect-[4/3] object-cover" loading="lazy" />
              <div className="absolute bottom-4 left-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[hsl(195,85%,45%)] text-white shadow-lg">
                <Sparkles className="h-6 w-6" />
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

      {/* Specs */}
      <section ref={specsRef} className="py-24 bg-[hsl(0,0%,97%)]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" animate={specsInView ? "visible" : "hidden"} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-[hsl(0,0%,10%)] mb-12 text-center">
              Specifiche Tecniche
            </motion.h2>
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

      {/* Benefits */}
      <section ref={benefitsRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" animate={benefitsInView ? "visible" : "hidden"} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-[hsl(0,0%,10%)] mb-12 text-center">
              Vantaggi Chiave
            </motion.h2>
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
