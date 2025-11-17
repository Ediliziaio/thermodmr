import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, Mail, Shield } from "lucide-react";
import { useUsers, useUpdateUserRole, useUpdateUserStatus } from "@/hooks/useSettings";
import { Skeleton } from "@/components/ui/skeleton";
import InviteUserDialog from "./InviteUserDialog";

const UserManagementSection = () => {
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const { data: users, isLoading } = useUsers();
  const updateRole = useUpdateUserRole();
  const updateStatus = useUpdateUserStatus();

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "super_admin":
        return "bg-red-500";
      case "commerciale":
        return "bg-blue-500";
      case "rivenditore":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

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
            Invita Utente
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users?.map((user) => (
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

                <div className="flex items-center gap-4">
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

                  <Badge className={getRoleBadgeColor(user.roles[0] || "")}>
                    {getRoleLabel(user.roles[0] || "Nessun ruolo")}
                  </Badge>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {user.is_active ? "Attivo" : "Disattivato"}
                    </span>
                    <Switch
                      checked={user.is_active}
                      onCheckedChange={(checked) =>
                        updateStatus.mutate({ userId: user.id, isActive: checked })
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <InviteUserDialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen} />
    </>
  );
};

export default UserManagementSection;