import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState, useCallback } from "react";
import {
  ClipboardList,
  Users,
  CreditCard,
  BarChart3,
  ArrowRight,
  Shield,
  Lock,
  Headphones,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo_Thermodmr.png";

/* ─── Animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
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
  const scrollToFeatures = useCallback(() => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
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
            ThermoDMR — Leader nel settore serramenti
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] text-white"
          >
            Gestisci la Tua Rete di Rivenditori con{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(10,80%,55%)] to-[hsl(30,90%,55%)]">
              Precisione e Controllo Totale
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg text-white/60 max-w-xl leading-relaxed">
            Basta fogli Excel, ordini persi e provvigioni calcolate a mano.
            <span className="text-white/80 font-medium">
              {" "}Un unico gestionale per ordini, pagamenti e performance della tua rete commerciale.
            </span>
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
            <Link to="/auth">
              <Button
                size="lg"
                className="bg-[hsl(10,80%,50%)] hover:bg-[hsl(10,80%,42%)] text-white font-semibold rounded-full px-8 text-base shadow-[0_6px_30px_hsl(10,80%,50%,0.35)] hover:shadow-[0_6px_40px_hsl(10,80%,50%,0.5)] transition-all"
              >
                Accedi al Gestionale
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToFeatures}
              className="rounded-full px-8 text-base border-white/20 text-white/80 hover:bg-white/10 hover:text-white"
            >
              Scopri le Funzionalità
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/40 pt-4">
            {["Gestione centralizzata", "Multi-ruolo", "Report in tempo reale", "100% Cloud"].map((t) => (
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
              <img src={logo} alt="ThermoDMR" className="h-28 object-contain drop-shadow-2xl opacity-90" />
            </div>
            {/* Floating badges */}
            <div className="absolute -top-3 -right-3 bg-[hsl(10,80%,50%)] text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
              500+ Rivenditori
            </div>
            <div className="absolute -bottom-3 -left-3 bg-white/10 backdrop-blur-md text-white text-xs font-bold px-4 py-2 rounded-full border border-white/20">
              99% Precisione
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════
   3. VISION / CHI SIAMO
   ═══════════════════════════════════════════ */
const Vision = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="py-24 bg-white">
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
              Il gestionale pensato da chi conosce il{" "}
              <span className="text-[hsl(10,80%,50%)]">settore serramenti</span>
            </h2>
            <p className="text-[hsl(0,0%,40%)] leading-relaxed text-lg">
              Non un CRM generico adattato alla meglio, ma una piattaforma verticale costruita
              sulle esigenze reali di chi gestisce reti di rivenditori di serramenti.
              Ogni funzionalità è stata progettata per risolvere problemi concreti:
              dalla gestione degli ordini alle provvigioni, dal monitoraggio delle performance
              alla reportistica in tempo reale.
            </p>
            <Link to="/auth">
              <Button className="bg-[hsl(10,80%,50%)] hover:bg-[hsl(10,80%,42%)] text-white font-semibold rounded-full px-8 mt-4 shadow-[0_4px_20px_hsl(10,80%,50%,0.25)]">
                Accedi ora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="flex justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[hsl(10,80%,95%)] to-[hsl(25,80%,92%)]" />
              <div className="absolute inset-6 rounded-2xl bg-white shadow-xl flex items-center justify-center border border-[hsl(0,0%,92%)]">
                <div className="text-center space-y-4 p-8">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-[hsl(10,80%,50%)]/10 flex items-center justify-center">
                    <BarChart3 className="h-8 w-8 text-[hsl(10,80%,50%)]" />
                  </div>
                  <p className="text-sm text-[hsl(0,0%,50%)] font-medium">Verticalità nel settore</p>
                  <p className="text-3xl font-bold text-[hsl(0,0%,10%)]">100%</p>
                  <p className="text-xs text-[hsl(0,0%,60%)]">Costruito per i serramenti</p>
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
   4. NUMERI / SOCIAL PROOF
   ═══════════════════════════════════════════ */
