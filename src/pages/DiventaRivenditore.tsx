import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ArrowRight,
  Factory,
  MapPin,
  Monitor,
  Megaphone,
  Truck,
  CreditCard,
  GraduationCap,
  ClipboardCheck,
  Search,
  Handshake,
  CheckCircle2,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";

import { fadeUp, stagger, inViewOptions } from "@/lib/animations";

const vantaggi = [
  {
    icon: Factory,
    title: "Prezzi di Fabbrica",
    desc: "Acquisti direttamente dal produttore, senza intermediari. Margini più alti per la tua attività.",
  },
  {
    icon: MapPin,
    title: "Zona Esclusiva",
    desc: "Ti garantiamo una zona di competenza esclusiva per proteggere il tuo investimento e la tua clientela.",
  },
  {
    icon: Megaphone,
    title: "Supporto Marketing",
    desc: "Materiale promozionale, campionari, supporto grafico e co-marketing per far crescere la tua visibilità.",
  },
  {
    icon: Truck,
    title: "Consegna Rapida",
    desc: "Tempi di produzione e consegna ridotti: da 2 a 6 settimane in base al prodotto e alla finitura scelta.",
  },
  {
    icon: CreditCard,
    title: "Pagamenti Flessibili",
    desc: "Condizioni di pagamento personalizzate e flessibili, studiate per sostenere la crescita del tuo business.",
  },
  {
    icon: GraduationCap,
    title: "Formazione Tecnica",
    desc: "Corsi di formazione tecnica e commerciale per te e il tuo team. Aggiornamento continuo sui nostri prodotti.",
  },
  {
    icon: Monitor,
    title: "Piattaforma Online Dedicata",
    desc: "Accedi alla nostra piattaforma riservata per monitorare lo stato dei tuoi ordini, verificare i pagamenti e gestire i preventivi in tempo reale.",
  },
];

const steps = [
  {
    icon: ClipboardCheck,
    step: "01",
    title: "Candidatura",
    desc: "Compila il modulo di contatto indicando la tua zona di interesse e la tua esperienza nel settore serramenti.",
  },
  {
    icon: Search,
    step: "02",
    title: "Valutazione",
    desc: "Il nostro team commerciale valuta la tua candidatura e ti contatta per un colloquio conoscitivo e una visita in azienda.",
  },
  {
    icon: Handshake,
    step: "03",
    title: "Partnership Attiva",
    desc: "Firmi l'accordo, ricevi il campionario e inizi subito a vendere con il supporto completo di ThermoDMR.",
  },
];

