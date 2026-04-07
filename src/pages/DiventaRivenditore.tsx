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
import { useLanguage } from "@/i18n/LanguageContext";
import SeoHead from "@/components/SeoHead";

import { fadeUp, stagger, inViewOptions } from "@/lib/animations";

const benefitIcons = [Factory, MapPin, Megaphone, Truck, CreditCard, GraduationCap, Monitor];
const stepIcons = [ClipboardCheck, Search, Handshake];

const DiventaRivenditore = () => {
  const { t, lang } = useLanguage();
  const [heroRef, heroInView] = useInView(inViewOptions);
  const [vantaggiRef, vantaggiInView] = useInView(inViewOptions);
  const [stepsRef, stepsInView] = useInView(inViewOptions);
  const [ctaRef, ctaInView] = useInView(inViewOptions);

  const isRo = lang === "ro";
  const contattiLink = lang === "ro" ? "/ro/contact" : "/contatti";

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title={isRo ? "Devino Distribuitor ThermoDMR — Maximizează Profiturile" : "Diventa Rivenditore ThermoDMR — Massimizza i Tuoi Margini"}
        description={isRo ? "Alătură-te rețelei de distribuitori ThermoDMR. Prețuri de fabrică, suport marketing, formare tehnică și marje competitive. Candidatură gratuită." : "Unisciti alla rete di rivenditori ThermoDMR. Prezzi di fabbrica, supporto marketing, formazione tecnica e margini competitivi. Candidatura gratuita."}
        canonical={isRo ? "/ro/devino-distribuitor" : "/diventa-rivenditore"}
        lang={lang}
        hreflangIt="/diventa-rivenditore"
        hreflangRo="/ro/devino-distribuitor"
      />
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
              {t.diventaRivenditore.heroTag}
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-2xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 sm:mb-6">
              {t.diventaRivenditore.heroTitle}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-base sm:text-lg text-white/75 leading-relaxed max-w-2xl mb-6 sm:mb-8">
              {t.diventaRivenditore.heroDesc}
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link to={contattiLink} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-[hsl(195,85%,45%)] hover:bg-[hsl(195,85%,38%)] text-white font-semibold rounded-full px-10 text-base shadow-[0_6px_30px_hsl(195,85%,45%,0.4)] min-h-[48px]"
                >
                  {t.cta.candidatiOra}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="#vantaggi-rivenditore" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto rounded-full px-8 text-base border-white/40 text-white bg-white/10 hover:bg-white/20 hover:text-white min-h-[48px]"
                >
                  {t.cta.scopriIVantaggi}
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Vantaggi */}
      <section ref={vantaggiRef} id="vantaggi-rivenditore" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" animate={vantaggiInView ? "visible" : "hidden"} variants={stagger} className="text-center mb-10 sm:mb-16">
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.3em] text-[hsl(195,85%,45%)] uppercase mb-4">
              {t.diventaRivenditore.vantaggiTag}
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-[hsl(0,0%,10%)]">
              {t.diventaRivenditore.vantaggiTitle}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[hsl(0,0%,45%)] text-lg mt-4 max-w-2xl mx-auto">
              {t.diventaRivenditore.vantaggiDesc}
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" animate={vantaggiInView ? "visible" : "hidden"} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {t.diventaRivenditore.benefits.map((v, i) => {
              const Icon = benefitIcons[i];
              return (
                <motion.div
                  key={v.title}
                  variants={fadeUp}
                  className="group p-5 sm:p-8 rounded-2xl border border-[hsl(0,0%,90%)] bg-[hsl(0,0%,98%)] hover:shadow-xl hover:border-[hsl(195,85%,45%)]/30 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[hsl(195,85%,45%)] text-white shadow-[0_4px_20px_hsl(195,85%,45%,0.3)] mb-5">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-bold text-[hsl(0,0%,10%)] mb-2">{v.title}</h3>
                  <p className="text-sm text-[hsl(0,0%,45%)] leading-relaxed">{v.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Come Funziona */}
      <section ref={stepsRef} className="py-16 sm:py-24 bg-[hsl(0,0%,97%)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" animate={stepsInView ? "visible" : "hidden"} variants={stagger} className="text-center mb-10 sm:mb-16">
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.3em] text-[hsl(195,85%,45%)] uppercase mb-4">
              {t.diventaRivenditore.stepsTag}
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-[hsl(0,0%,10%)]">
              {t.diventaRivenditore.stepsTitle}
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" animate={stepsInView ? "visible" : "hidden"} variants={stagger} className="grid md:grid-cols-3 gap-8">
            {t.diventaRivenditore.steps.map((s, i) => {
              const Icon = stepIcons[i];
              return (
                <motion.div key={s.step} variants={fadeUp} className="relative text-center">
                  {i < t.diventaRivenditore.steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-[hsl(195,85%,45%)]/30" />
                  )}
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white border-2 border-[hsl(195,85%,45%)]/20 shadow-lg mb-6 relative">
                    <Icon className="h-10 w-10 text-[hsl(195,85%,45%)]" />
                    <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-8 h-8 rounded-full bg-[hsl(195,85%,45%)] text-white text-xs font-bold shadow">
                      {s.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[hsl(0,0%,10%)] mb-3">{s.title}</h3>
                  <p className="text-sm text-[hsl(0,0%,45%)] leading-relaxed">{s.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Finale */}
      <section ref={ctaRef} className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(195,85%,35%)] to-[hsl(195,85%,25%)]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" animate={ctaInView ? "visible" : "hidden"} variants={stagger}>
            <motion.div variants={fadeUp} className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/15 mb-6">
              <Award className="h-8 w-8 text-white" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
              {t.diventaRivenditore.ctaTitle}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base sm:text-lg text-white/80 mb-6 max-w-2xl mx-auto leading-relaxed">
              {t.diventaRivenditore.ctaDesc}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-white/70 mb-10">
              {t.diventaRivenditore.ctaPerks.map((perk) => (
                <span key={perk} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-white" />
                  {perk}
                </span>
              ))}
            </motion.div>

            <motion.div variants={fadeUp}>
              <Link to={contattiLink} className="w-full sm:w-auto inline-block">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-[hsl(195,85%,35%)] hover:bg-white/90 font-bold rounded-full px-12 text-base shadow-xl min-h-[48px]"
                >
                  {t.cta.candidatiOra}
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
