import { useLocation } from "react-router-dom";
import { HelpCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { getProductFaqs } from "@/data/productFaqs";

/**
 * Sezione FAQ visibile nelle pagine prodotto.
 * Le domande/risposte arrivano da src/data/productFaqs.ts — la stessa fonte
 * usata dal middleware per lo schema FAQPage: mantenerle allineate.
 */
const ProductFaq = () => {
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const faqs = getProductFaqs(pathname);

  if (faqs.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 bg-[hsl(0,0%,97%)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-[hsl(0,0%,10%)] mb-8 sm:mb-10 text-center">
          {lang === "ro" ? "Întrebări frecvente" : "Domande frequenti"}
        </h2>
        <div className="space-y-4">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group bg-white rounded-2xl border border-[hsl(0,0%,90%)] shadow-sm open:shadow-md transition-shadow"
            >
              <summary className="flex items-center gap-3 cursor-pointer list-none p-5 sm:p-6 font-semibold text-[hsl(0,0%,10%)] [&::-webkit-details-marker]:hidden">
                <HelpCircle className="h-5 w-5 text-[hsl(195,85%,45%)] shrink-0" />
                <span className="flex-1">{f.q}</span>
                <span className="text-[hsl(195,85%,45%)] transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <p className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 text-[hsl(0,0%,40%)] leading-relaxed text-sm sm:text-base">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductFaq;
