import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ClipboardList, Users, CreditCard, BarChart3, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo_Thermodmr.png";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

/* ─── Navbar ─── */
const Navbar = () => (
  <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-[hsl(0,0%,5%)]/80 border-b border-white/10">
    <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
      <img src={logo} alt="ThermoDMR" className="h-10 object-contain" />
      <Link to="/auth">
        <Button
          size="sm"
          className="bg-[hsl(10,80%,50%)] hover:bg-[hsl(10,80%,42%)] text-white font-semibold rounded-full px-6"
        >
          Accedi
        </Button>
      </Link>
    </div>
  </nav>
);

/* ─── Hero ─── */
const Hero = () => (
  <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[hsl(0,0%,6%)]">
    {/* Decorative gradient blob */}
    <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,hsl(10,80%,50%)_0%,transparent_70%)] opacity-30 blur-3xl pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[hsl(0,0%,6%)] to-transparent pointer-events-none" />

    <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20 grid lg:grid-cols-2 gap-12 items-center">
      <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-8">
        <motion.h1
          variants={fadeUp}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white"
        >
          Finestre di{" "}
          <span className="text-[hsl(10,80%,50%)]">Design Moderno</span>,
          <br />
          Resistenti nel tempo
        </motion.h1>
        <motion.p variants={fadeUp} className="text-lg text-white/70 max-w-lg">
          Il gestionale completo per la tua rete di rivenditori di serramenti.
          Ordini, pagamenti, provvigioni e analytics in un'unica piattaforma.
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
          <Link to="/auth">
            <Button
              size="lg"
              className="bg-[hsl(10,80%,50%)] hover:bg-[hsl(10,80%,42%)] text-white font-semibold rounded-full px-8 text-base"
            >
              Accedi al Gestionale
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/50">
          {["Gestione centralizzata", "Report in tempo reale", "Multi-ruolo"].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[hsl(10,80%,50%)]" />
              {t}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Decorative right panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="hidden lg:flex items-center justify-center"
      >
        <div className="relative w-[420px] h-[420px]">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[hsl(10,80%,50%)] to-[hsl(25,90%,55%)] opacity-20 blur-2xl" />
          <div className="absolute inset-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg flex items-center justify-center">
            <img src={logo} alt="ThermoDMR" className="h-32 object-contain drop-shadow-2xl" />
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

/* ─── Features ─── */
const features = [
  {
    icon: ClipboardList,
    title: "Gestione Ordini",
    desc: "Crea, monitora e gestisci ordini e preventivi con un flusso di lavoro completo dall'inserimento alla consegna.",
  },
  {
    icon: Users,
    title: "Rete Rivenditori",
    desc: "Organizza la tua rete commerciale, assegna rivenditori ai commerciali e monitora le performance.",
  },
  {
    icon: CreditCard,
    title: "Pagamenti & Provvigioni",
    desc: "Traccia acconti, saldi e provvigioni in automatico. Tutto sempre sotto controllo.",
  },
  {
    icon: BarChart3,
    title: "Analytics & KPI",
    desc: "Dashboard interattive con i KPI chiave: fatturato, conversioni, trend e classifiche.",
  },
];

const Features = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-[hsl(10,80%,50%)] font-semibold text-sm uppercase tracking-wider mb-3">
            Funzionalità
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-[hsl(0,0%,12%)]">
            Tutto ciò che ti serve, in un unico posto
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
              className="group rounded-2xl border border-[hsl(0,0%,90%)] bg-white p-8 shadow-sm hover:shadow-lg hover:border-[hsl(10,80%,50%)]/30 transition-all duration-300"
            >
              <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[hsl(10,80%,50%)]/10 text-[hsl(10,80%,50%)] group-hover:bg-[hsl(10,80%,50%)] group-hover:text-white transition-colors duration-300">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-[hsl(0,0%,12%)] mb-2">{f.title}</h3>
              <p className="text-sm text-[hsl(0,0%,45%)] leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ─── CTA ─── */
const CtaSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-[hsl(10,80%,50%)] to-[hsl(20,85%,45%)]">
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={stagger}
        className="max-w-3xl mx-auto px-6 text-center"
      >
        <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-white mb-6">
          Pronto a semplificare la tua gestione?
        </motion.h2>
        <motion.p variants={fadeUp} className="text-white/80 text-lg mb-10">
          Accedi al gestionale ThermoDMR e scopri un modo più efficiente di lavorare.
        </motion.p>
        <motion.div variants={fadeUp}>
          <Link to="/auth">
            <Button
              size="lg"
              className="bg-white text-[hsl(10,80%,50%)] hover:bg-white/90 font-semibold rounded-full px-10 text-base shadow-lg"
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

/* ─── Footer ─── */
const Footer = () => (
  <footer className="bg-[hsl(0,0%,6%)] py-12">
    <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
      <img src={logo} alt="ThermoDMR" className="h-8 object-contain" />
      <p className="text-sm text-white/40">
        © {new Date().getFullYear()} ThermoDMR. Tutti i diritti riservati.
      </p>
      <Link to="/auth" className="text-sm text-white/40 hover:text-white/70 transition-colors">
        Accedi
      </Link>
    </div>
  </footer>
);

/* ─── Page ─── */
const Home = () => (
  <div className="min-h-screen">
    <Navbar />
    <Hero />
    <Features />
    <CtaSection />
    <Footer />
  </div>
);

export default Home;
