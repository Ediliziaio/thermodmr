import { Link, useLocation } from "react-router-dom";
import { useState, useCallback, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo_Thermodmr.png";

const sectionMap: Record<string, string> = {
  "/chi-siamo": "chi-siamo",
  "/vantaggi": "vantaggi",
  "/garanzie": "garanzie",
  "/contatti": "contatti",
};

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

  const handleNavClick = useCallback((e: React.MouseEvent, to: string) => {
    const sectionId = sectionMap[to];
    if (!sectionId) return;
    if (location.pathname === "/") {
      e.preventDefault();
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  }, [location.pathname]);

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

  const handleDropdownEnter = () => {
    clearTimeout(dropdownTimeout.current);
    setDesktopDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setDesktopDropdownOpen(false), 150);
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white border-b border-[hsl(0,0%,90%)] shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/">
          <img src={logo} alt="ThermoDMR" className="h-10 object-contain" />
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
                onClick={(e) => handleNavClick(e, item.to)}
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
              className="bg-[hsl(195,85%,45%)] hover:bg-[hsl(195,85%,38%)] text-white font-semibold rounded-full px-4 md:px-6 shadow-[0_4px_20px_hsl(195,85%,45%,0.3)]"
            >
              <span className="md:hidden">Accedi</span>
              <span className="hidden md:inline">Area Riservata</span>
            </Button>
          </Link>
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="h-6 w-6 text-[hsl(0,0%,20%)]" />
            ) : (
              <Menu className="h-6 w-6 text-[hsl(0,0%,20%)]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-[hsl(0,0%,90%)] shadow-lg">
          <div className="px-6 py-4 space-y-1">
            {navLinks.map((item) => {
              const isActive = item.hasDropdown
                ? isProductPage
                : location.pathname === item.to;

              if (item.hasDropdown) {
                return (
                  <div key={item.to}>
                    <button
                      onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                      className={`flex items-center justify-between w-full text-left text-sm font-medium py-2.5 ${
                        isActive
                          ? "text-[hsl(195,85%,45%)] font-bold"
                          : "text-[hsl(0,0%,30%)]"
                      }`}
                    >
                      {item.label}
                      <ChevronDown className={`h-4 w-4 transition-transform ${mobileProductsOpen ? "rotate-180" : ""}`} />
                    </button>
                    {mobileProductsOpen && (
                      <div className="pl-4 pb-2 space-y-1 border-l-2 border-[hsl(195,85%,45%)]/20 ml-2">
                        {productLinks.map((pl) => (
                          <Link
                            key={pl.to}
                            to={pl.to}
                            onClick={() => setMobileOpen(false)}
                            className={`block text-sm py-2 ${
                              location.pathname === pl.to
                                ? "text-[hsl(195,85%,45%)] font-semibold"
                                : "text-[hsl(0,0%,40%)] hover:text-[hsl(195,85%,45%)]"
                            }`}
                          >
                            {pl.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={(e) => { handleNavClick(e, item.to); setMobileOpen(false); }}
                  className={`block w-full text-left text-sm font-medium py-2.5 ${
                    isActive
                      ? "text-[hsl(195,85%,45%)] font-bold"
                      : "text-[hsl(0,0%,30%)] hover:text-[hsl(195,85%,45%)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default PublicNavbar;
