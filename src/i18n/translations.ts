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

  // ---- Products detail pages ----
  products: {
    // Shared UI labels
    caratteristichePrincipali: string;
    specificheTecniche: string;
    vantaggiChiave: string;
    dettagliTecnici: string;
    vantaggiFinestra: string;
    coloriDisponibili: string;
    coloriDisponibiliDesc: string;
    ctaContactDesc: string;
    galleria: string;
    colorNames: string[];

    tapparelle: {
      category: string;
      title: string;
      titleAccent: string;
      description: string;
      features: string[];
      specs: { label: string; value: string }[];
      benefits: { title: string; desc: string }[];
      ctaTitle: string;
      galleryCaptions: string[];
    };
    portoncini: {
      category: string;
      title: string;
      titleAccent: string;
      description: string;
      features: string[];
      specs: { label: string; value: string }[];
      benefits: { title: string; desc: string }[];
      ctaTitle: string;
      galleryCaptions: string[];
    };
    cassonetti: {
      category: string;
      title: string;
      titleAccent: string;
      description: string;
      features: string[];
      specs: { label: string; value: string }[];
      benefits: { title: string; desc: string }[];
      ctaTitle: string;
      galleryCaptions: string[];
    };
    persiane: {
      category: string;
      title: string;
      titleAccent: string;
      description: string;
      features: string[];
      specs: { label: string; value: string }[];
      benefits: { title: string; desc: string }[];
      ctaTitle: string;
      galleryCaptions: string[];
    };
    dmrConfort: {
      category: string;
      description: string;
      features: string[];
      mainTitle: string;
      mainDesc: string;
      specs: { label: string; value: string }[];
      windowAdvantages: { title: string; desc: string }[];
      coloriDesc: string;
      benefits: { title: string; desc: string }[];
      ctaTitle: string;
      galleryCaptions: string[];
    };
    dmrDomus: {
      category: string;
      description: string;
      features: string[];
      mainTitle: string;
      mainDesc: string;
      specs: { label: string; value: string }[];
      windowAdvantages: { title: string; desc: string }[];
      coloriDesc: string;
      benefits: { title: string; desc: string }[];
      ctaTitle: string;
      galleryCaptions: string[];
    };
    dmrPassive: {
      category: string;
      description: string;
      features: string[];
      mainTitle: string;
      mainDesc: string;
      specs: { label: string; value: string }[];
      windowAdvantages: { title: string; desc: string }[];
      coloriDesc: string;
      benefits: { title: string; desc: string }[];
      ctaTitle: string;
      galleryCaptions: string[];
    };
  };
  area: {
    nav: {
      dashboard: string;
      ordini: string;
      preventivi: string;
      rivenditori: string;
      pagamenti: string;
      assistenza: string;
      kpi: string;
      impostazioni: string;
      esci: string;
    };
    roles: {
      superAdmin: string;
      commerciale: string;
      rivenditore: string;
      utente: string;
    };
    common: {
      caricamento: string;
      erroreCaricamento: string;
      impossibileCaricareConnessione: string;
      riprova: string;
      annulla: string;
      elimina: string;
      esportaCsv: string;
      indietro: string;
      dettagli: string;
      selezionati: string;
      tutto: string;
      tre_mesi: string;
      sei_mesi: string;
      nessuDatoDisponibile: string;
      nessuRisultatoTrovato: string;
      nuovo: string;
      aggiornaStato: string;
      azzeraFiltri: string;
      tutti: string;
      esporta: string;
      salva: string;
      conferma: string;
      live: string;
    };
    auth: {
      accedi: string;
      registrati: string;
      accedendo: string;
      registrando: string;
      nomeCompleto: string;
      confermaPassword: string;
      emailNonValida: string;
      passwordMinimo6: string;
      passwordMinimo8: string;
      passwordMaiuscola: string;
      passwordNumero: string;
      passwordSpeciale: string;
      nomeMinimo2: string;
      passwordNonCoincidono: string;
      emailPasswordNonCorretti: string;
      troppiTentativi: string;
      emailGiaRegistrata: string;
      registrazioneCompletata: string;
      accettaTermini: string;
      placeholder_email: string;
      placeholder_nome: string;
      placeholder_password: string;
    };
    dashboard: {
      titolo: string;
      descRivenditori: string;
      descGenerale: string;
      ricaviTotali: string;
      accontiTotali: string;
      totaleIncassato: string;
      daSaldare: string;
      ordiniTotali_subtitle: string;
      daOrdini: string;
      pagamentiRicevuti: string;
      percentualeTotale: string;
      top5Rivenditori: string;
      top5Desc: string;
      ordini: string;
      erroreImpossibile: string;
    };
    dealerDashboard: {
      benvenuto: string;
      desc: string;
      descAdmin: string;
      ordiniTotali: string;
      tuttiGliOrdini: string;
      valoreTotale: string;
      importoComplessivo: string;
      pagato: string;
      pagamentiEffettuati: string;
      daPagare: string;
      importoRimanente: string;
      progressoPagamento: string;
      distribuzionePerStato: string;
      distribuzioneDesc: string;
      attivitaRecente: string;
      nuove: string;
      attivitaDesc: string;
      nessunNotifica: string;
      promemoriaPagementi: string;
      promemoriaDesc: string;
      ordine: string;
      totale: string;
      rimanente: string;
      progressoLabel: string;
      tuttoInRegola: string;
      nessunPagamentoSospeso: string;
      linkRapidi: string;
      visualizzaOrdini: string;
      tuttiOrdini: string;
      storicoPagementi: string;
      consultaPagementi: string;
      apriTicket: string;
    };
    ordini: {
      titolo: string;
      desc: string;
      nuovoPreventivo: string;
      tuttiRivenditori: string;
      lista: string;
      pipeline: string;
      ordiniTotali: string;
      valoreTotale: string;
      daIncassare: string;
      ordiniConSaldo: string;
      nessunOrdineFilti: string;
      nessunOrdineTrovato: string;
      creaOrdineSuggerimento: string;
      creaOrdine: string;
      listaOrdini: string;
      aggiornaStato: string;
      caricamento: string;
      errore: string;
    };
    orderDetail: {
      preventivoDuplicato: string;
      erroreDuplicazione: string;
      preventivoConvertito: string;
      erroreConversione: string;
      preventivo: string;
      ordine: string;
      tornaPreventivi: string;
      tornaOrdini: string;
      prodottiQuotati: string;
      righeOrdine: string;
      conversione: string;
      confermaConversione: string;
    };
    dealers: {
      titolo: string;
      desc: string;
      rivenditore: string;
      rivenditori: string;
      nessunRivenditore: string;
      nessunRivenditoreHint: string;
      nuovoRivenditore: string;
      caricamento: string;
    };
    dealerDetail: {
      tornaRivenditori: string;
      piva: string;
      entraArea: string;
      ordiniTotali: string;
      fatturatoTotale: string;
      ticketMedio: string;
      daIncassare: string;
      informazioni: string;
      panoramica: string;
      datiAnagrafici: string;
      ragioneSociale: string;
      codiceFiscale: string;
      email: string;
      telefono: string;
      indirizzo: string;
      note: string;
      riepilogoFinanziario: string;
      incassato: string;
      percentualeIncassata: string;
      storicoOrdini: string;
      idOrdine: string;
      data: string;
      stato: string;
      importo: string;
      pagato: string;
      daPagare: string;
      vediTuttiOrdini: string;
      nessunOrdine: string;
      nonTrovato: string;
      erroreCaricamento: string;
      indietro: string;
    };
    preventivi: {
      titolo_super: string;
      desc_super: string;
      titolo_dealer: string;
      desc_dealer: string;
      cerca: string;
      tuttiRivenditori: string;
      tutti: string;
      idPreventivo: string;
      rivenditore: string;
      dataCreazione: string;
      importoTotale: string;
      scadenza: string;
      stato: string;
      nessunoCreato: string;
      nessunoCreatoDealer: string;
      confermaConversione: string;
      conversione: string;
      confermaConversioneBtn: string;
      elimina: string;
      convertito: string;
      erroreConversione: string;
      valido: string;
      nonValido: string;
      nuovoPreventivo: string;
      totaleKpi: string;
      valoreKpi: string;
      validiKpi: string;
      nonValidiKpi: string;
      da: string;
      a: string;
      azioni: string;
      nessunRisultato: string;
      provaModificareFiltri: string;
      impostaValido: string;
      impostaNonValido: string;
      converti: string;
      convertiInOrdine: string;
      duplica: string;
      aggiornato: string;
      aggiornatoPlur: string;
      erroreAggiornamentoStato: string;
      preventiviConvertiti: string;
      nonConvertitiPerErrore: string;
      erroreNessunoConvertito: string;
      eliminato: string;
      eliminati: string;
      erroreEliminazione: string;
      erroreCaricamentoDuplicazione: string;
      convertiTitolo: string;
      convertiDesc: string;
      conversioneLoading: string;
      convertiBulkTitolo: string;
      convertiBulkDesc: string;
      eliminaBulkTitolo: string;
      eliminaBulkDesc: string;
    };
    pagamenti: {
      titolo: string;
      nuovoPagamento: string;
      totaleIncassato: string;
      pagamenti: string;
      mediaImporto: string;
      perPagemento: string;
      numPagementi: string;
      totaliPeriodo: string;
      metodoUsato: string;
      piuPopolare: string;
      tabella: string;
      timeline: string;
      esporta: string;
      data: string;
      dealer: string;
      tipo: string;
      metodo: string;
      importo: string;
      riferimento: string;
      nessunoTrovato: string;
      confermaEliminazione: string;
      confermaEliminazioneDesc: string;
      caricamento: string;
    };
    paymentDetail: {
      titolo: string;
      registratoIl: string;
      dettagliPagemento: string;
      tipoPagemento: string;
      importo: string;
      dataPagemento: string;
      metodo: string;
      riferimento: string;
      idPagemento: string;
      ricevuta: string;
      visualizza: string;
      scarica: string;
      ordine: string;
      statoOrdine: string;
      importoTotale: string;
      importoPagato: string;
      daPagare: string;
      progressoPagemento: string;
      visualizzaOrdine: string;
      nonTrovato: string;
      erroreCaricamento: string;
    };
    analytics: {
      titolo: string;
      desc: string;
      ultimi3: string;
      ultimi6: string;
      ultimoAnno: string;
      periodo: string;
      tuttiDealer: string;
      resetFiltri: string;
      ordiniTotali: string;
      ricaviTotali: string;
      pagamentiIncassati: string;
      ticketMedio: string;
      exportCompletato: string;
      exportDesc: string;
      metrica: string;
      valore: string;
      tassoConversione: string;
      errore: string;
    };
    assistenza: {
      titolo: string;
      desc: string;
      aperti: string;
      inGestione: string;
      chiusi: string;
      urgenti: string;
      cercaOggetto: string;
      tuttiStati: string;
      tuttePriorita: string;
      azzeraFiltri: string;
      oggetto: string;
      ordine: string;
      rivenditore: string;
      priorita: string;
      stato: string;
      data: string;
      nessunoTrovato: string;
      primiCento: string;
    };
    dealerAssistenza: {
      titolo: string;
      aperti: string;
      desc: string;
      tuttiStati: string;
      azzeraFiltri: string;
      oggetto: string;
      ordine: string;
      priorita: string;
      stato: string;
      data: string;
      nessunoTrovato: string;
    };
    impostazioni: {
      titolo: string;
      desc: string;
      utentiRuoli: string;
      utenti: string;
      numerazione: string;
      num: string;
      templatePdf: string;
      pdf: string;
      integrazioni: string;
      integ: string;
      auditLog: string;
      audit: string;
    };
    dealerAreaLayout: {
      vistaRivenditore: string;
      staiVisualizzando: string;
      esciArea: string;
    };
    smartDashboard: {
      accessoNegato: string;
      noPermessi: string;
    };
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

  products: {
    caratteristichePrincipali: "Caratteristiche Principali",
    specificheTecniche: "Specifiche Tecniche",
    vantaggiChiave: "Vantaggi Chiave",
    dettagliTecnici: "Dettagli Tecnici",
    vantaggiFinestra: "Vantaggi della Finestra",
    coloriDisponibili: "Colori Disponibili",
    coloriDisponibiliDesc: "Scegli tra un'ampia gamma di colori e finiture legno per personalizzare le tue finestre e armonizzarle con lo stile della tua abitazione.",
    ctaContactDesc: "Contattaci per un preventivo personalizzato e scopri le condizioni riservate ai rivenditori.",
    galleria: "Galleria",
    colorNames: ["Bianco", "Rovere Dorato", "Noce", "Antracite", "Grigio Chiaro", "Verde Scuro", "Bianco Crema", "Jet Black"],

    tapparelle: {
      category: "I Nostri Prodotti",
      title: "",
      titleAccent: "Tapparelle",
      description: "Tapparelle avvolgibili in alluminio: leggerezza, resistenza e isolamento termico superiore. Protezione contro intrusioni, risparmio energetico. Disponibili coibentate, estruse e motorizzate.",
      features: [
        "Alluminio leggero e resistente, non teme intemperie né usura",
        "Isolamento termico superiore: calore in inverno, fresco in estate",
        "Barriera efficace contro tentativi di intrusione",
        "Disponibili in versione coibentata con schiuma poliuretanica",
        "Motorizzazione elettrica con motore tubolare integrato nel rullo",
        "Predisposizione per domotica e Smart Home",
        "Abbattimento acustico dei rumori esterni",
        "Alluminio riciclabile al 100%, scelta sostenibile",
        "Disponibili senza cassonetto (sistema monoblocco)",
      ],
      specs: [
        { label: "Materiale", value: "Alluminio" },
        { label: "Coibentazione", value: "Schiuma poliuretanica" },
        { label: "Motorizzazione", value: "Motore tubolare" },
        { label: "Domotica", value: "Smart Home ready" },
        { label: "Sostenibilità", value: "100% riciclabile" },
        { label: "Versioni", value: "Coibentate / Estruse" },
      ],
      benefits: [
        { title: "Risparmio Energetico", desc: "L'alluminio coibentato con schiuma poliuretanica trattiene il calore in inverno e respinge il caldo estivo, riducendo i costi in bolletta." },
        { title: "Sicurezza Anti-intrusione", desc: "La robustezza dell'alluminio, unita alla struttura coibentata, crea una protezione ulteriore contro tentativi di intrusione." },
        { title: "Motorizzazione Smart", desc: "Motore tubolare nascosto nel rullo, gestione da remoto tramite domotica. Consumo inferiore a un piccolo elettrodomestico." },
      ],
      ctaTitle: "Interessato alle Tapparelle?",
      galleryCaptions: [
        "Tapparella in alluminio coibentato ad alta resistenza",
        "Lamelle in alluminio coibentato ad alta resistenza",
        "Integrazione estetica con facciate contemporanee",
      ],
    },

    portoncini: {
      category: "I Nostri Prodotti",
      title: "Portoncini in",
      titleAccent: "PVC",
      description: "Portoncini d'ingresso in PVC con profondità costruttiva 76-82-92 mm, 6 camere di isolamento e 3 guarnizioni. Uw fino a 0,72 W/m²K, acustica fino a 47 dB, sicurezza fino a RC3.",
      features: [
        "Profondità costruttiva disponibile in 76, 82 e 92 mm",
        "6 camere di isolamento per massima efficienza termica",
        "3 guarnizioni con guarnizione mediana per tenuta superiore",
        "Coefficiente termico Uw fino a 0,72 W/m²K",
        "Prestazioni acustiche fino a 47 dB (classe 5)",
        "Resistenza all'effrazione fino a classe RC3",
        "Serratura multipunto meccanico-automatica con bloccaggio automatico",
        "Soglia standard in alluminio 20 mm o soluzione senza soglia",
        "Pannelli ornamentali HPL, vetro termoisolante e applicazioni in acciaio inox",
        "Ampia gamma di colori e pellicole decorative",
      ],
      specs: [
        { label: "Profondità", value: "76 / 82 / 92 mm" },
        { label: "Camere", value: "6" },
        { label: "Uw", value: "fino a 0,72 W/m²K" },
        { label: "Acustica", value: "47 dB (classe 5)" },
        { label: "Sicurezza", value: "Fino a RC3" },
        { label: "Serratura", value: "Multipunto automatica" },
      ],
      benefits: [
        { title: "Massima Sicurezza", desc: "Serratura multipunto meccanico-automatica con 3 punti di chiusura a fuoriuscita automatica, resistenza fino a classe RC3." },
        { title: "Isolamento Perfetto", desc: "Uw fino a 0,72 W/m²K grazie a 6 camere di isolamento e 3 guarnizioni con guarnizione mediana." },
        { title: "Personalizzazione Totale", desc: "Pannelli ornamentali HPL, barre e maniglie in acciaio inox, sopraluce e luci laterali per ogni esigenza." },
      ],
      ctaTitle: "Interessato ai Portoncini in PVC?",
      galleryCaptions: [
        "Portoncino d'ingresso con pannello decorativo premium",
        "Ampia gamma di colori e finiture",
        "Eleganza e sicurezza per ogni ingresso",
      ],
    },

    cassonetti: {
      category: "I Nostri Prodotti",
      title: "Cassonetti",
      titleAccent: "Coibentati",
      description: "Il cassonetto è il contenitore che ospita l'avvolgibile, posizionato nella parte superiore della finestra. Ruolo fondamentale nell'isolamento termico e acustico: cassonetti non isolati causano dispersioni, ponti termici, condensa e muffa.",
      features: [
        "Contenitore per avvolgibile incassato nel muro o a vista",
        "Coibentazione per eliminare ponti termici e dispersioni",
        "Prevenzione di condensa e muffa nella zona cassonetto",
        "Ispezione frontale facilitata per manutenzione e sostituzione tapparella",
        "Compatibile con tapparelle motorizzate",
        "Dimensioni su misura per ogni vano murario",
        "Linee pulite ed essenziali, soluzioni a scomparsa disponibili",
        "Predisposizione per zanzariere",
      ],
      specs: [
        { label: "Materiale", value: "PVC / Alluminio / Composito" },
        { label: "Coibentazione", value: "EPS alta densità" },
        { label: "Ispezione", value: "Frontale" },
        { label: "Motorizzazione", value: "Predisposto" },
        { label: "Design", value: "A scomparsa disponibile" },
        { label: "Dimensioni", value: "Su misura" },
      ],
      benefits: [
        { title: "Zero Ponti Termici", desc: "Un cassonetto non isolato causa dispersioni termiche in inverno e surriscaldamento in estate. La coibentazione elimina completamente questo problema." },
        { title: "Prevenzione Condensa", desc: "Elimina la formazione di ponti termici con conseguente condensa e muffa, migliorando la salubrità dell'ambiente." },
        { title: "Manutenzione Facile", desc: "Accesso semplice per manutenzione e sostituzione della tapparella, senza interventi invasivi." },
      ],
      ctaTitle: "Interessato ai Cassonetti?",
      galleryCaptions: [
        "Cassonetto integrato nella muratura",
        "Coibentazione in EPS ad alta densità",
        "Ispezione frontale facilitata",
        "Finitura a filo muro per estetica pulita",
      ],
    },

    persiane: {
      category: "I Nostri Prodotti",
      title: "Persiane in",
      titleAccent: "Alluminio",
      description: "Persiane esterne in alluminio con lamelle fisse o orientabili. Sezione profili 56 mm telai e 46 mm anta. Verniciatura RAL a scelta o sublimazione effetto legno.",
      features: [
        "Sezione profili: 56 mm telai e 46 mm anta",
        "Lamelle fisse (83x25 mm planari o 40x25 mm simmetriche) o orientabili (72x12 mm, da 0° a 180°)",
        "Zoccolatura di base regolabile H 75-113 mm",
        "Guarnizione su telai e anta",
        "Telai tipo Z o L, oppure senza telai con anta a muro",
        "Verniciatura RAL a scelta o sublimazione effetto legno",
        "Tipologie: a battente, a libro, scorrevole interno o esterno muro",
        "Superfici piane, facili da pulire",
      ],
      specs: [
        { label: "Telai", value: "56 mm" },
        { label: "Anta", value: "46 mm" },
        { label: "Lamelle", value: "Fisse o orientabili" },
        { label: "Orientamento", value: "0 - 180 gradi" },
        { label: "Zoccolatura", value: "H 75-113 mm" },
        { label: "Finiture", value: "RAL / Effetto legno" },
      ],
      benefits: [
        { title: "Controllo Luce", desc: "Lamelle orientabili da 0° a 180° a comando manuale per regolare luminosità e ventilazione in modo preciso." },
        { title: "Versatilità", desc: "Realizzabili a battente, a libro o scorrevole, per integrarsi con ogni soluzione costruttiva in nuova costruzione o ristrutturazione." },
        { title: "Design e Finiture", desc: "Superfici piane facili da pulire, verniciatura RAL a scelta o sublimazione in tinta legno per un aspetto elegante e naturale." },
      ],
      ctaTitle: "Interessato alle Persiane?",
      galleryCaptions: [
        "Persiane in alluminio con finitura classica",
        "Lamelle in alluminio con sublimazione effetto legno",
        "Ampia scelta di colori dalla gamma RAL",
        "Eleganza senza tempo per ogni facciata",
      ],
    },

    dmrConfort: {
      category: "Finestre in PVC",
      description: "Finestre che combinano design moderno, profili sottili e prestazioni eccellenti. Progettate per fornire la massima luce naturale con elevati livelli di isolamento termico e acustico. Si adattano a progetti architettonici sia classici che moderni: la scelta per chi cerca forma leggera, efficienza energetica e prestazioni affidabili per anni.",
      features: [
        "Profili alti solo 113 mm per massimizzare la luce naturale negli ambienti",
        "Pacchetto vetro fino a 49 mm per eccellente isolamento termico",
        "5 camere nel telaio e nell'anta, 4 camere nel montante",
        "Protezione acustica fino a 46 dB per ambienti silenziosi anche in centro città",
        "Durevole e resistente agli agenti esterni per molti anni di utilizzo",
        "Sistema ecologico sviluppato pensando al riciclaggio",
        "Forma versatile per progetti architettonici sia moderni che classici",
        "Guarnizioni a doppia battuta per tenuta all'aria e all'acqua",
      ],
      mainTitle: "Caratteristiche Principali",
      mainDesc: "Il DMR CONFORT presenta profili alti solo 113 mm e un pacchetto vetro accuratamente selezionato per far entrare molta più luce naturale negli ambienti. Garantisce un efficace isolamento del calore con bollette più basse e temperature confortevoli tutto l'anno, oltre a una riduzione del rumore esterno fino a 46 dB. I profili sono realizzati per molti anni di utilizzo, resistenti agli agenti esterni e di facile manutenzione. Sistema sviluppato pensando al riciclaggio, con una forma versatile per progetti sia moderni che classici.",
      specs: [
        { label: "Profilo", value: "5 camere (telaio/anta)" },
        { label: "Classe", value: "B" },
        { label: "Profondità installazione", value: "72 mm" },
        { label: "Pacchetto vetri", value: "fino a 49 mm" },
        { label: "Uw (finestra)", value: "1.3 W/m²K" },
        { label: "Abbattimento acustico", value: "46 dB" },
      ],
      windowAdvantages: [
        { title: "Microventilazione", desc: "Funzione di montaggio che consente di ventilare l'ambiente senza aprire l'anta, garantendo un ricambio d'aria costante anche in assenza." },
        { title: "Maniglia di Sicurezza", desc: "Maniglia in alluminio con funzione di sicurezza, pulsante o chiave. Disponibile in diverse finiture per adattarsi a ogni stile." },
        { title: "Cerniere 3D Regolabili", desc: "Disponibile anche nella versione a scomparsa - Designo. Cerniere 3D regolabili su tre livelli con portata fino a 130 kg." },
        { title: "Canalina Calda", desc: "Disponibile in acciaio o in plastica - prodotto con tecnologia polimerica o composita, in un'ampia gamma di colori." },
        { title: "Blocco Rotazione Maniglia", desc: "Funzione che impedisce la rotazione incontrollata della maniglia in posizione di ribalta, responsabile del corretto posizionamento dell'anta in posizione di chiusura." },
        { title: "Braccio Oscillo-Battente", desc: "Apparecchio per una ventilazione confortevole con funzione aggiuntiva di microventilazione e inclinazione dell'anta regolabile in modalità inverno-estate." },
      ],
      coloriDesc: "Scegli tra un'ampia gamma di colori e finiture legno per personalizzare le tue finestre e armonizzarle con lo stile della tua abitazione.",
      benefits: [
        { title: "Isolamento Termico", desc: "Efficace isolamento del calore con bollette più basse e temperature confortevoli tutto l'anno grazie al profilo a 5 camere e al pacchetto vetro fino a 49 mm." },
        { title: "Comfort Acustico", desc: "Riduzione del rumore esterno fino a 46 dB per ambienti silenziosi e confortevoli, ideale per abitazioni in zone trafficate." },
        { title: "Sicurezza", desc: "Ferramenta anti-effrazione di serie con possibilità di upgrade a classe RC2. Protezione e tranquillità per la tua famiglia." },
      ],
      ctaTitle: "Interessato al DMR CONFORT?",
      galleryCaptions: [
        "Finestra a due ante con profilo classico bianco",
        "Massima luminosità negli ambienti interni",
        "Profilo a 5 camere con rinforzo in acciaio",
        "Integrazione perfetta con qualsiasi facciata",
      ],
    },

    dmrDomus: {
      category: "Finestre in PVC",
      description: "Il best-seller della gamma. Profilo a 6 camere con profondità costruttiva di 76 mm e 3 livelli di guarnizione. Comfort superiore con protezione termica e acustica ottimale fino a 47 dB, massimo grado di sicurezza fino a RC3 e aspetto classico ed elegante con saldatura invisibile.",
      features: [
        "Profilo a 6 camere isolanti per massimo isolamento termico e acustico",
        "Profondità costruttiva 76 mm con 3 livelli di guarnizione e guarnizione mediana",
        "Protezione acustica fino a 47 dB (classe 5) per ambienti silenziosi",
        "Resistenza all'effrazione fino alla classe RC3",
        "Saldatura invisibile per superficie perfettamente piana e aspetto estetico superiore",
        "Vetrocamera doppio vetro 3.3.1 Lowe Laminato con gas argon e canalina calda",
        "Rinforzi in acciaio zincato 1,5–2,5 mm per alta stabilità e lunga durata",
        "Pellicole di alta qualità in vasta gamma di colori",
      ],
      mainTitle: "Caratteristiche Principali",
      mainDesc: "Il DMR DOMUS è dotato di un profilo a 6 camere isolanti con profondità costruttiva di 76 mm e 3 livelli di guarnizione con guarnizione mediana per una protezione termica e acustica ottimale fino a 47 dB. La saldatura invisibile garantisce una superficie perfettamente piana e un aspetto estetico superiore. La ferramenta ROTO NX antieffrazione consente di raggiungere fino alla classe RC3, mentre i rinforzi in acciaio zincato assicurano alta stabilità e lunga durata.",
      specs: [
        { label: "Profilo", value: "6 camere" },
        { label: "Classe", value: "A" },
        { label: "Profondità", value: "76 mm" },
        { label: "Vetrocamera", value: "Doppio vetro Lowe con gas argon" },
        { label: "Uw (finestra)", value: "1.1 W/m²K" },
        { label: "Abbattimento acustico", value: "47 dB" },
      ],
      windowAdvantages: [
        { title: "Microventilazione", desc: "Funzione di montaggio che consente di ventilare l'ambiente senza aprire l'anta, garantendo un ricambio d'aria costante anche in assenza." },
        { title: "Maniglia di Sicurezza", desc: "Maniglia in alluminio con funzione di sicurezza, pulsante o chiave. Disponibile in diverse finiture per adattarsi a ogni stile." },
        { title: "Cerniere 3D Regolabili", desc: "Disponibile anche nella versione a scomparsa - Designo. Cerniere 3D regolabili su tre livelli con portata fino a 130 kg." },
        { title: "Canalina Calda", desc: "Disponibile in acciaio o in plastica - prodotto con tecnologia polimerica o composita, in un'ampia gamma di colori." },
        { title: "Blocco Rotazione Maniglia", desc: "Funzione che impedisce la rotazione incontrollata della maniglia in posizione di ribalta, responsabile del corretto posizionamento dell'anta in posizione di chiusura." },
        { title: "Braccio Oscillo-Battente", desc: "Apparecchio per una ventilazione confortevole con funzione aggiuntiva di microventilazione e inclinazione dell'anta regolabile in modalità inverno-estate." },
      ],
      coloriDesc: "Scegli tra un'ampia gamma di colori e finiture legno per personalizzare le tue finestre e armonizzarle con lo stile della tua abitazione.",
      benefits: [
        { title: "Efficienza Energetica", desc: "Il profilo a 6 camere isolanti con 3 livelli di guarnizione garantisce un isolamento termico eccellente, riducendo i costi energetici." },
        { title: "Silenziosità", desc: "Abbattimento acustico fino a 47 dB (classe 5) grazie alla vetrocamera con gas argon e al triplo livello di guarnizione." },
        { title: "Robustezza", desc: "Ferramenta ROTO NX antieffrazione fino a classe RC3 con rinforzi in acciaio zincato per massima sicurezza e durata." },
      ],
      ctaTitle: "Interessato al DMR DOMUS?",
      galleryCaptions: [
        "Vetrata a tutta altezza per massima luminosità",
        "Linee squadrate dal design contemporaneo",
        "Ferramenta Roto di alta qualità",
        "Comfort abitativo superiore",
      ],
    },

    dmrPassive: {
      category: "Finestre in PVC",
      description: "Il top di gamma per progetti di alto livello. Struttura a 6 camere in PVC con profondità di installazione 82 mm, tripla guarnizione in gomma siliconica e prestazioni certificate Passivhaus per edifici a consumo quasi zero.",
      features: [
        "Struttura a 6 camere in PVC di altissima qualità per eccellente isolamento termico e acustico",
        "Profondità di installazione 82 mm con pacchetti di 3 vetri fino a 52 mm",
        "Rinforzo anta in acciaio zincato per resistenza statica e massima sicurezza",
        "Tripla guarnizione in gomma siliconica con forma innovativa per ridurre le forze di apertura e chiusura",
        "Battuta ferramenta nell'asse di 13 mm per elementi ROTO più resistenti",
        "Ampia superficie delle camere per ventilazione e raffreddamento efficace",
        "Resistente a radiazioni solari e sollecitazioni meccaniche",
        "Uw fino a 0.8 W/m²K per edifici NZEB e certificazione Passivhaus",
      ],
      mainTitle: "Caratteristiche Principali",
      mainDesc: "Il DMR PASSIVE è realizzato con una struttura a 6 camere in PVC di altissima qualità e una profondità di installazione di 82 mm che accoglie pacchetti di 3 vetri fino a 52 mm. Il rinforzo anta in acciaio zincato garantisce resistenza statica e sicurezza, mentre la tripla guarnizione in gomma siliconica con forma innovativa riduce le forze di apertura e chiusura. Resistente a radiazioni solari e sollecitazioni meccaniche.",
      specs: [
        { label: "Profilo", value: "7 camere" },
        { label: "Classe", value: "A+" },
        { label: "Vetrocamera", value: "Triplo vetro basso emissivo" },
        { label: "Uf (telaio)", value: "0.85 W/m²K" },
        { label: "Uw (finestra)", value: "0.8 W/m²K" },
        { label: "Abbattimento acustico", value: "45 dB" },
      ],
      windowAdvantages: [
        { title: "Microventilazione", desc: "Funzione di montaggio che consente di ventilare l'ambiente senza aprire l'anta, garantendo un ricambio d'aria costante anche in assenza." },
        { title: "Maniglia di Sicurezza", desc: "Maniglia in alluminio con funzione di sicurezza, pulsante o chiave. Disponibile in diverse finiture per adattarsi a ogni stile." },
        { title: "Cerniere 3D Regolabili", desc: "Disponibile anche nella versione a scomparsa - Designo. Cerniere 3D regolabili su tre livelli con portata fino a 130 kg." },
        { title: "Canalina Calda", desc: "Disponibile in acciaio o in plastica - prodotto con tecnologia polimerica o composita, in un'ampia gamma di colori." },
        { title: "Blocco Rotazione Maniglia", desc: "Funzione che impedisce la rotazione incontrollata della maniglia in posizione di ribalta, responsabile del corretto posizionamento dell'anta in posizione di chiusura." },
        { title: "Braccio Oscillo-Battente", desc: "Apparecchio per una ventilazione confortevole con funzione aggiuntiva di microventilazione e inclinazione dell'anta regolabile in modalità inverno-estate." },
      ],
      coloriDesc: "Scegli tra un'ampia gamma di colori e finiture legno per personalizzare le tue finestre e armonizzarle con lo stile della tua abitazione.",
      benefits: [
        { title: "Passivhaus Ready", desc: "Prestazioni certificate per edifici passivi e NZEB, con valori Uw fino a 0.8 W/m²K." },
        { title: "Sostenibilità", desc: "Riduzione drastica dei consumi energetici e materiali riciclabili al 100% a fine vita." },
        { title: "Design Premium", desc: "Linee minimali e moderne, con profili a vista ridotta per massima luminosità." },
      ],
      ctaTitle: "Interessato al DMR PASSIVE?",
      galleryCaptions: [
        "Integrazione perfetta in architetture moderne",
        "Prestazioni certificate Passivhaus",
        "Triplo vetro basso emissivo con doppio gas argon",
        "Design minimale con profili a vista ridotta",
      ],
    },
  },
  area: {
    nav: {
      dashboard: "Dashboard",
      ordini: "Ordini",
      preventivi: "Preventivi",
      rivenditori: "Rivenditori",
      pagamenti: "Pagamenti",
      assistenza: "Assistenza",
      kpi: "KPI",
      impostazioni: "Impostazioni",
      esci: "Esci",
    },
    roles: {
      superAdmin: "Super Admin",
      commerciale: "Commerciale",
      rivenditore: "Rivenditore",
      utente: "Utente",
    },
    common: {
      caricamento: "Caricamento...",
      erroreCaricamento: "Errore nel caricamento",
      impossibileCaricareConnessione: "Verifica la connessione e riprova.",
      riprova: "Riprova",
      annulla: "Annulla",
      elimina: "Elimina",
      esportaCsv: "Esporta CSV",
      indietro: "Indietro",
      dettagli: "Dettagli",
      selezionati: "selezionati",
      tutto: "Tutto",
      tre_mesi: "3 Mesi",
      sei_mesi: "6 Mesi",
      nessuDatoDisponibile: "Nessun dato disponibile",
      nessuRisultatoTrovato: "Nessun risultato trovato",
      nuovo: "Nuovo",
      aggiornaStato: "Aggiorna Stato",
      azzeraFiltri: "Azzera filtri",
      tutti: "Tutti",
      esporta: "Esporta",
      salva: "Salva",
      conferma: "Conferma",
      live: "Live",
    },
    auth: {
      accedi: "Accedi",
      registrati: "Registrati",
      accedendo: "Accesso in corso...",
      registrando: "Registrazione in corso...",
      nomeCompleto: "Nome Completo",
      confermaPassword: "Conferma Password",
      emailNonValida: "Email non valida",
      passwordMinimo6: "La password deve essere almeno 6 caratteri",
      passwordMinimo8: "La password deve essere almeno 8 caratteri",
      passwordMaiuscola: "La password deve contenere almeno una maiuscola",
      passwordNumero: "La password deve contenere almeno un numero",
      passwordSpeciale: "La password deve contenere almeno un carattere speciale",
      nomeMinimo2: "Il nome deve essere almeno 2 caratteri",
      passwordNonCoincidono: "Le password non coincidono",
      emailPasswordNonCorretti: "Email o password non corretti",
      troppiTentativi: "Troppi tentativi. Riprova tra qualche minuto.",
      emailGiaRegistrata: "Questo indirizzo email è già registrato",
      registrazioneCompletata: "Registrazione completata. Controlla la tua email per confermare l'account prima di accedere.",
      accettaTermini: "Accedendo, accetti i nostri termini di servizio e la privacy policy",
      placeholder_email: "nome@esempio.it",
      placeholder_nome: "Mario Rossi",
      placeholder_password: "••••••••",
    },
    dashboard: {
      titolo: "Dashboard",
      descRivenditori: "I tuoi rivenditori e ordini",
      descGenerale: "Panoramica generale",
      ricaviTotali: "Ricavi Totali",
      accontiTotali: "Acconti Totali",
      totaleIncassato: "Totale Incassato",
      daSaldare: "Da Saldare",
      ordiniTotali_subtitle: "ordini totali",
      daOrdini: "Da ordini",
      pagamentiRicevuti: "Pagamenti ricevuti",
      percentualeTotale: "% del totale",
      top5Rivenditori: "Top 5 Rivenditori",
      top5Desc: "I 5 rivenditori con più fatturato",
      ordini: "ordini",
      erroreImpossibile: "Impossibile caricare i dati della dashboard. Verifica la connessione e riprova.",
    },
    dealerDashboard: {
      benvenuto: "Benvenuto",
      desc: "Panoramica dei tuoi ordini e pagamenti",
      descAdmin: "Panoramica degli ordini e pagamenti",
      ordiniTotali: "Ordini Totali",
      tuttiGliOrdini: "Tutti gli ordini",
      valoreTotale: "Valore Totale",
      importoComplessivo: "Importo complessivo ordini",
      pagato: "Pagato",
      pagamentiEffettuati: "Pagamenti effettuati",
      daPagare: "Da Pagare",
      importoRimanente: "Importo rimanente",
      progressoPagamento: "Progresso Pagamento Globale",
      distribuzionePerStato: "Distribuzione Ordini per Stato",
      distribuzioneDesc: "I tuoi ordini suddivisi per stato di avanzamento",
      attivitaRecente: "Attività Recente",
      nuove: "nuove",
      attivitaDesc: "Aggiornamenti sugli ordini degli ultimi 7 giorni",
      nessunNotifica: "Nessuna notifica recente",
      promemoriaPagementi: "Promemoria Pagamenti",
      promemoriaDesc: "Ordini che richiedono attenzione per i pagamenti",
      ordine: "Ordine",
      totale: "Totale",
      rimanente: "Rimanente",
      progressoLabel: "Progresso pagamento",
      tuttoInRegola: "Tutto in regola!",
      nessunPagamentoSospeso: "Non ci sono pagamenti in sospeso.",
      linkRapidi: "Link Rapidi",
      visualizzaOrdini: "Visualizza Ordini",
      tuttiOrdini: "Tutti i tuoi ordini",
      storicoPagementi: "Storico Pagamenti",
      consultaPagementi: "Consulta i pagamenti",
      apriTicket: "Apri un ticket",
    },
    ordini: {
      titolo: "Ordini",
      desc: "Gestisci tutti gli ordini dei rivenditori",
      nuovoPreventivo: "Nuovo Preventivo",
      tuttiRivenditori: "Tutti i rivenditori",
      lista: "Lista",
      pipeline: "Pipeline",
      ordiniTotali: "Totale Ordini",
      valoreTotale: "Valore Totale",
      daIncassare: "Da Incassare",
      ordiniConSaldo: "Ordini con Saldo",
      nessunOrdineFilti: "Nessun ordine corrisponde ai filtri",
      nessunOrdineTrovato: "Nessun ordine trovato",
      creaOrdineSuggerimento: "Crea il tuo primo ordine per iniziare",
      creaOrdine: "Crea Ordine",
      listaOrdini: "Lista Ordini",
      aggiornaStato: "Aggiorna Stato",
      caricamento: "Caricamento ordini...",
      errore: "Impossibile caricare gli ordini. Verifica la connessione e riprova.",
    },
    orderDetail: {
      preventivoDuplicato: "Preventivo duplicato",
      erroreDuplicazione: "Errore nella duplicazione",
      preventivoConvertito: "Preventivo convertito in ordine",
      erroreConversione: "Errore durante la conversione del preventivo",
      preventivo: "Preventivo",
      ordine: "Ordine",
      tornaPreventivi: "Torna ai Preventivi",
      tornaOrdini: "Torna agli Ordini",
      prodottiQuotati: "Prodotti Quotati",
      righeOrdine: "Righe Ordine",
      conversione: "Conversione...",
      confermaConversione: "Conferma Conversione",
    },
    dealers: {
      titolo: "Rivenditori",
      desc: "Gestisci i rivenditori e monitora le loro performance",
      rivenditore: "rivenditore",
      rivenditori: "rivenditori",
      nessunRivenditore: "Nessun rivenditore trovato",
      nessunRivenditoreHint: "Prova a modificare i filtri o aggiungi un nuovo rivenditore.",
      nuovoRivenditore: "Nuovo Rivenditore",
      caricamento: "Caricamento rivenditori...",
    },
    dealerDetail: {
      tornaRivenditori: "Torna ai rivenditori",
      piva: "P.IVA:",
      entraArea: "Entra nell'Area Rivenditore",
      ordiniTotali: "Ordini Totali",
      fatturatoTotale: "Fatturato Totale",
      ticketMedio: "Ticket Medio",
      daIncassare: "Da Incassare",
      informazioni: "Informazioni",
      panoramica: "Panoramica",
      datiAnagrafici: "Dati Anagrafici",
      ragioneSociale: "Ragione Sociale",
      codiceFiscale: "Codice Fiscale",
      email: "Email",
      telefono: "Telefono",
      indirizzo: "Indirizzo",
      note: "Note",
      riepilogoFinanziario: "Riepilogo Finanziario",
      incassato: "Incassato",
      percentualeIncassata: "Percentuale Incassata",
      storicoOrdini: "Storico Ordini",
      idOrdine: "ID Ordine",
      data: "Data",
      stato: "Stato",
      importo: "Importo",
      pagato: "Pagato",
      daPagare: "Da Pagare",
      vediTuttiOrdini: "Vedi tutti gli ordini",
      nessunOrdine: "Nessun ordine trovato",
      nonTrovato: "Rivenditore non trovato",
      erroreCaricamento: "Errore nel caricamento dei dati.",
      indietro: "Indietro",
    },
    preventivi: {
      titolo_super: "Preventivi",
      desc_super: "Gestisci i tuoi preventivi e convertili in ordini",
      titolo_dealer: "Preventivi",
      desc_dealer: "Visualizza i tuoi preventivi",
      cerca: "Cerca per ID o rivenditore...",
      tuttiRivenditori: "Tutti i rivenditori",
      tutti: "Tutti",
      idPreventivo: "ID Preventivo",
      rivenditore: "Rivenditore",
      dataCreazione: "Data Creazione",
      importoTotale: "Importo Totale",
      scadenza: "Scadenza",
      stato: "Stato",
      nessunoCreato: "I preventivi appariranno qui quando verranno creati",
      nessunoCreatoDealer: "I preventivi verranno creati dal tuo commerciale di riferimento",
      confermaConversione: "Il preventivo passerà allo stato \"Da Confermare\" e apparirà nella sezione Ordini.",
      conversione: "Conversione...",
      confermaConversioneBtn: "Conferma Conversione",
      elimina: "Elimina Definitivamente",
      convertito: "Preventivo convertito in ordine",
      erroreConversione: "Errore nella conversione del preventivo",
      valido: "Valido",
      nonValido: "Non Valido",
      nuovoPreventivo: "Nuovo Preventivo",
      totaleKpi: "Totale",
      valoreKpi: "Valore",
      validiKpi: "Validi",
      nonValidiKpi: "Non Validi",
      da: "Da",
      a: "A",
      azioni: "Azioni",
      nessunRisultato: "Nessun risultato",
      provaModificareFiltri: "Prova a modificare i filtri di ricerca",
      impostaValido: "Imposta Valido",
      impostaNonValido: "Imposta Non Valido",
      converti: "Converti",
      convertiInOrdine: "Converti in Ordine",
      duplica: "Duplica",
      aggiornato: "o aggiornato",
      aggiornatoPlur: "i aggiornati",
      erroreAggiornamentoStato: "Errore nell'aggiornamento dello stato",
      preventiviConvertiti: "convertit",
      nonConvertitiPerErrore: "non convertiti per errore",
      erroreNessunoConvertito: "Errore: nessun preventivo convertito",
      eliminato: "o eliminato",
      eliminati: "i eliminati",
      erroreEliminazione: "Errore nell'eliminazione",
      erroreCaricamentoDuplicazione: "Errore nel caricamento dei dati per la duplicazione",
      convertiTitolo: "Converti in Ordine",
      convertiDesc: "Sei sicuro di voler convertire questo preventivo in un ordine? Il preventivo passerà allo stato \"Da Confermare\" e apparirà nella sezione Ordini.",
      conversioneLoading: "Conversione...",
      convertiBulkTitolo: "Converti Preventiv",
      convertiBulkDesc: "Sei sicuro di voler convertire i preventivi selezionati in ordini? Passeranno allo stato \"Da Confermare\".",
      eliminaBulkTitolo: "Elimina Preventiv",
      eliminaBulkDesc: "Questa azione è irreversibile. Verranno eliminati permanentemente i preventivi selezionati e tutte le righe d'ordine associate.",
    },
    pagamenti: {
      titolo: "Pagamenti",
      nuovoPagamento: "Nuovo Pagamento",
      totaleIncassato: "Totale Incassato",
      pagamenti: "pagamenti",
      mediaImporto: "Media Importo",
      perPagemento: "per pagamento",
      numPagementi: "Num. Pagamenti",
      totaliPeriodo: "totali nel periodo",
      metodoUsato: "Metodo Più Usato",
      piuPopolare: "più popolare",
      tabella: "Tabella",
      timeline: "Timeline",
      esporta: "Esporta",
      data: "Data",
      dealer: "Dealer",
      tipo: "Tipo",
      metodo: "Metodo",
      importo: "Importo",
      riferimento: "Riferimento",
      nessunoTrovato: "Nessun pagamento trovato",
      confermaEliminazione: "Conferma eliminazione",
      confermaEliminazioneDesc: "Sei sicuro di voler eliminare questo pagamento? L'azione non può essere annullata.",
      caricamento: "Caricamento pagamenti...",
    },
    paymentDetail: {
      titolo: "Pagamento #",
      registratoIl: "Registrato il",
      dettagliPagemento: "Dettagli Pagamento",
      tipoPagemento: "Tipo Pagamento",
      importo: "Importo",
      dataPagemento: "Data Pagamento",
      metodo: "Metodo",
      riferimento: "Riferimento",
      idPagemento: "ID Pagamento",
      ricevuta: "Ricevuta",
      visualizza: "Visualizza",
      scarica: "Scarica",
      ordine: "Ordine #",
      statoOrdine: "Stato Ordine",
      importoTotale: "Importo Totale",
      importoPagato: "Importo Pagato",
      daPagare: "Da Pagare",
      progressoPagemento: "Progresso Pagamento",
      visualizzaOrdine: "Visualizza Ordine Completo",
      nonTrovato: "Pagamento non trovato",
      erroreCaricamento: "Errore nel caricamento del pagamento.",
    },
    analytics: {
      titolo: "Dashboard Analytics Unificata",
      desc: "Analisi complete di ordini, pagamenti e performance dealers",
      ultimi3: "Ultimi 3 mesi",
      ultimi6: "Ultimi 6 mesi",
      ultimoAnno: "Ultimo anno",
      periodo: "Periodo",
      tuttiDealer: "Tutti i dealers",
      resetFiltri: "Reset Filtri",
      ordiniTotali: "Totale Ordini",
      ricaviTotali: "Ricavi Totali",
      pagamentiIncassati: "Pagamenti Incassati",
      ticketMedio: "Ticket Medio",
      exportCompletato: "Export completato",
      exportDesc: "I dati analytics sono stati esportati con successo",
      metrica: "Metrica",
      valore: "Valore",
      tassoConversione: "Tasso Conversione",
      errore: "Impossibile caricare i dati analytics. Verifica la connessione e riprova.",
    },
    assistenza: {
      titolo: "Assistenza",
      desc: "Gestisci i ticket di assistenza dei rivenditori",
      aperti: "Aperti",
      inGestione: "In Gestione",
      chiusi: "Chiusi",
      urgenti: "Urgenti/Alta",
      cercaOggetto: "Cerca per oggetto...",
      tuttiStati: "Tutti gli stati",
      tuttePriorita: "Tutte le priorità",
      azzeraFiltri: "Azzera filtri",
      oggetto: "Oggetto",
      ordine: "Ordine",
      rivenditore: "Rivenditore",
      priorita: "Priorità",
      stato: "Stato",
      data: "Data",
      nessunoTrovato: "Nessun ticket trovato.",
      primiCento: "Mostrati i primi 100 ticket. Usa i filtri per affinare la ricerca.",
    },
    dealerAssistenza: {
      titolo: "Assistenza",
      aperti: "aperti",
      desc: "Ticket di assistenza per i tuoi ordini",
      tuttiStati: "Tutti gli stati",
      azzeraFiltri: "Azzera filtri",
      oggetto: "Oggetto",
      ordine: "Ordine",
      priorita: "Priorità",
      stato: "Stato",
      data: "Data",
      nessunoTrovato: "Nessun ticket di assistenza trovato.",
    },
    impostazioni: {
      titolo: "Impostazioni",
      desc: "Configura il sistema, gestisci utenti e personalizza l'applicazione",
      utentiRuoli: "Utenti e Ruoli",
      utenti: "Utenti",
      numerazione: "Numerazione",
      num: "Num.",
      templatePdf: "Template PDF",
      pdf: "PDF",
      integrazioni: "Integrazioni",
      integ: "Integ.",
      auditLog: "Audit Log",
      audit: "Audit",
    },
    dealerAreaLayout: {
      vistaRivenditore: "Vista Rivenditore",
      staiVisualizzando: "Stai visualizzando come:",
      esciArea: "Esci dall'Area",
    },
    smartDashboard: {
      accessoNegato: "Accesso Negato",
      noPermessi: "Non hai i permessi per accedere a questa sezione.",
    },
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

  products: {
    caratteristichePrincipali: "Caracteristici Principale",
    specificheTecniche: "Specificații Tehnice",
    vantaggiChiave: "Avantaje Cheie",
    dettagliTecnici: "Detalii Tehnice",
    vantaggiFinestra: "Avantajele Ferestrei",
    coloriDisponibili: "Culori Disponibile",
    coloriDisponibiliDesc: "Alege dintr-o gamă largă de culori și finisaje lemn pentru a personaliza ferestrele și a le armoniza cu stilul locuinței tale.",
    ctaContactDesc: "Contactează-ne pentru o ofertă personalizată și află condițiile rezervate distribuitorilor.",
    galleria: "Galerie",
    colorNames: ["Alb", "Stejar Auriu", "Nuc", "Antracit", "Gri Deschis", "Verde Închis", "Alb Cremă", "Negru Intens"],

    tapparelle: {
      category: "Produsele Noastre",
      title: "",
      titleAccent: "Jaluzele Rulante",
      description: "Jaluzele rulante din aluminiu: ușurință, rezistență și izolare termică superioară. Protecție împotriva efracției, economie de energie. Disponibile coibentate, extrudate și motorizate.",
      features: [
        "Aluminiu ușor și rezistent, rezistă la intemperii și uzură",
        "Izolare termică superioară: căldură iarna, răcoare vara",
        "Barieră eficientă împotriva tentativelor de efracție",
        "Disponibile cu spumă poliuretanică coibentată",
        "Motorizare electrică cu motor tubular integrat în rolă",
        "Pregătite pentru domotică și Smart Home",
        "Reducerea zgomotelor exterioare",
        "Aluminiu 100% reciclabil, alegere sustenabilă",
        "Disponibile fără casetă (sistem monobloc)",
      ],
      specs: [
        { label: "Material", value: "Aluminiu" },
        { label: "Coibentare", value: "Spumă poliuretanică" },
        { label: "Motorizare", value: "Motor tubular" },
        { label: "Domotică", value: "Smart Home ready" },
        { label: "Sustenabilitate", value: "100% reciclabil" },
        { label: "Versiuni", value: "Coibentate / Extrudate" },
      ],
      benefits: [
        { title: "Economie de Energie", desc: "Aluminiul coibentat cu spumă poliuretanică reține căldura iarna și respinge căldura estivală, reducând costurile la factură." },
        { title: "Securitate Anti-efracție", desc: "Robustețea aluminiului, combinată cu structura coibentată, creează o protecție suplimentară împotriva tentativelor de efracție." },
        { title: "Motorizare Smart", desc: "Motor tubular ascuns în rolă, control de la distanță prin domotică. Consum mai mic decât un mic aparat electric." },
      ],
      ctaTitle: "Interesat de Jaluzelele Rulante?",
      galleryCaptions: [
        "Jaluzea din aluminiu coibentat de înaltă rezistență",
        "Lamele din aluminiu coibentat de înaltă rezistență",
        "Integrare estetică cu fațade contemporane",
      ],
    },

    portoncini: {
      category: "Produsele Noastre",
      title: "Uși de Intrare în",
      titleAccent: "PVC",
      description: "Uși de intrare din PVC cu adâncime constructivă 76-82-92 mm, 6 camere de izolare și 3 garnituri. Uw până la 0,72 W/m²K, acustică până la 47 dB, securitate până la RC3.",
      features: [
        "Adâncime constructivă disponibilă în 76, 82 și 92 mm",
        "6 camere de izolare pentru eficiență termică maximă",
        "3 garnituri cu garnituă mediană pentru etanșare superioară",
        "Coeficient termic Uw până la 0,72 W/m²K",
        "Performanțe acustice până la 47 dB (clasa 5)",
        "Rezistență la efracție până la clasa RC3",
        "Broască multipunct mecanic-automată cu blocare automată",
        "Prag standard din aluminiu 20 mm sau soluție fără prag",
        "Panouri ornamentale HPL, sticlă termoizolantă și aplicații din inox",
        "Gamă largă de culori și folii decorative",
      ],
      specs: [
        { label: "Adâncime", value: "76 / 82 / 92 mm" },
        { label: "Camere", value: "6" },
        { label: "Uw", value: "până la 0,72 W/m²K" },
        { label: "Acustică", value: "47 dB (clasa 5)" },
        { label: "Securitate", value: "Până la RC3" },
        { label: "Broască", value: "Multipunct automată" },
      ],
      benefits: [
        { title: "Securitate Maximă", desc: "Broască multipunct mecanic-automată cu 3 puncte de închidere cu ieșire automată, rezistență până la clasa RC3." },
        { title: "Izolare Perfectă", desc: "Uw până la 0,72 W/m²K datorită celor 6 camere de izolare și 3 garnituri cu garnituă mediană." },
        { title: "Personalizare Totală", desc: "Panouri ornamentale HPL, bare și mânere din inox, luminator și ferestre laterale pentru orice necesitate." },
      ],
      ctaTitle: "Interesat de Ușile de Intrare PVC?",
      galleryCaptions: [
        "Ușă de intrare cu panou decorativ premium",
        "Gamă largă de culori și finisaje",
        "Eleganță și securitate pentru fiecare intrare",
      ],
    },

    cassonetti: {
      category: "Produsele Noastre",
      title: "Casete Rulou",
      titleAccent: "Coibentate",
      description: "Caseta rulou este recipientul care adăpostește ruloul, pozitionat în partea superioară a ferestrei. Rol fundamental în izolarea termică și acustică: casetele neizolate provoacă dispersii, punți termice, condens și mucegai.",
      features: [
        "Recipient pentru rulou îngropat în zid sau aparent",
        "Coibentare pentru eliminarea punților termice și dispersiilor",
        "Prevenirea condensului și mucegaiului în zona casetei",
        "Inspecție frontală facilitată pentru întreținere și înlocuire jaluzelă",
        "Compatibil cu jaluzele motorizate",
        "Dimensiuni la comandă pentru orice deschidere murală",
        "Linii curate și esențiale, soluții încastrate disponibile",
        "Pregătit pentru plasă de țânțari",
      ],
      specs: [
        { label: "Material", value: "PVC / Aluminiu / Compozit" },
        { label: "Coibentare", value: "EPS densitate înaltă" },
        { label: "Inspecție", value: "Frontală" },
        { label: "Motorizare", value: "Pregătit" },
        { label: "Design", value: "Încastrat disponibil" },
        { label: "Dimensiuni", value: "La comandă" },
      ],
      benefits: [
        { title: "Zero Punți Termice", desc: "O casetă neizolată provoacă dispersii termice iarna și supraîncălzire vara. Coibentarea elimină complet această problemă." },
        { title: "Prevenirea Condensului", desc: "Elimină formarea punților termice cu condens și mucegai, îmbunătățind salubritatea mediului." },
        { title: "Întreținere Ușoară", desc: "Acces simplu pentru întreținere și înlocuirea jaluzelei, fără intervenții invazive." },
      ],
      ctaTitle: "Interesat de Casetele Rulou?",
      galleryCaptions: [
        "Casetă rulou integrată în zidărie",
        "Coibentare EPS de înaltă densitate",
        "Inspecție frontală facilitată",
        "Finisaj la nivelul peretelui pentru estetică curată",
      ],
    },

    persiane: {
      category: "Produsele Noastre",
      title: "Obloane din",
      titleAccent: "Aluminiu",
      description: "Obloane exterioare din aluminiu cu lamele fixe sau orientabile. Secțiunea profilelor 56 mm rame și 46 mm canate. Vopsitorie RAL la alegere sau sublimare efect lemn.",
      features: [
        "Secțiunea profilelor: 56 mm rame și 46 mm canate",
        "Lamele fixe (83x25 mm plane sau 40x25 mm simetrice) sau orientabile (72x12 mm, de la 0° la 180°)",
        "Soclu de bază reglabil H 75-113 mm",
        "Garnituă pe rame și canate",
        "Rame tip Z sau L, sau fără rame cu canat la perete",
        "Vopsitorie RAL la alegere sau sublimare efect lemn",
        "Tipuri: cu deschidere, pliante, glisante interior sau exterior perete",
        "Suprafețe plane, ușor de curățat",
      ],
      specs: [
        { label: "Rame", value: "56 mm" },
        { label: "Canat", value: "46 mm" },
        { label: "Lamele", value: "Fixe sau orientabile" },
        { label: "Orientare", value: "0 - 180 grade" },
        { label: "Soclu", value: "H 75-113 mm" },
        { label: "Finisaje", value: "RAL / Efect lemn" },
      ],
      benefits: [
        { title: "Control Lumină", desc: "Lamele orientabile de la 0° la 180° cu comandă manuală pentru reglarea precisă a luminozității și ventilației." },
        { title: "Versatilitate", desc: "Realizabile cu deschidere, pliante sau glisante, pentru integrare cu orice soluție constructivă în construcție nouă sau renovare." },
        { title: "Design și Finisaje", desc: "Suprafețe plane ușor de curățat, vopsitorie RAL la alegere sau sublimare culoare lemn pentru un aspect elegant și natural." },
      ],
      ctaTitle: "Interesat de Obloanele din Aluminiu?",
      galleryCaptions: [
        "Obloane din aluminiu cu finisaj clasic",
        "Lamele din aluminiu cu sublimare efect lemn",
        "Gamă largă de culori RAL disponibile",
        "Eleganță fără timp pentru orice fațadă",
      ],
    },

    dmrConfort: {
      category: "Ferestre PVC",
      description: "Ferestre care combină design modern, profile subțiri și performanțe excelente. Proiectate pentru a aduce lumină naturală maximă cu niveluri ridicate de izolare termică și acustică. Se adaptează proiectelor arhitecturale clasice și moderne: alegerea pentru cei care caută formă ușoară, eficiență energetică și performanțe fiabile.",
      features: [
        "Profile înalte de doar 113 mm pentru lumină naturală maximă",
        "Pachet sticlă până la 49 mm pentru izolare termică excelentă",
        "5 camere în ramă și canat, 4 camere în montant",
        "Protecție acustică până la 46 dB pentru medii liniștite",
        "Durabil și rezistent la intemperii pentru mulți ani de utilizare",
        "Sistem ecologic conceput gândindu-se la reciclare",
        "Formă versatilă pentru proiecte arhitecturale moderne și clasice",
        "Garnituri cu dublă bătaie pentru etanșare la aer și apă",
      ],
      mainTitle: "Caracteristici Principale",
      mainDesc: "DMR CONFORT prezintă profile înalte de doar 113 mm și un pachet de sticlă atent selectat pentru a aduce mai multă lumină naturală. Garantează o izolare eficientă a căldurii cu facturi mai mici și temperaturi confortabile tot anul, plus reducerea zgomotului extern până la 46 dB. Profile concepute pentru mulți ani de utilizare, rezistente la intemperii și ușor de întreținut. Sistem dezvoltat gândindu-se la reciclare, cu o formă versatilă pentru proiecte atât moderne cât și clasice.",
      specs: [
        { label: "Profil", value: "5 camere (ramă/canat)" },
        { label: "Clasă", value: "B" },
        { label: "Adâncime instalare", value: "72 mm" },
        { label: "Pachet sticlă", value: "până la 49 mm" },
        { label: "Uw (fereastră)", value: "1.3 W/m²K" },
        { label: "Reducere acustică", value: "46 dB" },
      ],
      windowAdvantages: [
        { title: "Microventilare", desc: "Funcție de montaj care permite ventilarea spațiului fără a deschide canatul, asigurând un schimb constant de aer." },
        { title: "Mâner de Securitate", desc: "Mâner din aluminiu cu funcție de securitate, buton sau cheie. Disponibil în diverse finisaje." },
        { title: "Balamale 3D Reglabile", desc: "Disponibil și în versiunea încastrată - Designo. Balamale 3D reglabile pe trei niveluri cu capacitate până la 130 kg." },
        { title: "Profil Cald", desc: "Disponibil în oțel sau plastic - produs cu tehnologie polimerică sau compozită, într-o gamă largă de culori." },
        { title: "Blocare Rotire Mâner", desc: "Funcție care împiedică rotirea necontrolată a mânerului în poziția de basculare, responsabilă de poziționarea corectă a canatului." },
        { title: "Braț Oscilant-Batant", desc: "Dispozitiv pentru ventilare confortabilă cu funcție suplimentară de microventilare și înclinare reglabilă iarnă-vară." },
      ],
      coloriDesc: "Alege dintr-o gamă largă de culori și finisaje lemn pentru a personaliza ferestrele și a le armoniza cu stilul locuinței tale.",
      benefits: [
        { title: "Izolare Termică", desc: "Izolare eficientă a căldurii cu facturi mai mici și temperaturi confortabile tot anul datorită profilului cu 5 camere și pachetului de sticlă până la 49 mm." },
        { title: "Confort Acustic", desc: "Reducerea zgomotului extern până la 46 dB pentru medii liniștite și confortabile, ideal pentru locuințe în zone aglomerate." },
        { title: "Securitate", desc: "Feronerie anti-efracție de serie cu posibilitate de upgrade la clasa RC2. Protecție și liniște pentru familia ta." },
      ],
      ctaTitle: "Interesat de DMR CONFORT?",
      galleryCaptions: [
        "Fereastră cu două foi și profil clasic alb",
        "Luminozitate maximă în spații interioare",
        "Profil cu 5 camere cu armare din oțel",
        "Integrare perfectă cu orice fațadă",
      ],
    },

    dmrDomus: {
      category: "Ferestre PVC",
      description: "Best-seller al gamei. Profile cu 6 camere izolante, 3 niveluri de garnitură și sticlă dublă Low-E cu gaz argon. Clasa A de izolare termică, acustică până la 47 dB, feronerie ROTO NX anti-efracție. Alegerea perfectă pentru renovări și construcții noi de înaltă calitate.",
      features: [
        "Profil cu 6 camere izolante pentru izolare termică și acustică maximă",
        "Adâncime constructivă 76 mm cu 3 niveluri de garnitură și garnituă mediană",
        "Protecție acustică până la 47 dB (clasa 5) pentru medii liniștite",
        "Rezistență la efracție până la clasa RC3",
        "Sudură invizibilă pentru suprafață perfect plană și aspect estetic superior",
        "Vitrocameră sticlă dublă 3.3.1 Low-E Laminat cu gaz argon și profil cald",
        "Rinforted din oțel zincat 1,5-2,5 mm pentru stabilitate înaltă și durabilitate",
        "Folii de înaltă calitate în gamă largă de culori",
      ],
      mainTitle: "Caracteristici Principale",
      mainDesc: "DMR DOMUS reprezintă best-seller-ul gamei noastre de ferestre PVC. Profilul cu 6 camere izolante și 3 niveluri de garnitură garantează o izolare termică și acustică excelentă. Vitrocamera cu sticlă dublă 3.3.1 Low-E Laminat cu gaz argon și profil cald asigură performanțe energetice de clasa A. Rinforțurile din oțel zincat 1,5-2,5 mm oferă stabilitate înaltă și durabilitate pe termen lung.",
      specs: [
        { label: "Profil", value: "6 camere" },
        { label: "Clasă", value: "A" },
        { label: "Adâncime", value: "76 mm" },
        { label: "Vitrocameră", value: "Sticlă dublă Low-E cu gaz argon" },
        { label: "Uw (fereastră)", value: "1.1 W/m²K" },
        { label: "Reducere acustică", value: "47 dB" },
      ],
      windowAdvantages: [
        { title: "Microventilare", desc: "Funcție de montaj care permite ventilarea spațiului fără a deschide canatul, asigurând un schimb constant de aer." },
        { title: "Mâner de Securitate", desc: "Mâner din aluminiu cu funcție de securitate, buton sau cheie. Disponibil în diverse finisaje." },
        { title: "Balamale 3D Reglabile", desc: "Disponibil și în versiunea încastrată - Designo. Balamale 3D reglabile pe trei niveluri cu capacitate până la 130 kg." },
        { title: "Profil Cald", desc: "Disponibil în oțel sau plastic - produs cu tehnologie polimerică sau compozită, într-o gamă largă de culori." },
        { title: "Blocare Rotire Mâner", desc: "Funcție care împiedică rotirea necontrolată a mânerului în poziția de basculare, responsabilă de poziționarea corectă a canatului." },
        { title: "Braț Oscilant-Batant", desc: "Dispozitiv pentru ventilare confortabilă cu funcție suplimentară de microventilare și înclinare reglabilă iarnă-vară." },
      ],
      coloriDesc: "Alege dintr-o gamă largă de culori și finisaje lemn pentru a personaliza ferestrele și a le armoniza cu stilul locuinței tale.",
      benefits: [
        { title: "Eficiență Energetică", desc: "Profilul cu 6 camere izolante cu 3 niveluri de garnitură garantează o izolare termică excelentă, reducând costurile energetice." },
        { title: "Silențiozitate", desc: "Reducere acustică până la 47 dB (clasa 5) datorită vitrocamerei cu gaz argon și triplului nivel de garnitură." },
        { title: "Robustețe", desc: "Feronerie ROTO NX anti-efracție până la clasa RC3 cu rinforted din oțel zincat pentru securitate maximă și durabilitate." },
      ],
      ctaTitle: "Interesat de DMR DOMUS?",
      galleryCaptions: [
        "Vitrare la înălțimea întreagă pentru luminozitate maximă",
        "Linii geometrice cu design contemporan",
        "Feronerie Roto de înaltă calitate",
        "Confort superior în locuință",
      ],
    },

    dmrPassive: {
      category: "Ferestre PVC",
      description: "Topul gamei pentru proiecte de înaltă clasă. Profil cu 7 camere cu performanțe certificate Passivhaus. Triplu sticlă low-emissive, design minimalist, Uw până la 0.8 W/m²K. Soluția ideală pentru clădiri NZEB și proiecte premium.",
      features: [
        "Structură cu 6 camere din PVC de înaltă calitate pentru izolare termică și acustică excelentă",
        "Adâncime de instalare 82 mm cu pachete de 3 sticle până la 52 mm",
        "Rinforcement canat din oțel zincat pentru rezistență statică și securitate maximă",
        "Triplă garnitură din cauciuc siliconic cu formă inovatoare",
        "Bătaie feronerie la 13 mm pentru elemente ROTO mai rezistente",
        "Suprafață amplă a camerelor pentru ventilare și răcire eficientă",
        "Rezistent la radiații solare și solicitări mecanice",
        "Uw până la 0.8 W/m²K pentru clădiri NZEB și certificare Passivhaus",
      ],
      mainTitle: "Caracteristici Principale",
      mainDesc: "DMR PASSIVE reprezintă vârful gamei noastre. Structura cu 6 camere din PVC de înaltă calitate cu adâncime de instalare 82 mm și pachete de 3 sticle până la 52 mm garantează performanțe excepționale. Tripla garnitură din cauciuc siliconic cu formă inovatoare reduce forțele de deschidere și închidere. Uw până la 0.8 W/m²K pentru clădiri NZEB și certificarea Passivhaus.",
      specs: [
        { label: "Profil", value: "7 camere" },
        { label: "Clasă", value: "A+" },
        { label: "Vitrocameră", value: "Triplu sticlă low-emissive" },
        { label: "Uf (ramă)", value: "0.85 W/m²K" },
        { label: "Uw (fereastră)", value: "0.8 W/m²K" },
        { label: "Reducere acustică", value: "45 dB" },
      ],
      windowAdvantages: [
        { title: "Microventilare", desc: "Funcție de montaj care permite ventilarea spațiului fără a deschide canatul, asigurând un schimb constant de aer." },
        { title: "Mâner de Securitate", desc: "Mâner din aluminiu cu funcție de securitate, buton sau cheie. Disponibil în diverse finisaje." },
        { title: "Balamale 3D Reglabile", desc: "Disponibil și în versiunea încastrată - Designo. Balamale 3D reglabile pe trei niveluri cu capacitate până la 130 kg." },
        { title: "Profil Cald", desc: "Disponibil în oțel sau plastic - produs cu tehnologie polimerică sau compozită, într-o gamă largă de culori." },
        { title: "Blocare Rotire Mâner", desc: "Funcție care împiedică rotirea necontrolată a mânerului în poziția de basculare, responsabilă de poziționarea corectă a canatului." },
        { title: "Braț Oscilant-Batant", desc: "Dispozitiv pentru ventilare confortabilă cu funcție suplimentară de microventilare și înclinare reglabilă iarnă-vară." },
      ],
      coloriDesc: "Alege dintr-o gamă largă de culori și finisaje lemn pentru a personaliza ferestrele și a le armoniza cu stilul locuinței tale.",
      benefits: [
        { title: "Passivhaus Ready", desc: "Performanțe certificate pentru clădiri pasive și NZEB, cu valori Uw până la 0.8 W/m²K." },
        { title: "Sustenabilitate", desc: "Reducere drastică a consumului energetic și materiale 100% reciclabile la sfârșitul ciclului de viață." },
        { title: "Design Premium", desc: "Linii minimale și moderne, cu profile la vedere reduse pentru luminozitate maximă." },
      ],
      ctaTitle: "Interesat de DMR PASSIVE?",
      galleryCaptions: [
        "Integrare perfectă în arhitecturi moderne",
        "Performanțe certificate Passivhaus",
        "Triplu sticlă low-emissive cu gaz argon dublu",
        "Design minimalist cu profile la vedere reduse",
      ],
    },
  },
  area: {
    nav: {
      dashboard: "Dashboard",
      ordini: "Comenzi",
      preventivi: "Oferte",
      rivenditori: "Distribuitori",
      pagamenti: "Plăți",
      assistenza: "Asistență",
      kpi: "KPI",
      impostazioni: "Setări",
      esci: "Ieșire",
    },
    roles: {
      superAdmin: "Super Admin",
      commerciale: "Comercial",
      rivenditore: "Distribuitor",
      utente: "Utilizator",
    },
    common: {
      caricamento: "Se încarcă...",
      erroreCaricamento: "Eroare la încărcare",
      impossibileCaricareConnessione: "Verificați conexiunea și încercați din nou.",
      riprova: "Încearcă din nou",
      annulla: "Anulează",
      elimina: "Șterge",
      esportaCsv: "Exportă CSV",
      indietro: "Înapoi",
      dettagli: "Detalii",
      selezionati: "selectate",
      tutto: "Tot",
      tre_mesi: "3 Luni",
      sei_mesi: "6 Luni",
      nessuDatoDisponibile: "Niciun date disponibil",
      nessuRisultatoTrovato: "Niciun rezultat găsit",
      nuovo: "Nou",
      aggiornaStato: "Actualizează Status",
      azzeraFiltri: "Resetează filtre",
      tutti: "Toate",
      esporta: "Exportă",
      salva: "Salvează",
      conferma: "Confirmă",
      live: "Live",
    },
    auth: {
      accedi: "Autentifică-te",
      registrati: "Înregistrează-te",
      accedendo: "Autentificare în curs...",
      registrando: "Înregistrare în curs...",
      nomeCompleto: "Nume Complet",
      confermaPassword: "Confirmă Parola",
      emailNonValida: "Email invalid",
      passwordMinimo6: "Parola trebuie să aibă cel puțin 6 caractere",
      passwordMinimo8: "Parola trebuie să aibă cel puțin 8 caractere",
      passwordMaiuscola: "Parola trebuie să conțină cel puțin o literă mare",
      passwordNumero: "Parola trebuie să conțină cel puțin o cifră",
      passwordSpeciale: "Parola trebuie să conțină cel puțin un caracter special",
      nomeMinimo2: "Numele trebuie să aibă cel puțin 2 caractere",
      passwordNonCoincidono: "Parolele nu coincid",
      emailPasswordNonCorretti: "Email sau parolă incorecte",
      troppiTentativi: "Prea multe încercări. Încearcă din nou în câteva minute.",
      emailGiaRegistrata: "Această adresă de email este deja înregistrată",
      registrazioneCompletata: "Înregistrare finalizată. Verificați email-ul pentru a confirma contul înainte de autentificare.",
      accettaTermini: "Autentificându-te, accepți termenii noștri de serviciu și politica de confidențialitate",
      placeholder_email: "nume@exemplu.ro",
      placeholder_nome: "Ion Popescu",
      placeholder_password: "••••••••",
    },
    dashboard: {
      titolo: "Dashboard",
      descRivenditori: "Distribuitorii și comenzile tale",
      descGenerale: "Vedere generală",
      ricaviTotali: "Venituri Totale",
      accontiTotali: "Total Avansuri",
      totaleIncassato: "Total Încasat",
      daSaldare: "De Achitat",
      ordiniTotali_subtitle: "comenzi totale",
      daOrdini: "Din comenzi",
      pagamentiRicevuti: "Plăți primite",
      percentualeTotale: "% din total",
      top5Rivenditori: "Top 5 Distribuitori",
      top5Desc: "Cei 5 distribuitori cu cea mai mare cifră de afaceri",
      ordini: "comenzi",
      erroreImpossibile: "Imposibil de încărcat datele. Verificați conexiunea și încercați din nou.",
    },
    dealerDashboard: {
      benvenuto: "Bun venit",
      desc: "Prezentare generală a comenzilor și plăților tale",
      descAdmin: "Prezentare generală a comenzilor și plăților",
      ordiniTotali: "Comenzi Totale",
      tuttiGliOrdini: "Toate comenzile",
      valoreTotale: "Valoare Totală",
      importoComplessivo: "Valoarea totală a comenzilor",
      pagato: "Plătit",
      pagamentiEffettuati: "Plăți efectuate",
      daPagare: "De Plătit",
      importoRimanente: "Suma rămasă",
      progressoPagamento: "Progres Plată Global",
      distribuzionePerStato: "Distribuție Comenzi pe Status",
      distribuzioneDesc: "Comenzile tale împărțite pe stadii de avansare",
      attivitaRecente: "Activitate Recentă",
      nuove: "noi",
      attivitaDesc: "Actualizări ale comenzilor din ultimele 7 zile",
      nessunNotifica: "Nicio notificare recentă",
      promemoriaPagementi: "Memento Plăți",
      promemoriaDesc: "Comenzi care necesită atenție pentru plăți",
      ordine: "Comandă",
      totale: "Total",
      rimanente: "Rest",
      progressoLabel: "Progres plată",
      tuttoInRegola: "Totul în ordine!",
      nessunPagamentoSospeso: "Nu există plăți în așteptare.",
      linkRapidi: "Linkuri Rapide",
      visualizzaOrdini: "Vezi Comenzile",
      tuttiOrdini: "Toate comenzile tale",
      storicoPagementi: "Istoricul Plăților",
      consultaPagementi: "Consultați plățile",
      apriTicket: "Deschide un tichet",
    },
    ordini: {
      titolo: "Comenzi",
      desc: "Gestionează toate comenzile distribuitorilor",
      nuovoPreventivo: "Ofertă Nouă",
      tuttiRivenditori: "Toți distribuitorii",
      lista: "Listă",
      pipeline: "Pipeline",
      ordiniTotali: "Total Comenzi",
      valoreTotale: "Valoare Totală",
      daIncassare: "De Încasat",
      ordiniConSaldo: "Comenzi cu Rest",
      nessunOrdineFilti: "Nicio comandă nu corespunde filtrelor",
      nessunOrdineTrovato: "Nicio comandă găsită",
      creaOrdineSuggerimento: "Creați prima comandă pentru a începe",
      creaOrdine: "Crează Comandă",
      listaOrdini: "Listă Comenzi",
      aggiornaStato: "Actualizează Status",
      caricamento: "Se încarcă comenzile...",
      errore: "Imposibil de încărcat comenzile. Verificați conexiunea și încercați din nou.",
    },
    orderDetail: {
      preventivoDuplicato: "Ofertă duplicată",
      erroreDuplicazione: "Eroare la duplicare",
      preventivoConvertito: "Oferta convertită în comandă",
      erroreConversione: "Eroare la conversia ofertei",
      preventivo: "Ofertă",
      ordine: "Comandă",
      tornaPreventivi: "Înapoi la Oferte",
      tornaOrdini: "Înapoi la Comenzi",
      prodottiQuotati: "Produse Cotate",
      righeOrdine: "Linii Comandă",
      conversione: "Conversie...",
      confermaConversione: "Confirmă Conversia",
    },
    dealers: {
      titolo: "Distribuitori",
      desc: "Gestionează distribuitorii și monitorizează performanțele lor",
      rivenditore: "distribuitor",
      rivenditori: "distribuitori",
      nessunRivenditore: "Niciun distribuitor găsit",
      nessunRivenditoreHint: "Încearcă să modifici filtrele sau adaugă un distribuitor nou.",
      nuovoRivenditore: "Distribuitor Nou",
      caricamento: "Se încarcă distribuitorii...",
    },
    dealerDetail: {
      tornaRivenditori: "Înapoi la distribuitori",
      piva: "C.I.F.:",
      entraArea: "Intră în Zona Distribuitorului",
      ordiniTotali: "Comenzi Totale",
      fatturatoTotale: "Cifră de Afaceri Totală",
      ticketMedio: "Valoare Medie",
      daIncassare: "De Încasat",
      informazioni: "Informații",
      panoramica: "Prezentare",
      datiAnagrafici: "Date de Identificare",
      ragioneSociale: "Denumire Socială",
      codiceFiscale: "Cod Fiscal",
      email: "Email",
      telefono: "Telefon",
      indirizzo: "Adresă",
      note: "Notițe",
      riepilogoFinanziario: "Rezumat Financiar",
      incassato: "Încasat",
      percentualeIncassata: "Procent Încasat",
      storicoOrdini: "Istoricul Comenzilor",
      idOrdine: "ID Comandă",
      data: "Dată",
      stato: "Status",
      importo: "Sumă",
      pagato: "Plătit",
      daPagare: "De Plătit",
      vediTuttiOrdini: "Vezi toate comenzile",
      nessunOrdine: "Nicio comandă găsită",
      nonTrovato: "Distribuitor negăsit",
      erroreCaricamento: "Eroare la încărcarea datelor.",
      indietro: "Înapoi",
    },
    preventivi: {
      titolo_super: "Oferte",
      desc_super: "Gestionează ofertele și convertește-le în comenzi",
      titolo_dealer: "Oferte",
      desc_dealer: "Vizualizează ofertele tale",
      cerca: "Caută după ID sau distribuitor...",
      tuttiRivenditori: "Toți distribuitorii",
      tutti: "Toate",
      idPreventivo: "ID Ofertă",
      rivenditore: "Distribuitor",
      dataCreazione: "Data Creare",
      importoTotale: "Sumă Totală",
      scadenza: "Expirare",
      stato: "Status",
      nessunoCreato: "Ofertele vor apărea aici când vor fi create",
      nessunoCreatoDealer: "Ofertele vor fi create de reprezentantul tău comercial",
      confermaConversione: "Oferta va trece la statusul \"De Confirmat\" și va apărea în secțiunea Comenzi.",
      conversione: "Conversie...",
      confermaConversioneBtn: "Confirmă Conversia",
      elimina: "Șterge Definitiv",
      convertito: "Ofertă convertită în comandă",
      erroreConversione: "Eroare la conversia ofertei",
      valido: "Valid",
      nonValido: "Invalid",
      nuovoPreventivo: "Ofertă Nouă",
      totaleKpi: "Total",
      valoreKpi: "Valoare",
      validiKpi: "Valide",
      nonValidiKpi: "Invalide",
      da: "De la",
      a: "Până la",
      azioni: "Acțiuni",
      nessunRisultato: "Niciun rezultat",
      provaModificareFiltri: "Încearcă să modifici filtrele de căutare",
      impostaValido: "Setează Valid",
      impostaNonValido: "Setează Invalid",
      converti: "Convertește",
      convertiInOrdine: "Convertește în Comandă",
      duplica: "Duplică",
      aggiornato: "ă actualizată",
      aggiornatoPlur: "e actualizate",
      erroreAggiornamentoStato: "Eroare la actualizarea statusului",
      preventiviConvertiti: "convertit",
      nonConvertitiPerErrore: "neconvertite din eroare",
      erroreNessunoConvertito: "Eroare: nicio ofertă convertită",
      eliminato: "ă ștearsă",
      eliminati: "e șterse",
      erroreEliminazione: "Eroare la ștergere",
      erroreCaricamentoDuplicazione: "Eroare la încărcarea datelor pentru duplicare",
      convertiTitolo: "Convertește în Comandă",
      convertiDesc: "Ești sigur că vrei să convertești această ofertă într-o comandă? Oferta va trece la statusul \"De Confirmat\" și va apărea în secțiunea Comenzi.",
      conversioneLoading: "Conversie...",
      convertiBulkTitolo: "Convertește Ofert",
      convertiBulkDesc: "Ești sigur că vrei să convertești ofertele selectate în comenzi? Vor trece la statusul \"De Confirmat\".",
      eliminaBulkTitolo: "Șterge Ofert",
      eliminaBulkDesc: "Această acțiune este ireversibilă. Vor fi șterse permanent ofertele selectate și toate liniile de comandă asociate.",
    },
    pagamenti: {
      titolo: "Plăți",
      nuovoPagamento: "Plată Nouă",
      totaleIncassato: "Total Încasat",
      pagamenti: "plăți",
      mediaImporto: "Medie Sumă",
      perPagemento: "per plată",
      numPagementi: "Nr. Plăți",
      totaliPeriodo: "totale în perioadă",
      metodoUsato: "Metodă Cea Mai Utilizată",
      piuPopolare: "mai populară",
      tabella: "Tabel",
      timeline: "Cronologie",
      esporta: "Exportă",
      data: "Dată",
      dealer: "Distribuitor",
      tipo: "Tip",
      metodo: "Metodă",
      importo: "Sumă",
      riferimento: "Referință",
      nessunoTrovato: "Nu s-au găsit plăți",
      confermaEliminazione: "Confirmă ștergerea",
      confermaEliminazioneDesc: "Ești sigur că vrei să ștergi această plată? Acțiunea nu poate fi anulată.",
      caricamento: "Se încarcă plățile...",
    },
    paymentDetail: {
      titolo: "Plată #",
      registratoIl: "Înregistrată la",
      dettagliPagemento: "Detalii Plată",
      tipoPagemento: "Tip Plată",
      importo: "Sumă",
      dataPagemento: "Data Plății",
      metodo: "Metodă",
      riferimento: "Referință",
      idPagemento: "ID Plată",
      ricevuta: "Chitanță",
      visualizza: "Vizualizează",
      scarica: "Descarcă",
      ordine: "Comandă #",
      statoOrdine: "Status Comandă",
      importoTotale: "Sumă Totală",
      importoPagato: "Sumă Plătită",
      daPagare: "De Plătit",
      progressoPagemento: "Progres Plată",
      visualizzaOrdine: "Vizualizează Comanda Completă",
      nonTrovato: "Plată negăsită",
      erroreCaricamento: "Eroare la încărcarea plății.",
    },
    analytics: {
      titolo: "Dashboard Analitică Unificată",
      desc: "Analiză completă a comenzilor, plăților și performanței distribuitorilor",
      ultimi3: "Ultimele 3 luni",
      ultimi6: "Ultimele 6 luni",
      ultimoAnno: "Ultimul an",
      periodo: "Perioadă",
      tuttiDealer: "Toți distribuitorii",
      resetFiltri: "Resetează Filtre",
      ordiniTotali: "Total Comenzi",
      ricaviTotali: "Venituri Totale",
      pagamentiIncassati: "Plăți Încasate",
      ticketMedio: "Valoare Medie",
      exportCompletato: "Export finalizat",
      exportDesc: "Datele analitice au fost exportate cu succes",
      metrica: "Metrică",
      valore: "Valoare",
      tassoConversione: "Rata de Conversie",
      errore: "Imposibil de încărcat datele analitice. Verificați conexiunea și încercați din nou.",
    },
    assistenza: {
      titolo: "Asistență",
      desc: "Gestionează tichetele de asistență ale distribuitorilor",
      aperti: "Deschise",
      inGestione: "În Gestionare",
      chiusi: "Închise",
      urgenti: "Urgente/Înalte",
      cercaOggetto: "Caută după subiect...",
      tuttiStati: "Toate stările",
      tuttePriorita: "Toate prioritățile",
      azzeraFiltri: "Resetează filtre",
      oggetto: "Subiect",
      ordine: "Comandă",
      rivenditore: "Distribuitor",
      priorita: "Prioritate",
      stato: "Status",
      data: "Dată",
      nessunoTrovato: "Niciun tichet găsit.",
      primiCento: "Afișate primele 100 tichete. Folosiți filtrele pentru a rafina căutarea.",
    },
    dealerAssistenza: {
      titolo: "Asistență",
      aperti: "deschise",
      desc: "Tichete de asistență pentru comenzile tale",
      tuttiStati: "Toate stările",
      azzeraFiltri: "Resetează filtre",
      oggetto: "Subiect",
      ordine: "Comandă",
      priorita: "Prioritate",
      stato: "Status",
      data: "Dată",
      nessunoTrovato: "Nu s-au găsit tichete de asistență.",
    },
    impostazioni: {
      titolo: "Setări",
      desc: "Configurați sistemul, gestionați utilizatorii și personalizați aplicația",
      utentiRuoli: "Utilizatori și Roluri",
      utenti: "Utilizatori",
      numerazione: "Numerotare",
      num: "Nr.",
      templatePdf: "Șablon PDF",
      pdf: "PDF",
      integrazioni: "Integrări",
      integ: "Integ.",
      auditLog: "Jurnal Audit",
      audit: "Audit",
    },
    dealerAreaLayout: {
      vistaRivenditore: "Vedere Distribuitor",
      staiVisualizzando: "Vizualizezi ca:",
      esciArea: "Ieși din Zonă",
    },
    smartDashboard: {
      accessoNegato: "Acces Refuzat",
      noPermessi: "Nu ai permisiunile necesare pentru a accesa această secțiune.",
    },
  },
};

export const translations: Record<Lang, Translations> = { it, ro };
