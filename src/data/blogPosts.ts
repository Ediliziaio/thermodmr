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
    title: "Finestre in PVC con Profilo Tedesco: Guida Completa 2025",
    description: "Cosa sono le finestre PVC con profilo tedesco? Vantaggi, camere, certificazioni e perché costano meno di quanto pensi. Guida aggiornata 2025.",
    date: "2025-03-10",
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
    date: "2025-03-20",
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

<h2>Incentivi fiscali 2025</h2>
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
    date: "2025-04-01",
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
    title: "Finestre PVC Prezzi 2025: Quanto Costano Davvero e Come Non Pagare Troppo",
    description: "Prezzi reali delle finestre in PVC nel 2025: dal doppio al triplo vetro. Cosa incide sul costo, come confrontare preventivi e risparmiare senza rinunciare alla qualità.",
    date: "2025-04-07",
    category: "Prezzi & Preventivi",
    readingTime: 12,
    content: `
<h2>Perché i prezzi delle finestre PVC sono così diversi?</h2>
<p>Cerchi <strong>finestre PVC prezzi 2025</strong> e trovi preventivi che vanno da €150 a €900 per finestra. Come è possibile una differenza del genere? La risposta sta in quattro variabili: qualità del profilo, tipo di vetro, ferramenta e provenienza della produzione.</p>
<p>Capire queste variabili ti permette di confrontare preventivi in modo intelligente — e di non cadere nella trappola del prezzo basso che nasconde costi di manutenzione alti nel lungo periodo.</p>

<h2>Fattori che determinano il prezzo di una finestra PVC</h2>
<h3>1. Il profilo: camere e spessore</h3>
<p>Il profilo PVC è la struttura portante della finestra. Un profilo a 5 camere offre prestazioni termiche nettamente superiori a un profilo a 3 camere, a un costo marginalmente più alto. La differenza di prezzo tra un profilo 3 camere e uno 5 camere è spesso di soli €30-50 a finestra — un investimento che si ripaga in 2-3 anni di bollette.</p>
<p>ThermoDMR utilizza profili tedeschi a 5 camere come standard su tutta la gamma, con opzione 6 camere per la linea DMR Passive.</p>

<h3>2. Il vetro: doppio o triplo?</h3>
<p>Il vetrocamera (o vetro isolante) è dove si gioca la partita energetica. Le opzioni principali per il 2025:</p>
<ul>
  <li><strong>Doppio vetro 4/16/4 con gas argon e coating low-e</strong> — Ug ≈ 1,0 W/m²K — standard ThermoDMR, ottimo per zone climatiche B-D</li>
  <li><strong>Doppio vetro 4/20/4 con krypton</strong> — Ug ≈ 0,7 W/m²K — prestazioni da triplo vetro a costo inferiore</li>
  <li><strong>Triplo vetro 4/12/4/12/4</strong> — Ug ≈ 0,5 W/m²K — ideale per zone climatiche E-F (Nord Italia, Appennini)</li>
</ul>

<h3>3. La ferramenta</h3>
<p>Una ferramenta di qualità (Roto, Maco, Siegenia) costa di più ma garantisce apertura e chiusura precisa per decenni. Le ferramenta economiche si usurano rapidamente, richiedendo regolazioni frequenti e sostituzione nel giro di 7-10 anni.</p>

<h3>4. Produzione diretta vs intermediari</h3>
<p>Un serramento acquistato da un rivenditore ha già subito due o tre margini di markup. Acquistare direttamente dal produttore — come ThermoDMR — elimina questi intermediari e riduce il prezzo finale del 20-35%.</p>

<h2>Prezzi indicativi finestre PVC 2025 (per misura standard 120×140 cm)</h2>
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
    title: "Bonus Finestre 2025: Detrazione 50% Irpef — Come Funziona e Come Ottenerla",
    description: "Guida completa al Bonus Finestre 2025: detrazione 50% Irpef per sostituzione serramenti. Requisiti, documenti, procedure e massimale di spesa aggiornati.",
    date: "2025-04-05",
    category: "Incentivi & Bonus",
    readingTime: 10,
    content: `
