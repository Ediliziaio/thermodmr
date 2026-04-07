import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, CheckCircle2, Users, Award, Factory, Wrench, MapPin, Handshake } from "lucide-react";
import imgVistaMare from "@/assets/thermodmr-serramenti-vista-mare.jpg";
import imgInfissiEsterni from "@/assets/thermodmr-infissi-esterni.webp";
import { Button } from "@/components/ui/button";
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import { useLanguage } from "@/i18n/LanguageContext";
import SeoHead from "@/components/SeoHead";

import { fadeUp, stagger, inViewOptions } from "@/lib/animations";

const valueIcons = [Factory, Users, Award, Wrench];

const ChiSiamo = () => {
  const { t, lang } = useLanguage();
  const [ref1, inView1] = useInView(inViewOptions);
  const [ref2, inView2] = useInView(inViewOptions);
  const [ref3, inView3] = useInView(inViewOptions);
  const [ref4, inView4] = useInView(inViewOptions);
  const [ref5, inView5] = useInView(inViewOptions);

  const contattiLink = lang === "ro" ? "/ro/contact" : "/contatti";
  const diventaLink = lang === "ro" ? "/ro/devino-distribuitor" : "/diventa-rivenditore";
  const isRo = lang === "ro";

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title={isRo ? "Despre Noi — ThermoDMR, Producător Tâmplărie PVC" : "Chi Siamo — ThermoDMR, Produttore Serramenti PVC"}
        description={isRo ? "ThermoDMR este un brand al MARYSORYNA SRL, producător de tâmplărie PVC cu profil german. Descoperă povestea, valorile și echipa noastră." : "ThermoDMR è un marchio di MARYSORYNA SRL, produttore di serramenti PVC con profilo tedesco. Scopri la nostra storia, valori e perché siamo diversi."}
        canonical={isRo ? "/ro/despre-noi" : "/chi-siamo"}
        lang={lang}
        hreflangIt="/chi-siamo"
        hreflangRo="/ro/despre-noi"
      />
      <PublicNavbar />

      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-14 sm:pb-20 bg-[hsl(0,0%,97%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-xl">
              <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.3em] text-[hsl(195,85%,45%)] uppercase mb-3 sm:mb-4">
                {t.chiSiamo.heroTag}
              </motion.p>
              <motion.h1 variants={fadeUp} className="text-2xl sm:text-5xl font-extrabold text-[hsl(0,0%,10%)] leading-tight mb-4 sm:mb-6">
                {t.chiSiamo.heroTitle}{" "}
                <span className="text-[hsl(195,85%,45%)]">{t.chiSiamo.heroTitleHighlight}</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-base sm:text-lg text-[hsl(0,0%,40%)] leading-relaxed">
                {t.chiSiamo.heroDesc}
              </motion.p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }}>
              <img src={imgVistaMare} alt="Serramenti ThermoDMR vista mare" className="w-full rounded-3xl shadow-xl object-cover aspect-[4/3]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Storia */}
      <section ref={ref1} className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" animate={inView1 ? "visible" : "hidden"} variants={stagger} className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
            <motion.div variants={fadeUp}>
              <img src={imgInfissiEsterni} alt="Infissi esterni ThermoDMR" className="w-full rounded-3xl shadow-xl object-cover aspect-[4/3]" />
            </motion.div>
            <motion.div variants={fadeUp} className="space-y-4 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-[hsl(0,0%,10%)]">{t.chiSiamo.storiaTitle}</h2>
              <p className="text-[hsl(0,0%,40%)] leading-relaxed">{t.chiSiamo.storiaP1}</p>
              <p className="text-[hsl(0,0%,40%)] leading-relaxed">{t.chiSiamo.storiaP2}</p>
              <p className="text-[hsl(0,0%,40%)] leading-relaxed" dangerouslySetInnerHTML={{ __html: t.chiSiamo.storiaP3 }} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Valori */}
      <section ref={ref2} className="py-16 sm:py-24 bg-[hsl(0,0%,97%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" animate={inView2 ? "visible" : "hidden"} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-10 sm:mb-16">
              <p className="text-xs font-bold tracking-[0.3em] text-[hsl(195,85%,45%)] uppercase mb-3 sm:mb-4">{t.chiSiamo.valoriTag}</p>
              <h2 className="text-2xl sm:text-4xl font-bold text-[hsl(0,0%,10%)]">{t.chiSiamo.valoriTitle}</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-8">
              {t.chiSiamo.values.map((v, i) => {
                const Icon = valueIcons[i];
                return (
                  <motion.div key={v.title} variants={fadeUp} className="flex flex-col sm:flex-row gap-4 sm:gap-5 p-5 sm:p-8 rounded-2xl bg-white border border-[hsl(0,0%,90%)] shadow-sm hover:shadow-md transition-shadow">
                    <div className="shrink-0 inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[hsl(195,85%,45%)] text-white">
                      <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[hsl(0,0%,10%)] mb-2">{v.title}</h3>
                      <p className="text-sm text-[hsl(0,0%,45%)] leading-relaxed">{v.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Numeri */}
      <section ref={ref3} className="py-14 sm:py-20 bg-[hsl(0,0%,8%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" animate={inView3 ? "visible" : "hidden"} variants={stagger} className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {t.chiSiamo.stats.map((s) => (
              <motion.div key={s.label} variants={fadeUp} className="space-y-2">
                <p className="text-3xl sm:text-5xl font-extrabold text-[hsl(195,85%,55%)]">{s.value}</p>
                <p className="text-sm text-white/60 font-medium">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trova il Rivenditore */}
      <section ref={ref4} className="py-16 sm:py-20 bg-[hsl(0,0%,97%)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" animate={inView4 ? "visible" : "hidden"} variants={stagger}>
            <motion.div variants={fadeUp} className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[hsl(195,85%,45%)] text-white mb-6">
              <MapPin className="h-8 w-8" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-[hsl(0,0%,10%)] mb-4">
              {t.chiSiamo.trovaDealerTitle}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[hsl(0,0%,45%)] text-lg mb-8 leading-relaxed">
              {t.chiSiamo.trovaDealerDesc}
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link to={contattiLink}>
                <Button className="bg-[hsl(195,85%,45%)] hover:bg-[hsl(195,85%,38%)] text-white font-semibold rounded-full px-8 shadow-[0_4px_20px_hsl(195,85%,45%,0.25)]">
                  {t.cta.trovaDealerBtn} <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Diventa Rivenditore */}
      <section ref={ref5} className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(195,85%,35%)] to-[hsl(195,85%,25%)]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" animate={inView5 ? "visible" : "hidden"} variants={stagger}>
            <motion.div variants={fadeUp} className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/15 mb-6">
              <Handshake className="h-8 w-8 text-white" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
              {t.chiSiamo.becomeTitle}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base sm:text-lg text-white/80 mb-6 max-w-2xl mx-auto leading-relaxed">
              {t.chiSiamo.becomeDesc}
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-white/70 mb-10">
              {t.chiSiamo.becomePerks.map((perk) => (
                <span key={perk} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-white" />
                  {perk}
                </span>
              ))}
            </motion.div>
            <motion.div variants={fadeUp}>
              <Link to={diventaLink}>
                <Button size="lg" className="bg-white text-[hsl(195,85%,35%)] hover:bg-white/90 font-bold rounded-full px-12 text-base shadow-xl min-h-[48px]">
                  {t.cta.scopriCome} <ArrowRight className="ml-2 h-5 w-5" />
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
