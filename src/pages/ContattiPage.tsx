import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, Loader2, Clock, CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import { whatsappLink } from "@/components/WhatsAppFloating";
import { notifyNewLead, leadSource } from "@/lib/leadNotify";
import { useLanguage } from "@/i18n/LanguageContext";
import SeoHead from "@/components/SeoHead";

import { fadeUp, stagger } from "@/lib/animations";

const TIPO_VALUES = ["preventivo", "rivenditore", "assistenza", "altro"] as const;

const ContattiPage = () => {
  const { t, lang } = useLanguage();
  const isRo = lang === "ro";
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const tipoParam = searchParams.get("tipo") || "";
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    azienda: "",
    email: "",
    telefono: "",
    citta: "",
    messaggio: "",
    website: "", // honeypot anti-spam: gli umani non lo vedono, i bot lo compilano
  });
  const [tipo, setTipo] = useState<string>(
    TIPO_VALUES.includes(tipoParam as (typeof TIPO_VALUES)[number]) ? tipoParam : "preventivo"
  );
  const [privacy, setPrivacy] = useState(false);

  const tipoLabels: Record<string, string> = isRo
    ? { preventivo: "Ofertă / preț", rivenditore: "Vreau să devin distribuitor", assistenza: "Asistență clienți", altro: "Altceva" }
    : { preventivo: "Preventivo / prezzi", rivenditore: "Voglio diventare rivenditore", assistenza: "Assistenza clienti", altro: "Altro" };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Honeypot: se compilato è un bot — fingi successo senza salvare
    if (formData.website.trim()) {
      setSent(true);
      return;
    }
    if (!formData.nome.trim() || !formData.email.trim() || !formData.messaggio.trim()) {
      toast({ title: t.contatti.toastValidation, description: t.contatti.toastValidationDesc, variant: "destructive" });
      return;
    }
    if (!privacy) {
      toast({
        title: isRo ? "Consimțământ necesar" : "Consenso necessario",
        description: isRo
          ? "Pentru a trimite cererea, acceptă informarea privind confidențialitatea."
          : "Per inviare la richiesta, accetta l'informativa sulla privacy.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    const fonte = leadSource();
    const extra = [
      `Tipo richiesta: ${tipoLabels[tipo]}`,
      formData.citta.trim() ? `Città/Provincia: ${formData.citta.trim()}` : null,
      `Fonte: ${fonte}`,
      `Lingua: ${lang.toUpperCase()}`,
    ]
      .filter(Boolean)
      .join(" | ");
    const messaggioCompleto = `${formData.messaggio.trim()}\n\n— ${extra}`;
    try {
      const { error } = await supabase.from("contact_requests").insert({
        nome: formData.nome.trim(),
        azienda: formData.azienda.trim() || null,
        email: formData.email.trim(),
        telefono: formData.telefono.trim() || null,
        messaggio: messaggioCompleto,
      });
      if (error) throw error;
      notifyNewLead({
        nome: formData.nome.trim(),
        email: formData.email.trim(),
        telefono: formData.telefono.trim() || undefined,
        azienda: formData.azienda.trim() || undefined,
        messaggio: formData.messaggio.trim(),
        tipo: tipoLabels[tipo],
        citta: formData.citta.trim() || undefined,
        fonte,
        lingua: lang,
      });
      setSent(true);
    } catch {
      toast({ title: t.contatti.toastError, description: t.contatti.toastErrorDesc, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title={isRo ? "Contact — Solicită Ofertă Ferestre PVC" : "Contatti — Richiedi Preventivo Finestre PVC"}
        description={isRo ? "Contactează ThermoDMR pentru o ofertă gratuită pe ferestre, uși și tâmplărie PVC. Răspundem în 24 de ore. Tel: +40 744 139 565." : "Contatta ThermoDMR per un preventivo gratuito su finestre, portoncini e serramenti PVC. Rispondiamo in 24 ore. Tel: +39 348 346 7567."}
        canonical={isRo ? "/ro/contact" : "/contatti"}
        lang={lang}
        hreflangIt="/contatti"
        hreflangRo="/ro/contact"
        keywords={isRo
          ? "contact ThermoDMR, ofertă ferestre PVC, preventiv gratuit, telefon ThermoDMR"
          : "contatti ThermoDMR, preventivo finestre PVC, preventivo gratuito, richiesta offerta serramenti"
        }
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": isRo ? "Contact ThermoDMR" : "Contatti ThermoDMR",
          "url": isRo ? "https://thermodmr.com/ro/contact" : "https://thermodmr.com/contatti",
          "description": isRo ? "Pagina de contact ThermoDMR pentru oferte gratuite pe ferestre și tâmplărie PVC." : "Pagina contatti ThermoDMR per preventivi gratuiti su finestre e serramenti PVC.",
          "mainEntity": {
            "@type": "Organization",
            "name": "ThermoDMR",
            "telephone": isRo ? "+40-744-139-565" : "+39-348-346-7567",
            "email": "office.marysoryna@gmail.com",
            "url": "https://thermodmr.com"
          }
        }}
      />
      <PublicNavbar />

      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-14 sm:pb-20 bg-[hsl(0,0%,97%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.3em] text-[hsl(195,85%,45%)] uppercase mb-3 sm:mb-4">
              {t.contatti.heroTag}
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-2xl sm:text-5xl font-extrabold text-[hsl(0,0%,10%)] leading-tight mb-4 sm:mb-6">
              {t.contatti.heroTitle} <span className="text-[hsl(195,85%,45%)]">{t.contatti.heroTitleHighlight}</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-base sm:text-lg text-[hsl(0,0%,40%)] leading-relaxed">
              {t.contatti.heroDesc}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-10 sm:gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              {sent ? (
                <div className="bg-[hsl(0,0%,97%)] rounded-2xl border border-[hsl(0,0%,90%)] p-8 sm:p-12 text-center space-y-5">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[hsl(145,60%,45%)]/10">
                    <CheckCircle2 className="h-9 w-9 text-[hsl(145,60%,42%)]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[hsl(0,0%,10%)]">
                    {isRo ? "Cerere trimisă!" : "Richiesta inviata!"}
                  </h2>
                  <p className="text-[hsl(0,0%,40%)] leading-relaxed max-w-md mx-auto">
                    {isRo
                      ? "Îți răspundem în maximum 24 de ore lucrătoare cu o ofertă personalizată. Dacă e urgent, scrie-ne direct pe WhatsApp."
                      : "Ti rispondiamo entro 24 ore lavorative con una proposta personalizzata. Se è urgente, scrivici direttamente su WhatsApp."}
                  </p>
                  <a href={whatsappLink(lang)} target="_blank" rel="noopener noreferrer" className="inline-block">
                    <Button className="bg-[#25D366] hover:bg-[#1fb857] text-white font-semibold rounded-full px-8">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      WhatsApp
                    </Button>
                  </a>
                </div>
              ) : (
              <form onSubmit={handleSubmit} className="bg-[hsl(0,0%,97%)] rounded-2xl border border-[hsl(0,0%,90%)] p-4 sm:p-8 space-y-5">
                {/* Honeypot: invisibile agli utenti, i bot lo compilano */}
                <div className="absolute -left-[9999px] top-auto" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={formData.website} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[hsl(0,0%,20%)]">
                    {isRo ? "Cu ce te putem ajuta?" : "Di cosa hai bisogno?"} *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {TIPO_VALUES.map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setTipo(v)}
                        className={`px-3 py-2.5 rounded-xl text-sm font-medium border transition-colors text-left ${
                          tipo === v
                            ? "bg-[hsl(195,85%,45%)] text-white border-[hsl(195,85%,45%)]"
                            : "bg-white text-[hsl(0,0%,35%)] border-[hsl(0,0%,88%)] hover:border-[hsl(195,85%,45%)]/50"
                        }`}
                      >
                        {tipoLabels[v]}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[hsl(0,0%,20%)]">{t.contatti.labelNome} *</label>
                    <Input name="nome" value={formData.nome} onChange={handleChange} placeholder={t.contatti.placeholderNome} required maxLength={100} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[hsl(0,0%,20%)]">{t.contatti.labelAzienda}</label>
                    <Input name="azienda" value={formData.azienda} onChange={handleChange} placeholder={t.contatti.placeholderAzienda} maxLength={100} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[hsl(0,0%,20%)]">{t.contatti.labelEmail} *</label>
                    <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder={t.contatti.placeholderEmail} required maxLength={255} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[hsl(0,0%,20%)]">{t.contatti.labelTelefono}</label>
                    <Input name="telefono" type="tel" value={formData.telefono} onChange={handleChange} placeholder={t.contatti.placeholderTelefono} maxLength={20} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[hsl(0,0%,20%)]">
                    {isRo ? "Oraș / Județ" : "Città / Provincia"}
                  </label>
                  <Input name="citta" value={formData.citta} onChange={handleChange} placeholder={isRo ? "ex. Suceava" : "es. Torino"} maxLength={80} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[hsl(0,0%,20%)]">{t.contatti.labelMessaggio} *</label>
                  <Textarea
                    name="messaggio"
                    value={formData.messaggio}
                    onChange={handleChange}
                    placeholder={
                      tipo === "preventivo"
                        ? (isRo
                            ? "Descrie ce îți trebuie: câte ferestre, dimensiuni aproximative, geam dublu sau triplu…"
                            : "Descrivi cosa ti serve: quante finestre, misure indicative, doppio o triplo vetro…")
                        : t.contatti.placeholderMessaggio
                    }
                    required
                    maxLength={1000}
                    rows={5}
                  />
                </div>
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={privacy}
                    onChange={(e) => setPrivacy(e.target.checked)}
                    className="mt-1 h-4 w-4 accent-[hsl(195,85%,45%)]"
                    required
                  />
                  <span className="text-xs text-[hsl(0,0%,45%)] leading-relaxed">
                    {isRo ? (
                      <>Am citit și accept <Link to="/ro/confidentialitate" className="underline text-[hsl(195,85%,40%)]" target="_blank">informarea privind confidențialitatea</Link>. Datele sunt folosite doar pentru a răspunde cererii. *</>
                    ) : (
                      <>Ho letto e accetto l'<Link to="/privacy" className="underline text-[hsl(195,85%,40%)]" target="_blank">informativa sulla privacy</Link>. I dati sono usati solo per rispondere alla richiesta. *</>
                    )}
                  </span>
                </label>
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
                <p className="text-center text-xs text-[hsl(0,0%,55%)]">
                  {isRo ? "Răspuns în 24 de ore lucrătoare · Ofertă gratuită, fără obligații" : "Risposta entro 24 ore lavorative · Preventivo gratuito, senza impegno"}
                </p>
              </form>
              )}
            </div>

            {/* Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="text-xl font-bold text-[hsl(0,0%,10%)] mb-6">{t.contatti.infoTitle}</h3>
                <div className="space-y-5">
                  <a href={`tel:${t.contatti.telefono}`} className="flex items-center gap-4 text-[hsl(0,0%,35%)] hover:text-[hsl(195,85%,45%)] transition-colors">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[hsl(195,85%,45%)]/10 text-[hsl(195,85%,45%)]">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-[hsl(0,0%,55%)] uppercase tracking-wider font-medium">{t.contatti.telefonoLabel}</p>
                      <p className="font-semibold">{t.contatti.telefono}</p>
                    </div>
                  </a>
                  <a href={whatsappLink(lang)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-[hsl(0,0%,35%)] hover:text-[#25D366] transition-colors">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#25D366]/10 text-[#25D366]">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-[hsl(0,0%,55%)] uppercase tracking-wider font-medium">WhatsApp</p>
                      <p className="font-semibold">{isRo ? "Răspuns rapid în orar de lucru" : "Risposta rapida in orario di lavoro"}</p>
                    </div>
                  </a>
                  <a href="mailto:office.marysoryna@gmail.com" className="flex items-center gap-4 text-[hsl(0,0%,35%)] hover:text-[hsl(195,85%,45%)] transition-colors">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[hsl(195,85%,45%)]/10 text-[hsl(195,85%,45%)]">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-[hsl(0,0%,55%)] uppercase tracking-wider font-medium">{t.contatti.emailLabel}</p>
                      <p className="font-semibold">office.marysoryna@gmail.com</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-4 text-[hsl(0,0%,35%)]">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[hsl(195,85%,45%)]/10 text-[hsl(195,85%,45%)]">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-[hsl(0,0%,55%)] uppercase tracking-wider font-medium">{t.contatti.indirizzoLabel}</p>
                      <p className="font-semibold" dangerouslySetInnerHTML={{ __html: t.contatti.indirizzoVal }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-[hsl(0,0%,35%)]">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[hsl(195,85%,45%)]/10 text-[hsl(195,85%,45%)]">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-[hsl(0,0%,55%)] uppercase tracking-wider font-medium">{t.contatti.orariLabel}</p>
                      <p className="font-semibold">{t.contatti.orariVal}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[hsl(195,85%,45%)]/5 border border-[hsl(195,85%,45%)]/20">
                <p className="text-sm text-[hsl(0,0%,35%)] leading-relaxed">{t.contatti.responseNote}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};

export default ContattiPage;