<h2>Cos'è il Bonus Finestre 2025?</h2>
<p>Il <strong>Bonus Finestre 2025</strong> è un incentivo fiscale che permette di detrarre il <strong>50% della spesa</strong> sostenuta per la sostituzione di finestre, portefinestre e infissi. Rientra nel perimetro del Bonus Ristrutturazioni (art. 16-bis del TUIR) ed è confermato anche per l'anno in corso dalla Legge di Bilancio.</p>
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
    title: "Doppio Vetro vs Triplo Vetro: Quale Scegliere nel 2025?",
    description: "Confronto tecnico tra finestre a doppio e triplo vetro: differenze di isolamento, costi, peso e quando vale davvero la pena scegliere il triplo. Guida 2025.",
    date: "2025-04-03",
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
    title: "Sostituzione Finestre in Ristrutturazione: Guida Completa 2025",
    description: "Come sostituire le finestre durante una ristrutturazione: tempistiche, ordine dei lavori, scelta del serramento giusto e come evitare gli errori più comuni.",
    date: "2025-04-01",
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
<p>Per una ristrutturazione in zona climatica D-E (tutta l'Italia settentrionale e centrale), la scelta ottimale nel 2025 è:</p>
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
    title: "Come Scegliere le Finestre: Guida all'Acquisto 2025 Senza Errori",
    description: "Guida completa per scegliere le finestre giuste nel 2025: materiali, vetri, aperture, colori e certificazioni. Tutto quello che devi sapere prima di comprare.",
    date: "2025-03-28",
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
  <li><strong>Colori RAL</strong> (grigio antracite 7016, beige, marrone) — i più richiesti nel 2024-2025</li>
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
];

