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
  Layers,
  Palette,
  Truck,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import imgConfort from "@/assets/thermodmr-scorrevoli-terrazza.jpg";
import imgDomus from "@/assets/thermodmr-finestra-effetto-legno.jpg";
import imgPassive from "@/assets/thermodmr-serramenti-vista-mare.jpg";
import imgPortoncini from "@/assets/thermodmr-portoncino-ingresso.avif";
import imgCassonetti from "@/assets/thermodmr-cassonetto-installato.jpg";
import imgTapparelle from "@/assets/thermodmr-tapparella-coibentata.webp";
import imgPersiane from "@/assets/thermodmr-persiana-verde.webp";
import imgHero from "@/assets/thermodmr-finestre-pvc-interni.webp";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };
const inViewOptions = { triggerOnce: true, threshold: 0.05, rootMargin: "0px 0px -50px 0px" };

const pvcModels = [
  {
    icon: Sparkles,
    name: "DMR CONFORT",
    link: "/prodotti/dmr-confort",
    image: imgConfort,
    badge: { label: "Miglior Prezzo", color: "green" as const },
    desc: "La soluzione ideale per chi cerca qualità e convenienza. Profilo a 3 camere con ottime prestazioni termiche.",
    features: ["Profilo a 3 camere", "Classe B", "Vetrocamera standard", "Ampia gamma colori"],
  },
  {
    icon: Zap,
    name: "DMR DOMUS",
    link: "/prodotti/dmr-domus",
    image: imgDomus,
    badge: { label: "Best Seller", color: "gold" as const },
    desc: "Il best-seller della gamma. Profilo a 5 camere per un isolamento superiore e massimo comfort abitativo.",
    features: ["Profilo a 5 camere", "Classe A", "Vetrocamera con gas argon", "Ferramenta Roto"],
  },
  {
    icon: Crown,
    name: "DMR PASSIVE",
    link: "/prodotti/dmr-passive",
    image: imgPassive,
    badge: { label: "Top di Gamma", color: "purple" as const },
    desc: "Il top di gamma per progetti di alto livello. Profilo a 7 camere con prestazioni certificate Passivhaus.",
    features: ["Profilo a 7 camere", "Classe A+", "Triplo vetro basso emissivo", "Design minimale"],
  },
];

const badgeColors = {
  green: "bg-[hsl(142,70%,45%)] text-white border-[hsl(142,70%,40%)]",
  gold: "bg-[hsl(38,90%,50%)] text-white border-[hsl(38,90%,45%)]",
  purple: "bg-[hsl(270,60%,55%)] text-white border-[hsl(270,60%,50%)]",
};

const counters = [
  { icon: Layers, value: "7", label: "Linee di Prodotto" },
  { icon: ThermometerSun, value: "3", label: "Modelli Finestre" },
  { icon: Palette, value: "100+", label: "Colori Disponibili" },
  { icon: Truck, value: "2-6", label: "Settimane Consegna" },
];

