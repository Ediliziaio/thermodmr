import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  ShoppingCart,
  CreditCard,
  LogOut,
  Menu,
  Eye,
  Headphones,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/i18n/LanguageContext";

interface DealerAreaLayoutProps {
  children: ReactNode;
  dealerId: string;
  dealerName?: string;
}

export function DealerAreaLayout({ children, dealerId, dealerName }: DealerAreaLayoutProps) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, lang, setLang } = useLanguage();

  const basePath = `/rivenditori/${dealerId}/area`;

  const navigation = [
    { name: t.area.nav.dashboard, href: basePath, icon: LayoutDashboard },
    { name: t.area.nav.preventivi, href: `${basePath}/preventivi`, icon: FileText },
    { name: t.area.nav.ordini, href: `${basePath}/ordini`, icon: ShoppingCart },
    { name: t.area.nav.pagamenti, href: `${basePath}/pagamenti`, icon: CreditCard },
    { name: t.area.nav.assistenza, href: `${basePath}/assistenza`, icon: Headphones },
  ];

  const isActive = (href: string) => {
    if (href === basePath) {
      return location.pathname === basePath;
    }
    return location.pathname.startsWith(href);
  };

  const SidebarContent = ({ onNavigate }: { onNavigate?: () => void }) => (
    <div className="flex h-full flex-col">
      {/* Header with dealer info */}
      <div className="border-b px-6 py-4">
        <div className="flex items-center gap-2 mb-1">
          <Eye className="h-4 w-4 text-primary" />
          <Badge variant="secondary" className="text-xs">{t.area.dealerAreaLayout.vistaRivenditore}</Badge>
        </div>
        <h2 className="text-sm font-semibold truncate mt-2">
          {dealerName || t.area.roles.rivenditore}
        </h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {navigation.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Exit button */}
      <div className="border-t p-4">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
          asChild
        >
          <Link to="/rivenditori">
            <LogOut className="mr-2 h-4 w-4" />
            {t.area.dealerAreaLayout.esciArea}
          </Link>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Drawer */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent onNavigate={() => setIsMobileMenuOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="md:pl-64">
        {/* Top Bar */}
        <div className="sticky top-0 z-10 bg-background border-b px-4 md:px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {t.area.dealerAreaLayout.staiVisualizzando} <strong>{dealerName || t.area.roles.rivenditore}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setLang?.("it")}
                  className={cn("px-2 py-1 text-xs font-semibold rounded transition-colors", lang === "it" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent")}
                >
                  IT
                </button>
                <button
                  onClick={() => setLang?.("ro")}
                  className={cn("px-2 py-1 text-xs font-semibold rounded transition-colors", lang === "ro" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent")}
                >
                  RO
                </button>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/rivenditori">{t.area.dealerAreaLayout.esciArea}</Link>
              </Button>
            </div>
          </div>
        </div>

        <main className="min-h-screen p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