const stats = [
  { value: 500, suffix: "+", label: "Rivenditori gestiti" },
  { value: 10000, suffix: "+", label: "Ordini processati" },
  { value: 99, suffix: "%", label: "Precisione provvigioni" },
  { value: 24, suffix: "/7", label: "Accesso ai dati" },
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
   5. FEATURES
   ═══════════════════════════════════════════ */
const features = [
  {
    icon: ClipboardList,
    title: "Ordini Sempre Sotto Controllo",
    desc: "Mai più ordini persi o dimenticati. Dall'inserimento alla consegna, ogni step è tracciato e visibile in tempo reale.",
  },
  {
    icon: Users,
    title: "Rete Commerciale Organizzata",
    desc: "Ogni commerciale sa esattamente cosa fare. Assegna rivenditori, monitora le performance e ottimizza la rete.",
  },
  {
    icon: CreditCard,
    title: "Pagamenti e Provvigioni Automatiche",
    desc: "Zero errori di calcolo, zero discussioni. Acconti, saldi e provvigioni calcolati in automatico con precisione assoluta.",
  },
  {
    icon: BarChart3,
    title: "Decisioni Basate sui Dati",
    desc: "KPI in tempo reale, non sensazioni. Dashboard interattive con fatturato, conversioni, trend e classifiche.",
  },
];

const Features = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} id="features" className="py-24 bg-[hsl(0,0%,98%)]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.3em] text-[hsl(10,80%,50%)] uppercase mb-4">
            Cosa puoi fare
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-[hsl(0,0%,10%)]">
            Tutto Sotto Controllo, in Un'Unica Piattaforma
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((f) => (
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
   6. GARANZIE / TRUST
   ═══════════════════════════════════════════ */
const guarantees = [
  {
    icon: Shield,
    title: "Dati Sempre Protetti",
    desc: "Sicurezza enterprise con crittografia end-to-end e backup automatici. I tuoi dati sono al sicuro, sempre.",
  },
  {
    icon: Lock,
    title: "Accesso Multi-Ruolo",
    desc: "Admin, commerciali, dealer: ognuno vede solo ciò che gli compete. Controllo granulare su ogni livello.",
  },
  {
    icon: Headphones,
    title: "Supporto Dedicato",
    desc: "Assistenza per configurazione e utilizzo. Non ti lasciamo solo: il nostro team è al tuo fianco.",
  },
];

const Trust = () => {
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
          className="grid md:grid-cols-3 gap-8"
        >
          {guarantees.map((g) => (
            <motion.div
              key={g.title}
              variants={fadeUp}
              className="text-center p-10 rounded-2xl bg-[hsl(0,0%,98%)] border border-[hsl(0,0%,92%)] hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-[hsl(10,80%,50%)]/10 text-[hsl(10,80%,50%)]">
                <g.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-[hsl(0,0%,10%)] mb-3">{g.title}</h3>
              <p className="text-sm text-[hsl(0,0%,45%)] leading-relaxed">{g.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════
   7. CTA FINALE
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
          Smetti di Rincorrere Dati.
          <br />
          <span className="text-white/90">Inizia a Gestire.</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
          Unisciti ai professionisti del settore serramenti che hanno già scelto ThermoDMR
          per semplificare la gestione della propria rete commerciale.
        </motion.p>
        <motion.div variants={fadeUp}>
          <Link to="/auth">
            <Button
              size="lg"
              className="bg-white text-[hsl(10,80%,45%)] hover:bg-white/90 font-bold rounded-full px-12 text-base shadow-xl hover:shadow-2xl transition-all"
            >
              Accedi ora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ═══════════════════════════════════════════
   8. FOOTER
   ═══════════════════════════════════════════ */
const Footer = () => (
  <footer className="bg-[hsl(0,0%,5%)] py-12 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
      <img src={logo} alt="ThermoDMR" className="h-8 object-contain opacity-80" />
      <p className="text-sm text-white/30">
        © {new Date().getFullYear()} ThermoDMR. Tutti i diritti riservati.
      </p>
      <Link
        to="/auth"
        className="text-sm text-white/30 hover:text-[hsl(10,80%,55%)] transition-colors font-medium"
      >
        Area Riservata
      </Link>
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
    <Vision />
    <Stats />
    <Features />
    <Trust />
    <FinalCta />
    <Footer />
  </div>
);

export default Home;
