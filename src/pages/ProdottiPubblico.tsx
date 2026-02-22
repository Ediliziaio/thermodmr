import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ArrowRight,
  ThermometerSun,
  Shield,
  Box,
  Blinds,
  SunDim,
  CheckCircle2,
  Sparkles,
  Zap,
  Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };
const inViewOptions = { triggerOnce: true, threshold: 0.05, rootMargin: "0px 0px -50px 0px" };

const pvcModels = [
  {
    icon: Sparkles,
    name: "Modello Base",
    desc: "La soluzione ideale per chi cerca qualità e convenienza. Profilo a 3 camere con ottime prestazioni termiche.",
    features: ["Profilo a 3 camere", "Classe B", "Vetrocamera standard", "Ampia gamma colori"],
  },
  {
    icon: Zap,
    name: "Modello Plus",
    desc: "Il best-seller della gamma. Profilo a 5 camere per un isolamento superiore e massimo comfort abitativo.",
    features: ["Profilo a 5 camere", "Classe A", "Vetrocamera con gas argon", "Ferramenta Roto"],
  },
  {
    icon: Crown,
    name: "Modello Premium",
    desc: "Il top di gamma per progetti di alto livello. Profilo a 7 camere con prestazioni certificate Passivhaus.",
    features: ["Profilo a 7 camere", "Classe A+", "Triplo vetro basso emissivo", "Design minimale"],
  },
];

const otherProducts = [
  {
    icon: Shield,
    title: "Portoncini in PVC",
    image: "/images/product-porte.jpg",
    desc: "Portoncini d'ingresso in PVC con elevata sicurezza e isolamento termico. Finiture personalizzabili per adattarsi a ogni stile architettonico.",
    features: [
      "Pannelli decorativi personalizzabili",
      "Serratura di sicurezza multipoint",
      "Isolamento termico e acustico",
      "Soglia ribassata disponibile",
      "Resistenza agli agenti atmosferici",
    ],
  },
  {
    icon: Box,
    title: "Cassonetti",
    image: "/images/product-pvc.jpg",
    desc: "Cassonetti coibentati per avvolgibili, progettati per eliminare i ponti termici e garantire il massimo isolamento nella zona del vano avvolgibile.",
    features: [
      "Coibentazione in EPS ad alta densità",
      "Eliminazione ponti termici",
      "Ispezione frontale facilitata",
      "Compatibili con tapparelle motorizzate",
      "Dimensioni su misura",
    ],
  },
  {
    icon: Blinds,
    title: "Tapparelle",
    image: "/images/product-alluminio.jpg",
    desc: "Tapparelle in PVC e alluminio coibentato, disponibili con motorizzazione elettrica e predisposizione per la domotica.",
    features: [
      "PVC o alluminio coibentato",
      "Motorizzazione elettrica",
      "Predisposizione domotica",
      "Anti-sollevamento di sicurezza",
      "Colori coordinati con infissi",
    ],
  },
  {
    icon: SunDim,
    title: "Persiane",
    image: "/images/product-persiane.jpg",
    desc: "Persiane in alluminio con lamelle orientabili per un controllo ottimale della luce e della ventilazione. Design elegante e zero manutenzione.",
    features: [
      "Alluminio verniciato a polvere",
      "Lamelle orientabili",
      "Cerniere a scomparsa",
      "Ampia gamma RAL",
      "Manutenzione zero",
    ],
  },
];

