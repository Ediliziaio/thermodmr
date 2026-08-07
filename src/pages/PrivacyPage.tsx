import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import { useLanguage } from "@/i18n/LanguageContext";
import SeoHead from "@/components/SeoHead";

const PrivacyPage = () => {
  const { lang } = useLanguage();
  const isRo = lang === "ro";

  const sections: Array<{ h: string; p: React.ReactNode }> = isRo
    ? [
        { h: "Operatorul de date", p: <>MARYSORYNA SRL, Sat Bilca Com. Bilca, Nr. 45, Bilca, Jud. Suceava, România — CIF RO26969660, Reg. Com. J33/334/2010. Contact: <a className="underline" href="mailto:office.marysoryna@gmail.com">office.marysoryna@gmail.com</a>.</> },
        { h: "Ce date colectăm", p: "Prin formularele site-ului colectăm datele pe care ni le furnizezi: nume, e-mail, telefon (opțional), firmă (opțional), oraș (opțional) și conținutul mesajului. Site-ul nu folosește cookie-uri de profilare." },
        { h: "Scopul prelucrării", p: "Datele sunt folosite exclusiv pentru a răspunde cererii tale (ofertă, informații, candidatură distribuitor, asistență) și pentru comunicările directe legate de aceasta. Nu trimitem newsletter fără consimțământ separat și nu cedăm datele către terți în scopuri de marketing." },
        { h: "Temeiul juridic", p: "Prelucrarea se bazează pe consimțământul tău (art. 6.1.a GDPR) și pe măsurile precontractuale la cererea ta (art. 6.1.b GDPR — pregătirea ofertei)." },
        { h: "Păstrarea datelor", p: "Cererile de contact sunt păstrate pentru maximum 24 de luni de la ultimul contact, apoi șterse — cu excepția cazului în care devin parte a unei relații contractuale (comandă), caz în care se aplică termenele legale de arhivare." },
        { h: "Unde sunt stocate datele", p: "Datele sunt stocate în sisteme cloud securizate (Supabase — infrastructură UE unde disponibilă) cu acces limitat la personalul autorizat. Notificările interne sunt trimise prin furnizorul de e-mail Resend." },
        { h: "Drepturile tale", p: <>Poți cere oricând accesul, rectificarea, ștergerea, limitarea prelucrării sau portabilitatea datelor și îți poți retrage consimțământul scriind la <a className="underline" href="mailto:office.marysoryna@gmail.com">office.marysoryna@gmail.com</a>. Ai dreptul să depui plângere la autoritatea de supraveghere (ANSPDCP în România, Garante Privacy în Italia).</> },
      ]
    : [
        { h: "Titolare del trattamento", p: <>MARYSORYNA SRL, Sat Bilca Com. Bilca, Nr. 45, Bilca, Jud. Suceava, Romania — P.IVA/CIF RO26969660, Reg. Imprese J33/334/2010. Contatto: <a className="underline" href="mailto:office.marysoryna@gmail.com">office.marysoryna@gmail.com</a>.</> },
        { h: "Quali dati raccogliamo", p: "Tramite i moduli del sito raccogliamo i dati che ci fornisci: nome, email, telefono (facoltativo), azienda (facoltativa), città (facoltativa) e il contenuto del messaggio. Il sito non utilizza cookie di profilazione." },
        { h: "Finalità del trattamento", p: "I dati sono usati esclusivamente per rispondere alla tua richiesta (preventivo, informazioni, candidatura rivenditore, assistenza) e per le comunicazioni dirette a essa collegate. Non inviamo newsletter senza consenso separato e non cediamo i dati a terzi per finalità di marketing." },
        { h: "Base giuridica", p: "Il trattamento si fonda sul tuo consenso (art. 6.1.a GDPR) e sulle misure precontrattuali adottate su tua richiesta (art. 6.1.b GDPR — preparazione del preventivo)." },
        { h: "Conservazione dei dati", p: "Le richieste di contatto sono conservate per un massimo di 24 mesi dall'ultimo contatto, poi cancellate — salvo che sfocino in un rapporto contrattuale (ordine), nel qual caso valgono i termini di conservazione di legge." },
        { h: "Dove sono conservati i dati", p: "I dati sono archiviati su sistemi cloud sicuri (Supabase — infrastruttura UE ove disponibile) con accesso limitato al personale autorizzato. Le notifiche interne transitano tramite il provider email Resend." },
        { h: "I tuoi diritti", p: <>Puoi chiedere in qualsiasi momento accesso, rettifica, cancellazione, limitazione del trattamento o portabilità dei dati e revocare il consenso scrivendo a <a className="underline" href="mailto:office.marysoryna@gmail.com">office.marysoryna@gmail.com</a>. Hai diritto di proporre reclamo all'autorità di controllo (Garante Privacy in Italia, ANSPDCP in Romania).</> },
      ];

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title={isRo ? "Politica de Confidențialitate — ThermoDMR" : "Informativa Privacy — ThermoDMR"}
        description={isRo ? "Cum tratează ThermoDMR (MARYSORYNA SRL) datele personale trimise prin formularele site-ului: scopuri, păstrare și drepturile tale GDPR." : "Come ThermoDMR (MARYSORYNA SRL) tratta i dati personali inviati tramite i moduli del sito: finalità, conservazione e i tuoi diritti GDPR."}
        canonical={isRo ? "/ro/confidentialitate" : "/privacy"}
        lang={lang}
        hreflangIt="/privacy"
        hreflangRo="/ro/confidentialitate"
      />
      <PublicNavbar />
      <section className="pt-28 sm:pt-36 pb-16 sm:pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[hsl(0,0%,10%)] mb-3">
            {isRo ? "Politica de Confidențialitate" : "Informativa sulla Privacy"}
          </h1>
          <p className="text-sm text-[hsl(0,0%,55%)] mb-10">
            {isRo ? "Ultima actualizare: 6 august 2026" : "Ultimo aggiornamento: 6 agosto 2026"}
          </p>
          <div className="space-y-8">
            {sections.map((s) => (
              <div key={s.h}>
                <h2 className="text-xl font-bold text-[hsl(0,0%,15%)] mb-2">{s.h}</h2>
                <p className="text-[hsl(0,0%,38%)] leading-relaxed">{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <PublicFooter />
    </div>
  );
};

export default PrivacyPage;
