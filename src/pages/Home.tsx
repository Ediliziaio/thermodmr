import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState, useCallback } from "react";
import {
  ArrowRight,
  Shield,
  Lock,
  Headphones,
  CheckCircle2,
  ChevronDown,
  ThermometerSun,
  Layers,
  DoorOpen,
  SunDim,
  Leaf,
  Home as HomeIcon,
  TrendingUp,
  Heart,
  Award,
  Zap,
  Phone,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo_Thermodmr.png";

/* ─── Animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ─── Animated counter hook ─── */
const useCounter = (end: number, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
};

/* ═══════════════════════════════════════════
   1. NAVBAR
   ═══════════════════════════════════════════ */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[hsl(0,0%,5%)]/95 backdrop-blur-lg border-b border-white/10 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <img src={logo} alt="ThermoDMR" className="h-10 object-contain" />

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Chi Siamo", id: "chi-siamo" },
            { label: "Prodotti", id: "prodotti" },
            { label: "Garanzie", id: "garanzie" },
            { label: "Contatti", id: "contatti" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>

        <Link to="/auth">
          <Button
            size="sm"
            className="bg-[hsl(10,80%,50%)] hover:bg-[hsl(10,80%,42%)] text-white font-semibold rounded-full px-6 shadow-[0_4px_20px_hsl(10,80%,50%,0.3)]"
          >
            Area Riservata
          </Button>
        </Link>
      </div>
    </nav>
  );
};

/* ═══════════════════════════════════════════
   2. HERO
   ═══════════════════════════════════════════ */
