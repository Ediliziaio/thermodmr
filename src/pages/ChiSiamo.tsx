import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, CheckCircle2, Users, Award, Factory, Wrench, MapPin, Handshake } from "lucide-react";
import imgVistaMare from "@/assets/thermodmr-serramenti-vista-mare.jpg";
import imgInfissiEsterni from "@/assets/thermodmr-infissi-esterni.webp";
import { Button } from "@/components/ui/button";
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";

import { fadeUp, stagger, inViewOptions } from "@/lib/animations";

const values = [
  { icon: Factory, title: "Produzione Interna", desc: "Nessun intermediario. Controlliamo ogni fase della produzione per garantirti il miglior rapporto qualità-prezzo." },
  { icon: Users, title: "Partner, Non Fornitore", desc: "Il nostro obiettivo non è venderti un prodotto, ma farti guadagnare. Cresciamo insieme ai nostri rivenditori." },
  { icon: Award, title: "Qualità Certificata", desc: "Ogni prodotto supera rigidi controlli qualità prima della spedizione. Standard europei e certificazioni complete." },
  { icon: Wrench, title: "Supporto Costante", desc: "Un referente dedicato, formazione tecnica e materiale marketing personalizzato. Sempre al tuo fianco." },
];

const ChiSiamo = () => {
  const [ref1, inView1] = useInView(inViewOptions);
  const [ref2, inView2] = useInView(inViewOptions);
  const [ref3, inView3] = useInView(inViewOptions);
  const [ref4, inView4] = useInView(inViewOptions);
  const [ref5, inView5] = useInView(inViewOptions);

  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />

      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-14 sm:pb-20 bg-[hsl(0,0%,97%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-xl">
              <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.3em] text-[hsl(195,85%,45%)] uppercase mb-3 sm:mb-4">
                Chi Siamo
              </motion.p>
              <motion.h1 variants={fadeUp} className="text-2xl sm:text-5xl font-extrabold text-[hsl(0,0%,10%)] leading-tight mb-4 sm:mb-6">
                Produciamo Infissi di Qualità per{" "}
                <span className="text-[hsl(195,85%,45%)]">Far Crescere la Tua Attività</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-base sm:text-lg text-[hsl(0,0%,40%)] leading-relaxed">
                Da oltre 10 anni produciamo serramenti internamente, senza intermediari.
                Questo ci permette di offrirti il prezzo più competitivo sul mercato,
                tempi di consegna da 2 a 6 settimane e un controllo qualità rigoroso su ogni singolo prodotto.
              </motion.p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }}>
              <img src={imgVistaMare} alt="Serramenti ThermoDMR vista mare" className="w-full rounded-3xl shadow-xl object-cover aspect-[4/3]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Storia */}
      <section ref={ref1} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" animate={inView1 ? "visible" : "hidden"} variants={stagger} className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp}>
              <img src={imgInfissiEsterni} alt="Infissi esterni ThermoDMR" className="w-full rounded-3xl shadow-xl object-cover aspect-[4/3]" />
            </motion.div>
            <motion.div variants={fadeUp} className="space-y-6">
              <h2 className="text-3xl font-bold text-[hsl(0,0%,10%)]">La Nostra Storia</h2>
              <p className="text-[hsl(0,0%,40%)] leading-relaxed">
                ThermoDMR nasce dalla passione per il serramento e dalla volontà di offrire ai rivenditori un partner affidabile.
                Abbiamo investito in tecnologia e processi produttivi per eliminare ogni intermediario e garantire
                prezzi competitivi senza compromessi sulla qualità.
              </p>
              <p className="text-[hsl(0,0%,40%)] leading-relaxed">
                Il nostro stabilimento produttivo è dotato di macchinari di ultima generazione che ci permettono di
                lavorare PVC, alluminio e legno con precisione millimetrica. Ogni finestra, porta o persiana viene
                assemblata e testata internamente prima della spedizione.
              </p>
              <p className="text-[hsl(0,0%,40%)] leading-relaxed">
                Oggi collaboriamo con oltre 200 rivenditori in tutta Italia, uniti da un obiettivo comune:
                <strong> offrire al cliente finale il miglior prodotto al miglior prezzo.</strong>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Valori */}
      <section ref={ref2} className="py-24 bg-[hsl(0,0%,97%)]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" animate={inView2 ? "visible" : "hidden"} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <p className="text-xs font-bold tracking-[0.3em] text-[hsl(195,85%,45%)] uppercase mb-4">I Nostri Valori</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[hsl(0,0%,10%)]">Cosa Ci Guida Ogni Giorno</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-8">
              {values.map((v) => (
                <motion.div key={v.title} variants={fadeUp} className="flex flex-col sm:flex-row gap-4 sm:gap-5 p-5 sm:p-8 rounded-2xl bg-white border border-[hsl(0,0%,90%)] shadow-sm hover:shadow-md transition-shadow">
                  <div className="shrink-0 inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[hsl(195,85%,45%)] text-white">
                    <v.icon className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[hsl(0,0%,10%)] mb-2">{v.title}</h3>
                    <p className="text-sm text-[hsl(0,0%,45%)] leading-relaxed">{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Numeri */}
      <section ref={ref3} className="py-20 bg-[hsl(0,0%,8%)]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" animate={inView3 ? "visible" : "hidden"} variants={stagger} className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "200+", label: "Rivenditori Attivi" },
              { value: "10+", label: "Anni di Esperienza" },
              { value: "2-6 sett.", label: "Tempi di Consegna" },
              { value: "98%", label: "Consegne Puntuali" },
            ].map((s) => (
              <motion.div key={s.label} variants={fadeUp} className="space-y-2">
                <p className="text-3xl sm:text-5xl font-extrabold text-[hsl(195,85%,55%)]">{s.value}</p>
                <p className="text-sm text-white/60 font-medium">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trova il Rivenditore */}
      <section ref={ref4} className="py-20 bg-[hsl(0,0%,97%)]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div initial="hidden" animate={inView4 ? "visible" : "hidden"} variants={stagger}>
            <motion.div variants={fadeUp} className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[hsl(195,85%,45%)] text-white mb-6">
              <MapPin className="h-8 w-8" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-[hsl(0,0%,10%)] mb-4">
              Trova il Rivenditore Più Vicino
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[hsl(0,0%,45%)] text-lg mb-8 leading-relaxed">
              Cerca il punto vendita autorizzato ThermoDMR nella tua zona per toccare con mano la qualità dei nostri serramenti e ricevere una consulenza personalizzata.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link to="/contatti">
                <Button className="bg-[hsl(195,85%,45%)] hover:bg-[hsl(195,85%,38%)] text-white font-semibold rounded-full px-8 shadow-[0_4px_20px_hsl(195,85%,45%,0.25)]">
                  Trova Rivenditore <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Diventa Rivenditore */}
      <section ref={ref5} className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(195,85%,35%)] to-[hsl(195,85%,25%)]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div initial="hidden" animate={inView5 ? "visible" : "hidden"} variants={stagger}>
            <motion.div variants={fadeUp} className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/15 mb-6">
              <Handshake className="h-8 w-8 text-white" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Vuoi Diventare Rivenditore ThermoDMR?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-white/80 mb-6 max-w-2xl mx-auto leading-relaxed">
              Prezzi di fabbrica, zona esclusiva e supporto completo: entra nella nostra rete e fai crescere la tua attività con prodotti di qualità superiore.
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
              <Link to="/diventa-rivenditore">
                <Button size="lg" className="bg-white text-[hsl(195,85%,35%)] hover:bg-white/90 font-bold rounded-full px-12 text-base shadow-xl min-h-[48px]">
                  Scopri Come <ArrowRight className="ml-2 h-5 w-5" />
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

export default ChiSiamo;
