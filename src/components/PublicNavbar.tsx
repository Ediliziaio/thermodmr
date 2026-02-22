import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo_Thermodmr.png";

const navLinks = [
  { label: "Chi Siamo", to: "/chi-siamo" },
  { label: "Prodotti", to: "/prodotti-pubblico" },
  { label: "Vantaggi", to: "/vantaggi" },
  { label: "Garanzie", to: "/garanzie" },
  { label: "Contatti", to: "/contatti" },
];

const PublicNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white border-b border-[hsl(0,0%,90%)] shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/">
          <img src={logo} alt="ThermoDMR" className="h-10 object-contain" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => {
            const isActive = location.pathname === item.to;
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
              className="bg-[hsl(195,85%,45%)] hover:bg-[hsl(195,85%,38%)] text-white font-semibold rounded-full px-6 shadow-[0_4px_20px_hsl(195,85%,45%,0.3)]"
            >
              Area Riservata
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

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-[hsl(0,0%,90%)] shadow-lg">
          <div className="px-6 py-4 space-y-3">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={`block w-full text-left text-sm font-medium py-2 ${
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