const Hero = () => {
  const scrollToProducts = useCallback(() => {
    document.getElementById("prodotti")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[hsl(0,0%,5%)]">
      {/* Decorative blobs */}
      <div className="absolute -top-60 -right-60 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,hsl(10,80%,50%)_0%,transparent_65%)] opacity-20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,hsl(25,90%,55%)_0%,transparent_70%)] opacity-10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[hsl(0,0%,5%)] to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-24 grid lg:grid-cols-2 gap-16 items-center w-full">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-8">
          <motion.p
            variants={fadeUp}
            className="text-xs font-bold tracking-[0.3em] text-[hsl(10,80%,60%)] uppercase"
          >
            ThermoDMR — Infissi e Serramenti di Qualità
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] text-white"
          >
            Sostituisci i Tuoi Vecchi Infissi con{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(10,80%,55%)] to-[hsl(30,90%,55%)]">
              Serramenti di Ultima Generazione
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg text-white/60 max-w-xl leading-relaxed">
            Produciamo serramenti ad alto isolamento termico con i migliori materiali.{" "}
            <span className="text-white/80 font-medium">
              Design moderno, resistenza nel tempo e massima efficienza energetica per la tua casa.
            </span>
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
            <a href="#contatti">
              <Button
                size="lg"
                className="bg-[hsl(10,80%,50%)] hover:bg-[hsl(10,80%,42%)] text-white font-semibold rounded-full px-8 text-base shadow-[0_6px_30px_hsl(10,80%,50%,0.35)] hover:shadow-[0_6px_40px_hsl(10,80%,50%,0.5)] transition-all"
              >
                Richiedi un Preventivo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToProducts}
              className="rounded-full px-8 text-base border-white/20 text-white/80 hover:bg-white/10 hover:text-white"
            >
              Scopri i Prodotti
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/40 pt-4">
            {["Isolamento termico certificato", "Made in Italy", "Posa qualificata", "Detrazione fiscale"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[hsl(10,80%,55%)]" />
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Decorative panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotateY: 10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="hidden lg:flex items-center justify-center"
        >
          <div className="relative w-[440px] h-[440px]">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[hsl(10,80%,50%)] to-[hsl(30,90%,50%)] opacity-15 blur-3xl" />
            <div className="absolute inset-0 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl" />
            <div className="absolute inset-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent flex items-center justify-center">
              <div className="text-center space-y-4">
                <ThermometerSun className="h-16 w-16 text-[hsl(10,80%,55%)] mx-auto opacity-80" />
                <p className="text-white/60 text-sm font-medium">Alto Isolamento Termico</p>
                <p className="text-white text-3xl font-bold">Uw 0.8</p>
                <p className="text-white/40 text-xs">W/m²K — Classe Energetica A+</p>
              </div>
            </div>
            {/* Floating badges */}
            <div className="absolute -top-3 -right-3 bg-[hsl(10,80%,50%)] text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
              Made in Italy
            </div>
            <div className="absolute -bottom-3 -left-3 bg-white/10 backdrop-blur-md text-white text-xs font-bold px-4 py-2 rounded-full border border-white/20">
              Garanzia 10 Anni
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════
   3. CHI SIAMO
   ═══════════════════════════════════════════ */
const ChiSiamo = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} id="chi-siamo" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={fadeUp} className="space-y-6">
            <p className="text-xs font-bold tracking-[0.3em] text-[hsl(10,80%,50%)] uppercase">
              Chi siamo
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[hsl(0,0%,10%)] leading-tight">
              Design Moderno e{" "}
              <span className="text-[hsl(10,80%,50%)]">Resistenza nel Tempo</span>
            </h2>
            <p className="text-[hsl(0,0%,40%)] leading-relaxed text-lg">
              Da oltre 10 anni produciamo serramenti di alta qualità, combinando i migliori
              materiali con tecnologie all'avanguardia. Ogni finestra ThermoDMR è progettata
              per garantire il massimo isolamento termico, comfort acustico e sicurezza,
              senza mai rinunciare all'estetica.
            </p>
            <p className="text-[hsl(0,0%,40%)] leading-relaxed">
              Offriamo soluzioni personalizzate per ogni esigenza abitativa: dalla consulenza
              iniziale alla posa in opera qualificata, ti accompagniamo in ogni fase
              della sostituzione dei tuoi infissi.
            </p>
            <a href="#contatti">
              <Button className="bg-[hsl(10,80%,50%)] hover:bg-[hsl(10,80%,42%)] text-white font-semibold rounded-full px-8 mt-4 shadow-[0_4px_20px_hsl(10,80%,50%,0.25)]">
                Richiedi una Consulenza Gratuita
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="flex justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[hsl(10,80%,95%)] to-[hsl(25,80%,92%)]" />
              <div className="absolute inset-6 rounded-2xl bg-white shadow-xl flex items-center justify-center border border-[hsl(0,0%,92%)]">
                <div className="text-center space-y-4 p-8">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-[hsl(10,80%,50%)]/10 flex items-center justify-center">
                    <Award className="h-8 w-8 text-[hsl(10,80%,50%)]" />
                  </div>
                  <p className="text-sm text-[hsl(0,0%,50%)] font-medium">Qualità Certificata</p>
                  <p className="text-3xl font-bold text-[hsl(0,0%,10%)]">ISO 9001</p>
                  <p className="text-xs text-[hsl(0,0%,60%)]">Produzione 100% Made in Italy</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════
   4. CONTATORI / SOCIAL PROOF
   ═══════════════════════════════════════════ */
const stats = [
  { value: 10, suffix: "+", label: "Anni di Esperienza" },
  { value: 5000, suffix: "+", label: "Finestre Installate" },
  { value: 3000, suffix: "+", label: "Famiglie Soddisfatte" },
  { value: 98, suffix: "%", label: "Soddisfazione Clienti" },
];

const Stats = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="py-20 bg-[hsl(0,0%,5%)]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((s) => (
            <StatItem key={s.label} {...s} inView={inView} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const StatItem = ({ value, suffix, label, inView }: { value: number; suffix: string; label: string; inView: boolean }) => {
  const count = useCounter(value, value > 1000 ? 2500 : 1800, inView);
  return (
    <motion.div variants={fadeUp} className="text-center space-y-2">
      <p className="text-4xl sm:text-5xl font-extrabold text-white">
        {value > 1000 ? count.toLocaleString("it-IT") : count}
        <span className="text-[hsl(10,80%,55%)]">{suffix}</span>
      </p>
      <p className="text-sm text-white/50 font-medium">{label}</p>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════
   5. PRODOTTI
   ═══════════════════════════════════════════ */
const products = [
  {
    icon: ThermometerSun,
    title: "Finestre in PVC",
    desc: "Isolamento termico superiore, design elegante e manutenzione zero. Ideali per chi cerca il massimo comfort con il minimo sforzo.",
  },
  {
    icon: Layers,
    title: "Finestre in Alluminio",
    desc: "Resistenza, linee sottili e massima luminosità. Perfette per grandi superfici vetrate e architetture contemporanee.",
  },
  {
    icon: DoorOpen,
    title: "Porte e Portoncini",
    desc: "Sicurezza, eleganza e isolamento in un unico prodotto. Portoncini d'ingresso blindati con finiture personalizzabili.",
  },
  {
    icon: SunDim,
    title: "Persiane e Oscuranti",
    desc: "Protezione solare e privacy con stile contemporaneo. Sistemi motorizzati e domotica integrata disponibili.",
  },
];

const Products = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} id="prodotti" className="py-24 bg-[hsl(0,0%,98%)]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.3em] text-[hsl(10,80%,50%)] uppercase mb-4">
            Cosa Offriamo
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-[hsl(0,0%,10%)]">
            I Nostri Prodotti
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {products.map((f) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              className="group rounded-2xl border border-[hsl(0,0%,90%)] bg-white p-8 shadow-sm hover:shadow-xl hover:border-[hsl(10,80%,50%)]/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[hsl(10,80%,50%)]/10 text-[hsl(10,80%,50%)] group-hover:bg-[hsl(10,80%,50%)] group-hover:text-white transition-colors duration-300">
                <f.icon className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-[hsl(0,0%,10%)] mb-3">{f.title}</h3>
              <p className="text-sm text-[hsl(0,0%,45%)] leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════
   6. DIAGNOSI ENERGETICA
   ═══════════════════════════════════════════ */
const energyStats = [
  { icon: Leaf, value: 40, suffix: "%", label: "Risparmio Energetico" },
  { icon: HomeIcon, value: 95, suffix: "%", label: "Comfort Abitativo" },
  { icon: TrendingUp, value: 20, suffix: "%", label: "Valore Immobile" },
  { icon: Heart, value: 35, suffix: "%", label: "Impatto Ambientale Ridotto" },
];

const EnergyDiagnosis = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.3em] text-[hsl(10,80%,50%)] uppercase mb-4">
            Diagnosi Energetica Gratuita
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-[hsl(0,0%,10%)] max-w-3xl mx-auto">
            Il Primo Passo Verso un Comfort Abitativo Superiore
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[hsl(0,0%,45%)] text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            Offriamo una diagnosi energetica gratuita della tua abitazione per identificare
            le dispersioni termiche e proporti la soluzione più adatta alle tue esigenze e al tuo budget.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {energyStats.map((s) => (
            <EnergyStatItem key={s.label} {...s} inView={inView} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const EnergyStatItem = ({ icon: Icon, value, suffix, label, inView }: { icon: React.ElementType; value: number; suffix: string; label: string; inView: boolean }) => {
  const count = useCounter(value, 2000, inView);
  return (
    <motion.div variants={fadeUp} className="text-center space-y-3 p-6 rounded-2xl bg-[hsl(0,0%,98%)] border border-[hsl(0,0%,92%)]">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[hsl(10,80%,50%)]/10 text-[hsl(10,80%,50%)] mx-auto">
        <Icon className="h-6 w-6" />
      </div>
      <p className="text-3xl sm:text-4xl font-extrabold text-[hsl(0,0%,10%)]">
        {count}
        <span className="text-[hsl(10,80%,55%)]">{suffix}</span>
      </p>
      <p className="text-sm text-[hsl(0,0%,50%)] font-medium">{label}</p>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════
   7. GARANZIE
   ═══════════════════════════════════════════ */
const guarantees = [
  {
    icon: Shield,
    title: "Garanzia di Soddisfazione Totale",
    desc: "Se non sei completamente soddisfatto del risultato finale, interveniamo senza costi aggiuntivi fino alla tua totale soddisfazione.",
  },
  {
    icon: Zap,
    title: "Garanzia di Efficienza Energetica",
    desc: "Ti garantiamo il risparmio energetico promesso. I nostri serramenti sono certificati per le massime prestazioni termiche.",
  },
  {
    icon: Lock,
    title: "Garanzia di Alto Isolamento",
    desc: "10 anni di garanzia su tutti i nostri prodotti. Materiali di prima scelta e lavorazione artigianale certificata.",
  },
  {
    icon: Headphones,
    title: "Assistenza Post-Vendita",
    desc: "Il nostro rapporto non finisce con l'installazione. Siamo sempre al tuo fianco per manutenzione e assistenza.",
  },
];

const Guarantees = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} id="garanzie" className="py-24 bg-[hsl(0,0%,98%)]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.3em] text-[hsl(10,80%,50%)] uppercase mb-4">
            Le nostre garanzie
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-[hsl(0,0%,10%)]">
            Cosa Ti Garantiamo
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {guarantees.map((g) => (
            <motion.div
              key={g.title}
              variants={fadeUp}
              className="text-center p-8 rounded-2xl bg-white border border-[hsl(0,0%,90%)] hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-full bg-[hsl(10,80%,50%)]/10 text-[hsl(10,80%,50%)]">
                <g.icon className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-[hsl(0,0%,10%)] mb-3">{g.title}</h3>
              <p className="text-sm text-[hsl(0,0%,45%)] leading-relaxed">{g.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════
   8. CTA FINALE
   ═══════════════════════════════════════════ */
const FinalCta = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="py-28 bg-gradient-to-br from-[hsl(10,80%,48%)] to-[hsl(25,85%,42%)] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wOCkiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IGZpbGw9InVybCgjZykiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiLz48L3N2Zz4=')] opacity-50" />

      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={stagger}
        className="relative max-w-3xl mx-auto px-6 text-center"
      >
        <motion.h2 variants={fadeUp} className="text-3xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
          Trasforma la Tua Casa{" "}
          <span className="text-white/90">Oggi!</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
          Con ThermoDMR, la sostituzione dei tuoi serramenti diventa un'esperienza semplice
          e gratificante. Richiedi un preventivo gratuito e senza impegno.
        </motion.p>
        <motion.div variants={fadeUp}>
          <a href="#contatti">
            <Button
              size="lg"
              className="bg-white text-[hsl(10,80%,45%)] hover:bg-white/90 font-bold rounded-full px-12 text-base shadow-xl hover:shadow-2xl transition-all"
            >
              Richiedi un Preventivo Gratuito
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ═══════════════════════════════════════════
   9. FOOTER
   ═══════════════════════════════════════════ */
const Footer = () => (
  <footer id="contatti" className="bg-[hsl(0,0%,5%)] py-16 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid sm:grid-cols-3 gap-12 mb-12">
        <div className="space-y-4">
          <img src={logo} alt="ThermoDMR" className="h-10 object-contain opacity-90" />
          <p className="text-sm text-white/40 leading-relaxed">
            Produciamo serramenti di alta qualità per la tua casa.
            Design moderno, isolamento termico certificato e posa qualificata.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-bold text-white/80 uppercase tracking-wider">Contatti</h4>
          <div className="space-y-3">
            <a href="tel:+390000000000" className="flex items-center gap-2 text-sm text-white/40 hover:text-[hsl(10,80%,55%)] transition-colors">
              <Phone className="h-4 w-4" />
              +39 000 000 0000
            </a>
            <a href="mailto:info@thermodmr.it" className="flex items-center gap-2 text-sm text-white/40 hover:text-[hsl(10,80%,55%)] transition-colors">
              <Mail className="h-4 w-4" />
              info@thermodmr.it
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-bold text-white/80 uppercase tracking-wider">Link Utili</h4>
          <div className="space-y-3">
            <Link
              to="/auth"
              className="block text-sm text-white/40 hover:text-[hsl(10,80%,55%)] transition-colors"
            >
              Area Riservata Rivenditori
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-8 text-center">
        <p className="text-sm text-white/30">
          © {new Date().getFullYear()} ThermoDMR. Tutti i diritti riservati.
        </p>
      </div>
    </div>
  </footer>
);

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */
const Home = () => (
  <div className="min-h-screen bg-[hsl(0,0%,5%)]">
    <Navbar />
    <Hero />
    <ChiSiamo />
    <Stats />
    <Products />
    <EnergyDiagnosis />
    <Guarantees />
    <FinalCta />
    <Footer />
  </div>
);

export default Home;
