import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Shield, Truck, BadgePercent, Headphones, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const stagger = { visible: { transition: { staggerChildren: 0.15 } } };
const inViewOptions = { triggerOnce: true, threshold: 0.05, rootMargin: "0px 0px -50px 0px" };

const guarantees = [
  {
    icon: Shield,
    title: "Zero Reclami, Zero Problemi",
    desc: "Qualità certificata e controllo rigoroso su ogni prodotto. Meno resi, più reputazione per la tua attività.",
    details: [
      "Controllo qualità su ogni singolo pezzo",
      "Certificazioni europee complete",
      "Test di tenuta all'aria, acqua e vento",
      "Garanzia di 10 anni su tutti i prodotti",
    ],
  },
  {
    icon: Truck,
    title: "Consegna Garantita nei Tempi",
    desc: "Mai più clienti che aspettano. Da 2 a 6 settimane dalla conferma d'ordine, garantite contrattualmente.",
    details: [
      "Da 2 a 6 settimane garantite contrattualmente",
      "Tracking ordine in tempo reale",
      "Penale automatica in caso di ritardo",
      "Consegna con mezzo dedicato e scarico incluso",
    ],
  },
  {
    icon: BadgePercent,
    title: "Margini Protetti",
    desc: "Listino riservato e zona esclusiva. Nessuna concorrenza interna tra rivenditori ThermoDMR nella tua area.",
    details: [
      "Zona di esclusiva territoriale",
      "Listino prezzi riservato e protetto",
      "Nessuna vendita diretta al pubblico",
      "Politica anti-dumping tra rivenditori",
    ],
  },
  {
    icon: Headphones,
    title: "Supporto Commerciale Dedicato",
    desc: "Un referente sempre disponibile, materiale marketing personalizzato e formazione tecnica continua.",
    details: [
      "Referente commerciale dedicato",
      "Materiale marketing personalizzato",
      "Formazione tecnica e commerciale",
      "Assistenza post-vendita prioritaria",
    ],
  },
];

const GaranziePage = () => {
  const [ref, inView] = useInView(inViewOptions);

  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-[hsl(0,0%,97%)]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.3em] text-[hsl(195,85%,45%)] uppercase mb-4">
              Le Nostre Garanzie
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-extrabold text-[hsl(0,0%,10%)] leading-tight mb-6">
              Garanzie <span className="text-[hsl(195,85%,45%)]">Contrattuali</span> per la Tua Tranquillità
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-[hsl(0,0%,40%)] leading-relaxed">
              Non promettiamo, garantiamo. Ogni impegno è scritto nero su bianco nel contratto di partnership.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Guarantees */}
      <section ref={ref} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          {guarantees.map((g, i) => (
            <motion.div
              key={g.title}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              className="grid lg:grid-cols-2 gap-12 items-start p-8 rounded-2xl bg-[hsl(0,0%,97%)] border-l-4 border-[hsl(195,85%,45%)]"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[hsl(195,85%,45%)] text-white">
                    <g.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[hsl(0,0%,10%)]">{g.title}</h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[hsl(195,85%,45%)] bg-[hsl(195,85%,45%)]/10 px-2 py-0.5 rounded-full">
                      Garantito contrattualmente
                    </span>
                  </div>
                </div>
                <p className="text-[hsl(0,0%,40%)] leading-relaxed">{g.desc}</p>
              </div>
              <ul className="space-y-3">
                {g.details.map((d) => (
                  <li key={d} className="flex items-center gap-3 text-[hsl(0,0%,35%)]">
                    <CheckCircle2 className="h-5 w-5 text-[hsl(195,85%,45%)] shrink-0" />
                    <span className="text-sm font-medium">{d}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[hsl(195,85%,40%)] to-[hsl(210,80%,40%)]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">Vuoi Leggere il Contratto Completo?</h2>
          <p className="text-white/80 text-lg mb-8">
            Contattaci e ti invieremo il contratto di partnership senza impegno.
          </p>
          <Link to="/contatti">
            <Button size="lg" className="bg-white text-[hsl(195,85%,40%)] hover:bg-white/90 font-bold rounded-full px-12 text-base shadow-xl">
              Richiedi il Contratto <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};

export default GaranziePage;
