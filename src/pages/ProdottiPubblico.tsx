import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, ThermometerSun, Layers, DoorOpen, SunDim, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };
const inViewOptions = { triggerOnce: true, threshold: 0.05, rootMargin: "0px 0px -50px 0px" };

const products = [
  {
    icon: ThermometerSun,
    title: "Finestre in PVC",
    image: "/images/product-pvc.jpg",
    desc: "Il prodotto più richiesto dal mercato. Alto isolamento termico e acustico, manutenzione zero e margini eccellenti per il rivenditore.",
    features: ["Isolamento termico classe A", "Ampia gamma di colori e finiture", "Resistenza agli agenti atmosferici", "Manutenzione zero", "Vetrocamera con gas argon"],
  },
  {
    icon: Layers,
    title: "Finestre in Alluminio",
    image: "/images/product-alluminio.jpg",
    desc: "Linee sottili e grandi superfici vetrate: il prodotto premium che i tuoi clienti cercano. Resistenza e design per progetti di alto livello.",
    features: ["Profili a taglio termico", "Design minimale e moderno", "Resistenza strutturale superiore", "Grandi dimensioni possibili", "Finiture anodizzate o verniciate"],
  },
  {
    icon: DoorOpen,
    title: "Porte e Portoncini",
    image: "/images/product-porte.jpg",
    desc: "Portoncini d'ingresso blindati con finiture personalizzabili. Un prodotto ad alto valore aggiunto che aumenta il ticket medio dei tuoi ordini.",
    features: ["Classe di sicurezza 3", "Isolamento termico e acustico", "Finiture personalizzabili", "Serrature di sicurezza europee", "Soglia a pavimento disponibile"],
  },
  {
    icon: SunDim,
    title: "Persiane e Oscuranti",
    image: "/images/product-persiane.jpg",
    desc: "Completa la vendita con sistemi oscuranti coordinati. Motorizzazione e domotica disponibili per upselling e margini superiori.",
    features: ["Persiane in alluminio e PVC", "Tapparelle motorizzate", "Integrazione domotica", "Colori coordinati con infissi", "Cassonetti coibentati"],
  },
];

const ProdottiPubblico = () => {
  const [ref, inView] = useInView(inViewOptions);

  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-[hsl(0,0%,97%)]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.3em] text-[hsl(195,85%,45%)] uppercase mb-4">
              I Nostri Prodotti
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-extrabold text-[hsl(0,0%,10%)] leading-tight mb-6">
              Serramenti di Qualità per{" "}
              <span className="text-[hsl(195,85%,45%)]">Ogni Esigenza</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-[hsl(0,0%,40%)] leading-relaxed">
              Dalla finestra in PVC al portoncino blindato, ogni prodotto è pensato per
              massimizzare i tuoi margini e la soddisfazione dei tuoi clienti.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Products detail */}
      <section ref={ref} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-24">
          {products.map((p, i) => (
            <motion.div
              key={p.title}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={stagger}
              className={`grid lg:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}
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
