import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, Mail, Shield, Users, Briefcase, Store } from "lucide-react";
import { useUsers, useUpdateUserRole, useUpdateUserStatus } from "@/hooks/useSettings";
import { Skeleton } from "@/components/ui/skeleton";
import InviteUserDialog from "./InviteUserDialog";
import ResetPasswordDialog from "./ResetPasswordDialog";

const UserManagementSection = () => {
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const { data: users, isLoading } = useUsers();
  const updateRole = useUpdateUserRole();
  const updateStatus = useUpdateUserStatus();

  // Filter users by role with useMemo for optimization
  const adminUsers = useMemo(() => 
    users?.filter(u => u.roles.includes('super_admin')) || [], 
    [users]
  );
  const commercialeUsers = useMemo(() => 
    users?.filter(u => u.roles.includes('commerciale')) || [], 
    [users]
  );
  const rivenditoreUsers = useMemo(() => 
    users?.filter(u => u.roles.includes('rivenditore')) || [], 
    [users]
  );

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "super_admin":
        return "Super Admin";
      case "commerciale":
        return "Commerciale";
      case "rivenditore":
        return "Rivenditore";
      default:
        return role;
    }
  };

  const renderUserCard = (user: any) => (
    <div
      key={user.id}
      className="flex items-center justify-between p-4 border rounded-lg"
    >
      <div className="flex items-center gap-4 flex-1">
        <div className="flex flex-col">
          <span className="font-medium">{user.display_name}</span>
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Mail className="h-3 w-3" />
            {user.email}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Select
          value={user.roles[0] || ""}
          onValueChange={(value) =>
            updateRole.mutate({ 
              userId: user.id, 
              role: value as "super_admin" | "commerciale" | "rivenditore"
            })
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleziona ruolo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="super_admin">Super Admin</SelectItem>
            <SelectItem value="commerciale">Commerciale</SelectItem>
            <SelectItem value="rivenditore">Rivenditore</SelectItem>
          </SelectContent>
        </Select>

        <ResetPasswordDialog
          userId={user.id}
          userName={user.display_name}
          trigger={
            <Button variant="outline" size="sm">
              Reset Password
            </Button>
          }
        />

        <div className="flex items-center gap-2">
          <Switch
            checked={user.is_active}
            onCheckedChange={(checked) =>
              updateStatus.mutate({ userId: user.id, isActive: checked })
            }
            aria-label={user.is_active ? "Disattiva utente" : "Attiva utente"}
          />
        </div>
      </div>
    </div>
  );

  const renderEmptyState = (roleLabel: string, Icon: any) => (
    <div className="text-center py-12 text-muted-foreground">
      <Icon className="h-12 w-12 mx-auto mb-3 opacity-20" />
      <p>Nessun {roleLabel} presente</p>
    </div>
  );

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Gestione Utenti e Ruoli
            </CardTitle>
            <CardDescription>
              Visualizza, invita e gestisci gli utenti del sistema
            </CardDescription>
          </div>
          <Button onClick={() => setInviteDialogOpen(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Crea Utente
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="admin" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="admin" className="gap-2">
                <Shield className="h-4 w-4" />
                Super Admin
                <Badge variant="secondary" className="ml-1">
                  {adminUsers.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="commerciale" className="gap-2">
                <Briefcase className="h-4 w-4" />
                Commerciali
                <Badge variant="secondary" className="ml-1">
                  {commercialeUsers.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="rivenditore" className="gap-2">
                <Store className="h-4 w-4" />
                Rivenditori
                <Badge variant="secondary" className="ml-1">
                  {rivenditoreUsers.length}
                </Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="admin" className="mt-6">
              <div className="space-y-4">
                {adminUsers.length > 0 ? (
                  adminUsers.map(renderUserCard)
                ) : (
                  renderEmptyState("Super Admin", Shield)
                )}
              </div>
            </TabsContent>

            <TabsContent value="commerciale" className="mt-6">
              <div className="space-y-4">
                {commercialeUsers.length > 0 ? (
                  commercialeUsers.map(renderUserCard)
                ) : (
                  renderEmptyState("Commerciale", Briefcase)
                )}
              </div>
            </TabsContent>

            <TabsContent value="rivenditore" className="mt-6">
              <div className="space-y-4">
                {rivenditoreUsers.length > 0 ? (
                  rivenditoreUsers.map(renderUserCard)
                ) : (
                  renderEmptyState("Rivenditore", Store)
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <InviteUserDialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen} />
    </>
  );
};

export default UserManagementSection;