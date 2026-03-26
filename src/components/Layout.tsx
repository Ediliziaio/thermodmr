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

interface LayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard, roles: ["super_admin", "commerciale", "rivenditore"] },
  { name: "Ordini", href: "/ordini", icon: ShoppingCart, roles: ["super_admin", "commerciale", "rivenditore"] },
  { name: "Preventivi", href: "/preventivi", icon: FileText, roles: ["super_admin"] },
  { name: "Rivenditori", href: "/rivenditori", icon: Users, roles: ["super_admin", "commerciale"] },
  { name: "Pagamenti", href: "/pagamenti", icon: CreditCard, roles: ["super_admin", "commerciale"] },
  { name: "Assistenza", href: "/assistenza", icon: Headphones, roles: ["super_admin"] },
  { name: "KPI", href: "/kpi", icon: BarChart3, roles: ["super_admin"] },
  
  { name: "Impostazioni", href: "/impostazioni", icon: Settings, roles: ["super_admin"] },
];

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { user, userRole, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Only super_admin sees the Assistenza menu — skip the query entirely for other roles
  const isSuperAdmin = userRole === "super_admin";
  const { data: openTicketsCount = 0 } = useOpenTicketsCount(isSuperAdmin);
  const showTicketsBadge = isSuperAdmin && openTicketsCount > 0;

  const getRoleLabel = (role: string | null) => {
    switch (role) {
      case "super_admin":
        return "Super Admin";
      case "commerciale":
        return "Commerciale";
      case "rivenditore":
        return "Rivenditore";
      default:
        return "Utente";
    }
  };

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  const SidebarContent = ({ onNavigate }: { onNavigate?: () => void }) => (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <img src={logo} alt="ThermoDMR" className="h-9 object-contain" width={160} height={36} loading="eager" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {navigation
          .filter((item) => !item.roles || item.roles.includes(userRole || ""))
          .map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
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
                {item.name === "Assistenza" && showTicketsBadge && (
                  <span className="ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs font-bold px-1.5">
                    {openTicketsCount}
                  </span>
                )}
              </Link>
            );
          })}
      </nav>

      {/* User Profile */}
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
              {user?.user_metadata?.display_name || user?.email || "Utente"}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {getRoleLabel(userRole)}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start"
          onClick={signOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Esci
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
            {/* Hamburger Menu - solo mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="flex-1 max-w-2xl">
              <GlobalSearch />
            </div>
            <div className="flex items-center gap-3" />
          </div>
        </div>
        
        <main className="min-h-screen p-8">{children}</main>
      </div>
    </div>
  );
}
