import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Briefcase,
  CreditCard,
  TrendingUp,
  BarChart3,
  Settings,
  FileText,
  LogOut,
  Shield,
  Bell,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { GlobalSearch } from "@/components/GlobalSearch";

interface LayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard, roles: ["super_admin", "commerciale", "rivenditore"] },
  { name: "La Mia Dashboard", href: "/dashboard-commerciale", icon: TrendingUp, roles: ["commerciale"] },
  { name: "Ordini", href: "/ordini", icon: ShoppingCart, roles: ["super_admin", "commerciale", "rivenditore"] },
  { name: "Rivenditori", href: "/rivenditori", icon: Users, roles: ["super_admin", "commerciale"] },
  { name: "Commerciali", href: "/commerciali", icon: Briefcase, roles: ["super_admin"] },
  { name: "Pagamenti", href: "/pagamenti", icon: CreditCard, roles: ["super_admin", "commerciale"] },
  { name: "Provvigioni", href: "/provvigioni", icon: TrendingUp, roles: ["super_admin", "commerciale"] },
  { name: "KPI", href: "/kpi", icon: BarChart3, roles: ["super_admin"] },
  { name: "Audit", href: "/audit", icon: FileText, roles: ["super_admin"] },
  { name: "RLS Test", href: "/rls-test", icon: Shield, roles: ["super_admin"] },
  { name: "Impostazioni", href: "/impostazioni", icon: Settings, roles: ["super_admin", "commerciale", "rivenditore"] },
];

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { user, userRole, signOut } = useAuth();

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

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b px-6">
            <h1 className="text-lg font-semibold">Gestionale Serramenti</h1>
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
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive
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
      </aside>

      {/* Main Content */}
      <div className="pl-64">
        {/* Top Bar with GlobalSearch */}
        <div className="sticky top-0 z-10 bg-background border-b px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 max-w-2xl">
              <GlobalSearch />
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        
        <main className="min-h-screen p-8">{children}</main>
      </div>
    </div>
  );
}
