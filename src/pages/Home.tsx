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
  Sparkles,
  Zap,
  Crown,
  Box,
  Blinds,
  SunDim,
  Send,
  Loader2,
  MapPin,
  Leaf,
  Palette,
  Factory,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo_Thermodmr.png";

/* ─── Animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ─── Shared useInView options ─── */
const inViewOptions = { triggerOnce: true, threshold: 0.05, rootMargin: "0px 0px -50px 0px" };

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

import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";

/* ═══════════════════════════════════════════
   2. HERO
   ═══════════════════════════════════════════ */
const Hero = () => {
  const scrollToProdotti = useCallback(() => {
    document.getElementById("prodotti")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-[hsl(0,0%,10%)]/60" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[hsl(0,0%,10%)]/80 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-24 grid lg:grid-cols-2 gap-16 items-center w-full">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-8">
          <motion.p
            variants={fadeUp}
            className="text-xs font-bold tracking-[0.3em] text-[hsl(195,85%,60%)] uppercase"
          >
            ThermoDMR — Infissi e Serramenti in PVC
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] text-white"
          >
            Finestre di Design al{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(195,85%,50%)] to-[hsl(210,80%,55%)]">
              Miglior Prezzo di Mercato
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg text-white/70 max-w-xl leading-relaxed">
            Profilo tedesco, isolamento superiore, qualità certificata.{" "}
            <span className="text-white/90 font-medium">
              Produciamo direttamente, senza intermediari, per offrirti il miglior rapporto qualità-prezzo.
            </span>
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
            <a href="#contatti">
              <Button
                size="lg"
                className="bg-[hsl(195,85%,45%)] hover:bg-[hsl(195,85%,38%)] text-white font-semibold rounded-full px-8 text-base shadow-[0_6px_30px_hsl(195,85%,45%,0.4)] hover:shadow-[0_6px_40px_hsl(195,85%,45%,0.6)] transition-all"
              >
                Richiedi Preventivo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToProdotti}
              className="rounded-full px-8 text-base border-white/50 text-white bg-white/15 hover:bg-white/25 hover:text-white backdrop-blur-sm"
            >
              Scopri i Prodotti
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/50 pt-4">
            {["Profilo Tedesco", "Isolamento Classe A", "Garanzia 15 Anni", "Design Esclusivo"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[hsl(195,85%,55%)]" />
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>

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
            <div className="absolute -top-3 -right-3 bg-[hsl(195,85%,45%)] text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
              Consegna 2-6 Settimane
            </div>
            <div className="absolute -bottom-3 -left-3 bg-white text-[hsl(0,0%,20%)] text-xs font-bold px-4 py-2 rounded-full shadow-lg border border-[hsl(0,0%,90%)]">
              Qualità Tedesca
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
  const [ref, inView] = useInView(inViewOptions);

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
            <p className="text-xs font-bold tracking-[0.3em] text-[hsl(195,85%,45%)] uppercase">
              Chi siamo
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[hsl(0,0%,10%)] leading-tight">
              Produciamo Infissi di Design con{" "}
              <span className="text-[hsl(195,85%,45%)]">Tecnologia e Qualità Tedesca</span>
            </h2>
            <p className="text-[hsl(0,0%,40%)] leading-relaxed text-lg">
              Da oltre 10 anni progettiamo e realizziamo serramenti nel nostro stabilimento produttivo,
              unendo <strong>design contemporaneo</strong> e <strong>tecnologia avanzata</strong>.
              Ogni finestra nasce da profili tedeschi di prima qualità e processi industriali certificati.
            </p>
            <p className="text-[hsl(0,0%,40%)] leading-relaxed">
              La produzione interna ci permette di garantire <strong>qualità costante</strong>,
              tempi rapidi e un prezzo di fabbrica senza intermediari. Scegliamo materiali sostenibili
              e soluzioni ad alto isolamento per il comfort della tua casa e il rispetto dell'ambiente.
            </p>
            <Link to="/chi-siamo">
              <Button className="bg-[hsl(195,85%,45%)] hover:bg-[hsl(195,85%,38%)] text-white font-semibold rounded-full px-8 mt-4 shadow-[0_4px_20px_hsl(195,85%,45%,0.25)]">
                Scopri la Nostra Storia
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
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
   4. CONTATORI
   ═══════════════════════════════════════════ */
const stats = [
  { value: 50, suffix: ".000+", label: "Finestre Installate" },
  { value: 10, suffix: "+", label: "Anni di Esperienza" },
  { value: 6, prefix: "2-", suffix: " sett.", label: "Tempi di Consegna*" },
  { value: 98, suffix: "%", label: "Clienti Soddisfatti" },
];

const Stats = () => {
  const [ref, inView] = useInView(inViewOptions);

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
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

const StatItem = ({ value, suffix, prefix, label, inView }: { value: number; suffix: string; prefix?: string; label: string; inView: boolean }) => {
  const count = useCounter(value, value > 100 ? 2500 : 1800, inView);
  const isFootnote = label.endsWith("*");
  const cleanLabel = isFootnote ? label.slice(0, -1) : label;
  return (
    <motion.div variants={fadeUp} className="text-center space-y-2">
      <p className="text-4xl sm:text-5xl font-extrabold text-white">
        {prefix && <span>{prefix}</span>}
        {count.toLocaleString("it-IT")}
        <span className="text-[hsl(195,85%,55%)]">{suffix}</span>
      </p>
      <p className="text-sm text-white/60 font-medium">{cleanLabel}</p>
      {isFootnote && (
        <p className="text-xs text-white/40 italic">in base a colori e modello</p>
      )}
    </motion.div>
  );
};

/* ═══════════════════════════════════════════
   5. PRODOTTI
   ═══════════════════════════════════════════ */
const pvcModels = [
  {
    icon: Sparkles,
    name: "DMR CONFORT",
    link: "/prodotti/dmr-confort",
    desc: "Profilo a 3 camere. Qualità e convenienza.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
  },
  {
    icon: Zap,
    name: "DMR DOMUS",
    link: "/prodotti/dmr-domus",
    desc: "Profilo a 5 camere. Il best-seller della gamma.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
  },
  {
    icon: Crown,
    name: "DMR PASSIVE",
    link: "/prodotti/dmr-passive",
    desc: "Profilo a 7 camere. Prestazioni Passivhaus.",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7c5a38?w=600&q=80",
  },
];

const homeAccessories = [
  {
    icon: Shield,
    title: "Portoncini",
    link: "/prodotti/portoncini",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80",
  },
  {
    icon: Box,
    title: "Cassonetti",
    link: "/prodotti/cassonetti",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&q=80",
  },
  {
    icon: Blinds,
    title: "Tapparelle",
    link: "/prodotti/tapparelle",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80",
  },
  {
    icon: SunDim,
    title: "Persiane",
    link: "/prodotti/persiane",
    image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=400&q=80",
  },
];

const Products = () => {
  const [ref, inView] = useInView(inViewOptions);

  return (
    <section ref={ref} id="prodotti" className="py-24 bg-[hsl(0,0%,97%)]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.3em] text-[hsl(195,85%,45%)] uppercase mb-4">
            La Nostra Gamma
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-[hsl(0,0%,10%)]">
            I Nostri Prodotti
          </motion.h2>
        </motion.div>

        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}>
          <motion.h3 variants={fadeUp} className="text-2xl font-bold text-[hsl(0,0%,10%)] mb-8 flex items-center gap-3">
            <ThermometerSun className="h-6 w-6 text-[hsl(195,85%,45%)]" />
            Finestre in PVC
          </motion.h3>
          <div className="grid sm:grid-cols-3 gap-6 mb-16">
            {pvcModels.map((m) => (
              <motion.div key={m.name} variants={fadeUp}>
                <Link to={m.link} className="block h-full">
                  <div className="group rounded-2xl overflow-hidden border border-[hsl(0,0%,90%)] bg-white shadow-sm hover:shadow-xl hover:border-[hsl(195,85%,45%)]/30 hover:-translate-y-1 transition-all duration-300 h-full">
                    <div className="relative h-44 overflow-hidden">
                      <img src={m.image} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0,0%,0%)]/30 to-transparent" />
                      <div className="absolute bottom-3 left-3 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[hsl(195,85%,45%)] text-white shadow-lg">
                        <m.icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="p-5">
                      <h4 className="text-lg font-bold text-[hsl(0,0%,10%)] group-hover:text-[hsl(195,85%,45%)] transition-colors mb-2">{m.name}</h4>
                      <p className="text-sm text-[hsl(0,0%,45%)] leading-relaxed">{m.desc}</p>
                      <p className="text-sm font-semibold text-[hsl(195,85%,45%)] flex items-center gap-1 mt-3">
                        Scopri di più <ArrowRight className="h-4 w-4" />
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.h3 variants={fadeUp} className="text-2xl font-bold text-[hsl(0,0%,10%)] mb-8">
            Complementi e Accessori
          </motion.h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {homeAccessories.map((a) => (
              <motion.div key={a.title} variants={fadeUp}>
                <Link to={a.link} className="block h-full">
                  <div className="group rounded-2xl overflow-hidden border border-[hsl(0,0%,90%)] bg-white shadow-sm hover:shadow-xl hover:border-[hsl(195,85%,45%)]/30 hover:-translate-y-1 transition-all duration-300 h-full">
                    <div className="relative h-36 overflow-hidden">
                      <img src={a.image} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0,0%,0%)]/30 to-transparent" />
                      <div className="absolute bottom-3 left-3 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[hsl(195,85%,45%)] text-white shadow-lg">
                        <a.icon className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="text-base font-bold text-[hsl(0,0%,10%)] group-hover:text-[hsl(195,85%,45%)] transition-colors">{a.title}</h4>
                      <p className="text-xs font-semibold text-[hsl(195,85%,45%)] flex items-center gap-1 mt-2">
                        Scopri <ArrowRight className="h-3 w-3" />
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="text-center">
            <Link to="/prodotti-pubblico">
              <Button variant="outline" className="rounded-full px-8 border-[hsl(195,85%,45%)] text-[hsl(195,85%,45%)] hover:bg-[hsl(195,85%,45%,0.05)] font-semibold">
                Scopri Tutta la Gamma <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════
   6. PERCHÉ SCEGLIERE THERMODMR — vantaggi generali
   ═══════════════════════════════════════════ */
const advantages = [
  {
    icon: ThermometerSun,
    title: "Isolamento Superiore",
    desc: "Classe A di isolamento termico e acustico. I nostri serramenti garantiscono un risparmio energetico fino al 40%, per una casa più calda d'inverno e fresca d'estate.",
  },
  {
    icon: Palette,
    title: "Profilo Tedesco, Design Esclusivo",
    desc: "Profili in PVC di produzione tedesca, linee pulite e finiture curate nei minimi dettagli. Un'ampia scelta di colori e stili per valorizzare l'estetica della tua casa.",
  },
  {
    icon: Factory,
    title: "Miglior Rapporto Qualità/Prezzo",
    desc: "Produzione diretta nel nostro stabilimento, senza intermediari. Ti offriamo il prezzo di fabbrica con la qualità di un profilo tedesco certificato.",
  },
  {
    icon: Award,
    title: "Garanzia e Assistenza",
    desc: "Fino a 15 anni di garanzia su tutti i nostri prodotti. Assistenza post-vendita dedicata e un team tecnico sempre a tua disposizione.",
  },
];

const WhyThermoDMR = () => {
  const [ref, inView] = useInView(inViewOptions);

  return (
    <section ref={ref} id="vantaggi" className="py-24 bg-[hsl(0,0%,8%)]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.3em] text-[hsl(195,85%,55%)] uppercase mb-4">
            I Nostri Punti di Forza
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-white max-w-3xl mx-auto">
            Perché Scegliere ThermoDMR
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/50 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            Qualità certificata, design esclusivo e il miglior prezzo di mercato.
            Tutto nasce nel nostro stabilimento, dalla progettazione alla consegna.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="grid sm:grid-cols-2 gap-6"
        >
          {advantages.map((a) => (
            <motion.div
              key={a.title}
              variants={fadeUp}
              className="p-8 rounded-2xl bg-white/[0.06] border border-white/10 hover:bg-white/[0.1] hover:border-[hsl(195,85%,45%)]/30 transition-all duration-300"
            >
              <div className="flex gap-5">
                <div className="shrink-0">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[hsl(195,85%,45%)] text-white shadow-[0_4px_20px_hsl(195,85%,45%,0.3)]">
                    <a.icon className="h-7 w-7" />
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white">{a.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{a.desc}</p>
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
   7. GARANZIE — qualità prodotto, certificazioni
   ═══════════════════════════════════════════ */
const guarantees = [
  {
    icon: Shield,
    title: "Qualità Certificata",
    desc: "Tutti i nostri serramenti sono certificati secondo le normative europee. Materiali di prima scelta e controllo qualità rigoroso su ogni prodotto.",
  },
  {
    icon: Leaf,
    title: "Sostenibilità Ambientale",
    desc: "Profili in PVC riciclabile, vetri basso-emissivi e processi produttivi a basso impatto ambientale. Scegli il comfort senza rinunciare al pianeta.",
  },
  {
    icon: Award,
    title: "Garanzia Fino a 15 Anni",
    desc: "I nostri prodotti sono costruiti per durare. Offriamo una garanzia estesa fino a 15 anni su profili, vetri e ferramenta.",
  },
  {
    icon: Headphones,
    title: "Assistenza Post-Vendita",
    desc: "Un team dedicato ti segue anche dopo l'acquisto. Supporto tecnico, manutenzione e ricambi sempre disponibili per la massima tranquillità.",
  },
];

const Guarantees = () => {
  const [ref, inView] = useInView(inViewOptions);

  return (
    <section ref={ref} id="garanzie" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.3em] text-[hsl(195,85%,45%)] uppercase mb-4">
            Le nostre garanzie
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-[hsl(0,0%,10%)]">
            Qualità che Dura nel Tempo
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="grid sm:grid-cols-2 gap-6"
        >
          {guarantees.map((g) => (
            <motion.div
              key={g.title}
              variants={fadeUp}
              className="flex gap-5 p-6 rounded-2xl bg-[hsl(0,0%,97%)] border-l-4 border-[hsl(195,85%,45%)] hover:shadow-md transition-shadow duration-300"
            >
              <div className="shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[hsl(195,85%,45%)] text-white">
                <g.icon className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-[hsl(0,0%,10%)]">{g.title}</h3>
                <p className="text-sm text-[hsl(0,0%,45%)] leading-relaxed">{g.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════
   8. TROVA IL RIVENDITORE DI ZONA
   ═══════════════════════════════════════════ */
const FindDealer = () => {
  const [ref, inView] = useInView(inViewOptions);

  return (
    <section ref={ref} className="py-24 bg-[hsl(0,0%,97%)]">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="text-center space-y-6"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[hsl(195,85%,45%)]/10 mx-auto">
            <MapPin className="h-8 w-8 text-[hsl(195,85%,45%)]" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-[hsl(0,0%,10%)]">
            Trova il Rivenditore ThermoDMR Più Vicino a Te
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[hsl(0,0%,45%)] text-lg max-w-2xl mx-auto leading-relaxed">
            Una rete di professionisti qualificati su tutto il territorio nazionale, pronti
            a consigliarti la soluzione migliore per la tua casa.
          </motion.p>
          <motion.div variants={fadeUp}>
            <a href="#contatti">
              <Button
                size="lg"
                className="bg-[hsl(195,85%,45%)] hover:bg-[hsl(195,85%,38%)] text-white font-semibold rounded-full px-8 text-base shadow-[0_4px_20px_hsl(195,85%,45%,0.25)]"
              >
                Contattaci per Trovare il Tuo Rivenditore
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════
   9. DIVENTA RIVENDITORE
   ═══════════════════════════════════════════ */
const BecomeDealer = () => {
  const [ref, inView] = useInView(inViewOptions);

  return (
    <section ref={ref} className="py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/cta-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(0,0%,8%)]/90 to-[hsl(210,80%,15%)]/90" />

      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={stagger}
        className="relative max-w-3xl mx-auto px-6 text-center"
      >
        <motion.h2 variants={fadeUp} className="text-3xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
          Vuoi Diventare un Rivenditore{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(195,85%,50%)] to-[hsl(210,80%,55%)]">
            ThermoDMR?
          </span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-white/70 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
          Entra nella nostra rete di rivenditori e accedi a vantaggi esclusivi per far crescere la tua attività.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-white/60 mb-10">
          {["Prezzi di fabbrica", "Zona esclusiva", "Supporto marketing", "Consegna in 2-6 settimane"].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[hsl(195,85%,55%)]" />
              {t}
            </span>
          ))}
        </motion.div>

        <motion.div variants={fadeUp}>
          <a href="#contatti">
            <Button
              size="lg"
              className="bg-white text-[hsl(195,85%,40%)] hover:bg-white/90 font-bold rounded-full px-12 text-base shadow-xl hover:shadow-2xl transition-all"
            >
              Candidati Ora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ═══════════════════════════════════════════
   10. CONTACT FORM — generalista
   ═══════════════════════════════════════════ */
const ContactForm = () => {
  const [ref, inView] = useInView(inViewOptions);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [tipoUtente, setTipoUtente] = useState("");
  const [formData, setFormData] = useState({
    nome: "",
    azienda: "",
    email: "",
    telefono: "",
    messaggio: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome.trim() || !formData.email.trim() || !formData.messaggio.trim()) {
      toast({ title: "Compila i campi obbligatori", description: "Nome, email e messaggio sono richiesti.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const aziendaValue = tipoUtente
        ? `[${tipoUtente}] ${formData.azienda.trim()}`.trim()
        : formData.azienda.trim() || null;

      const { error } = await supabase.from("contact_requests").insert({
        nome: formData.nome.trim(),
        azienda: aziendaValue,
        email: formData.email.trim(),
        telefono: formData.telefono.trim() || null,
        messaggio: formData.messaggio.trim(),
      });
      if (error) throw error;
      toast({ title: "Richiesta inviata!", description: "Ti ricontatteremo al più presto." });
      setFormData({ nome: "", azienda: "", email: "", telefono: "", messaggio: "" });
      setTipoUtente("");
    } catch {
      toast({ title: "Errore", description: "Impossibile inviare la richiesta. Riprova.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={ref} id="contatti" className="py-24 bg-[hsl(0,0%,97%)]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.3em] text-[hsl(195,85%,45%)] uppercase mb-4">
              Contattaci
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[hsl(0,0%,10%)]">
              Contattaci
            </h2>
            <p className="text-[hsl(0,0%,45%)] text-lg mt-4 max-w-2xl mx-auto">
              Compila il form per richiedere un preventivo o per informazioni sulla nostra rete di rivenditori.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-[hsl(0,0%,90%)] p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[hsl(0,0%,20%)]">Nome *</label>
                  <Input name="nome" value={formData.nome} onChange={handleChange} placeholder="Mario Rossi" required maxLength={100} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[hsl(0,0%,20%)]">Tipo</label>
                  <Select value={tipoUtente} onValueChange={setTipoUtente}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="privato">Sono un privato</SelectItem>
                      <SelectItem value="rivenditore">Sono un rivenditore</SelectItem>
                      <SelectItem value="altro">Altro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[hsl(0,0%,20%)]">Email *</label>
                  <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="info@email.it" required maxLength={255} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[hsl(0,0%,20%)]">Telefono</label>
                  <Input name="telefono" type="tel" value={formData.telefono} onChange={handleChange} placeholder="+39 333 123 4567" maxLength={20} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[hsl(0,0%,20%)]">Azienda (opzionale)</label>
                <Input name="azienda" value={formData.azienda} onChange={handleChange} placeholder="Nome della tua azienda" maxLength={100} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[hsl(0,0%,20%)]">Messaggio *</label>
                <Textarea name="messaggio" value={formData.messaggio} onChange={handleChange} placeholder="Descrivi cosa stai cercando: un preventivo per casa tua, informazioni per diventare rivenditore..." required maxLength={1000} rows={4} />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[hsl(195,85%,45%)] hover:bg-[hsl(195,85%,38%)] text-white font-semibold rounded-full py-6 text-base shadow-[0_4px_20px_hsl(195,85%,45%,0.3)]"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Invio in corso...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Invia Richiesta
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};


/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */
const Home = () => (
  <div className="min-h-screen bg-white">
    <PublicNavbar />
    <Hero />
    <ChiSiamo />
    <Stats />
    <Products />
    <WhyThermoDMR />
    <Guarantees />
    <FindDealer />
    <BecomeDealer />
    <ContactForm />
    <PublicFooter />
  </div>
);

export default Home;
