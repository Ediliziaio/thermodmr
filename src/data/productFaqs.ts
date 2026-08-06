/**
 * FAQ prodotto — fonte unica per:
 *  - sezione FAQ visibile nelle pagine prodotto (ProductFaq.tsx)
 *  - schema FAQPage + contenuto crawler iniettati da functions/_middleware.ts
 * Le risposte devono restare identiche a ciò che l'utente vede in pagina
 * (linee guida Google: niente schema su contenuto non visibile).
 */

export interface ProductFaqItem {
  q: string;
  a: string;
}

/** Chiave = pathname della pagina prodotto (IT e RO). */
export const productFaqs: Record<string, ProductFaqItem[]> = {
  // ── ITALIANO ──────────────────────────────────────────────────────────────
  "/prodotti/dmr-confort": [
    { q: "Quanto costa una finestra DMR Confort?", a: "Il prezzo dipende da misure, tipo di vetro e apertura. Grazie alla produzione diretta senza intermediari, i prezzi sono da fabbrica: richiedi un preventivo gratuito e ricevi la quotazione esatta entro 24 ore." },
    { q: "La DMR Confort rientra nel bonus infissi?", a: "Sì. Con Uf = 0,95 W/m²K e vetri basso-emissivi, la DMR Confort rispetta i requisiti di trasmittanza per la detrazione fiscale del 50% (Bonus Ristrutturazione). ThermoDMR fornisce la documentazione tecnica per la pratica ENEA." },
    { q: "Quali sono i tempi di consegna della DMR Confort?", a: "Mediamente 2-6 settimane dalla conferma dell'ordine, perché produciamo direttamente senza passaggi intermedi. Ogni finestra è realizzata su misura con profilo Tecnolegno effetto legno a 5 camere." },
  ],
  "/prodotti/dmr-domus": [
    { q: "Quanto costa una finestra DMR Domus?", a: "Il costo varia in base a dimensioni, doppio o triplo vetro e colore. I prezzi sono di fabbrica grazie alla produzione diretta: compila il modulo contatti e ricevi un preventivo gratuito su misura entro 24 ore." },
    { q: "La DMR Domus è adatta alla sostituzione in ristrutturazione?", a: "Sì, è il modello più scelto per le ristrutturazioni: design classico, Classe energetica A e posa su controtelaio esistente. Rispetta i requisiti per la detrazione fiscale del 50%." },
    { q: "Che differenza c'è tra DMR Domus e DMR Confort?", a: "La DMR Domus ha un design classico ad alta efficienza con doppio o triplo vetro; la DMR Confort aggiunge il profilo Tecnolegno effetto legno. Entrambe sono in Classe A con garanzia 15 anni." },
  ],
  "/prodotti/dmr-passive": [
    { q: "Quando conviene la finestra DMR Passive?", a: "Conviene per case passive, nuove costruzioni in classe A+ e zone climatiche rigide: con triplo vetro e gas argon raggiunge Uw ≤ 0,8 W/m²K, il valore richiesto dallo standard casa passiva." },
    { q: "Quanto costa una finestra per casa passiva?", a: "Una finestra certificata per casa passiva costa circa il 20-30% in più di una doppio vetro equivalente, ma il maggior costo si recupera con il risparmio energetico. Richiedi un preventivo gratuito con calcolo personalizzato." },
    { q: "Il triplo vetro della DMR Passive riduce anche il rumore?", a: "Il triplo vetro migliora soprattutto l'isolamento termico. Per l'abbattimento acustico spinto consigliamo la configurazione con vetri asimmetrici e stratificati, disponibile su richiesta." },
  ],
  "/prodotti/portoncini": [
    { q: "I portoncini ThermoDMR sono sicuri?", a: "Sì: struttura rinforzata, cerniere di sicurezza e serratura multipunto. Al livello di sicurezza si somma l'isolamento termoacustico del PVC con profilo tedesco, certificato CE." },
    { q: "Il portoncino d'ingresso rientra nel bonus infissi?", a: "Sì, il portoncino d'ingresso rientra nella detrazione fiscale del 50% se soddisfa i requisiti di trasmittanza della zona climatica. ThermoDMR fornisce la scheda tecnica con il valore Uw per la pratica ENEA." },
    { q: "Posso personalizzare colore e vetri del portoncino?", a: "Sì: colori RAL, finiture effetto legno, pannelli ciechi o vetrati con vetro stratificato di sicurezza. Ogni portoncino è prodotto su misura con consegna media in 2-6 settimane." },
  ],
  "/prodotti/tapparelle": [
    { q: "Quanto fanno risparmiare le tapparelle coibentate?", a: "Fino al 30% sui costi di climatizzazione rispetto alle tapparelle tradizionali: le lamelle in alluminio con schiuma poliuretanica creano una barriera termica aggiuntiva davanti al serramento." },
    { q: "Meglio tapparelle in alluminio o in PVC?", a: "L'alluminio coibentato offre più resistenza e sicurezza anti-intrusione; il PVC è più economico a parità di isolamento. Ti aiutiamo a scegliere in base a esposizione, dimensioni e budget." },
    { q: "Le tapparelle si possono motorizzare?", a: "Sì, tutte le tapparelle ThermoDMR sono predisposte per la motorizzazione con comando a muro, telecomando o integrazione domotica smartphone." },
  ],
  "/prodotti/cassonetti": [
    { q: "A cosa serve il cassonetto coibentato?", a: "Elimina il principale ponte termico della finestra: il vano tapparella. Il cassonetto in EPS ad alta densità blocca dispersioni e spifferi, riducendo condensa e muffa sulla parete." },
    { q: "Il cassonetto coibentato è detraibile?", a: "Sì, se installato insieme alla sostituzione delle finestre rientra nello stesso intervento agevolato con detrazione del 50%. ThermoDMR fornisce la documentazione per la pratica." },
    { q: "Si può sostituire solo il cassonetto senza cambiare la finestra?", a: "Sì, il cassonetto può essere sostituito anche da solo: è un intervento rapido che migliora subito l'isolamento. Il beneficio massimo si ottiene però abbinandolo a serramenti in Classe A." },
  ],
  "/prodotti/persiane": [
    { q: "Meglio persiane in PVC o in alluminio?", a: "Il PVC offre il miglior rapporto qualità/prezzo e non richiede manutenzione; l'alluminio garantisce massima resistenza agli urti e agli agenti atmosferici. Entrambe sono disponibili in tutti i colori RAL." },
    { q: "Le persiane ThermoDMR richiedono manutenzione?", a: "No: né il PVC né l'alluminio verniciato a polvere richiedono verniciatura periodica. Basta pulizia con acqua e detergente neutro. La garanzia è di 15 anni come per tutti i prodotti ThermoDMR." },
    { q: "Posso montare le persiane su una casa in centro storico?", a: "Sì: le persiane sono disponibili in colori RAL e finiture effetto legno conformi alle richieste tipiche dei regolamenti comunali. Verifica il colore richiesto dal tuo comune e lo produciamo su misura." },
  ],

  // ── ROMÂNĂ ────────────────────────────────────────────────────────────────
  "/ro/produse/dmr-confort": [
    { q: "Cât costă o fereastră DMR Confort?", a: "Prețul depinde de dimensiuni, tipul de geam și deschidere. Datorită producției directe fără intermediari, prețurile sunt de fabrică: solicită o ofertă gratuită și primești calculul exact în 24 de ore." },
    { q: "DMR Confort se califică pentru programele de finanțare?", a: "Da. Cu Uf = 0,95 W/m²K și geamuri Low-E, DMR Confort respectă cerințele de transmitanță pentru programele de reabilitare termică. ThermoDMR furnizează documentația tehnică necesară." },
    { q: "Care sunt termenele de livrare pentru DMR Confort?", a: "În medie 2-6 săptămâni de la confirmarea comenzii, deoarece producem direct, fără intermediari. Fiecare fereastră este realizată la comandă cu profil Tecnolegno efect lemn cu 5 camere." },
  ],
  "/ro/produse/dmr-domus": [
    { q: "Cât costă o fereastră DMR Domus?", a: "Costul variază în funcție de dimensiuni, geam dublu sau triplu și culoare. Prețurile sunt de fabrică datorită producției directe: completează formularul de contact și primești oferta gratuită în 24 de ore." },
    { q: "DMR Domus este potrivită pentru renovări?", a: "Da, este modelul preferat pentru renovări: design clasic, clasă energetică A și montaj pe toc existent. Respectă cerințele programelor de finanțare pentru reabilitare termică." },
    { q: "Care este diferența dintre DMR Domus și DMR Confort?", a: "DMR Domus are un design clasic de înaltă eficiență cu geam dublu sau triplu; DMR Confort adaugă profilul Tecnolegno cu efect de lemn. Ambele sunt clasa A cu garanție 15 ani." },
  ],
  "/ro/produse/dmr-passive": [
    { q: "Când merită fereastra DMR Passive?", a: "Merită pentru case pasive, construcții noi clasa A+ și zone climatice reci: cu geam triplu și gaz argon atinge Uw ≤ 0,8 W/m²K, valoarea cerută de standardul casei pasive." },
    { q: "Cât costă o fereastră pentru casă pasivă?", a: "O fereastră certificată pentru casă pasivă costă cu circa 20-30% mai mult decât una echivalentă cu geam dublu, dar diferența se recuperează prin economia de energie. Solicită oferta gratuită cu calcul personalizat." },
    { q: "Geamul triplu al DMR Passive reduce și zgomotul?", a: "Geamul triplu îmbunătățește în special izolarea termică. Pentru atenuare acustică superioară recomandăm configurația cu foi asimetrice și laminate, disponibilă la cerere." },
  ],
  "/ro/produse/usi-intrare": [
    { q: "Ușile de intrare ThermoDMR sunt sigure?", a: "Da: structură ranforsată, balamale de siguranță și încuietoare multipunct. La nivelul de securitate se adaugă izolarea termoacustică a PVC-ului cu profil german, certificat CE." },
    { q: "Ușa de intrare se califică pentru finanțare?", a: "Da, ușa de intrare intră în programele de reabilitare termică dacă respectă cerințele de transmitanță. ThermoDMR furnizează fișa tehnică cu valoarea Uw pentru dosar." },
    { q: "Pot personaliza culoarea și geamurile ușii?", a: "Da: culori RAL, finisaje efect lemn, panouri pline sau vitrate cu sticlă laminată de siguranță. Fiecare ușă este produsă la comandă cu livrare medie în 2-6 săptămâni." },
  ],
  "/ro/produse/jaluzele": [
    { q: "Cât economisesc rulourile termoizolante?", a: "Până la 30% din costurile de climatizare față de rulourile tradiționale: lamelele din aluminiu cu spumă poliuretanică creează o barieră termică suplimentară în fața ferestrei." },
    { q: "Rulouri din aluminiu sau din PVC?", a: "Aluminiul termoizolant oferă mai multă rezistență și siguranță anti-efracție; PVC-ul este mai economic la izolare egală. Te ajutăm să alegi în funcție de expunere, dimensiuni și buget." },
    { q: "Rulourile pot fi motorizate?", a: "Da, toate rulourile ThermoDMR sunt pregătite pentru motorizare cu comandă pe perete, telecomandă sau integrare smart home pe smartphone." },
  ],
  "/ro/produse/casete-rulou": [
    { q: "La ce folosește caseta termoizolantă?", a: "Elimină principala punte termică a ferestrei: nișa ruloului. Caseta din EPS de înaltă densitate blochează pierderile de căldură și curentul, reducând condensul și mucegaiul de pe perete." },
    { q: "Caseta termoizolantă se califică pentru finanțare?", a: "Da, dacă este instalată împreună cu înlocuirea ferestrelor intră în aceeași lucrare eligibilă pentru programele de reabilitare termică. ThermoDMR furnizează documentația necesară." },
    { q: "Pot înlocui doar caseta, fără să schimb fereastra?", a: "Da, caseta poate fi înlocuită și separat: este o intervenție rapidă care îmbunătățește imediat izolarea. Beneficiul maxim se obține însă împreună cu ferestre clasa A." },
  ],
  "/ro/produse/obloane": [
    { q: "Obloane din PVC sau din aluminiu?", a: "PVC-ul oferă cel mai bun raport calitate/preț și nu necesită întreținere; aluminiul garantează rezistență maximă la lovituri și intemperii. Ambele sunt disponibile în toate culorile RAL." },
    { q: "Obloanele ThermoDMR necesită întreținere?", a: "Nu: nici PVC-ul, nici aluminiul vopsit în câmp electrostatic nu necesită revopsire periodică. Este suficientă curățarea cu apă și detergent neutru. Garanția este de 15 ani." },
    { q: "Pot monta obloanele pe o casă din zonă protejată?", a: "Da: obloanele sunt disponibile în culori RAL și finisaje efect lemn conforme cu cerințele tipice ale regulamentelor locale. Verifică culoarea cerută și o producem la comandă." },
  ],
};

export const getProductFaqs = (pathname: string): ProductFaqItem[] =>
  productFaqs[pathname] ?? [];
