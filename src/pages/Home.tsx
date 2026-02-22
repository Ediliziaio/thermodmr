import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState, useCallback } from "react";
import {
  ArrowRight,
  Shield,
  Headphones,
  CheckCircle2,
  ChevronDown,
  ThermometerSun,
  Layers,
  DoorOpen,
  SunDim,
  TrendingUp,
  Clock,
  CreditCard,
  Target,
  Award,
  Truck,
  BadgePercent,
  Users,
  Phone,
  Mail,
  Menu,
  X,
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
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const navLinks = [
    { label: "Chi Siamo", id: "chi-siamo" },
    { label: "Prodotti", id: "prodotti" },
    { label: "Vantaggi", id: "vantaggi" },
    { label: "Garanzie", id: "garanzie" },
    { label: "Contatti", id: "contatti" },
  ];

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-lg border-b border-[hsl(0,0%,90%)] shadow-sm"
          : "bg-[hsl(0,0%,10%)]/80 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <img src={logo} alt="ThermoDMR" className="h-10 object-contain" />

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`text-sm font-medium transition-colors ${
                scrolled
                  ? "text-[hsl(0,0%,35%)] hover:text-[hsl(10,80%,50%)]"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link to="/auth">
            <Button
              size="sm"
              className="bg-[hsl(10,80%,50%)] hover:bg-[hsl(10,80%,42%)] text-white font-semibold rounded-full px-6 shadow-[0_4px_20px_hsl(10,80%,50%,0.3)]"
            >
              Area Riservata
            </Button>
          </Link>
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className={`h-6 w-6 ${scrolled ? "text-[hsl(0,0%,20%)]" : "text-white"}`} />
            ) : (
              <Menu className={`h-6 w-6 ${scrolled ? "text-[hsl(0,0%,20%)]" : "text-white"}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-[hsl(0,0%,90%)] shadow-lg">
          <div className="px-6 py-4 space-y-3">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="block w-full text-left text-sm font-medium text-[hsl(0,0%,30%)] hover:text-[hsl(10,80%,50%)] py-2"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

/* ═══════════════════════════════════════════
   2. HERO — Full-screen image like TeknoFinestre
   ═══════════════════════════════════════════ */
const Hero = () => {
  const scrollToVantaggi = useCallback(() => {
    document.getElementById("vantaggi")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-[hsl(0,0%,10%)]/60" />
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[hsl(0,0%,10%)]/80 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-24 grid lg:grid-cols-2 gap-16 items-center w-full">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-8">
          <motion.p
            variants={fadeUp}
            className="text-xs font-bold tracking-[0.3em] text-[hsl(10,80%,60%)] uppercase"
          >
            ThermoDMR — Produttore di Infissi e Serramenti
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] text-white"
          >
            Il Partner Produttore che Ti Fa{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(10,80%,55%)] to-[hsl(30,90%,55%)]">
              Guadagnare di Più
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg text-white/70 max-w-xl leading-relaxed">
            Tempi certi di consegna, prezzi più bassi sul mercato e pagamenti flessibili.{" "}
            <span className="text-white/90 font-medium">
              Smetti di rincorrere fornitori inaffidabili e inizia a far crescere la tua attività.
            </span>
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
            <a href="#contatti">
              <Button
                size="lg"
                className="bg-[hsl(10,80%,50%)] hover:bg-[hsl(10,80%,42%)] text-white font-semibold rounded-full px-8 text-base shadow-[0_6px_30px_hsl(10,80%,50%,0.4)] hover:shadow-[0_6px_40px_hsl(10,80%,50%,0.6)] transition-all"
              >
                Diventa Rivenditore
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToVantaggi}
              className="rounded-full px-8 text-base border-white/30 text-white hover:bg-white/10 hover:text-white"
            >
              Scopri i Vantaggi
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/50 pt-4">
            {["Tempi certi", "Prezzo più basso", "Pagamenti flessibili", "Margini garantiti"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[hsl(10,80%,55%)]" />
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Hero right — Product profile image like TeknoFinestre */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="hidden lg:flex items-center justify-center"
        >
          <div className="relative">
            <img
              src="/images/hero-profile.jpg"
              alt="Profilo serramento ThermoDMR"
              className="w-[420px] h-[420px] object-cover rounded-3xl shadow-2xl border-4 border-white/20"
            />
            {/* Floating badges */}
            <div className="absolute -top-3 -right-3 bg-[hsl(10,80%,50%)] text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
              Consegna 15gg
            </div>
            <div className="absolute -bottom-3 -left-3 bg-white text-[hsl(0,0%,20%)] text-xs font-bold px-4 py-2 rounded-full shadow-lg border border-[hsl(0,0%,90%)]">
              Made in Italy
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════
   3. CHI SIAMO — with real image
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
              Produciamo Infissi di Qualità per{" "}
              <span className="text-[hsl(10,80%,50%)]">Far Crescere la Tua Attività</span>
            </h2>
            <p className="text-[hsl(0,0%,40%)] leading-relaxed text-lg">
              Da oltre 10 anni produciamo serramenti internamente, senza intermediari.
              Questo ci permette di offrirti il <strong>prezzo più competitivo sul mercato</strong>,
              tempi di consegna certi e un controllo qualità rigoroso su ogni singolo prodotto.
            </p>
            <p className="text-[hsl(0,0%,40%)] leading-relaxed">
              Il nostro obiettivo non è solo venderti un prodotto, ma <strong>farti guadagnare</strong>.
              Ti forniamo supporto commerciale, materiale marketing personalizzato e un referente
              dedicato sempre disponibile per far crescere il tuo business.
            </p>
            <a href="#contatti">
              <Button className="bg-[hsl(10,80%,50%)] hover:bg-[hsl(10,80%,42%)] text-white font-semibold rounded-full px-8 mt-4 shadow-[0_4px_20px_hsl(10,80%,50%,0.25)]">
                Richiedi Informazioni Commerciali
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="flex justify-center">
            <img
              src="/images/chi-siamo.jpg"
              alt="Infissi moderni installati"
              className="w-full max-w-lg rounded-3xl shadow-xl object-cover aspect-[4/3]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════
   4. CONTATORI — with background image
   ═══════════════════════════════════════════ */
const stats = [
  { value: 200, suffix: "+", label: "Rivenditori Attivi" },
  { value: 10, suffix: "+", label: "Anni di Esperienza" },
  { value: 15, suffix: "gg", label: "Tempi Medi di Consegna" },
  { value: 98, suffix: "%", label: "Consegne Puntuali" },
];

const Stats = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/counters-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-[hsl(0,0%,8%)]/80" />

      <div className="relative max-w-7xl mx-auto px-6">
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
  const count = useCounter(value, value > 100 ? 2500 : 1800, inView);
  return (
    <motion.div variants={fadeUp} className="text-center space-y-2">
      <p className="text-4xl sm:text-5xl font-extrabold text-white">
        {count.toLocaleString("it-IT")}
        <span className="text-[hsl(10,80%,55%)]">{suffix}</span>
      </p>
      <p className="text-sm text-white/60 font-medium">{label}</p>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════
   5. PRODOTTI — with real images
   ═══════════════════════════════════════════ */
const products = [
  {
    icon: ThermometerSun,
    title: "Finestre in PVC",
    desc: "Il prodotto più richiesto dal mercato. Alto isolamento, manutenzione zero e margini eccellenti per il rivenditore. Ampia gamma di colori e finiture.",
    image: "/images/product-pvc.jpg",
  },
  {
    icon: Layers,
    title: "Finestre in Alluminio",
    desc: "Linee sottili e grandi superfici vetrate: il prodotto premium che i tuoi clienti cercano. Resistenza e design per progetti di alto livello.",
    image: "/images/product-alluminio.jpg",
  },
  {
    icon: DoorOpen,
    title: "Porte e Portoncini",
    desc: "Portoncini d'ingresso blindati con finiture personalizzabili. Un prodotto ad alto valore aggiunto che aumenta il ticket medio dei tuoi ordini.",
    image: "/images/product-porte.jpg",
  },
  {
    icon: SunDim,
    title: "Persiane e Oscuranti",
    desc: "Completa la vendita con sistemi oscuranti coordinati. Motorizzazione e domotica disponibili per upselling e margini superiori.",
    image: "/images/product-persiane.jpg",
  },
];

const Products = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} id="prodotti" className="py-24 bg-[hsl(0,0%,97%)]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.3em] text-[hsl(10,80%,50%)] uppercase mb-4">
            Cosa Puoi Vendere
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
              className="group rounded-2xl overflow-hidden border border-[hsl(0,0%,90%)] bg-white shadow-sm hover:shadow-xl hover:border-[hsl(10,80%,50%)]/30 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Product image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={f.image}
                  alt={f.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0,0%,0%)]/30 to-transparent" />
                <div className="absolute bottom-3 left-3 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[hsl(10,80%,50%)] text-white shadow-lg">
                  <f.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-[hsl(0,0%,10%)] mb-3">{f.title}</h3>
                <p className="text-sm text-[hsl(0,0%,45%)] leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════
   6. PERCHÉ SCEGLIERE THERMODMR
   ═══════════════════════════════════════════ */
const advantages = [
  {
    icon: BadgePercent,
    title: "Prezzo Più Basso sul Mercato",
    desc: "Produciamo internamente, senza intermediari. Questo significa prezzi imbattibili per te e margini più alti su ogni vendita. Confronta il nostro listino: la differenza la vedrai subito.",
  },
  {
    icon: Clock,
    title: "Tempi Certi di Consegna",
    desc: "15 giorni lavorativi garantiti dalla conferma d'ordine. Mai più clienti che aspettano, mai più scuse da dare. Pianifica il tuo lavoro con certezza.",
  },
  {
    icon: CreditCard,
    title: "Pagamenti Flessibili",
    desc: "Condizioni di pagamento personalizzate per ogni rivenditore. Lavoriamo insieme per trovare la formula che ti permette di gestire al meglio la tua liquidità.",
  },
  {
    icon: Target,
    title: "Il Tuo Successo è il Nostro Obiettivo",
    desc: "Supporto commerciale dedicato, materiale marketing personalizzato, formazione tecnica e un referente sempre disponibile. Cresci tu, cresciamo noi.",
  },
];

const WhyThermoDMR = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} id="vantaggi" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.3em] text-[hsl(10,80%,50%)] uppercase mb-4">
            I Tuoi Vantaggi Competitivi
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-[hsl(0,0%,10%)] max-w-3xl mx-auto">
            Perché Scegliere ThermoDMR
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[hsl(0,0%,45%)] text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            Stanco di fornitori che non rispettano i tempi, con prezzi sempre più alti e zero supporto?
            Con ThermoDMR hai un partner che lavora per farti guadagnare.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="grid sm:grid-cols-2 gap-8"
        >
          {advantages.map((a) => (
            <motion.div
              key={a.title}
              variants={fadeUp}
              className="p-8 rounded-2xl border border-[hsl(0,0%,90%)] bg-[hsl(0,0%,98%)] hover:shadow-lg hover:border-[hsl(10,80%,50%)]/20 transition-all duration-300"
            >
              <div className="flex gap-5">
                <div className="shrink-0 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[hsl(10,80%,50%)]/10 text-[hsl(10,80%,50%)]">
                  <a.icon className="h-7 w-7" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-[hsl(0,0%,10%)]">{a.title}</h3>
                  <p className="text-sm text-[hsl(0,0%,45%)] leading-relaxed">{a.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════
   7. GARANZIE
   ═══════════════════════════════════════════ */
const guarantees = [
  {
    icon: Shield,
    title: "Zero Reclami, Zero Problemi",
    desc: "Qualità certificata e controllo rigoroso su ogni prodotto. Meno resi, meno problemi con i tuoi clienti, più reputazione per la tua attività.",
  },
  {
    icon: Truck,
    title: "Consegna Garantita nei Tempi",
    desc: "Mai più clienti che aspettano e cantieri fermi. 15 giorni lavorativi dalla conferma d'ordine, sempre. Se non rispettiamo, ti risarciamo.",
  },
  {
    icon: BadgePercent,
    title: "Margini Protetti",
    desc: "Listino riservato e zona esclusiva per proteggere il tuo investimento. Nessuna concorrenza interna tra rivenditori ThermoDMR nella tua area.",
  },
  {
    icon: Headphones,
    title: "Supporto Commerciale Dedicato",
    desc: "Un referente sempre disponibile, materiale marketing personalizzato e formazione tecnica continua. Non sei solo: siamo il tuo reparto produzione.",
  },
];

const Guarantees = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} id="garanzie" className="py-24 bg-[hsl(0,0%,97%)]">
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
   8. CTA FINALE — with background image
   ═══════════════════════════════════════════ */
const FinalCta = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="py-28 relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/cta-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(10,80%,40%)]/85 to-[hsl(25,85%,35%)]/85" />

      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={stagger}
        className="relative max-w-3xl mx-auto px-6 text-center"
      >
        <motion.h2 variants={fadeUp} className="text-3xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
          Inizia a Guadagnare di Più{" "}
          <span className="text-white/90">Oggi!</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
          Entra nella rete ThermoDMR: un partner produttore serio, con prezzi imbattibili,
          consegne puntuali e un unico obiettivo — far crescere la tua attività.
        </motion.p>
        <motion.div variants={fadeUp}>
          <a href="#contatti">
            <Button
              size="lg"
              className="bg-white text-[hsl(10,80%,45%)] hover:bg-white/90 font-bold rounded-full px-12 text-base shadow-xl hover:shadow-2xl transition-all"
            >
              Diventa Rivenditore ThermoDMR
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
  <footer id="contatti" className="bg-[hsl(0,0%,8%)] py-16 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid sm:grid-cols-3 gap-12 mb-12">
        <div className="space-y-4">
          <img src={logo} alt="ThermoDMR" className="h-10 object-contain opacity-90" />
          <p className="text-sm text-white/40 leading-relaxed">
            Produciamo serramenti di alta qualità per far crescere la tua attività.
            Il tuo successo è il nostro obiettivo.
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
  <div className="min-h-screen bg-white">
    <Navbar />
    <Hero />
    <ChiSiamo />
    <Stats />
    <Products />
    <WhyThermoDMR />
    <Guarantees />
    <FinalCta />
    <Footer />
  </div>
);

export default Home;
