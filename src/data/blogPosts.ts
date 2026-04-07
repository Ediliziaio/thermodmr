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
];

// ─────────────────────────────────────────────────────────────────────────────
// Export
// ─────────────────────────────────────────────────────────────────────────────
export const allBlogPosts: BlogPost[] = [...itPosts, ...roPosts];

export const getBlogPostsByLang = (lang: "it" | "ro"): BlogPost[] =>
  allBlogPosts.filter((p) => p.lang === lang);

export const getBlogPostBySlug = (slug: string, lang: "it" | "ro"): BlogPost | undefined =>
  allBlogPosts.find((p) => p.slug === slug && p.lang === lang);