const ProdottiPubblico = () => {
  const [heroRef, heroInView] = useInView(inViewOptions);
  const [pvcRef, pvcInView] = useInView(inViewOptions);
  const [otherRef, otherInView] = useInView(inViewOptions);

  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />

      {/* Hero */}
      <section ref={heroRef} className="pt-32 pb-20 bg-[hsl(0,0%,97%)]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" animate={heroInView ? "visible" : "hidden"} variants={stagger} className="max-w-3xl">
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.3em] text-[hsl(195,85%,45%)] uppercase mb-4">
              I Nostri Prodotti
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-extrabold text-[hsl(0,0%,10%)] leading-tight mb-6">
              Serramenti in PVC di{" "}
              <span className="text-[hsl(195,85%,45%)]">Qualità Superiore</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-[hsl(0,0%,40%)] leading-relaxed">
              Finestre, portoncini, cassonetti, tapparelle e persiane: una gamma completa
              per massimizzare i tuoi margini e la soddisfazione dei tuoi clienti.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Finestre in PVC — sezione espansa con 3 modelli */}
      <section ref={pvcRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" animate={pvcInView ? "visible" : "hidden"} variants={stagger}>
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
              <motion.div variants={fadeUp}>
                <div className="relative rounded-3xl overflow-hidden shadow-xl">
                  <img src="/images/product-pvc.jpg" alt="Finestre in PVC" className="w-full aspect-[4/3] object-cover" loading="lazy" />
                  <div className="absolute bottom-4 left-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[hsl(195,85%,45%)] text-white shadow-lg">
                    <ThermometerSun className="h-6 w-6" />
                  </div>
                </div>
              </motion.div>
              <motion.div variants={fadeUp} className="space-y-6">
                <h2 className="text-3xl font-bold text-[hsl(0,0%,10%)]">Finestre in PVC</h2>
                <p className="text-[hsl(0,0%,40%)] leading-relaxed text-lg">
                  Il prodotto più richiesto dal mercato. Tre linee di profili per coprire ogni fascia
                  di prezzo e prestazione: dal progetto base alla ristrutturazione premium.
                </p>
                <Link to="/contatti">
                  <Button className="bg-[hsl(195,85%,45%)] hover:bg-[hsl(195,85%,38%)] text-white font-semibold rounded-full px-8 mt-2 shadow-[0_4px_20px_hsl(195,85%,45%,0.25)]">
                    Richiedi Preventivo <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* 3 sotto-card modelli */}
            <div className="grid md:grid-cols-3 gap-8">
              {pvcModels.map((m) => (
                <motion.div key={m.name} variants={fadeUp}>
                  <Card className="h-full border-[hsl(0,0%,90%)] hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6 space-y-4">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[hsl(195,85%,45%,0.1)]">
                        <m.icon className="h-5 w-5 text-[hsl(195,85%,45%)]" />
                      </div>
                      <h3 className="text-xl font-bold text-[hsl(0,0%,10%)]">{m.name}</h3>
                      <p className="text-sm text-[hsl(0,0%,40%)] leading-relaxed">{m.desc}</p>
                      <ul className="space-y-2 pt-2">
                        {m.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-[hsl(0,0%,35%)]">
                            <CheckCircle2 className="h-4 w-4 text-[hsl(195,85%,45%)] shrink-0" />
                            <span className="text-sm">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Altre categorie — layout alternato */}
      <section ref={otherRef} className="py-24 bg-[hsl(0,0%,97%)]">
        <div className="max-w-7xl mx-auto px-6 space-y-24">
          {otherProducts.map((p, i) => (
            <motion.div
              key={p.title}
              initial="hidden"
              animate={otherInView ? "visible" : "hidden"}
              variants={stagger}
              className="grid lg:grid-cols-2 gap-16 items-center"
            >
              <motion.div variants={fadeUp} className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className="relative rounded-3xl overflow-hidden shadow-xl">
                  <img src={p.image} alt={p.title} className="w-full aspect-[4/3] object-cover" loading="lazy" />
                  <div className="absolute bottom-4 left-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[hsl(195,85%,45%)] text-white shadow-lg">
                    <p.icon className="h-6 w-6" />
                  </div>
                </div>
              </motion.div>
              <motion.div variants={fadeUp} className={`space-y-6 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <h2 className="text-3xl font-bold text-[hsl(0,0%,10%)]">{p.title}</h2>
                <p className="text-[hsl(0,0%,40%)] leading-relaxed text-lg">{p.desc}</p>
                <ul className="space-y-3">
                  {p.features.map((f) => (
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
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};

export default ProdottiPubblico;
