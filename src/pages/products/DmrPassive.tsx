import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, CheckCircle2, Crown, ThermometerSun, Shield, Leaf } from "lucide-react";
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
  { label: "Profilo", value: "7 camere" },
  { label: "Classe", value: "A+" },
  { label: "Vetrocamera", value: "Triplo vetro basso emissivo" },
  { label: "Uf (telaio)", value: "0.85 W/m²K" },
  { label: "Uw (finestra)", value: "0.8 W/m²K" },
  { label: "Abbattimento acustico", value: "45 dB" },
];

const features = [
  "Profilo a 7 camere con prestazioni certificate Passivhaus",
  "Triplo vetro basso emissivo con doppio gas argon",
  "Design minimale con linee squadrate contemporanee",
  "Guarnizioni a tripla battuta termosaldate",
  "Ferramenta premium con punti di chiusura perimetrali",
  "Uw fino a 0.8 W/m²K per edifici NZEB",
];

const benefits = [
  { icon: ThermometerSun, title: "Passivhaus Ready", desc: "Prestazioni certificate per edifici passivi e NZEB, con valori Uw fino a 0.8 W/m²K." },
  { icon: Leaf, title: "Sostenibilità", desc: "Riduzione drastica dei consumi energetici e materiali riciclabili al 100% a fine vita." },
  { icon: Shield, title: "Design Premium", desc: "Linee minimali e moderne, con profili a vista ridotta per massima luminosità." },
];

const DmrPassive = () => {
  const [heroRef, heroInView] = useInView(inViewOpts);
  const [specsRef, specsInView] = useInView(inViewOpts);
  const [benefitsRef, benefitsInView] = useInView(inViewOpts);

  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />

      <section ref={heroRef} className="pt-32 pb-20 bg-[hsl(0,0%,97%)]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" animate={heroInView ? "visible" : "hidden"} variants={stagger}>
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.3em] text-[hsl(195,85%,45%)] uppercase mb-4">
              Finestre in PVC
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-extrabold text-[hsl(0,0%,10%)] leading-tight mb-6">
              DMR <span className="text-[hsl(195,85%,45%)]">PASSIVE</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-[hsl(0,0%,40%)] leading-relaxed max-w-2xl">
              Il top di gamma per progetti di alto livello. Profilo a 7 camere con prestazioni certificate
              Passivhaus, per edifici a consumo quasi zero.
            </motion.p>
          </motion.div>
        </div>
      </section>

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
