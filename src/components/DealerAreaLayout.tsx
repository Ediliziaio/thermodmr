import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShoppingCart,
  CreditCard,
  LogOut,
  Menu,
  Eye,
  FileText,
  Headphones,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

interface DealerAreaLayoutProps {
  children: ReactNode;
  dealerId: string;
  dealerName?: string;
}

export function DealerAreaLayout({ children, dealerId, dealerName }: DealerAreaLayoutProps) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const basePath = `/rivenditori/${dealerId}/area`;

  const navigation = [
    { name: "Dashboard", href: basePath, icon: LayoutDashboard },
    { name: "Preventivi", href: `${basePath}/preventivi`, icon: FileText },
    { name: "Ordini", href: `${basePath}/ordini`, icon: ShoppingCart },
    { name: "Pagamenti", href: `${basePath}/pagamenti`, icon: CreditCard },
    { name: "Assistenza", href: `${basePath}/assistenza`, icon: Headphones },
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
          <Badge variant="secondary" className="text-xs">Vista Rivenditore</Badge>
        </div>
        <h2 className="text-sm font-semibold truncate mt-2">
          {dealerName || "Rivenditore"}
        </h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {navigation.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.name}
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
            Esci dall'Area
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
                Stai visualizzando come: <strong>{dealerName || "Rivenditore"}</strong>
              </span>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/rivenditori">Esci dall'Area</Link>
            </Button>
          </div>
        </div>

        <main className="min-h-screen p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
