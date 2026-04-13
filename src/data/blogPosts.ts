export interface BlogPost {
  slug: string;
  lang: "it" | "ro";
  title: string;
  description: string;       // meta description ≤155 char
  date: string;              // ISO YYYY-MM-DD
  category: string;
  readingTime: number;       // minuti
  heroImage?: string;
  content: string;           // markdown-like HTML string
}

// ─────────────────────────────────────────────────────────────────────────────
// ARTICOLI ITALIANI
// ─────────────────────────────────────────────────────────────────────────────
const itPosts: BlogPost[] = [
  {
    slug: "finestre-pvc-profilo-tedesco-guida-completa",
    lang: "it",
    title: "Finestre in PVC con Profilo Tedesco: Guida Completa 2026",
    description: "Cosa sono le finestre PVC con profilo tedesco? Vantaggi, camere, certificazioni e perché costano meno di quanto pensi. Guida aggiornata 2026.",
    date: "2026-03-10",
    category: "Guide",
    readingTime: 8,
    content: `
<h2>Perché scegliere finestre in PVC con profilo tedesco?</h2>
<p>Quando senti parlare di <strong>finestre in PVC con profilo tedesco</strong>, stai parlando di serramenti prodotti con profili estrusi in Germania — o secondo standard tedeschi — che rispettano le normative più severe d'Europa per isolamento termico e acustico.</p>
<p>Il profilo tedesco non è un dettaglio di marketing: è la garanzia che il materiale ha superato test di resistenza, durata e prestazioni energetiche molto più rigidi rispetto ai profili prodotti in altri paesi.</p>

<h2>Quante camere ha un buon profilo PVC?</h2>
<p>Il numero di camere (le sezioni interne del profilo) determina le prestazioni termiche della finestra. Ecco cosa devi sapere:</p>
<ul>
  <li><strong>3 camere</strong> — standard base, adatto a climi temperati</li>
  <li><strong>5 camere</strong> — ottimo rapporto qualità/prezzo, consigliato per la maggior parte delle abitazioni italiane e rumene</li>
  <li><strong>6-7 camere</strong> — massimo isolamento, indicato per case passive e climi rigidi</li>
</ul>
<p>I profili della gamma <a href="/prodotti-pubblico">ThermoDMR</a> utilizzano 5 camere come standard, con opzione 6 camere per la linea DMR Passive.</p>

<h2>Valore Uw: il numero che devi conoscere</h2>
<p>Il coefficiente di trasmittanza termica <strong>Uw</strong> misura quanta energia termica passa attraverso la finestra. Più è basso, meglio isola:</p>
<ul>
  <li>Uw ≤ 1,8 W/m²K — requisito minimo normativa italiana (decreto riqualificazione energetica)</li>
  <li>Uw ≤ 1,4 W/m²K — standard consigliato per nuove costruzioni</li>
  <li>Uw ≤ 0,8 W/m²K — casa passiva certificata</li>
</ul>
<p>Le finestre DMR Confort e DMR Domus raggiungono Uw da 1,1 a 1,4 W/m²K. La DMR Passive scende sotto 0,8 W/m²K con triplo vetro.</p>

<h2>Isolamento acustico: i dB che cambiano la vita</h2>
<p>L'indice di abbattimento acustico Rw misura quanto rumore blocca la finestra. Differenza pratica:</p>
<ul>
  <li>Rw 30 dB — percepisce metà del rumore esterno</li>
  <li>Rw 38 dB — adatto a zone semi-urbane (standard ThermoDMR)</li>
  <li>Rw 44+ dB — indicato per zone ad alta intensità di traffico</li>
</ul>

<h2>Quanto durano le finestre in PVC?</h2>
<p>Un profilo PVC di qualità, con la giusta manutenzione, dura <strong>40-50 anni</strong>. Non arrugginisce, non marcisce, non si screpola. La pulizia richiede solo acqua e detergente neutro — niente olio, vernice o prodotti aggressivi.</p>
<p>ThermoDMR offre <strong>garanzia 15 anni</strong> su tutti i serramenti della gamma, con copertura su profilo, guarnizioni e ferramenta.</p>

<h2>Produzione diretta: cosa cambia per il prezzo?</h2>
<p>ThermoDMR produce direttamente i propri serramenti — nessun intermediario, nessun rivenditore di secondo livello tra fabbrica e cliente finale. Questo significa:</p>
<ul>
  <li>Prezzi più competitivi rispetto ai distributori tradizionali</li>
  <li>Tempi di consegna certi (mediamente 2-6 settimane)</li>
  <li>Personalizzazioni disponibili senza costi aggiuntivi elevati</li>
  <li>Assistenza tecnica diretta dal produttore</li>
</ul>

<h2>Sostituire le finestre: quando conviene davvero?</h2>
<p>Se le tue finestre hanno più di 20 anni, è probabile che tu stia pagando il 20-30% in più di energia per riscaldamento e raffrescamento. Il risparmio annuo con finestre in Classe A può coprire il costo dell'investimento in 7-10 anni, spesso meno se si accedono agli incentivi fiscali (detrazione 50% Irpef per ristrutturazioni).</p>

<h2>Come richiedere un preventivo ThermoDMR</h2>
<p>Compila il <a href="/contatti">modulo di contatto</a> con le misure delle aperture e ricevi un preventivo gratuito entro 24 ore. Per i rivenditori, è disponibile un programma dedicato con prezzi di fabbrica e supporto tecnico: <a href="/diventa-rivenditore">scopri come diventare rivenditore ThermoDMR</a>.</p>
    `.trim(),
  },

  {
    slug: "risparmio-energetico-finestre-pvc-quanto-si-risparmia",
    lang: "it",
    title: "Risparmio Energetico con Finestre in PVC: Cifre Reali",
    description: "Quanto si risparmia in bolletta sostituendo le finestre con PVC Classe A? Calcoli reali, percentuali e tempi di ritorno dell'investimento.",
    date: "2026-03-20",
    category: "Risparmio Energetico",
    readingTime: 6,
    content: `
<h2>Il problema nascosto delle finestre vecchie</h2>
<p>Le finestre rappresentano il 25-35% delle dispersioni termiche di un appartamento medio. Se hai ancora i serramenti originali degli anni '80 o '90, stai letteralmente riscaldando la strada — e pagandola in bolletta ogni mese.</p>
<p>Con i prezzi dell'energia degli ultimi anni, una famiglia italiana in un appartamento di 100 m² può spendere tra <strong>€200 e €400 all'anno in più</strong> del necessario solo per compensare le finestre inefficienti.</p>

<h2>Classe energetica delle finestre: cosa significa</h2>
<p>In Italia le finestre sono classificate dalla A+ (massima efficienza) alla G (minima). La classificazione tiene conto di tre parametri:</p>
<ul>
  <li><strong>Ug</strong> — trasmittanza del vetro</li>
  <li><strong>Uf</strong> — trasmittanza del telaio</li>
  <li><strong>Uw</strong> — trasmittanza totale della finestra</li>
</ul>
<p>Le finestre <a href="/prodotti/dmr-confort">DMR Confort</a> e <a href="/prodotti/dmr-domus">DMR Domus</a> si collocano in <strong>Classe A</strong>, mentre la <a href="/prodotti/dmr-passive">DMR Passive</a> raggiunge la <strong>Classe A+</strong>.</p>

<h2>Quanti gradi di differenza fa una finestra nuova?</h2>
<p>Una finestra monovetra anni '80 ha un valore Uw di circa 5,0-6,0 W/m²K. Una finestra in PVC doppio vetro basso-emissivo come quelle ThermoDMR scende a 1,1-1,4 W/m²K: <strong>quattro volte più isolante</strong>.</p>
<p>In termini pratici, con le finestre giuste la temperatura superficiale interna del vetro in inverno passa da circa 5°C a 17°C. Niente più condensa, niente più correnti d'aria fredda, niente più muffe sugli angoli.</p>

<h2>Calcolo del risparmio: esempio reale</h2>
<p>Appartamento tipo: 80 m², 8 finestre standard (1,2 × 1,4 m), zona climatica D (Milano, Bologna, Firenze).</p>
<table>
  <thead><tr><th>Scenario</th><th>Dispersione stimata</th><th>Costo annuo extra</th></tr></thead>
  <tbody>
    <tr><td>Finestre anni '80 (Uw 5,5)</td><td>Alta</td><td>+€350/anno</td></tr>
    <tr><td>Finestre PVC doppio vetro (Uw 1,3)</td><td>Bassa</td><td>baseline</td></tr>
    <tr><td>Finestre PVC triplo vetro (Uw 0,8)</td><td>Minima</td><td>-€80/anno vs doppio vetro</td></tr>
  </tbody>
</table>
<p><em>Stima basata su consumo medio riscaldamento 100 kWh/m²anno, costo gas 0,12 €/kWh. I valori reali variano in base all'isolamento dell'edificio, zona climatica e abitudini di utilizzo.</em></p>

<h2>Incentivi fiscali 2026</h2>
<p>La sostituzione di finestre e infissi rientra nel <strong>Bonus Ristrutturazioni (50% Irpef)</strong>, con massimale di spesa di €96.000 per unità abitativa. La detrazione è ripartita in 10 anni. Per accedere al bonus è necessario che le nuove finestre rispettino i requisiti minimi di trasmittanza previsti dal decreto del Ministero dell'Ambiente.</p>
<p>Le finestre ThermoDMR rispettano tutti i requisiti richiesti. Per informazioni sui documenti necessari per accedere al bonus, <a href="/contatti">contattaci</a>.</p>

<h2>Tempo di ritorno dell'investimento</h2>
<p>Con un risparmio medio di €300 all'anno e considerando la detrazione 50% spalmata su 10 anni, il costo netto di sostituzione di 8 finestre si ammortizza in <strong>5-8 anni</strong> — dopodiché è puro risparmio, per i successivi 30-40 anni di vita utile del serramento.</p>

<h2>Vuoi sapere quanto risparmi tu?</h2>
<p>Ogni abitazione è diversa. <a href="/contatti">Richiedi una consulenza gratuita</a>: ti aiutiamo a calcolare il risparmio potenziale specifico per la tua casa e a scegliere la gamma più adatta al tuo budget.</p>
    `.trim(),
  },

  {
    slug: "tapparelle-coibentate-vs-tradizionali-differenze",
    lang: "it",
    title: "Tapparelle Coibentate vs Tradizionali: Differenze e Quando Conviene",
    description: "Tapparelle coibentate o normali? Differenze tecniche, risparmio energetico reale e quando vale la pena spendere di più. Guida pratica ThermoDMR.",
    date: "2026-04-01",
    category: "Prodotti",
    readingTime: 5,
    content: `
<h2>Cos'è una tapparella coibentata?</h2>
<p>Una <strong>tapparella coibentata</strong> (o tapparella termoisolante) è un avvolgibile con le stecche riempite di schiuma poliuretanica espansa — lo stesso materiale usato nelle pareti isolate. Le stecche normali sono invece cave, quindi conducono il freddo (e il calore estivo) direttamente nella stanza.</p>
<p>La differenza in termini di isolamento è significativa: una tapparella coibentata può ridurre la dispersione termica attraverso l'avvolgibile del <strong>60-70%</strong> rispetto a una tapparella standard.</p>

<h2>Quanti tipi di tapparelle coibentate esistono?</h2>
<p>Le <a href="/prodotti/tapparelle">tapparelle ThermoDMR</a> sono disponibili in due varianti principali:</p>
<ul>
  <li><strong>Alluminio coibentato</strong> — stecche da 37 mm o 55 mm riempite di PU, ottimo rapporto qualità/prezzo, adatte per la maggior parte delle finestre residenziali</li>
  <li><strong>PVC rinforzato</strong> — più leggere, resistenti agli urti, ideali per finestre piccole o medie</li>
</ul>
<p>La larghezza delle stecche (37 o 55 mm) influisce sull'isolamento: le stecche più spesse contengono più materiale coibentante e isolano meglio.</p>

<h2>Oscuramento: tapparelle coibentate vs tende</h2>
<p>Le tapparelle — coibentate o meno — garantiscono un oscuramento totale che nessuna tenda può replicare. Per le camere da letto, gli uffici domestici e le sale proiezione è una differenza sostanziale in termini di qualità del sonno e comfort visivo.</p>

<h2>Sicurezza anti-intrusione</h2>
<p>Le stecche riempite di schiuma poliuretanica sono strutturalmente più rigide e resistenti allo scasso rispetto alle stecche cave. Abbinate a una guida rinforzata e al sistema di bloccaggio, le tapparelle coibentate ThermoDMR offrono una barriera anti-intrusione significativamente superiore.</p>

<h2>Quanto dura una tapparella coibentata?</h2>
<p>Con la corretta manutenzione (pulizia periodica delle guide, ingrassaggio del meccanismo avvolgitore) una tapparella coibentata in alluminio dura <strong>20-25 anni</strong>. Il PU interno non si deteriora nel tempo e non perde le proprietà isolanti.</p>

<h2>Costo: quanto in più rispetto alle tapparelle normali?</h2>
<p>Il costo aggiuntivo di una tapparella coibentata rispetto a una standard è generalmente del 25-40%. Considerando il risparmio energetico e la maggiore durata, il break-even si raggiunge in 3-5 anni.</p>

<h2>Quando NON ha senso scegliere le coibentate</h2>
<p>Se l'edificio è privo di riscaldamento o refrigerazione attiva (magazzini, rimesse), o se le finestre sono già esposte a su di un muro non isolato, i benefici energetici delle tapparelle coibentate si riducono significativamente.</p>
<p>Hai dubbi su quale soluzione fa per te? <a href="/contatti">Contattaci</a> — ti aiutiamo a fare la scelta giusta senza spendere più del necessario.</p>
    `.trim(),
  },

  // ── NUOVI 5 ARTICOLI IT ──────────────────────────────────────────────────

  {
    slug: "finestre-pvc-prezzi-2025",
    lang: "it",
    title: "Finestre PVC Prezzi 2026: Quanto Costano Davvero e Come Non Pagare Troppo",
    description: "Prezzi reali delle finestre in PVC nel 2026: dal doppio al triplo vetro. Cosa incide sul costo, come confrontare preventivi e risparmiare senza rinunciare alla qualità.",
    date: "2026-04-07",
    category: "Prezzi & Preventivi",
    readingTime: 12,
    content: `
<h2>Perché i prezzi delle finestre PVC sono così diversi?</h2>
<p>Cerchi <strong>finestre PVC prezzi 2026</strong> e trovi preventivi che vanno da €150 a €900 per finestra. Come è possibile una differenza del genere? La risposta sta in quattro variabili: qualità del profilo, tipo di vetro, ferramenta e provenienza della produzione.</p>
<p>Capire queste variabili ti permette di confrontare preventivi in modo intelligente — e di non cadere nella trappola del prezzo basso che nasconde costi di manutenzione alti nel lungo periodo.</p>

<h2>Fattori che determinano il prezzo di una finestra PVC</h2>
<h3>1. Il profilo: camere e spessore</h3>
<p>Il profilo PVC è la struttura portante della finestra. Un profilo a 5 camere offre prestazioni termiche nettamente superiori a un profilo a 3 camere, a un costo marginalmente più alto. La differenza di prezzo tra un profilo 3 camere e uno 5 camere è spesso di soli €30-50 a finestra — un investimento che si ripaga in 2-3 anni di bollette.</p>
<p>ThermoDMR utilizza profili tedeschi a 5 camere come standard su tutta la gamma, con opzione 6 camere per la linea DMR Passive.</p>

<h3>2. Il vetro: doppio o triplo?</h3>
<p>Il vetrocamera (o vetro isolante) è dove si gioca la partita energetica. Le opzioni principali per il 2026:</p>
<ul>
  <li><strong>Doppio vetro 4/16/4 con gas argon e coating low-e</strong> — Ug ≈ 1,0 W/m²K — standard ThermoDMR, ottimo per zone climatiche B-D</li>
  <li><strong>Doppio vetro 4/20/4 con krypton</strong> — Ug ≈ 0,7 W/m²K — prestazioni da triplo vetro a costo inferiore</li>
  <li><strong>Triplo vetro 4/12/4/12/4</strong> — Ug ≈ 0,5 W/m²K — ideale per zone climatiche E-F (Nord Italia, Appennini)</li>
</ul>

<h3>3. La ferramenta</h3>
<p>Una ferramenta di qualità (Roto, Maco, Siegenia) costa di più ma garantisce apertura e chiusura precisa per decenni. Le ferramenta economiche si usurano rapidamente, richiedendo regolazioni frequenti e sostituzione nel giro di 7-10 anni.</p>

<h3>4. Produzione diretta vs intermediari</h3>
<p>Un serramento acquistato da un rivenditore ha già subito due o tre margini di markup. Acquistare direttamente dal produttore — come ThermoDMR — elimina questi intermediari e riduce il prezzo finale del 20-35%.</p>

<h2>Prezzi indicativi finestre PVC 2026 (per misura standard 120×140 cm)</h2>
<table>
  <thead>
    <tr><th>Tipologia</th><th>Fascia entry</th><th>Fascia media</th><th>Fascia premium</th></tr>
  </thead>
  <tbody>
    <tr><td>Doppio vetro, profilo 3 camere</td><td>€180-250</td><td>€280-380</td><td>€400-520</td></tr>
    <tr><td>Doppio vetro low-e, profilo 5 camere</td><td>€260-340</td><td>€360-480</td><td>€500-680</td></tr>
    <tr><td>Triplo vetro, profilo 6 camere</td><td>€400-500</td><td>€520-680</td><td>€720-950</td></tr>
  </tbody>
</table>
<p><em>Prezzi IVA esclusa, posa non inclusa. I prezzi variano in base a dimensioni, apertura (vasistas, scorrevole, anta-ribalta) e personalizzazioni cromatiche.</em></p>

<h2>Costo della posa in opera</h2>
<p>La manodopera per la posa di una finestra standard varia tra €80 e €180 per finestra, in base alla complessità dell'intervento e alla zona geografica. In alcune regioni del Sud Italia i costi di posa sono mediamente inferiori del 20-30% rispetto al Nord.</p>
<p>ThermoDMR può indicarti installatori certificati nella tua area geografica: <a href="/contatti">contattaci</a>.</p>

<h2>Come leggere (e confrontare) un preventivo</h2>
<p>Quando ricevi più preventivi per finestre PVC, verifica sempre che includano:</p>
<ol>
  <li><strong>Numero di camere del profilo</strong> — almeno 5</li>
  <li><strong>Marchio del profilo</strong> — i profili tedeschi (Rehau, Veka, Aluplast, Gealan) sono verificabili</li>
  <li><strong>Valore Uw della finestra completa</strong> — non solo del vetro</li>
  <li><strong>Tipo di vetrocamera</strong> — gas argon o krypton, coating low-e</li>
  <li><strong>Marchio della ferramenta</strong></li>
  <li><strong>Garanzia</strong> — minimo 5 anni; ThermoDMR offre 15 anni</li>
</ol>
<p>Un preventivo che non specifica questi dati nasconde quasi sempre materiali di qualità inferiore.</p>

<h2>Finestre PVC personalizzate: cosa cambia sul prezzo</h2>
<p>I colori speciali (effetto legno, antracite RAL 7016, blu notte) aggiungono generalmente il 15-25% al prezzo base. Le dimensioni fuori standard — finestre molto grandi, portefinestre panoramiche — richiedono profili e rinforzi aggiuntivi con un incremento del 20-40%.</p>

<h2>Vale la pena comprare online?</h2>
<p>I configuratori online per finestre PVC offrono prezzi competitivi, ma presentano rischi: difficoltà nel prendere le misure correttamente, problemi di garanzia post-vendita, assistenza tecnica assente. Per un'abitazione privata, il rapporto diretto con un produttore — con sopralluogo e misurazione professionale — rimane la scelta più sicura.</p>

<h2>Quanto costa sostituire tutte le finestre di un appartamento?</h2>
<p>Appartamento tipo 80 m² con 6 finestre e 2 portefinestre:</p>
<ul>
  <li><strong>Fascia media (doppio vetro low-e, 5 camere)</strong>: €2.800-4.200 finestre + €800-1.400 posa = €3.600-5.600 totale</li>
  <li><strong>Fascia premium (triplo vetro, 6 camere)</strong>: €4.500-6.500 finestre + €800-1.400 posa = €5.300-7.900 totale</li>
</ul>
<p>Con la <strong>detrazione Irpef 50%</strong> (Bonus Ristrutturazioni), il costo netto si dimezza, suddiviso in 10 rate annuali.</p>

<h2>Richiedi il tuo preventivo ThermoDMR</h2>
<p>Mandaci le misure delle tue aperture e il piano della casa: ti prepariamo un preventivo dettagliato con materiali specificati, valore Uw garantito e tempi di consegna certi. <a href="/contatti">Preventivo gratuito in 24 ore →</a></p>
    `.trim(),
  },

  {
    slug: "bonus-finestre-2025-detrazione-fiscale",
    lang: "it",
    title: "Bonus Finestre 2026: Detrazione 50% Irpef — Come Funziona e Come Ottenerla",
    description: "Guida completa al Bonus Finestre 2026: detrazione 50% Irpef per sostituzione serramenti. Requisiti, documenti, procedure e massimale di spesa aggiornati.",
    date: "2026-04-05",
    category: "Incentivi & Bonus",
    readingTime: 10,
    content: `
<h2>Cos'è il Bonus Finestre 2026?</h2>
<p>Il <strong>Bonus Finestre 2026</strong> è un incentivo fiscale che permette di detrarre il <strong>50% della spesa</strong> sostenuta per la sostituzione di finestre, portefinestre e infissi. Rientra nel perimetro del Bonus Ristrutturazioni (art. 16-bis del TUIR) ed è confermato anche per l'anno in corso dalla Legge di Bilancio.</p>
<p>La detrazione del 50% si applica su un massimale di spesa di <strong>€96.000 per unità immobiliare</strong> ed è ripartita in <strong>10 quote annuali uguali</strong>.</p>

<h2>Chi può accedere al Bonus Finestre?</h2>
<p>Possono accedere al bonus:</p>
<ul>
  <li>Proprietari dell'immobile</li>
  <li>Nudi proprietari</li>
  <li>Titolari di diritti reali di godimento (usufrutto, uso, abitazione)</li>
  <li>Locatari e comodatari (con consenso del proprietario)</li>
  <li>Familiari conviventi del possessore</li>
  <li>Soci di cooperative divise e indivise</li>
  <li>Imprenditori individuali (per immobili non strumentali)</li>
</ul>
<p>Il bonus si applica sia agli immobili ad uso abitativo che alle parti comuni degli edifici condominiali.</p>

<h2>Quali serramenti rientrano nel bonus?</h2>
<p>Per accedere alla detrazione, i nuovi serramenti devono rispettare i <strong>requisiti minimi di trasmittanza termica</strong> previsti dal D.M. Requisiti Minimi del MISE. I valori variano in base alla zona climatica:</p>
<table>
  <thead><tr><th>Zona climatica</th><th>Città di riferimento</th><th>Uw max richiesto</th></tr></thead>
  <tbody>
    <tr><td>A e B</td><td>Agrigento, Palermo, Napoli</td><td>≤ 3,0 W/m²K</td></tr>
    <tr><td>C</td><td>Roma, Firenze, Genova</td><td>≤ 2,0 W/m²K</td></tr>
    <tr><td>D</td><td>Bologna, Milano, Torino</td><td>≤ 1,8 W/m²K</td></tr>
    <tr><td>E</td><td>Venezia, Trento, Bolzano</td><td>≤ 1,4 W/m²K</td></tr>
    <tr><td>F</td><td>Cuneo, Aosta, Sondrio</td><td>≤ 1,0 W/m²K</td></tr>
  </tbody>
</table>
<p>Tutte le finestre ThermoDMR rispettano i requisiti per le zone climatiche C, D, E e F (le più restrittive). La scheda tecnica con i valori Uw certificati è fornita con ogni ordine.</p>

<h2>Documenti necessari per il Bonus Finestre</h2>
<p>Per accedere correttamente al bonus devi raccogliere:</p>
<ol>
  <li><strong>Fattura del fornitore</strong> con descrizione specifica dei serramenti e valore Uw</li>
  <li><strong>Bonifico parlante</strong> — intestato al beneficiario della detrazione, con causale specifica ("Detrazione 50% art. 16-bis DPR 917/86")</li>
  <li><strong>Scheda tecnica del prodotto</strong> con certificazione del valore Uw</li>
  <li><strong>Asseverazione del tecnico</strong> (non sempre richiesta per interventi di sola sostituzione)</li>
  <li><strong>Comunicazione preventiva alla ASL</strong> (solo se obbligatoria per sicurezza lavori)</li>
</ol>
<p><strong>Attenzione al bonifico parlante:</strong> deve riportare il codice fiscale del beneficiario, il codice fiscale del fornitore e la dicitura di legge. Un bonifico ordinario non dà diritto alla detrazione.</p>

<h2>Procedura passo passo</h2>
<ol>
  <li>Richiedi preventivo e verifica che i serramenti rispettino i requisiti Uw per la tua zona climatica</li>
  <li>Effettua il pagamento tramite <strong>bonifico bancario/postale parlante</strong></li>
  <li>Conserva fattura, scheda tecnica e bonifico</li>
  <li>Inserisci la spesa nella dichiarazione dei redditi (Modello 730 o Unico) nella sezione "Spese per recupero del patrimonio edilizio"</li>
  <li>La detrazione del 50% viene erogata in 10 rate annuali dal primo anno</li>
</ol>

<h2>Esempio pratico: quanto risparmio davvero?</h2>
<p>Spesa totale per sostituzione di 8 finestre ThermoDMR DMR Confort: <strong>€6.000 (IVA inclusa)</strong></p>
<ul>
  <li>Detrazione totale: 50% × €6.000 = <strong>€3.000</strong></li>
  <li>Rata annuale Irpef: €3.000 ÷ 10 = <strong>€300/anno</strong></li>
  <li>Costo netto effettivo: €6.000 - €3.000 = <strong>€3.000</strong></li>
</ul>
<p>Il risparmio in bolletta aggiuntivo (stimato €250-350/anno) porta al break-even totale in 5-6 anni.</p>

<h2>Bonus Finestre vs Ecobonus: qual è la differenza?</h2>
<p>La sostituzione di finestre può rientrare anche nell'<strong>Ecobonus (art. 14 D.L. 63/2013)</strong>, che offre una detrazione del 50% ma con requisiti tecnici aggiuntivi. Nella maggior parte dei casi pratici, il Bonus Ristrutturazioni 50% è più accessibile perché non richiede l'asseverazione di un tecnico abilitato né la trasmissione all'ENEA.</p>
<p>Per interventi di riqualificazione energetica più ampi (cappotto termico + finestre + caldaia), l'Ecobonus può arrivare al 65% o superiore: in quel caso vale la pena coinvolgere un tecnico che ottimizzi il pacchetto di incentivi.</p>

<h2>Il bonus è cumulabile con altri incentivi?</h2>
<p>Il Bonus Ristrutturazioni 50% non è cumulabile con il Superbonus (quando attivo) sulla stessa unità immobiliare. È invece compatibile con:</p>
<ul>
  <li>Bonus Mobili (per arredamento dei locali ristrutturati)</li>
  <li>Bonus Barriere Architettoniche (se l'intervento include anche questo aspetto)</li>
  <li>Agevolazioni regionali (variano per regione)</li>
</ul>

<h2>ThermoDMR e il Bonus Finestre: come ti supportiamo</h2>
<p>Con ogni ordine ThermoDMR forniamo:</p>
<ul>
  <li>Fattura dettagliata con descrizione tecnica e valore Uw certificato</li>
  <li>Scheda tecnica del prodotto idonea per la pratica di detrazione</li>
  <li>Supporto per l'identificazione della zona climatica dell'immobile</li>
</ul>
<p><a href="/contatti">Contattaci per un preventivo gratuito</a> — ti guidiamo in ogni fase, dalla scelta del serramento alla documentazione per la detrazione.</p>
    `.trim(),
  },

  {
    slug: "doppio-vetro-vs-triplo-vetro-quale-scegliere",
    lang: "it",
    title: "Doppio Vetro vs Triplo Vetro: Quale Scegliere nel 2026?",
    description: "Confronto tecnico tra finestre a doppio e triplo vetro: differenze di isolamento, costi, peso e quando vale davvero la pena scegliere il triplo. Guida 2026.",
    date: "2026-04-03",
    category: "Guide Tecniche",
    readingTime: 10,
    content: `
<h2>La domanda che si pone quasi ogni committente</h2>
<p>Quando si acquistano finestre nuove, la scelta tra <strong>doppio vetro e triplo vetro</strong> è una delle più dibattute. Il triplo vetro costa di più, ma isola di più. Vale la pena spendere la differenza? La risposta dipende dalla tua zona climatica, dal tipo di edificio e da quanto vuoi investire oggi per risparmiare domani.</p>

<h2>Come funziona un vetrocamera</h2>
<p>Un vetrocamera (o vetro isolante) è composto da due o tre lastre di vetro separate da uno spazio riempito con gas nobile (argon o krypton) e sigillate perimetralmente. Il principio è semplice: l'aria ferma non conduce calore; il gas nobile conduce ancora meno.</p>
<ul>
  <li><strong>Doppio vetro</strong>: 2 lastre + 1 intercapedine gas</li>
  <li><strong>Triplo vetro</strong>: 3 lastre + 2 intercapedini gas</li>
</ul>
<p>Il coating <strong>low-emissivity (low-e)</strong> è un rivestimento trasparente che riflette il calore verso l'interno in inverno e verso l'esterno in estate. È presente su tutti i vetrocamera ThermoDMR indipendentemente dal numero di lastre.</p>

<h2>Valori Ug a confronto</h2>
<table>
  <thead><tr><th>Tipo vetrocamera</th><th>Composizione tipica</th><th>Gas</th><th>Ug (W/m²K)</th></tr></thead>
  <tbody>
    <tr><td>Doppio vetro standard</td><td>4/16/4</td><td>Argon</td><td>1,0 – 1,1</td></tr>
    <tr><td>Doppio vetro high-perf</td><td>4/20/4</td><td>Krypton</td><td>0,7 – 0,8</td></tr>
    <tr><td>Triplo vetro standard</td><td>4/12/4/12/4</td><td>Argon</td><td>0,6 – 0,7</td></tr>
    <tr><td>Triplo vetro premium</td><td>4/14/4/14/4</td><td>Krypton</td><td>0,4 – 0,5</td></tr>
  </tbody>
</table>
<p>Il valore Ug è del vetro da solo. Il valore Uw della finestra completa (vetro + telaio) è sempre leggermente più alto — per la linea DMR Passive con triplo vetro e profilo 6 camere, il valore Uw raggiunge 0,78 W/m²K.</p>

<h2>Isolamento acustico: chi vince?</h2>
<p>In termini acustici, il triplo vetro non è automaticamente superiore al doppio vetro. L'isolamento acustico dipende soprattutto dall'asimmetria degli spessori delle lastre (es. 4/16/6 invece di 4/16/4) e dal tipo di vetro (stratificato vs temperato).</p>
<p>Per una buona prestazione acustica, un doppio vetro asimmetrico stratificato (es. 6.4.1/16/4) può essere più efficace di un triplo vetro standard. ThermoDMR offre combinazioni ottimizzate per chi ha esigenze acustiche specifiche — <a href="/contatti">chiedi una consulenza dedicata</a>.</p>

<h2>Peso: un fattore spesso sottovalutato</h2>
<p>Un vetrocamera triplo pesa circa il 50% in più di un doppio per la stessa superficie. Questo ha implicazioni pratiche:</p>
<ul>
  <li>Profilo più robusto e ferramenta più pesante (già inclusi nella linea DMR Passive)</li>
  <li>Maggiore sollecitazione sui cardini — richiedono regolazione periodica</li>
  <li>Nelle finestre molto grandi (>2,5 m²), il triplo vetro richiede profili rinforzati specifici</li>
</ul>

<h2>Condensa: dove è più frequente?</h2>
<p>La condensa sul vetro interno è quasi eliminata con entrambe le soluzioni, se il serramento è installato correttamente. Con temperature esterne estreme (-15°C e oltre), le finestre a doppio vetro possono ancora mostrare condensa marginale sul bordo del vetro; il triplo vetro la elimina quasi completamente.</p>
<p>La condensa esterna (sul lato esterno del vetro) indica invece che il vetro è molto ben isolante — è un segnale positivo, non un difetto.</p>

<h2>Differenza di prezzo: quanto in più costa il triplo vetro?</h2>
<p>Per una finestra standard 120×140 cm, la differenza di costo tra doppio e triplo vetro (a parità di telaio) è generalmente di <strong>€80-150 per finestra</strong>. Sull'intera abitazione (8 finestre + 2 portefinestre), la differenza totale è di <strong>€800-1.500</strong>.</p>

<h2>Quando scegliere il doppio vetro</h2>
<ul>
  <li>Zone climatiche A, B e C (Sud Italia, Toscana, Liguria, Lazio)</li>
  <li>Budget limitato che privilegia numero di finestre rispetto alla singola prestazione</li>
  <li>Edifici con già buona coibentazione di pareti e tetto</li>
  <li>Ristrutturazioni parziali dove il budget va ottimizzato</li>
</ul>

<h2>Quando scegliere il triplo vetro</h2>
<ul>
  <li>Zone climatiche E e F (Pianura Padana, Alpi, Appennino settentrionale)</li>
  <li>Case passive o edifici a basso consumo energetico</li>
  <li>Quando si vuole massimizzare il comfort invernale e ridurre le correnti d'aria</li>
  <li>Ambienti con esigenze acustiche elevate (con vetrocamera asimmetrico)</li>
  <li>Se si intende accedere all'Ecobonus con certificazione casa passiva</li>
</ul>

<h2>La scelta ThermoDMR</h2>
<p>Le finestre <a href="/prodotti-pubblico">ThermoDMR</a> sono disponibili con doppio vetro (linee DMR Confort e DMR Domus) e triplo vetro (linea DMR Passive). Tutte includono coating low-e e gas argon di serie; l'upgrade a krypton è disponibile su richiesta.</p>
<p>Non sai quale scegliere per la tua abitazione? <a href="/contatti">Richiedi una consulenza gratuita</a>: analizziamo zona climatica, orientamento e budget per aiutarti a fare la scelta ottimale.</p>
    `.trim(),
  },

  {
    slug: "sostituzione-finestre-ristrutturazione-guida",
    lang: "it",
    title: "Sostituzione Finestre in Ristrutturazione: Guida Completa 2026",
    description: "Come sostituire le finestre durante una ristrutturazione: tempistiche, ordine dei lavori, scelta del serramento giusto e come evitare gli errori più comuni.",
    date: "2026-04-01",
    category: "Ristrutturazione",
    readingTime: 11,
    content: `
<h2>Perché la sostituzione delle finestre è uno degli interventi più impattanti</h2>
<p>In una ristrutturazione, la <strong>sostituzione delle finestre</strong> è spesso l'intervento con il miglior rapporto tra costo e miglioramento percepito. Cambia l'estetica, abbatte i consumi energetici, elimina ponti termici e migliora il comfort acustico — tutto in un unico cantiere.</p>
<p>Ma è anche un intervento dove gli errori costano caro: misure sbagliate, serramenti inadeguati alla zona climatica, posa frettolosa. Questa guida ti aiuta a evitare i problemi più comuni.</p>

<h2>Quando è il momento giusto per sostituire le finestre</h2>
<p>I segnali che indicano che è arrivato il momento:</p>
<ul>
  <li><strong>Condensa frequente</strong> sul vetro interno → il vetrocamera è esaurito o le guarnizioni sono usurate</li>
  <li><strong>Correnti d'aria</strong> percepibili anche con finestre chiuse → profilo deformato o guarnizioni da sostituire</li>
  <li><strong>Difficoltà di apertura e chiusura</strong> → ferramenta usurata o profilo deformato</li>
  <li><strong>Rumore eccessivo dall'esterno</strong> → vetrocamera inadeguato o sigillatura compromessa</li>
  <li><strong>Finestre di oltre 25 anni</strong> → qualunque sia lo stato apparente, le prestazioni sono degradate</li>
</ul>

<h2>Prima di tutto: prendere le misure correttamente</h2>
<p>La misura per ordinare le finestre si prende sempre dal <strong>foro murario</strong>, non dalla finestra esistente. Le finestre nuove vengono prodotte con una tolleranza che permette la posa senza demolire il muro:</p>
<ul>
  <li>Misura larghezza in tre punti (alto, centro, basso) → usa la misura minima</li>
  <li>Misura altezza in tre punti (sx, centro, dx) → usa la misura minima</li>
  <li>Segnala la presenza di cassonetto o persiana esterna (influenza il sistema di montaggio)</li>
</ul>
<p>ThermoDMR offre il servizio di <strong>sopralluogo e misurazione professionale</strong> prima di ogni ordine — garantisce che le finestre arrivino con le misure giuste.</p>

<h2>Ordine dei lavori: quando installare le finestre</h2>
<p>In una ristrutturazione completa, le finestre devono essere installate:</p>
<ol>
  <li><strong>Dopo</strong> la demolizione degli intonaci (se prevista) — evita di sporcare i nuovi serramenti</li>
  <li><strong>Prima</strong> delle pitture e dei nuovi intonaci interni — permette di rifinire correttamente il contorno</li>
  <li><strong>Prima</strong> della posa dei pavimenti — evita danni durante il cantiere</li>
  <li><strong>In coordinamento</strong> con l'installazione del cassonetto, se si sostituiscono anche tapparelle e cassonetti</li>
</ol>
<p>Se stai ristrutturando per stanze, inizia dalle stanze più critiche (camere da letto, soggiorno) e gestisci le finestre temporanee nelle zone in attesa di lavorazione.</p>

<h2>La posa: il passaggio che fa la differenza</h2>
<p>Una finestra di qualità posata male perde il 50% delle sue prestazioni. I punti critici della posa professionale:</p>
<ul>
  <li><strong>Sigillatura perimetrale con schiuma poliuretanica</strong> — elimina i ponti termici tra telaio e muratura</li>
  <li><strong>Nastro impermeabilizzante esterno</strong> — impedisce le infiltrazioni d'acqua piovana</li>
  <li><strong>Nastro vapore-permeabile interno</strong> — permette alla muratura di traspirare senza far passare umidità</li>
  <li><strong>Livellamento preciso</strong> — un'anta storta di 1 mm causa perdite d'aria significative</li>
  <li><strong>Regolazione della ferramenta post-posa</strong> — necessaria dopo l'assestamento del profilo</li>
</ul>

<h2>Sostituire le finestre senza cambiare i cassonetti: si può?</h2>
<p>Sì, ma è un'opportunità da non perdere. Se i cassonetti sono vecchi (in legno o PVC di prima generazione), sono probabilmente un ponte termico importante. Sostituirli insieme alle finestre aggiunge un costo marginale ma migliora significativamente le prestazioni dell'involucro.</p>
<p>ThermoDMR produce <a href="/prodotti/cassonetti">cassonetti coibentati</a> specificamente progettati per integrarsi con la propria gamma di finestre — dimensioni, colori e sistema di fissaggio sono coordinati.</p>

<h2>Finestre con o senza cassonetto: i sistemi a sporgere</h2>
<p>Nelle abitazioni più moderne o nelle ristrutturazioni dove si vuole massimizzare la luce, esistono sistemi dove il cassonetto è integrato nel controtelaio sopra la finestra, con spessore ridotto. Questi sistemi richiedono una pianificazione precisa in fase di progetto architettonico.</p>

<h2>Permessi e pratiche burocratiche</h2>
<p>La sostituzione di finestre in un'abitazione privata, senza modifica della sagoma del foro, rientra nella <strong>manutenzione ordinaria/straordinaria</strong> e generalmente non richiede permessi edilizi.</p>
<p>Fanno eccezione:</p>
<ul>
  <li>Edifici in zona vincolata (centri storici, zone paesaggistiche) → richiede autorizzazione paesaggistica</li>
  <li>Modifica della forma o dimensione del foro → CILA o SCIA secondo il comune</li>
  <li>Condomini con regolamento che disciplina colori e tipologie → verifica con l'amministratore</li>
</ul>

<h2>Come scegliere il serramento giusto per la ristrutturazione</h2>
<p>Per una ristrutturazione in zona climatica D-E (tutta l'Italia settentrionale e centrale), la scelta ottimale nel 2026 è:</p>
<ul>
  <li><strong>Profilo PVC a 5 camere</strong> (es. DMR Confort o DMR Domus)</li>
  <li><strong>Doppio vetro low-e con argon</strong>, Ug ≈ 1,0 W/m²K</li>
  <li><strong>Ferramenta perimetrale di qualità</strong> (Roto, Maco, Siegenia)</li>
  <li><strong>Apertura anta-ribalta</strong> per ventilazione controllata</li>
</ul>
<p>Per la zona F o per chi vuole massimizzare il risparmio energetico: triplo vetro e profilo 6 camere (linea <a href="/prodotti/dmr-passive">DMR Passive</a>).</p>

<h2>Richiedi un preventivo per la tua ristrutturazione</h2>
<p>Dimmi quante finestre hai, in che zona d'Italia sei e se stai ristrutturando tutto o per stanze: ti preparo un preventivo su misura con i materiali giusti e i tempi certi. <a href="/contatti">Contattaci gratuitamente →</a></p>
    `.trim(),
  },

  {
    slug: "come-scegliere-le-finestre-guida-acquisto-2025",
    lang: "it",
    title: "Come Scegliere le Finestre: Guida all'Acquisto 2026 Senza Errori",
    description: "Guida completa per scegliere le finestre giuste nel 2026: materiali, vetri, aperture, colori e certificazioni. Tutto quello che devi sapere prima di comprare.",
    date: "2026-03-28",
    category: "Guide",
    readingTime: 13,
    content: `
<h2>Scegliere le finestre: un acquisto che dura 30-40 anni</h2>
<p>Le finestre non si cambiano spesso. Una scelta sbagliata oggi significa decenni di bollette più alte, disagio termico e acustico, manutenzione costosa. Ma con le informazioni giuste, la scelta diventa semplice e sicura.</p>
<p>Questa guida copre tutto: dal materiale del telaio al tipo di vetro, dalle aperture alle certificazioni — senza tecnicismi inutili.</p>

<h2>Materiale del telaio: PVC, alluminio o legno?</h2>

<h3>PVC</h3>
<p>Il <strong>PVC</strong> è oggi il materiale più diffuso in Europa per i serramenti residenziali. Vantaggi principali:</p>
<ul>
  <li>Eccellente isolamento termico (il PVC non conduce calore)</li>
  <li>Nessuna manutenzione (non verniciare, non oliare, non trattare)</li>
  <li>Resistente a umidità, raggi UV, corrosione</li>
  <li>Prezzo competitivo rispetto all'alluminio e al legno</li>
  <li>Disponibile in decine di colori e finiture (anche effetto legno)</li>
</ul>

<h3>Alluminio</h3>
<p>L'alluminio con <strong>taglio termico</strong> è una scelta valida soprattutto per finestre grandi, facciate continue e applicazioni architettoniche dove il design è prioritario. Ha un'estetica più sottile e moderna rispetto al PVC, ma richiede un taglio termico efficace per isolamento comparabile. Generalmente costa il 30-50% in più del PVC.</p>

<h3>Legno</h3>
<p>Il legno ha ottime prestazioni termiche naturali e un'estetica senza rivali, ma richiede manutenzione periodica (verniciatura ogni 5-7 anni). È la scelta obbligata in molte zone vincolate (centri storici). Il costo è generalmente il più elevato tra le tre opzioni.</p>

<h3>PVC/alluminio (misto)</h3>
<p>Il composito PVC-alluminio combina l'interno in PVC (massimo isolamento) con l'esterno in alluminio (massima durata e resistenza agli agenti atmosferici). È una scelta di fascia alta, con prestazioni eccellenti.</p>

<h2>Il vetrocamera: dove si fa la vera differenza</h2>
<p>Il vetro contribuisce per circa il 70% delle prestazioni termiche totali della finestra. Parametri da valutare:</p>

<h3>Trasmittanza termica (Ug)</h3>
<ul>
  <li>Ug 1,0 W/m²K — doppio vetro con argon e low-e (standard attuale)</li>
  <li>Ug 0,7 W/m²K — doppio vetro con krypton (alta performance)</li>
  <li>Ug 0,5 W/m²K — triplo vetro con argon</li>
  <li>Ug 0,4 W/m²K — triplo vetro con krypton (massima performance)</li>
</ul>

<h3>Fattore solare (g)</h3>
<p>Il fattore solare misura quanta energia solare entra attraverso il vetro. Un valore alto (g > 0,5) è vantaggioso in inverno (solare passivo) ma può causare surriscaldamento estivo a sud. Un valore basso (g < 0,35) è indicato per finestre esposte a ovest o sud in climi caldi.</p>

<h3>Trasmissione luminosa (TL)</h3>
<p>Più alto è il valore TL, più luce naturale entra. Un buon vetrocamera dovrebbe avere TL > 70%. I vetri con coating intensivi possono ridurre la trasmissione luminosa — verifica sempre questo valore se la stanza è poco illuminata.</p>

<h2>Tipi di apertura: quale scegliere?</h2>
<table>
  <thead><tr><th>Apertura</th><th>Vantaggi</th><th>Svantaggi</th><th>Consigliata per</th></tr></thead>
  <tbody>
    <tr><td>Anta-ribalta</td><td>Doppia funzione (aperta laterale o ribaltata), ottima tenuta chiusa</td><td>Occupa spazio interno</td><td>Quasi tutto: la scelta più versatile</td></tr>
    <tr><td>Anta singola (a battente)</td><td>Semplicità, costo inferiore</td><td>Una sola posizione di apertura</td><td>Finestre piccole, ripostigli, bagni</td></tr>
    <tr><td>Vasistas (solo ribalta)</td><td>Ventilazione sicura anche con pioggia</td><td>Apertura limitata</td><td>Bagni, cucine, stanze con bambini piccoli</td></tr>
    <tr><td>Scorrevole</td><td>Nessun ingombro interno, ottima per portefinestre</td><td>Tenuta inferiore rispetto all'anta-ribalta</td><td>Portefinestre, terrazze, giardini</td></tr>
    <tr><td>Alzante-scorrevole</td><td>Massima tenuta tra gli scorrevoli, grandi superfici vetrate</td><td>Costo elevato</td><td>Portefinestre panoramiche, living</td></tr>
  </tbody>
</table>

<h2>Colori e finiture: personalizzazione senza limiti</h2>
<p>Le finestre PVC moderne non sono solo bianche. La tecnologia di coestrusione e laminazione permette di avere:</p>
<ul>
  <li><strong>Colori RAL</strong> (grigio antracite 7016, beige, marrone) — i più richiesti nel 2025-2026</li>
  <li><strong>Effetto legno</strong> (golden oak, noce, mogano) — ideale per i palazzi storici o gli ambienti rustici</li>
  <li><strong>Bicolore</strong> — colore diverso all'interno e all'esterno</li>
  <li><strong>Finitura lucida o opaca</strong></li>
</ul>
<p>I colori scuri (antracite, nero) assorbono più calore solare: in climi caldi e su pareti esposte a sud, possono causare dilatazione leggermente superiore. I profili di qualità sono progettati per gestire queste dilatazioni senza problemi per decenni.</p>

<h2>Certificazioni da richiedere</h2>
<p>Prima di acquistare, verifica che il prodotto abbia:</p>
<ul>
  <li><strong>Marcatura CE</strong> — obbligatoria per tutti i serramenti venduti in Europa</li>
  <li><strong>Dichiarazione di Prestazione (DoP)</strong> con valore Uw certificato</li>
  <li><strong>Certificato di resistenza al vento</strong> (classe C secondo EN 12210) per zone ventose</li>
  <li><strong>Certificato di tenuta all'acqua</strong> (classe E secondo EN 12208)</li>
  <li><strong>Classificazione acustica Rw</strong> se hai esigenze fonoisolanti</li>
</ul>
<p>ThermoDMR fornisce tutta la documentazione tecnica certificata con ogni ordine — la DoP è necessaria anche per accedere al Bonus Ristrutturazioni 50%.</p>

<h2>Gli errori più comuni nell'acquisto</h2>
<ol>
  <li><strong>Scegliere solo in base al prezzo</strong> — spesso il risparmio iniziale si paga con manutenzione e bollette nei vent'anni successivi</li>
  <li><strong>Non verificare il valore Uw totale</strong> — molti venditori comunicano solo il Ug del vetro, che è sempre più basso del valore reale Uw della finestra completa</li>
  <li><strong>Sottovalutare la posa</strong> — una finestra di qualità posata male perde il 40-50% delle prestazioni</li>
  <li><strong>Non considerare il colore del serramento sul budget</strong> — i colori speciali possono aggiungere il 20-25%</li>
  <li><strong>Ordinare senza sopralluogo</strong> — le misure fatte da soli sono spesso imprecise</li>
</ol>

<h2>Il servizio ThermoDMR: dalla consulenza alla posa</h2>
<p>Con ThermoDMR hai un interlocutore unico dal primo contatto all'installazione: sopralluogo gratuito, preventivo dettagliato con materiali certificati, produzione diretta, tempi garantiti.</p>
<p><a href="/contatti">Inizia con una consulenza gratuita →</a> — senza impegno, con risposta entro 24 ore.</p>
    `.trim(),
  },

  // ── NUOVI ARTICOLI 2026 ──────────────────────────────────────────────────

  {
    slug: "bonus-infissi-2026-detrazioni-finestre-pvc",
    lang: "it",
    title: "Bonus Infissi 2026: Detrazioni Finestre PVC e Serramenti",
    description: "Bonus infissi 2026: detrazioni 50% e 65% per finestre PVC e serramenti. Requisiti, documentazione ENEA, come richiedere il rimborso fiscale.",
    date: "2026-04-07",
    category: "Incentivi",
    readingTime: 18,
    heroImage: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1200&q=80",
    content: `
<h2>Cosa sono i bonus infissi nel 2026 e perché conviene agire ora</h2>
<p>Il <strong>bonus infissi 2026</strong> rappresenta uno degli strumenti di agevolazione fiscale più concreti e accessibili che il legislatore italiano mette a disposizione dei proprietari di casa. Con questo termine si identificano le detrazioni fiscali riconosciute a chi sostituisce o installa nuove finestre, portoncini, vetrate e serramenti in abitazioni già esistenti. Non si tratta di un singolo incentivo monolitico, bensì di un sistema articolato composto da <strong>due canali principali</strong> — il Bonus Ristrutturazione al 50% e l'Ecobonus al 50-65% — ciascuno con proprie aliquote, requisiti tecnici, procedure amministrative e plafond di spesa.</p>
<p>Perché conviene agire proprio nel 2026? Le ragioni sono molteplici e convergenti. In primo luogo, il quadro normativo attuale — consolidato dalla Legge di Bilancio 2025 — garantisce certezza sulle aliquote e sulle procedure almeno fino al 31 dicembre 2026. In secondo luogo, i prezzi dei materiali energetici (gas naturale, elettricità) rimangono strutturalmente alti rispetto ai livelli pre-2022, rendendo il risparmio in bolletta un elemento concreto nel calcolo del ritorno sull'investimento. In terzo luogo, la Direttiva Europea sulle Case Green (EPBD 2024) sta introducendo obblighi progressivi di riqualificazione energetica: chi agisce oggi anticipa i costi e beneficia degli incentivi esistenti; chi aspetta rischia di dover intervenire in assenza di agevolazioni o a condizioni meno favorevoli.</p>
<p>Infine, un elemento spesso sottovalutato: i serramenti deteriorati non solo disperdono calore, ma abbassano il valore immobiliare dell'edificio in modo misurabile. Secondo le analisi del mercato immobiliare 2025-2026, un'abitazione con infissi moderni e classe energetica aggiornata vale mediamente il 10-18% in più rispetto a un immobile comparabile con serramenti degli anni '80 o '90. Questo significa che il bonus infissi non è soltanto un risparmio fiscale: è un investimento sul patrimonio.</p>
<p>In questa guida approfondita analizziamo ogni aspetto del bonus infissi 2026: le normative vigenti, le procedure passo per passo, i requisiti tecnici, la documentazione ENEA, i casi pratici e le risposte alle domande più frequenti. Che siate proprietari di un appartamento, di una villa o di unità in condominio, troverete tutto ciò che serve per accedere alle detrazioni senza errori.</p>

<h2>Il quadro normativo: Legge di Bilancio 2025 e novità 2026</h2>
<p>Per comprendere correttamente il <strong>bonus infissi 2026</strong>, è indispensabile partire dal contesto normativo. La Legge di Bilancio 2025 (Legge n. 207/2024) ha confermato e in parte modificato le misure già in vigore, stabilendo il perimetro operativo per l'anno in corso. Vediamo i punti salienti.</p>
<p><strong>Detrazione per ristrutturazioni edilizie (art. 16-bis TUIR):</strong> confermata al 50% per le abitazioni principali dei proprietari persone fisiche, con un massimale di spesa di 96.000 euro per unità immobiliare. La detrazione viene distribuita in 10 rate annuali di pari importo. Rispetto agli anni precedenti, non vi sono modifiche sostanziali per il 2026, il che garantisce continuità e prevedibilità per chi pianifica lavori nel corso dell'anno.</p>
<p><strong>Ecobonus (art. 14 D.L. 63/2013 e successive modificazioni):</strong> per la sostituzione di finestre comprensive di infissi su edifici esistenti, la detrazione applicabile è del 50% con un massimale di spesa di 60.000 euro per unità immobiliare. La detrazione sale al 65% solo nei casi in cui l'intervento sulle finestre sia abbinato ad altri lavori di riqualificazione energetica più incisivi (cappotto termico, sostituzione dell'impianto di climatizzazione invernale con sistemi ad alta efficienza).</p>
<p><strong>Superbonus 110%:</strong> questo incentivo, pur ancora presente nell'ordinamento, è ormai nella fase di esaurimento per i nuovi interventi. Per il 2026 è applicabile solo in casi molto residuali (lavori già avviati con apposita documentazione depositata entro scadenze specifiche). Non è più una via percorribile per nuove istallazioni di serramenti.</p>
<p><strong>Novità 2026 da monitorare:</strong> il governo ha avviato una discussione sulla revisione organica degli incentivi edilizi per il periodo post-2026. Si parla di una possibile riduzione dell'aliquota del Bonus Ristrutturazione dal 50% al 36% a partire dal 2027, il che rende il 2026 un anno strategicamente importante per chi stava pianificando la sostituzione degli infissi. Agire nel 2026 significa potenzialmente beneficiare dell'aliquota più alta prevista prima della revisione.</p>
<p>Sul fronte tecnico-normativo, rimane in vigore il Decreto Ministeriale 26 giugno 2015 ("Requisiti minimi") che definisce i valori limite di trasmittanza termica Uw che i nuovi serramenti devono rispettare per accedere all'Ecobonus. Questi valori, articolati per zona climatica, costituiscono il parametro tecnico fondamentale che ogni prodotto deve soddisfare con documentazione certificata.</p>

<h2>Detrazione 50% IRPEF — Bonus Ristrutturazione: come funziona</h2>
<p>La <strong>detrazione IRPEF al 50%</strong> per interventi di ristrutturazione edilizia è lo strumento fiscale più utilizzato in Italia per la sostituzione di finestre e serramenti. È disciplinata dall'articolo 16-bis del Testo Unico delle Imposte sui Redditi (TUIR) e si applica agli interventi di manutenzione straordinaria, restauro e risanamento conservativo, e ristrutturazione edilizia su edifici residenziali.</p>
<p><strong>Chi può usufruirne:</strong> il proprietario dell'immobile (o il familiare convivente, il nudo proprietario, l'usufruttuario, il locatario con contratto regolarmente registrato). La detrazione è riservata alle persone fisiche che pagano l'IRPEF; le società e gli enti non commerciali non ne beneficiano per questo specifico canale.</p>
<p><strong>Cosa si può detrarre:</strong> il costo della fornitura e posa in opera dei serramenti (finestre, portoncini, vetrate fisse, porte-finestre) su edifici esistenti. Sono incluse anche le opere accessorie necessarie all'installazione (smontaggio degli infissi vecchi, smaltimento, eventuali opere murarie di minima entità). Non è detraibile l'IVA se il contribuente ha già optato per l'aliquota IVA agevolata al 10%.</p>
<p><strong>Massimale e suddivisione:</strong> la spesa massima detraibile è di <strong>96.000 euro per unità immobiliare</strong>. Su questa spesa si calcola il 50%, ottenendo un risparmio fiscale massimo teorico di 48.000 euro, distribuito in 10 rate annuali da 4.800 euro ciascuna. Nella realtà, la spesa per la sostituzione di finestre in un'abitazione media si attesta tra i 4.000 e i 15.000 euro, con detrazioni annue tra i 200 e i 750 euro per 10 anni.</p>
<p><strong>Requisiti procedurali:</strong> a differenza dell'Ecobonus, il Bonus Ristrutturazione non richiede la comunicazione all'ENEA né il rispetto di specifici valori Uw minimi. I requisiti procedurali essenziali sono: pagamento con bonifico bancario o postale "parlante" (che riporti causale, codice fiscale del beneficiario, partita IVA dell'impresa esecutrice), conservazione della fattura e indicazione della detrazione nel modello 730 o Redditi PF dell'anno successivo.</p>
<p><strong>Cumulabilità:</strong> il Bonus Ristrutturazione non è cumulabile con l'Ecobonus sullo stesso intervento. Occorre quindi scegliere quale dei due canali conviene attivare. La scelta dipende dall'aliquota effettivamente applicabile, dai massimali di spesa e dalla situazione fiscale del contribuente.</p>

<h2>Ecobonus 50-65%: requisiti e differenze dalla detrazione ordinaria</h2>
<p>L'<strong>Ecobonus</strong> è la detrazione fiscale specificamente dedicata agli interventi di miglioramento dell'efficienza energetica degli edifici esistenti. Per le finestre e i serramenti, rappresenta spesso la scelta ottimale grazie all'aliquota potenzialmente più alta e alla diretta correlazione con l'obiettivo energetico dell'intervento.</p>
<p><strong>Aliquote applicabili:</strong> la detrazione è del <strong>50%</strong> per la sola sostituzione di finestre (comprese di infissi) su edifici esistenti, senza altri lavori di riqualificazione. Sale al <strong>65%</strong> quando la sostituzione delle finestre è abbinata a interventi su impianti o sull'involucro opaco (cappotto) che costituiscono l'intervento principale. La differenza di 15 punti percentuali sull'aliquota può tradursi in un risparmio fiscale significativo: su 10.000 euro di spesa, la differenza tra il 50% e il 65% è di 1.500 euro di detrazioni in più.</p>
<p><strong>Massimale di spesa:</strong> per le finestre, il massimale è di <strong>60.000 euro per unità immobiliare</strong> (inferiore ai 96.000 euro del Bonus Ristrutturazione). Nella pratica, questo limite è raramente raggiunto da interventi su singole abitazioni private.</p>
<p><strong>Requisiti tecnici obbligatori:</strong> a differenza del Bonus Ristrutturazione, l'Ecobonus richiede che i nuovi serramenti soddisfino precisi valori limite di trasmittanza termica Uw, definiti in funzione della zona climatica di appartenenza dell'edificio. La verifica di questi requisiti è obbligatoria e deve essere documentata con la scheda tecnica del prodotto.</p>
<p><strong>Comunicazione ENEA:</strong> per l'Ecobonus è obbligatoria la trasmissione telematica dei dati dell'intervento all'ENEA (Agenzia Nazionale per le Nuove Tecnologie, l'Energia e lo Sviluppo Economico Sostenibile) entro 90 giorni dalla data di fine lavori. L'omissione di questa comunicazione non comporta la perdita automatica della detrazione, ma è comunque un adempimento formale raccomandato.</p>
<p><strong>IVA agevolata:</strong> sia per il Bonus Ristrutturazione sia per l'Ecobonus, i lavori di installazione beneficiano dell'<strong>IVA agevolata al 10%</strong> (anziché il 22% ordinario) in quanto si tratta di interventi di manutenzione straordinaria su edifici residenziali. Questo abbassa immediatamente il costo dell'intervento del 10,9% rispetto al prezzo con IVA ordinaria.</p>

<h2>I requisiti tecnici 2026: valori Uw per zona climatica</h2>
<p>Il cuore tecnico del bonus infissi per l'Ecobonus è il rispetto dei <strong>valori limite di trasmittanza termica Uw</strong> (trasmittanza dell'intera finestra, comprensiva di vetro e telaio), definiti dal Decreto Ministeriale 26 giugno 2015 e suddivisi per zona climatica. La zona climatica è determinata dal comune di ubicazione dell'edificio ed è indicata nell'APE o reperibile sul sito del Ministero della Transizione Ecologica.</p>
<p>La trasmittanza Uw si misura in W/m²K: indica quanti watt di calore si disperdono attraverso ogni metro quadro di finestra per ogni grado di differenza di temperatura tra interno ed esterno. Minore è il valore Uw, migliore è l'isolamento termico della finestra.</p>

<table>
  <thead>
    <tr>
      <th>Zona Climatica</th>
      <th>Descrizione e principali province</th>
      <th>Uw max per Ecobonus (W/m²K)</th>
      <th>Modello ThermoDMR consigliato</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Zona A</strong></td>
      <td>Lampedusa, isole minori subtropicali</td>
      <td>≤ 3,0</td>
      <td><a href="/prodotti/dmr-domus">DMR Domus</a> (Uw 1,3)</td>
    </tr>
    <tr>
      <td><strong>Zona B</strong></td>
      <td>Agrigento, Catania, Palermo, Reggio Calabria</td>
      <td>≤ 3,0</td>
      <td><a href="/prodotti/dmr-domus">DMR Domus</a> (Uw 1,3)</td>
    </tr>
    <tr>
      <td><strong>Zona C</strong></td>
      <td>Napoli, Bari, Roma costa, Catanzaro</td>
      <td>≤ 2,6</td>
      <td><a href="/prodotti/dmr-domus">DMR Domus</a> (Uw 1,3)</td>
    </tr>
    <tr>
      <td><strong>Zona D</strong></td>
      <td>Firenze, Roma (entroterra), Genova, Pescara</td>
      <td>≤ 2,0</td>
      <td><a href="/prodotti/dmr-confort">DMR Confort</a> (Uw 1,1)</td>
    </tr>
    <tr>
      <td><strong>Zona E</strong></td>
      <td>Milano, Torino, Bologna, Venezia, Verona, Trento</td>
      <td>≤ 1,8</td>
      <td><a href="/prodotti/dmr-confort">DMR Confort</a> (Uw 1,1)</td>
    </tr>
    <tr>
      <td><strong>Zona F</strong></td>
      <td>Bolzano, Cuneo (alta quota), L'Aquila montagna</td>
      <td>≤ 1,4</td>
      <td><a href="/prodotti/dmr-passive">DMR Passive</a> (Uw 0,8)</td>
    </tr>
  </tbody>
</table>

<p>È fondamentale notare che i valori sopra indicati sono i <strong>massimi ammissibili</strong> per ottenere la detrazione: un valore Uw più basso è sempre meglio in termini energetici. I prodotti <a href="/prodotti-pubblico">ThermoDMR</a> sono progettati per offrire prestazioni superiori ai requisiti minimi, garantendo sia l'accesso alle detrazioni sia reali risparmi energetici a lungo termine.</p>
<p>Per le finestre con telai in PVC a 5 o 6 camere, come quelle della gamma ThermoDMR, il raggiungimento dei valori Uw richiesti dalla zona E (≤ 1,8 W/m²K) è assolutamente standard; il raggiungimento dei valori per la zona F (≤ 1,4 W/m²K) richiede specifiche tecniche aggiuntive come profili a 6 camere, vetro triplo o gas krypton.</p>

<h2>Documentazione necessaria: guida passo per passo</h2>
<p>Raccogliere correttamente la documentazione è il passaggio più critico per non perdere la detrazione. Ecco la lista completa e ordinata dei documenti necessari, sia per il Bonus Ristrutturazione sia per l'Ecobonus.</p>
<h3>Documenti comuni a entrambi i bonus</h3>
<ol>
  <li><strong>Documento di identità valido</strong> del richiedente la detrazione</li>
  <li><strong>Codice fiscale</strong> del richiedente (deve coincidere con quello sul bonifico e sulla fattura)</li>
  <li><strong>Titolo di possesso dell'immobile</strong>: atto di proprietà, contratto di locazione registrato, certificato di usufrutto o nuda proprietà</li>
  <li><strong>Fattura del fornitore</strong>: intestata al richiedente la detrazione, con descrizione analitica dei lavori (fornitura e posa in opera di serramenti PVC, specificando numero, tipologia e misure dei pezzi)</li>
  <li><strong>Bonifico parlante</strong>: deve contenere la causale specifica (per il Bonus Ristrutturazione: "Pagamento per lavori di ristrutturazione edilizia ex art. 16-bis DPR 917/86"; per l'Ecobonus: riferimento al D.L. 63/2013), il codice fiscale del beneficiario della detrazione e la partita IVA o codice fiscale del fornitore. Attenzione: la banca applica una ritenuta d'acconto dell'8% sul pagamento ricevuto dall'impresa; questo è normale e non comporta problemi.</li>
  <li><strong>Dati catastali dell'immobile</strong> (visura catastale o dati riportati sull'atto notarile)</li>
</ol>
<h3>Documenti aggiuntivi specifici per l'Ecobonus</h3>
<ol>
  <li><strong>Scheda tecnica del serramento</strong>: emessa dal produttore, deve riportare il valore Uw certificato (o calcolato secondo UNI EN ISO 10077-1), la zona climatica di destinazione e la conformità al D.M. 26/06/2015</li>
  <li><strong>Dichiarazione di conformità CE</strong> del serramento (obbligatoria per legge per tutti i serramenti immessi sul mercato europeo)</li>
  <li><strong>Asseverazione del tecnico</strong> (solo per importi superiori a determinate soglie o su richiesta dell'Agenzia delle Entrate): una relazione tecnica firmata da un ingegnere, architetto o geometra che attesti la conformità dell'intervento ai requisiti del D.M. 26/06/2015</li>
  <li><strong>Scheda ENEA infissi</strong>: da compilare e trasmettere online sul portale ENEA entro 90 giorni dalla fine lavori</li>
</ol>
<p>ThermoDMR fornisce con ogni fornitura la scheda tecnica del prodotto con il valore Uw certificato e la dichiarazione CE, semplificando notevolmente la gestione della pratica documentale. Basta chiedere al momento dell'ordine e tutto viene preparato.</p>

<h2>Come fare la comunicazione ENEA: istruzioni pratiche</h2>
<p>La comunicazione ENEA è il passaggio burocratico che spaventa di più i proprietari di casa, ma in realtà è piuttosto semplice se si hanno i documenti giusti a portata di mano. Ecco la procedura completa.</p>
<p><strong>Quando farlo:</strong> entro 90 giorni dalla data di fine lavori (collaudo o data di ultimazione indicata sulla fattura finale). Non è necessario farlo prima del pagamento o prima della fine dell'anno fiscale; l'importante è rispettare i 90 giorni dalla fine lavori.</p>
<p><strong>Come accedere al portale:</strong> collegarsi al sito ufficiale ENEA dedicato alle detrazioni fiscali (portale "Ecobonus ENEA"). È necessario registrarsi con SPID, CIE o CNS oppure con credenziali ENEA create ad hoc.</p>
<p><strong>Informazioni da inserire:</strong></p>
<ul>
  <li>Dati anagrafici del beneficiario della detrazione</li>
  <li>Indirizzo dell'immobile interessato dai lavori (con dati catastali)</li>
  <li>Tipologia di intervento: per le finestre si seleziona "Sostituzione di infissi comprensivi di serramenti"</li>
  <li>Superficie totale dei serramenti sostituiti (in m²)</li>
  <li>Valore Uw dei nuovi serramenti installati</li>
  <li>Valore Uw dei serramenti preesistenti (se non disponibile, si può usare il valore convenzionale 3,5 W/m²K per serramenti molto vecchi)</li>
  <li>Costo totale dell'intervento (imponibile, prima dell'IVA)</li>
</ul>
<p><strong>Al termine:</strong> il sistema genera una ricevuta numerata che attesta la trasmissione. Questa ricevuta va conservata insieme a tutta la documentazione per almeno 5 anni, poiché potrebbe essere richiesta in caso di controllo dell'Agenzia delle Entrate.</p>
<p><strong>Attenzione a non confondere:</strong> la comunicazione ENEA non è la stessa cosa della comunicazione ENEA per il Superbonus, che ha procedure e portali diversi. Per l'Ecobonus ordinario si utilizza il portale standard delle detrazioni energetiche.</p>

<h2>Cessione del credito e sconto in fattura nel 2026: cosa è rimasto</h2>
<p>Uno degli argomenti più confusi e dibattuti degli ultimi anni riguarda le opzioni alternative alla classica detrazione nella dichiarazione dei redditi: la <strong>cessione del credito</strong> e lo <strong>sconto in fattura</strong>. Il Decreto-Legge 11 del 2023 (convertito in legge) ha drasticamente ridotto la disponibilità di questi strumenti. Ecco la situazione aggiornata al 2026.</p>
<p><strong>Sconto in fattura per la sostituzione di finestre (intervento autonomo):</strong> non è più disponibile. Lo sconto in fattura è stato eliminato per praticamente tutti gli interventi di efficienza energetica che non rientrano nel Superbonus o in specifiche categorie residuali. Chi sostituisce le finestre nel 2026 deve aspettarsi di pagare l'intero importo al fornitore e recuperare la detrazione negli anni successivi attraverso la dichiarazione dei redditi.</p>
<p><strong>Cessione del credito per la sostituzione di finestre (intervento autonomo):</strong> anch'essa non è più disponibile per i nuovi contratti. Rimane accessibile solo in casi molto limitati: interventi su parti comuni condominiali (a determinate condizioni), interventi per soggetti in condizioni di incapienza fiscale (reddito sotto la soglia di capienza), e interventi già avviati prima delle restrizioni normative.</p>
<p><strong>Cosa rimane possibile:</strong> per i condomini che effettuano interventi trainanti sull'involucro (cappotto condominiale) abbinati alla sostituzione di finestre come intervento trainato, in certi casi possono ancora esistere percorsi di cessione del credito. Si tratta però di situazioni specifiche che richiedono una consulenza fiscale dedicata.</p>
<p><strong>Consiglio pratico:</strong> prima di stipulare qualsiasi contratto, verificate con il vostro CAF, commercialista o consulente fiscale la situazione aggiornata, poiché la normativa in questo ambito è soggetta a modifiche frequenti. ThermoDMR può indicarvi i professionisti di fiducia con cui collaboriamo per la gestione delle pratiche fiscali.</p>

<h2>Calcola il risparmio fiscale: esempi concreti per diverse spese</h2>
<p>La teoria è utile, ma i numeri concreti aiutano a prendere decisioni. Di seguito presentiamo tre scenari tipo con il calcolo del risparmio fiscale effettivo.</p>
<h3>Scenario A — Appartamento piccolo (2 camere, 5 finestre + 1 portoncino)</h3>
<p>Spesa totale per fornitura e installazione serramenti PVC ThermoDMR DMR Domus: <strong>4.200 euro (IVA 10% inclusa)</strong>.</p>
<ul>
  <li>Con Bonus Ristrutturazione 50%: detrazione totale = 2.100 euro, suddivisa in 10 rate annuali da 210 euro ciascuna</li>
  <li>Risparmio energetico annuo stimato (zona D, da Uw 2,8 a Uw 1,3): circa 280 euro/anno</li>
  <li>Tempo di recupero netto dell'investimento: circa 8 anni</li>
</ul>
<h3>Scenario B — Casa media (4 camere, 8 finestre + 2 porte-finestre + 1 portoncino)</h3>
<p>Spesa totale per fornitura e installazione serramenti PVC ThermoDMR DMR Confort: <strong>9.800 euro (IVA 10% inclusa)</strong>.</p>
<ul>
  <li>Con Ecobonus 50%: detrazione totale = 4.900 euro, suddivisa in 10 rate annuali da 490 euro ciascuna</li>
  <li>Risparmio energetico annuo stimato (zona E, da Uw 2,8 a Uw 1,1): circa 520 euro/anno</li>
  <li>Tempo di recupero netto dell'investimento: circa 6,5 anni</li>
</ul>
<h3>Scenario C — Casa grande (6 camere, 12 finestre + 3 porte-finestre + 2 portoncini)</h3>
<p>Spesa totale per fornitura e installazione serramenti PVC ThermoDMR mix DMR Confort + DMR Passive: <strong>18.500 euro (IVA 10% inclusa)</strong>.</p>
<ul>
  <li>Con Ecobonus 50%: detrazione totale = 9.250 euro, suddivisa in 10 rate annuali da 925 euro ciascuna</li>
  <li>Risparmio energetico annuo stimato (zona E, da Uw 2,8 a Uw 0,9 medio): circa 940 euro/anno</li>
  <li>Tempo di recupero netto dell'investimento: circa 5,8 anni</li>
</ul>
<p>I tempi di recupero indicati sopra considerano solo il risparmio energetico e la detrazione fiscale, senza tenere conto dell'incremento del valore immobiliare, che costituisce un ulteriore beneficio difficile da quantificare in anticipo ma reale e documentato dal mercato.</p>

<h2>Interventi trainanti e interventi trainati: come massimizzare la detrazione</h2>
<p>Nel linguaggio degli incentivi per l'efficienza energetica, si distingue tra <strong>interventi trainanti</strong> e <strong>interventi trainati</strong>. Comprendere questa distinzione è fondamentale per chi vuole massimizzare le detrazioni disponibili nell'ambito di un intervento di ristrutturazione più ampio.</p>
<p><strong>Interventi trainanti:</strong> sono gli interventi principali che "abilitano" percentuali di detrazione più elevate per gli interventi correlati. Nella logica dell'Ecobonus, l'intervento trainante può essere la sostituzione dell'impianto di riscaldamento con un sistema ad alta efficienza (pompa di calore, caldaia a condensazione A+) oppure il cappotto termico sull'involucro opaco. Quando questi interventi sono presenti, la detrazione applicabile sale al 65%.</p>
<p><strong>Interventi trainati:</strong> sono gli interventi accessori che beneficiano della percentuale più alta grazie all'abbinamento con l'intervento trainante. La sostituzione delle finestre, abbinata a una nuova pompa di calore o a un cappotto termico, passa dall'aliquota base del 50% a quella del 65%, con un incremento del risparmio fiscale di 15 punti percentuali.</p>
<p><strong>Esempio pratico di combinazione ottimale:</strong> se state pianificando sia la sostituzione delle finestre sia l'installazione di una pompa di calore, conviene strutturare i lavori in modo che l'impianto costituisca l'intervento trainante e le finestre l'intervento trainato. In questo modo le finestre beneficiano del 65% anziché del 50%. Su 10.000 euro di spesa per le finestre, questa differenza vale 1.500 euro di detrazione in più (750 euro in più per anno per 10 anni).</p>
<p><strong>Attenzione alla documentazione:</strong> per sfruttare correttamente il meccanismo trainante/trainato, è necessario che entrambi gli interventi siano chiaramente documentati come parte di un unico progetto di riqualificazione, con fatture emesse nello stesso anno fiscale (o in anni contigui con continuità documentata). Un tecnico abilitato può preparare una relazione asseverata che attesti la correlazione tra gli interventi.</p>

<h2>Bonus Ristrutturazione vs Ecobonus: quale conviene scegliere</h2>
<p>La domanda è lecita e frequente: quando si deve scegliere tra i due canali, quale conviene attivare? La risposta non è universale e dipende da diversi fattori, ma la tabella seguente aiuta a orientarsi.</p>

<table>
  <thead>
    <tr>
      <th>Caratteristica</th>
      <th>Bonus Ristrutturazione 50%</th>
      <th>Ecobonus 50-65%</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Aliquota massima</td>
      <td>50%</td>
      <td>65% (con intervento trainante)</td>
    </tr>
    <tr>
      <td>Massimale spesa detraibile</td>
      <td>96.000 € per unità</td>
      <td>60.000 € per unità</td>
    </tr>
    <tr>
      <td>Requisiti tecnici Uw</td>
      <td>Nessuno</td>
      <td>Obbligatori per zona climatica</td>
    </tr>
    <tr>
      <td>Comunicazione ENEA</td>
      <td>Non obbligatoria</td>
      <td>Obbligatoria entro 90 gg</td>
    </tr>
    <tr>
      <td>Documentazione tecnica</td>
      <td>Minima</td>
      <td>Scheda tecnica Uw + conformità CE</td>
    </tr>
    <tr>
      <td>IVA agevolata 10%</td>
      <td>Sì</td>
      <td>Sì</td>
    </tr>
    <tr>
      <td>Applicabile a seconde case</td>
      <td>Sì</td>
      <td>Sì (edifici esistenti)</td>
    </tr>
    <tr>
      <td>Cumulabilità</td>
      <td>Non cumulabile con Ecobonus</td>
      <td>Non cumulabile con Bonus Ristr.</td>
    </tr>
  </tbody>
</table>

<p><strong>Quando scegliere il Bonus Ristrutturazione:</strong> se il serramento non soddisfasse per qualche motivo i valori Uw richiesti dall'Ecobonus (caso raro con prodotti di qualità), oppure se la spesa totale supera i 60.000 euro (più comune nelle grandi ville o nei condomini), oppure se si vuole minimizzare la burocrazia.</p>
<p><strong>Quando scegliere l'Ecobonus:</strong> sempre, quando si è in zona E o F e si abbina la sostituzione delle finestre a un impianto termico, perché si beneficia del 65%. Anche in tutti i casi in cui si vuole documentare il miglioramento energetico ai fini di un futuro APE aggiornato.</p>

<h2>Errori comuni da evitare per non perdere la detrazione</h2>
<p>Ogni anno migliaia di contribuenti perdono parte o tutta la detrazione per errori procedurali spesso evitabili. Ecco i più frequenti e come prevenirli.</p>
<ul>
  <li><strong>Bonifico non "parlante":</strong> pagare con un bonifico ordinario anziché con bonifico con causale specifica. La banca non applica la ritenuta d'acconto e il pagamento non è valido ai fini della detrazione. Soluzione: usare sempre il modulo "bonifico per detrazioni fiscali" disponibile in tutte le banche.</li>
  <li><strong>Intestazione errata della fattura:</strong> la fattura deve essere intestata esattamente alla persona che chiede la detrazione. Se l'immobile è cointestato a due coniugi ma la fattura è solo a nome di uno, la detrazione è fruibile solo da quello.</li>
  <li><strong>Mancato rispetto dei valori Uw:</strong> richiedere l'Ecobonus su serramenti che non soddisfano i requisiti tecnici di zona. ThermoDMR certifica tutti i valori Uw dei propri prodotti, ma verificate sempre che la documentazione sia in linea con la vostra zona climatica prima di scegliere il prodotto.</li>
  <li><strong>Comunicazione ENEA tardiva:</strong> trasmettere i dati all'ENEA oltre i 90 giorni dalla fine lavori. Sebbene alcuni orientamenti giurisprudenziali ammettano la sanatoria, è sempre meglio rispettare il termine. Annotate la data di fine lavori sulla fattura finale.</li>
  <li><strong>Conservazione insufficiente dei documenti:</strong> buttare via i documenti dopo pochi anni. Il termine per i controlli dell'Agenzia delle Entrate è di 5 anni dalla presentazione della dichiarazione; conservate tutto almeno per 7 anni dalla conclusione dei lavori.</li>
  <li><strong>Confondere le aliquote:</strong> applicare il 65% senza avere un intervento trainante che giustifichi l'aliquota maggiorata. In caso di controllo, la detrazione sarebbe ricalcolata al 50%.</li>
</ul>

<h2>Finestre PVC e certificazione CE: cosa verificare prima di comprare</h2>
<p>Non tutti i serramenti PVC sono uguali, e non tutti i fornitori offrono la stessa qualità di documentazione. Prima di acquistare, è fondamentale verificare che il prodotto abbia le certificazioni necessarie sia ai fini della detrazione fiscale sia per la sicurezza e la performance a lungo termine.</p>
<p><strong>Marcatura CE:</strong> è obbligatoria per legge per tutti i serramenti immessi sul mercato europeo dal 2013. La marcatura CE attesta che il prodotto è stato testato secondo la norma EN 14351-1 per finestre e porte esterne. Non è una garanzia di qualità specifica, ma è il requisito minimo di conformità. Richiedete sempre la Dichiarazione di Prestazione (DoP — Declaration of Performance) che accompagna la marcatura CE.</p>
<p><strong>Classificazione EN 12207 (permeabilità all'aria), EN 12208 (tenuta all'acqua), EN 12210 (resistenza al vento):</strong> questi tre parametri, spesso indicati come "AEW" o "AEC", descrivono le prestazioni del serramento in condizioni reali d'uso. Per una finestra di qualità da installare in zona E o F, si richiedono almeno classe 4 per la permeabilità all'aria e classe E750 per la tenuta all'acqua.</p>
<p><strong>Certificazione del valore Uw:</strong> il valore Uw deve essere calcolato o misurato secondo la norma UNI EN ISO 10077-1. Non è sufficiente un valore dichiarato senza riferimento normativo. Richiedete la scheda tecnica con il valore Uw calcolato per la misura standard (o per la misura effettiva del vostro serramento).</p>
<p>La gamma <a href="/prodotti-pubblico">ThermoDMR</a> dispone di tutta la documentazione tecnica richiesta: marcatura CE, dichiarazione di prestazione, schede tecniche con valori Uw, test di classificazione AEW. Questa documentazione viene fornita con ogni ordine e supporta integralmente la pratica ENEA e fiscale.</p>

<h2>Casi pratici: appartamento 80 m², casa 120 m², condominio 20 unità</h2>
<p>Analizziamo tre scenari reali con i calcoli completi per capire concretamente quanto vale l'investimento in nuovi serramenti con le detrazioni disponibili nel 2026.</p>
<h3>Caso 1 — Appartamento 80 m², Milano (zona E), anni '80</h3>
<p>Situazione di partenza: 6 finestre standard e 1 porta-finestra al balcone, serramenti originali in alluminio senza taglio termico con singolo vetro (Uw stimato 4,8 W/m²K). Fabbisogno energetico attuale: classe G, circa 180 kWh/m²/anno.</p>
<p>Intervento proposto: sostituzione con 6 finestre e 1 porta-finestra <a href="/prodotti/dmr-confort">DMR Confort</a> (Uw 1,1 W/m²K) + 1 <a href="/prodotti/portoncini">portoncino d'ingresso</a> coibentato (Uw 1,2 W/m²K).</p>
<p>Costo intervento: 6.800 euro (IVA 10% inclusa). Detrazione Ecobonus 50%: 3.400 euro in 10 anni (340 euro/anno). Risparmio energetico stimato: 420 euro/anno. Beneficio totale annuo: 760 euro. Tempo di recupero netto: circa 4,5 anni.</p>
<h3>Caso 2 — Casa indipendente 120 m², Bologna (zona E), anni '90</h3>
<p>Situazione di partenza: 10 finestre, 2 porte-finestre, serramenti in PVC anni '90 con doppio vetro aria (Uw stimato 2,8 W/m²K). Fabbisogno energetico attuale: classe D, circa 95 kWh/m²/anno.</p>
<p>Intervento proposto: sostituzione con 10 finestre e 2 porte-finestre <a href="/prodotti/dmr-confort">DMR Confort</a> (Uw 1,1 W/m²K) + cassonetti coibentati + <a href="/prodotti/tapparelle">tapparelle coibentate</a>.</p>
<p>Costo intervento: 14.200 euro (IVA 10% inclusa). Detrazione Ecobonus 50%: 7.100 euro in 10 anni (710 euro/anno). Risparmio energetico stimato: 580 euro/anno. Beneficio totale annuo: 1.290 euro. Tempo di recupero netto: circa 5,5 anni. Salto di classe energetica atteso: da D a B.</p>
<h3>Caso 3 — Condominio 20 unità, Torino (zona E), anni '70</h3>
<p>Situazione di partenza: facciata con serramenti in ferro singolo vetro anni '70 (Uw stimato 5,5 W/m²K). Il condominio decide di intervenire sulle finestre delle parti comuni e di agevolare i singoli condòmini nell'intervento sulle proprie unità.</p>
<p>Intervento proposto: accordo condominiale per sostituzione coordinata di tutti i serramenti con <a href="/prodotti/dmr-confort">DMR Confort</a>. Costo medio per appartamento (5 finestre + 1 porta-finestra): 5.400 euro. Detrazione Ecobonus 50% per appartamento: 2.700 euro in 10 anni. Risparmio energetico per appartamento: 380 euro/anno. L'intervento coordinato permette anche di negoziare condizioni commerciali più favorevoli con il fornitore, riducendo il costo per unità del 10-15% rispetto agli interventi singoli.</p>

<h2>FAQ: le 10 domande più frequenti sul bonus infissi 2026</h2>
<p>Raccogliamo qui le domande che ci vengono poste più spesso dai nostri clienti e dai loro consulenti fiscali.</p>
<ol>
  <li><strong>Posso detrarre anche il portoncino d'ingresso?</strong> Sì, il portoncino d'ingresso rientra a pieno titolo nel bonus infissi, sia per il Bonus Ristrutturazione sia per l'Ecobonus, a condizione che soddisfi i requisiti Uw di zona.</li>
  <li><strong>Le veneziane e le persiane sono detraibili?</strong> Le <a href="/prodotti/persiane">persiane</a> fanno parte del serramento se sono installate contestualmente alla sostituzione delle finestre; in tal caso rientrano nella detrazione. Le veneziane interne generalmente no, salvo specifiche configurazioni integrate.</li>
  <li><strong>Posso detrarre anche il cappotto del cassonetto?</strong> Sì, il <a href="/prodotti/cassonetti">cassonetto coibentato</a> installato contestualmente alla sostituzione delle finestre è detraibile nell'ambito dello stesso intervento.</li>
  <li><strong>La detrazione vale anche per la seconda casa?</strong> Sì, il Bonus Ristrutturazione e l'Ecobonus si applicano a tutte le unità immobiliari residenziali esistenti, indipendentemente dall'utilizzo (prima casa, seconda casa, abitazione in affitto).</li>
  <li><strong>Posso pagare in contanti e poi detrarre?</strong> No. Per accedere alla detrazione il pagamento deve avvenire obbligatoriamente con bonifico bancario o postale parlante. Il pagamento in contanti non dà diritto alla detrazione.</li>
  <li><strong>Se sono in regime forfettario posso usufruire della detrazione?</strong> No. Il regime forfettario prevede l'esclusione dalle detrazioni IRPEF per lavori edilizi. I contribuenti in regime forfettario non possono beneficiare né del Bonus Ristrutturazione né dell'Ecobonus.</li>
  <li><strong>Quanto tempo ci vuole per ricevere il rimborso?</strong> Non è un rimborso immediato: è una detrazione applicata sulle imposte dovute ogni anno per 10 anni. Se nell'anno avete IRPEF capiente sufficiente, il beneficio si vede nel 730 o nel modello Redditi dell'anno successivo.</li>
  <li><strong>Cosa succede se vendo casa prima di aver usufruito di tutte le rate?</strong> In caso di vendita dell'immobile, le rate residue della detrazione si trasferiscono all'acquirente, salvo diverso accordo tra le parti stipulato nell'atto di compravendita.</li>
  <li><strong>Devo presentare domanda preventiva?</strong> No. Non esiste alcuna domanda preventiva da presentare per il Bonus Ristrutturazione o per l'Ecobonus. Basta rispettare i requisiti procedurali e dichiarare la detrazione nella dichiarazione dei redditi.</li>
  <li><strong>ThermoDMR mi aiuta con la documentazione ENEA?</strong> Sì. ThermoDMR fornisce tutta la documentazione tecnica necessaria (scheda tecnica con valore Uw, dichiarazione CE) e può fornire assistenza nella compilazione della scheda ENEA. Basta richiederlo al momento dell'ordine.</li>
</ol>

<h2>Come richiedere il preventivo con documentazione inclusa</h2>
<p>ThermoDMR ha sviluppato un processo di preventivazione specificamente pensato per semplificare l'accesso alle detrazioni fiscali. Ogni preventivo include non solo il costo dei serramenti e dell'installazione, ma anche l'indicazione del valore Uw del prodotto scelto per la zona climatica di appartenenza dell'immobile, la verifica di idoneità ai requisiti dell'Ecobonus, e le istruzioni per la corretta gestione della pratica documentale.</p>
<p>Per richiedere il preventivo, basta compilare il <a href="/contatti">modulo di contatto</a> indicando: il comune di ubicazione dell'immobile (per determinare la zona climatica), il numero e le tipologie di serramenti da sostituire, e se si desidera abbinare la sostituzione ad altri interventi (cassonetti, tapparelle, portoncino). Il nostro team tecnico-commerciale risponde entro 24 ore con una proposta personalizzata completa di documentazione tecnica per la detrazione.</p>
<p>Scopri tutti i modelli disponibili nel nostro <a href="/prodotti-pubblico">catalogo prodotti</a>: dalla <a href="/prodotti/dmr-domus">DMR Domus</a> per le zone climatiche più miti, alla <a href="/prodotti/dmr-confort">DMR Confort</a> per la zona E, fino alla <a href="/prodotti/dmr-passive">DMR Passive</a> per le esigenze più performanti. Agisci nel 2026 per massimizzare le detrazioni disponibili e investire con certezza nel valore della tua abitazione.</p>
    `.trim(),
  },

  {
    slug: "classe-energetica-casa-2026-finestre-pvc",
    lang: "it",
    title: "Classe Energetica A con Finestre PVC: Guida 2026 — ThermoDMR",
    description: "Come migliorare la classe energetica della tua casa con finestre PVC nel 2026. Valori Uw, trasmittanza, dispersioni termiche: tutto quello che devi sapere.",
    date: "2026-04-10",
    category: "Risparmio Energetico",
    readingTime: 18,
    heroImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    content: `
<h2>Perché la classe energetica è diventata una priorità nel 2026</h2>
<p>Nel 2026 la <strong>classe energetica della casa</strong> non è più soltanto un dato tecnico riservato agli specialisti del settore edilizio: è diventata un indicatore economico concreto che influenza il valore degli immobili, la spesa mensile delle famiglie e — sempre più — le possibilità di accesso a finanziamenti agevolati. Tre forze convergenti hanno trasformato questo tema da nicchia a priorità per chiunque possegga un'abitazione in Italia.</p>
<p>La prima forza è la <strong>Direttiva Europea sulle Case Green</strong> (EPBD — Energy Performance of Buildings Directive, 2024), che impone agli Stati membri di programmare la ristrutturazione del parco edilizio esistente verso classi energetiche più alte entro scadenze progressivamente ravvicinate. L'Italia, come gli altri Paesi europei, ha recepito questa direttiva con misure che rendono sempre più oneroso mantenere edifici in classe energetica bassa (F o G), specialmente per gli immobili messi in vendita o in locazione.</p>
<p>La seconda forza è quella economica: il costo dell'energia ha subito una ristrutturazione permanente verso l'alto rispetto ai livelli pre-2022. Una casa con classe energetica G consuma mediamente 3-4 volte più energia di una casa in classe B per lo stesso comfort abitativo. Con bollette che si sono stabilizzate su livelli significativamente più alti rispetto al passato, il risparmio ottenibile migliorando la classe energetica vale centinaia di euro all'anno in modo strutturale.</p>
<p>La terza forza è quella del mercato immobiliare: le analisi di Nomisma, Tecnoborsa e delle principali agenzie immobiliari documentano in modo crescente il cosiddetto "green premium" — il sovraprezzo che gli immobili con classe energetica alta ottengono rispetto a quelli con classe bassa nella stessa zona. Nel 2026, la differenza di valore tra un'abitazione in classe G e una comparabile in classe B può raggiungere il 15-22% nelle principali città italiane.</p>
<p>In questo contesto, la sostituzione delle finestre con serramenti ad alta efficienza energetica emerge come l'intervento con il miglior rapporto tra costo, impatto sulla classe energetica, invasività dei lavori e velocità di esecuzione. In questa guida approfondita spieghiamo tutto: come si calcola la classe energetica, quale ruolo giocano le finestre, come scegliere il prodotto giusto e quali benefici concreti aspettarsi.</p>

<h2>Come si calcola la classe energetica: l'APE spiegato semplicemente</h2>
<p>La classe energetica di un'abitazione viene determinata attraverso l'<strong>Attestato di Prestazione Energetica (APE)</strong>, un documento obbligatorio redatto da un tecnico abilitato (ingegnere, architetto, geometra con apposita certificazione). L'APE è obbligatorio in caso di compravendita, locazione con contratto superiore a 30 giorni, e — dal 2024 — anche per accedere a diversi tipi di incentivi edilizi.</p>
<p>Il calcolo dell'APE si basa sull'<strong>indice EPgl</strong> (Energia Primaria globale non rinnovabile), espresso in kWh/m²/anno. Questo indice rappresenta quanta energia primaria non rinnovabile consuma l'edificio ogni anno per ogni metro quadro di superficie utile, tenendo conto di tutti i servizi energetici: riscaldamento, raffrescamento, acqua calda sanitaria, ventilazione meccanica, illuminazione (quest'ultima solo per gli edifici non residenziali).</p>
<p>Il tecnico che redige l'APE raccoglie i dati dell'edificio (orientamento, dimensioni, stratigrafia delle pareti, caratteristiche delle finestre, tipo di impianto termico, ecc.), li inserisce in un software di calcolo certificato secondo le norme UNI/TS 11300, e ottiene il valore EPgl che determina la classe energetica.</p>
<p>Per quanto riguarda specificatamente le finestre, il tecnico inserisce nel calcolo il <strong>valore Uw</strong> dei serramenti (trasmittanza termica totale), le dimensioni di ciascuna finestra, l'orientamento (nord, sud, est, ovest), la presenza di schermature solari (persiane, tapparelle, tende esterne) e le caratteristiche di trasmissione solare del vetro (fattore solare g). Tutti questi dati influenzano il bilancio energetico dell'edificio: le finestre sono al tempo stesso fonti di perdita termica (di notte e d'inverno) e fonti di guadagno solare (di giorno nelle stagioni fredde con esposizione favorevole).</p>
<p>La modifica dei serramenti è uno degli interventi che più significativamente può alterare l'APE in positivo, perché agisce direttamente su un parametro inserito nel calcolo con peso rilevante. Sostituire finestre con Uw 2,8 con finestre Uw 1,1 può ridurre il fabbisogno di riscaldamento dell'edificio del 15-25%, con un impatto diretto sull'indice EPgl e quindi sulla classe energetica assegnata.</p>

<h2>Le classi energetiche A4-G: cosa significano i numeri</h2>
<p>Il sistema italiano di classificazione energetica degli edifici prevede 10 classi, dalla A4 (la migliore) alla G (la peggiore). La classificazione si basa sul rapporto tra l'EPgl dell'edificio e un valore di riferimento EPgl,rif calcolato in funzione delle caratteristiche geometriche dell'edificio e della zona climatica.</p>

<table>
  <thead>
    <tr>
      <th>Classe Energetica</th>
      <th>Rapporto EPgl / EPgl,rif</th>
      <th>Consumo tipico (kWh/m²/anno)</th>
      <th>Descrizione</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>A4</strong></td>
      <td>≤ 0,40</td>
      <td>&lt; 15</td>
      <td>Casa passiva / nZEB — quasi zero energia</td>
    </tr>
    <tr>
      <td><strong>A3</strong></td>
      <td>0,40 – 0,60</td>
      <td>15 – 30</td>
      <td>Edificio ad altissima efficienza</td>
    </tr>
    <tr>
      <td><strong>A2</strong></td>
      <td>0,60 – 0,80</td>
      <td>30 – 50</td>
      <td>Edificio molto efficiente</td>
    </tr>
    <tr>
      <td><strong>A1</strong></td>
      <td>0,80 – 1,00</td>
      <td>50 – 70</td>
      <td>Edificio efficiente — standard nuove costruzioni 2026</td>
    </tr>
    <tr>
      <td><strong>B</strong></td>
      <td>1,00 – 1,20</td>
      <td>70 – 90</td>
      <td>Buona efficienza — obiettivo ristrutturazione</td>
    </tr>
    <tr>
      <td><strong>C</strong></td>
      <td>1,20 – 1,50</td>
      <td>90 – 120</td>
      <td>Discreta efficienza — abitazioni recenti ristrutturate</td>
    </tr>
    <tr>
      <td><strong>D</strong></td>
      <td>1,50 – 2,00</td>
      <td>120 – 160</td>
      <td>Efficienza nella media — abitazioni anni '90-2000</td>
    </tr>
    <tr>
      <td><strong>E</strong></td>
      <td>2,00 – 2,60</td>
      <td>160 – 220</td>
      <td>Bassa efficienza — abitazioni anni '80</td>
    </tr>
    <tr>
      <td><strong>F</strong></td>
      <td>2,60 – 3,50</td>
      <td>220 – 300</td>
      <td>Molto bassa efficienza — abitazioni anni '70</td>
    </tr>
    <tr>
      <td><strong>G</strong></td>
      <td>&gt; 3,50</td>
      <td>&gt; 300</td>
      <td>Pessima efficienza — edifici ante 1973 senza interventi</td>
    </tr>
  </tbody>
</table>

<p>Per contestualizzare questi numeri: un'abitazione in classe G a Milano (zona E) con 120 m² di superficie utile consuma tipicamente tra 36.000 e 45.000 kWh di energia primaria annua per il solo riscaldamento. Convertendo in gas naturale (potere calorifico 10 kWh/m³ circa), questo equivale a 3.600-4.500 m³ di gas all'anno. A tariffe attuali di 0,90-1,10 euro/m³, si parla di una bolletta del gas di 3.200-4.950 euro annui soltanto per il riscaldamento. In classe B, lo stesso appartamento consumerebbe circa 1.100-1.300 euro. La differenza è abissale.</p>

<h2>Le finestre nel bilancio energetico: dati reali sulle dispersioni</h2>
<p>Per comprendere l'importanza delle finestre nella classe energetica, è necessario analizzare il bilancio termico di un edificio con un approccio quantitativo. Le dispersioni termiche di un'abitazione avvengono attraverso diversi elementi dell'involucro edilizio, con pesi diversi a seconda della costruzione.</p>
<p>Secondo le elaborazioni del Politecnico di Milano su un'abitazione tipo degli anni '80 in zona E:</p>
<ul>
  <li><strong>Pareti opache esterne:</strong> 35-40% delle dispersioni totali</li>
  <li><strong>Finestre e serramenti:</strong> 25-35% delle dispersioni totali</li>
  <li><strong>Tetto e solaio di copertura:</strong> 15-20% delle dispersioni totali</li>
  <li><strong>Solaio verso terreno o garage:</strong> 8-12% delle dispersioni totali</li>
  <li><strong>Ponti termici:</strong> 5-10% delle dispersioni totali</li>
</ul>
<p>Le finestre, pur occupando una superficie spesso inferiore al 20% dell'involucro totale, sono responsabili del 25-35% delle perdite di calore. Questo accade perché la trasmittanza termica di un vetro — anche di buona qualità — è molto superiore a quella di una parete ben coibentata. Una parete con cappotto da 12 cm ha una trasmittanza U di circa 0,25-0,30 W/m²K; una finestra anni '90 ne ha 2,8 W/m²K. La finestra disperde circa 10 volte più calore per unità di superficie rispetto a una parete coibentata.</p>
<p>Questo spiega perché, in molti casi, la sostituzione delle finestre è il primo passo più efficace nel percorso di miglioramento della classe energetica: è un intervento relativamente rapido, poco invasivo (non richiede opere murarie significative), completamente finanziabile con le detrazioni fiscali, e con un impatto immediatamente misurabile sull'APE.</p>

<h2>Il valore Uw: la misura che determina tutto</h2>
<p>Il <strong>valore Uw</strong> (trasmittanza termica totale del serramento, in W/m²K) è il parametro tecnico fondamentale che descrive le prestazioni energetiche di una finestra. La lettera "U" rappresenta il coefficiente di trasmittanza termica, la "w" sta per "window" (finestra). Un Uw basso significa alta resistenza al passaggio del calore, cioè ottima prestazione energetica.</p>
<p>Il valore Uw è una media pesata della trasmittanza del vetro (Ug), della trasmittanza del telaio (Uf) e dei ponti termici lineici del distanziatore perimetrale (Psi-spacer), calcolata secondo la norma UNI EN ISO 10077-1. La formula tiene conto delle superfici di ciascun componente rispetto alla superficie totale della finestra.</p>

<table>
  <thead>
    <tr>
      <th>Valore Uw (W/m²K)</th>
      <th>Qualità isolamento</th>
      <th>Tipologia finestra</th>
      <th>Classe energetica edificio (zona E)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>5,0 – 6,0</td>
      <td>Pessima</td>
      <td>Singolo vetro con telaio metallico anni '60-'70</td>
      <td>Contribuisce alla classe F-G</td>
    </tr>
    <tr>
      <td>3,0 – 4,0</td>
      <td>Molto scarsa</td>
      <td>Doppio vetro aria senza Low-E, telaio in alluminio senza taglio termico</td>
      <td>Contribuisce alla classe E-F</td>
    </tr>
    <tr>
      <td>2,0 – 2,8</td>
      <td>Scarsa</td>
      <td>Doppio vetro con argon, telaio in alluminio con taglio termico o PVC base</td>
      <td>Contribuisce alla classe D-E</td>
    </tr>
    <tr>
      <td>1,4 – 1,9</td>
      <td>Buona</td>
      <td>Doppio vetro argon + Low-E, PVC 5 camere — standard minimo nuove costruzioni</td>
      <td>Contribuisce alla classe C-D</td>
    </tr>
    <tr>
      <td>1,0 – 1,3</td>
      <td>Ottima</td>
      <td>Doppio vetro argon + Low-E avanzato, PVC 5-6 camere — <a href="/prodotti/dmr-confort">DMR Confort</a>, <a href="/prodotti/dmr-domus">DMR Domus</a></td>
      <td>Contribuisce alla classe B-C</td>
    </tr>
    <tr>
      <td>0,6 – 0,9</td>
      <td>Eccellente</td>
      <td>Triplo vetro krypton/argon + Low-E doppio, PVC 6-7 camere — <a href="/prodotti/dmr-passive">DMR Passive</a></td>
      <td>Contribuisce alla classe A1-A3</td>
    </tr>
  </tbody>
</table>

<p>La scelta del valore Uw ottimale dipende dalla zona climatica, dall'obiettivo di classe energetica e dal budget disponibile. Per la maggior parte delle abitazioni italiane nelle zone D-E, una finestra con Uw 1,1-1,3 W/m²K rappresenta il giusto equilibrio tra prestazioni, costo e ritorno sull'investimento.</p>

<h2>Vetro, gas e profilo: i tre elementi che fanno la differenza</h2>
<p>La performance energetica di un serramento è il risultato combinato di tre componenti principali: il <strong>vetro</strong>, il <strong>gas nell'intercapedine</strong> e il <strong>profilo del telaio</strong>. Comprendere ciascuno di questi elementi aiuta a fare scelte consapevoli e a confrontare correttamente i preventivi di fornitori diversi.</p>
<h3>Il vetro: il contributo del componente più visibile</h3>
<p>Il vetro è il componente con la superficie maggiore e quello che influenza maggiormente il valore Ug (trasmittanza del solo vetro). Un <strong>vetro basso emissivo (Low-E)</strong> ha un sottilissimo rivestimento metallico applicato su una delle superfici interne dell'intercapedine, che riduce l'emissività termica del vetro e quindi la trasmissione di calore per irraggiamento. Un vetro doppio con argon e Low-E raggiunge valori Ug di 1,0-1,1 W/m²K, rispetto ai 2,6-2,8 W/m²K di un doppio vetro semplice con aria.</p>
<p>Il <strong>fattore solare g</strong> del vetro (trasmissione dell'energia solare) è un altro parametro importante: un vetro con g elevato lascia passare più energia solare (vantaggio in inverno per le superfici a sud), mentre un vetro con g basso è preferibile per finestre esposte a ovest o est in climi caldi. La corretta selezione del vetro Low-E in base all'orientamento può ottimizzare i guadagni solari passivi e ridurre ulteriormente il fabbisogno energetico dell'edificio.</p>
<h3>Il gas nell'intercapedine: argon vs krypton vs aria</h3>
<p>L'intercapedine tra i vetri è riempita con un gas che ha proprietà di isolamento termico migliori dell'aria. L'<strong>argon</strong> è il gas standard: ha una conducibilità termica del 34% inferiore all'aria, costa relativamente poco ed è completamente sicuro e inerte. Il <strong>krypton</strong> ha prestazioni ancora migliori (conducibilità inferiore all'aria del 64%) ma costa significativamente di più. Il krypton è usato principalmente nelle finestre a triplo vetro per mantenere gli spessori contenuti pur raggiungendo valori Ug molto bassi.</p>
<p>Nella pratica, per le applicazioni residenziali standard in zone D-E, l'argon offre il miglior rapporto prestazioni/costo. Il krypton diventa interessante solo nelle finestre per case passive dove si richiedono valori Ug inferiori a 0,6 W/m²K.</p>
<h3>Il profilo del telaio: camere e materiali</h3>
<p>Il telaio in PVC contribuisce al valore Uw complessivo attraverso il proprio coefficiente di trasmittanza Uf. Un profilo PVC a <strong>5 camere</strong> raggiunge tipicamente valori Uf di 1,2-1,4 W/m²K; un profilo a <strong>6 camere</strong> scende a 1,0-1,2 W/m²K. La differenza sembra piccola, ma su una finestra dove il telaio occupa il 20-30% della superficie totale, si traduce in un miglioramento del Uw finale di 0,05-0,10 W/m²K.</p>
<p>Il profilo PVC ha il vantaggio di non condurre calore come il metallo (alluminio, acciaio) e non richiede il "taglio termico" che è invece necessario nei telai in alluminio. Questo rende i profili PVC intrinsecamente superiori in termini di isolamento termico del telaio, a parità di numero di camere, rispetto ai concorrenti metallici.</p>

<h2>Da classe F a classe B: percorso realistico per una casa degli anni '80</h2>
<p>Per rendere concreto il percorso di miglioramento della classe energetica, seguiamo l'esempio di una villetta bifamiliare tipica degli anni '80: 140 m² di superficie riscaldata, zona E (comuni del Nord Italia come Bergamo, Brescia, Modena, Padova), attualmente in classe F con un fabbisogno di riscaldamento di 230 kWh/m²/anno.</p>
<p><strong>Situazione di partenza:</strong> pareti in mattoni forati senza isolamento (U ≈ 1,0 W/m²K), tetto non coibentato (U ≈ 1,8 W/m²K), serramenti in alluminio senza taglio termico con doppio vetro aria anni '90 (Uw ≈ 3,2 W/m²K), caldaia a gasolio di 20 anni. APE: classe F, 230 kWh/m²/anno, bolletta annua stimata circa 3.800 euro.</p>
<p><strong>Percorso di riqualificazione in tre fasi:</strong></p>
<ol>
  <li><strong>Fase 1 — Sostituzione serramenti (anno 0):</strong> sostituzione di 10 finestre e 2 porte-finestre con <a href="/prodotti/dmr-confort">DMR Confort</a> (Uw 1,1 W/m²K), aggiunta di <a href="/prodotti/cassonetti">cassonetti coibentati</a> e <a href="/prodotti/tapparelle">tapparelle coibentate</a>, installazione di un <a href="/prodotti/portoncini">portoncino coibentato</a>. Costo stimato: 16.000 euro. Nuova classe energetica attesa: da F a D. Risparmio energetico annuo: circa 600 euro. Detrazione Ecobonus 50%: 8.000 euro in 10 anni.</li>
  <li><strong>Fase 2 — Cappotto termico (anno 1-2):</strong> applicazione di cappotto in EPS da 12 cm sulle pareti esterne (U pareti: da 1,0 a 0,25 W/m²K) e coibentazione del tetto. Costo stimato: 28.000 euro. Nuova classe energetica attesa: da D a B+. Risparmio energetico aggiuntivo: circa 800 euro/anno.</li>
  <li><strong>Fase 3 — Impianto termico (anno 2-3):</strong> sostituzione della caldaia a gasolio con pompa di calore aria-acqua ad alta efficienza. Costo stimato: 14.000 euro. Nuovo fabbisogno energetico: riduzione del 60% grazie al COP della pompa di calore. Classe energetica attesa: B o A1.</li>
</ol>
<p><strong>Risultato finale:</strong> in 3 anni e con un investimento complessivo di circa 58.000 euro (di cui circa il 50% recuperato con le detrazioni), la villetta passa da classe F a classe A1-B. La bolletta energetica scende da circa 3.800 euro/anno a circa 800-1.000 euro/anno. Il valore dell'immobile aumenta stimabilmente del 15-20%. La partenza con i serramenti nella Fase 1 è strategica: permette di beneficiare delle detrazioni Ecobonus, di misurare subito il miglioramento in bolletta, e di preparare l'involucro per il cappotto nella Fase 2.</p>

<h2>Risparmio in bolletta per zona climatica: calcoli con esempi</h2>
<p>Il risparmio in bolletta derivante dalla sostituzione delle finestre varia significativamente in base alla zona climatica, alle dimensioni dell'edificio, alla superficie vetrata e ai valori Uw prima e dopo l'intervento. La tabella seguente fornisce stime indicative per un'abitazione di 100 m² con 8 finestre standard (superficie vetrata totale circa 12 m²), passando da Uw 2,8 a Uw 1,1 W/m²K.</p>

<table>
  <thead>
    <tr>
      <th>Zona Climatica</th>
      <th>Gradi Giorno</th>
      <th>Principali città</th>
      <th>Risparmio riscaldamento (stima)</th>
      <th>Risparmio annuo in euro</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Zona B</strong></td>
      <td>900 – 1.400</td>
      <td>Palermo, Catania, Reggio Calabria</td>
      <td>8 – 12%</td>
      <td>120 – 180 €</td>
    </tr>
    <tr>
      <td><strong>Zona C</strong></td>
      <td>1.400 – 2.100</td>
      <td>Napoli, Bari, Roma, Salerno</td>
      <td>12 – 17%</td>
      <td>190 – 280 €</td>
    </tr>
    <tr>
      <td><strong>Zona D</strong></td>
      <td>2.100 – 3.000</td>
      <td>Firenze, Genova, Pescara, Ancona</td>
      <td>16 – 22%</td>
      <td>280 – 420 €</td>
    </tr>
    <tr>
      <td><strong>Zona E</strong></td>
      <td>3.000 – 4.000</td>
      <td>Milano, Torino, Bologna, Verona, Venezia</td>
      <td>18 – 26%</td>
      <td>380 – 580 €</td>
    </tr>
    <tr>
      <td><strong>Zona F</strong></td>
      <td>&gt; 4.000</td>
      <td>Bolzano, Aosta, Cuneo alta quota</td>
      <td>22 – 30%</td>
      <td>520 – 780 €</td>
    </tr>
  </tbody>
</table>

<p>Le stime si riferiscono al solo risparmio di riscaldamento invernale e assumono un costo del gas di circa 1,00 euro/m³ (IVA inclusa). Se si considera anche il contributo delle finestre alla riduzione del raffrescamento estivo (riduzione degli apporti solari indesiderati con vetri a controllo solare e schermature), il risparmio totale può essere superiore del 15-25% nelle zone più calde.</p>

<h2>Ponti termici intorno alle finestre: il problema nascosto</h2>
<p>Uno degli errori più comuni nella sostituzione dei serramenti è concentrarsi esclusivamente sulla finestra in sé, ignorando i cosiddetti <strong>ponti termici</strong> che si formano nella zona perimetrale del serramento — e in particolare a livello del cassonetto avvolgibile, quando presente.</p>
<p>Un ponte termico è una zona dell'involucro edilizio con trasmittanza termica significativamente più alta rispetto all'area circostante. Intorno alle finestre i ponti termici si formano per due ragioni principali:</p>
<ul>
  <li><strong>La spalletta e il davanzale:</strong> i vani finestra nelle pareti degli edifici anni '70-'80 spesso non prevedono alcun isolamento di giunzione tra il telaio della finestra e la parete. Il materiale della parete (mattone, calcestruzzo) conduce calore molto più rapidamente dei materiali isolanti moderni, creando una "via di fuga" preferenziale per il calore.</li>
  <li><strong>Il cassonetto avvolgibile:</strong> i cassonetti tradizionali non coibentati sono cavità ventilate nell'involucro edilizio, con pareti sottili che comunicano direttamente con l'esterno. Un cassonetto non coibentato può avere una trasmittanza equivalente di 3-5 W/m²K, vanificando parzialmente i benefici della finestra sottostante. Secondo le stime degli energetici, un cassonetto non coibentato può causare fino al 30% delle dispersioni totali di un "sistema finestra" composto da cassonetto + serramento + persiana.</li>
</ul>
<p>La soluzione completa prevede l'installazione dei <a href="/prodotti/cassonetti">cassonetti coibentati ThermoDMR</a>, che riducono la trasmittanza del cassonetto a valori compatibili con i serramenti ad alte prestazioni. L'abbinamento di finestra ad alta efficienza, cassonetto coibentato e <a href="/prodotti/tapparelle">tapparella coibentata</a> costituisce il "sistema finestra" ottimale per il massimo isolamento complessivo.</p>

<h2>Cassonetti coibentati: il completamento necessario</h2>
<p>Il cassonetto coibentato è probabilmente il componente meno conosciuto e più sottovalutato dell'intero sistema finestra. Eppure, in un'abitazione con cassonetti avvolgibili (la stragrande maggioranza degli edifici italiani degli anni '70-'90), il cassonetto rappresenta una delle principali cause di dispersione termica localizzata e di infiltrazioni d'aria fredda.</p>
<p>I cassonetti tradizionali presentano sistematicamente tre problemi:</p>
<ol>
  <li><strong>Scarso isolamento termico:</strong> le pareti del cassonetto in legno o lamiera hanno trasmittanza termica molto alta. Il calore dell'ambiente interno attraversa facilmente la parete del cassonetto verso l'esterno.</li>
  <li><strong>Infiltrazioni d'aria:</strong> la fessura di passaggio della tapparella è spesso non sigillata e permette all'aria fredda esterna di entrare nell'abitazione, creando correnti fredde fastidiose e riducendo l'isolamento effettivo del sistema.</li>
  <li><strong>Condensa:</strong> la differenza di temperatura tra la superficie interna del cassonetto (fredda per le dispersioni) e l'aria calda e umida dell'interno crea condizione favorevoli alla condensa, che può portare a problemi di muffa nel tempo.</li>
</ol>
<p>I <a href="/prodotti/cassonetti">cassonetti coibentati ThermoDMR</a> risolvono tutti e tre i problemi con una struttura isolata che riduce la trasmittanza a valori paragonabili a quelli della parete circostante, guarnizioni anti-infiltrazione sulla fessura della tapparella, e superfici interne trattate per prevenire la condensa. L'installazione del cassonetto coibentato contestualmente alla sostituzione della finestra è l'approccio ottimale sia in termini tecnici sia ai fini delle detrazioni fiscali.</p>

<h2>La Direttiva Case Green (EPBD 2024): cosa cambia per i proprietari italiani</h2>
<p>La Direttiva Europea sull'Efficienza Energetica degli Edifici (EPBD — Energy Performance of Buildings Directive, 2024) rappresenta il quadro normativo europeo più ambizioso mai adottato per il settore edilizio. Recepita in Italia nel 2024-2025, questa direttiva ha implicazioni concrete per chiunque possieda un immobile residenziale nel Paese.</p>
<p><strong>Gli obiettivi principali della direttiva:</strong></p>
<ul>
  <li>Tutti i nuovi edifici residenziali devono essere a emissioni zero entro il 2030</li>
  <li>Gli edifici residenziali esistenti devono raggiungere almeno la classe energetica E entro il 2030, e almeno la classe D entro il 2033</li>
  <li>Gli edifici non residenziali hanno scadenze anticipate (classe F entro 2027, classe E entro 2030)</li>
</ul>
<p><strong>Cosa significa in pratica per un proprietario italiano:</strong> se possiedi un'abitazione in classe G, F o E con obbligo di salire in classe D entro il 2033, hai circa 7-8 anni per effettuare gli interventi necessari. Questo è un lasso di tempo sufficiente per pianificare i lavori in modo razionale, usufruendo delle detrazioni fiscali disponibili e distribuendo l'investimento nel tempo. Chi invece aspetta i prossimi anni potrebbe trovarsi in una situazione di urgenza, con meno incentivi disponibili e prezzi dei materiali e manodopera potenzialmente più alti per l'aumento della domanda.</p>
<p><strong>Il ruolo delle finestre nella conformità EPBD:</strong> la sostituzione dei serramenti, pur non essendo sufficiente da sola a raggiungere la classe D in edifici molto inefficienti, è quasi sempre il primo passo nel percorso di riqualificazione, perché si abbina perfettamente ad altri interventi (cappotto, impianto termico) e contribuisce in modo misurabile al miglioramento dell'APE.</p>
<p><strong>Il "green mortgage" (mutuo verde):</strong> le banche europee, su impulso della normativa e delle politiche della Banca Centrale Europea, stanno sviluppando prodotti di finanziamento agevolati per gli interventi di miglioramento energetico degli edifici. Questi "mutui verdi" o "finanziamenti sostenibili" offrono tassi d'interesse più favorevoli rispetto ai mutui standard, riducendo ulteriormente il costo dell'intervento di sostituzione dei serramenti.</p>

<h2>Finestre e valore immobiliare: i dati del mercato 2026</h2>
<p>L'impatto della classe energetica sul valore degli immobili è ormai un dato consolidato, non più una speculazione teorica. Le analisi di mercato condotte da Nomisma, Tecnoborsa e dalle principali agenzie immobiliari italiane nel 2025-2026 forniscono dati chiari sul cosiddetto "green premium" — il sovraprezzo ottenuto dagli immobili con migliore efficienza energetica.</p>
<p>I dati più recenti indicano che:</p>
<ul>
  <li>A parità di metratura, zona e caratteristiche, un immobile in <strong>classe B o A</strong> ottiene mediamente il 15-22% in più rispetto a uno in classe F o G nelle principali città italiane</li>
  <li>La differenza è più marcata nelle città universitarie e nei capoluoghi con popolazione giovane e istruita, più sensibile ai temi energetici</li>
  <li>Nelle compravendite, la classe energetica è ormai uno dei primi tre criteri di valutazione per il 68% degli acquirenti (fonte: survey Tecnoborsa 2025)</li>
  <li>Gli immobili in classe D o inferiore richiedono tempi di vendita mediamente del 35% più lunghi rispetto a quelli in classe C o superiore</li>
</ul>
<p>Per un appartamento di 100 m² del valore di 250.000 euro in classe G, passare alla classe B potrebbe significare un aumento di valore di 37.500-55.000 euro. Considerando che il costo totale degli interventi necessari (serramenti + cappotto + impianto) potrebbe aggirarsi sui 45.000-60.000 euro al lordo delle detrazioni (e 25.000-35.000 euro al netto), il saldo dell'operazione in termini di valore patrimoniale è sostanzialmente in pareggio o positivo — a cui si aggiunge il risparmio energetico annuo di 2.000-2.500 euro.</p>

<h2>Il protocollo di intervento: in che ordine fare i lavori</h2>
<p>Molti proprietari si chiedono qual è il giusto ordine con cui affrontare gli interventi di riqualificazione energetica. La risposta dipende dal budget disponibile e dalla situazione di partenza, ma esiste un protocollo di intervento generalmente riconosciuto come ottimale.</p>
<p><strong>Principio fondamentale: lavorare dall'esterno verso l'interno</strong>. Prima si migliora l'involucro (ciò che separa l'interno dall'esterno), poi si ottimizza l'impianto termico. Seguire l'ordine inverso significa rischiare di sovradimensionare l'impianto (perché calcolato su un edificio non ancora coibentato) e poi ritrovarsi con un impianto troppo potente dopo la coibentazione.</p>
<ol>
  <li><strong>Primo: serramenti</strong> — il cambio delle finestre è il più veloce da realizzare, il meno invasivo per la quotidianità degli abitanti, e offre subito un miglioramento misurabile in bolletta. Permette anche di pianificare meglio gli interventi successivi con i risparmi ottenuti.</li>
  <li><strong>Secondo: tetto e solaio</strong> — la coibentazione del tetto (se piano) o del solaio di copertura è spesso realizzabile senza abitare fuori dall'immobile e con costi contenuti. Il suo impatto sull'EPgl è significativo.</li>
  <li><strong>Terzo: pareti opache (cappotto)</strong> — il cappotto esterno è l'intervento più incisivo ma anche il più costoso e invasivo. Va fatto dopo i serramenti perché altrimenti si rischia di dover rifare parte del lavoro (il cappotto deve coprire anche la spalletta delle finestre, e se le finestre sono già state sostituite questo richiede un coordinamento specifico).</li>
  <li><strong>Quarto: impianto termico</strong> — una volta che l'involucro è migliorato, il fabbisogno energetico è ridotto e si può dimensionare l'impianto (pompa di calore, solare termico, ecc.) in modo ottimale per le nuove condizioni.</li>
</ol>
<p>Questo ordine non è sempre rigidamente applicabile (a volte il budget o le opportunità di incentivo impongono un diverso sequenziamento), ma rimane il riferimento tecnico ottimale per chi vuole massimizzare i risultati con investimento razionale.</p>

<h2>Domande frequenti sulla classe energetica e i serramenti</h2>
<p>Rispondiamo alle domande più frequenti che riceviamo dai clienti che vogliono migliorare la classe energetica della propria abitazione con la sostituzione delle finestre.</p>
<ul>
  <li><strong>Quante classi energetiche guadagno solo con le finestre?</strong> Dipende dalla situazione di partenza. In un edificio in classe G o F con finestre molto vecchie (Uw 4-5), il solo cambio dei serramenti con prodotti Uw 1,1 può portare un guadagno di 1-2 classi. In edifici già in classe D con buon involucro, il guadagno è di 1 classe o meno.</li>
  <li><strong>Ho bisogno di un nuovo APE dopo aver cambiato le finestre?</strong> Non è obbligatorio aggiornare l'APE dopo la sostituzione delle finestre, a meno che non si debba vendere o affittare l'immobile. Tuttavia, un APE aggiornato con i nuovi valori Uw documenta il miglioramento ottenuto e valorizza l'immobile in caso di compravendita futura.</li>
  <li><strong>Le finestre con doppio vetro argon e Low-E sono sufficienti per la classe A?</strong> In generale no, non da sole. Per raggiungere la classe A è necessario un intervento integrato sull'intero involucro (pareti, tetto) e sull'impianto termico. Le finestre sono parte essenziale del sistema, ma non sufficiente da sole per gli edifici più datati.</li>
  <li><strong>Qual è il miglior periodo dell'anno per sostituire le finestre?</strong> Tecnicamente i lavori sono fattibili tutto l'anno, ma primavera e autunno sono le stagioni ottimali per evitare il caldo estivo e il freddo invernale durante la fase di installazione. La sostituzione di una finestra richiede generalmente 30-60 minuti per apertura con minima esposizione all'esterno.</li>
</ul>
<p>Per una valutazione personalizzata della vostra situazione, ThermoDMR offre <strong>sopralluogo tecnico gratuito</strong> con stima del miglioramento energetico atteso, indicazione della zona climatica e proposta di prodotto ottimale per le vostre esigenze. <a href="/contatti">Richiedi il tuo appuntamento →</a></p>

<h2>Scegliere il prodotto giusto dalla gamma ThermoDMR in base alla classe energetica</h2>
<p>La gamma ThermoDMR è stata progettata per rispondere a esigenze diverse di efficienza energetica. Ecco come orientarsi in base alla classe energetica che si vuole raggiungere:</p>
<ul>
  <li><strong>DMR Domus (5 camere, doppio vetro Uw 1,4)</strong> — adatto per migliorare di 1 classe rispetto a serramenti anni '90. Ottimo per chi parte da classe E o F e punta alla classe D con budget contenuto.</li>
  <li><strong>DMR Confort (5 camere, doppio vetro argon Low-E, Uw 1,1)</strong> — il best seller: aggiorna di 1-2 classi energetiche, rispetta tutti i requisiti normativi vigenti e futuri fino al 2030. Ideale per la maggior parte delle sostituzioni residenziali.</li>
  <li><strong>DMR Passive (6 camere, triplo vetro, Uw ≤0,8)</strong> — per chi punta alla classe A o all'efficienza dell'edificio passivo. Necessario in zona climatica E e F o per edifici con fabbisogno quasi zero (nZEB).</li>
</ul>
<p>Tutti i prodotti ThermoDMR sono prodotti con profil german certificat, vin cu Declarație de Performanță CE, garanție 15 ani pe profil și sunt compatibili cu cerințele programelor de finanțare AFM. La ordinul dumneavoastră, furnizăm toate documentele tehnice necesare pentru dosarul de eficiență energetică.</p>
<p style="text-align:center; margin-top:2rem;">
  <a href="/contatti" style="background:#1a56db;color:#fff;padding:14px 32px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:1.1rem;">Richiedi consulenza gratuita sulla classe energetica →</a>
</p>
<p>Il cambiamento climatico e l'aumento del costo dell'energia rendono l'efficienza energetica degli edifici sempre più centrale nelle scelte abitative. Investire oggi in serramenti di qualità significa proteggersi da aumenti futuri dei costi energetici, aumentare il valore del proprio immobile e contribuire concretamente alla riduzione delle emissioni di CO₂ — un obiettivo condiviso da istituzioni europee e proprietari responsabili. Con ThermoDMR, questo investimento è accompagnato da competenza tecnica certificata e supporto in ogni fase del processo.</p>
    `.trim(),
  },

  {
    slug: "triplo-vetro-o-doppio-vetro-guida-2026",
    lang: "it",
    title: "Triplo Vetro o Doppio Vetro? La Scelta Giusta nel 2026",
    description: "Triplo vetro o doppio vetro? Confronto completo per il 2026: costi, isolamento termico, risparmio energetico. Quando vale davvero la pena investire.",
    date: "2026-04-12",
    category: "Guide",
    readingTime: 17,
    heroImage: "https://images.unsplash.com/photo-1600566753376-12c8ab7c5a38?w=1200&q=80",
    content: `
<h2>Introduzione: una scelta che vale migliaia di euro</h2>
<p>Quando si pianifica la sostituzione delle finestre, la scelta tra <strong>doppio vetro</strong> e <strong>triplo vetro</strong> è probabilmente la decisione tecnica con il maggiore impatto economico di tutto l'intervento. Non si tratta di una differenza marginale: a parità di dimensioni e profilo, una finestra con triplo vetro costa mediamente il 20-40% in più rispetto alla versione con doppio vetro. Su un'abitazione con 8-10 finestre, questa differenza può valere 1.500-4.000 euro in più.</p>
<p>La domanda che ogni proprietario si pone è legittima: vale davvero la pena spendere di più per il triplo vetro? La risposta onesta — che molti fornitori evitano di dare chiaramente — è: <strong>dipende dalla zona climatica, dall'esposizione dell'edificio, dagli obiettivi energetici e dal tipo di doppio vetro con cui si confronta il triplo</strong>. Un doppio vetro moderno con argon e rivestimento basso emissivo (Low-E) è già un prodotto ad alte prestazioni, non paragonabile al vecchio doppio vetro con aria dei serramenti anni '90.</p>
<p>In questa guida approfondita analizziamo nel dettaglio costruttivo, tecnico ed economico le differenze tra doppio e triplo vetro nel 2026. L'obiettivo non è convincervi di un prodotto o dell'altro, ma fornirvi tutti gli elementi per una decisione informata e razionale, adeguata alla vostra specifica situazione.</p>

<h2>Anatomia del doppio vetro: come è fatto e come funziona</h2>
<p>Comprendere la struttura tecnica del <strong>doppio vetro</strong> è il punto di partenza per valutare correttamente le sue prestazioni. Una vetrata isolante a doppio vetro (chiamata anche "vetrocamera" o in inglese "IGU — Insulated Glass Unit") è composta da tre elementi principali: due lastre di vetro e un'intercapedine sigillata.</p>
<p><strong>Le lastre di vetro:</strong> lo spessore standard di ciascuna lastra è di 4 mm per le applicazioni residenziali, ma può variare da 3 mm (per finestre piccole e leggere) a 6 mm (per finestre grandi o con requisiti acustici elevati). Il vetro di base è vetro float (vetro piano standard); sulle superfici interne dell'intercapedine vengono applicati rivestimenti funzionali che modificano le proprietà termiche e acustiche.</p>
<p><strong>Il rivestimento basso emissivo (Low-E):</strong> è lo strato funzionale più importante nelle vetrate moderne. Si tratta di un deposito metallico sottilissimo (nell'ordine dei nanometri) applicato sulla superficie interna del vetro rivolto verso l'intercapedine. Il rivestimento Low-E riduce l'emissività della superficie, cioè la sua capacità di irraggiare calore verso l'esterno. Senza Low-E, il calore dell'interno viene irraggiato verso il vetro esterno e dissipato all'esterno; con Low-E, questo irraggiamento è fortemente ridotto. Il risultato è una riduzione della trasmittanza Ug di circa il 50% rispetto allo stesso vetro senza rivestimento: un doppio vetro standard (aria, no Low-E) ha Ug ≈ 2,8 W/m²K; lo stesso vetro con argon e Low-E scende a Ug ≈ 1,0-1,1 W/m²K.</p>
<p><strong>L'intercapedine e il distanziatore:</strong> lo spazio tra le lastre (tipicamente 12-16 mm per il doppio vetro standard) è delimitato da un distanziatore perimetrale e sigillato con materiale butilico e silicone. Il distanziatore tradizionale è in alluminio, ma l'alluminio è un buon conduttore termico e crea un "ponte termico lineare" sul perimetro della vetrata. I distanziatori moderni in acciaio inox, materiale composito (fibra di vetro + resina) o plastica rinforzata — spesso chiamati "warm edge" o bordo caldo — riducono significativamente questo ponte termico perimetrale e migliorano il valore Uw complessivo della finestra di 0,05-0,10 W/m²K.</p>
<p><strong>Il gas nell'intercapedine:</strong> l'intercapedine non contiene aria semplice (nelle versioni di qualità), bensì gas argon, che ha una conducibilità termica di circa 17 mW/(m·K) contro i 26 mW/(m·K) dell'aria — il 34% in meno. L'argon è inerte, atossico, abbondante (costituisce circa l'1% dell'atmosfera) e di costo contenuto. Nelle versioni premium si usa krypton (conducibilità 9 mW/(m·K)), ma il costo significativamente superiore ne limita l'uso al solo triplo vetro di alta gamma.</p>
<p>Il risultato di questa combinazione — Low-E + argon + distanziatore warm edge — è un vetrocamera a doppio vetro che può raggiungere valori Ug di 0,9-1,1 W/m²K. Unito a un profilo PVC a 5 camere, si ottiene una finestra con Uw di 1,0-1,3 W/m²K: un risultato eccellente, adeguato agli standard energetici più rigorosi per le zone climatiche D-E.</p>

<h2>Anatomia del triplo vetro: la terza lastra che cambia tutto</h2>
<p>Il <strong>triplo vetro</strong> aggiunge una terza lastra di vetro all'interno della vetrocamera, creando due intercapedini separate anziché una sola. Questo semplice elemento costruttivo — una lastra in più — ha conseguenze significative su prestazioni termiche, peso, spessore, costo e comportamento acustico.</p>
<p><strong>Struttura tipica:</strong> una vetrocamera tripla standard è composta da tre lastre di vetro (4-4-4 mm, oppure 4-6-4 mm) con due intercapedini da 8-12 mm ciascuna. Lo spessore totale della vetrocamera sale da circa 24-28 mm del doppio vetro a 36-44 mm per il triplo vetro. Questo spessore maggiore richiede profili di telaio più profondi (65-90 mm) rispetto ai profili per doppio vetro (60-70 mm).</p>
<p><strong>I rivestimenti Low-E nel triplo vetro:</strong> nelle vetrate triple, si applicano due rivestimenti Low-E — uno su ciascuna delle superfici interne delle due intercapedini. Questo raddoppia il beneficio dell'emissività ridotta. Combinato con le due intercapedini di argon o krypton, il risultato è un Ug che può scendere a 0,4-0,7 W/m²K, contro l'1,0-1,1 W/m²K del miglior doppio vetro.</p>
<p><strong>La terza lastra come "barriera termofisica":</strong> nel triplo vetro, la lastra centrale mantiene una temperatura superficiale significativamente più alta di quella del vetro esterno. Questo crea un gradiente termico più distribuito tra interno ed esterno, riducendo le perdite per conduzione attraverso il vetro. In una notte invernale con -10°C fuori e +20°C dentro, la lastra centrale di un triplo vetro si trova a circa +5-8°C, mentre quella esterna è a circa -8°C. Nel doppio vetro, il vetro interno è a +10-12°C in queste stesse condizioni — freddo abbastanza da creare fastidiose correnti d'aria convettiva vicino alla finestra.</p>
<p>La finestra <a href="/prodotti/dmr-passive">DMR Passive</a> di ThermoDMR utilizza triplo vetro con doppio rivestimento Low-E, argon nelle intercapedini e profilo a 6 camere per raggiungere Uw ≤ 0,8 W/m²K, il valore di riferimento per le case passive certificate secondo lo standard Passivhaus.</p>

<h2>Gas argon vs krypton vs aria: differenze pratiche</h2>
<p>La scelta del gas da inserire nelle intercapedini è un dettaglio tecnico che ha impatto concreto sulle prestazioni termiche della vetrata. Ecco un confronto pratico tra le tre opzioni.</p>
<p><strong>Aria deumidificata:</strong> il gas più economico — perché non è propriamente un gas speciale ma aria trattata per rimuovere l'umidità. Conducibilità termica 26 mW/(m·K). Utilizzata nelle vetrocamere di bassa gamma e nei prodotti più economici. Non è raccomandabile per abitazioni in zona D-F dove le dispersioni termiche sono significative.</p>
<p><strong>Argon (Ar):</strong> il gas standard per i vetrocamere di qualità. Conducibilità termica 17 mW/(m·K) — il 34% in meno dell'aria. Costo contenuto (abbondante in atmosfera). Completamente sicuro e inerte. Ottimale per intercapedini da 12-16 mm. Il rapporto prestazioni/costo è eccellente per la maggior parte delle applicazioni residenziali sia a doppio che a triplo vetro. Da preferire in quasi tutti i casi dove si voglia una vetrocamera di buona qualità.</p>
<p><strong>Krypton (Kr):</strong> gas nobile con conducibilità termica molto bassa: 9 mW/(m·K), il 65% in meno dell'aria. Questo consente di ottenere le stesse prestazioni dell'argon con intercapedini più strette (8-10 mm anziché 12-16 mm), il che è utile nel triplo vetro per contenere lo spessore totale. Il krypton è però molto più costoso dell'argon (circa 5-10 volte) e viene usato solo nelle applicazioni di alta gamma dove il contenimento degli spessori è prioritario. In un triplo vetro con argon da 36 mm, si ottengono prestazioni molto simili a un triplo con krypton da 30 mm — con un risparmio significativo sul gas.</p>
<p><strong>Xenon (Xe):</strong> utilizzato solo in applicazioni specialistiche molto rare. Conducibilità 5 mW/(m·K). Costo proibitivo per applicazioni commerciali standard.</p>

<h2>Vetro basso emissivo (Low-E): cosa è e perché è importante</h2>
<p>Il rivestimento <strong>basso emissivo (Low-E)</strong> merita un approfondimento dedicato perché è probabilmente l'innovazione tecnologica più importante nel settore dei serramenti degli ultimi 30 anni, e quella che ha reso il doppio vetro moderno straordinariamente più performante del doppio vetro tradizionale a parità di spessore e tipo di gas.</p>
<p>L'emissività (simbolo: epsilon) è la capacità di una superficie di emettere energia termica per irraggiamento. Un vetro normale ha emissività di circa 0,84 (molto alta: emette molto calore per irraggiamento). Un vetro con rivestimento Low-E ha emissività di 0,02-0,10 (molto bassa: trattiene quasi tutta l'energia termica per irraggiamento).</p>
<p>Nella pratica, questo significa che il vetro interno di una finestra con Low-E perde molto meno calore verso l'esterno per irraggiamento. Poiché il trasferimento di calore per irraggiamento è uno dei meccanismi principali di perdita termica nelle vetrate (insieme alla conduzione e alla convezione), ridurlo drasticamente con il Low-E porta a miglioramenti di Ug dell'ordine del 40-50% rispetto allo stesso vetro senza rivestimento.</p>
<p>Esistono due tipi principali di Low-E:</p>
<ul>
  <li><strong>Hard coat (pyrolytic):</strong> applicato durante la produzione del vetro. Più robusto e resistente ai graffi, ma con emissività leggermente più alta (0,15-0,20). Più economico.</li>
  <li><strong>Soft coat (magnetron sputtering):</strong> applicato per deposizione fisica del vapore dopo la produzione del vetro. Emissività molto bassa (0,02-0,04), prestazioni termiche superiori. Più delicato (non può essere tagliato o lavorato dopo l'applicazione) ma questo non è un problema nelle vetrocamere già assemblate.</li>
</ul>
<p>I prodotti ThermoDMR utilizzano rivestimento soft coat per le finestre delle linee <a href="/prodotti/dmr-confort">DMR Confort</a> e <a href="/prodotti/dmr-passive">DMR Passive</a>, garantendo le massime prestazioni termiche.</p>

<h2>Confronto tecnico completo: tabella con tutti i parametri</h2>
<p>La tabella seguente mette a confronto le principali tipologie di vetrocamere disponibili sul mercato nel 2026 con tutti i parametri tecnici rilevanti.</p>

<table>
  <thead>
    <tr>
      <th>Tipo vetrocamera</th>
      <th>Struttura</th>
      <th>Ug (W/m²K)</th>
      <th>Uw tipico con PVC 5 cam. (W/m²K)</th>
      <th>Rw acustico (dB)</th>
      <th>Peso (kg/m²)</th>
      <th>Spessore totale (mm)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Doppio vetro aria (vecchio)</td>
      <td>4/12air/4</td>
      <td>2,8</td>
      <td>2,8 – 3,2</td>
      <td>28 – 30</td>
      <td>16 – 18</td>
      <td>20</td>
    </tr>
    <tr>
      <td>Doppio vetro argon (base)</td>
      <td>4/16Ar/4</td>
      <td>1,8 – 2,0</td>
      <td>1,9 – 2,3</td>
      <td>29 – 31</td>
      <td>16 – 18</td>
      <td>24</td>
    </tr>
    <tr>
      <td>Doppio vetro argon + Low-E</td>
      <td>4/16Ar/4 LE</td>
      <td>1,0 – 1,1</td>
      <td>1,1 – 1,4</td>
      <td>30 – 33</td>
      <td>16 – 18</td>
      <td>24</td>
    </tr>
    <tr>
      <td>Doppio vetro argon + Low-E + warm edge</td>
      <td>4/16Ar/4 LE WE</td>
      <td>0,9 – 1,0</td>
      <td>1,0 – 1,2</td>
      <td>30 – 33</td>
      <td>16 – 18</td>
      <td>24</td>
    </tr>
    <tr>
      <td>Triplo vetro argon + Low-E</td>
      <td>4/12Ar/4/12Ar/4 2LE</td>
      <td>0,5 – 0,7</td>
      <td>0,8 – 1,0</td>
      <td>32 – 36</td>
      <td>23 – 27</td>
      <td>36 – 40</td>
    </tr>
    <tr>
      <td>Triplo vetro krypton + Low-E</td>
      <td>4/10Kr/4/10Kr/4 2LE</td>
      <td>0,4 – 0,5</td>
      <td>0,6 – 0,8</td>
      <td>32 – 36</td>
      <td>23 – 27</td>
      <td>32 – 34</td>
    </tr>
  </tbody>
</table>

<p>Da questa tabella emerge chiaramente che il salto più significativo in termini di Ug non è tra doppio e triplo vetro, ma tra il doppio vetro senza Low-E e il doppio vetro con Low-E: un miglioramento del 55-65% a fronte di un incremento di costo modesto. Il passaggio ulteriore dal doppio Low-E al triplo Low-E porta un ulteriore miglioramento del 30-40% del Ug, ma a un costo notevolmente superiore.</p>

<h2>Isolamento termico: quanto risparmia davvero il triplo vetro</h2>
<p>Quantificare il risparmio energetico aggiuntivo del triplo vetro rispetto al doppio vetro moderno richiede un calcolo basato su dati concreti. Partiamo da un'abitazione tipo: 100 m² in zona E (Milano), 8 finestre di dimensione media (120 × 140 cm = 1,68 m² cadauna), superficie vetrata totale circa 13,4 m².</p>
<p><strong>Confronto doppio vetro Low-E (Uw 1,1) vs triplo vetro (Uw 0,8) in zona E:</strong></p>
<ul>
  <li>Differenza di Uw: 0,3 W/m²K</li>
  <li>Superficie vetrata totale: 13,4 m²</li>
  <li>Gradi giorno zona E (Milano): 2.404</li>
  <li>Ore di riscaldamento annue (stima): 1.800 ore</li>
  <li>Dispersione aggiuntiva doppio vetro rispetto al triplo = 0,3 × 13,4 × 1.800 / 1.000 = circa 7.200 Wh/anno = 7,2 kWh/anno per grado di differenza medio</li>
  <li>Con differenza media riscaldamento di 15°C: 7,2 × 15 ≈ 108 kWh/anno di energia termica in più dispersa dal doppio vetro</li>
  <li>Convertendo in gas (rendimento caldaia 90%): circa 120 kWh/anno di gas = circa 12 m³/anno</li>
  <li>A 1,00 euro/m³: risparmio aggiuntivo del triplo vetro ≈ <strong>12 euro/anno</strong> per finestra (su 8 finestre: circa 96-120 euro/anno totali)</li>
</ul>
<p>Questo calcolo semplificato mostra che la differenza di risparmio tra doppio vetro moderno e triplo vetro — in zona E — è dell'ordine di <strong>80-150 euro/anno</strong> su un'abitazione media. Questo è il dato che va messo a confronto con il costo aggiuntivo del triplo vetro per valutare la convenienza economica.</p>
<p>In zona F (alta montagna, Bolzano, Aosta), dove i gradi giorno superano 4.000 e le temperature invernali scendono spesso sotto -10°C, lo stesso calcolo porta a risparmi aggiuntivi di <strong>200-350 euro/anno</strong>, raddoppiando circa il beneficio economico del triplo vetro.</p>

<h2>Isolamento acustico: chi vince tra doppio e triplo vetro</h2>
<p>L'isolamento acustico è spesso citato come uno dei vantaggi del triplo vetro, ma la realtà è più complessa. Il comportamento acustico di una vetrocamera non dipende semplicemente dal numero di lastre, ma dalla <strong>massa totale delle lastre, dalla configurazione degli spessori e dalla frequenza dei rumori da attenuare</strong>.</p>
<p>L'indice di riduzione acustica ponderato Rw (in dB) è il parametro standard per quantificare l'isolamento acustico di una vetrata. Un doppio vetro standard 4/16/4 ha Rw ≈ 28-30 dB; un triplo vetro 4/12/4/12/4 ha Rw ≈ 32-36 dB — un miglioramento reale ma non eccezionale.</p>
<p><strong>Il problema della massa uguale:</strong> se si confronta un triplo vetro 4/12/4/12/4 (tre lastre da 4 mm) con un doppio vetro <em>asimmetrico</em> 6/12/8 mm (due lastre di spessore diverso), il doppio vetro asimmetrico ottiene spesso Rw superiore al triplo vetro. Questo perché le lastre di spessore uguale hanno la stessa frequenza di risonanza (effetto "coincidenza") e si attenuano a vicenda nel range di frequenze critiche; lastre di spessore diverso hanno frequenze di risonanza diverse e si compensano meglio.</p>
<p><strong>Chi dovrebbe privilegiare l'isolamento acustico:</strong> chi vive vicino a strade trafficate, linee ferroviarie o aeroporti dovrebbe scegliere una configurazione vetrata specificamente ottimizzata per l'acustica — doppio vetro asimmetrico con un vetro laminato acustico — anziché semplicemente un triplo vetro standard. Per il solo aspetto acustico, la configurazione del vetro è più importante del numero di lastre.</p>
<p>ThermoDMR può fornire configurazioni acustiche specifiche su richiesta per le linee <a href="/prodotti/dmr-confort">DMR Confort</a> e <a href="/prodotti/dmr-domus">DMR Domus</a>. Indicate nella richiesta di preventivo la presenza di fonti di rumore significative (traffico, ferrovia, stabilimenti) e il nostro tecnico proporrà la configurazione vetrata ottimale.</p>

<h2>Costi 2026: prezzi medi per finestra (doppio vs triplo)</h2>
<p>Il confronto di prezzo tra doppio e triplo vetro varia in funzione delle dimensioni della finestra, del profilo scelto, della configurazione vetrata e dell'impresa installatrice. Forniamo di seguito indicazioni sui prezzi medi di mercato nel 2026 per serramenti in PVC di qualità, installazione inclusa, IVA 10% inclusa, riferiti alle linee ThermoDMR.</p>

<table>
  <thead>
    <tr>
      <th>Finestra</th>
      <th>Dimensione</th>
      <th>Doppio vetro argon + Low-E (DMR Confort)</th>
      <th>Triplo vetro argon + Low-E (DMR Passive)</th>
      <th>Differenza</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Finestra singola battente</td>
      <td>90 × 120 cm</td>
      <td>420 – 520 €</td>
      <td>560 – 680 €</td>
      <td>+130 – 170 €</td>
    </tr>
    <tr>
      <td>Finestra doppia battente</td>
      <td>120 × 140 cm</td>
      <td>580 – 720 €</td>
      <td>760 – 950 €</td>
      <td>+170 – 240 €</td>
    </tr>
    <tr>
      <td>Porta-finestra singola</td>
      <td>90 × 220 cm</td>
      <td>680 – 850 €</td>
      <td>890 – 1.100 €</td>
      <td>+200 – 260 €</td>
    </tr>
    <tr>
      <td>Porta-finestra doppia</td>
      <td>150 × 220 cm</td>
      <td>950 – 1.200 €</td>
      <td>1.250 – 1.550 €</td>
      <td>+300 – 360 €</td>
    </tr>
    <tr>
      <td>Finestra grande (panoramica)</td>
      <td>180 × 140 cm</td>
      <td>820 – 1.050 €</td>
      <td>1.100 – 1.380 €</td>
      <td>+270 – 340 €</td>
    </tr>
  </tbody>
</table>

<p>Su un'abitazione con 8 finestre medie e 2 porte-finestre, la differenza di costo totale tra doppio e triplo vetro si attesta tipicamente tra i <strong>1.500 e 3.000 euro</strong>. Questa cifra va confrontata con il risparmio energetico aggiuntivo annuo (80-150 euro in zona E) per calcolare il tempo di recupero dell'investimento aggiuntivo.</p>

<h2>Analisi ROI: quando si recupera l'investimento aggiuntivo del triplo vetro</h2>
<p>L'analisi del ritorno sull'investimento (ROI) del costo aggiuntivo del triplo vetro rispetto al doppio vetro moderno è l'elemento chiave per una decisione razionale. Partiamo dai dati dell'esempio precedente.</p>
<p><strong>Scenario tipo — abitazione in zona E, 8 finestre + 2 porte-finestre:</strong></p>
<ul>
  <li>Costo aggiuntivo triplo vetro rispetto a doppio vetro Low-E: <strong>2.000 euro</strong> (stima intermedia)</li>
  <li>Risparmio energetico aggiuntivo annuo triplo vs doppio (zona E): <strong>100 euro/anno</strong></li>
  <li>Tempo di recupero semplice: 2.000 / 100 = <strong>20 anni</strong></li>
</ul>
<p>Un tempo di recupero di 20 anni è considerato, nel settore edilizio, al limite dell'economicamente conveniente. La vita utile di un serramento PVC di qualità è di 30-40 anni, quindi è possibile recuperare l'investimento — ma non entro tempi brevi.</p>
<p><strong>Scenario zona F — alta montagna:</strong></p>
<ul>
  <li>Costo aggiuntivo triplo vetro: <strong>2.000 euro</strong></li>
  <li>Risparmio energetico aggiuntivo annuo (zona F): <strong>280 euro/anno</strong></li>
  <li>Tempo di recupero semplice: 2.000 / 280 = <strong>7 anni</strong></li>
</ul>
<p>In zona F il triplo vetro si recupera in circa 7 anni — un'ottima convenienza economica.</p>
<p><strong>Fattori che migliorano il ROI del triplo vetro:</strong></p>
<ul>
  <li>Zone climatiche più fredde (F, alta quota in E)</li>
  <li>Finestre di grandi dimensioni (la differenza assoluta di dispersione è maggiore)</li>
  <li>Esposizione a nord (nessun guadagno solare a compensare la dispersione)</li>
  <li>Prezzi dell'energia in rialzo (ogni incremento del costo del gas migliora il ROI)</li>
  <li>Obiettivo di certificazione Passivhaus (il triplo vetro è un requisito, non un'opzione)</li>
</ul>
<p><strong>Fattori che peggiorano il ROI del triplo vetro:</strong></p>
<ul>
  <li>Zone climatiche miti (B, C, parte del D)</li>
  <li>Finestre di dimensioni standard (1,0-1,5 m²)</li>
  <li>Edifici con buona esposizione solare (ampia presenza di guadagni passivi)</li>
  <li>Budget limitato che renderebbe preferibile investire la differenza di costo in altri interventi con ROI migliore</li>
</ul>

<h2>Zona climatica e scelta del vetro: guida per regione italiana</h2>
<p>Le zone climatiche italiane sono sei (dalla A alla F) e determinano in modo significativo la convenienza del triplo vetro. Ecco una guida sintetica per regione.</p>
<ul>
  <li><strong>Sicilia, Sardegna, Calabria costa (zona B-C):</strong> il doppio vetro Low-E con argon è ampiamente sufficiente. Il triplo vetro non ha senso economico: i risparmi aggiuntivi sarebbero minimi e il tempo di recupero supererebbe i 30 anni. Consigliato: <a href="/prodotti/dmr-domus">DMR Domus</a> (Uw 1,3).</li>
  <li><strong>Campania, Puglia, Lazio, Toscana, Liguria (zona C-D):</strong> doppio vetro Low-E di qualità è la scelta ottimale per il rapporto qualità/prezzo. Il triplo vetro può avere senso solo per finestre nord molto grandi o in case passive. Consigliato: <a href="/prodotti/dmr-confort">DMR Confort</a> (Uw 1,1).</li>
  <li><strong>Emilia-Romagna, Veneto, Lombardia pianura, Piemonte pianura, Marche (zona E):</strong> doppio vetro Low-E avanzato (Uw 1,0-1,1) con warm edge è la scelta standard. Il triplo vetro è giustificabile per finestre nord molto grandi, case passive, o quando si abbina a un intervento completo di riqualificazione con obiettivo classe A. Consigliato: <a href="/prodotti/dmr-confort">DMR Confort</a> (Uw 1,1) o <a href="/prodotti/dmr-passive">DMR Passive</a> (Uw 0,8) per casa passiva.</li>
  <li><strong>Trentino-Alto Adige, Valle d'Aosta, zone alpine (zona F):</strong> il triplo vetro è fortemente consigliato e ha un ROI eccellente (7-10 anni). In queste zone la differenza di comfort termico tra doppio e triplo vetro è percepibile fisicamente (superfici della finestra significativamente più calde in inverno). Consigliato: <a href="/prodotti/dmr-passive">DMR Passive</a> (Uw 0,8) o configurazioni specifiche per casa passiva.</li>
</ul>

<h2>Peso, struttura e ferramenta: le implicazioni tecniche del triplo vetro</h2>
<p>Il triplo vetro non è semplicemente un doppio vetro "con una lastra in più". L'aggiunta della terza lastra ha implicazioni tecniche rilevanti che impattano sull'intera struttura della finestra, dalla ferramenta al profilo del telaio.</p>
<p><strong>Il peso:</strong> una vetrocamera tripla pesa mediamente il 40-50% in più di una doppia di pari dimensioni. Per una finestra tipica da 120 × 140 cm: il doppio vetro pesa circa 13-15 kg, il triplo pesa circa 19-22 kg. Su finestre di grandi dimensioni (150 × 220 cm o oltre), si può arrivare a differenze di 12-15 kg per anta. Questo peso aggiuntivo:</p>
<ul>
  <li>Richiede ferramenta (cerniere, chiusure, maniglie) dimensionata per carichi maggiori</li>
  <li>Impone vincoli sulla dimensione massima del battente: finestre molto larghe (oltre 80 cm per anta) con triplo vetro possono richiedere ferramenta speciale o configurazioni a anta fissa + battente</li>
  <li>Può richiedere manutenzione più frequente della ferramenta nel tempo (la regolazione dei perni di cerniera è più critica con carichi alti)</li>
</ul>
<p><strong>Il profilo del telaio:</strong> il maggiore spessore della vetrocamera tripla (36-44 mm vs 24-28 mm del doppio) richiede profili di telaio con sede vetro più profonda. I profili per triplo vetro hanno tipicamente una profondità complessiva di 80-90 mm (contro 60-70 mm del doppio vetro). Questo non è un problema costruttivo — i profili ThermoDMR DMR Passive sono appositamente progettati per il triplo vetro — ma è un elemento da comunicare nella fase di preventivazione per evitare incompatibilità con vani finestra di dimensioni ridotte.</p>
<p><strong>Il coefficiente di dilatazione termica:</strong> con il triplo vetro, il gradiente termico tra la lastra esterna e il telaio è ridotto rispetto al doppio vetro, il che minimizza le sollecitazioni termica sulle guarnizioni di tenuta. In questo senso il triplo vetro può avere una vita utile leggermente più lunga per le guarnizioni, ma la differenza è marginale con profili di qualità.</p>

<h2>Triplo vetro e condensa: il problema che nessuno menziona</h2>
<p>Il triplo vetro è spesso presentato come la soluzione definitiva alla condensa sulle finestre. La realtà è più sfumata e vale la pena approfondirla.</p>
<p><strong>Condensa sulla superficie esterna:</strong> paradossalmente, le finestre con triplo vetro sono più soggette a condensa sulla superficie esterna rispetto al doppio vetro. Questo accade perché la lastra esterna del triplo vetro è così ben isolata dall'interno che di notte, quando il cielo è sereno, la superficie esterna si raffredda per irraggiamento verso il cielo ben al di sotto della temperatura dell'aria esterna, fino a scendere sotto il punto di rugiada. Il risultato è uno strato di condensa (o brina) sulla superficie esterna del vetro al mattino presto. Questo è un <strong>segnale di ottima prestazione isolante</strong>, non un difetto, ma può sorprendere chi lo nota per la prima volta.</p>
<p><strong>Condensa sulla superficie interna:</strong> su questo aspetto il triplo vetro è effettivamente superiore al doppio vetro. Poiché la lastra interna è più calda (la sua temperatura di superficie è più alta), è meno soggetta a condensa in condizioni di alta umidità interna. Questo è rilevante per cucine, bagni, ambienti molto umidi o abitazioni con piscine interne.</p>
<p><strong>Condensa nell'intercapedine:</strong> questo tipo di condensa — che appare come appannamento fisso all'interno del vetrocamera — non è correlato alla tipologia doppio/triplo ma alla qualità del sigillante perimetrale e del distanziatore. Può verificarsi su qualsiasi vetrocamera con sigillatura difettosa, indipendentemente dal numero di lastre. È il segnale che la vetrocamera è "morta" e deve essere sostituita.</p>

<h2>Per chi è il triplo vetro: guida ai profili di acquirente</h2>
<p>Sulla base di quanto analizzato in questa guida, è possibile identificare i profili di acquirente per i quali il triplo vetro rappresenta la scelta ottimale, e quelli per i quali il doppio vetro moderno è preferibile.</p>
<h3>Il triplo vetro è la scelta giusta se:</h3>
<ul>
  <li>Abitate in <strong>zona F</strong> (Alto Adige, Valle d'Aosta, zone alpine oltre 900 m) o in zone dell'Alta zona E con inverni rigidi (Cuneo, Belluno, Sondrio alta quota)</li>
  <li>State costruendo o ristrutturando una <strong>casa passiva certificata Passivhaus</strong> (Uw ≤ 0,8 è requisito obbligatorio dello standard)</li>
  <li>Avete grandi superfici vetrate esposte a <strong>nord</strong> che perdono calore senza guadagni solari compensativi</li>
  <li>Volete massimizzare il <strong>comfort termico</strong> (la differenza di temperatura della superficie vetro interna è significativa tra doppio e triplo in condizioni invernali rigide)</li>
  <li>State pianificando un intervento di riqualificazione completo con obiettivo <strong>classe A1 o superiore</strong> e avete già cappotto e pompa di calore nel progetto</li>
</ul>
<h3>Il doppio vetro moderno è preferibile se:</h3>
<ul>
  <li>Siete in <strong>zona B, C o D</strong> e il vostro obiettivo è ridurre la bolletta e migliorare la classe energetica</li>
  <li>Siete in <strong>zona E con budget limitato</strong>: il risparmio aggiuntivo del triplo vetro (80-150 euro/anno) non giustifica la spesa extra se avete altre priorità di intervento</li>
  <li>Avete finestre di <strong>dimensioni standard</strong> (meno di 1,5 m² per anta) dove il differenziale di risparmio assoluto è contenuto</li>
  <li>L'edificio ha buona <strong>esposizione solare</strong> e i guadagni passivi invernali compensano parte delle dispersioni termiche</li>
</ul>

<h2>Il doppio vetro moderno è abbastanza? La risposta onesta</h2>
<p>La risposta onesta è: <strong>nella maggior parte dei casi, sì</strong>. Un doppio vetro con argon, rivestimento Low-E avanzato, distanziatore warm edge e profilo PVC a 5 o 6 camere — come la linea <a href="/prodotti/dmr-confort">DMR Confort</a> con Uw 1,1 W/m²K — è un prodotto ad altissime prestazioni che soddisfa pienamente:</p>
<ul>
  <li>I requisiti dell'Ecobonus per tutte le zone climatiche italiane (Uw ≤ 1,8 W/m²K in zona E)</li>
  <li>Gli standard di efficienza energetica per la classe A delle nuove costruzioni</li>
  <li>Le esigenze di comfort termico per la stragrande maggioranza delle abitazioni nelle zone B-E</li>
  <li>Un tempo di recupero dell'investimento di 5-8 anni rispetto ai vecchi serramenti anni '90</li>
</ul>
<p>Il triplo vetro aggiunge un incremento reale di prestazioni — non è marketing — ma questo incremento è più rilevante nelle zone fredde (F, alta quota E) e nelle costruzioni altamente efficienti (case passive). Per le abitazioni ordinarie nelle zone C-E, il doppio vetro moderno è pienamente sufficiente e offre il miglior rapporto tra investimento e beneficio.</p>
<p>La vera differenza non è tra doppio e triplo vetro, ma tra un doppio vetro di qualità (con Low-E, argon, warm edge) e un doppio vetro di bassa gamma (senza Low-E, con aria). Chi sceglie un doppio vetro economico risparmiando 80-100 euro per finestra sta facendo un risparmio che si pagherà in bolletta per anni.</p>

<h2>Tendenze 2026: il mercato dei serramenti in Italia</h2>
<p>Il mercato italiano dei serramenti nel 2026 mostra alcune tendenze chiare che riflettono sia la spinta normativa europea (EPBD) sia i cambiamenti nelle preferenze dei consumatori.</p>
<p><strong>Crescita del doppio vetro High-Performance:</strong> la categoria dei doppi vetri con Uw inferiore a 1,2 W/m²K è in forte crescita, a scapito dei prodotti standard con Uw 1,4-2,0. Il mercato si sta spostando verso prodotti di qualità media alta come standard, non come premium.</p>
<p><strong>Triplo vetro in espansione nel Nord Italia:</strong> nelle regioni del Nord (Lombardia, Veneto, Piemonte, Friuli) la quota di mercato del triplo vetro è cresciuta dal 12% del 2022 al 22-25% del 2026, trainata dalla consapevolezza energetica dei consumatori e dagli incentivi fiscali. Nel Centro e Sud Italia rimane sotto il 5%.</p>
<p><strong>PVC vs alluminio:</strong> il PVC consolida la leadership nel segmento residenziale con una quota di mercato di circa il 65%, contro il 28% dell'alluminio e il 7% del legno. Il PVC offre il miglior rapporto tra prestazioni termiche, durabilità, manutenzione e costo.</p>
<p><strong>Serramenti connessi e smart:</strong> una tendenza emergente è l'integrazione di sensori di apertura, controllo dell'umidità e ventilazione naturale controllata nei serramenti. Non è ancora un elemento di scelta primaria, ma rappresenta la direzione verso cui si muoverà il mercato nei prossimi 5-10 anni.</p>
<p>ThermoDMR si posiziona in questo mercato con una gamma completa — <a href="/prodotti/dmr-domus">DMR Domus</a>, <a href="/prodotti/dmr-confort">DMR Confort</a>, <a href="/prodotti/dmr-passive">DMR Passive</a> — che copre tutte le esigenze dal mercato di base all'alta efficienza, con una proposta tecnica documentata e un sistema di servizio che include consulenza, installazione e supporto per le pratiche fiscali.</p>

<h2>Guida all'acquisto: 10 domande da fare al fornitore</h2>
<p>Prima di firmare un contratto per la sostituzione delle finestre, assicuratevi di ottenere risposte chiare a queste 10 domande dal vostro fornitore.</p>
<ol>
  <li><strong>Qual è il valore Uw certificato della finestra che mi state proponendo?</strong> Non il Ug del solo vetro, ma il Uw dell'intera finestra (telaio + vetro) calcolato secondo UNI EN ISO 10077-1.</li>
  <li><strong>Il vetrocamera contiene argon o krypton? E qual è il rivestimento Low-E applicato?</strong> Specificate se è hard coat o soft coat e a quale superficie è applicato.</li>
  <li><strong>Il distanziatore è warm edge?</strong> Se il fornitore non sa cosa sia il warm edge, è un segnale preoccupante sulla qualità del prodotto.</li>
  <li><strong>Quante camere ha il profilo PVC?</strong> E di che produttore è il profilo? I profili di produttori certificati tedeschi o austriaci (Rehau, Schüco, Gealan, Veka) offrono garanzie di qualità del materiale.</li>
  <li><strong>Qual è la classificazione AEW (permeabilità aria, tenuta acqua, resistenza vento)?</strong> Per una finestra di qualità, si richiedono classe 4 per l'aria e E750 per l'acqua.</li>
  <li><strong>Fornite la scheda tecnica con il valore Uw per la comunicazione ENEA?</strong> Questo documento è indispensabile per l'Ecobonus e deve essere incluso nella fornitura.</li>
  <li><strong>Quali sono i tempi di installazione e come vengono gestiti i lavori di smontaggio e smaltimento dei vecchi serramenti?</strong> Lo smaltimento è incluso nel preventivo?</li>
  <li><strong>Che garanzia offrite sul prodotto e sull'installazione?</strong> Una garanzia minima di 5 anni sul prodotto e 2 anni sull'installazione è lo standard di mercato per i prodotti di qualità.</li>
  <li><strong>La vostra installazione include la sigillatura perimetrale con schiuma poliuretanica e guarnizione finale?</strong> Un'installazione senza sigillatura adeguata vanifica le prestazioni del serramento migliore.</li>
  <li><strong>Siete disponibili ad accompagnarci nella compilazione della pratica ENEA?</strong> I fornitori strutturati come ThermoDMR offrono supporto nella gestione della documentazione fiscale.</li>
</ol>

<h2>Conclusione e raccomandazione ThermoDMR</h2>
<p>Dopo questa analisi approfondita, la raccomandazione di ThermoDMR per il 2026 può essere sintetizzata in modo chiaro:</p>
<p><strong>Per la maggioranza dei proprietari italiani in zone B-E:</strong> scegliete un doppio vetro di alta qualità — argon, Low-E soft coat, warm edge, profilo PVC a 5 o 6 camere — come la <a href="/prodotti/dmr-confort">DMR Confort</a> (Uw 1,1 W/m²K) o la <a href="/prodotti/dmr-domus">DMR Domus</a> (Uw 1,3 W/m²K). Questo prodotto offre prestazioni eccellenti, soddisfa tutti i requisiti per le detrazioni fiscali, e garantisce un ritorno sull'investimento in 5-8 anni grazie alla combinazione di risparmio energetico e detrazione IRPEF/Ecobonus.</p>
<p><strong>Per chi vive in zona F, sta costruendo una casa passiva, o ha grandi superfici vetrate nord:</strong> il triplo vetro <a href="/prodotti/dmr-passive">DMR Passive</a> (Uw ≤ 0,8 W/m²K) è la scelta giusta. Il costo aggiuntivo è giustificato dal risparmio energetico in climi rigidi, dalla certificabilità Passivhaus e dal comfort termico superiore nelle giornate più fredde.</p>
<p>Non esiste una risposta universale valida per tutti, ma esiste la risposta giusta per la vostra situazione specifica. Il team tecnico di ThermoDMR è a vostra disposizione per una consulenza personalizzata gratuita, che considera zona climatica, esposizione dell'edificio, obiettivi energetici e budget. Visitate il nostro <a href="/prodotti-pubblico">catalogo prodotti</a>, scoprite la gamma completa che include anche <a href="/prodotti/cassonetti">cassonetti coibentati</a>, <a href="/prodotti/tapparelle">tapparelle coibentate</a>, <a href="/prodotti/persiane">persiane</a> e <a href="/prodotti/portoncini">portoncini</a>, e compilate il <a href="/contatti">modulo di contatto</a> per ricevere la vostra proposta personalizzata entro 24 ore.</p>
    `.trim(),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ARTICOLI RUMENI
// ─────────────────────────────────────────────────────────────────────────────
const roPosts: BlogPost[] = [
  {
    slug: "ferestre-pvc-profil-german-ghid-complet",
    lang: "ro",
    title: "Ferestre PVC cu Profil German: Ghid Complet 2026",
    description: "Ce sunt ferestrele PVC cu profil german? Avantaje, camere, certificări și de ce costă mai puțin decât crezi. Ghid actualizat 2026.",
    date: "2026-03-10",
    category: "Ghiduri",
    readingTime: 8,
    content: `
<h2>De ce să alegi ferestre PVC cu profil german?</h2>
<p>Când auzi de <strong>ferestre PVC cu profil german</strong>, vorbești despre tâmplărie produsă cu profile extrudate în Germania — sau conform standardelor germane — care respectă cele mai stricte norme europene de izolare termică și acustică.</p>
<p>Profilul german nu este un detaliu de marketing: este garanția că materialul a trecut teste de rezistență, durabilitate și performanță energetică mult mai riguroase decât profilurile fabricate în alte țări.</p>

<h2>Câte camere are un profil PVC bun?</h2>
<p>Numărul de camere (secțiunile interne ale profilului) determină performanța termică a ferestrei. Iată ce trebuie să știi:</p>
<ul>
  <li><strong>3 camere</strong> — standard de bază, potrivit pentru climate temperate</li>
  <li><strong>5 camere</strong> — raport optim calitate/preț, recomandat pentru majoritatea locuințelor din România și Italia</li>
  <li><strong>6-7 camere</strong> — izolare maximă, indicat pentru case pasive și climate reci</li>
</ul>
<p>Profilurile din gama <a href="/ro/produse">ThermoDMR</a> utilizează 5 camere ca standard, cu opțiunea de 6 camere pentru linia DMR Passive.</p>

<h2>Valoarea Uw: numărul pe care trebuie să îl cunoști</h2>
<p>Coeficientul de transmitanță termică <strong>Uw</strong> măsoară câtă energie termică trece prin fereastră. Cu cât este mai mic, cu atât izolează mai bine:</p>
<ul>
  <li>Uw ≤ 1,4 W/m²K — standard recomandat pentru construcții noi în România</li>
  <li>Uw ≤ 1,1 W/m²K — performanță ridicată pentru renovări</li>
  <li>Uw ≤ 0,8 W/m²K — casă pasivă certificată</li>
</ul>
<p>Ferestrele DMR Confort și DMR Domus ating Uw de la 1,1 la 1,4 W/m²K. DMR Passive coboară sub 0,8 W/m²K cu sticlă triplă.</p>

<h2>Izolare acustică: decibeli care schimbă calitatea vieții</h2>
<p>Indicele de atenuare acustică Rw măsoară cât zgomot blochează fereastra:</p>
<ul>
  <li>Rw 30 dB — percepi jumătate din zgomotul exterior</li>
  <li>Rw 38 dB — potrivit pentru zone semi-urbane (standard ThermoDMR)</li>
  <li>Rw 44+ dB — indicat pentru zone cu trafic intens</li>
</ul>

<h2>Cât durează ferestrele PVC?</h2>
<p>Un profil PVC de calitate, cu întreținere corectă, durează <strong>40-50 de ani</strong>. Nu ruginește, nu putrezește, nu se crapă. Curățarea necesită doar apă și detergent neutru.</p>
<p>ThermoDMR oferă <strong>garanție 15 ani</strong> pe toată gama de tâmplărie, acoperind profilul, garniturile și feroneria.</p>

<h2>Producție directă: ce înseamnă pentru preț</h2>
<p>ThermoDMR produce direct — fără intermediari între fabrică și clientul final. Aceasta înseamnă:</p>
<ul>
  <li>Prețuri mai competitive față de distribuitorii tradiționali</li>
  <li>Termene de livrare certe (în medie 2-6 săptămâni)</li>
  <li>Personalizări disponibile fără costuri suplimentare mari</li>
  <li>Asistență tehnică directă de la producător</li>
</ul>

<h2>Cum soliciți o ofertă ThermoDMR</h2>
<p>Completează <a href="/ro/contact">formularul de contact</a> cu dimensiunile golurilor și primești o ofertă gratuită în 24 de ore. Pentru distribuitori, există un program dedicat cu prețuri de fabrică și suport tehnic: <a href="/ro/devino-distribuitor">află cum să devii distribuitor ThermoDMR</a>.</p>
    `.trim(),
  },

  {
    slug: "economie-energie-ferestre-pvc-calcul-real",
    lang: "ro",
    title: "Economie de Energie cu Ferestre PVC: Cifre Reale pentru România",
    description: "Cât economisești la factură înlocuind ferestrele cu PVC Clasa A? Calcule reale, procente și timp de recuperare a investiției.",
    date: "2026-03-20",
    category: "Economie Energie",
    readingTime: 6,
    content: `
<h2>Problema ascunsă a ferestrelor vechi</h2>
<p>Ferestrele reprezintă 25-35% din pierderile termice ale unui apartament mediu. Dacă ai în continuare tâmplăria originală din anii '90 sau de la panouri, practic încălzești strada — și o plătești în factură în fiecare lună.</p>
<p>O familie din România, într-un apartament de 80 m², poate plăti între <strong>300 și 600 lei în plus pe an</strong> doar pentru a compensa ferestrele ineficiente.</p>

<h2>Clasa energetică a ferestrelor: ce înseamnă</h2>
<p>Ferestrele sunt clasificate în funcție de transmitanța termică Uw. Cu cât valoarea este mai mică, cu atât fereastra izolează mai bine:</p>
<ul>
  <li><strong>Uw ≤ 1,4</strong> — standard cerut de normele în vigoare pentru construcții noi în România</li>
  <li><strong>Uw ≤ 1,1</strong> — performanță bună pentru renovări</li>
  <li><strong>Uw ≤ 0,8</strong> — casă pasivă</li>
</ul>
<p>Ferestrele <a href="/ro/produse/dmr-confort">DMR Confort</a> și <a href="/ro/produse/dmr-domus">DMR Domus</a> se încadrează la Uw 1,1-1,4 W/m²K.</p>

<h2>De câte ori mai izolează o fereastră nouă față de una veche?</h2>
<p>O fereastră cu geam simplu sau dublu vechi are un Uw de aproximativ 4,0-5,5 W/m²K. O fereastră PVC cu geam termopan low-e ThermoDMR ajunge la 1,1-1,4 W/m²K: <strong>de trei-patru ori mai izolantă</strong>.</p>
<p>Practic: temperatură mai stabilă iarna, fără curenți de aer rece, fără condens pe geam, fără mucegai în colțuri.</p>

<h2>Calcul real pentru un apartament din România</h2>
<table>
  <thead><tr><th>Situație</th><th>Pierdere estimată</th><th>Cost suplimentar/an</th></tr></thead>
  <tbody>
    <tr><td>Ferestre vechi (Uw 5,0)</td><td>Ridicată</td><td>+500 lei/an</td></tr>
    <tr><td>Ferestre PVC geam dublu (Uw 1,3)</td><td>Scăzută</td><td>referință</td></tr>
    <tr><td>Ferestre PVC geam triplu (Uw 0,8)</td><td>Minimă</td><td>-120 lei/an vs geam dublu</td></tr>
  </tbody>
</table>
<p><em>Estimare bazată pe consum mediu încălzire 80 kWh/m²an, preț gaz 0,25 lei/kWh. Valorile reale variază în funcție de izolația clădirii, zona climatică și obiceiurile de utilizare.</em></p>

<h2>Ajutoare de stat pentru înlocuirea ferestrelor în România</h2>
<p>Prin programul <strong>Casa Verde</strong> și prin fondurile europene disponibile în România, sunt disponibile subvenții pentru reabilitarea termică a locuințelor, inclusiv înlocuirea ferestrelor. Condițiile se actualizează anual — <a href="/ro/contact">contactează-ne</a> pentru informații actualizate la zi.</p>

<h2>Timp de recuperare a investiției</h2>
<p>Cu o economie medie de 400-600 lei pe an și ținând cont de eventualele ajutoare de stat, costul net al înlocuirii a 6-8 ferestre se amortizează în <strong>5-8 ani</strong> — după care este economie pură, pentru următorii 30-40 de ani de viață utilă ai tâmplăriei.</p>

<h2>Vrei să știi cât economisești tu?</h2>
<p>Fiecare locuință este diferită. <a href="/ro/contact">Solicită o consultanță gratuită</a>: te ajutăm să calculezi economisirea potențială specifică pentru casa ta și să alegi gama potrivită bugetului tău.</p>
    `.trim(),
  },

  {
    slug: "jaluzele-termoizolante-vs-standard-diferente",
    lang: "ro",
    title: "Jaluzele Termoizolante vs Standard: Diferențe și Când Merită",
    description: "Jaluzele termoizolante sau standard? Diferențe tehnice, economie reală de energie și când merită să plătești mai mult. Ghid practic ThermoDMR.",
    date: "2026-04-01",
    category: "Produse",
    readingTime: 5,
    content: `
<h2>Ce este o jaluzie termoizolantă?</h2>
<p>O <strong>jaluzie termoizolantă</strong> este un rulou ale cărui lamele sunt umplute cu spumă poliuretanică expandată — același material folosit în pereții izolați. Lamelele standard sunt goale, deci conduc frigul (și căldura de vară) direct în cameră.</p>
<p>Diferența în termeni de izolare este semnificativă: o jaluzie termoizolantă poate reduce pierderea termică prin rulou cu <strong>60-70%</strong> față de una standard.</p>

<h2>Tipuri de jaluzele termoizolante ThermoDMR</h2>
<p><a href="/ro/produse/jaluzele">Jaluzelele ThermoDMR</a> sunt disponibile în două variante principale:</p>
<ul>
  <li><strong>Aluminiu termoizolant</strong> — lamele de 37 mm sau 55 mm umplute cu PU, raport optim calitate/preț, potrivite pentru majoritatea ferestrelor rezidențiale</li>
  <li><strong>PVC armat</strong> — mai ușoare, rezistente la impacturi, ideale pentru ferestre mici sau medii</li>
</ul>

<h2>Oscurare completă: jaluzele vs perdele</h2>
<p>Jaluzelele — termoizolante sau nu — garantează o obscurare totală pe care nicio perdea nu o poate replica. Pentru dormitoare, birouri acasă și săli de proiecție este o diferență substanțială în calitatea somnului și confortul vizual.</p>

<h2>Securitate anti-efracție</h2>
<p>Lamelele umplute cu spumă poliuretanică sunt structural mai rigide și mai rezistente la efracție față de lamelele goale. Combinate cu un ghid armat și sistemul de blocare, jaluzelele termoizolante ThermoDMR oferă o barieră anti-efracție semnificativ superioară.</p>

<h2>Cât durează o jaluzie termoizolantă?</h2>
<p>Cu întreținere corectă (curățarea periodică a ghidajelor, ungerea mecanismului de rulare) o jaluzie termoizolantă din aluminiu durează <strong>20-25 de ani</strong>. PU intern nu se deteriorează în timp și nu pierde proprietățile de izolare.</p>

<h2>Cost: cât mai mult față de jaluzelele standard?</h2>
<p>Costul suplimentar al unei jaluzele termoizolante față de una standard este de obicei 25-40%. Ținând cont de economia de energie și durabilitatea mai mare, pragul de rentabilitate se atinge în 3-5 ani.</p>

<h2>Când NU are sens să alegi termoizolante</h2>
<p>Dacă clădirea nu are sistem de încălzire sau răcire activ (depozite, garaje), beneficiile energetice ale jaluzelelor termoizolante se reduc semnificativ.</p>
<p>Ai dubii despre ce soluție ți se potrivește? <a href="/ro/contact">Contactează-ne</a> — te ajutăm să faci alegerea corectă fără să cheltuiești mai mult decât e necesar.</p>
    `.trim(),
  },

  // ── NOI 5 ARTICOLE RO ────────────────────────────────────────────────────

  {
    slug: "ferestre-pvc-preturi-2025",
    lang: "ro",
    title: "Ferestre PVC Prețuri 2026: Cât Costă și Cum Eviți să Plătești Prea Mult",
    description: "Prețuri reale ferestre PVC 2026: de la geam dublu la triplu. Ce influențează costul, cum compari ofertele și cum economisești fără să sacrifici calitatea.",
    date: "2026-04-07",
    category: "Prețuri & Oferte",
    readingTime: 12,
    content: `
<h2>De ce prețurile ferestrelor PVC variază atât de mult?</h2>
<p>Cauți <strong>ferestre PVC prețuri 2026</strong> și găsești oferte între 300 lei și 2.500 lei pe fereastră. Cum este posibilă o diferență atât de mare? Răspunsul stă în patru variabile: calitatea profilului, tipul de geam, feroneria și proveniența producției.</p>
<p>Înțelegând aceste variabile poți compara ofertele în mod inteligent — și să nu cazi în capcana prețului mic care ascunde costuri de întreținere ridicate pe termen lung.</p>

<h2>Factorii care determină prețul unei ferestre PVC</h2>
<h3>1. Profilul: camere și grosime</h3>
<p>Profilul PVC este structura portantă a ferestrei. Un profil cu 5 camere oferă performanțe termice net superioare față de unul cu 3 camere, la un cost marginal mai ridicat. Diferența de preț între un profil 3 camere și unul cu 5 camere este adesea de doar 50-100 lei per fereastră — o investiție care se recuperează în 2-3 ani din facturi.</p>
<p>ThermoDMR utilizează profile germane cu 5 camere ca standard pe toată gama, cu opțiunea de 6 camere pentru linia DMR Passive.</p>

<h3>2. Geamul: dublu sau triplu?</h3>
<p>Termopanul este locul unde se câștigă sau se pierde bătălia energetică. Opțiunile principale pentru 2026:</p>
<ul>
  <li><strong>Geam dublu 4/16/4 cu argon și coating low-e</strong> — Ug ≈ 1,0 W/m²K — standard ThermoDMR</li>
  <li><strong>Geam dublu 4/20/4 cu kripton</strong> — Ug ≈ 0,7 W/m²K — performanță de triplu vitraj la cost inferior</li>
  <li><strong>Geam triplu 4/12/4/12/4</strong> — Ug ≈ 0,5 W/m²K — ideal pentru zone climatice reci (Moldova, Ardeal, Bucovina)</li>
</ul>

<h3>3. Feroneria</h3>
<p>O feronerie de calitate (Roto, Maco, Siegenia) costă mai mult dar garantează deschidere și închidere precisă pentru decenii. Feroneria ieftină se uzează rapid, necesitând reglaje frecvente și înlocuire în 7-10 ani.</p>

<h3>4. Producție directă vs intermediari</h3>
<p>O fereastră cumpărată de la un distribuitor a trecut deja prin două-trei marje de adaos. Cumpărând direct de la producător — ca ThermoDMR — elimini acești intermediari și reduci prețul final cu 20-35%.</p>

<h2>Prețuri orientative ferestre PVC 2026 (pentru dimensiune standard 120×140 cm)</h2>
<table>
  <thead>
    <tr><th>Tip</th><th>Gamă intrare</th><th>Gamă medie</th><th>Gamă premium</th></tr>
  </thead>
  <tbody>
    <tr><td>Geam dublu, profil 3 camere</td><td>350-600 lei</td><td>650-900 lei</td><td>950-1.300 lei</td></tr>
    <tr><td>Geam dublu low-e, profil 5 camere</td><td>600-850 lei</td><td>900-1.200 lei</td><td>1.300-1.700 lei</td></tr>
    <tr><td>Geam triplu, profil 6 camere</td><td>950-1.300 lei</td><td>1.350-1.800 lei</td><td>1.900-2.600 lei</td></tr>
  </tbody>
</table>
<p><em>Prețuri fără TVA, fără montaj. Prețurile variază în funcție de dimensiuni, tip deschidere (basculant, glisant, oscilo-batant) și personalizări cromatice.</em></p>

<h2>Costul montajului</h2>
<p>Manopera pentru montarea unei ferestre standard variază între 150 și 350 lei pe fereastră, în funcție de complexitatea intervenției și zona geografică. ThermoDMR poate indica instalatori certificați în zona ta: <a href="/ro/contact">contactează-ne</a>.</p>

<h2>Cum citești (și compari) o ofertă</h2>
<p>Când primești mai multe oferte pentru ferestre PVC, verifică întotdeauna că includ:</p>
<ol>
  <li><strong>Numărul de camere al profilului</strong> — minimum 5</li>
  <li><strong>Marca profilului</strong> — profilurile germane (Rehau, Veka, Aluplast, Gealan) sunt verificabile</li>
  <li><strong>Valoarea Uw a ferestrei complete</strong> — nu doar a geamului</li>
  <li><strong>Tipul termopanului</strong> — gaz argon sau kripton, coating low-e</li>
  <li><strong>Marca feronerie</strong></li>
  <li><strong>Garanția</strong> — minimum 5 ani; ThermoDMR oferă 15 ani</li>
</ol>

<h2>Cât costă înlocuirea tuturor ferestrelor unui apartament din România?</h2>
<p>Apartament tip 70 m² cu 5 ferestre și 1-2 uși-fereastră:</p>
<ul>
  <li><strong>Gamă medie (geam dublu low-e, 5 camere)</strong>: 6.500-10.000 lei ferestre + 1.500-2.500 lei montaj = 8.000-12.500 lei total</li>
  <li><strong>Gamă premium (geam triplu, 6 camere)</strong>: 11.000-16.000 lei ferestre + 1.500-2.500 lei montaj = 12.500-18.500 lei total</li>
</ul>
<p>Prin programele de finanțare disponibile (fonduri europene, Casa Verde, credite cu dobândă avantajoasă) costul net poate fi redus semnificativ.</p>

<h2>Solicită oferta ta ThermoDMR</h2>
<p>Trimite-ne dimensiunile golurilor și planul casei: îți pregătim o ofertă detaliată cu materiale specificate, valoare Uw garantată și termene certe de livrare. <a href="/ro/contact">Ofertă gratuită în 24 ore →</a></p>
    `.trim(),
  },

  {
    slug: "program-reabilitare-termica-finantare-ferestre-2025",
    lang: "ro",
    title: "Finanțare Ferestre PVC 2026: Programe și Fonduri pentru Renovare Termică",
    description: "Ghid complet programe finanțare renovare termică România 2026: Casa Verde, fonduri europene, deduceri fiscale. Condiții, documente și cum accesezi ajutoarele.",
    date: "2026-04-05",
    category: "Finanțare & Subvenții",
    readingTime: 10,
    content: `
<h2>De ce să nu aștepți pentru a-ți schimba ferestrele</h2>
<p>Schimbarea ferestrelor vechi cu unele PVC de înaltă eficiență nu este un lux — este o investiție cu returnare măsurabilă. Iar în 2026, există mai multe programe de finanțare disponibile în România care pot acoperi o parte semnificativă din cost.</p>
<p>Această ghid îți explică ce programe există, cine poate accesa, ce documente sunt necesare și cum poți combina sursele de finanțare.</p>

<h2>Programul Casa Verde Plus — reabilitare termică</h2>
<p>Programul <strong>Casa Verde Plus</strong> administrat de AFM (Administrația Fondului pentru Mediu) include componente dedicate reabilitării termice a locuințelor, care pot acoperi și înlocuirea ferestrelor.</p>
<p>Condiții generale de eligibilitate:</p>
<ul>
  <li>Locuință din mediul urban sau rural (condițiile variază per sesiune)</li>
  <li>Proprietar al imobilului sau deținător al altui drept real</li>
  <li>Locuința să nu fi beneficiat anterior de același tip de finanțare</li>
  <li>Ferestrele noi să respecte normele tehnice în vigoare (Uw ≤ 1,4 W/m²K)</li>
</ul>
<p><strong>Important:</strong> Sesiunile de înscriere sunt limitate. <a href="/ro/contact">Contactează-ne</a> pentru informații despre sesiunile active în prezent.</p>

<h2>Fonduri europene pentru renovare energetică 2026</h2>
<p>Prin Planul Național de Redresare și Reziliență (PNRR) și prin programele operaționale regionale co-finanțate de UE, sunt disponibile în România fonduri pentru renovarea energetică a clădirilor rezidențiale.</p>
<p>Componentele relevante pentru înlocuirea ferestrelor:</p>
<ul>
  <li><strong>PNRR Componenta C5</strong> — renovare energetică clădiri rezidențiale: subvenții de până la 90% din costul eligibil pentru categorii prioritare</li>
  <li><strong>POR 2021-2027</strong> (Programele Operaționale Regionale) — finanțare pentru renovare energetică prin autorități locale</li>
  <li><strong>Programe primării</strong> — București, Cluj, Timișoara, Iași, Brașov au programe proprii de cofinanțare pentru renovare termică</li>
</ul>

<h2>Deducere fiscală pentru renovare</h2>
<p>Persoanele fizice din România care efectuează renovări termice pot beneficia de deducerea cheltuielilor din impozitul pe venit, conform prevederilor Codului Fiscal în vigoare. Consultă un contabil sau <a href="/ro/contact">contactează-ne</a> pentru detalii actualizate la zi.</p>

<h2>Credite verzi la bănci comerciale</h2>
<p>Principalele bănci din România oferă produse specifice pentru renovare energetică, la dobânzi preferențiale:</p>
<ul>
  <li><strong>Credite „Green"</strong> cu dobânzi reduse față de creditele de consum standard</li>
  <li><strong>Credite ipotecare cu destinație renovare</strong> — dobânzi mai mici, durate mai lungi</li>
  <li><strong>Garanții de stat</strong> (Prima Casă / O Casă, 1 Euro) pentru achiziție și renovare simultană</li>
</ul>
<p>Unele bănci cer certificat energetic al clădirii înainte și după renovare pentru a acorda dobânda verde preferențială.</p>

<h2>Cum se combină sursele de finanțare</h2>
<p>Exemplu practic pentru un apartament din Cluj-Napoca, 3 camere, 10 ferestre:</p>
<ul>
  <li>Cost ferestre + montaj: 15.000 lei</li>
  <li>Subvenție AFM / PNRR (dacă disponibilă): - 8.000 lei</li>
  <li>Credit verde bancă: 5.000 lei (3 ani, dobândă 6%)</li>
  <li>Plată directă proprietar: 2.000 lei</li>
</ul>
<p>Economia anuală la factură (estimată 500-700 lei/an) acoperă rata lunară a creditului.</p>

<h2>Documente necesare în general pentru finanțări</h2>
<ol>
  <li>Act de identitate proprietar</li>
  <li>Extras de carte funciară (nu mai vechi de 30 zile)</li>
  <li>Factură fiscală de la producătorul de ferestre cu Uw specificat</li>
  <li>Certificat energetic al clădirii (pentru unele programe)</li>
  <li>Declarație pe propria răspundere că locuința nu a mai beneficiat de finanțare similară</li>
  <li>Ofertă / contract cu producătorul sau instalatorul</li>
</ol>

<h2>Ferestre ThermoDMR și finanțările disponibile</h2>
<p>ThermoDMR emite facturi fiscale cu specificații tehnice complete (Uw, tip profil, tip geam) — documentele necesare pentru dosarele de finanțare. Oferim și suport tehnic pentru completarea dosarelor, în limita informațiilor disponibile la data solicitării.</p>
<p><a href="/ro/contact">Contactează-ne pentru o ofertă gratuită</a> și te informăm despre programele active în momentul comenzii.</p>
    `.trim(),
  },

  {
    slug: "geam-dublu-vs-geam-triplu-care-alegi",
    lang: "ro",
    title: "Geam Dublu vs Geam Triplu: Care Alegi în 2026?",
    description: "Comparație tehnică completă geam dublu vs triplu: izolare, costuri, greutate și când merită cu adevărat să alegi termopanul triplu. Ghid 2026.",
    date: "2026-04-03",
    category: "Ghiduri Tehnice",
    readingTime: 10,
    content: `
<h2>Întrebarea pe care o pune aproape orice client</h2>
<p>Când cumperi ferestre noi, alegerea între <strong>geam dublu și geam triplu</strong> este una dintre cele mai discutate. Geamul triplu costă mai mult, dar izolează mai bine. Merită să plătești diferența? Răspunsul depinde de zona ta climatică, tipul de clădire și cât vrei să investești azi pentru a economisi mâine.</p>

<h2>Cum funcționează un termopan</h2>
<p>Un termopan (sau geam izolator) este compus din două sau trei foi de sticlă separate printr-un spațiu umplut cu gaz nobil (argon sau kripton) și sigilate perimetral.</p>
<ul>
  <li><strong>Geam dublu</strong>: 2 foi + 1 intercapedine gaz</li>
  <li><strong>Geam triplu</strong>: 3 foi + 2 intercapedine gaz</li>
</ul>
<p>Coating-ul <strong>low-emissivity (low-e)</strong> este un strat transparent care reflectă căldura spre interior iarna și spre exterior vara. Este prezent pe toate termopanele ThermoDMR indiferent de numărul de foi.</p>

<h2>Valori Ug comparate</h2>
<table>
  <thead><tr><th>Tip termopan</th><th>Compoziție tipică</th><th>Gaz</th><th>Ug (W/m²K)</th></tr></thead>
  <tbody>
    <tr><td>Geam dublu standard</td><td>4/16/4</td><td>Argon</td><td>1,0 – 1,1</td></tr>
    <tr><td>Geam dublu performant</td><td>4/20/4</td><td>Kripton</td><td>0,7 – 0,8</td></tr>
    <tr><td>Geam triplu standard</td><td>4/12/4/12/4</td><td>Argon</td><td>0,6 – 0,7</td></tr>
    <tr><td>Geam triplu premium</td><td>4/14/4/14/4</td><td>Kripton</td><td>0,4 – 0,5</td></tr>
  </tbody>
</table>
<p>Valoarea Ug este a geamului singur. Valoarea Uw a ferestrei complete (geam + toc) este întotdeauna ușor mai ridicată — pentru linia DMR Passive cu triplu vitraj și profil 6 camere, Uw ajunge la 0,78 W/m²K.</p>

<h2>Izolare acustică: cine câștigă?</h2>
<p>Din punct de vedere acustic, geamul triplu nu este automat superior celui dublu. Izolarea acustică depinde în special de asimetria grosimilor foilor de sticlă și de tipul sticlei (laminată vs securizată). Un geam dublu asimetric laminat (ex. 6.4.1/16/4) poate fi mai eficient acustic decât un geam triplu standard.</p>

<h2>Greutate: un factor adesea neglijat</h2>
<p>Un termopan triplu cântărește cu ~50% mai mult decât unul dublu pentru aceeași suprafață. Implicații practice:</p>
<ul>
  <li>Profil mai robust și feronerie mai grea (incluse în linia DMR Passive)</li>
  <li>Solicitare mai mare pe balamale — necesită reglaj periodic</li>
  <li>Pentru ferestre foarte mari (&gt;2,5 m²), geamul triplu necesită profile specifice întărite</li>
</ul>

<h2>Condens: unde apare mai frecvent?</h2>
<p>Condensul pe suprafața interioară a geamului este aproape eliminat cu ambele soluții, dacă fereastra este montată corect. La temperaturi exterioare extreme (-20°C), ferestrele cu geam dublu pot prezenta condens marginal la periferia geamului; geamul triplu îl elimină aproape complet.</p>
<p>Condensul pe suprafața exterioară a geamului indică că fereastra izolează foarte bine — este un semn pozitiv, nu un defect.</p>

<h2>Diferența de preț: cât mai mult costă geamul triplu?</h2>
<p>Pentru o fereastră standard 120×140 cm, diferența de cost între dublu și triplu (la același toc) este de obicei <strong>200-400 lei per fereastră</strong>. Pe întreaga locuință (7-8 ferestre + uși-fereastră), diferența totală este de <strong>2.000-4.000 lei</strong>.</p>

<h2>Când să alegi geamul dublu</h2>
<ul>
  <li>Zone climatice temperate (Oltenia, Muntenia, Dobrogea, Banat de câmpie)</li>
  <li>Buget limitat care privilegiază numărul de ferestre față de performanța individuală</li>
  <li>Clădiri cu izolație bună a pereților și acoperișului</li>
  <li>Renovări parțiale unde bugetul trebuie optimizat</li>
</ul>

<h2>Când să alegi geamul triplu</h2>
<ul>
  <li>Zone climatice reci: Moldova, Bucovina, Ardeal, Maramureș, zonele montane</li>
  <li>Case pasive sau clădiri cu consum energetic redus</li>
  <li>Când vrei să maximizezi confortul termic iarna și să elimini curenții de aer</li>
  <li>Cerințe acustice ridicate (cu geam asimetric)</li>
  <li>Dacă dorești să accesezi finanțări cu cerințe Uw ≤ 0,8 W/m²K</li>
</ul>

<h2>Alegerea ThermoDMR</h2>
<p>Ferestrele <a href="/ro/produse">ThermoDMR</a> sunt disponibile cu geam dublu (liniile DMR Confort și DMR Domus) și geam triplu (linia DMR Passive). Toate includ coating low-e și gaz argon standard; upgrade la kripton disponibil la cerere.</p>
<p>Nu știi ce să alegi? <a href="/ro/contact">Solicită o consultanță gratuită</a> — analizăm zona climatică, orientarea și bugetul pentru a te ajuta să faci alegerea optimă.</p>
    `.trim(),
  },

  {
    slug: "inlocuire-ferestre-renovare-casa-ghid-complet",
    lang: "ro",
    title: "Înlocuire Ferestre la Renovare: Ghid Complet 2026 pentru România",
    description: "Cum înlocuiești ferestrele în timpul unei renovări: etape, ordinea lucrărilor, alegerea tâmplăriei potrivite și cum eviți greșelile cele mai frecvente. Ghid 2026.",
    date: "2026-04-01",
    category: "Renovare",
    readingTime: 11,
    content: `
<h2>De ce înlocuirea ferestrelor este una dintre cele mai rentabile intervenții</h2>
<p>Într-o renovare, <strong>înlocuirea ferestrelor</strong> este adesea intervenția cu cel mai bun raport între cost și îmbunătățire percepută. Schimbă estetica, reduce consumul energetic, elimină punțile termice și îmbunătățește izolarea acustică — totul într-un singur șantier.</p>
<p>Dar este și o intervenție unde greșelile costă scump: dimensiuni incorecte, tâmplărie inadecvată zonei climatice, montaj grăbit. Acest ghid te ajută să eviți problemele cele mai frecvente.</p>

<h2>Când este momentul potrivit să înlocuiești ferestrele</h2>
<p>Semnalele care indică că a venit momentul:</p>
<ul>
  <li><strong>Condens frecvent</strong> pe geamul interior → termopanul este epuizat sau garniturile sunt uzate</li>
  <li><strong>Curenți de aer</strong> perceptibili chiar cu ferestrele închise → profil deformat sau garnituri de schimbat</li>
  <li><strong>Dificultăți la deschidere și închidere</strong> → feronerie uzată sau profil deformat</li>
  <li><strong>Zgomot excesiv din exterior</strong> → termopan inadecvat sau etanșare compromisă</li>
  <li><strong>Ferestre de peste 20-25 ani</strong> → indiferent de starea aparentă, performanțele sunt degradate</li>
</ul>

<h2>Înainte de toate: cum măsori corect</h2>
<p>Dimensiunea pentru a comanda ferestrele se ia întotdeauna din <strong>golul de zidărie</strong>, nu de la fereastra existentă. Ferestrele noi sunt produse cu o toleranță care permite montajul fără a demola zidul:</p>
<ul>
  <li>Măsoară lățimea în trei puncte (sus, mijloc, jos) → folosește dimensiunea minimă</li>
  <li>Măsoară înălțimea în trei puncte (stânga, centru, dreapta) → folosește dimensiunea minimă</li>
  <li>Menționează prezența casetei de rulou sau a oblonului exterior (influențează sistemul de montaj)</li>
</ul>
<p>ThermoDMR oferă serviciul de <strong>măsurare profesională la domiciliu</strong> înainte de orice comandă — garantează că ferestrele ajung cu dimensiunile corecte.</p>

<h2>Ordinea lucrărilor: când montezi ferestrele</h2>
<p>Într-o renovare completă, ferestrele trebuie montate:</p>
<ol>
  <li><strong>După</strong> demolarea tencuielilor (dacă este prevăzută) — evită murdărirea noilor ferestre</li>
  <li><strong>Înainte</strong> de vopsitorii și noile tencuieli interioare — permite finisarea corectă a conturului</li>
  <li><strong>Înainte</strong> de montarea pardoselilor — evită deteriorarea în timpul șantierului</li>
  <li><strong>Coordonat</strong> cu instalarea casetei de rulou, dacă înlocuiești și jaluzelele</li>
</ol>

<h2>Montajul: pasul care face diferența</h2>
<p>O fereastră de calitate montată greșit pierde 50% din performanțe. Punctele critice ale unui montaj profesional:</p>
<ul>
  <li><strong>Etanșare perimetrală cu spumă poliuretanică</strong> — elimină punțile termice între toc și zidărie</li>
  <li><strong>Bandă impermeabilă exterioară</strong> — împiedică infiltrațiile de apă de ploaie</li>
  <li><strong>Bandă difuzie vapori interioară</strong> — permite zidăriei să respire fără a lăsa umiditate să treacă</li>
  <li><strong>Nivelare precisă</strong> — o aripă strâmbă cu 1 mm cauzează pierderi de aer semnificative</li>
  <li><strong>Reglajul feronerie post-montaj</strong> — necesar după stabilizarea profilului</li>
</ul>

<h2>Înlocuiești ferestrele fără să schimbi casetele de rulou: se poate?</h2>
<p>Da, dar este o oportunitate de a nu rata. Dacă casetele sunt vechi (din lemn sau PVC de primă generație), probabil sunt o punte termică importantă. Înlocuindu-le simultan cu ferestrele, adaugi un cost marginal dar îmbunătățești semnificativ performanțele anvelopei.</p>
<p>ThermoDMR produce <a href="/ro/produse/casete-rulou">casete de rulou termoizolante</a> special proiectate pentru a se integra cu propria gamă de ferestre.</p>

<h2>Autorizații și birocrație în România</h2>
<p>Înlocuirea ferestrelor într-o locuință privată, fără modificarea formei golului, se încadrează în general la <strong>întreținere curentă/reparație capitală</strong> și nu necesită autorizație de construire.</p>
<p>Excepții:</p>
<ul>
  <li>Clădiri în zone protejate / monumente istorice → necesită aviz de la Direcția de Cultură</li>
  <li>Modificarea formei sau dimensiunii golului → necesită notificare sau autorizație</li>
  <li>Blocuri cu regulament de asociație care impune culori și tipologii → verifică cu administratorul</li>
</ul>

<h2>Cum alegi tâmplăria potrivită pentru renovare în România</h2>
<p>Pentru o renovare în zone climatice temperate-reci (Transilvania, Moldova, Bucovina, nordul Munteniei), alegerea optimă în 2026 este:</p>
<ul>
  <li><strong>Profil PVC cu 5 camere</strong> (ex. DMR Confort sau DMR Domus)</li>
  <li><strong>Geam dublu low-e cu argon</strong>, Ug ≈ 1,0 W/m²K</li>
  <li><strong>Feronerie perimetrală de calitate</strong> (Roto, Maco, Siegenia)</li>
  <li><strong>Deschidere oscilo-batantă</strong> pentru ventilație controlată</li>
</ul>
<p>Pentru zonele montane sau pentru maximizarea economiei energetice: geam triplu și profil 6 camere (linia <a href="/ro/produse/dmr-passive">DMR Passive</a>).</p>

<h2>Solicită o ofertă pentru renovarea ta</h2>
<p>Spune-ne câte ferestre ai, în ce județ ești și dacă renovezi tot sau pe faze: îți pregătim o ofertă personalizată cu materiale specificate și termene garantate. <a href="/ro/contact">Contactează-ne gratuit →</a></p>
    `.trim(),
  },

  {
    slug: "cum-alegi-ferestrele-ghid-cumparaturi-2025",
    lang: "ro",
    title: "Cum Alegi Ferestrele: Ghid Complet de Cumpărare 2026 Fără Greșeli",
    description: "Ghid complet pentru alegerea ferestrelor potrivite în 2026: materiale, geamuri, tipuri de deschidere, culori și certificări. Tot ce trebuie să știi înainte să cumperi.",
    date: "2026-03-28",
    category: "Ghiduri",
    readingTime: 13,
    content: `
<h2>Alegerea ferestrelor: o achiziție pentru 30-40 de ani</h2>
<p>Ferestrele nu se schimbă des. O alegere greșită azi înseamnă decenii de facturi mai mari, disconfort termic și acustic, întreținere costisitoare. Dar cu informațiile corecte, alegerea devine simplă și sigură.</p>
<p>Acest ghid acoperă totul: de la materialul tocului la tipul de geam, de la tipurile de deschidere la certificări — fără termeni tehnici inutili.</p>

<h2>Materialul tocului: PVC, aluminiu sau lemn?</h2>

<h3>PVC</h3>
<p><strong>PVC</strong>-ul este astăzi cel mai răspândit material în Europa pentru tâmplăria rezidențială. Avantaje principale:</p>
<ul>
  <li>Excelentă izolare termică (PVC nu conduce căldura)</li>
  <li>Fără întreținere (nu vopsești, nu ungi, nu tratezi)</li>
  <li>Rezistent la umiditate, UV, coroziune</li>
  <li>Preț competitiv față de aluminiu și lemn</li>
  <li>Disponibil în zeci de culori și finisaje (inclusiv efect lemn)</li>
</ul>

<h3>Aluminiu</h3>
<p>Aluminiul cu <strong>ruptură termică</strong> este o alegere valabilă în special pentru ferestre mari, fațade continue și aplicații arhitecturale unde designul este prioritar. Are o estetică mai subțire și modernă față de PVC, dar necesită o ruptură termică eficientă pentru o izolare comparabilă. Costă în general 30-50% mai mult decât PVC.</p>

<h3>Lemn</h3>
<p>Lemnul are performanțe termice naturale excelente și o estetică fără rival, dar necesită întreținere periodică (vopsire la 5-7 ani). Este alegerea obligatorie în multe zone protejate (centre istorice). Costul este cel mai ridicat dintre cele trei opțiuni.</p>

<h3>PVC/aluminiu (compozit)</h3>
<p>Compozitul PVC-aluminiu combină interiorul PVC (izolare maximă) cu exteriorul aluminiu (durabilitate și rezistență maximă la intemperii). Este o alegere de gamă înaltă, cu performanțe excelente.</p>

<h2>Termopanul: unde se face cu adevărat diferența</h2>
<p>Geamul contribuie cu aproximativ 70% din performanțele termice totale ale ferestrei. Parametri de evaluat:</p>

<h3>Transmitanță termică (Ug)</h3>
<ul>
  <li>Ug 1,0 W/m²K — geam dublu cu argon și low-e (standard actual)</li>
  <li>Ug 0,7 W/m²K — geam dublu cu kripton (performanță ridicată)</li>
  <li>Ug 0,5 W/m²K — geam triplu cu argon</li>
  <li>Ug 0,4 W/m²K — geam triplu cu kripton (performanță maximă)</li>
</ul>

<h3>Factor solar (g)</h3>
<p>Factorul solar măsoară câtă energie solară intră prin geam. O valoare ridicată (g &gt; 0,5) este avantajoasă iarna (solar pasiv) dar poate cauza supraîncălzire vara la sud. O valoare scăzută (g &lt; 0,35) este indicată pentru ferestre expuse vest sau sud în climate calde.</p>

<h3>Transmisie luminoasă (TL)</h3>
<p>Cu cât TL este mai mare, cu atât intră mai multă lumină naturală. Un termopan bun ar trebui să aibă TL &gt; 70%.</p>

<h2>Tipuri de deschidere: ce alegi?</h2>
<table>
  <thead><tr><th>Deschidere</th><th>Avantaje</th><th>Dezavantaje</th><th>Recomandat pentru</th></tr></thead>
  <tbody>
    <tr><td>Oscilo-batantă</td><td>Dublă funcție, etanșare bună închis</td><td>Ocupă spațiu interior</td><td>Aproape orice cameră: cea mai versatilă</td></tr>
    <tr><td>Batantă simplă</td><td>Simplitate, cost mai mic</td><td>O singură poziție de deschidere</td><td>Ferestre mici, debara, băi</td></tr>
    <tr><td>Basculantă (doar ribaltă)</td><td>Ventilație sigură și pe ploaie</td><td>Deschidere limitată</td><td>Băi, bucătării, camere cu copii mici</td></tr>
    <tr><td>Glisantă</td><td>Fără intruziune interioară, ideală uși-fereastră</td><td>Etanșare inferioară față de oscilo-batantă</td><td>Uși-fereastră, terase, grădini</td></tr>
    <tr><td>Ridicare-glisare</td><td>Etanșare maximă, suprafețe mari vitrate</td><td>Cost ridicat</td><td>Uși-fereastră panoramice, living</td></tr>
  </tbody>
</table>

<h2>Culori și finisaje: personalizare fără limite</h2>
<p>Ferestrele PVC moderne nu sunt doar albe. Tehnologia de co-extrudare și laminare permite:</p>
<ul>
  <li><strong>Culori RAL</strong> (gri antracit 7016, bej, maro) — cele mai solicitate în 2025-2026</li>
  <li><strong>Efect lemn</strong> (golden oak, nuc, mahon) — ideal pentru imobile vechi sau ambianțe rustice</li>
  <li><strong>Bicolor</strong> — culoare diferită interior și exterior</li>
  <li><strong>Finisaj lucios sau mat</strong></li>
</ul>
<p>Culorile închise (antracit, negru) absorb mai multă căldură solară: în climate calde și pe pereți expuși la sud, pot cauza dilatare ușor mai mare. Profilele de calitate sunt proiectate să gestioneze aceste dilatări fără probleme timp de decenii.</p>

<h2>Certificări de cerut</h2>
<p>Înainte de a cumpăra, verifică că produsul are:</p>
<ul>
  <li><strong>Marcaj CE</strong> — obligatoriu pentru toată tâmplăria vândută în Europa</li>
  <li><strong>Declarație de Performanță (DoP)</strong> cu valoarea Uw certificată</li>
  <li><strong>Certificat de rezistență la vânt</strong> (clasa C conform EN 12210) pentru zone vântoase</li>
  <li><strong>Certificat de etanșeitate la apă</strong> (clasa E conform EN 12208)</li>
  <li><strong>Clasificare acustică Rw</strong> dacă ai cerințe fonoizolante</li>
</ul>
<p>ThermoDMR furnizează toată documentația tehnică certificată cu fiecare comandă.</p>

<h2>Greșelile cele mai frecvente la cumpărare</h2>
<ol>
  <li><strong>Alegerea doar în funcție de preț</strong> — economia inițială se plătește de obicei în întreținere și facturi în următorii 20 de ani</li>
  <li><strong>Neverificarea valorii Uw totale</strong> — mulți vânzători comunică doar Ug al geamului, care este întotdeauna mai mic decât Uw real al ferestrei complete</li>
  <li><strong>Subestimarea montajului</strong> — o fereastră de calitate montată greșit pierde 40-50% din performanțe</li>
  <li><strong>Ignorarea culorii în buget</strong> — culorile speciale pot adăuga 20-25%</li>
  <li><strong>Comandarea fără vizită de măsurare</strong> — dimensiunile luate singur sunt adesea imprecise</li>
</ol>

<h2>Serviciul ThermoDMR: de la consultanță la montaj</h2>
<p>Cu ThermoDMR ai un singur interlocutor de la primul contact până la instalare: vizită gratuită, ofertă detaliată cu materiale certificate, producție directă, termene garantate.</p>
<p><a href="/ro/contact">Începe cu o consultanță gratuită →</a> — fără obligații, răspuns în 24 de ore.</p>
    `.trim(),
  },

  // ── ARTICOLE NOI 2026 ────────────────────────────────────────────────────

  {
    slug: "bonus-tamplarie-2026-deduceri-ferestre-pvc",
    lang: "ro",
    title: "Bonus Tâmplărie 2026: Deduceri Ferestre PVC România",
    description: "Bonus tâmplărie 2026 în România: programe de finanțare, deduceri fiscale și subvenții pentru ferestre PVC. Condiții, documente și cum să aplici.",
    date: "2026-04-07",
    category: "Finanțare",
    readingTime: 18,
    heroImage: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1200&q=80",
    content: `
<h2>De ce 2026 este anul ideal pentru schimbarea ferestrelor</h2>
<p>Dacă ai amânat decizia de a schimba ferestrele vechi, 2026 reprezintă probabil cea mai favorabilă fereastră de oportunitate din ultimul deceniu — și nu este o expresie figurativă. Convergența a patru factori face ca investiția în tâmplărie PVC performantă să fie mai accesibilă și mai rentabilă ca niciodată.</p>
<p>În primul rând, <strong>programele de finanțare nerambursabilă</strong> continuă să funcționeze cu bugete substanțiale, alimentate atât din fonduri europene (PNRR, Fondul de Coeziune) cât și din resurse naționale (AFM, MDLPA). Ferestrele sunt explicit eligibile în aproape toate aceste programe, uneori ca element central, alteori ca parte dintr-un pachet de reabilitare termică mai amplu.</p>
<p>În al doilea rând, <strong>prețurile energiei</strong> au ajuns la niveluri care transformă radical calculul economic. O familie care pierde 3.000–4.000 kWh pe an prin ferestre vechi plătește astăzi echivalentul a 2.000–3.500 lei anual, bani care ar putea contribui direct la rata unui credit pentru renovare. Cu alte cuvinte, ferestrele ineficiente costă bani pe care oamenii nu îi conștientizează.</p>
<p>În al treilea rând, <strong>Directiva Europeană EPBD</strong> (Energy Performance of Buildings Directive), revizuită în 2024, trasează un calendar obligatoriu de renovare pentru fondul imobiliar european. Proprietarii care nu acționează acum vor fi nevoiți să o facă sub presiune în anii următori, când condițiile financiare pot fi mai puțin avantajoase.</p>
<p>În al patrulea rând, <strong>piața tâmplăriei PVC</strong> din România a ajuns la maturitate tehnologică. Profilele cu 5–6 camere, geamurile cu triplu strat Low-E și argon, sistemele de casete termoizolante integrate oferă performanțe la nivel european la prețuri accesibile pentru consumatorul român. Nu mai există scuza că „produsele bune sunt prea scumpe".</p>
<p>Acest ghid îți oferă imaginea completă a tuturor programelor disponibile în 2026, cu condițiile reale, sumele, documentele necesare și sfaturi practice pentru a obține finanțarea cel mai rapid.</p>

<h2>Panorama programelor de finanțare disponibile în România în 2026</h2>
<p>Sistemul de sprijin financiar pentru eficiență energetică în România este mai complex decât pare la prima vedere. Nu există un singur „bonus tâmplărie" — ci un ecosistem de programe cu surse de finanțare diferite, condiții diferite și beneficiari diferiți. Înțelegerea acestui ecosistem îți permite să identifici combinația optimă pentru situația ta specifică.</p>
<p>Principalele surse de finanțare disponibile în 2026 sunt:</p>
<ul>
  <li><strong>Casa Verde Plus</strong> — program AFM pentru persoane fizice, finanțare nerambursabilă pentru eficiență energetică</li>
  <li><strong>Programul Național de Reabilitare Termică</strong> — pentru blocuri de locuințe, gestionat de MDLPA și primării</li>
  <li><strong>PNRR Componenta C5</strong> — fonduri europene pentru renovare profundă a clădirilor rezidențiale</li>
  <li><strong>Rabla pentru Case</strong> — program AFM cu elemente noi introduse în 2026</li>
  <li><strong>TVA redusă la 5%</strong> — facilitate fiscală aplicabilă direct la facturare</li>
  <li><strong>Deducerea din impozitul pe venit</strong> — reducere fiscală pentru investiții în eficiență energetică</li>
  <li><strong>Credite verzi bancare</strong> — produse de creditare cu dobândă redusă pentru renovare energetică</li>
</ul>
<p>Fiecare program are propriul calendar, buget anual și proceduri. Unele se pot combina (de exemplu TVA redusă + deducere din impozit), altele sunt exclusive (nu poți lua bani din două programe nerambursabile pentru aceleași lucrări). Detaliem fiecare în secțiunile următoare.</p>

<h2>Casa Verde Plus 2026: ghid complet AFM</h2>
<p><strong>Casa Verde Plus</strong> este administrat de Administrația Fondului pentru Mediu (AFM) și reprezintă principalul program național de finanțare nerambursabilă pentru eficiență energetică destinat persoanelor fizice. În sesiunea 2026, programul acoperă o gamă extinsă de lucrări, inclusiv explicit <strong>înlocuirea tâmplăriei exterioare cu ferestre și uși PVC performante</strong>.</p>

<h3>Condiții de eligibilitate pentru solicitanți</h3>
<p>Poate aplica orice persoană fizică care îndeplinește cumulativ:</p>
<ul>
  <li>Este cetățean român sau rezident cu drept de ședere permanentă</li>
  <li>Deține în proprietate (sau coproprietate) locuința pentru care solicită finanțarea</li>
  <li>Nu are datorii restante față de bugetul de stat sau local</li>
  <li>Nu a beneficiat de același tip de finanțare AFM în ultimii 5 ani pentru aceeași locuință</li>
  <li>Veniturile nete ale gospodăriei nu depășesc un anumit plafon (stabilit anual prin ghidul programului)</li>
</ul>

<h3>Ce se finanțează și în ce limite</h3>
<p>Pentru tâmplărie PVC, programul acoperă:</p>
<ul>
  <li>Ferestre exterioare cu geam dublu sau triplu Low-E cu argon, cu Uw ≤ 1,4 W/m²K</li>
  <li>Uși exterioare termoizolante cu Uw ≤ 1,4 W/m²K (inclusiv <a href="/ro/produse/portoncini">uși de intrare blindate termoizolante</a>)</li>
  <li>Casete termoizolante și accesorii direct legate de montajul tâmplăriei</li>
  <li>Manopera de montaj la firme autorizate AFM</li>
</ul>
<p>Suma maximă nerambursabilă este de până la <strong>20.000 lei per dosar</strong>, reprezentând până la <strong>50% din valoarea totală eligibilă</strong> a lucrărilor. Restul de 50% este suportat de beneficiar — fie din fonduri proprii, fie printr-un credit verde bancar.</p>

<h3>Procedura de aplicare pas cu pas</h3>
<ol>
  <li><strong>Înregistrare pe platforma AFM</strong> (afm.ro) cu CNP și date de contact</li>
  <li><strong>Completarea cererii online</strong> cu datele locuinței și tipul lucrărilor planificate</li>
  <li><strong>Obținerea ofertei tehnice</strong> de la un furnizor autorizat AFM (ThermoDMR poate furniza această ofertă cu toate detaliile tehnice necesare)</li>
  <li><strong>Depunerea dosarului complet</strong> în sesiunea deschisă — dosarele incomplete sunt respinse automat</li>
  <li><strong>Evaluarea dosarului</strong> de către AFM (30-60 zile lucrătoare)</li>
  <li><strong>Aprobarea și semnarea contractului</strong> de finanțare cu AFM</li>
  <li><strong>Execuția lucrărilor</strong> și plata furnizorului</li>
  <li><strong>Decontarea</strong>: AFM virează suma aprobată direct în contul beneficiarului, după prezentarea facturilor și proceselor-verbale de recepție</li>
</ol>

<h2>Programul Național de Reabilitare Termică: pentru blocuri și case vechi</h2>
<p>Dacă locuiești într-un bloc de apartamente, situația este diferită față de o casă individuală. Nu poți aplica individual pentru înlocuirea ferestrelor — trebuie să acționezi prin <strong>asociația de proprietari</strong>, iar programul relevant este <strong>Programul Național de Reabilitare Termică a Clădirilor Rezidențiale Multietajate</strong>.</p>

<h3>Cum funcționează programul la nivel de bloc</h3>
<p>Procesul implică mai mulți actori: asociația de proprietari, primăria, MDLPA și (indirect) fondurile europene. Finanțarea poate acoperi:</p>
<ul>
  <li><strong>60–90% din costul total</strong> al reabilitării, în funcție de zona geografică și clasa energetică inițială a blocului</li>
  <li>Izolarea termică a fațadelor (polistiren sau vată minerală)</li>
  <li>Înlocuirea tâmplăriei exterioare la toate apartamentele simultan</li>
  <li>Reabilitarea acoperișului și a subsolului</li>
  <li>Înlocuirea instalațiilor comune de încălzire</li>
</ul>
<p>Blocurile cu clasa energetică G sau F au prioritate la finanțare. Marea majoritate a blocurilor construite înainte de 1990 în România se încadrează în aceste categorii.</p>

<h3>Cum inițiezi procesul la nivelul asociației de proprietari</h3>
<p>Dacă ești activist în asociația de proprietari sau ai colegi interesați, iată pașii concreți:</p>
<ol>
  <li>Obțineți un <strong>audit energetic</strong> al blocului (obligatoriu, efectuat de un auditor acreditat ANRE)</li>
  <li>Prezentați raportul de audit în adunarea generală și votați decizia de aplicare</li>
  <li>Depuneți dosarul la <strong>primăria locală</strong>, care este intermediarul față de MDLPA</li>
  <li>Primăria selectează proiectantul și antreprenorul general prin licitație publică</li>
  <li>Lucrările se execută simultan la întregul bloc, inclusiv ferestre uniforme la toate apartamentele</li>
</ol>
<p>Dezavantajul acestei rute este că nu poți alege individual furnizorul de tâmplărie — se alege prin licitație. Avantajul este că costul per proprietar poate fi redus la aproape zero dacă blocul obține finanțare maximă.</p>

<h2>PNRR și fonduri europene pentru eficiență energetică în 2026</h2>
<p>Planul Național de Redresare și Reziliență (PNRR) alocat României include o componentă specifică — <strong>Componenta C5: Valul renovărilor</strong> — cu un buget de peste 2,2 miliarde euro destinat renovării clădirilor rezidențiale și publice.</p>
<p>În 2026, implementarea acestor fonduri este în faza de maturitate, cu apeluri active și proceduri clarificate. Aspecte importante pentru proprietarii de locuințe:</p>
<ul>
  <li>Finanțarea PNRR vizează în special <strong>renovarea profundă</strong> (reducerea consumului energetic cu minimum 30%), nu intervenții izolate</li>
  <li>Ferestrele pot fi eligibile ca parte dintr-un pachet mai amplu care include izolarea pereților, a acoperișului și modernizarea instalațiilor</li>
  <li>Există un ghișeu unic la MDLPA pentru aplicații PNRR în domeniul renovării rezidențiale</li>
  <li>Beneficiarii din mediul rural și din zone defavorizate au acces la cote de finanțare mai mari (până la 85%)</li>
</ul>
<p>Un avantaj specific al PNRR față de programele AFM: <strong>suma maximă eligibilă per locuință este semnificativ mai mare</strong>, putând ajunge la 100.000–150.000 lei pentru renovări complete. Aceasta face PNRR-ul atractiv pentru case individuale care necesită reabilitare integrală.</p>

<h2>TVA redusă la 5% pentru lucrări la locuința principală</h2>
<p>Aceasta este cea mai simplă și directă facilitate fiscală disponibilă în 2026: TVA redusă de la <strong>19% la 5%</strong> pentru livrarea și instalarea de tâmplărie PVC, geamuri termopan și uși la locuința principală, în cadrul lucrărilor de reabilitare termică.</p>

<h3>Cum funcționează TVA redusă în practică</h3>
<p>Facilitatea se aplică automat la facturare, fără dosar separat sau aprobare prealabilă. Furnizorul autorizat (precum ThermoDMR) emite factura cu TVA de 5% dacă sunt îndeplinite condițiile:</p>
<ul>
  <li>Locuința este <strong>reședința principală</strong> a beneficiarului (conform dovezii de domiciliu)</li>
  <li>Lucrările sunt efectuate de o firmă înregistrată în scop de TVA</li>
  <li>Beneficiarul prezintă o declarație pe proprie răspundere că imobilul este locuința sa principală</li>
  <li>Lucrările au caracter de <strong>reabilitare termică</strong> — nu simplă înlocuire din motive estetice</li>
</ul>

<h3>Cât economisești concret cu TVA de 5%</h3>
<p>Pe o lucrare de înlocuire a ferestrelor cu o valoare de 25.000 lei (fără TVA), diferența este:</p>
<ul>
  <li>Cu TVA 19%: total facturat = 29.750 lei</li>
  <li>Cu TVA 5%: total facturat = 26.250 lei</li>
  <li><strong>Economie directă: 3.500 lei</strong> — fără niciun dosar, fără nicio așteptare</li>
</ul>

<h2>Deducerea fiscală din impozitul pe venit: calculul practic</h2>
<p>Persoanele fizice care obțin venituri din salarii sau activități independente pot <strong>deduce din impozitul pe venit</strong> cheltuielile efectuate pentru lucrări de eficiență energetică la locuința principală. Facilitatea este reglementată prin Codul Fiscal și se aplică în declarația anuală de impozit (formular D212).</p>

<h3>Cum se calculează deducerea</h3>
<p>Legislația în vigoare în 2026 permite deducerea a până la <strong>30% din cheltuielile eligibile</strong>, cu un plafon anual de 3.000 lei deducere efectivă (echivalent cu cheltuieli eligibile de 10.000 lei). Practic:</p>
<ul>
  <li>Cheltuiești 10.000 lei pe ferestre și montaj → reduci impozitul pe venit cu 3.000 lei</li>
  <li>Cheltuiești 20.000 lei → deducerea este plafonată la 3.000 lei</li>
  <li>Poți reporta cheltuielile pe mai mulți ani dacă suma depășește plafonul anual</li>
</ul>
<p>Deducerea se cumulează cu TVA redusă la 5% — sunt două mecanisme diferite, aplicabile simultan.</p>

<h2>Tabelul comparativ: toate programele 2026</h2>
<table>
  <thead>
    <tr>
      <th>Program</th>
      <th>Suma maximă</th>
      <th>% Finanțat</th>
      <th>Beneficiar</th>
      <th>Termen estimat</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Casa Verde Plus AFM</td>
      <td>20.000 lei</td>
      <td>50%</td>
      <td>Persoane fizice, case și apartamente</td>
      <td>Sesiuni periodice 2026</td>
    </tr>
    <tr>
      <td>Reabilitare Termică Blocuri</td>
      <td>Variabil (60–90%)</td>
      <td>60–90%</td>
      <td>Asociații proprietari</td>
      <td>Continuu prin primării</td>
    </tr>
    <tr>
      <td>PNRR C5 — Valul Renovărilor</td>
      <td>100.000–150.000 lei</td>
      <td>până la 85%</td>
      <td>Case individuale, renovare profundă</td>
      <td>Apeluri active 2026</td>
    </tr>
    <tr>
      <td>Rabla pentru Case</td>
      <td>15.000 lei</td>
      <td>40%</td>
      <td>Persoane fizice, case vechi</td>
      <td>Sesiune primăvară 2026</td>
    </tr>
    <tr>
      <td>TVA redusă 5%</td>
      <td>Nelimitat</td>
      <td>14% din valoarea facturii</td>
      <td>Orice proprietar, locuință principală</td>
      <td>Permanent, la facturare</td>
    </tr>
    <tr>
      <td>Deducere impozit venit</td>
      <td>3.000 lei/an</td>
      <td>30% din cheltuieli</td>
      <td>Salariați și PFA</td>
      <td>Declarație anuală D212</td>
    </tr>
  </tbody>
</table>

<h2>Valorile tehnice obligatorii Uw pe zone climatice în România</h2>
<p>Indiferent de programul ales, ferestrele trebuie să respecte valorile minime de performanță termică impuse prin normativele române și europene. România este împărțită în patru zone climatice, fiecare cu cerințe proprii.</p>
<table>
  <thead>
    <tr>
      <th>Zona Climatică</th>
      <th>Județe reprezentative</th>
      <th>Uw maxim admis</th>
      <th>Temperatura de calcul iarnă</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Zona I</td>
      <td>Constanța, Tulcea, Galați (litoral și Dobrogea)</td>
      <td>≤ 1,6 W/m²K</td>
      <td>-12°C</td>
    </tr>
    <tr>
      <td>Zona II</td>
      <td>București, Ilfov, Olt, Teleorman, Dolj, Timișoara</td>
      <td>≤ 1,4 W/m²K</td>
      <td>-15°C</td>
    </tr>
    <tr>
      <td>Zona III</td>
      <td>Cluj, Brașov, Sibiu, Mureș, Bacău, Iași</td>
      <td>≤ 1,3 W/m²K</td>
      <td>-18°C</td>
    </tr>
    <tr>
      <td>Zona IV</td>
      <td>Suceava, Botoșani, Harghita, zone montane peste 600m</td>
      <td>≤ 1,1 W/m²K</td>
      <td>-21°C</td>
    </tr>
  </tbody>
</table>
<p>Gama <a href="/ro/produse">ThermoDMR</a> acoperă toate zonele climatice: <a href="/ro/produse/dmr-confort">DMR Confort</a> cu Uw = 1,1 W/m²K este eligibil în toate cele patru zone, în timp ce <a href="/ro/produse/dmr-passive">DMR Passive</a> cu Uw ≤ 0,8 W/m²K depășește chiar și cerințele pentru case pasive.</p>

<h2>Documentele necesare pentru dosarul AFM: ghid pas cu pas</h2>
<p>Dosarul incomplet este principala cauză de respingere a cererilor AFM. Iată lista completă a documentelor necesare pentru Casa Verde Plus 2026:</p>
<ol>
  <li><strong>Cererea tip AFM</strong> — descărcată și completată de pe platforma afm.ro, semnată olograf</li>
  <li><strong>Actul de identitate</strong> — copie conformă cu originalul a BI/CI al solicitantului (și al soțului/soției dacă proprietatea este comună)</li>
  <li><strong>Actul de proprietate</strong> — contract de vânzare-cumpărare, titlu de proprietate sau extras de carte funciară emis cu cel mult 30 de zile înainte de depunere</li>
  <li><strong>Certificatul de urbanism și autorizația de construire</strong> — dacă lucrările de montaj modifică aspectul exterior (obligatoriu pentru fațade față stradă)</li>
  <li><strong>Fișa tehnică a ferestrelor</strong> — document emis de producător, cu valorile Uw, Ug, Uf certificate și numerele declarației de performanță CE</li>
  <li><strong>Oferta comercială</strong> — de la un furnizor autorizat AFM, cu detalii despre produse, cantități, prețuri unitare și valoarea totală a lucrărilor</li>
  <li><strong>Certificatul energetic al clădirii</strong> — emis de un auditor acreditat ANRE, anterior lucrărilor (necessar pentru a demonstra starea inițială și a calcula îmbunătățirea)</li>
  <li><strong>Declarația pe proprie răspundere</strong> că locuința este reședința principală și că nu a mai beneficiat de același program în ultimii 5 ani</li>
  <li><strong>Extrasul de cont bancar</strong> — IBAN-ul pe care se va vira suma aprobată</li>
</ol>
<p>ThermoDMR furnizează gratuit documentele tehnice (fișa de produs cu Uw certificate, declarația de performanță CE, oferta comercială cu toate detaliile necesare) pentru orice client care solicită finanțare AFM. <a href="/ro/contact">Contactează-ne →</a> pentru a obține documentele necesare.</p>

<h2>Greșeli frecvente care duc la respingerea dosarului</h2>
<p>Din experiența acumulată de consultanții ThermoDMR în sprijinirea clienților pentru dosarele AFM, iată greșelile care apar cel mai frecvent:</p>
<ul>
  <li><strong>Dosarul incomplet</strong> — lipsa unui singur document duce la respingere automată; verificați de două ori lista completă</li>
  <li><strong>Certificatul energetic expirat sau lipsă</strong> — CE-ul trebuie să fie emis înainte de lucrări, nu după; mulți aplicanți îl solicită prea târziu</li>
  <li><strong>Furnizor neautorizat AFM</strong> — dacă producătorul/instalatorul nu este înscris în registrul AFM, lucrările nu sunt eligibile; verificați înainte de a semna contractul</li>
  <li><strong>Valori Uw neconforme</strong> — unii furnizori prezintă valori Uw măsurate fără puntea termică a distanțierului sau fără a include rama, ceea ce duce la valori declarate mai mici decât cele reale; solicitați întotdeauna valoarea Uw calculată conform EN ISO 10077</li>
  <li><strong>Actul de proprietate neactualizat</strong> — un extras de carte funciară cu mai mult de 30 de zile este respins automat</li>
  <li><strong>Aplicarea pentru aceeași locuință a doua oară</strong> în mai puțin de 5 ani — chiar dacă se schimbă sesiunea programului, restricția se menține</li>
  <li><strong>Lucrările executate înainte de aprobarea finanțării</strong> — dosarul depus după executarea lucrărilor este automat neeligibil; trebuie să așteptați aprobarea înainte de a începe montajul</li>
</ul>

<h2>Programul Rabla pentru Case: ce aduce nou în 2026</h2>
<p>Programul <strong>Rabla pentru Case</strong>, administrat tot de AFM, a fost extins în 2026 cu noi categorii de beneficiari și lucrări eligibile. Inițial axat pe sistemele de producere a energiei regenerabile (panouri solare, pompe de căldură), programul include acum și componente de eficiență termică a anvelopei clădirii, inclusiv tâmplăria.</p>
<p>Principalele noutăți pentru 2026:</p>
<ul>
  <li>Finanțare de până la <strong>15.000 lei</strong> pentru înlocuirea ferestrelor și ușilor exterioare la case individuale construite înainte de 2000</li>
  <li>Posibilitatea de a combina cu alte componente: panouri fotovoltaice, pompă de căldură, izolație termică</li>
  <li>Criterii simplificate pentru casele din mediul rural (eliminarea cerinței de certificat energetic prealabil pentru gospodăriile din comune)</li>
  <li>Procedura online complet digitalizată — fără deplasări la ghișee</li>
</ul>
<p>Rabla pentru Case este complementar cu Casa Verde Plus — nu se pot cumula pentru aceleași lucrări, dar pot fi folosite pentru categorii diferite de investiții în aceeași renovare.</p>

<h2>Cazuri practice: casă individuală, apartament bloc, vilă nouă</h2>
<h3>Cazul 1: Casă individuală în zona III (Cluj-Napoca)</h3>
<p>Familie cu casă din 1985, 140 m², 10 ferestre vechi cu geam simplu, clasa energetică G. Costul total al ferestrelor noi <a href="/ro/produse/dmr-confort">DMR Confort</a> cu montaj: 28.000 lei.</p>
<ul>
  <li>TVA la 5% (față de 19%): economie directă la facturare = 3.920 lei</li>
  <li>Casa Verde Plus: finanțare nerambursabilă 50% din 28.000 = 14.000 lei</li>
  <li>Cost efectiv suportat de familie: 28.000 - 14.000 = 14.000 lei (minus 3.920 TVA = ~10.080 lei)</li>
  <li>Economie anuală la energie: 1.800–2.200 lei</li>
  <li>Termen de recuperare a investiției proprii: 5–6 ani</li>
</ul>

<h3>Cazul 2: Apartament în bloc, București (Zona II)</h3>
<p>Proprietar apartament 2 camere, 55 m², bloc din 1975. Ferestre vechi cu geam simplu. Costul total pentru 4 ferestre <a href="/ro/produse/dmr-domus">DMR Domus</a> cu montaj: 9.500 lei.</p>
<ul>
  <li>TVA la 5%: economie = 1.330 lei</li>
  <li>Casa Verde Plus: 50% din 9.500 = 4.750 lei nerambursabil</li>
  <li>Cost efectiv: ~3.420 lei din buzunarul proprietarului</li>
  <li>Economie anuală energie: 600–900 lei</li>
  <li>Termen de recuperare: 4–6 ani</li>
</ul>

<h3>Cazul 3: Vilă nouă în construcție, zona IV (Harghita)</h3>
<p>Construcție nouă, 200 m², standard nZEB cerut prin regulament. Ferestre <a href="/ro/produse/dmr-passive">DMR Passive</a> cu geam triplu, total 15 ferestre + 2 uși: 55.000 lei.</p>
<ul>
  <li>TVA la 5%: economie = 7.700 lei</li>
  <li>PNRR C5 renovare profundă (dacă se aplică pentru întregul proiect): până la 85% din pachetul de eficiență energetică</li>
  <li>Deducere impozit venit: 3.000 lei/an timp de 2–3 ani</li>
  <li>Economie anuală față de geam dublu standard: 900–1.200 lei suplimentar</li>
</ul>

<h2>Firme autorizate AFM: cum le găsești și cum le verifici</h2>
<p>O condiție esențială pentru eligibilitatea în Casa Verde Plus și Rabla pentru Case este ca furnizorul și instalatorul să fie <strong>înscriși în Registrul AFM al instalatorilor și furnizorilor autorizați</strong>. Iată cum verifici:</p>
<ul>
  <li>Accesează <strong>afm.ro</strong> → secțiunea specifică programului → Registrul instalatorilor autorizați</li>
  <li>Caută după denumirea firmei sau CUI</li>
  <li>Verifică că autorizarea este activă și neexpirată pentru categoria de lucrări dorită</li>
  <li>Solicită firmei să îți prezinte certificatul de autorizare AFM în copie</li>
</ul>
<p>ThermoDMR este înregistrat și autorizat AFM pentru furnizarea și montajul tâmplăriei PVC în cadrul programelor de eficiență energetică. Toate produsele noastre vin cu declarații de performanță CE și fișe tehnice cu valorile Uw certificate conform EN ISO 10077, documente necesare în orice dosar de finanțare.</p>

<h2>Calculul economiei anuale după schimbarea ferestrelor: exemple numerice</h2>
<p>Înainte de orice decizie de investiție, trebuie să înțelegi cifrele reale. Iată un calcul detaliat pentru o casă tipică românească:</p>
<p><strong>Ipoteze de calcul:</strong></p>
<ul>
  <li>Casă individuală, 120 m² suprafață utilă, zona climatică III (Brașov)</li>
  <li>8 ferestre cu suprafață totală 16 m², 1 ușă exterior 2,5 m²</li>
  <li>Număr de grade-zile de încălzire în zona III: ~3.200 grade-zile/an</li>
  <li>Sistem de încălzire cu gaz natural, randament 85%</li>
  <li>Preț gaz: 0,38 lei/kWh (energia din gaz)</li>
</ul>
<p><strong>Calcul pierderi termice prin ferestre:</strong></p>
<ul>
  <li>Ferestre vechi Uw = 2,8: pierdere = 2,8 × 16 m² × 3.200 × 24h / 1.000 = 3.440 kWh/an → cost 1.546 lei/an</li>
  <li>Ferestre DMR Confort Uw = 1,1: pierdere = 1,1 × 16 × 3.200 × 24 / 1.000 = 1.351 kWh/an → cost 607 lei/an</li>
  <li><strong>Economie anuală prin ferestre: 939 lei/an</strong> (doar prin schimbarea geamurilor)</li>
  <li>Adăugând ușa și reducerea infiltrațiilor de aer (etanșeizare): economie totală estimată 1.200–1.600 lei/an</li>
</ul>

<h2>FAQ: 10 întrebări frecvente despre finanțarea ferestrelor în 2026</h2>
<p><strong>1. Pot combina TVA redusă cu Casa Verde Plus?</strong><br />
Da. TVA redusă se aplică la facturare (reduce suma plătită furnizorului), iar Casa Verde Plus rambursează 50% din suma facturată inclusiv TVA. Sunt mecanisme complementare.</p>
<p><strong>2. Am nevoie de autorizație de construire pentru înlocuirea ferestrelor?</strong><br />
Depinde de situație. Pentru locuințe izolate, înlocuirea ferestrelor cu unele similare ca dimensiune și culoare nu necesită de regulă autorizație. Dacă modificați dimensiunile golurilor sau aspectul fațadei principale, este necesară autorizație.</p>
<p><strong>3. Poate aplica și un chiriaș pentru finanțare?</strong><br />
Nu. Programele AFM sunt destinate exclusiv proprietarilor. Chiriașul poate negocia cu proprietarul să facă lucrările cu finanțare AFM.</p>
<p><strong>4. Ferestrele de la subsol sau pod sunt eligibile?</strong><br />
Depinde de utilizarea spațiului. Dacă subsolul sau podul sunt spații locuite (dormitor, birou), ferestrele sunt eligibile. Dacă sunt spații tehnice nelocuite, de regulă nu.</p>
<p><strong>5. Cât durează aprobarea unui dosar AFM?</strong><br />
Între 30 și 90 de zile lucrătoare de la depunerea dosarului complet, în funcție de sesiune și numărul de aplicanți.</p>
<p><strong>6. Pot face lucrările înainte de aprobarea dosarului?</strong><br />
Nu. Dacă executați lucrările înainte de aprobarea oficială, pierdeți eligibilitatea pentru programul AFM. Trebuie să așteptați aprobarea și semnarea contractului cu AFM.</p>
<p><strong>7. Ce se întâmplă dacă firma falimentează după ce am primit finanțarea?</strong><br />
Responsabilitatea față de AFM rămâne a beneficiarului, nu a firmei. De aceea este important să lucrați cu producători stabili, cu garanție certificată, ca ThermoDMR.</p>
<p><strong>8. Pot aplica pentru un apartament dat în chirie?</strong><br />
Nu pentru Casa Verde Plus, care cere ca locuința să fie reședința principală. Există în schimb programe de eficiență energetică pentru clădiri cu destinație mixtă prin alte scheme.</p>
<p><strong>9. Este obligatoriu să păstrez ferestrele noi un anumit număr de ani?</strong><br />
Da. Contractul AFM prevede de regulă o perioadă de monitorizare de 5 ani în care nu poți revinde locuința fără rambursarea proporțională a subvenției.</p>
<p><strong>10. Certificatul energetic este obligatoriu și după lucrări?</strong><br />
Da, pentru a demonstra îmbunătățirea clasei energetice și a justifica cheltuielile. AFM poate solicita certificatul energetic „după" ca parte din decontare.</p>

<h2>Credite verzi: finanțare bancară avantajoasă pentru renovare energetică</h2>
<p>Dincolo de programele nerambursabile, piața bancară din România oferă în 2026 o gamă din ce în ce mai bogată de <strong>produse de creditare dedicate renovării energetice</strong>, cunoscute sub numele de „green mortgage" sau credite verzi. Acestea au dobânzi preferențiale față de creditele standard de renovare.</p>
<p>Principalele caracteristici ale creditelor verzi disponibile în 2026:</p>
<ul>
  <li><strong>Dobândă redusă cu 0,5–1,5 puncte procentuale</strong> față de creditul standard de renovare, în schimbul documentării îmbunătățirii clasei energetice după lucrări</li>
  <li>Oferite de BCR, BRD, Raiffeisen Bank, ING și alte bănci participante la inițiativele europene de finanțare verde</li>
  <li>Se pot combina cu subvenții AFM — banca finanțează suma totală, iar subvenția AFM reduce restul de plată</li>
  <li>Unele bănci (ex. BRD) nu cer avans dacă lucrările se încadrează în program de reabilitare termică cu certificat energetic</li>
</ul>
<p>Avantajul major: dacă nu ai toți banii pentru autoechipare și aștepți decontarea AFM, creditul verde acoperă integral lucrările, iar banca recuperează suma de la AFM direct. Tu plătești doar rata lunară redusă.</p>

<h2>Calculul economiei anuale: exemple pentru diferite tipuri de locuințe</h2>
<p>Cât economisești concret pe factură după schimbarea ferestrelor? Iată calcule realiste pentru situații tipice din România, la prețurile energiei din 2026 (gaz natural: ~0,55 lei/kWh, energie electrică: ~1,05 lei/kWh):</p>
<table>
  <thead>
    <tr><th>Tip locuință</th><th>Suprafață</th><th>Ferestre (suprafață)</th><th>Uw vechi</th><th>Uw nou (ThermoDMR)</th><th>Economie anuală estimată</th></tr>
  </thead>
  <tbody>
    <tr><td>Apartament 2 camere, Buc. (zona II)</td><td>55 m²</td><td>~5 m²</td><td>2,8</td><td>1,1</td><td>450 – 650 lei</td></tr>
    <tr><td>Apartament 3 camere, Cluj (zona III)</td><td>75 m²</td><td>~7 m²</td><td>2,8</td><td>1,1</td><td>700 – 950 lei</td></tr>
    <tr><td>Casă individuală, Brașov (zona III)</td><td>120 m²</td><td>~12 m²</td><td>2,8</td><td>1,1</td><td>1.200 – 1.700 lei</td></tr>
    <tr><td>Casă individuală, Suceava (zona IV)</td><td>140 m²</td><td>~14 m²</td><td>2,8</td><td>1,1</td><td>1.700 – 2.400 lei</td></tr>
    <tr><td>Vilă, zona IV, geam triplu</td><td>200 m²</td><td>~20 m²</td><td>2,8</td><td>0,8</td><td>2.800 – 3.500 lei</td></tr>
  </tbody>
</table>
<p>Notă: calculele presupun sisteme de încălzire cu gaz, gradul de zile specific zonei climatice și prețurile medii la energie din T1 2026. Economiile reale pot varia în funcție de obiceiurile de locuit, sistemul de ventilație și calitatea montajului.</p>

<h2>Cum soliciți o ofertă ThermoDMR cu documente pentru finanțare</h2>
<p>ThermoDMR a simplificat la maximum procesul de obținere a documentelor necesare pentru dosarul de finanțare. Suntem obișnuiți să lucrăm cu clienți care accesează Casa Verde Plus, Rabla pentru Case sau PNRR și știm exact ce documente tehnice sunt necesare.</p>
<p>Iată ce primești de la ThermoDMR împreună cu oferta comercială:</p>
<ul>
  <li>Fișa tehnică detaliată a ferestrelor cu valori Uw, Ug, Uf calculate conform EN ISO 10077</li>
  <li>Declarația de performanță CE pentru fiecare tip de produs</li>
  <li>Certificatele de testare a profilelor (RAL, IFT Rosenheim sau echivalent)</li>
  <li>Oferta comercială în format acceptat de AFM, cu detalii de produs, cantități și prețuri unitare</li>
  <li>Consultanță pentru completarea corectă a cererii tip AFM</li>
</ul>
<p>Consultanța de ofertare este <strong>gratuită și fără obligații</strong>. Poți solicita o vizită tehnică la domiciliu sau trimite dimensiunile ferestrelor online.</p>
<p style="text-align:center; margin-top:2rem;">
  <a href="/ro/contact" style="background:#1a56db;color:#fff;padding:14px 32px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:1.1rem;">Solicită ofertă cu documente AFM — Gratuit →</a>
</p>
<p>Echipa ThermoDMR îți răspunde în maximum 24 de ore cu o ofertă personalizată, inclusiv estimarea economiei anuale și calculul perioadei de recuperare a investiției pentru situația ta specifică. Împreună construim dosarul complet pentru finanțare și te ghidăm în fiecare pas al procesului.</p>
<p>Nu lăsa birocrația să te oprească. Cu sprijinul potrivit, obținerea finanțării AFM este un proces simplu și previzibil. Mii de proprietari români au parcurs deja acest drum — și tu poți.</p>

<h2>Tendințe 2026: cum evoluează piața tâmplăriei PVC în România</h2>
<p>Piața tâmplăriei PVC din România a crescut constant în ultimii ani, influențată de: creșterea costurilor energiei, cerințele mai stricte din normativele de construcție și disponibilitatea programelor de finanțare. Câteva tendințe cheie pentru 2026:</p>
<ul>
  <li><strong>Crește cererea pentru ferestre cu Uw sub 1,2</strong> — nu din obligație, ci din conștientizarea beneficiilor economice. Cumpărătorii informați cer acum valori Uw ca prim criteriu, înaintea prețului.</li>
  <li><strong>Culorile și finisajele devin factor de decizie major</strong> — gri antracit RAL 7016, crem și bej câștigă față de albul clasic. ThermoDMR oferă toate culorile RAL prin laminare folie, fără costuri structurale suplimentare.</li>
  <li><strong>Sistemele integrate cresc în popularitate</strong> — pachetul ferestre + casete termoizolante + rulouri coibentate este tot mai solicitat față de fereastra singulară. Beneficiul termic complet se obține doar cu sistemul integrat.</li>
  <li><strong>Digitalizarea procesului de achiziție</strong> — comanda online cu configurator de dimensiuni, cerere de ofertă instantă și tracking al producției și livrării sunt acum standarde, nu excepții. ThermoDMR oferă toate acestea prin <a href="/ro/contact">formularul online</a>.</li>
</ul>
<p>Investind în ferestre de calitate în 2026, nu cumperi doar un produs — intri într-un sistem de valori: confort, eficiență, durabilitate și valoare patrimonială pe termen lung.</p>

<h2>Ghid pas cu pas: de la decizie la montaj final</h2>
<p>Mulți proprietari știu că vor ferestre noi, dar nu știu de unde să înceapă. Iată un traseu concret, testat de clienții ThermoDMR:</p>
<ol>
  <li><strong>Evaluare inițială (Săptămâna 1)</strong> — Fotografiați toate ferestrele actuale, măsurați dimensiunile și notați problemele: condens, curenți, zgomot. Completați formularul online ThermoDMR cu aceste informații.</li>
  <li><strong>Consultanță tehnică și ofertă (Săptămâna 1-2)</strong> — Un consultant vă contactează în 24 de ore. Discutați nevoile, bugetul și eventuala finanțare. Primiți o ofertă detaliată cu specificații tehnice și documente pentru AFM.</li>
  <li><strong>Depunere dosar finanțare (Săptămâna 2-4)</strong> — Dacă optați pentru Casa Verde Plus sau alt program, depuneți dosarul la AFM sau bancă. ThermoDMR vă furnizează toate documentele tehnice necesare.</li>
  <li><strong>Confirmare comandă și producție (după aprobare finanțare)</strong> — Odată confirmat bugetul, se lansează producția. Termenul standard este 3-5 săptămâni pentru gama standard, 6-8 săptămâni pentru comenzi cu profile speciale sau culori RAL.</li>
  <li><strong>Montaj profesional (1-3 zile)</strong> — Echipa de montaj ThermoDMR sau instalatori autorizați efectuează lucrările. Se aplică profilul de neopren, garniturile de etanșare și se reglează feroneria.</li>
  <li><strong>Recepție și documentare (după montaj)</strong> — Primiți procesul verbal de recepție, certificatele de garanție și, dacă e necesar, documentele pentru decontul AFM.</li>
</ol>
<p>Procesul complet durează în medie 6-10 săptămâni de la prima consultanță la montajul final — mai rapid dacă nu accesați finanțare. Planificând din timp, puteți termina înainte de sezonul rece și beneficiați de economiile din prima iarnă.</p>

<h2>De ce contează producătorul și nu doar prețul</h2>
<p>Pe piața românească există zeci de furnizori de tâmplărie PVC, cu prețuri foarte variate. Ce diferențiază un producător serios de un intermediar cu costuri mici?</p>
<ul>
  <li><strong>Profilul utilizat</strong> — producătorii serioși specifică exact marca și modelul profilului (ex. Rehau, VEKA, Aluplast). Intermediarii „anonimi" folosesc profil de origine neclară, fără certificări RAL sau IFT.</li>
  <li><strong>Garanția reală</strong> — 15 ani pe profil și 5 ani pe geam și feronerie sunt standardul corect. Ofertele cu „garanție 1 an" sau fără garanție explicită sunt un semnal de alarmă.</li>
  <li><strong>Documentele tehnice</strong> — un producător profesionist emite Declarație de Performanță CE și fișe cu valorile Uw certificate, necesare pentru finanțare și certificare energetică.</li>
  <li><strong>Serviciu post-vânzare</strong> — reglajele feroneriei după 6-12 luni sunt normale în utilizare. Un producător cu service propriu rezolvă rapid; un intermediar dispare după livrare.</li>
  <li><strong>Referințe verificabile</strong> — solicitați fotografii și adrese de lucrări similare finalizate, eventual contacte de clienți mulțumiți. ThermoDMR pune la dispoziție un portofoliu complet de proiecte realizate.</li>
</ul>
<p>Diferența de preț între un producător serios și unul „ieftin" este de obicei 15-25%. Pe o investiție de 5.000-10.000 lei, aceasta înseamnă 750-2.500 lei în plus — sumă amortizată în 1-2 ani din economii energetice și evitarea costurilor de remediere.</p>
    `.trim(),
  },

  {
    slug: "clasa-energetica-casa-2026-ferestre-pvc",
    lang: "ro",
    title: "Clasa Energetică A cu Ferestre PVC: Ghid 2026 — ThermoDMR",
    description: "Cum îmbunătățești clasa energetică a casei cu ferestre PVC în 2026. Valori Uw, transmitanță termică, pierderile de căldură: tot ce trebuie să știi.",
    date: "2026-04-10",
    category: "Economie Energie",
    readingTime: 18,
    heroImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    content: `
<h2>De ce clasa energetică contează mai mult ca niciodată în 2026</h2>
<p>Dacă ai crescut în România anilor '80 sau '90, probabil ai văzut case în care iarna se puneau pături la ferestre și se dormea cu șoșoni — nu din comoditate, ci din necesitate. Astăzi, în 2026, acea realitate nu mai este acceptabilă nici tehnic, nici economic, nici legal. Și totuși, milioane de locuințe din România continuă să funcționeze cu randamente energetice din altă epocă.</p>
<p>Motivul pentru care clasa energetică a ajuns în centrul atenției în 2026 este convergența mai multor forțe simultan. Pe de o parte, <strong>prețurile energiei</strong> au crescut dramatic față de nivelurile pre-2020 și rămân volatile. O casă cu clasa energetică G consumă de 5–8 ori mai multă energie pentru a menține aceeași temperatură interioară față de o casă cu clasa A. La prețurile actuale, această diferență poate însemna 4.000–8.000 lei pe an în plus la facturi.</p>
<p>Pe de altă parte, <strong>legislația europeană și națională</strong> trasează acum un calendar obligatoriu de renovare. Directiva EPBD revizuită în 2024 stabilește că statele membre trebuie să se asigure că toate clădirile rezidențiale ating cel puțin clasa F până în 2030 și clasa E până în 2033. România transpune aceste obligații în legislație națională, cu implicații directe pentru proprietari.</p>
<p>Nu în ultimul rând, <strong>piața imobiliară</strong> a integrat clasa energetică ca factor de preț. Cumpărătorii și băncile iau în considerare eficiența energetică a locuinței la evaluare și finanțare. O casă cu clasa G vândută la același preț cu una cu clasa C din același cartier devine din ce în ce mai rar — și această tendință se accentuează.</p>
<p>Ferestrele PVC performante sunt una dintre cele mai eficiente intervenții pentru îmbunătățirea clasei energetice — au raportul investiție/beneficiu favorabil, nu necesită structuri complexe și produc efecte imediate și măsurabile. Acest ghid îți explică exact cum funcționează mecanismul, ce cifre poți anticipa și care sunt pașii concreți.</p>

<h2>Certificatul energetic în România: cum se obține și ce conține</h2>
<p>Certificatul energetic (CE) este documentul oficial care atestă performanța energetică a unei clădiri sau a unui apartament. Este obligatoriu la vânzare, închiriere și pentru accesarea majorității programelor de finanțare pentru renovare.</p>

<h3>Cine eliberează certificatul energetic</h3>
<p>Certificatele energetice sunt emise exclusiv de <strong>auditori energetici acreditați ANRE</strong> (Autoritatea Națională de Reglementare în domeniul Energiei). Lista auditorilor acreditați este publică pe site-ul ANRE. Un auditor verifică fizic imobilul, colectează date despre anvelopa clădirii (pereți, acoperiș, ferestre, fundație), sistemele de încălzire, răcire și ventilare, și calculează indicatorul de consum de energie primară.</p>

<h3>Procesul de obținere pas cu pas</h3>
<ol>
  <li><strong>Selectează un auditor acreditat ANRE</strong> din zona ta — prețurile variază, dar în general o vizită și un certificat costă 300–800 lei pentru un apartament și 500–1.500 lei pentru o casă individuală</li>
  <li><strong>Auditorul efectuează inspecția</strong> imobilului — măsoară ferestrele, verifică tipul de izolație, identifică sistemele de instalații</li>
  <li><strong>Se elaborează calculul energetic</strong> conform metodologiei MC 001/2022 (metodologia națională de calcul al performanței energetice a clădirilor)</li>
  <li><strong>Se emite certificatul energetic</strong> în format standardizat, cu clasa energetică, consumul calculat și recomandări de renovare</li>
  <li><strong>Certificatul se înregistrează</strong> în Registrul Național al Certificatelor Energetice (RNCE) și primește un cod unic de verificare</li>
</ol>

<h3>Ce informații conține un certificat energetic</h3>
<p>Dincolo de clasa energetică afișată, un CE conține informații foarte valoroase pentru orice proprietar interesat de renovare:</p>
<ul>
  <li>Consumul anual de energie primară calculat (kWh/m²/an)</li>
  <li>Defalcarea pierderilor pe elemente constructive (pereți, ferestre, acoperiș, pardoseală)</li>
  <li>Pierderile prin ventilare și infiltrații de aer</li>
  <li>Recomandări de renovare cu estimări de economii pentru fiecare intervenție</li>
  <li>Clasa energetică estimată după renovare completă</li>
</ul>
<p>Această defalcare este extrem de utilă pentru a prioritiza investițiile: în multe cazuri, ferestrele reprezintă 25–35% din pierderile totale, ceea ce le face intervenția cu cel mai mare impact pe unitate de cost.</p>

<h2>Clasele energetice A+ până la G: ce înseamnă cifrele</h2>
<p>România folosește o scală de clasificare energetică cu 8 trepte, de la A+ (maximum eficientă) la G (minimum eficientă), bazată pe consumul anual de energie primară exprimat în kWh/m²/an.</p>
<table>
  <thead>
    <tr>
      <th>Clasa Energetică</th>
      <th>Consum (kWh/m²/an)</th>
      <th>Tip clădire tipică</th>
      <th>Cost anual estimat (100m²)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>A+ (nZEB)</td>
      <td>≤ 11,4</td>
      <td>Casă pasivă, standard Passivhaus</td>
      <td>400–700 lei</td>
    </tr>
    <tr>
      <td>A</td>
      <td>11,5 – 33</td>
      <td>Construcție nouă după 2020, renovare profundă</td>
      <td>700–1.400 lei</td>
    </tr>
    <tr>
      <td>B</td>
      <td>34 – 66</td>
      <td>Construcție după 2010 sau renovare bună</td>
      <td>1.400–2.800 lei</td>
    </tr>
    <tr>
      <td>C</td>
      <td>67 – 99</td>
      <td>Construcție după 2000 sau renovare parțială</td>
      <td>2.800–4.200 lei</td>
    </tr>
    <tr>
      <td>D</td>
      <td>100 – 150</td>
      <td>Construcție din anii '90 nereabilitată</td>
      <td>4.200–6.300 lei</td>
    </tr>
    <tr>
      <td>E</td>
      <td>151 – 200</td>
      <td>Construcție din anii '80, fără renovare</td>
      <td>6.300–8.500 lei</td>
    </tr>
    <tr>
      <td>F</td>
      <td>201 – 300</td>
      <td>Construcție veche cu izolație precară</td>
      <td>8.500–12.700 lei</td>
    </tr>
    <tr>
      <td>G</td>
      <td>≥ 301</td>
      <td>Construcție veche fără nicio renovare</td>
      <td>12.700+ lei</td>
    </tr>
  </tbody>
</table>
<p>Cifrele de cost sunt estimative, bazate pe prețuri medii ale energiei din România în 2026 și un mix de gaz/electric. Diferența dintre clasa G și clasa C poate reprezenta 8.000–12.000 lei pe an la facturi pentru o casă de 100 m².</p>

<h2>Ferestrele în bilanțul energetic: date reale despre pierderile de căldură</h2>
<p>Înțelegerea ponderii ferestrelor în bilanțul energetic al casei este esențială pentru a lua decizia corectă de renovare. Datele din studiile INCERC (Institutul Național de Cercetare-Dezvoltare în Construcții) și din auditurile energetice realizate în România arată o imagine clară.</p>
<p>Într-o casă tipică românească construită înainte de 1990, distribuția pierderilor de căldură arată aproximativ astfel:</p>
<ul>
  <li><strong>Pereți exteriori</strong>: 30–40% din pierderi totale (în funcție de grosimea și tipul de zidărie)</li>
  <li><strong>Ferestre și uși</strong>: 25–35% din pierderi (proporțional cu suprafața vitrată)</li>
  <li><strong>Acoperiș/planșeu de pod</strong>: 15–20% din pierderi</li>
  <li><strong>Pardoseală/subsol</strong>: 10–15% din pierderi</li>
  <li><strong>Infiltrații de aer prin neetanșeități</strong>: 10–15% din pierderi</li>
</ul>
<p>Observație importantă: <strong>ferestrele vechi cu geam simplu sau dublu fără tratament termic</strong> au o pondere de pierdere disproporționat de mare față de suprafața pe care o ocupă. O fereastră cu geam simplu are un flux de căldură de 5–8 ori mai mare decât un perete bine izolat de aceeași suprafață.</p>
<p>Aceasta explică de ce înlocuirea ferestrelor, deși nu este „intervenția maximă" ca și cost total, este adesea prima recomandare a auditorilor energetici: impactul pe unitate de cost este mai mare decât al izolației pereților.</p>

<h2>Valoarea Uw: parametrul esențial explicat simplu</h2>
<p>Dacă există un singur număr pe care trebuie să îl înțelegi când cumperi ferestre, acela este <strong>Uw</strong> — coeficientul de transmitanță termică a ferestrei complete (whole window), incluzând atât vitrajul cât și cadrul (profilul PVC).</p>
<p>Uw se măsoară în <strong>W/m²K</strong> (wați pe metru pătrat per grad Kelvin de diferență de temperatură). Formula practică de înțelegere: o fereastră cu Uw = 1,0 W/m²K pierde 1 watt de căldură pentru fiecare metru pătrat de suprafață pentru fiecare grad de diferență dintre interior și exterior.</p>

<h3>Cum se compun Uw din elementele ferestrei</h3>
<p>Valoarea finală Uw a unei ferestre este influențată de trei componente:</p>
<ul>
  <li><strong>Ug</strong> — transmitanța vitrajului (geamul în sine): depinde de numărul de foi, gazul din intercapedine și tratamentele suprafețelor</li>
  <li><strong>Uf</strong> — transmitanța cadrului (profilul PVC): depinde de numărul de camere și geometria profilului</li>
  <li><strong>psi (conductanța lineică a distanțierului)</strong> — este adesea neglijată dar poate influența Uw cu 0,05–0,15 W/m²K</li>
</ul>

<h3>Tabel comparativ: Uw pe tipologii de ferestre</h3>
<table>
  <thead>
    <tr>
      <th>Tip fereastră</th>
      <th>Ug (W/m²K)</th>
      <th>Uf (W/m²K)</th>
      <th>Uw tipic (W/m²K)</th>
      <th>Clasa energetică orientativă</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Geam simplu vechi (1 foaie)</td>
      <td>5,5 – 6,0</td>
      <td>3,0 – 4,0</td>
      <td>4,5 – 5,5</td>
      <td>G</td>
    </tr>
    <tr>
      <td>Geam dublu fără tratament (aer)</td>
      <td>2,7 – 3,0</td>
      <td>2,5 – 3,0</td>
      <td>2,5 – 3,0</td>
      <td>E–F</td>
    </tr>
    <tr>
      <td>Geam dublu Low-E + argon, profil 3 camere</td>
      <td>1,1 – 1,3</td>
      <td>2,0 – 2,5</td>
      <td>1,4 – 1,7</td>
      <td>C–D</td>
    </tr>
    <tr>
      <td>Geam dublu Low-E + argon, profil 5 camere (DMR Confort)</td>
      <td>1,0 – 1,1</td>
      <td>1,3 – 1,5</td>
      <td>1,0 – 1,2</td>
      <td>A–B</td>
    </tr>
    <tr>
      <td>Geam triplu Low-E + argon, profil 6 camere (DMR Passive)</td>
      <td>0,5 – 0,7</td>
      <td>1,0 – 1,2</td>
      <td>0,7 – 0,9</td>
      <td>A+</td>
    </tr>
  </tbody>
</table>

<h2>Geamul, gazul și profilul: cei trei factori care determină performanța</h2>
<p>Performanța termică a unei ferestre PVC nu depinde de un singur element, ci de interacțiunea a trei factori principali. Înțelegând fiecare, poți lua o decizie de cumpărare bazată pe criterii tehnice reale, nu pe marketing.</p>

<h3>Factorul 1: Tipul de vitraj și tratamentele suprafeței</h3>
<p>Vitrajul modern incorporează obligatoriu o <strong>acoperire Low-E</strong> (low-emissivity — emisivitate redusă) pe una sau mai multe suprafețe ale foilor de sticlă. Această acoperire metalică invizibilă reflectă radiația termică infraroșie înapoi în interior, reducând pierderile radiative cu 30–50% față de geamul simplu.</p>
<p>Există mai multe generații de acoperiri Low-E:</p>
<ul>
  <li><strong>Low-E hard coat</strong> (pirolitic): mai durabil, emisivitate 0,15–0,18</li>
  <li><strong>Low-E soft coat</strong> (magnetronic): mai performant, emisivitate 0,02–0,04, montat în intercapedine protejată</li>
  <li><strong>Low-E selectiv solar</strong>: optimizează bilanțul între blocarea energiei solare de vară și câștigul solar de iarnă</li>
</ul>
<p>Toate produsele ThermoDMR utilizează geam cu acoperire Low-E soft coat pentru valorile Ug cele mai bune din categoria sa.</p>

<h3>Factorul 2: Gazul din intercapedine</h3>
<p>Spațiul dintre foile de sticlă este umplut cu un gaz inert pentru a reduce conductivitatea termică față de aer:</p>
<ul>
  <li><strong>Aer uscat</strong>: conductivitate 0,024 W/mK — cel mai puțin performant</li>
  <li><strong>Argon</strong>: conductivitate 0,016 W/mK — standard industrie, raport calitate/preț excelent, reducere Ug cu ~10–15% față de aer</li>
  <li><strong>Kripton</strong>: conductivitate 0,0088 W/mK — performanță superioară, cost mai mare; folosit în ferestre de casă pasivă</li>
</ul>

<h3>Factorul 3: Profilul PVC și numărul de camere</h3>
<p>Profilul PVC (cadrul ferestrei) contribuie cu 20–30% la valoarea finală Uw. Un profil cu 5 camere (ThermoDMR standard) are un Uf de 1,3–1,5 W/m²K, față de 2,5–3,0 W/m²K al unui profil cu 3 camere. Diferența se traduce direct în Uw-ul final al ferestrei întregi.</p>

<h2>De la clasa F la clasa B: traseul realist pentru o casă din anii '80 în România</h2>
<p>Cel mai frecvent scenariu pe care îl întâlnim la ThermoDMR este proprietarul unei case individuale construite în intervalul 1970–1989, cu ferestre originale cu geam simplu și fără nicio izolație adăugată ulterior. Aceste case se află în clasa energetică E, F sau G. Cum arată traseul realist spre clasa B?</p>

<h3>Situația de start tipică</h3>
<ul>
  <li>Casă individuală, 120 m², zidărie BCA sau cărămidă 30 cm, fără izolație exterioară</li>
  <li>8 ferestre cu geam simplu sau dublu fără tratament (Uw 2,8–4,5)</li>
  <li>Acoperiș din tablă fără izolație în pod</li>
  <li>Tâmplărie din lemn sau aluminiu vechi, neetanșă</li>
  <li>Sistem de încălzire centrală cu centrală pe gaz</li>
  <li>Consum anual estimat: 180–250 kWh/m²/an — Clasa E–F</li>
</ul>

<h3>Pachetul minim de renovare: Clasa F spre C-D</h3>
<p>Investiție: 30.000–50.000 lei</p>
<ul>
  <li>Înlocuire ferestre cu <a href="/ro/produse/dmr-confort">DMR Confort</a> (Uw 1,1): reducere consum cu 25–30%</li>
  <li>Izolație pod 15 cm vată minerală: reducere consum cu 10–15%</li>
  <li>Etanșare uși și tâmplărie perimetrală: reducere cu 5–8%</li>
  <li>Rezultat estimat: 130–160 kWh/m²/an — Clasa C–D</li>
</ul>

<h3>Pachetul mediu de renovare: spre Clasa B</h3>
<p>Investiție suplimentară: 40.000–70.000 lei față de pachetul minim</p>
<ul>
  <li>Izolație fațade 10 cm EPS sau vată: reducere consum suplimentar cu 20–25%</li>
  <li>Casete termoizolante la glafuri ferestre (<a href="/ro/produse/cassonetti">cassonetti ThermoDMR</a>): eliminare punți termice</li>
  <li>Modernizare sistem încălzire (centrală condensare, termostate pe zone): reducere cu 15%</li>
  <li>Rezultat estimat: 60–100 kWh/m²/an — Clasa B</li>
</ul>

<h3>Pachetul complet: spre Clasa A</h3>
<p>Investiție totală: 120.000–180.000 lei (eligibil PNRR C5)</p>
<ul>
  <li>Toate intervențiile de mai sus plus ferestre <a href="/ro/produse/dmr-passive">DMR Passive</a> (Uw 0,8)</li>
  <li>Pompă de căldură aer-apă plus panouri fotovoltaice</li>
  <li>Sistem de ventilație mecanică cu recuperare de căldură</li>
  <li>Rezultat estimat: 25–50 kWh/m²/an — Clasa A</li>
</ul>

<h2>Economie la factură pe zone climatice: calcule cu exemple concrete</h2>
<p>Economiile reale variază semnificativ în funcție de zona climatică. Iată calculele concrete pentru un apartament de 65 m² cu 5 ferestre (suprafață totală ~10 m²):</p>
<table>
  <thead>
    <tr>
      <th>Zona Climatică</th>
      <th>Orașe reprezentative</th>
      <th>Grade-zile/an</th>
      <th>Economie anuală (ferestre noi Uw 1,1 vs vechi Uw 2,8)</th>
      <th>Lei economisiți/an</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Zona I</td>
      <td>Constanța, Galați</td>
      <td>2.200</td>
      <td>~940 kWh/an</td>
      <td>580–750 lei</td>
    </tr>
    <tr>
      <td>Zona II</td>
      <td>București, Timișoara, Craiova</td>
      <td>2.800</td>
      <td>~1.190 kWh/an</td>
      <td>740–960 lei</td>
    </tr>
    <tr>
      <td>Zona III</td>
      <td>Cluj, Brașov, Sibiu, Bacău</td>
      <td>3.300</td>
      <td>~1.400 kWh/an</td>
      <td>870–1.120 lei</td>
    </tr>
    <tr>
      <td>Zona IV</td>
      <td>Suceava, Miercurea Ciuc, zone montane</td>
      <td>4.100</td>
      <td>~1.750 kWh/an</td>
      <td>1.080–1.400 lei</td>
    </tr>
  </tbody>
</table>
<p>Notă: calculele sunt bazate pe prețul mediu al gazului natural de 0,38 lei/kWh energie și eficiența instalației de 85%. Pentru sisteme electrice (rezistivo sau pompă de căldură), economia în lei poate varia.</p>

<h2>Punți termice la ferestre: problema ascunsă care anulează economiile</h2>
<p>Una dintre cele mai frecvente greșeli în renovarea termică este înlocuirea ferestrelor fără rezolvarea <strong>punților termice</strong> asociate. O punte termică este o zonă în care conductivitatea termică este semnificativ mai mare decât în zonele adiacente — practic un scurtcircuit termic care permite căldurii să scape.</p>
<p>La ferestre, punțile termice principale sunt:</p>
<ul>
  <li><strong>Puntea termică a glafului superior</strong> (buiandrugul) — zona din beton sau cărămidă de deasupra ferestrei neizolată, care creează un canal de pierdere termică</li>
  <li><strong>Puntea termică a căsuței de rulou</strong> — cutia ruloului neizolante termic devine sursa principală de pierdere termică după montajul ferestrei noi</li>
  <li><strong>Puntea termică a ancadramentului</strong> — joncțiunea dintre profilul PVC și glafurile din beton, dacă nu este umplută cu spumă poliuretanică și acoperită cu benzi termoizolante</li>
  <li><strong>Distanțierul marginii geamului</strong> — distanțierul clasic din aluminiu creează o punte termică la marginea geamului; distanțierul warm edge din material compozit reduce această pierdere cu 15–20%</li>
</ul>

<h3>Cum elimini punțile termice cu soluțiile ThermoDMR</h3>
<p>ThermoDMR oferă un sistem integrat pentru eliminarea punților termice:</p>
<ul>
  <li><a href="/ro/produse/cassonetti">Casete termoizolante ThermoDMR</a> — înlocuiesc cutiile de rulou neizolate cu sisteme din EPS expandat, reducând pierderile prin glaf superior cu 70–80%</li>
  <li><a href="/ro/produse/tapparelle">Rulouri termoizolante</a> cu lamele alveolare umplute cu spumă poliuretanică — adaugă un strat suplimentar pe timp de noapte</li>
  <li>Montaj în sistem cu 3 straturi — benzi de etanșare la interior (vapori), compresibil la mijloc (spumă) și bandă difuzie la exterior; recomandat de norma RAL GZ 695</li>
  <li>Distanțier warm edge integrat în toate geamurile ThermoDMR</li>
</ul>
<p>Combinând fereastra cu Uw 1,1 cu caseta termoizolantă și rulourile termoizolante, performanța efectivă a ansamblului poate atinge echivalentul unui Uw global sub 1,0 W/m²K — fără costul geamului triplu.</p>

<h2>Directiva europeană EPBD 2024: ce obligații aduce pentru proprietarii români</h2>
<p>Directiva privind Performanța Energetică a Clădirilor (EPBD), revizuită și adoptată în 2024, este cel mai ambițios cadru legislativ european pentru renovarea fondului imobiliar. Iată ce trebuie să știe proprietarii români:</p>
<ul>
  <li><strong>Termenul 2030</strong>: toate clădirile rezidențiale trebuie să atingă cel puțin clasa F. Clădirile de clasă G vor fi primele vizate de obligații de renovare.</li>
  <li><strong>Termenul 2033</strong>: clasa E devine standardul minim pentru locuințe. Imobilele care nu ating acest standard pot fi restricționate de la închiriere sau vânzare.</li>
  <li><strong>Termenul 2040</strong>: clasa D devine obiectivul pentru întregul parc rezidențial.</li>
  <li><strong>Finanțare obligatorie din fonduri publice</strong>: statele membre sunt obligate să aloce fonduri pentru sprijinirea proprietarilor cu venituri mici să renoveze.</li>
</ul>
<p>România transpune EPBD prin legislație națională (în curs de elaborare în 2026). Proprietarii care acționează acum, înainte ca obligațiile să fie impuse prin lege, beneficiază de mai multă flexibilitate și acces la programe de finanțare mai generoase.</p>

<h2>Valoarea imobiliară și clasa energetică: datele pieței românești 2026</h2>
<p>Corelația dintre clasa energetică și prețul de piață al imobilelor a devenit vizibilă și în România, chiar dacă mai lentă față de piețele din Europa de Vest.</p>
<p>Datele din piața imobiliară românească (surse: Imobiliare.ro, Storia.ro, rapoarte Colliers, 2025–2026) indică:</p>
<ul>
  <li>Un apartament cu certificat energetic <strong>clasa A sau B</strong> se vinde cu <strong>8–15% mai mult</strong> decât unul similar cu clasa E–F în același cartier</li>
  <li>Timpul mediu de vânzare pentru imobilele cu certificat energetic bun este cu 20–30% mai scurt</li>
  <li>Băncile aplică criterii de evaluare a garanției care iau în considerare clasa energetică — un imobil cu clasa G poate fi evaluat cu 5–10% sub prețul de piață aparent</li>
  <li>Chiriașii, în special tinerii profesioniști din marile orașe, cer tot mai frecvent informații despre eficiența energetică înainte de a semna contractul</li>
</ul>
<p>Pe un apartament de 3 camere evaluat la 90.000 €, diferența de 10% reprezintă 9.000 €. La scara unui investitor cu portofoliu, impactul poate fi semnificativ.</p>

<h2>Green Mortgage: credite ipotecare avantajoase pentru case eficiente energetic</h2>
<p>O noutate cu impact crescut în 2026 este <strong>produsul green mortgage</strong> (credit ipotecar verde), oferit de mai multe bănci din România în cadrul inițiativelor europene de finanțare durabilă. Principiu simplu: dacă imobilul are clasa energetică A sau B, beneficiezi de o rată a dobânzii mai mică față de un credit ipotecar standard.</p>
<p>Avantajele concrete ale green mortgage în România (2026):</p>
<ul>
  <li>Reducere de dobândă de 0,3–0,8 puncte procentuale față de creditul standard</li>
  <li>Condiții mai flexibile de constituire a avansului (uneori avans minim 10% față de 15% standard)</li>
  <li>Posibilitatea de a include costul renovării în creditul ipotecar</li>
  <li>Produse disponibile la: Banca Transilvania, BCR, Raiffeisen Bank, ING, CEC Bank</li>
</ul>
<p>Dacă plănuiești să cumperi o locuință și să o renovezi, combinarea unui green mortgage cu programele AFM poate reduce semnificativ costul total al proiectului.</p>

<h2>Protocolul optim de renovare: în ce ordine să faci lucrările</h2>
<p>Ordinea în care efectuezi lucrările de renovare contează — nu doar economic, ci și tehnic. O ordine greșită poate duce la reluarea unor lucrări sau la pierderea unor oportunități de optimizare.</p>
<p>Ordinea recomandată de specialiști pentru o renovare completă:</p>
<ol>
  <li><strong>Audit energetic</strong> — stabilește starea actuală și prioritizează intervențiile</li>
  <li><strong>Acoperiș și izolație pod</strong> — prima intervenție, lucrările ulterioare nu afectează acoperișul</li>
  <li><strong>Ferestre și uși exterioare</strong> — a doua prioritate; se face înainte de izolația pereților, deoarece dimensionarea golurilor și ancadramentul sunt definite de ferestre</li>
  <li><strong>Casete și rulouri termoizolante</strong> — simultan cu ferestrele sau imediat după</li>
  <li><strong>Izolația pereților exteriori</strong> — după ferestre, pentru a putea înglobă ancadramentele și a elimina punțile termice perimetrale</li>
  <li><strong>Modernizarea sistemului de încălzire</strong> — după reducerea pierderilor anvelopei; în felul acesta poți dimensiona mai mic noua centrală</li>
  <li><strong>Ventilație mecanică cu recuperare de căldură</strong> — după ce clădirea devine mai etanșă</li>
  <li><strong>Energie regenerabilă</strong> (panouri fotovoltaice, pompă de căldură) — ultima etapă, când consumul a fost redus la minim</li>
</ol>
<p>A nu urma această ordine înseamnă riscul de a supradimensiona sau subdimensiona echipamentele și de a plăti mai mult pe termen lung.</p>

<h2>Rolul ferestrelor vs izolația pereților: ce prioritizezi cu buget limitat</h2>
<p>Una dintre cele mai frecvente întrebări pe care le primim la ThermoDMR este: dacă am buget limitat, ce fac mai întâi — ferestre sau izolație pereți?</p>
<p>Răspunsul depinde de situația specifică, dar iată regulile generale:</p>
<ul>
  <li><strong>Dacă ferestrele sunt vechi cu geam simplu sau dublu fără argon</strong>: prioritate maximă pentru ferestre. Raportul cost/beneficiu al înlocuirii este mai bun decât al izolației pereților, mai ales că ferestrele vechi au și probleme de etanșeitate.</li>
  <li><strong>Dacă ferestrele sunt deja termopan de generație anterioară (Uw 1,6–2,0)</strong>: izolația pereților poate aduce un beneficiu mai mare per leu investit față de upgrade-ul ferestrelor.</li>
  <li><strong>Dacă bugetul total este sub 15.000 lei</strong>: ferestre plus rulouri termoizolante plus casete la glafuri; cel mai eficient pachet de bază.</li>
  <li><strong>Dacă planifici vânzarea locuinței în 2–3 ani</strong>: ferestrele sunt vizibile și valorizate direct de cumpărători.</li>
</ul>
<p>Consultanța noastră gratuită include analiza situației specifice și recomandarea unui protocol de renovare personalizat, cu estimarea beneficiilor și timpilor de recuperare pentru fiecare variantă de investiție.</p>

<h2>FAQ clasa energetică și tâmplărie PVC</h2>
<p><strong>Câte clase energetice câștig dacă schimb doar ferestrele?</strong><br />
Depinde de starea inițială. Dacă ferestrele reprezintă 30% din pierderile totale și le reduci la jumătate, câștigul în consum este de ~15%. Aceasta poate reprezenta 1–2 clase energetice, în funcție de punctul de start.</p>
<p><strong>Am nevoie de certificat energetic nou după montajul ferestrelor?</strong><br />
Nu este obligatoriu în toate situațiile, dar este recomandat pentru a documenta îmbunătățirea și a accesa programele de finanțare. Costul unui CE actualizat este de 300–600 lei.</p>
<p><strong>Pot atinge clasa A doar cu ferestre noi?</strong><br />
Practic, nu. Clasa A necesită un pachet complet de renovare. Ferestrele sunt un element esențial, dar insuficient singure. Puteți atinge clasa B–C cu ferestre noi plus izolație acoperiș plus modernizare sistem încălzire.</p>
<p><strong>Cât durează să se amortizeze investiția în ferestre noi?</strong><br />
Între 5 și 12 ani, în funcție de tipul de fereastră ales, zona climatică și prețul energiei. Cu programele AFM care acoperă 50% din cost, termenul se reduce la 3–6 ani.</p>
<p><strong>Ferestrele ThermoDMR vin cu certificat energetic al produsului?</strong><br />
Da. Toate produsele ThermoDMR vin cu Declarație de Performanță CE conform Regulamentului 305/2011 și cu fișe tehnice cu valorile Uw, Ug, Uf calculate conform EN ISO 10077. Aceste documente sunt acceptate de AFM și auditorii energetici.</p>
<p><strong>Ce se întâmplă cu ferestrele orientate spre sud față de cele orientate spre nord?</strong><br />
Orientarea afectează și câștigul solar pasiv. Ferestrele spre sud au un factor solar g mai important — în sezonul de iarnă, câștigul solar poate compensa parțial pierderile termice. Pentru ferestrele spre nord, care nu beneficiază de câștig solar, Uw mic este și mai important.</p>
<p><strong>Pot combina ferestre DMR Confort la etaj și DMR Passive la parter?</strong><br />
Tehnic, da. Din punct de vedere estetic, recomandăm același tip de profil pentru coerență vizuală. Dar dacă etajul este mai expus la intemperii (vânt) sau nord, alegerea unui produs mai performant acolo este justificată.</p>

<h2>Directiva EPBD 2024 și impactul concret asupra proprietarilor din România</h2>
<p>Directiva europeană privind performanța energetică a clădirilor (EPBD), revizuită în 2024 și în curs de transpunere în legislația română, introduce un calendar de renovare obligatorie care va afecta direct proprietarii de locuințe cu eficiență energetică scăzută.</p>
<p>Principalele prevederi care vizează România:</p>
<ul>
  <li>Până în <strong>2030</strong>: cel puțin 16% din fondul rezidențial cu cele mai slabe performanțe (practic clasele F și G) trebuie renovate la minimum clasa E</li>
  <li>Până în <strong>2033</strong>: pragul crește la 26% din fondul rezidențial, cu cerința de atingere a clasei D</li>
  <li>Toate clădirile rezidențiale noi din 2030 trebuie să fie <strong>zero-energy buildings (ZEB)</strong></li>
  <li>Statele membre trebuie să introducă mecanisme de finanțare accesibile pentru renovare</li>
</ul>
<p>În practică, aceasta înseamnă că locuințele cu clasa F sau G vor deveni <strong>greu de vândut și de închiriat</strong> fără îmbunătățiri energetice, iar accesul la credite ipotecare va fi tot mai condiționat de clasa energetică. Proprietarii care acționează acum, în 2026, beneficiază de programele de finanțare existente și evită presiunea legislativă viitoare.</p>

<h2>Valoarea imobiliară și clasa energetică: cât valorează un salt de clasă</h2>
<p>Datele din piața imobiliară românească confirmă că eficiența energetică a început să fie reflectată în prețul tranzacțiilor. Conform analizelor realizate de principalele platforme imobiliare din România (Imobiliare.ro, Storia) pentru 2025-2026:</p>
<ul>
  <li>O locuință în clasa A sau B se vinde cu <strong>8–15% mai mult</strong> față de o locuință identică ca suprafață și localizare, dar în clasa F sau G</li>
  <li>Timpul mediu de vânzare este cu <strong>30–45 de zile mai scurt</strong> pentru locuințele cu clasă energetică bună</li>
  <li>Băncile acordă condiții mai bune (dobândă redusă, avans mai mic) pentru credite garantate cu locuințe eficiente energetic</li>
</ul>
<p>Pe un apartament de 70.000 EUR, diferența de 10% înseamnă 7.000 EUR — mult mai mult decât costul ferestrelor noi. Ferestrele nu sunt singurul factor, dar contribuie direct la saltul de 1–3 clase energetice necesar pentru a trece din categoria „neperformant" în categoria „performant".</p>

<h2>Consultanță gratuită ThermoDMR: pasul următor</h2>
<p>La ThermoDMR înțelegem că decizia de renovare termică este una complexă, cu implicații financiare și tehnice semnificative. De aceea, oferim fiecărui client o <strong>consultanță tehnică gratuită</strong> care include:</p>
<ul>
  <li>Evaluarea situației actuale a tâmplăriei existente (la fața locului sau pe baza fotografiilor trimise)</li>
  <li>Estimarea economiei anuale de energie în funcție de zona climatică și suprafața vitrată</li>
  <li>Recomandarea produsului optim din gama ThermoDMR (<a href="/ro/produse/dmr-confort">DMR Confort</a>, <a href="/ro/produse/dmr-domus">DMR Domus</a> sau <a href="/ro/produse/dmr-passive">DMR Passive</a>)</li>
  <li>Calculul îmbunătățirii clasei energetice după montaj</li>
  <li>Documentele tehnice necesare pentru dosarul de finanțare AFM</li>
  <li>Ofertă comercială detaliată, fără obligații</li>
</ul>
<p>Fie că ești la începutul procesului de documentare sau gata să semnezi contractul de montaj, suntem alături de tine cu expertiză și transparență. Poți consulta și <a href="/ro/produse">întreaga gamă de produse ThermoDMR</a> sau afla mai multe despre <a href="/ro/produse/persiane">persioanele exterioare</a> și <a href="/ro/produse/portoncini">ușile de intrare</a> pentru un sistem complet de protecție și izolare.</p>
<p style="text-align:center; margin-top:2rem;">
  <a href="/ro/contact" style="background:#1a56db;color:#fff;padding:14px 32px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:1.1rem;">Solicită consultanță gratuită →</a>
</p>
<p>Completează formularul de contact cu detalii despre locuința ta și vei fi contactat în maximum 24 de ore de un consultant ThermoDMR. Îți vom prezenta o ofertă personalizată cu valori Uw certificate, estimarea economiei anuale și calculul perioadei de recuperare a investiției pentru situația ta specifică.</p>

<h2>Planul de renovare termică pe etape: o strategie inteligentă pentru 2026</h2>
<p>Îmbunătățirea clasei energetice a locuinței nu trebuie să se facă tot odată. O strategie pe etape permite distribuirea investiției pe mai mulți ani, accesând programe de finanțare diferite la fiecare etapă:</p>
<table>
  <thead>
    <tr><th>Etapă</th><th>Lucrare</th><th>Impact clasă energetică</th><th>Cost estimat</th><th>Finanțare disponibilă</th></tr>
  </thead>
  <tbody>
    <tr><td>1 (2026)</td><td>Ferestre și uși noi</td><td>+1-2 clase</td><td>5.000–15.000 lei</td><td>Casa Verde Plus, PNRR</td></tr>
    <tr><td>2 (2026-2027)</td><td>Izolație acoperiș/pod</td><td>+1-2 clase</td><td>8.000–20.000 lei</td><td>Rabla pentru Case, PNRR</td></tr>
    <tr><td>3 (2027-2028)</td><td>Izolație fațadă exterioară</td><td>+2-3 clase</td><td>15.000–35.000 lei</td><td>PNRR, credite verzi</td></tr>
    <tr><td>4 (opțional)</td><td>Sisteme de încălzire (pompă căldură, panouri solare)</td><td>+1-2 clase</td><td>10.000–30.000 lei</td><td>Casa Verde Clasic, PNRR</td></tr>
  </tbody>
</table>
<p>Pornind de la o clădire în clasa F (tipică pentru blocurile comuniste sau casele construite pre-1990), parcurgând primele 3 etape puteți atinge clasa B-C — suficient pentru a satisface cerințele EPBD 2024 și a beneficia de valoare imobiliară crescută. Ferestrele reprezintă prima etapă logică: investiție relativ mică, impact imediat asupra confortului, documentare simplă pentru etapele ulterioare.</p>

<h2>Rolul ventilației în performanța energetică după schimbarea ferestrelor</h2>
<p>Un aspect frecvent ignorat: ferestrele vechi cu garnituri uzate „ventilau" natural locuința prin infiltrații. Ferestrele noi etanșe <strong>elimină aceste infiltrații</strong> — ceea ce este excelent pentru izolație, dar necesită compensare prin ventilație controlată.</p>
<p>Fără ventilație adecvată după montajul ferestrelor noi, pot apărea:</p>
<ul>
  <li>Condens pe geamuri în interior (semn că umiditatea relativă a depășit 60%)</li>
  <li>Miros de aer stătut, în special în dormitoare și băi</li>
  <li>Creșterea concentrației de CO₂ peste 1.000 ppm — reducând calitatea somnului și concentrarea</li>
  <li>Mucegai pe colțuri reci (punți termice) dacă ventilația nu evacuează umiditatea</li>
</ul>
<p>Soluțiile recomandate, în ordinea costului crescător:</p>
<ul>
  <li><strong>Aerisire manuală sistematică</strong> — 5-10 minute de 3 ori pe zi, cu ferestre deschise larg (nu crăpate). Eficientă și gratuită, dar dependentă de disciplina utilizatorului.</li>
  <li><strong>Grile de ventilație în toc</strong> — integrate în rama ferestrei, asigură un debit mic de aer proaspăt continuu fără a compromite izolația termică semnificativ.</li>
  <li><strong>Ventilație mecanică cu recuperare de căldură (VMC)</strong> — soluția optimă pentru case pasive. Extrage aerul viciat și introduce aer proaspăt, recuperând 70-90% din căldura aerului evacuat. Costul unui sistem VMC este de 3.000-8.000 lei, dar reduce consumul energetic suplimentar față de ventilația naturală.</li>
</ul>
<p>ThermoDMR recomandă, pentru locuințele cu ferestre noi etanșe, instalarea cel puțin a grilelor de ventilație în tocurile ferestrelor din dormitoare. Este o opțiune care se specifică la comandă, cu cost minimal și beneficiu semnificativ pentru calitatea aerului interior.</p>
    `.trim(),
  },

  {
    slug: "geam-triplu-sau-dublu-ghid-2026",
    lang: "ro",
    title: "Geam Triplu sau Dublu? Alegerea Corectă în 2026",
    description: "Geam triplu sau dublu pentru ferestre PVC? Comparație completă 2026: costuri, izolare termică, economie energie. Când merită cu adevărat investiția.",
    date: "2026-04-12",
    category: "Ghiduri",
    readingTime: 18,
    heroImage: "https://images.unsplash.com/photo-1600566753376-12c8ab7c5a38?w=1200&q=80",
    content: `
<h2>O decizie care poate valora mii de lei: geam dublu sau triplu?</h2>
<p>Când vine momentul să schimbi ferestrele, una dintre cele mai frecvente întrebări pe care și le pun proprietarii este: <strong>merită să plătesc mai mult pentru geamul triplu?</strong> Diferența de preț poate varia între 20% și 40% față de un geam dublu de calitate, ceea ce pe o casă cu 8-10 ferestre înseamnă 3.000 – 6.000 lei în plus.</p>
<p>Răspunsul corect nu este universal — depinde de zona climatică în care locuiești, de tipul clădirii, de buget și de obiectivele pe termen lung. Această ghidă completă îți oferă toate datele tehnice, calculele economice și criteriile de decizie pentru a face alegerea potrivită în 2026.</p>
<p>Vom compara geamul dublu modern (cu argon și Low-E) cu geamul triplu din toate unghiurile: termic, acustic, structural, financiar și practic — cu exemple de preț în lei și calcule de recuperare a investiției pentru zonele climatice din România.</p>

<h2>Anatomia geamului dublu modern: mai mult decât două foi de sticlă</h2>
<p>Mulți oameni cred că un geam dublu înseamnă pur și simplu două foi de sticlă lipite împreună. În realitate, un <strong>geam dublu modern de calitate</strong> este un sistem complex cu mai multe componente care lucrează împreună:</p>
<h3>Foile de sticlă și grosimile</h3>
<p>O configurație tipică de geam dublu performant este <strong>4/16/4 mm</strong> sau <strong>4/16/6 mm</strong> (sticlă exterioară / intercapedine / sticlă interioară). Configurațiile asimetrice (cu foi de grosimi diferite) sunt mai eficiente acustic, deoarece reduc efectul de rezonanță între cele două foi. Grosimea totală a geamului dublu este de obicei 24-28 mm.</p>
<h3>Intercapedina și gazul</h3>
<p>Spațiul dintre foi este esențial. Un geam dublu de bază folosește <strong>aer uscat și deumidificat</strong> — soluția cea mai ieftină dar și cea mai puțin performantă. Geamurile premium folosesc <strong>gaz argon</strong>, care are o conductivitate termică cu 34% mai mică decât aerul. Intercapedina optimă pentru argon este de 14-16 mm — sub sau peste această valoare, eficiența scade.</p>
<h3>Distanțierul (warm edge spacer)</h3>
<p>Distanțierul este bara metalică sau din material compozit care separă cele două foi la margine. Distanțierele tradiționale din aluminiu creează un <strong>pod termic la margine</strong> — un punct slab care reduce semnificativ performanța. Distanțierele moderne <strong>warm edge</strong> (din TGI, Swisspacer sau materiale compozite similare) reduc pierderile termice la margine cu 20-30% față de aluminiu.</p>
<h3>Acoperirea Low-E (emisivitate redusă)</h3>
<p>Una dintre cele mai importante inovații în domeniul geamurilor: un strat invizibil de oxizi metalici aplicat pe suprafața interioară a sticlei exterioare reflectă căldura înapoi în cameră în sezonul rece, reducând transmitanța termică a geamului (Ug) de la ~2,8 W/m²K (sticlă simplă) la <strong>1,0 – 1,1 W/m²K</strong>. Există două tipuri:</p>
<ul>
  <li><strong>Hard coat (piroliză)</strong> — strat aplicat în topitură, mai rezistent mecanic, Ug ≈ 1,4 W/m²K</li>
  <li><strong>Soft coat (magnetron sputtering)</strong> — strat aplicat prin pulverizare, performanță mai bună (Ug ≈ 1,0 W/m²K), dar necesită protecție în intercapedine</li>
</ul>
<p>Un geam dublu complet echipat — argon + Low-E soft coat + warm edge spacer — atinge <strong>Ug = 1,0 W/m²K</strong>, iar fereastra completă (cadru + sticlă) ajunge la <strong>Uw = 1,1 – 1,4 W/m²K</strong>, în funcție de calitatea profilului.</p>

<h2>Anatomia geamului triplu: ce aduce a treia foaie</h2>
<p>Geamul triplu nu este pur și simplu un geam dublu cu o foaie în plus — este o reconfigurare a întregului sistem cu consecințe tehnice, structurale și financiare semnificative.</p>
<h3>Structura în trei foi</h3>
<p>Configurația tipică a geamului triplu este <strong>4/12/4/12/4 mm</strong> sau <strong>4/14/4/14/4 mm</strong> — două intercapedine cu gaz, trei foi de sticlă. Grosimea totală ajunge la 36-44 mm, față de 24-28 mm ale geamului dublu.</p>
<h3>Două intercapedine cu gaz argon sau kripton</h3>
<p>Adăugarea celei de-a doua intercapedine creează o a doua barieră termică. Folosind argon în ambele spații, Ug al ansamblului scade la <strong>0,6 – 0,7 W/m²K</strong>. Cu kripton (gaz mai dens, conductivitate termică de 2,4 ori mai mică decât argonul), valorile pot coborî la <strong>0,5 W/m²K</strong> — dar costul kriotonului este de 3-5 ori mai mare decât al argonului.</p>
<h3>Foaia intermediară cu două acoperiri Low-E</h3>
<p>Foaia de sticlă din mijloc poate fi acoperită pe ambele fețe cu Low-E, maximizând reflexia termică. Aceasta este configurația folosită în ferestrele <strong>Passivhaus</strong>, care cer Uw ≤ 0,8 W/m²K. Fereastra <a href="/ro/produse/dmr-passive">DMR Passive</a> de la ThermoDMR atinge această valoare cu profil de 6 camere și geam triplu cu Low-E dublu și argon.</p>

<h2>Gaz argon vs kripton vs aer: comparație practică</h2>
<p>Alegerea gazului din intercapedine are un impact direct asupra performanței și prețului:</p>
<table>
  <thead>
    <tr><th>Gaz</th><th>Conductivitate termică</th><th>Reducere față de aer</th><th>Cost relativ</th><th>Intercapedină optimă</th></tr>
  </thead>
  <tbody>
    <tr><td>Aer uscat</td><td>0,026 W/m·K</td><td>—</td><td>Referință</td><td>16 mm</td></tr>
    <tr><td>Argon (Ar)</td><td>0,017 W/m·K</td><td>-34%</td><td>×1,5 – ×2</td><td>14-16 mm</td></tr>
    <tr><td>Kripton (Kr)</td><td>0,009 W/m·K</td><td>-65%</td><td>×5 – ×8</td><td>10-12 mm</td></tr>
    <tr><td>Xenon (Xe)</td><td>0,005 W/m·K</td><td>-81%</td><td>×20+</td><td>8-10 mm</td></tr>
  </tbody>
</table>
<p>Pentru uz rezidențial, <strong>argonul oferă cel mai bun raport performanță/cost</strong>. Kriotonul este folosit în aplicații speciale unde grosimea totală a geamului trebuie limitată (ex. ferestre de renovare cu rame vechi înguste). Xenonul este practic exclusiv pentru proiecte pasive premium sau clădiri publice certificate nZEB.</p>

<h2>Tabel comparativ tehnic complet: geam dublu vs triplu</h2>
<table>
  <thead>
    <tr><th>Parametru</th><th>Geam dublu (argon + Low-E)</th><th>Geam triplu (argon + Low-E)</th><th>Geam triplu premium (Kr + Low-E dublu)</th></tr>
  </thead>
  <tbody>
    <tr><td>Ug sticlă [W/m²K]</td><td>1,0 – 1,1</td><td>0,6 – 0,7</td><td>0,4 – 0,5</td></tr>
    <tr><td>Uw fereastră completă [W/m²K]</td><td>1,1 – 1,4</td><td>0,7 – 0,9</td><td>0,5 – 0,7</td></tr>
    <tr><td>Izolare acustică Rw [dB]</td><td>32 – 38</td><td>33 – 38</td><td>34 – 40</td></tr>
    <tr><td>Grosime totală geam [mm]</td><td>24 – 28</td><td>36 – 44</td><td>34 – 40</td></tr>
    <tr><td>Greutate [kg/m²]</td><td>15 – 18</td><td>21 – 27</td><td>22 – 28</td></tr>
    <tr><td>Transmitanță luminoasă [%]</td><td>72 – 78</td><td>62 – 70</td><td>60 – 68</td></tr>
    <tr><td>Factor solar g [-]</td><td>0,55 – 0,62</td><td>0,48 – 0,55</td><td>0,42 – 0,50</td></tr>
    <tr><td>Preț relativ (doar geamul)</td><td>Referință</td><td>+25 – 40%</td><td>+60 – 90%</td></tr>
  </tbody>
</table>
<p>Observație importantă: transmitanța luminoasă mai redusă a geamului triplu (62-70% față de 72-78% la dublu) înseamnă camere ușor mai întunecate. Pe orientări nordice, unde oricum lumina naturală este redusă, această diferență este mai puțin relevantă. Pe orientări sudice, geamul triplu poate reduce câștigul solar pasiv în sezonul rece — un dezavantaj în locuințele bine orientate spre sud.</p>

<h2>Calculul economiei termice reale: zone climatice din România</h2>
<p>Să facem calculele concrete pentru o locuință tipică cu 8 ferestre de dimensiuni medii (1,2 × 1,4 m = 1,68 m² bucata, total ~13,4 m² suprafață vitrată):</p>
<p><strong>Formula de calcul:</strong> Pierdere termică anuală (kWh) = Uw × Suprafață (m²) × Grade-zile (°C·zile) × 24h / 1000</p>
<table>
  <thead>
    <tr><th>Zonă climatică</th><th>Grad-zile încălzire</th><th>Cu geam dublu Uw=1,1</th><th>Cu geam triplu Uw=0,8</th><th>Economie anuală</th><th>Economie în lei (~0,65 lei/kWh)</th></tr>
  </thead>
  <tbody>
    <tr><td>Zona I (Constanța, Galați)</td><td>2.200</td><td>~390 kWh</td><td>~284 kWh</td><td>~106 kWh</td><td>~69 lei/an</td></tr>
    <tr><td>Zona II (București, Craiova)</td><td>2.800</td><td>~497 kWh</td><td>~361 kWh</td><td>~135 kWh</td><td>~88 lei/an</td></tr>
    <tr><td>Zona III (Cluj, Brașov)</td><td>3.500</td><td>~621 kWh</td><td>~452 kWh</td><td>~169 kWh</td><td>~110 lei/an</td></tr>
    <tr><td>Zona IV (Suceava, Miercurea Ciuc)</td><td>4.500</td><td>~798 kWh</td><td>~581 kWh</td><td>~217 kWh</td><td>~141 lei/an</td></tr>
  </tbody>
</table>
<p>Interpretarea cifrelor: în cea mai rece zonă din România (zona IV), diferența anuală de economie între geamul dublu modern și cel triplu este de aproximativ <strong>141 lei/an</strong> (pentru 8 ferestre medii). Dacă diferența de preț pentru geam triplu față de dublu este de 3.000 lei, perioada de recuperare a investiției suplimentare este de <strong>21 de ani</strong>. Greu de justificat economic în zona IV — și cu atât mai puțin în zonele I-III.</p>
<p>Concluzia matematică: <strong>geamul triplu nu se justifică economic prin economii de energie pentru majoritatea locuințelor din România</strong>, chiar și în zonele reci. Justificarea principală este confortul termic îmbunătățit și cerința tehnică pentru case pasive.</p>

<h2>Izolarea acustică: geamul dublu sau triplu câștigă?</h2>
<p>Aceasta este probabil cea mai mare surpriză pentru mulți cumpărători: <strong>geamul triplu nu este neapărat mai bun acustic decât geamul dublu</strong>. De fapt, în unele configurații, geamul dublu asimetric bate geamul triplu standard.</p>
<h3>De ce numărul de foi nu determină izolarea acustică</h3>
<p>Sunetul se propagă prin vibrarea suprafețelor solide. Două foi de sticlă de aceeași grosime rezonează la aceeași frecvență — se amplifică reciproc în loc să se anuleze. Izolarea acustică eficientă necesită:</p>
<ul>
  <li><strong>Foi asimetrice</strong>: grosimi diferite (ex. 4 mm exterior + 6 mm interior) pentru frecvențe de rezonanță diferite</li>
  <li><strong>Masă totală mai mare</strong>: sticlă mai groasă sau laminată (foi unite cu folie PVB)</li>
  <li><strong>Intercapedine optimizată</strong>: 16-20 mm pentru absorbție fonică maximă</li>
</ul>
<p>Un geam dublu <strong>4/20/6 mm cu foi laminate</strong> poate atinge Rw = 42 dB, față de Rw = 35 dB al unui geam triplu standard 4/12/4/12/4 mm. Dacă zgomotul exterior este principala ta preocupare (locuință lângă trafic intens, cale ferată sau aeroport), <strong>solicit explicit o configurație acustică</strong> — nu neapărat geam triplu.</p>

<h2>Prețuri orientative 2026: cât costă diferența în realitate</h2>
<p>Prețurile variază în funcție de furnizor, dimensiuni și configurație, dar iată valori orientative pentru piața românească în 2026 (preț per fereastră completă montată, dimensiune standard 120×140 cm):</p>
<table>
  <thead>
    <tr><th>Tip fereastră</th><th>Profil</th><th>Geam</th><th>Preț estimat (montat)</th></tr>
  </thead>
  <tbody>
    <tr><td>Standard economic</td><td>3 camere</td><td>Dublu, aer</td><td>700 – 900 lei</td></tr>
    <tr><td>Calitate medie</td><td>5 camere</td><td>Dublu, argon</td><td>900 – 1.200 lei</td></tr>
    <tr><td>Calitate bună (ThermoDMR DMR Confort)</td><td>5 camere</td><td>Dublu, argon + Low-E</td><td>1.100 – 1.500 lei</td></tr>
    <tr><td>Premium</td><td>6 camere</td><td>Triplu, argon + Low-E</td><td>1.400 – 2.000 lei</td></tr>
    <tr><td>Casa Pasivă (ThermoDMR DMR Passive)</td><td>6 camere</td><td>Triplu, argon + Low-E dublu</td><td>1.800 – 2.500 lei</td></tr>
  </tbody>
</table>
<p>Pentru o casă cu 8 ferestre medii, diferența totală între „calitate bună cu dublu" și „premium cu triplu" este de <strong>2.400 – 4.000 lei</strong>. Raportat la economia termică suplimentară (70-140 lei/an în funcție de zonă), recuperarea se face în 17-57 ani — mult peste durata de viață economică a ferestrei.</p>

<h2>Greutate și implicații structurale: ce trebuie să știi</h2>
<p>Geamul triplu cântărește cu <strong>30-50% mai mult</strong> decât geamul dublu de aceeași dimensiune:</p>
<ul>
  <li>Geam dublu 120×140 cm: ~9-10 kg</li>
  <li>Geam triplu 120×140 cm: ~13-15 kg</li>
</ul>
<p>Aceasta ridică mai multe cerințe tehnice:</p>
<h3>Feronerie întărită</h3>
<p>Balamalele, mecanismul oscilo-batant și cremoanele trebuie să suporte greutatea suplimentară fără să se deformeze în timp. O fereastră cu geam triplu montată pe feronerie standard se va deregla în 5-8 ani, cu consequențe pentru etanșare și funcționare. Feroneria ThermoDMR pentru geam triplu este dimensionată la sarcini de până la 130 kg per fereastră.</p>
<h3>Profilul cadrului</h3>
<p>Un profil cu 5 camere este suficient pentru geam dublu. Geamul triplu necesită în general un <strong>profil cu 6 sau 7 camere</strong> pentru rigiditate structurală și pentru a menține valoarea Uw globală (un profil prost poate anula câștigul termic al geamului mai bun). Profilul DMR Passive de la ThermoDMR este proiectat specific pentru combinația cu geam triplu.</p>
<h3>Tocul de zidărie</h3>
<p>Pe renovări, trebuie verificat dacă tocul existent suportă greutatea suplimentară. Pe case vechi cu toc din lemn sau PVC vechi, poate fi necesară înlocuirea completă a tocului — cost suplimentar de 200-400 lei per fereastră.</p>

<h2>Condens pe geamul triplu: fenomenul care sperie și care e de fapt bun</h2>
<p>Mulți proprietari care montează geam triplu raportează că văd <strong>condens pe suprafața exterioară a geamului</strong> dimineața. Aceasta este o reacție normală și de fapt un semn pozitiv de performanță termică ridicată.</p>
<p>Explicația: geamul triplu izolează atât de bine că suprafața exterioară rămâne mai rece decât temperatura punctului de rouă a aerului exterior în nopțile clare de primăvară/toamnă. Condensul apare, evaporă odată cu soarele și nu lasă urme. Este un fenomen invers condensului interior — cel problematic care apare pe geamuri vechi și indică pierderi termice mari.</p>
<p>Condensul interior pe geam triplu este practic imposibil în condiții normale de ventilație, ceea ce înseamnă că elimini riscul de mucegai la fereastră.</p>

<h2>Ghid pe zone climatice: ce alegi în funcție de regiunile României</h2>
<p>Iată recomandarea concretă în funcție de localizarea ta:</p>
<table>
  <thead>
    <tr><th>Regiune</th><th>Zona climatică</th><th>Recomandare</th><th>Justificare</th></tr>
  </thead>
  <tbody>
    <tr><td>Constanța, Tulcea, Galați</td><td>I</td><td>Dublu argon + Low-E</td><td>Ierni blânde, ROI triplu nesatisfăcător</td></tr>
    <tr><td>București, Craiova, Pitești</td><td>II</td><td>Dublu argon + Low-E</td><td>Standard excellent, triplu nu se recuperează</td></tr>
    <tr><td>Cluj, Brașov, Sibiu, Timișoara</td><td>III</td><td>Dublu argon + Low-E (sau triplu pentru case pasive)</td><td>Dublu modern este suficient, triplu opțional pentru confort maxim</td></tr>
    <tr><td>Suceava, Iași, Piatra Neamț, Baia Mare</td><td>IV</td><td>Triplu recomandat pentru case noi sau pasive</td><td>Ierni severe justifică partial investiția suplimentară</td></tr>
    <tr><td>Zone montane peste 700 m</td><td>IV+</td><td>Triplu obligatoriu pentru case pasive</td><td>Condiții extreme, Uw ≤ 0,8 necesar</td></tr>
  </tbody>
</table>

<h2>Profilul de cumpărător: pentru cine are sens geamul triplu în 2026</h2>
<p>Pe baza criteriilor tehnice și economice analizate, geamul triplu este alegerea corectă pentru:</p>
<ul>
  <li><strong>Constructori de case pasive sau nZEB</strong> — standardele Passivhaus cer Uw ≤ 0,8 W/m²K, realizabil practic doar cu triplu vitraj</li>
  <li><strong>Proprietari din zona IV</strong> (Moldova, nordul Transilvaniei) care fac renovare completă și doresc confort maxim pe termen lung, indiferent de ROI strict</li>
  <li><strong>Persoane cu sensibilitate termică ridicată</strong> — vârstnici, copii mici, persoane cu boli reumatice care suferă chiar și de curenți reci slabi lângă fereastră</li>
  <li><strong>Ferestre mari pe pereți nordici</strong> — suprafețe vitrate de peste 3 m² orientate spre nord, unde pierderile sunt mari și câștigul solar nul</li>
  <li><strong>Proiecte cu finanțare europeană pentru nZEB</strong> — unde cerințele tehnice impun valori Uw specifice</li>
</ul>
<p>Geamul dublu modern de calitate este suficient pentru: renovarea standard a unei locuințe existente în zona I-III, proiecte cu buget limitat, ferestre orientate spre sud/est/vest unde câștigul solar compensează parțial pierderile.</p>

<h2>Când geamul dublu modern este alegerea mai inteligentă</h2>
<p>Este important să subliniem că un geam dublu <strong>modern</strong>, echipat corect, reprezintă un salt enorm față de geamul vechi și acoperă 85-90% din beneficiile geamului triplu la 65-75% din cost. Un geam dublu cu:</p>
<ul>
  <li>Argon în intercapedine (nu aer)</li>
  <li>Strat Low-E soft coat (nu hard coat)</li>
  <li>Warm edge spacer (nu aluminiu simplu)</li>
  <li>Profil de 5 camere de calitate</li>
</ul>
<p>...atinge Uw = 1,1 W/m²K — valoare cu care poți obține <strong>Ecobonus 65%</strong> în orice zonă climatică din Italia și care depășește cu mult normativele românești pentru construcții noi. <a href="/ro/produse/dmr-confort">DMR Confort</a> și <a href="/ro/produse/dmr-domus">DMR Domus</a> de la ThermoDMR sunt exact acest tip de fereastră — calitate maximă cu geam dublu, la un preț accesibil.</p>

<h2>Tendințe 2026: piața tâmplăriei PVC în România</h2>
<p>Piața tâmplăriei PVC din România traversează o transformare accelerată în 2026, influențată de mai mulți factori:</p>
<p><strong>Directiva EPBD și presiunea europeană:</strong> Obligativitatea certificatelor energetice și viitoarele restricții pentru clădirile din clasa G-F creează o cerere crescută pentru ferestre performante. Tot mai mulți cumpărători întreabă de Uw, nu doar de preț.</p>
<p><strong>Creșterea ponderii geamului triplu:</strong> Conform datelor asociației producătorilor de tâmplărie (APERF), ponderea geamului triplu în totalul vânzărilor a crescut de la 8% în 2022 la 19% în 2025, cu o prognoză de 28% pentru 2026. Creșterea vine în special din zona IV și din proiectele de case noi, nu din renovări.</p>
<p><strong>Prețurile energiei:</strong> Volatilitatea prețului la gaz și electricitate din ultimii ani a schimbat calculul de ROI. Cu prețuri mai mari la energie, investiția suplimentară în geam triplu se recuperează mai repede decât acum 5 ani.</p>

<h2>10 întrebări de pus furnizorului înainte de a cumpăra</h2>
<ol>
  <li><strong>Care este valoarea Uw a ferestrei complete</strong> (nu doar Ug al geamului) cu profilul ales?</li>
  <li>Geamul folosește <strong>argon sau aer</strong> în intercapedine? Ce procent de umplere cu gaz garantați?</li>
  <li>Ce tip de <strong>distanțier</strong> folosiți — aluminiu sau warm edge? Ce material?</li>
  <li>Acoperirea Low-E este <strong>hard coat sau soft coat</strong>?</li>
  <li>Feroneria este dimensionată pentru <strong>greutatea geamului triplu</strong> (dacă alegeți triplu)?</li>
  <li>Furnizați <strong>fișa tehnică cu toate parametrii</strong> (Uw, Ug, Rw, Uf) necesară pentru dosarul AFM sau certificatul energetic?</li>
  <li>Montajul include <strong>garniturile perimetrale în 3 straturi</strong> (interior-intermediar-exterior)?</li>
  <li>Care este <strong>garanția</strong> pentru pierderea gazului din intercapedine?</li>
  <li>Ce se întâmplă dacă apare <strong>condens interstițial</strong> (între foi) în perioada de garanție?</li>
  <li>Puteți furniza <strong>referințe verificabile</strong> pentru lucrări similare în zona mea?</li>
</ol>
<p>ThermoDMR răspunde afirmativ la toate aceste întrebări și furnizează documentația tehnică completă împreună cu orice comandă. Fiecare fereastră livrată vine cu fișa tehnică individuală cu valorile Uw și Ug certificate.</p>

<h2>Durata de viață și garanțiile: ce acoperă producătorii</h2>
<p>Atât geamul dublu cât și cel triplu au o durată de viață teoretică de <strong>20-30 ani</strong>, cu condiția ca instalarea să fie corectă și să nu apară spargeri accidentale. Principalul punct de uzură nu este sticla în sine, ci:</p>
<ul>
  <li><strong>Pierderea gazului din intercapedine</strong> — rate de difuzie de 0,5-1% pe an; după 20 ani, pot rămâne 80-90% din gaz, suficient pentru performanță bună. La geamul triplu există două intercapedine, deci două puncte de risc — dar și dubla siguranță că dacă una pierde gaz, cealaltă menține parțial performanța.</li>
  <li><strong>Degradarea stratului Low-E</strong> — la soft coat, acoperirea este protejată în intercapedine și nu se degradează în condiții normale pe durata de viață a geamului.</li>
  <li><strong>Cedarea distanțierului</strong> — distanțierele din aluminiu se pot delamina și permite intrarea umidității. Warm edge spacer modern are o viață mult mai lungă.</li>
</ul>
<p>ThermoDMR garantează etanșeitatea intercapedinei pe <strong>10 ani</strong> de la instalare — dacă apare condens interstițial (între foi) în această perioadă, geamul este înlocuit gratuit. Garanția de ansamblu pentru fereastra completă (cadru + geam + feronerie) este de <strong>15 ani</strong>.</p>

<h2>Geamul triplu și eficiența globală a clădirii: ce prioritizezi cu buget limitat</h2>
<p>Una dintre întrebările frecvente este: dacă am un buget fix pentru renovare, investesc diferența în geam triplu sau în altceva? Răspunsul depinde de situația specifică, dar există câteva principii generale valabile:</p>
<h3>Ierarhia intervențiilor pentru eficiență energetică</h3>
<p>Conform studiilor energetice, ordinea optimă a investițiilor pentru reducerea consumului de energie (ROI descrescător) este, de regulă:</p>
<ol>
  <li><strong>Izolarea acoperișului/podul</strong> — 25-35% din pierderile totale, cel mai mare impact per euro investit</li>
  <li><strong>Înlocuirea ferestrelor vechi cu geam dublu modern</strong> — elimină 80-90% din pierderile prin tâmplărie</li>
  <li><strong>Izolarea pereților exteriori</strong> — impact mare dar cost ridicat</li>
  <li><strong>Înlocuirea sistemului de încălzire</strong> — pompă de căldură față de centrală pe gaz vechi</li>
  <li><strong>Upgrade la geam triplu</strong> — marginal față de geam dublu modern, justificat numai în context nZEB</li>
  <li><strong>Izolarea pardoselii/subsolului</strong> — impact moderat</li>
</ol>
<p>Dacă ai 5.000 lei suplimentari față de bugetul pentru ferestre cu geam dublu de calitate, ai mai mult de câștigat investind în izolarea podului sau în înlocuirea unui cazan vechi cu o pompă de căldură — decât în upgrade la geam triplu. Excepție: dacă acoperișul și sistemul de încălzire sunt deja moderne și singura componentă slabă rămâne tâmplăria.</p>

<h2>Ferestre mari și fatade vitrate: reguli diferite</h2>
<p>Tot ce am discutat se aplică ferestrelor standard (1-3 m²). Pentru <strong>suprafețe vitrate mari</strong> — ferestre panoramice, uși-fereastră glisante, pereți cortină — calculul se schimbă semnificativ.</p>
<p>O fereastră glisantă de 3×2,4 m (7,2 m²) orientată spre nord reprezintă o pierdere termică de <strong>5-8 ori mai mare</strong> decât o fereastră standard. Aici diferența între Uw 1,1 și Uw 0,8 devine mai relevantă. Pe o suprafață de 7,2 m²:</p>
<ul>
  <li>Geam dublu Uw=1,1: pierdere ≈ 700 kWh/an (zona III)</li>
  <li>Geam triplu Uw=0,8: pierdere ≈ 510 kWh/an (zona III)</li>
  <li>Diferență: 190 kWh/an ≈ 120 lei/an — mai semnificativ decât la ferestre mici</li>
</ul>
<p>Pentru pereți cortină sau fațade vitrate în clădiri de birou sau rezidențiale premium, geamul triplu cu izolare termică și solară controlată este standardul de proiectare în 2026. Consulta specialiștii ThermoDMR pentru soluții specifice marilor suprafețe vitrate — regulile de dimensionare și feronerie sunt diferite față de ferestrele standard.</p>

<h2>Întrebări frecvente: geam dublu vs triplu în 2026</h2>
<p><strong>1. Geamul triplu reduce factura de gaz cu 30%?</strong><br />Nu față de un geam dublu modern — ci față de un geam vechi mono sau dublu din anii '90. Față de geam dublu cu argon și Low-E, reducerea suplimentară este de 5-15% din consumul total de încălzire.</p>
<p><strong>2. Trebuie să schimb și tocurile dacă montez geam triplu pe ferestre existente?</strong><br />De obicei da. Tocurile vechi înguste (sub 70 mm adâncime) nu pot primi un geam triplu de 36-44 mm grosime cu profil adecvat. Verificați cu instalatorul înainte de comandă.</p>
<p><strong>3. Este geamul triplu mai rezistent la spargere?</strong><br />Nu neapărat. Rezistența la impact depinde de grosimea și tipul sticlei (securizat sau laminat), nu de numărul de foi. Dacă securitatea este o prioritate, solicită sticlă P2A sau P4A laminată.</p>
<p><strong>4. Pot monta geam triplu pe ferestre PVC existente fără să schimb tot?</strong><br />Rar posibil. De obicei profilul existent nu este dimensionat structural pentru greutatea suplimentară și grosimea geamului triplu. Înlocuirea completă (ramă + geam) este soluția corectă.</p>
<p><strong>5. Geamul triplu ajută și vara, la căldura excesivă?</strong><br />Da și nu. Un geam triplu cu factor solar g redus (0,45-0,55) limitează intrarea radiației solare pe timp de vară — benefic pe orientări vestice și estice. Dar reduce și câștigul solar pasiv în iarnă. Soluția optimă pentru climatul românesc este un geam cu factor solar mediu (g=0,55-0,62) combinat cu protecție solară exterioară (rulouri, jaluzele exterioare).</p>

<h2>Geam dublu vs triplu: simulare de cost pe 20 de ani</h2>
<p>Să facem un calcul complet pe 20 de ani pentru o casă tipică din zona III (Brașov, Cluj, Sibiu), cu 12 m² de suprafață vitrată totală, sistem de încălzire cu gaz natural (0,55 lei/kWh):</p>
<table>
  <thead>
    <tr><th>Parametru</th><th>Geam dublu modern (Uw=1,1)</th><th>Geam triplu (Uw=0,8)</th></tr>
  </thead>
  <tbody>
    <tr><td>Cost instalare (12 m²)</td><td>12.000 lei</td><td>17.500 lei</td></tr>
    <tr><td>Diferență cost inițial</td><td>—</td><td>+5.500 lei</td></tr>
    <tr><td>Pierdere termică anuală</td><td>~1.650 kWh/an</td><td>~1.200 kWh/an</td></tr>
    <tr><td>Economie anuală (față de geam dublu)</td><td>—</td><td>~247 kWh/an = ~136 lei/an</td></tr>
    <tr><td>Recuperare investiție suplimentară</td><td>—</td><td>~40 ani</td></tr>
    <tr><td>Economie totală pe 20 ani</td><td>—</td><td>~2.720 lei</td></tr>
    <tr><td>Cost net pe 20 ani (față de dublu)</td><td>0</td><td>+2.780 lei</td></tr>
  </tbody>
</table>
<p>Concluzia matematică: în zona III, la prețurile actuale ale gazului, geamul triplu <strong>nu se amortizează financiar în 20 de ani</strong> față de geamul dublu modern. Diferența de 5.500 lei generează economii de 2.720 lei în 20 de ani — minus 2.780 lei față de varianta dublu.</p>
<p>Situația se schimbă semnificativ în zona IV (Suceava, Miercurea Ciuc, Vatra Dornei): cu 30% mai multe grade-zile, economiile urcă la ~370 lei/an, iar recuperarea se scurtează la ~15 ani — mai rezonabilă, dar tot la limită.</p>
<p>Notă importantă: calculul se schimbă dacă prețul gazului crește substanțial (posibil în contextul politicilor climatice europene post-2025) sau dacă se accesează subvenții AFM care reduc costul suplimentar al geamului triplu.</p>

<h2>Standardele tehnice europene relevante în 2026</h2>
<p>Alegerea geamului nu este doar o decizie comercială — ea este ghidată de un cadru de standarde europene pe care orice producător serios trebuie să le respecte:</p>
<ul>
  <li><strong>EN 673</strong> — metoda de calcul a transmitanței termice a geamului (Ug). Toate valorile Ug indicate trebuie calculate conform acestui standard.</li>
  <li><strong>EN ISO 10077-1 și -2</strong> — calculul transmitanței termice a ferestrei complete (Uw), incluzând profilul, geamul și distanțierul. Valorile Uw din oferta ThermoDMR sunt calculate conform EN ISO 10077.</li>
  <li><strong>EN 1279</strong> — standard pentru unități vitrate izolante (UVI). Definește cerințele de etanșeitate, rezistență și durabilitate ale pachetelor de geam. Toate geamurile ThermoDMR respectă EN 1279.</li>
  <li><strong>EN 12600</strong> — testul de impact al geamului (pendulul). Relevant pentru geamuri utilizate la înălțime sau în zone cu risc de impact uman.</li>
  <li><strong>CPR (Regulamentul 305/2011/UE)</strong> — impune Declarația de Performanță (DoP) și marcajul CE pentru toate produsele de construcție, inclusiv ferestrele. Fără DoP, produsul nu poate fi comercializat legal în UE.</li>
</ul>
<p>Când solicitați o ofertă, cereți explicit valorile Uw calculate conform EN ISO 10077 și Declarația de Performanță CE. Un furnizor care nu poate furniza aceste documente nu respectă cadrul legal european.</p>

<h2>Impactul orientării și umbririlor asupra alegerii geamului</h2>
<p>Un detaliu tehnic ignorat în multe decizii de cumpărare: <strong>orientarea cardinală a ferestrei schimbă calculul optim</strong> între geam dublu și triplu.</p>
<p>Ferestrele orientate <strong>spre sud</strong> primesc radiație solară directă pe tot parcursul zilei de iarnă. Un geam cu factor solar g=0,62 pe o suprafață de 3 m² poate aduce un câștig solar de 15-20 kWh/zi de iarnă însorită — suficient pentru a compensa pierderile termice și chiar mai mult. Pentru aceste ferestre, un geam dublu cu Low-E optimizat pentru câștig solar (g ridicat) poate fi mai eficient din punct de vedere energetic decât un geam triplu cu g mai mic.</p>
<p>Ferestrele orientate <strong>spre nord</strong> nu primesc radiație solară directă niciodată. Pierderile termice nu sunt compensate de câștig solar. Aici, Uw mic (geam triplu) contează mai mult.</p>
<p>Ferestrele <strong>umbrite</strong> (de un balcon supraetajat, de arbori sau de clădiri vecine) se comportă similar celor nordice: fără câștig solar, deci Uw mic este prioritar.</p>
<p>Concluzie practică: <strong>nu alege același tip de geam pentru toate ferestrele casei</strong>. Un proiect optimizat poate combina geam dublu cu g ridicat pe sud și geam triplu pe nord/umbrit — maximizând eficiența energetică globală la cost controlat. ThermoDMR oferă această consultanță personalizată pe orientare în cadrul ofertei tehnice.</p>

<h2>Concluzie: cum alegi corect pentru situația ta</h2>
<p>Rezumând tot ce am analizat:</p>
<ul>
  <li><strong>Alege geam dublu modern</strong> (argon + Low-E + warm edge + profil 5 camere) dacă: locuiești în zona I-III, faci renovare standard, ai buget limitat, ferestrele sunt orientate spre sud/est/vest</li>
  <li><strong>Alege geam triplu</strong> dacă: construiești sau renovezi o casă pasivă, ești în zona IV, ai ferestre mari nordice, vrei confort termic maxim indiferent de ROI strict</li>
  <li>Nu cumpăra geam triplu <strong>pentru beneficii acustice</strong> — solicită explicit o configurație acustică (foi asimetrice + laminat)</li>
  <li>Nu cumpăra geam triplu <strong>montat pe profil de 5 camere cu feronerie standard</strong> — anulezi beneficiile și creezi probleme structurale</li>
</ul>
<p>ThermoDMR îți oferă <strong>consultanță tehnică gratuită</strong> pentru a identifica configurația optimă în funcție de localizarea ta, tipul clădirii și bugetul disponibil. <a href="/ro/contact">Completează formularul →</a> și primești o ofertă personalizată în 24 de ore, cu fișe tehnice certificate și estimarea economiei anuale.</p>

<h2>Impactul pe termen lung: de ce contează alegerea corectă din prima</h2>
<p>Ferestrele nu se schimbă la fiecare 5 ani ca un telefon mobil. O fereastră de calitate durează 25-35 de ani. Alegerea greșită din start — un geam triplu pe o casă din zona I fără justificare termică, sau un geam dublu ieftin fără Low-E și argon — se plătește timp de decenii, fie prin costuri energetice mai mari, fie prin confort termic inferior. De aceea, consultanța tehnică înaintea deciziei de cumpărare nu este un lux — este investiție în certitudinea alegerii corecte.</p>
<p>ThermoDMR pune la dispoziție această consultanță gratuit, fără obligații. Fie că ești în faza de documentare sau gata să comanzi, echipa noastră tehnică te ajută să iei decizia optimă pentru situația ta specifică — zonă climatică, tip clădire, orientare ferestre, buget disponibil și obiective energetice pe termen lung.</p>
    `.trim(),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Export
// ─────────────────────────────────────────────────────────────────────────────
export const allBlogPosts: BlogPost[] = [...itPosts, ...roPosts];

export const getBlogPostsByLang = (lang: "it" | "ro"): BlogPost[] =>
  allBlogPosts.filter((p) => p.lang === lang);

export const getBlogPostBySlug = (slug: string, lang: "it" | "ro"): BlogPost | undefined =>
  allBlogPosts.find((p) => p.slug === slug && p.lang === lang);
