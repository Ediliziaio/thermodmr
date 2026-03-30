export type Lang = "it" | "ro";

// ---------------------------------------------------------------------------
// Shared types for data arrays used in pages
// ---------------------------------------------------------------------------
export interface NavItem { label: string; to: string; hasDropdown?: boolean }
export interface ProductLink { label: string; to: string }
export interface ValueItem { title: string; desc: string }
export interface StatItem { value: string; label: string }
export interface AdvantageItem { metric: string; metricLabel: string; title: string; desc: string }
export interface ExtraAdvantageItem { title: string; desc: string }
export interface GuaranteeItem { title: string; desc: string; details: string[] }
export interface BenefitItem { title: string; desc: string }
export interface StepItem { step: string; title: string; desc: string }
export interface PvcModel { name: string; badge: string; desc: string; features: string[] }
export interface OtherProduct { title: string; desc: string; features: string[] }
export interface Counter { value: string; label: string }

// ---------------------------------------------------------------------------
// Full translation shape
// ---------------------------------------------------------------------------
export interface Translations {
  lang: Lang;

  // ---- Nav / Footer ----
  nav: {
    chiSiamo: string;
    prodotti: string;
    vantaggi: string;
    garanzie: string;
    diventaRivenditore: string;
    contatti: string;
    areaRiservata: string;
    accedi: string;
    richiediPreventivo: string;
    productLinks: ProductLink[];
    navLinks: NavItem[];
  };
  footer: {
    tagline: string;
    prodotti: string;
    finestrePvc: string;
    portoncini: string;
    cassonetti: string;
    tapparelle: string;
    persiane: string;
    contattiTitle: string;
    linkUtili: string;
    areaRiservataRivenditori: string;
    chiSiamo: string;
    contattaci: string;
    diventaRivenditore: string;
    allRights: string;
  };

  // ---- Common CTAs ----
  cta: {
    richiediPreventivo: string;
    scopriDiPiu: string;
    scopriIProdotti: string;
    scopriIVantaggi: string;
    scopriLaNostraStoria: string;
    diventaRivenditore: string;
    candidatiOra: string;
    scopriCome: string;
    inviaRichiesta: string;
    inviando: string;
    trovaDealerBtn: string;
    richiediContratto: string;
    garantitoContrattualmente: string;
  };

  // ---- Home ----
  home: {
    heroTag: string;
    heroTitle: string;
    heroTitleHighlight: string;
    heroDesc: string;
    trustBadges: string[];
    chiSiamoTag: string;
    chiSiamoTitle: string;
    chiSiamoDesc1: string;
    chiSiamoDesc2: string;
    statsSection: StatItem[];
    statsNote: string;
    prodottiTitle: string;
    finestrepvcLabel: string;
    complementiLabel: string;
    percheThermoTag: string;
    percheThermoTitle: string;
    percheThermoDesc: string;
    benefits: { title: string; desc: string }[];
    qualitaTag: string;
    qualitaTitle: string;
    qualitaItems: { title: string; desc: string }[];
    trovaDealerTitle: string;
    trovaDealerDesc: string;
    trovaDealerCards: string[];
    becomeTag: string;
    becomeTitle: string;
    becomeDesc: string;
    becomePerks: string[];
    contattiTag: string;
    contattiTitle: string;
    contattiDesc: string;
    formNome: string;
    formChiSei: string;
    formEmail: string;
    formTelefono: string;
    formAzienda: string;
    formMessaggio: string;
    formChiSeiOptions: string[];
  };

  // ---- Chi Siamo ----
  chiSiamo: {
    heroTag: string;
    heroTitle: string;
    heroTitleHighlight: string;
    heroDesc: string;
    storiaTitle: string;
    storiaP1: string;
    storiaP2: string;
    storiaP3: string;
    valoriTag: string;
    valoriTitle: string;
    values: ValueItem[];
    stats: StatItem[];
    trovaDealerTitle: string;
    trovaDealerDesc: string;
    becomeTitle: string;
    becomeDesc: string;
    becomePerks: string[];
  };

  // ---- Prodotti Pubblico ----
  prodottiPubblico: {
    heroTag: string;
    heroTitle: string;
    heroTitleHighlight: string;
    heroDesc: string;
    breadcrumbHome: string;
    breadcrumbProdotti: string;
    counters: Counter[];
    gammaTag: string;
    gammaTitle: string;
    gammaDesc: string;
    pvcModels: PvcModel[];
    complementiTag: string;
    complementiTitle: string;
    complementiDesc: string;
    otherProducts: OtherProduct[];
    ctaTitle: string;
    ctaDesc: string;
    badgeLabels: { confort: string; domus: string; passive: string };
  };

  // ---- Vantaggi ----
  vantaggi: {
    heroTag: string;
    heroTitle: string;
    heroDesc: string;
    mainAdvantages: AdvantageItem[];
    extraTitle: string;
    extraAdvantages: ExtraAdvantageItem[];
    ctaTitle: string;
    ctaDesc: string;
  };

  // ---- Garanzie ----
  garanzie: {
    heroTag: string;
    heroTitle: string;
    heroTitleHighlight: string;
    heroDesc: string;
    guarantees: GuaranteeItem[];
    ctaTitle: string;
    ctaDesc: string;
  };

  // ---- Contatti ----
  contatti: {
    heroTag: string;
    heroTitle: string;
    heroTitleHighlight: string;
    heroDesc: string;
    labelNome: string;
    labelAzienda: string;
    labelEmail: string;
    labelTelefono: string;
    labelMessaggio: string;
    placeholderNome: string;
    placeholderAzienda: string;
    placeholderEmail: string;
    placeholderTelefono: string;
    placeholderMessaggio: string;
    infoTitle: string;
    telefono: string;
    telefonoLabel: string;
    emailLabel: string;
    indirizzoLabel: string;
    indirizzoVal: string;
    orariLabel: string;
    orariVal: string;
    responseNote: string;
    toastSuccess: string;
    toastSuccessDesc: string;
    toastError: string;
    toastErrorDesc: string;
    toastValidation: string;
    toastValidationDesc: string;
  };

  // ---- Diventa Rivenditore ----
  diventaRivenditore: {
    heroTag: string;
    heroTitle: string;
    heroDesc: string;
    vantaggiTag: string;
    vantaggiTitle: string;
    vantaggiDesc: string;
    benefits: BenefitItem[];
    stepsTag: string;
    stepsTitle: string;
    steps: StepItem[];
    ctaTitle: string;
    ctaDesc: string;
    ctaPerks: string[];
  };
}