const DiventaRivenditore = () => {
  const [heroRef, heroInView] = useInView(inViewOptions);
  const [vantaggiRef, vantaggiInView] = useInView(inViewOptions);
  const [stepsRef, stepsInView] = useInView(inViewOptions);
  const [ctaRef, ctaInView] = useInView(inViewOptions);

  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />

      {/* Hero */}
      <section ref={heroRef} className="relative pt-20 min-h-[400px] sm:min-h-[540px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/cta-bg.jpg"
            alt="Diventa Rivenditore ThermoDMR"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(0,0%,8%)]/85 via-[hsl(210,80%,15%)]/80 to-[hsl(195,85%,25%)]/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 w-full">
          <motion.div initial="hidden" animate={heroInView ? "visible" : "hidden"} variants={stagger} className="max-w-3xl">
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.3em] text-[hsl(195,85%,65%)] uppercase mb-4">
              Partnership
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-2xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 sm:mb-4 sm:mb-6">
              Diventa Rivenditore{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(195,85%,50%)] to-[hsl(210,80%,55%)]">
                ThermoDMR
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} classNambase sm:text-lg text-white/75 leading-relaxed max-w-2xl mb-6 sm:x-w-2xl mb-8">
              Entra nella nostra rete di rivenditori e offri ai tuoi clienti serramenti di qualità superiore
              con profilo tedesco, margini competitivi e supporto dedicato.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link to="/contatti" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-[hsl(195,85%,45%)] hover:bg-[hsl(195,85%,38%)] text-white font-semibold rounded-full px-10 text-base shadow-[0_6px_30px_hsl(195,85%,45%,0.4)] min-h-[48px]"
                >
                  Candidati Ora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="#vantaggi-rivenditore" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto rounded-full px-8 text-base border-white/40 text-white bg-white/10 hover:bg-white/20 hover:text-white min-h-[48px]"
                >
                  Scopri i Vantaggi
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Vantaggi */}
      <section ref={vantaggiRef} id="vantaggi-rivenditore" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" animate={vantaggiInView ? "visible" : "hidden"} variants={stagger} className="text-center mb-16">
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.3em] text-[hsl(195,85%,45%)] uppercase mb-4">
              I Vantaggi della Partnership
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-[hsl(0,0%,10%)]">
              Perché Scegliere ThermoDMR
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[hsl(0,0%,45%)] text-lg mt-4 max-w-2xl mx-auto">
              Un partner che ti supporta a 360°: dalla formazione alla consegna, dal marketing alla post-vendita.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" animate={vantaggiInView ? "visible" : "hidden"} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {vantaggi.map((v) => (
              <motion.div
                key={v.title}
                variants={fadeUp}
                className="group p-5 sm:p-8 rounded-2xl border border-[hsl(0,0%,90%)] bg-[hsl(0,0%,98%)] hover:shadow-xl hover:border-[hsl(195,85%,45%)]/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[hsl(195,85%,45%)] text-white shadow-[0_4px_20px_hsl(195,85%,45%,0.3)] mb-5">
                  <v.icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-bold text-[hsl(0,0%,10%)] mb-2">{v.title}</h3>
                <p className="text-sm text-[hsl(0,0%,45%)] leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Come Funziona */}
      <section ref={stepsRef} className="py-24 bg-[hsl(0,0%,97%)]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial="hidden" animate={stepsInView ? "visible" : "hidden"} variants={stagger} className="text-center mb-16">
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.3em] text-[hsl(195,85%,45%)] uppercase mb-4">
              Il Percorso
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-[hsl(0,0%,10%)]">
              Come Funziona
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" animate={stepsInView ? "visible" : "hidden"} variants={stagger} className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <motion.div key={s.step} variants={fadeUp} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-[hsl(195,85%,45%)]/30" />
                )}
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white border-2 border-[hsl(195,85%,45%)]/20 shadow-lg mb-6 relative">
                  <s.icon className="h-10 w-10 text-[hsl(195,85%,45%)]" />
                  <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-8 h-8 rounded-full bg-[hsl(195,85%,45%)] text-white text-xs font-bold shadow">
                    {s.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[hsl(0,0%,10%)] mb-3">{s.title}</h3>
                <p className="text-sm text-[hsl(0,0%,45%)] leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Finale */}
      <section ref={ctaRef} className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(195,85%,35%)] to-[hsl(195,85%,25%)]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div initial="hidden" animate={ctaInView ? "visible" : "hidden"} variants={stagger}>
            <motion.div variants={fadeUp} className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/15 mb-6">
              <Award className="h-8 w-8 text-white" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Pronto a Crescere con Noi?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-white/80 mb-6 max-w-2xl mx-auto leading-relaxed">
              Compila il modulo di contatto e il nostro team commerciale ti ricontatterà entro 24 ore per discutere della tua candidatura.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-white/70 mb-10">
              {["Prezzi di fabbrica", "Zona esclusiva", "Supporto marketing", "Formazione tecnica", "Piattaforma online dedicata"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-white" />
                  {t}
                </span>
              ))}
            </motion.div>

            <motion.div variants={fadeUp}>
              <Link to="/contatti" className="w-full sm:w-auto inline-block">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-[hsl(195,85%,35%)] hover:bg-white/90 font-bold rounded-full px-12 text-base shadow-xl min-h-[48px]"
                >
                  Candidati Ora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};

export default DiventaRivenditore;
