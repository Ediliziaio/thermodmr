import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo_Thermodmr.png";
import WhatsAppFloating from "@/components/WhatsAppFloating";

const productLinks = [
  { label: "Finestre in PVC", to: "/prodotti-pubblico" },
  { label: "DMR Confort", to: "/prodotti/dmr-confort" },
  { label: "DMR Domus", to: "/prodotti/dmr-domus" },
  { label: "DMR Passive", to: "/prodotti/dmr-passive" },
  { label: "Portoncini", to: "/prodotti/portoncini" },
  { label: "Cassonetti", to: "/prodotti/cassonetti" },
  { label: "Tapparelle", to: "/prodotti/tapparelle" },
  { label: "Persiane", to: "/prodotti/persiane" },
];

const navLinks = [
  { label: "Chi Siamo", to: "/chi-siamo" },
  { label: "Prodotti", to: "/prodotti-pubblico", hasDropdown: true },
  { label: "Vantaggi", to: "/vantaggi" },
  { label: "Garanzie", to: "/garanzie" },
  { label: "Diventa Rivenditore", to: "/diventa-rivenditore" },
  { label: "Contatti", to: "/contatti" },
];

const PublicNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout>>();
  const location = useLocation();


  const isProductPage = location.pathname.startsWith("/prodotti");

  // Close desktop dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDesktopDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleDropdownEnter = () => {
    clearTimeout(dropdownTimeout.current);
    setDesktopDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setDesktopDropdownOpen(false), 150);
  };

  return (
    <>
    <nav className="fixed top-0 inset-x-0 z-50 bg-white border-b border-[hsl(0,0%,90%)] shadow-sm" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        <Link to="/">
          <img src={logo} alt="ThermoDMR" className="h-9 sm:h-10 object-contain" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((item) => {
            const isActive = item.hasDropdown
              ? isProductPage
              : location.pathname === item.to;

            if (item.hasDropdown) {
              return (
                <div
                  key={item.to}
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                >
                  <Link
                    to={item.to}
                    className={`relative text-sm font-medium transition-colors pb-1 inline-flex items-center gap-1 ${
                      isActive
                        ? "text-[hsl(195,85%,45%)]"
                        : "text-[hsl(0,0%,35%)] hover:text-[hsl(195,85%,45%)]"
                    }`}
                  >
                    {item.label}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${desktopDropdownOpen ? "rotate-180" : ""}`} />
                    {isActive && (
                      <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-[hsl(195,85%,45%)]" />
                    )}
                  </Link>

                  {desktopDropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-56">
                      <div className="bg-white rounded-xl border border-[hsl(0,0%,90%)] shadow-xl py-2 z-50">
                        {productLinks.map((pl) => (
                          <Link
                            key={pl.to}
                            to={pl.to}
                            className={`block px-4 py-2.5 text-sm transition-colors ${
                              location.pathname === pl.to
                                ? "text-[hsl(195,85%,45%)] bg-[hsl(195,85%,45%,0.05)] font-semibold"
                                : "text-[hsl(0,0%,35%)] hover:text-[hsl(195,85%,45%)] hover:bg-[hsl(0,0%,97%)]"
                            }`}
                            onClick={() => setDesktopDropdownOpen(false)}
                          >
                            {pl.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative text-sm font-medium transition-colors pb-1 ${
                  isActive
                    ? "text-[hsl(195,85%,45%)]"
                    : "text-[hsl(0,0%,35%)] hover:text-[hsl(195,85%,45%)]"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-[hsl(195,85%,45%)]" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <Link to="/auth">
            <Button
              size="sm"
              className="bg-[hsl(195,85%,45%)] hover:bg-[hsl(195,85%,38%)] text-white font-semibold rounded-full px-4 md:px-6 shadow-[0_4px_20px_hsl(195,85%,45%,0.3)] min-h-[44px]"
            >
              <span className="md:hidden">Accedi</span>
              <span className="hidden md:inline">Area Riservata</span>
            </Button>
          </Link>
          <button
            className="md:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Chiudi menu" : "Apri menu"}
          >
            {mobileOpen ? (
              <X className="h-6 w-6 text-[hsl(0,0%,20%)]" />
            ) : (
              <Menu className="h-6 w-6 text-[hsl(0,0%,20%)]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile overlay + menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Dark overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 top-[57px] bg-black/40 z-40"
              onClick={() => setMobileOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="md:hidden fixed top-[57px] inset-x-0 bg-white border-t border-[hsl(0,0%,90%)] shadow-xl z-50 max-h-[calc(100vh-57px)] overflow-y-auto"
            >
              <div className="px-5 py-4 space-y-0.5">
                {navLinks.map((item, idx) => {

                  const isActive = item.hasDropdown
                    ? isProductPage
                    : location.pathname === item.to;

                  if (item.hasDropdown) {
                    return (
                      <div key={item.to}>
                        <button
                          onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                          className={`flex items-center justify-between w-full text-left text-sm font-medium min-h-[48px] px-2 rounded-xl transition-colors ${
                            isActive
                              ? "text-[hsl(195,85%,45%)] font-bold bg-[hsl(195,85%,45%,0.05)]"
                              : "text-[hsl(0,0%,20%)] active:bg-[hsl(0,0%,95%)]"
                          }`}
                        >
                          {item.label}
                          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileProductsOpen ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                          {mobileProductsOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 pb-2 space-y-0.5 border-l-2 border-[hsl(195,85%,45%)]/20 ml-4 mt-1">
                                {productLinks.map((pl) => (
                                  <Link
                                    key={pl.to}
                                    to={pl.to}
                                    onClick={() => setMobileOpen(false)}
                                    className={`block text-sm min-h-[44px] flex items-center px-3 rounded-lg transition-colors ${
                                      location.pathname === pl.to
                                        ? "text-[hsl(195,85%,45%)] font-semibold bg-[hsl(195,85%,45%,0.05)]"
                                        : "text-[hsl(0,0%,40%)] active:bg-[hsl(0,0%,95%)]"
                                    }`}
                                  >
                                    {pl.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        {idx < navLinks.length - 1 && (
                          <div className="h-px bg-[hsl(0,0%,92%)] mx-2" />
                        )}
                      </div>
                    );
                  }

                  return (
                    <div key={item.to}>
                      <Link
                        to={item.to}
                        onClick={() => setMobileOpen(false)}
                        className={`block w-full text-left text-sm font-medium min-h-[48px] flex items-center px-2 rounded-xl transition-colors ${
                          isActive
                            ? "text-[hsl(195,85%,45%)] font-bold bg-[hsl(195,85%,45%,0.05)]"
                            : "text-[hsl(0,0%,20%)] active:bg-[hsl(0,0%,95%)]"
                        }`}
                      >
                        {item.label}
                      </Link>
                      {idx < navLinks.length - 1 && (
                        <div className="h-px bg-[hsl(0,0%,92%)] mx-2" />
                      )}
                    </div>
                  );
                })}

                {/* Mobile CTA */}
                <div className="pt-3 mt-2 border-t border-[hsl(0,0%,92%)]">
                  <a href="/#contatti" onClick={() => setMobileOpen(false)}>
                    <Button
                      className="w-full bg-[hsl(195,85%,45%)] hover:bg-[hsl(195,85%,38%)] text-white font-semibold rounded-full min-h-[48px] shadow-[0_4px_20px_hsl(195,85%,45%,0.3)]"
                    >
                      Richiedi Preventivo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
    <WhatsAppFloating />
    </>
  );
};

export default PublicNavbar;