// ===========================================================================
// ITALIAN
// ===========================================================================
const it: Translations = {
  lang: "it",

  nav: {
    chiSiamo: "Chi Siamo",
    prodotti: "Prodotti",
    vantaggi: "Vantaggi",
    garanzie: "Garanzie",
    diventaRivenditore: "Diventa Rivenditore",
    contatti: "Contatti",
    areaRiservata: "Area Riservata",
    accedi: "Accedi",
    richiediPreventivo: "Richiedi Preventivo",
    productLinks: [
      { label: "Finestre in PVC", to: "/prodotti-pubblico" },
      { label: "DMR Confort", to: "/prodotti/dmr-confort" },
      { label: "DMR Domus", to: "/prodotti/dmr-domus" },
      { label: "DMR Passive", to: "/prodotti/dmr-passive" },
      { label: "Portoncini", to: "/prodotti/portoncini" },
      { label: "Cassonetti", to: "/prodotti/cassonetti" },
      { label: "Tapparelle", to: "/prodotti/tapparelle" },
      { label: "Persiane", to: "/prodotti/persiane" },
    ],
    navLinks: [
      { label: "Chi Siamo", to: "/chi-siamo" },
      { label: "Prodotti", to: "/prodotti-pubblico", hasDropdown: true },
      { label: "Vantaggi", to: "/vantaggi" },
      { label: "Garanzie", to: "/garanzie" },
      { label: "Diventa Rivenditore", to: "/diventa-rivenditore" },
      { label: "Contatti", to: "/contatti" },
    ],
  },

  footer: {
    tagline: "Produciamo serramenti di alta qualità con profilo tedesco. Design, isolamento e il miglior prezzo di mercato.",
    prodotti: "Prodotti",
    finestrePvc: "Finestre in PVC",
    portoncini: "Portoncini",
    cassonetti: "Cassonetti",
    tapparelle: "Tapparelle",
    persiane: "Persiane",
    contattiTitle: "Contatti",
    linkUtili: "Link Utili",
    areaRiservataRivenditori: "Area Riservata Rivenditori",
    chiSiamo: "Chi Siamo",
    contattaci: "Contattaci",
    diventaRivenditore: "Diventa Rivenditore",
    allRights: "Tutti i diritti riservati.",
  },

  cta: {
    richiediPreventivo: "Richiedi Preventivo",
    scopriDiPiu: "Scopri di più",
    scopriIProdotti: "Scopri i Prodotti",
    scopriIVantaggi: "Scopri i Vantaggi",
    scopriLaNostraStoria: "Scopri la Nostra Storia",
    diventaRivenditore: "Diventa Rivenditore",
    candidatiOra: "Candidati Ora",
    scopriCome: "Scopri Come",
    inviaRichiesta: "Invia Richiesta",
    inviando: "Invio in corso...",
    trovaDealerBtn: "Trova Rivenditore",
    richiediContratto: "Richiedi il Contratto",
    garantitoContrattualmente: "Garantito contrattualmente",
  },

  home: {
    heroTag: "ThermoDMR — Infissi e Serramenti in PVC",
    heroTitle: "Finestre di Design al",
    heroTitleHighlight: "Miglior Prezzo di Mercato",
    heroDesc: "Profilo tedesco, isolamento superiore, qualità certificata. Produciamo direttamente, senza intermediari, per offrirti il miglior rapporto qualità-prezzo.",
    trustBadges: ["Profilo Tedesco", "Isolamento Classe A", "Garanzia 15 Anni", "Design Esclusivo"],
    chiSiamoTag: "Chi Siamo",
    chiSiamoTitle: "Produciamo Infissi di Design con Tecnologia e Qualità Tedesca",
    chiSiamoDesc1: "Da oltre 10 anni progettiamo e realizziamo serramenti nel nostro stabilimento produttivo, unendo design contemporaneo e tecnologia avanzata. Ogni finestra nasce da profili tedeschi di prima qualità e processi industriali certificati.",
    chiSiamoDesc2: "La produzione interna ci permette di garantire qualità costante, tempi rapidi e un prezzo di fabbrica senza intermediari. Scegliamo materiali sostenibili e soluzioni ad alto isolamento per il comfort della tua casa e il rispetto dell'ambiente.",
    statsSection: [
      { value: "50.000+", label: "Finestre Installate" },
      { value: "10+", label: "Anni di Esperienza" },
      { value: "2-6 sett.", label: "Tempi di Consegna" },
      { value: "98%", label: "Clienti Soddisfatti" },
    ],
    statsNote: "* in base a colori e modello",
    prodottiTitle: "I Nostri Prodotti",
    finestrepvcLabel: "Finestre in PVC",
    complementiLabel: "H3: Complementi e Accessori",
    percheThermoTag: "Perché Scegliere Noi",
    percheThermoTitle: "Perché Scegliere ThermoDMR",
    percheThermoDesc: "Qualità certificata, design esclusivo e il miglior prezzo di mercato. Tutto nasce nel nostro stabilimento, dalla progettazione alla consegna.",
    benefits: [
      { title: "Isolamento Superiore", desc: "Classe A di isolamento termico e acustico. I nostri serramenti garantiscono un risparmio energetico fino al 40%, per una casa più calda d'inverno e fresca d'estate." },
      { title: "Profilo Tedesco, Design Esclusivo", desc: "Profili in PVC di produzione tedesca, linee pulite e finiture curate nei minimi dettagli. Un'ampia scelta di colori e stili per valorizzare l'estetica della tua casa." },
      { title: "Miglior Rapporto Qualità/Prezzo", desc: "Produzione diretta nel nostro stabilimento, senza intermediari. Ti offriamo il prezzo di fabbrica con la qualità di un profilo tedesco certificato." },
      { title: "Garanzia e Assistenza", desc: "Fino a 15 anni di garanzia su tutti i nostri prodotti. Assistenza post-vendita dedicata e un team tecnico sempre a tua disposizione." },
    ],
    qualitaTag: "Qualità e Certificazioni",
    qualitaTitle: "Qualità che Dura nel Tempo",
    qualitaItems: [
      { title: "Qualità Certificata", desc: "Tutti i nostri serramenti sono certificati secondo le normative europee. Materiali di prima scelta e controllo qualità rigoroso su ogni prodotto." },
      { title: "Sostenibilità Ambientale", desc: "Profili in PVC riciclabile, vetri basso-emissivi e processi produttivi a basso impatto ambientale. Scegli il comfort senza rinunciare al pianeta." },
      { title: "Garanzia Fino a 15 Anni", desc: "I nostri prodotti sono costruiti per durare. Offriamo una garanzia estesa fino a 15 anni su profili, vetri e ferramenta." },
      { title: "Assistenza Post-Vendita", desc: "Un team dedicato ti segue anche dopo l'acquisto. Supporto tecnico, manutenzione e ricambi sempre disponibili per la massima tranquillità." },
    ],
    trovaDealerTitle: "Trova il Rivenditore ThermoDMR Più Vicino a Te",
    trovaDealerDesc: "Una rete di professionisti qualificati su tutto il territorio nazionale, pronti a consigliarti la soluzione migliore per la tua casa.",
    trovaDealerCards: ["Consulenza Gratuita", "Sopralluogo Dedicato", "Preventivo in 24h"],
    becomeTag: "Partnership",
    becomeTitle: "Vuoi Diventare un Rivenditore ThermoDMR?",
    becomeDesc: "Entra nella nostra rete di rivenditori e accedi a vantaggi esclusivi per far crescere la tua attività.",
    becomePerks: ["Prezzi di fabbrica", "Zona esclusiva", "Supporto marketing", "Consegna in 2-6 settimane"],
    contattiTag: "Contattaci",
    contattiTitle: "Contattaci",
    contattiDesc: "Compila il form per richiedere un preventivo o per informazioni sulla nostra rete di rivenditori.",
    formNome: "Nome",
    formChiSei: "Chi sei?",
    formEmail: "Email",
    formTelefono: "Telefono",
    formAzienda: "Azienda (opzionale)",
    formMessaggio: "Messaggio",
    formChiSeiOptions: ["Privato", "Rivenditore", "Costruttore", "Architetto"],
  },

  chiSiamo: {
    heroTag: "Chi Siamo",
    heroTitle: "Produciamo Infissi di Qualità per",
    heroTitleHighlight: "Far Crescere la Tua Attività",
    heroDesc: "Da oltre 10 anni produciamo serramenti internamente, senza intermediari. Questo ci permette di offrirti il prezzo più competitivo sul mercato, tempi di consegna da 2 a 6 settimane e un controllo qualità rigoroso su ogni singolo prodotto.",
    storiaTitle: "La Nostra Storia",
    storiaP1: "ThermoDMR nasce dalla passione per il serramento e dalla volontà di offrire ai rivenditori un partner affidabile. Abbiamo investito in tecnologia e processi produttivi per eliminare ogni intermediario e garantire prezzi competitivi senza compromessi sulla qualità.",
    storiaP2: "Il nostro stabilimento produttivo è dotato di macchinari di ultima generazione che ci permettono di lavorare PVC, alluminio e legno con precisione millimetrica. Ogni finestra, porta o persiana viene assemblata e testata internamente prima della spedizione.",
    storiaP3: "Oggi collaboriamo con oltre 200 rivenditori in tutta Italia, uniti da un obiettivo comune: offrire al cliente finale il miglior prodotto al miglior prezzo.",
    valoriTag: "I Nostri Valori",
    valoriTitle: "Cosa Ci Guida Ogni Giorno",
    values: [
      { title: "Produzione Interna", desc: "Nessun intermediario. Controlliamo ogni fase della produzione per garantirti il miglior rapporto qualità-prezzo." },
      { title: "Partner, Non Fornitore", desc: "Il nostro obiettivo non è venderti un prodotto, ma farti guadagnare. Cresciamo insieme ai nostri rivenditori." },
      { title: "Qualità Certificata", desc: "Ogni prodotto supera rigidi controlli qualità prima della spedizione. Standard europei e certificazioni complete." },
      { title: "Supporto Costante", desc: "Un referente dedicato, formazione tecnica e materiale marketing personalizzato. Sempre al tuo fianco." },
    ],
    stats: [
      { value: "200+", label: "Rivenditori Attivi" },
      { value: "10+", label: "Anni di Esperienza" },
      { value: "2-6 sett.", label: "Tempi di Consegna" },
      { value: "98%", label: "Consegne Puntuali" },
    ],
    trovaDealerTitle: "Trova il Rivenditore Più Vicino",
    trovaDealerDesc: "Cerca il punto vendita autorizzato ThermoDMR nella tua zona per toccare con mano la qualità dei nostri serramenti e ricevere una consulenza personalizzata.",
    becomeTitle: "Vuoi Diventare Rivenditore ThermoDMR?",
    becomeDesc: "Prezzi di fabbrica, zona esclusiva e supporto completo: entra nella nostra rete e fai crescere la tua attività con prodotti di qualità superiore.",
    becomePerks: ["Prezzi di fabbrica", "Zona esclusiva", "Supporto marketing", "Formazione tecnica", "Piattaforma online dedicata"],
  },

  prodottiPubblico: {
    heroTag: "I Nostri Prodotti",
    heroTitle: "Serramenti in PVC di",
    heroTitleHighlight: "Qualità Superiore",
    heroDesc: "Finestre, portoncini, cassonetti, tapparelle e persiane: una gamma completa per massimizzare i tuoi margini e la soddisfazione dei tuoi clienti.",
    breadcrumbHome: "Home",
    breadcrumbProdotti: "Prodotti",
    counters: [
      { value: "7", label: "Linee di Prodotto" },
      { value: "3", label: "Modelli Finestre" },
      { value: "100+", label: "Colori Disponibili" },
      { value: "2-6", label: "Settimane Consegna" },
    ],
    gammaTag: "La Gamma Finestre",
    gammaTitle: "Tre Modelli per Ogni Esigenza",
    gammaDesc: "Dal progetto base alla ristrutturazione premium: scegli il profilo più adatto al tuo mercato.",
    pvcModels: [
      { name: "DMR CONFORT", badge: "Miglior Prezzo", desc: "La soluzione ideale per chi cerca qualità e convenienza. Profilo a 3 camere con ottime prestazioni termiche.", features: ["Profilo a 3 camere", "Classe B", "Vetrocamera standard", "Ampia gamma colori"] },
      { name: "DMR DOMUS", badge: "Best Seller", desc: "Il best-seller della gamma. Profilo a 5 camere per un isolamento superiore e massimo comfort abitativo.", features: ["Profilo a 5 camere", "Classe A", "Vetrocamera con gas argon", "Ferramenta Roto"] },
      { name: "DMR PASSIVE", badge: "Top di Gamma", desc: "Il top di gamma per progetti di alto livello. Profilo a 7 camere con prestazioni certificate Passivhaus.", features: ["Profilo a 7 camere", "Classe A+", "Triplo vetro basso emissivo", "Design minimale"] },
    ],
    complementiTag: "Complementi",
    complementiTitle: "Accessori e Chiusure",
    complementiDesc: "Portoncini, cassonetti, tapparelle e persiane per completare l'offerta ai tuoi clienti.",
    otherProducts: [
      { title: "Portoncini in PVC", desc: "Portoncini d'ingresso in PVC con elevata sicurezza e isolamento termico. Finiture personalizzabili per adattarsi a ogni stile architettonico.", features: ["Pannelli decorativi personalizzabili", "Serratura di sicurezza multipoint", "Isolamento termico e acustico", "Soglia ribassata disponibile", "Resistenza agli agenti atmosferici"] },
      { title: "Cassonetti", desc: "Cassonetti coibentati per avvolgibili, progettati per eliminare i ponti termici e garantire il massimo isolamento nella zona del vano avvolgibile.", features: ["Coibentazione in EPS ad alta densità", "Eliminazione ponti termici", "Ispezione frontale facilitata", "Compatibili con tapparelle motorizzate", "Dimensioni su misura"] },
      { title: "Tapparelle", desc: "Tapparelle in PVC e alluminio coibentato, disponibili con motorizzazione elettrica e predisposizione per la domotica.", features: ["PVC o alluminio coibentato", "Motorizzazione elettrica", "Predisposizione domotica", "Anti-sollevamento di sicurezza", "Colori coordinati con infissi"] },
      { title: "Persiane", desc: "Persiane in alluminio con lamelle orientabili per un controllo ottimale della luce e della ventilazione. Design elegante e zero manutenzione.", features: ["Alluminio verniciato a polvere", "Lamelle orientabili", "Cerniere a scomparsa", "Ampia gamma RAL", "Manutenzione zero"] },
    ],
    ctaTitle: "Diventa Rivenditore ThermoDMR",
    ctaDesc: "Entra nella rete di rivenditori ThermoDMR e offri ai tuoi clienti serramenti di qualità superiore con margini competitivi e supporto dedicato.",
    badgeLabels: { confort: "Miglior Prezzo", domus: "Best Seller", passive: "Top di Gamma" },
  },

  vantaggi: {
    heroTag: "I Tuoi Vantaggi Competitivi",
    heroTitle: "Perché Scegliere ThermoDMR",
    heroDesc: "Stanco di fornitori che non rispettano i tempi, con prezzi sempre più alti e zero supporto? Con ThermoDMR hai un partner che lavora per farti guadagnare.",
    mainAdvantages: [
      { metric: "-30%", metricLabel: "vs concorrenza", title: "Prezzo Più Basso sul Mercato", desc: "Produciamo internamente, senza intermediari. Questo significa prezzi imbattibili e margini più alti su ogni vendita. Non troverai un produttore più competitivo con la stessa qualità." },
      { metric: "2-6 sett.", metricLabel: "garantite", title: "Tempi Certi di Consegna", desc: "Da 2 a 6 settimane dalla conferma d'ordine, garantite contrattualmente. Mai più clienti che aspettano mesi, mai più scuse da dare." },
      { metric: "100%", metricLabel: "dedicato", title: "Il Tuo Successo è il Nostro", desc: "Supporto commerciale, materiale marketing personalizzato, formazione tecnica e un referente dedicato sempre disponibile per far crescere il tuo business." },
    ],
    extraTitle: "E Non È Tutto...",
    extraAdvantages: [
      { title: "Margini Garantiti", desc: "Listino riservato e zona esclusiva. Nessuna concorrenza interna tra rivenditori ThermoDMR." },
      { title: "Rete Selezionata", desc: "Selezioniamo i nostri partner. Meno rivenditori, più attenzione e supporto dedicato a ciascuno." },
      { title: "Qualità Certificata", desc: "Tutti i prodotti conformi alle normative europee con certificazioni complete incluse." },
      { title: "Post-Vendita Garantito", desc: "Assistenza tecnica rapida e ricambi sempre disponibili. Il tuo cliente è sempre seguito." },
    ],
    ctaTitle: "Inizia a Guadagnare di Più Oggi!",
    ctaDesc: "Entra nella rete ThermoDMR e scopri cosa significa avere un partner produttore serio.",
  },

  garanzie: {
    heroTag: "Le Nostre Garanzie",
    heroTitle: "Garanzie",
    heroTitleHighlight: "Contrattuali",
    heroDesc: "Non promettiamo, garantiamo. Ogni impegno è scritto nero su bianco nel contratto di partnership.",
    guarantees: [
      { title: "Zero Reclami, Zero Problemi", desc: "Qualità certificata e controllo rigoroso su ogni prodotto. Meno resi, più reputazione per la tua attività.", details: ["Controllo qualità su ogni singolo pezzo", "Certificazioni europee complete", "Test di tenuta all'aria, acqua e vento", "Garanzia di 10 anni su tutti i prodotti"] },
      { title: "Consegna Garantita nei Tempi", desc: "Mai più clienti che aspettano. Da 2 a 6 settimane dalla conferma d'ordine, garantite contrattualmente.", details: ["Da 2 a 6 settimane garantite contrattualmente", "Tracking ordine in tempo reale", "Penale automatica in caso di ritardo", "Consegna con mezzo dedicato e scarico incluso"] },
      { title: "Margini Protetti", desc: "Listino riservato e zona esclusiva. Nessuna concorrenza interna tra rivenditori ThermoDMR nella tua area.", details: ["Zona di esclusiva territoriale", "Listino prezzi riservato e protetto", "Nessuna vendita diretta al pubblico", "Politica anti-dumping tra rivenditori"] },
      { title: "Supporto Commerciale Dedicato", desc: "Un referente sempre disponibile, materiale marketing personalizzato e formazione tecnica continua.", details: ["Referente commerciale dedicato", "Materiale marketing personalizzato", "Formazione tecnica e commerciale", "Assistenza post-vendita prioritaria"] },
    ],
    ctaTitle: "Vuoi Leggere il Contratto Completo?",
    ctaDesc: "Contattaci e ti invieremo il contratto di partnership senza impegno.",
  },

  contatti: {
    heroTag: "Contattaci",
    heroTitle: "Diventa",
    heroTitleHighlight: "Rivenditore",
    heroDesc: "Compila il form e un nostro commerciale ti ricontatterà entro 24 ore.",
    labelNome: "Nome *",
    labelAzienda: "Azienda",
    labelEmail: "Email *",
    labelTelefono: "Telefono",
    labelMessaggio: "Messaggio *",
    placeholderNome: "Mario Rossi",
    placeholderAzienda: "La Tua Azienda Srl",
    placeholderEmail: "info@tuaazienda.it",
    placeholderTelefono: "+39 333 123 4567",
    placeholderMessaggio: "Descrivi la tua attività e cosa cerchi in un fornitore...",
    infoTitle: "Informazioni di Contatto",
    telefono: "+39 000 000 0000",
    telefonoLabel: "Telefono",
    emailLabel: "Email",
    indirizzoLabel: "Indirizzo",
    indirizzoVal: "Via dell'Industria, 00\n00000 Città (PR)",
    orariLabel: "Orari",
    orariVal: "Lun-Ven: 8:30 - 17:30",
    responseNote: "Risposta garantita entro 24 ore. Un nostro commerciale ti contatterà per fissare un appuntamento e presentarti il programma rivenditori.",
    toastSuccess: "Richiesta inviata!",
    toastSuccessDesc: "Ti ricontatteremo al più presto.",
    toastError: "Errore",
    toastErrorDesc: "Impossibile inviare la richiesta. Riprova.",
    toastValidation: "Compila i campi obbligatori",
    toastValidationDesc: "Nome, email e messaggio sono richiesti.",
  },

  diventaRivenditore: {
    heroTag: "Partnership",
    heroTitle: "Diventa Rivenditore ThermoDMR",
    heroDesc: "Entra nella nostra rete di rivenditori e offri ai tuoi clienti serramenti di qualità superiore con profilo tedesco, margini competitivi e supporto dedicato.",
    vantaggiTag: "I Vantaggi della Partnership",
    vantaggiTitle: "Perché Scegliere ThermoDMR",
    vantaggiDesc: "Un partner che ti supporta a 360°: dalla formazione alla consegna, dal marketing alla post-vendita.",
    benefits: [
      { title: "Prezzi di Fabbrica", desc: "Acquisti direttamente dal produttore, senza intermediari. Margini più alti per la tua attività." },
      { title: "Zona Esclusiva", desc: "Ti garantiamo una zona di competenza esclusiva per proteggere il tuo investimento e la tua clientela." },
      { title: "Supporto Marketing", desc: "Materiale promozionale, campionari, supporto grafico e co-marketing per far crescere la tua visibilità." },
      { title: "Consegna Rapida", desc: "Tempi di produzione e consegna ridotti: da 2 a 6 settimane in base al prodotto e alla finitura scelta." },
      { title: "Pagamenti Flessibili", desc: "Condizioni di pagamento personalizzate e flessibili, studiate per sostenere la crescita del tuo business." },
      { title: "Formazione Tecnica", desc: "Corsi di formazione tecnica e commerciale per te e il tuo team. Aggiornamento continuo sui nostri prodotti." },
      { title: "Piattaforma Online Dedicata", desc: "Accedi alla nostra piattaforma riservata per monitorare lo stato dei tuoi ordini, verificare i pagamenti e gestire i preventivi in tempo reale." },
    ],
    stepsTag: "Il Percorso",
    stepsTitle: "Come Funziona",
    steps: [
      { step: "01", title: "Candidatura", desc: "Compila il modulo di contatto indicando la tua zona di interesse e la tua esperienza nel settore serramenti." },
      { step: "02", title: "Valutazione", desc: "Il nostro team commerciale valuta la tua candidatura e ti contatta per un colloquio conoscitivo e una visita in azienda." },
      { step: "03", title: "Partnership Attiva", desc: "Firmi l'accordo, ricevi il campionario e inizi subito a vendere con il supporto completo di ThermoDMR." },
    ],
    ctaTitle: "Pronto a Crescere con Noi?",
    ctaDesc: "Compila il modulo di contatto e il nostro team commerciale ti ricontatterà entro 24 ore per discutere della tua candidatura.",
    ctaPerks: ["Prezzi di fabbrica", "Zona esclusiva", "Supporto marketing", "Formazione tecnica", "Piattaforma online dedicata"],
  },
};

