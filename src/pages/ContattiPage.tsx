import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, Loader2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";

import { fadeUp, stagger } from "@/lib/animations";

const ContattiPage = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
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
      toast({ title: "Compila i campi obbligatori", description: "Nome, email e messaggio sono richiesti.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from("contact_requests").insert({
        nome: formData.nome.trim(),
        azienda: formData.azienda.trim() || null,
        email: formData.email.trim(),
        telefono: formData.telefono.trim() || null,
        messaggio: formData.messaggio.trim(),
      });
      if (error) throw error;
      toast({ title: "Richiesta inviata!", description: "Ti ricontatteremo al più presto." });
      setFormData({ nome: "", azienda: "", email: "", telefono: "", messaggio: "" });
    } catch {
      toast({ title: "Errore", description: "Impossibile inviare la richiesta. Riprova.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />

      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-14 sm:pb-20 bg-[hsl(0,0%,97%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.3em] text-[hsl(195,85%,45%)] uppercase mb-3 sm:mb-4">
              Contattaci
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-2xl sm:text-5xl font-extrabold text-[hsl(0,0%,10%)] leading-tight mb-4 sm:mb-6">
              Diventa <span className="text-[hsl(195,85%,45%)]">Rivenditore</span> ThermoDMR
            </motion.h1>
            <motion.p variants={fadeUp} className="text-base sm:text-lg text-[hsl(0,0%,40%)] leading-relaxed">
              Compila il form e un nostro commerciale ti ricontatterà entro 24 ore.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="bg-[hsl(0,0%,97%)] rounded-2xl border border-[hsl(0,0%,90%)] p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[hsl(0,0%,20%)]">Nome *</label>
                    <Input name="nome" value={formData.nome} onChange={handleChange} placeholder="Mario Rossi" required maxLength={100} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[hsl(0,0%,20%)]">Azienda</label>
                    <Input name="azienda" value={formData.azienda} onChange={handleChange} placeholder="La Tua Azienda Srl" maxLength={100} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[hsl(0,0%,20%)]">Email *</label>
                    <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="info@tuaazienda.it" required maxLength={255} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[hsl(0,0%,20%)]">Telefono</label>
                    <Input name="telefono" type="tel" value={formData.telefono} onChange={handleChange} placeholder="+39 333 123 4567" maxLength={20} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[hsl(0,0%,20%)]">Messaggio *</label>
                  <Textarea name="messaggio" value={formData.messaggio} onChange={handleChange} placeholder="Descrivi la tua attività e cosa cerchi in un fornitore..." required maxLength={1000} rows={5} />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[hsl(195,85%,45%)] hover:bg-[hsl(195,85%,38%)] text-white font-semibold rounded-full py-6 text-base shadow-[0_4px_20px_hsl(195,85%,45%,0.3)]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Invio in corso...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Invia Richiesta
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="text-xl font-bold text-[hsl(0,0%,10%)] mb-6">Informazioni di Contatto</h3>
                <div className="space-y-5">
                  <a href="tel:+390000000000" className="flex items-center gap-4 text-[hsl(0,0%,35%)] hover:text-[hsl(195,85%,45%)] transition-colors">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[hsl(195,85%,45%)]/10 text-[hsl(195,85%,45%)]">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-[hsl(0,0%,55%)] uppercase tracking-wider font-medium">Telefono</p>
                      <p className="font-semibold">+39 000 000 0000</p>
                    </div>
                  </a>
                  <a href="mailto:info@thermodmr.it" className="flex items-center gap-4 text-[hsl(0,0%,35%)] hover:text-[hsl(195,85%,45%)] transition-colors">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[hsl(195,85%,45%)]/10 text-[hsl(195,85%,45%)]">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-[hsl(0,0%,55%)] uppercase tracking-wider font-medium">Email</p>
                      <p className="font-semibold">info@thermodmr.it</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-4 text-[hsl(0,0%,35%)]">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[hsl(195,85%,45%)]/10 text-[hsl(195,85%,45%)]">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-[hsl(0,0%,55%)] uppercase tracking-wider font-medium">Indirizzo</p>
                      <p className="font-semibold">Via dell'Industria, 00<br />00000 Città (PR)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-[hsl(0,0%,35%)]">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[hsl(195,85%,45%)]/10 text-[hsl(195,85%,45%)]">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-[hsl(0,0%,55%)] uppercase tracking-wider font-medium">Orari</p>
                      <p className="font-semibold">Lun-Ven: 8:30 - 17:30</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[hsl(195,85%,45%)]/5 border border-[hsl(195,85%,45%)]/20">
                <p className="text-sm text-[hsl(0,0%,35%)] leading-relaxed">
                  <strong className="text-[hsl(0,0%,10%)]">Risposta garantita entro 24 ore.</strong>{" "}
                  Un nostro commerciale ti contatterà per fissare un appuntamento e presentarti il programma rivenditori.
                </p>
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
