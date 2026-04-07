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
import { useLanguage } from "@/i18n/LanguageContext";
import SeoHead from "@/components/SeoHead";

import { fadeUp, stagger, inViewOptions } from "@/lib/animations";

const badgeColors = {
  green: "bg-[hsl(142,70%,45%)] text-white border-[hsl(142,70%,40%)]",
  gold: "bg-[hsl(38,90%,50%)] text-white border-[hsl(38,90%,45%)]",
  purple: "bg-[hsl(270,60%,55%)] text-white border-[hsl(270,60%,50%)]",
};

const pvcModelMeta = [
  { icon: Sparkles, image: imgConfort, badgeColor: "green" as const },
  { icon: Zap, image: imgDomus, badgeColor: "gold" as const },
  { icon: Crown, image: imgPassive, badgeColor: "purple" as const },
];

const otherProductMeta = [
  { icon: Shield, image: imgPortoncini },
  { icon: Box, image: imgCassonetti },
  { icon: Blinds, image: imgTapparelle },
  { icon: SunDim, image: imgPersiane },
];

const counterIcons = [Layers, ThermometerSun, Palette, Truck];

const ProdottiPubblico = () => {
  const { t, lang } = useLanguage();
  const [heroRef, heroInView] = useInView(inViewOptions);
  const [countersRef, countersInView] = useInView(inViewOptions);
  const [pvcRef, pvcInView] = useInView(inViewOptions);
  const [otherRef, otherInView] = useInView(inViewOptions);
  const [ctaRef, ctaInView] = useInView(inViewOptions);

  const isRo = lang === "ro";
  const homeLink = lang === "ro" ? "/ro" : "/";
  const contattiLink = lang === "ro" ? "/ro/contact" : "/contatti";
  const diventaLink = lang === "ro" ? "/ro/devino-distribuitor" : "/diventa-rivenditore";
  const vantaggiLink = lang === "ro" ? "/ro/avantaje" : "/vantaggi";

  const pvcLinks = lang === "ro"
    ? ["/ro/produse/dmr-confort", "/ro/produse/dmr-domus", "/ro/produse/dmr-passive"]
    : ["/prodotti/dmr-confort", "/prodotti/dmr-domus", "/prodotti/dmr-passive"];

  const otherLinks = lang === "ro"
    ? ["/ro/produse/usi-intrare", "/ro/produse/casete-rulou", "/ro/produse/jaluzele", "/ro/produse/obloane"]
    : ["/prodotti/portoncini", "/prodotti/cassonetti", "/prodotti/tapparelle", "/prodotti/persiane"];

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title={isRo ? "Catalog Ferestre și Tâmplărie PVC — Toate Produsele" : "Catalogo Finestre e Serramenti PVC — Tutti i Prodotti"}
        description={isRo ? "Descoperă catalogul complet ThermoDMR: ferestre PVC DMR Confort, DMR Domus, DMR Passive, uși de intrare, jaluzele termoizolante, casete rulou și obloane." : "Scopri il catalogo completo ThermoDMR: finestre PVC DMR Confort, DMR Domus, DMR Passive, portoncini blindati, tapparelle coibentate, cassonetti e persiane."}
        canonical={isRo ? "/ro/produse" : "/prodotti-pubblico"}
        lang={lang}
        hreflangIt="/prodotti-pubblico"
        hreflangRo="/ro/produse"
      />
      <PublicNavbar />

      {/* Hero full-width cu imagine și overlay */}
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
                  <Link to={homeLink} className="text-white/60 hover:text-white text-xs">{t.prodottiPubblico.breadcrumbHome}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/40" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white/90 text-xs">{t.prodottiPubblico.breadcrumbProdotti}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <motion.div initial="hidden" animate={heroInView ? "visible" : "hidden"} variants={stagger}>
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.3em] text-[hsl(195,85%,65%)] uppercase mb-4">
              {t.prodottiPubblico.heroTag}
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
              {t.prodottiPubblico.heroTitle}{" "}
              <span className="text-[hsl(195,85%,55%)]">{t.prodottiPubblico.heroTitleHighlight}</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-base sm:text-lg text-white/75 leading-relaxed max-w-2xl">
              {t.prodottiPubblico.heroDesc}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contatori rapizi */}
      <section ref={countersRef} className="bg-[hsl(0,0%,8%)] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <motion.div
            initial="hidden"
            animate={countersInView ? "visible" : "hidden"}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {t.prodottiPubblico.counters.map((c, i) => {
              const Icon = counterIcons[i];
              return (
                <motion.div key={c.label} variants={fadeUp} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[hsl(195,85%,45%,0.15)] mb-3">
                    <Icon className="h-6 w-6 text-[hsl(195,85%,55%)]" />
                  </div>
                  <p className="text-3xl font-extrabold text-white">{c.value}</p>
                  <p className="text-sm text-white/60 mt-1">{c.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Finestre in PVC — 3 modelli */}
      <section ref={pvcRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" animate={pvcInView ? "visible" : "hidden"} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <p className="text-xs font-bold tracking-[0.3em] text-[hsl(195,85%,45%)] uppercase mb-4">{t.prodottiPubblico.gammaTag}</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[hsl(0,0%,10%)]">{t.prodottiPubblico.gammaTitle}</h2>
              <p className="text-[hsl(0,0%,40%)] mt-4 max-w-2xl mx-auto">{t.prodottiPubblico.gammaDesc}</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {t.prodottiPubblico.pvcModels.map((m, i) => {
                const { icon: Icon, image, badgeColor } = pvcModelMeta[i];
                return (
                  <motion.div key={m.name} variants={fadeUp}>
                    <Link to={pvcLinks[i]} className="block h-full">
                      <Card className="h-full border-[hsl(0,0%,90%)] hover:shadow-xl hover:border-[hsl(195,85%,45%,0.3)] transition-all duration-300 group overflow-hidden">
                        <div className="relative">
                          <img src={image} alt={m.name} className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                          <Badge className={`${badgeColors[badgeColor]} absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
                            {m.badge}
                          </Badge>
                        </div>
                        <CardContent className="p-6 space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[hsl(195,85%,45%,0.1)]">
                              <Icon className="h-5 w-5 text-[hsl(195,85%,45%)]" />
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
                            {t.cta.scopriDiPiu} <ArrowRight className="h-4 w-4" />
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Alte categorii — layout alternato */}
      <section ref={otherRef} className="py-24 bg-[hsl(0,0%,97%)]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" animate={otherInView ? "visible" : "hidden"} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <p className="text-xs font-bold tracking-[0.3em] text-[hsl(195,85%,45%)] uppercase mb-4">{t.prodottiPubblico.complementiTag}</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[hsl(0,0%,10%)]">{t.prodottiPubblico.complementiTitle}</h2>
              <p className="text-[hsl(0,0%,40%)] mt-4 max-w-2xl mx-auto">{t.prodottiPubblico.complementiDesc}</p>
            </motion.div>
          </motion.div>

          <div className="space-y-24">
            {t.prodottiPubblico.otherProducts.map((p, i) => {
              const { icon: Icon, image } = otherProductMeta[i];
              return (
                <motion.div
                  key={p.title}
                  initial="hidden"
                  animate={otherInView ? "visible" : "hidden"}
                  variants={stagger}
                  className="grid lg:grid-cols-2 gap-16 items-center"
                >
                  <motion.div variants={fadeUp} className={i % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="relative rounded-3xl overflow-hidden shadow-xl">
                      <img src={image} alt={p.title} className="w-full aspect-[4/3] object-cover" loading="lazy" />
                      <div className="absolute bottom-4 left-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[hsl(195,85%,45%)] text-white shadow-lg">
                        <Icon className="h-6 w-6" />
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
                      <Link to={otherLinks[i]}>
                        <Button variant="outline" className="rounded-full px-6 border-[hsl(195,85%,45%)] text-[hsl(195,85%,45%)] hover:bg-[hsl(195,85%,45%,0.05)] font-semibold">
                          {t.cta.scopriDiPiu} <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      <Link to={contattiLink}>
                        <Button className="bg-[hsl(195,85%,45%)] hover:bg-[hsl(195,85%,38%)] text-white font-semibold rounded-full px-8 shadow-[0_4px_20px_hsl(195,85%,45%,0.25)]">
                          {t.cta.richiediPreventivo}
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
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
              {t.prodottiPubblico.ctaTitle}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              {t.prodottiPubblico.ctaDesc}
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Link to={diventaLink}>
                <Button size="lg" className="bg-white text-[hsl(195,85%,35%)] hover:bg-white/90 font-bold rounded-full px-10 shadow-xl">
                  {t.cta.diventaRivenditore} <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to={vantaggiLink}>
                <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 font-semibold rounded-full px-10">
                  {t.cta.scopriIVantaggi}
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
