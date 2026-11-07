// Explicit translated URLs: localized slugs differ between IT and RO.
export const blogTranslations: ReadonlyArray<readonly [string, string]> = [
  [
    "/blog/finestre-pvc-profilo-tedesco-guida-completa",
    "/ro/blog/ferestre-pvc-profil-german-ghid-complet"
  ],
  [
    "/blog/risparmio-energetico-finestre-pvc-quanto-si-risparmia",
    "/ro/blog/economie-energie-ferestre-pvc-calcul-real"
  ],
  [
    "/blog/tapparelle-coibentate-vs-tradizionali-differenze",
    "/ro/blog/jaluzele-termoizolante-vs-standard-diferente"
  ],
  [
    "/blog/finestre-pvc-prezzi",
    "/ro/blog/ferestre-pvc-preturi"
  ],
  [
    "/blog/bonus-finestre-detrazione-fiscale",
    "/ro/blog/program-reabilitare-termica-finantare-ferestre"
  ],
  [
    "/blog/doppio-vetro-vs-triplo-vetro-quale-scegliere",
    "/ro/blog/geam-dublu-vs-geam-triplu-care-alegi"
  ],
  [
    "/blog/sostituzione-finestre-ristrutturazione-guida",
    "/ro/blog/inlocuire-ferestre-renovare-casa-ghid-complet"
  ],
  [
    "/blog/come-scegliere-le-finestre-guida-acquisto",
    "/ro/blog/cum-alegi-ferestrele-ghid-cumparaturi"
  ],
  [
    "/blog/bonus-infissi-2026-detrazioni-finestre-pvc",
    "/ro/blog/bonus-tamplarie-2026-deduceri-ferestre-pvc"
  ],
  [
    "/blog/classe-energetica-casa-2026-finestre-pvc",
    "/ro/blog/clasa-energetica-casa-2026-ferestre-pvc"
  ],
  [
    "/blog/triplo-vetro-o-doppio-vetro-guida-2026",
    "/ro/blog/geam-triplu-sau-dublu-ghid-2026"
  ],
  [
    "/blog/finestre-pvc-o-alluminio-quale-scegliere",
    "/ro/blog/ferestre-pvc-sau-aluminiu-care-alegi"
  ],
  [
    "/blog/condensa-sulle-finestre-cause-rimedi",
    "/ro/blog/condens-pe-ferestre-cauze-remedii"
  ],
  [
    "/blog/finestre-insonorizzate-isolamento-acustico",
    "/ro/blog/ferestre-fonoizolante-izolare-fonica"
  ],
  [
    "/blog/finestre-pvc-o-legno-quale-scegliere",
    "/ro/blog/ferestre-pvc-sau-lemn-care-alegi"
  ]
];

export function translatedBlogPath(path: string, lang: "it" | "ro"): string | undefined {
  const clean = path.replace(/\/+$/, "");
  const pair = blogTranslations.find(([it, ro]) => it === clean || ro === clean);
  return pair?.[lang === "it" ? 0 : 1];
}

export function canonicalBlogPath(path: string): string | undefined {
  const clean = path.replace(/\/+$/, "");
  for (const [it, ro] of blogTranslations) {
    if (clean === it || clean === ro) return clean;
    if (clean === "/ro" + it) return ro;
    if (clean === ro.replace(/^\/ro/, "")) return it;
  }
  return undefined;
}
