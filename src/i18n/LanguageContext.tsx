import { createContext, useContext, useState } from "react";
import { translations, Translations, Lang } from "./translations";

interface LanguageContextValue {
  lang: Lang;
  t: Translations;
  setLang?: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "it",
  t: translations.it,
});

export const LanguageProvider = ({ lang, children }: { lang: Lang; children: React.ReactNode }) => (
  <LanguageContext.Provider value={{ lang, t: translations[lang] }}>
    {children}
  </LanguageContext.Provider>
);

export const DynamicLanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(
    () => (localStorage.getItem("thermodmr_area_lang") as Lang) || "it"
  );
  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("thermodmr_area_lang", newLang);
  };
  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
