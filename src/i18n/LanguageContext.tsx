import { createContext, useContext } from "react";
import { translations, Translations, Lang } from "./translations";

interface LanguageContextValue {
  lang: Lang;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "it",
  t: translations.it,
});

interface LanguageProviderProps {
  lang: Lang;
  children: React.ReactNode;
}

export const LanguageProvider = ({ lang, children }: LanguageProviderProps) => (
  <LanguageContext.Provider value={{ lang, t: translations[lang] }}>
    {children}
  </LanguageContext.Provider>
);

export const useLanguage = () => useContext(LanguageContext);
