import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, BadgePercent, Clock, Target, TrendingUp, Users, Award, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";

import { fadeUp, stagger, inViewOptions } from "@/lib/animations";

const mainAdvantages = [
  {
    icon: BadgePercent,
    metric: "-30%",
    metricLabel: "vs concorrenza",
    title: "Prezzo Più Basso sul Mercato",
    desc: "Produciamo internamente, senza intermediari. Questo significa prezzi imbattibili e margini più alti su ogni vendita. Non troverai un produttore più competitivo con la stessa qualità.",
  },
  {
    icon: Clock,
    metric: "2-6 sett.",
    metricLabel: "garantite",
    title: "Tempi Certi di Consegna",
    desc: "Da 2 a 6 settimane dalla conferma d'ordine, garantite contrattualmente. Mai più clienti che aspettano mesi, mai più scuse da dare.",
  },
  {
    icon: Target,
    metric: "100%",
    metricLabel: "dedicato",
    title: "Il Tuo Successo è il Nostro",
    desc: "Supporto commerciale, materiale marketing personalizzato, formazione tecnica e un referente dedicato sempre disponibile per far crescere il tuo business.",
  },
];

const extraAdvantages = [
  { icon: TrendingUp, title: "Margini Garantiti", desc: "Listino riservato e zona esclusiva. Nessuna concorrenza interna tra rivenditori ThermoDMR." },
  { icon: Users, title: "Rete Selezionata", desc: "Selezioniamo i nostri partner. Meno rivenditori, più attenzione e supporto dedicato a ciascuno." },
  { icon: Award, title: "Qualità Certificata", desc: "Tutti i prodotti conformi alle normative europee con certificazioni complete incluse." },
  { icon: Headphones, title: "Post-Vendita Garantito", desc: "Assistenza tecnica rapida e ricambi sempre disponibili. Il tuo cliente è sempre seguito." },
];

const VantaggiPage = () => {
  const [ref1, inView1] = useInView(inViewOptions);
  const [ref2, inView2] = useInView(inViewOptions);

  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />

      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-14 sm:pb-20 bg-[hsl(0,0%,97%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.3em] text-[hsl(195,85%,45%)] uppercase mb-3 sm:mb-4">
              I Tuoi Vantaggi Competitivi
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-2xl sm:text-5xl font-extrabold text-[hsl(0,0%,10%)] leading-tight mb-4 sm:mb-6">
              Perché Scegliere{" "}
              <span className="text-[hsl(195,85%,45%)]">ThermoDMR</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-base sm:text-lg text-[hsl(0,0%,40%)] leading-relaxed">
              Stanco di fornitori che non rispettano i tempi, con prezzi sempre più alti e zero supporto?
              Con ThermoDMR hai un partner che lavora per farti guadagnare.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main advantages */}
      <section ref={ref1} className="py-16 sm:py-24 bg-[hsl(0,0%,8%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" animate={inView1 ? "visible" : "hidden"} variants={stagger} className="grid sm:grid-cols-2 gap-6">
            {mainAdvantages.map((a) => (
              <motion.div
                key={a.title}
                variants={fadeUp}
                className="p-8 rounded-2xl bg-white/[0.06] border border-white/10 hover:bg-white/[0.1] hover:border-[hsl(195,85%,45%)]/30 transition-all duration-300"
              >
                <div className="flex gap-5">
                  <div className="shrink-0 space-y-3">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[hsl(195,85%,45%)] text-white shadow-[0_4px_20px_hsl(195,85%,45%,0.3)]">
                      <a.icon className="h-7 w-7" />
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-extrabold text-[hsl(195,85%,55%)]">{a.metric}</p>
                      <p className="text-[10px] text-white/40 uppercase tracking-wider">{a.metricLabel}</p>
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

      {/* Extra advantages */}
      <section ref={ref2} className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" animate={inView2 ? "visible" : "hidden"} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <h2 className="text-3xl font-bold text-[hsl(0,0%,10%)]">E Non È Tutto...</h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {extraAdvantages.map((a) => (
                <motion.div key={a.title} variants={fadeUp} className="p-6 rounded-2xl bg-[hsl(0,0%,97%)] border border-[hsl(0,0%,90%)] text-center hover:shadow-md transition-shadow">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[hsl(195,85%,45%)] text-white mb-4">
                    <a.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-bold text-[hsl(0,0%,10%)] mb-2">{a.title}</h3>
                  <p className="text-sm text-[hsl(0,0%,45%)] leading-relaxed">{a.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[hsl(195,85%,40%)] to-[hsl(210,80%,40%)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4 sm:mb-6">Inizia a Guadagnare di Più Oggi!</h2>
          <p className="text-white/80 text-base sm:text-lg mb-6 sm:mb-8">
            Entra nella rete ThermoDMR e scopri cosa significa avere un partner produttore serio.
          </p>
          <Link to="/contatti">
            <Button size="lg" className="bg-white text-[hsl(195,85%,40%)] hover:bg-white/90 font-bold rounded-full px-12 text-base shadow-xl">
              Diventa Rivenditore <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};

export default VantaggiPage;