// ─────────────────────────────────────────────────────────────────────────────
// ARTICOLI RUMENI
// ─────────────────────────────────────────────────────────────────────────────
const roPosts: BlogPost[] = [
  {
    slug: "ferestre-pvc-profil-german-ghid-complet",
    lang: "ro",
    title: "Ferestre PVC cu Profil German: Ghid Complet 2025",
    description: "Ce sunt ferestrele PVC cu profil german? Avantaje, camere, certificări și de ce costă mai puțin decât crezi. Ghid actualizat 2025.",
    date: "2025-03-10",
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
    date: "2025-03-20",
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
    date: "2025-04-01",
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
    title: "Ferestre PVC Prețuri 2025: Cât Costă și Cum Eviți să Plătești Prea Mult",
    description: "Prețuri reale ferestre PVC 2025: de la geam dublu la triplu. Ce influențează costul, cum compari ofertele și cum economisești fără să sacrifici calitatea.",
    date: "2025-04-07",
    category: "Prețuri & Oferte",
    readingTime: 12,
    content: `
<h2>De ce prețurile ferestrelor PVC variază atât de mult?</h2>
<p>Cauți <strong>ferestre PVC prețuri 2025</strong> și găsești oferte între 300 lei și 2.500 lei pe fereastră. Cum este posibilă o diferență atât de mare? Răspunsul stă în patru variabile: calitatea profilului, tipul de geam, feroneria și proveniența producției.</p>
<p>Înțelegând aceste variabile poți compara ofertele în mod inteligent — și să nu cazi în capcana prețului mic care ascunde costuri de întreținere ridicate pe termen lung.</p>

<h2>Factorii care determină prețul unei ferestre PVC</h2>
<h3>1. Profilul: camere și grosime</h3>
<p>Profilul PVC este structura portantă a ferestrei. Un profil cu 5 camere oferă performanțe termice net superioare față de unul cu 3 camere, la un cost marginal mai ridicat. Diferența de preț între un profil 3 camere și unul cu 5 camere este adesea de doar 50-100 lei per fereastră — o investiție care se recuperează în 2-3 ani din facturi.</p>
<p>ThermoDMR utilizează profile germane cu 5 camere ca standard pe toată gama, cu opțiunea de 6 camere pentru linia DMR Passive.</p>

<h3>2. Geamul: dublu sau triplu?</h3>
<p>Termopanul este locul unde se câștigă sau se pierde bătălia energetică. Opțiunile principale pentru 2025:</p>
<ul>
  <li><strong>Geam dublu 4/16/4 cu argon și coating low-e</strong> — Ug ≈ 1,0 W/m²K — standard ThermoDMR</li>
  <li><strong>Geam dublu 4/20/4 cu kripton</strong> — Ug ≈ 0,7 W/m²K — performanță de triplu vitraj la cost inferior</li>
  <li><strong>Geam triplu 4/12/4/12/4</strong> — Ug ≈ 0,5 W/m²K — ideal pentru zone climatice reci (Moldova, Ardeal, Bucovina)</li>
</ul>

<h3>3. Feroneria</h3>
<p>O feronerie de calitate (Roto, Maco, Siegenia) costă mai mult dar garantează deschidere și închidere precisă pentru decenii. Feroneria ieftină se uzează rapid, necesitând reglaje frecvente și înlocuire în 7-10 ani.</p>

<h3>4. Producție directă vs intermediari</h3>
<p>O fereastră cumpărată de la un distribuitor a trecut deja prin două-trei marje de adaos. Cumpărând direct de la producător — ca ThermoDMR — elimini acești intermediari și reduci prețul final cu 20-35%.</p>

<h2>Prețuri orientative ferestre PVC 2025 (pentru dimensiune standard 120×140 cm)</h2>
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
    title: "Finanțare Ferestre PVC 2025: Programe și Fonduri pentru Renovare Termică",
    description: "Ghid complet programe finanțare renovare termică România 2025: Casa Verde, fonduri europene, deduceri fiscale. Condiții, documente și cum accesezi ajutoarele.",
    date: "2025-04-05",
    category: "Finanțare & Subvenții",
    readingTime: 10,
    content: `
<h2>De ce să nu aștepți pentru a-ți schimba ferestrele</h2>
<p>Schimbarea ferestrelor vechi cu unele PVC de înaltă eficiență nu este un lux — este o investiție cu returnare măsurabilă. Iar în 2025, există mai multe programe de finanțare disponibile în România care pot acoperi o parte semnificativă din cost.</p>
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

<h2>Fonduri europene pentru renovare energetică 2025</h2>
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
    title: "Geam Dublu vs Geam Triplu: Care Alegi în 2025?",
    description: "Comparație tehnică completă geam dublu vs triplu: izolare, costuri, greutate și când merită cu adevărat să alegi termopanul triplu. Ghid 2025.",
    date: "2025-04-03",
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
    title: "Înlocuire Ferestre la Renovare: Ghid Complet 2025 pentru România",
    description: "Cum înlocuiești ferestrele în timpul unei renovări: etape, ordinea lucrărilor, alegerea tâmplăriei potrivite și cum eviți greșelile cele mai frecvente. Ghid 2025.",
    date: "2025-04-01",
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
<p>Pentru o renovare în zone climatice temperate-reci (Transilvania, Moldova, Bucovina, nordul Munteniei), alegerea optimă în 2025 este:</p>
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
    title: "Cum Alegi Ferestrele: Ghid Complet de Cumpărare 2025 Fără Greșeli",
    description: "Ghid complet pentru alegerea ferestrelor potrivite în 2025: materiale, geamuri, tipuri de deschidere, culori și certificări. Tot ce trebuie să știi înainte să cumperi.",
    date: "2025-03-28",
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
  <li><strong>Culori RAL</strong> (gri antracit 7016, bej, maro) — cele mai solicitate în 2024-2025</li>
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
];

// ─────────────────────────────────────────────────────────────────────────────
// Export
// ─────────────────────────────────────────────────────────────────────────────
export const allBlogPosts: BlogPost[] = [...itPosts, ...roPosts];

export const getBlogPostsByLang = (lang: "it" | "ro"): BlogPost[] =>
  allBlogPosts.filter((p) => p.lang === lang);

export const getBlogPostBySlug = (slug: string, lang: "it" | "ro"): BlogPost | undefined =>
  allBlogPosts.find((p) => p.slug === slug && p.lang === lang);
