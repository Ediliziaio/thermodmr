import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo_Thermodmr.png";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  FileText,
  LogOut,
  Menu,
  Headphones,
} from "lucide-react";
import { useOpenTicketsCount } from "@/hooks/useTickets";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import { GlobalSearch } from "@/components/GlobalSearch";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Translations } from "@/i18n/translations";

interface LayoutProps {
  children: ReactNode;
}

const getNavigation = (t: Translations) => [
  { name: t.area.nav.dashboard, href: "/", icon: LayoutDashboard, roles: ["super_admin", "commerciale", "rivenditore"] },
  { name: t.area.nav.ordini, href: "/ordini", icon: ShoppingCart, roles: ["super_admin", "commerciale", "rivenditore"] },
  { name: t.area.nav.preventivi, href: "/preventivi", icon: FileText, roles: ["super_admin"] },
  { name: t.area.nav.rivenditori, href: "/rivenditori", icon: Users, roles: ["super_admin", "commerciale"] },
  { name: t.area.nav.pagamenti, href: "/pagamenti", icon: CreditCard, roles: ["super_admin", "commerciale"] },
  { name: t.area.nav.assistenza, href: "/assistenza", icon: Headphones, roles: ["super_admin"] },
  { name: t.area.nav.kpi, href: "/kpi", icon: BarChart3, roles: ["super_admin"] },
  { name: t.area.nav.impostazioni, href: "/impostazioni", icon: Settings, roles: ["super_admin"] },
];

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { user, userRole, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, lang, setLang } = useLanguage();
  const isSuperAdmin = userRole === "super_admin";
  const { data: openTicketsCount = 0 } = useOpenTicketsCount(isSuperAdmin);
  const showTicketsBadge = isSuperAdmin && openTicketsCount > 0;

  const navigation = getNavigation(t);

  const getRoleLabel = (role: string | null) => {
    switch (role) {
      case "super_admin": return t.area.roles.superAdmin;
      case "commerciale": return t.area.roles.commerciale;
      case "rivenditore": return t.area.roles.rivenditore;
      default: return t.area.roles.utente;
    }
  };

  const getInitials = (email: string) => email.substring(0, 2).toUpperCase();

  const SidebarContent = ({ onNavigate }: { onNavigate?: () => void }) => (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b px-6">
        <img src={logo} alt="ThermoDMR" className="h-9 object-contain" width={160} height={36} loading="eager" />
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {navigation
          .filter((item) => !item.roles || item.roles.includes(userRole || ""))
          .map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={onNavigate}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
                {item.href === "/assistenza" && showTicketsBadge && (
                  <span className="ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs font-bold px-1.5">
                    {openTicketsCount}
                  </span>
                )}
              </Link>
            );
          })}
      </nav>
      <div className="border-t p-4">
        <div className="flex items-center gap-3 mb-3">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user?.email ? getInitials(user.email) : "??"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium">
              {user?.user_metadata?.display_name || user?.email || t.area.roles.utente}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {getRoleLabel(userRole)}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="w-full justify-start" onClick={signOut}>
          <LogOut className="mr-2 h-4 w-4" />
          {t.area.nav.esci}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <aside className="hidden md:flex fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card">
        <SidebarContent />
      </aside>
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent onNavigate={() => setIsMobileMenuOpen(false)} />
        </SheetContent>
      </Sheet>
      <div className="md:pl-64">
        <div className="sticky top-0 z-10 bg-background border-b px-4 md:px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex-1 max-w-2xl">
              <GlobalSearch />
            </div>
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
          </div>
        </div>
        <main className="min-h-screen p-8">{children}</main>
      </div>
    </div>
  );
}