// ===========================================================================
// ROMANIAN
// ===========================================================================
const ro: Translations = {
  lang: "ro",

  nav: {
    chiSiamo: "Despre Noi",
    prodotti: "Produse",
    vantaggi: "Avantaje",
    garanzie: "Garanții",
    diventaRivenditore: "Devino Distribuitor",
    contatti: "Contact",
    areaRiservata: "Zonă Rezervată",
    accedi: "Autentificare",
    richiediPreventivo: "Solicită Ofertă",
    productLinks: [
      { label: "Ferestre PVC", to: "/ro/produse" },
      { label: "DMR Confort", to: "/ro/produse/dmr-confort" },
      { label: "DMR Domus", to: "/ro/produse/dmr-domus" },
      { label: "DMR Passive", to: "/ro/produse/dmr-passive" },
      { label: "Uși de intrare", to: "/ro/produse/usi-intrare" },
      { label: "Casete rulou", to: "/ro/produse/casete-rulou" },
      { label: "Jaluzele rulante", to: "/ro/produse/jaluzele" },
      { label: "Obloane", to: "/ro/produse/obloane" },
    ],
    navLinks: [
      { label: "Despre Noi", to: "/ro/despre-noi" },
      { label: "Produse", to: "/ro/produse", hasDropdown: true },
      { label: "Avantaje", to: "/ro/avantaje" },
      { label: "Garanții", to: "/ro/garantii" },
      { label: "Devino Distribuitor", to: "/ro/devino-distribuitor" },
      { label: "Contact", to: "/ro/contact" },
    ],
  },

  footer: {
    tagline: "Producem tâmplărie de înaltă calitate cu profil german. Design, izolare și cel mai bun preț de pe piață.",
    prodotti: "Produse",
    finestrePvc: "Ferestre PVC",
    portoncini: "Uși de intrare",
    cassonetti: "Casete rulou",
    tapparelle: "Jaluzele rulante",
    persiane: "Obloane",
    contattiTitle: "Contact",
    linkUtili: "Linkuri Utile",
    areaRiservataRivenditori: "Zonă Rezervată Distribuitori",
    chiSiamo: "Despre Noi",
    contattaci: "Contactează-ne",
    diventaRivenditore: "Devino Distribuitor",
    allRights: "Toate drepturile rezervate.",
  },

  cta: {
    richiediPreventivo: "Solicită Ofertă",
    scopriDiPiu: "Descoperă mai mult",
    scopriIProdotti: "Descoperă Produsele",
    scopriIVantaggi: "Descoperă Avantajele",
    scopriLaNostraStoria: "Descoperă Povestea Noastră",
    diventaRivenditore: "Devino Distribuitor",
    candidatiOra: "Aplică Acum",
    scopriCome: "Descoperă Cum",
    inviaRichiesta: "Trimite Cererea",
    inviando: "Se trimite...",
    trovaDealerBtn: "Găsește Distribuitor",
    richiediContratto: "Solicită Contractul",
    garantitoContrattualmente: "Garantat contractual",
  },

  home: {
    heroTag: "ThermoDMR — Ferestre și Tâmplărie PVC",
    heroTitle: "Ferestre de Design la",
    heroTitleHighlight: "Cel Mai Bun Preț de pe Piață",
    heroDesc: "Profil german, izolare superioară, calitate certificată. Producem direct, fără intermediari, pentru cel mai bun raport calitate-preț.",
    trustBadges: ["Profil German", "Izolare Clasa A", "Garanție 15 Ani", "Design Exclusiv"],
    chiSiamoTag: "Despre Noi",
    chiSiamoTitle: "Producem Tâmplărie de Design cu Tehnologie și Calitate Germană",
    chiSiamoDesc1: "De peste 10 ani proiectăm și fabricăm tâmplărie în propria fabrică, îmbinând design contemporan cu tehnologie avansată. Fiecare fereastră se naște din profile germane de primă calitate și procese industriale certificate.",
    chiSiamoDesc2: "Producția internă ne permite să garantăm calitate constantă, termene rapide și un preț de fabrică fără intermediari. Alegem materiale sustenabile și soluții cu izolare ridicată pentru confortul casei tale și respectul față de mediu.",
    statsSection: [
      { value: "50.000+", label: "Ferestre Instalate" },
      { value: "10+", label: "Ani de Experiență" },
      { value: "2-6 săpt.", label: "Termene de Livrare" },
      { value: "98%", label: "Clienți Mulțumiți" },
    ],
    statsNote: "* în funcție de culori și model",
    prodottiTitle: "Produsele Noastre",
    finestrepvcLabel: "Ferestre PVC",
    complementiLabel: "Accesorii și Completări",
    percheThermoTag: "De Ce Să Ne Alegi",
    percheThermoTitle: "De Ce Să Alegi ThermoDMR",
    percheThermoDesc: "Calitate certificată, design exclusiv și cel mai bun preț de pe piață. Totul se naște în fabrica noastră, de la proiectare până la livrare.",
    benefits: [
      { title: "Izolare Superioară", desc: "Clasa A de izolare termică și acustică. Tâmplăria noastră garantează economii de energie de până la 40%, pentru o casă mai caldă iarna și mai răcoroasă vara." },
      { title: "Profil German, Design Exclusiv", desc: "Profile PVC de producție germană, linii curate și finisaje îngrijite în cel mai mic detaliu. O gamă largă de culori și stiluri pentru a valoriza estetica casei tale." },
      { title: "Cel Mai Bun Raport Calitate/Preț", desc: "Producție directă în fabrica noastră, fără intermediari. Îți oferim prețul de fabrică cu calitatea unui profil german certificat." },
      { title: "Garanție și Service", desc: "Până la 15 ani garanție pentru toate produsele noastre. Service post-vânzare dedicat și o echipă tehnică mereu la dispoziția ta." },
    ],
    qualitaTag: "Calitate și Certificări",
    qualitaTitle: "Calitate care Rezistă în Timp",
    qualitaItems: [
      { title: "Calitate Certificată", desc: "Toată tâmplăria noastră este certificată conform normelor europene. Materiale de primă calitate și control riguros al calității pentru fiecare produs." },
      { title: "Sustenabilitate Ecologică", desc: "Profile PVC reciclabile, geamuri low-emissive și procese de producție cu impact redus asupra mediului. Alege confortul fără să renunți la planetă." },
      { title: "Garanție de Până la 15 Ani", desc: "Produsele noastre sunt construite să dureze. Oferim garanție extinsă de până la 15 ani pentru profile, geamuri și feronerie." },
      { title: "Service Post-Vânzare", desc: "O echipă dedicată te însoțește și după cumpărare. Suport tehnic, întreținere și piese de schimb mereu disponibile pentru maximă liniște sufletească." },
    ],
    trovaDealerTitle: "Găsește Cel Mai Apropiat Distribuitor ThermoDMR",
    trovaDealerDesc: "O rețea de profesioniști calificați pe întreg teritoriul, gata să îți recomande cea mai bună soluție pentru casa ta.",
    trovaDealerCards: ["Consultanță Gratuită", "Vizită Dedicată", "Ofertă în 24h"],
    becomeTag: "Parteneriat",
    becomeTitle: "Vrei să Devii Distribuitor ThermoDMR?",
    becomeDesc: "Intră în rețeaua noastră de distribuitori și accesează avantaje exclusive pentru a-ți dezvolta afacerea.",
    becomePerks: ["Prețuri de fabrică", "Zonă exclusivă", "Suport marketing", "Livrare în 2-6 săptămâni"],
    contattiTag: "Contactează-ne",
    contattiTitle: "Contactează-ne",
    contattiDesc: "Completează formularul pentru a solicita o ofertă sau pentru informații despre rețeaua noastră de distribuitori.",
    formNome: "Nume",
    formChiSei: "Cine ești?",
    formEmail: "Email",
    formTelefono: "Telefon",
    formAzienda: "Companie (opțional)",
    formMessaggio: "Mesaj",
    formChiSeiOptions: ["Persoană fizică", "Distribuitor", "Constructor", "Arhitect"],
  },

  chiSiamo: {
    heroTag: "Despre Noi",
    heroTitle: "Producem Tâmplărie de Calitate pentru",
    heroTitleHighlight: "a-ți Dezvolta Afacerea",
    heroDesc: "De peste 10 ani producem tâmplărie în propria fabrică, fără intermediari. Aceasta ne permite să îți oferim prețul cel mai competitiv de pe piață, termene de livrare de 2 până la 6 săptămâni și un control riguros al calității pentru fiecare produs.",
    storiaTitle: "Povestea Noastră",
    storiaP1: "ThermoDMR s-a născut din pasiunea pentru tâmplărie și din dorința de a oferi distribuitorilor un partener de încredere. Am investit în tehnologie și procese de producție pentru a elimina orice intermediar și a garanta prețuri competitive fără compromisuri la calitate.",
    storiaP2: "Fabrica noastră este dotată cu utilaje de ultimă generație care ne permit să lucrăm PVC, aluminiu și lemn cu precizie milimetrică. Fiecare fereastră, ușă sau oblon este asamblat și testat intern înainte de expediție.",
    storiaP3: "Astăzi colaborăm cu peste 200 de distribuitori în toată Italia, uniți de un obiectiv comun: să oferim clientului final cel mai bun produs la cel mai bun preț.",
    valoriTag: "Valorile Noastre",
    valoriTitle: "Ce Ne Ghidează Zi de Zi",
    values: [
      { title: "Producție Proprie", desc: "Fără intermediari. Controlăm fiecare etapă a producției pentru a-ți garanta cel mai bun raport calitate-preț." },
      { title: "Partener, Nu Furnizor", desc: "Obiectivul nostru nu este să îți vindem un produs, ci să te ajutăm să câștigi. Creștem împreună cu distribuitorii noștri." },
      { title: "Calitate Certificată", desc: "Fiecare produs trece prin controale riguroase de calitate înainte de expediere. Standarde europene și certificări complete." },
      { title: "Suport Constant", desc: "Un reprezentant dedicat, formare tehnică și materiale de marketing personalizate. Mereu alături de tine." },
    ],
    stats: [
      { value: "200+", label: "Distribuitori Activi" },
      { value: "10+", label: "Ani de Experiență" },
      { value: "2-6 săpt.", label: "Termene de Livrare" },
      { value: "98%", label: "Livrări Punctuale" },
    ],
    trovaDealerTitle: "Găsește Cel Mai Apropiat Distribuitor",
    trovaDealerDesc: "Caută punctul de vânzare autorizat ThermoDMR din zona ta pentru a vedea pe viu calitatea tâmplăriei noastre și a primi o consultanță personalizată.",
    becomeTitle: "Vrei să Devii Distribuitor ThermoDMR?",
    becomeDesc: "Prețuri de fabrică, zonă exclusivă și suport complet: intră în rețeaua noastră și dezvoltă-ți afacerea cu produse de calitate superioară.",
    becomePerks: ["Prețuri de fabrică", "Zonă exclusivă", "Suport marketing", "Formare tehnică", "Platformă online dedicată"],
  },

  prodottiPubblico: {
    heroTag: "Produsele Noastre",
    heroTitle: "Tâmplărie PVC de",
    heroTitleHighlight: "Calitate Superioară",
    heroDesc: "Ferestre, uși de intrare, casete rulou, jaluzele și obloane: o gamă completă pentru a maximiza marjele tale și satisfacția clienților tăi.",
    breadcrumbHome: "Acasă",
    breadcrumbProdotti: "Produse",
    counters: [
      { value: "7", label: "Linii de Produs" },
      { value: "3", label: "Modele Ferestre" },
      { value: "100+", label: "Culori Disponibile" },
      { value: "2-6", label: "Săptămâni Livrare" },
    ],
    gammaTag: "Gama de Ferestre",
    gammaTitle: "Trei Modele pentru Fiecare Nevoie",
    gammaDesc: "De la proiectul de bază la renovarea premium: alege profilul cel mai potrivit pentru piața ta.",
    pvcModels: [
      { name: "DMR CONFORT", badge: "Cel Mai Bun Preț", desc: "Soluția ideală pentru cei care caută calitate și accesibilitate. Profil cu 3 camere cu performanțe termice excelente.", features: ["Profil cu 3 camere", "Clasa B", "Geam termopan standard", "Gamă largă de culori"] },
      { name: "DMR DOMUS", badge: "Cel Mai Vândut", desc: "Best-seller-ul gamei. Profil cu 5 camere pentru o izolare superioară și confort maxim.", features: ["Profil cu 5 camere", "Clasa A", "Geam termopan cu gaz argon", "Feronerie Roto"] },
      { name: "DMR PASSIVE", badge: "Top de Gamă", desc: "Top-ul gamei pentru proiecte de înaltă clasă. Profil cu 7 camere cu performanțe certificate Passivhaus.", features: ["Profil cu 7 camere", "Clasa A+", "Triplu geam low-emissive", "Design minimalist"] },
    ],
    complementiTag: "Completări",
    complementiTitle: "Accesorii și Închideri",
    complementiDesc: "Uși de intrare, casete rulou, jaluzele și obloane pentru a completa oferta pentru clienții tăi.",
    otherProducts: [
      { title: "Uși de Intrare PVC", desc: "Uși de intrare PVC cu securitate ridicată și izolare termică. Finisaje personalizabile pentru a se adapta oricărui stil arhitectural.", features: ["Panouri decorative personalizabile", "Încuietoare de securitate multipunct", "Izolare termică și acustică", "Prag coborât disponibil", "Rezistență la agenți atmosferici"] },
      { title: "Casete Rulou", desc: "Casete rulou termoizolate, proiectate pentru a elimina punțile termice și a garanta izolarea maximă în zona ruloului.", features: ["Termoizolație din EPS de înaltă densitate", "Eliminarea punților termice", "Inspecție frontală facilitată", "Compatibile cu jaluzele motorizate", "Dimensiuni la comandă"] },
      { title: "Jaluzele Rulante", desc: "Jaluzele rulante din PVC și aluminiu termoizolat, disponibile cu motorizare electrică și pregătire pentru domotică.", features: ["PVC sau aluminiu termoizolat", "Motorizare electrică", "Pregătire domotică", "Sistem anti-ridicare de securitate", "Culori coordonate cu tâmplăria"] },
      { title: "Obloane", desc: "Obloane din aluminiu cu lamele orientabile pentru un control optim al luminii și ventilației. Design elegant și zero întreținere.", features: ["Aluminiu vopsit în câmp electrostatic", "Lamele orientabile", "Balamale ascunse", "Gamă largă RAL", "Întreținere zero"] },
    ],
    ctaTitle: "Devino Distribuitor ThermoDMR",
    ctaDesc: "Intră în rețeaua de distribuitori ThermoDMR și oferă clienților tăi tâmplărie de calitate superioară cu marje competitive și suport dedicat.",
    badgeLabels: { confort: "Cel Mai Bun Preț", domus: "Cel Mai Vândut", passive: "Top de Gamă" },
  },

  vantaggi: {
    heroTag: "Avantajele Tale Competitive",
    heroTitle: "De Ce Să Alegi ThermoDMR",
    heroDesc: "Obosit de furnizori care nu respectă termenele, cu prețuri tot mai mari și zero suport? Cu ThermoDMR ai un partener care lucrează pentru a te ajuta să câștigi.",
    mainAdvantages: [
      { metric: "-30%", metricLabel: "față de concurență", title: "Cel Mai Mic Preț de pe Piață", desc: "Producem intern, fără intermediari. Aceasta înseamnă prețuri imbatabile și marje mai mari la fiecare vânzare. Nu vei găsi un producător mai competitiv cu aceeași calitate." },
      { metric: "2-6 săpt.", metricLabel: "garantate", title: "Termene Certe de Livrare", desc: "De la 2 la 6 săptămâni de la confirmarea comenzii, garantate contractual. Niciodată mai mulți clienți care așteaptă luni, niciodată mai multe scuze de dat." },
      { metric: "100%", metricLabel: "dedicat", title: "Succesul Tău este al Nostru", desc: "Suport comercial, materiale de marketing personalizate, formare tehnică și un reprezentant dedicat mereu disponibil pentru a-ți dezvolta afacerea." },
    ],
    extraTitle: "Și Nu Este Tot...",
    extraAdvantages: [
      { title: "Marje Garantate", desc: "Listă de prețuri rezervată și zonă exclusivă. Nicio concurență internă între distribuitorii ThermoDMR." },
      { title: "Rețea Selectată", desc: "Îi selectăm pe partenerii noștri. Mai puțini distribuitori, mai multă atenție și suport dedicat fiecăruia." },
      { title: "Calitate Certificată", desc: "Toate produsele conforme cu normele europene cu certificări complete incluse." },
      { title: "Service Post-Vânzare Garantat", desc: "Asistență tehnică rapidă și piese de schimb mereu disponibile. Clientul tău este mereu îngrijit." },
    ],
    ctaTitle: "Începe să Câștigi Mai Mult Astăzi!",
    ctaDesc: "Intră în rețeaua ThermoDMR și descoperă ce înseamnă să ai un partener producător serios.",
  },

  garanzie: {
    heroTag: "Garanțiile Noastre",
    heroTitle: "Garanții",
    heroTitleHighlight: "Contractuale",
    heroDesc: "Nu promitem, garantăm. Fiecare angajament este scris negru pe alb în contractul de parteneriat.",
    guarantees: [
      { title: "Zero Reclamații, Zero Probleme", desc: "Calitate certificată și control riguros pentru fiecare produs. Mai puține returnări, mai multă reputație pentru afacerea ta.", details: ["Control de calitate pentru fiecare piesă", "Certificări europene complete", "Teste de etanșeitate la aer, apă și vânt", "Garanție de 10 ani pentru toate produsele"] },
      { title: "Livrare Garantată la Timp", desc: "Niciodată mai mulți clienți care așteaptă. De la 2 la 6 săptămâni de la confirmarea comenzii, garantate contractual.", details: ["De la 2 la 6 săptămâni garantate contractual", "Tracking comandă în timp real", "Penalizare automată în caz de întârziere", "Livrare cu mijloc dedicat și descărcare inclusă"] },
      { title: "Marje Protejate", desc: "Listă de prețuri rezervată și zonă exclusivă. Nicio concurență internă între distribuitorii ThermoDMR din zona ta.", details: ["Zonă de exclusivitate teritorială", "Listă de prețuri rezervată și protejată", "Nicio vânzare directă către public", "Politică anti-dumping între distribuitori"] },
      { title: "Suport Comercial Dedicat", desc: "Un reprezentant mereu disponibil, materiale de marketing personalizate și formare tehnică continuă.", details: ["Reprezentant comercial dedicat", "Materiale de marketing personalizate", "Formare tehnică și comercială", "Asistență post-vânzare prioritară"] },
    ],
    ctaTitle: "Vrei să Citești Contractul Complet?",
    ctaDesc: "Contactează-ne și îți vom trimite contractul de parteneriat fără niciun angajament.",
  },

  contatti: {
    heroTag: "Contactează-ne",
    heroTitle: "Devino",
    heroTitleHighlight: "Distribuitor",
    heroDesc: "Completează formularul și un reprezentant comercial te va contacta în 24 de ore.",
    labelNome: "Nume *",
    labelAzienda: "Companie",
    labelEmail: "Email *",
    labelTelefono: "Telefon",
    labelMessaggio: "Mesaj *",
    placeholderNome: "Ion Popescu",
    placeholderAzienda: "Firma Ta SRL",
    placeholderEmail: "office@firmatā.ro",
    placeholderTelefono: "+40 7xx xxx xxx",
    placeholderMessaggio: "Descrie activitatea ta și ce cauți la un furnizor...",
    infoTitle: "Informații de Contact",
    telefono: "+39 000 000 0000",
    telefonoLabel: "Telefon",
    emailLabel: "Email",
    indirizzoLabel: "Adresă",
    indirizzoVal: "Via dell'Industria, 00\n00000 Città (PR)",
    orariLabel: "Program",
    orariVal: "Lun-Vin: 8:30 - 17:30",
    responseNote: "Răspuns garantat în 24 de ore. Un reprezentant comercial te va contacta pentru a stabili o întâlnire și a-ți prezenta programul de distribuitori.",
    toastSuccess: "Cerere trimisă!",
    toastSuccessDesc: "Te vom contacta cât mai curând posibil.",
    toastError: "Eroare",
    toastErrorDesc: "Cererea nu a putut fi trimisă. Încearcă din nou.",
    toastValidation: "Completează câmpurile obligatorii",
    toastValidationDesc: "Numele, email-ul și mesajul sunt obligatorii.",
  },

  diventaRivenditore: {
    heroTag: "Parteneriat",
    heroTitle: "Devino Distribuitor ThermoDMR",
    heroDesc: "Intră în rețeaua noastră de distribuitori și oferă clienților tăi tâmplărie de calitate superioară cu profil german, marje competitive și suport dedicat.",
    vantaggiTag: "Avantajele Parteneriatului",
    vantaggiTitle: "De Ce Să Alegi ThermoDMR",
    vantaggiDesc: "Un partener care te susține 360°: de la formare la livrare, de la marketing la service post-vânzare.",
    benefits: [
      { title: "Prețuri de Fabrică", desc: "Achiziționezi direct de la producător, fără intermediari. Marje mai mari pentru afacerea ta." },
      { title: "Zonă Exclusivă", desc: "Îți garantăm o zonă de competență exclusivă pentru a-ți proteja investiția și clientela." },
      { title: "Suport Marketing", desc: "Materiale promoționale, mostre, suport grafic și co-marketing pentru a-ți crește vizibilitatea." },
      { title: "Livrare Rapidă", desc: "Termene de producție și livrare reduse: de la 2 la 6 săptămâni în funcție de produs și finisaj." },
      { title: "Plăți Flexibile", desc: "Condiții de plată personalizate și flexibile, concepute pentru a susține creșterea afacerii tale." },
      { title: "Formare Tehnică", desc: "Cursuri de formare tehnică și comercială pentru tine și echipa ta. Actualizare continuă despre produsele noastre." },
      { title: "Platformă Online Dedicată", desc: "Accesează platforma noastră rezervată pentru a monitoriza starea comenzilor, a verifica plățile și a gestiona ofertele în timp real." },
    ],
    stepsTag: "Parcursul",
    stepsTitle: "Cum Funcționează",
    steps: [
      { step: "01", title: "Aplicație", desc: "Completează formularul de contact indicând zona ta de interes și experiența ta în domeniul tâmplăriei." },
      { step: "02", title: "Evaluare", desc: "Echipa noastră comercială evaluează aplicația ta și te contactează pentru un interviu și o vizită la fabrică." },
      { step: "03", title: "Parteneriat Activ", desc: "Semnezi acordul, primești mostrele și începi să vinzi imediat cu suportul complet ThermoDMR." },
    ],
    ctaTitle: "Pregătit să Crești cu Noi?",
    ctaDesc: "Completează formularul de contact și echipa noastră comercială te va contacta în 24 de ore pentru a discuta aplicația ta.",
    ctaPerks: ["Prețuri de fabrică", "Zonă exclusivă", "Suport marketing", "Formare tehnică", "Platformă online dedicată"],
  },
};

export const translations: Record<Lang, Translations> = { it, ro };
