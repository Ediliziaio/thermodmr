import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState, useCallback } from "react";
import heroSerramento from "@/assets/serramenti-pvc-squareline.png";
import imgChiSiamo from "@/assets/thermodmr-finestre-pvc-interni.webp";
import imgConfort from "@/assets/thermodmr-scorrevoli-terrazza.jpg";
import imgDomus from "@/assets/thermodmr-finestra-effetto-legno.jpg";
import imgPassive from "@/assets/thermodmr-serramenti-vista-mare.jpg";
import imgPortoncini from "@/assets/thermodmr-portoncino-ingresso.avif";
import imgCassonetti from "@/assets/thermodmr-cassonetto-installato.jpg";
import imgTapparelle from "@/assets/thermodmr-tapparella-coibentata.webp";
import imgPersiane from "@/assets/thermodmr-persiana-verde.webp";
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
  LayoutGrid,
  Calendar,
  Truck,
  ThumbsUp,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";

import { fadeUp, stagger, inViewOptions } from "@/lib/animations";

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
  const { t, lang } = useLanguage();
  const scrollToProdotti = useCallback(() => {
    document.getElementById("prodotti")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const contattiHref = lang === "ro" ? "/ro/contact" : "#contatti";

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-[hsl(0,0%,10%)]/60" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[hsl(0,0%,10%)]/80 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-16 sm:pb-24 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-6 sm:space-y-8">
          <motion.p
            variants={fadeUp}
            className="text-xs font-bold tracking-[0.3em] text-[hsl(195,85%,60%)] uppercase"
          >
            {t.home.heroTag}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-2xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] text-white"
          >
            {t.home.heroTitle}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(195,85%,50%)] to-[hsl(210,80%,55%)]">
              {t.home.heroTitleHighlight}
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg text-white/70 max-w-xl leading-relaxed">
            {t.home.heroDesc}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
            <a href={contattiHref} className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-[hsl(195,85%,45%)] hover:bg-[hsl(195,85%,38%)] text-white font-semibold rounded-full px-8 text-base shadow-[0_6px_30px_hsl(195,85%,45%,0.4)] hover:shadow-[0_6px_40px_hsl(195,85%,45%,0.6)] transition-all min-h-[48px]"
              >
                {t.cta.richiediPreventivo}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToProdotti}
              className="w-full sm:w-auto rounded-full px-8 text-base border-white/50 text-white bg-white/15 hover:bg-white/25 hover:text-white backdrop-blur-sm min-h-[48px]"
            >
              {t.cta.scopriIProdotti}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-6 gap-y-3 text-sm text-white/70 pt-4">
            {t.home.trustBadges.map((badge) => (
              <span key={badge} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[hsl(195,85%,55%)]" />
                {badge}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="flex items-center justify-center mt-8 lg:mt-0"
        >
          <div className="relative">
            <img
              src={heroSerramento}
              alt="Serramento in PVC ThermoDMR"
              className="w-[240px] sm:w-[340px] lg:w-[460px] object-contain drop-shadow-2xl"
            />
            <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-[hsl(195,85%,45%)] text-white text-[10px] sm:text-xs font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg">
              {lang === "ro" ? "Livrare 2-6 Săpt." : "Consegna 2-6 Sett."}
            </div>
            <div className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 bg-white text-[hsl(0,0%,20%)] text-[10px] sm:text-xs font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg border border-[hsl(0,0%,90%)]">
              {lang === "ro" ? "Calitate Germană" : "Qualità Tedesca"}
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
const ChiSiamoSection = () => {
  const { t, lang } = useLanguage();
  const [ref, inView] = useInView(inViewOptions);
  const chiSiamoLink = lang === "ro" ? "/ro/despre-noi" : "/chi-siamo";

  return (
    <section ref={ref} id="chi-siamo" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
        >
          <motion.div variants={fadeUp} className="space-y-6">
            <p className="text-xs font-bold tracking-[0.3em] text-[hsl(195,85%,45%)] uppercase">
              {t.home.chiSiamoTag}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[hsl(0,0%,10%)] leading-tight">
              {t.home.chiSiamoTitle}
            </h2>
            <p className="text-[hsl(0,0%,40%)] leading-relaxed text-lg">
              {t.home.chiSiamoDesc1}
            </p>
            <p className="text-[hsl(0,0%,40%)] leading-relaxed">
              {t.home.chiSiamoDesc2}
            </p>
            <Link to={chiSiamoLink}>
              <Button className="bg-[hsl(195,85%,45%)] hover:bg-[hsl(195,85%,38%)] text-white font-semibold rounded-full px-8 mt-4 shadow-[0_4px_20px_hsl(195,85%,45%,0.25)]">
                {t.cta.scopriLaNostraStoria}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="flex justify-center">
            <img
              src={imgChiSiamo}
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
const Stats = () => {
  const { t, lang } = useLanguage();
  const [ref, inView] = useInView(inViewOptions);

  const statsData = [
    { value: 50, suffix: ".000+", label: t.home.statsSection[0].label, icon: LayoutGrid, prefix: undefined },
    { value: 10, suffix: "+", label: t.home.statsSection[1].label, icon: Calendar, prefix: undefined },
    { value: 6, prefix: "2-", suffix: lang === "ro" ? " săpt." : " sett.", label: t.home.statsSection[2].label, icon: Truck },
    { value: 98, suffix: "%", label: t.home.statsSection[3].label, icon: ThumbsUp, prefix: undefined },
  ];

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/counters-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-[hsl(0,0%,8%)]/85" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {statsData.map((s) => (
            <StatItem key={s.label} {...s} inView={inView} note={t.home.statsNote} isLast={s.label === t.home.statsSection[3].label} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const StatItem = ({ value, suffix, prefix, label, inView, icon: IconComp, note, isLast }: {
  value: number; suffix: string; prefix?: string; label: string; inView: boolean;
  icon: React.ElementType; note: string; isLast: boolean;
}) => {
  const isStatic = !!prefix;
  const count = useCounter(value, value > 100 ? 2500 : 1800, isStatic ? false : inView);
  return (
    <motion.div
      variants={fadeUp}
      className="text-center space-y-3 rounded-2xl bg-white/5 border border-white/10 p-4 sm:p-6 hover:bg-white/[0.08] hover:border-white/20 hover:scale-[1.02] transition-all duration-300"
    >
      <div className="flex justify-center">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 flex items-center justify-center">
          <IconComp size={24} className="text-white/80" />
        </div>
      </div>
      <p className="text-3xl sm:text-5xl font-extrabold text-white">
        {isStatic ? (
          <>
            <span>{prefix}{value}</span>
            <span className="text-2xl sm:text-3xl text-white/70">{suffix}</span>
          </>
        ) : (
          <>
            {count.toLocaleString("it-IT")}
            <span className="text-2xl sm:text-3xl text-white/70">{suffix}</span>
          </>
        )}
      </p>
      <p className="text-sm text-white/60 font-medium">{label}</p>
      {isLast && (
        <p className="text-xs text-white/50 italic inline-flex items-center gap-1 justify-center">
          <Info size={12} className="text-white/40" />
          {note.replace(/^\*\s*/, "")}
        </p>
      )}
    </motion.div>
  );
};

/* ═══════════════════════════════════════════
   5. PRODOTTI
   ═══════════════════════════════════════════ */
const Products = () => {
  const { t, lang } = useLanguage();
  const [ref, inView] = useInView(inViewOptions);

  const isRo = lang === "ro";

  const pvcModels = [
    { icon: Sparkles, name: "DMR CONFORT", link: isRo ? "/ro/produse/dmr-confort" : "/prodotti/dmr-confort", desc: isRo ? "Profil cu 3 camere. Calitate și accesibilitate." : "Profilo a 3 camere. Qualità e convenienza.", image: imgConfort },
    { icon: Zap, name: "DMR DOMUS", link: isRo ? "/ro/produse/dmr-domus" : "/prodotti/dmr-domus", desc: isRo ? "Profil cu 5 camere. Cel mai vândut din gamă." : "Profilo a 5 camere. Il best-seller della gamma.", image: imgDomus },
    { icon: Crown, name: "DMR PASSIVE", link: isRo ? "/ro/produse/dmr-passive" : "/prodotti/dmr-passive", desc: isRo ? "Profil cu 7 camere. Performanțe Passivhaus." : "Profilo a 7 camere. Prestazioni Passivhaus.", image: imgPassive },
  ];

  const accessories = [
    { icon: Shield, title: isRo ? "Uși de intrare" : "Portoncini", link: isRo ? "/ro/produse/usi-intrare" : "/prodotti/portoncini", image: imgPortoncini },
    { icon: Box, title: isRo ? "Casete rulou" : "Cassonetti", link: isRo ? "/ro/produse/casete-rulou" : "/prodotti/cassonetti", image: imgCassonetti },
    { icon: Blinds, title: isRo ? "Jaluzele rulante" : "Tapparelle", link: isRo ? "/ro/produse/jaluzele" : "/prodotti/tapparelle", image: imgTapparelle },
    { icon: SunDim, title: isRo ? "Obloane" : "Persiane", link: isRo ? "/ro/produse/obloane" : "/prodotti/persiane", image: imgPersiane },
  ];

  const prodottiLink = isRo ? "/ro/produse" : "/prodotti-pubblico";
  const scopriGamma = isRo ? "Descoperă Toată Gama" : "Scopri Tutta la Gamma";
  const scopriMore = isRo ? "Descoperă" : "Scopri";

  return (
    <section ref={ref} id="prodotti" className="py-16 sm:py-24 bg-[hsl(0,0%,97%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.3em] text-[hsl(195,85%,45%)] uppercase mb-4">
            {isRo ? "Gama Noastră" : "La Nostra Gamma"}
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-[hsl(0,0%,10%)]">
            {t.home.prodottiTitle}
          </motion.h2>
        </motion.div>

        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}>
          <motion.h3 variants={fadeUp} className="text-2xl font-bold text-[hsl(0,0%,10%)] mb-8 flex items-center gap-3">
            <ThermometerSun className="h-6 w-6 text-[hsl(195,85%,45%)]" />
            {t.home.finestrepvcLabel}
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            {pvcModels.map((m) => (
              <motion.div key={m.name} variants={fadeUp}>
                <Link to={m.link} className="block h-full">
                  <div className="group rounded-2xl overflow-hidden border border-[hsl(0,0%,90%)] bg-white shadow-sm hover:shadow-xl hover:border-[hsl(195,85%,45%)]/30 hover:-translate-y-1 transition-all duration-300 h-full">
                    <div className="relative h-36 sm:h-44 overflow-hidden">
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
                        {t.cta.scopriDiPiu} <ArrowRight className="h-4 w-4" />
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.h3 variants={fadeUp} className="text-2xl font-bold text-[hsl(0,0%,10%)] mb-8">
            {t.home.complementiLabel}
          </motion.h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {accessories.map((a) => (
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
                        {scopriMore} <ArrowRight className="h-3 w-3" />
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="text-center">
            <Link to={prodottiLink}>
              <Button variant="outline" className="rounded-full px-8 border-[hsl(195,85%,45%)] text-[hsl(195,85%,45%)] hover:bg-[hsl(195,85%,45%,0.05)] font-semibold">
                {scopriGamma} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════
   6. PERCHÉ SCEGLIERE THERMODMR
   ═══════════════════════════════════════════ */
const benefitIcons = [ThermometerSun, Palette, Factory, Award];

const WhyThermoDMR = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView(inViewOptions);

  return (
    <section ref={ref} id="vantaggi" className="py-16 sm:py-24 bg-[hsl(0,0%,8%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.3em] text-[hsl(195,85%,55%)] uppercase mb-4">
            {t.home.percheThermoTag}
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-white max-w-3xl mx-auto">
            {t.home.percheThermoTitle}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/50 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            {t.home.percheThermoDesc}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="grid sm:grid-cols-2 gap-6"
        >
          {t.home.benefits.map((benefit, i) => {
            const IconComp = benefitIcons[i];
            return (
              <motion.div
                key={benefit.title}
                variants={fadeUp}
                className="p-5 sm:p-8 rounded-2xl bg-white/[0.06] border border-white/10 hover:bg-white/[0.1] hover:border-[hsl(195,85%,45%)]/30 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                  <div className="shrink-0">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[hsl(195,85%,45%)] text-white shadow-[0_4px_20px_hsl(195,85%,45%,0.3)]">
                      <IconComp className="h-6 w-6 sm:h-7 sm:w-7" />
                    </div>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <h3 className="text-lg sm:text-xl font-bold text-white">{benefit.title}</h3>
                    <p className="text-sm text-white/65 leading-relaxed">{benefit.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════
   7. GARANZIE
   ═══════════════════════════════════════════ */
const qualitaIcons = [Shield, Leaf, Award, Headphones];

const Guarantees = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView(inViewOptions);

  return (
    <section ref={ref} id="garanzie" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.3em] text-[hsl(195,85%,45%)] uppercase mb-4">
            {t.home.qualitaTag}
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-[hsl(0,0%,10%)]">
            {t.home.qualitaTitle}
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="grid sm:grid-cols-2 gap-6"
        >
          {t.home.qualitaItems.map((item, i) => {
            const IconComp = qualitaIcons[i];
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="flex flex-col sm:flex-row gap-4 sm:gap-5 p-4 sm:p-6 rounded-2xl bg-[hsl(0,0%,97%)] border-l-4 border-[hsl(195,85%,45%)] hover:shadow-md transition-shadow duration-300"
              >
                <div className="shrink-0 inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[hsl(195,85%,45%)] text-white">
                  <IconComp className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-[hsl(0,0%,10%)]">{item.title}</h3>
                  <p className="text-sm text-[hsl(0,0%,45%)] leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════
   8. TROVA IL RIVENDITORE
   ═══════════════════════════════════════════ */
const findDealerCardIcons = [Headphones, MapPin, Zap];
const findDealerCardDescs = {
  it: ["Un esperto ti guida nella scelta migliore", "Misuriamo e valutiamo sul posto", "Risposta rapida e senza impegno"],
  ro: ["Un expert te ghidează în alegerea potrivită", "Măsurăm și evaluăm la fața locului", "Răspuns rapid și fără angajament"],
};

const FindDealer = () => {
  const { t, lang } = useLanguage();
  const [ref, inView] = useInView(inViewOptions);
  const contattiHref = lang === "ro" ? "/ro/contact" : "#contatti";
  const cardDescriptions = lang === "ro" ? findDealerCardDescs.ro : findDealerCardDescs.it;
  const btnShort = lang === "ro" ? "Găsește Distribuitor" : "Trova il Rivenditore";
  const btnLong = lang === "ro" ? "Contactează-ne pentru a găsi Distribuitorul tău" : "Contattaci per Trovare il Tuo Rivenditore";

  return (
    <section ref={ref} className="py-16 sm:py-24 bg-[hsl(0,0%,97%)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
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
            {t.home.trovaDealerTitle}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[hsl(0,0%,45%)] text-lg max-w-2xl mx-auto leading-relaxed">
            {t.home.trovaDealerDesc}
          </motion.p>

          <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-4">
            {t.home.trovaDealerCards.map((cardTitle, i) => (
              <div key={cardTitle} className="bg-white rounded-2xl p-5 border border-[hsl(0,0%,90%)] shadow-sm text-center space-y-2">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[hsl(195,85%,45%)]/10 mx-auto">
                  {(() => { const Icon = findDealerCardIcons[i]; return <Icon className="h-5 w-5 text-[hsl(195,85%,45%)]" />; })()}
                </div>
                <h4 className="text-sm font-bold text-[hsl(0,0%,15%)]">{cardTitle}</h4>
                <p className="text-xs text-[hsl(0,0%,50%)]">{cardDescriptions[i]}</p>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp}>
            <a href={contattiHref}>
              <Button
                size="lg"
                className="w-full sm:w-auto bg-[hsl(195,85%,45%)] hover:bg-[hsl(195,85%,38%)] text-white font-semibold rounded-full px-8 text-base shadow-[0_4px_20px_hsl(195,85%,45%,0.25)] min-h-[48px]"
              >
                <span className="sm:hidden">{btnShort}</span>
                <span className="hidden sm:inline">{btnLong}</span>
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
  const { t, lang } = useLanguage();
  const [ref, inView] = useInView(inViewOptions);
  const diventaLink = lang === "ro" ? "/ro/devino-distribuitor" : "/diventa-rivenditore";

  return (
    <section ref={ref} className="py-20 sm:py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/cta-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(0,0%,8%)]/90 to-[hsl(210,80%,15%)]/90" />

      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={stagger}
        className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center"
      >
        <motion.h2 variants={fadeUp} className="text-3xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
          {t.home.becomeTitle}
        </motion.h2>
        <motion.p variants={fadeUp} className="text-white/70 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
          {t.home.becomeDesc}
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-white/60 mb-10">
          {t.home.becomePerks.map((perk) => (
            <span key={perk} className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[hsl(195,85%,55%)]" />
              {perk}
            </span>
          ))}
        </motion.div>

        <motion.div variants={fadeUp}>
          <Link to={diventaLink} className="w-full sm:w-auto inline-block">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-white text-[hsl(195,85%,40%)] hover:bg-white/90 font-bold rounded-full px-12 text-base shadow-xl hover:shadow-2xl transition-all min-h-[48px]"
            >
              {t.cta.candidatiOra}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ═══════════════════════════════════════════
   10. CONTACT FORM
   ═══════════════════════════════════════════ */
const ContactForm = () => {
  const { t } = useLanguage();
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
      toast({ title: t.contatti.toastValidation, description: t.contatti.toastValidationDesc, variant: "destructive" });
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
      toast({ title: t.contatti.toastSuccess, description: t.contatti.toastSuccessDesc });
      setFormData({ nome: "", azienda: "", email: "", telefono: "", messaggio: "" });
      setTipoUtente("");
    } catch {
      toast({ title: t.contatti.toastError, description: t.contatti.toastErrorDesc, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const selectOptions = [
    { value: "privato", label: t.home.formChiSeiOptions[0] },
    { value: "rivenditore", label: t.home.formChiSeiOptions[1] },
    { value: "altro", label: t.home.formChiSeiOptions[2] },
  ];

  return (
    <section ref={ref} id="contatti" className="py-16 sm:py-24 bg-[hsl(0,0%,97%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.3em] text-[hsl(195,85%,45%)] uppercase mb-4">
              {t.home.contattiTag}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[hsl(0,0%,10%)]">
              {t.home.contattiTitle}
            </h2>
            <p className="text-[hsl(0,0%,45%)] text-lg mt-4 max-w-2xl mx-auto">
              {t.home.contattiDesc}
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-[hsl(0,0%,90%)] p-4 sm:p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[hsl(0,0%,20%)]">{t.home.formNome} *</label>
                  <Input name="nome" value={formData.nome} onChange={handleChange} placeholder={t.contatti.placeholderNome} required maxLength={100} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[hsl(0,0%,20%)]">{t.home.formChiSei}</label>
                  <Select value={tipoUtente} onValueChange={setTipoUtente}>
                    <SelectTrigger>
                      <SelectValue placeholder={t.home.formChiSei} />
                    </SelectTrigger>
                    <SelectContent>
                      {selectOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[hsl(0,0%,20%)]">{t.home.formEmail} *</label>
                  <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder={t.contatti.placeholderEmail} required maxLength={255} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[hsl(0,0%,20%)]">{t.home.formTelefono}</label>
                  <Input name="telefono" type="tel" value={formData.telefono} onChange={handleChange} placeholder={t.contatti.placeholderTelefono} maxLength={20} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[hsl(0,0%,20%)]">{t.home.formAzienda}</label>
                <Input name="azienda" value={formData.azienda} onChange={handleChange} placeholder={t.contatti.placeholderAzienda} maxLength={100} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[hsl(0,0%,20%)]">{t.home.formMessaggio} *</label>
                <Textarea name="messaggio" value={formData.messaggio} onChange={handleChange} placeholder={t.contatti.placeholderMessaggio} required maxLength={1000} rows={3} />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[hsl(195,85%,45%)] hover:bg-[hsl(195,85%,38%)] text-white font-semibold rounded-full py-6 text-base shadow-[0_4px_20px_hsl(195,85%,45%,0.3)]"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    {t.cta.inviando}
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    {t.cta.inviaRichiesta}
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
    <ChiSiamoSection />
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