const otherProducts = [
  {
    icon: Shield,
    title: "Portoncini in PVC",
    link: "/prodotti/portoncini",
    image: imgPortoncini,
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
    link: "/prodotti/cassonetti",
    image: imgCassonetti,
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
    link: "/prodotti/tapparelle",
    image: imgTapparelle,
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
    link: "/prodotti/persiane",
    image: imgPersiane,
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
  const [countersRef, countersInView] = useInView(inViewOptions);
  const [pvcRef, pvcInView] = useInView(inViewOptions);
  const [otherRef, otherInView] = useInView(inViewOptions);
  const [ctaRef, ctaInView] = useInView(inViewOptions);

  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />

      {/* Hero full-width con immagine e overlay */}
      <section ref={heroRef} className="relative pt-20 min-h-[420px] sm:min-h-[480px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={imgHero}
            alt="Serramenti in PVC ThermoDMR"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0,0%,8%)] via-[hsl(0,0%,8%,0.7)] to-[hsl(0,0%,8%,0.3)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-14 pt-24 w-full">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="text-white/60 hover:text-white text-xs">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/40" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white/90 text-xs">Prodotti</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <motion.div initial="hidden" animate={heroInView ? "visible" : "hidden"} variants={stagger}>
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.3em] text-[hsl(195,85%,65%)] uppercase mb-4">
              I Nostri Prodotti
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
              Serramenti in PVC di{" "}
              <span className="text-[hsl(195,85%,55%)]">Qualità Superiore</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-base sm:text-lg text-white/75 leading-relaxed max-w-2xl">
              Finestre, portoncini, cassonetti, tapparelle e persiane: una gamma completa
              per massimizzare i tuoi margini e la soddisfazione dei tuoi clienti.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contatori rapidi */}
      <section ref={countersRef} className="bg-[hsl(0,0%,8%)] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <motion.div
            initial="hidden"
            animate={countersInView ? "visible" : "hidden"}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {counters.map((c) => (
              <motion.div key={c.label} variants={fadeUp} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[hsl(195,85%,45%,0.15)] mb-3">
                  <c.icon className="h-6 w-6 text-[hsl(195,85%,55%)]" />
                </div>
                <p className="text-3xl font-extrabold text-white">{c.value}</p>
                <p className="text-sm text-white/60 mt-1">{c.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Finestre in PVC — 3 modelli con immagini e badge */}
      <section ref={pvcRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" animate={pvcInView ? "visible" : "hidden"} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <p className="text-xs font-bold tracking-[0.3em] text-[hsl(195,85%,45%)] uppercase mb-4">La Gamma Finestre</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[hsl(0,0%,10%)]">Tre Modelli per Ogni Esigenza</h2>
              <p className="text-[hsl(0,0%,40%)] mt-4 max-w-2xl mx-auto">
                Dal progetto base alla ristrutturazione premium: scegli il profilo più adatto al tuo mercato.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {pvcModels.map((m) => (
                <motion.div key={m.name} variants={fadeUp}>
                  <Link to={m.link} className="block h-full">
                    <Card className="h-full border-[hsl(0,0%,90%)] hover:shadow-xl hover:border-[hsl(195,85%,45%,0.3)] transition-all duration-300 group overflow-hidden">
                      <div className="relative">
                        <img src={m.image} alt={m.name} className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                        <Badge className={`${badgeColors[m.badge.color]} absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
                          {m.badge.label}
                        </Badge>
                      </div>
                      <CardContent className="p-6 space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[hsl(195,85%,45%,0.1)]">
                            <m.icon className="h-5 w-5 text-[hsl(195,85%,45%)]" />
                          </div>
                          <h3 className="text-xl font-bold text-[hsl(0,0%,10%)] group-hover:text-[hsl(195,85%,45%)] transition-colors">{m.name}</h3>
                        </div>
                        <p className="text-sm text-[hsl(0,0%,40%)] leading-relaxed">{m.desc}</p>
                        <ul className="space-y-2 pt-2">
                          {m.features.map((f) => (
                            <li key={f} className="flex items-center gap-2 text-[hsl(0,0%,35%)]">
                              <CheckCircle2 className="h-4 w-4 text-[hsl(195,85%,45%)] shrink-0" />
                              <span className="text-sm">{f}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="text-sm font-semibold text-[hsl(195,85%,45%)] flex items-center gap-1 pt-2">
                          Scopri di più <ArrowRight className="h-4 w-4" />
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Altre categorie — layout alternato */}
      <section ref={otherRef} className="py-24 bg-[hsl(0,0%,97%)]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" animate={otherInView ? "visible" : "hidden"} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <p className="text-xs font-bold tracking-[0.3em] text-[hsl(195,85%,45%)] uppercase mb-4">Complementi</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[hsl(0,0%,10%)]">Accessori e Chiusure</h2>
              <p className="text-[hsl(0,0%,40%)] mt-4 max-w-2xl mx-auto">
                Portoncini, cassonetti, tapparelle e persiane per completare l'offerta ai tuoi clienti.
              </p>
            </motion.div>
          </motion.div>

          <div className="space-y-24">
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
                  <div className="flex flex-wrap gap-3 pt-2">
                    <Link to={p.link}>
                      <Button variant="outline" className="rounded-full px-6 border-[hsl(195,85%,45%)] text-[hsl(195,85%,45%)] hover:bg-[hsl(195,85%,45%,0.05)] font-semibold">
                        Scopri di più <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link to="/contatti">
                      <Button className="bg-[hsl(195,85%,45%)] hover:bg-[hsl(195,85%,38%)] text-white font-semibold rounded-full px-8 shadow-[0_4px_20px_hsl(195,85%,45%,0.25)]">
                        Richiedi Preventivo
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Finale */}
      <section ref={ctaRef} className="relative py-24 overflow-hidden">
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
              Diventa Rivenditore ThermoDMR
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Entra nella rete di rivenditori ThermoDMR e offri ai tuoi clienti serramenti di qualità superiore con margini competitivi e supporto dedicato.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Link to="/diventa-rivenditore">
                <Button size="lg" className="bg-white text-[hsl(195,85%,35%)] hover:bg-white/90 font-bold rounded-full px-10 shadow-xl">
                  Diventa Rivenditore <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/vantaggi">
                <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 font-semibold rounded-full px-10">
                  Scopri i Vantaggi
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

export default ProdottiPubblico;
