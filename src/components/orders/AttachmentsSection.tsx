import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Image, Download, Trash2, Loader2 } from "lucide-react";

interface Attachment {
  id: string;
  ordineId: string;
  uploadedByUserId: string;
  nomeFile: string;
  tipoMime: string;
  url: string;
  dimensione: number;
  createdAt: Date;
}
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { formatDateTime } from "@/lib/utils";

interface AttachmentsSectionProps {
  orderId: string;
  attachments: Attachment[];
}

export function AttachmentsSection({ orderId, attachments }: AttachmentsSectionProps) {
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith("image/")) {
      return <Image className="h-5 w-5" />;
    }
    return <FileText className="h-5 w-5" />;
  };

  const handleFileUpload = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = "image/*,.pdf,.doc,.docx,.xls,.xlsx";
    
    input.onchange = async (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (!files || files.length === 0) return;

      setUploading(true);

      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        for (const file of Array.from(files)) {
          // Upload to Supabase Storage
          const fileExt = file.name.split(".").pop();
          const fileName = `${orderId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
          
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from("order-attachments")
            .upload(fileName, file);

          if (uploadError) throw uploadError;

          // Insert attachment record - store storage path, not public URL
          const { error: insertError } = await supabase
            .from("attachments")
            .insert({
              ordine_id: orderId,
              nome_file: file.name,
              url: fileName,
              tipo_mime: file.type,
              dimensione: file.size,
              uploaded_by_user_id: user.id,
            });

          if (insertError) throw insertError;
        }

        toast({
          title: "Upload completato",
          description: `${files.length} file caricati con successo.`,
        });

        // Invalidate queries to refresh attachments
        queryClient.invalidateQueries({ queryKey: ["order-attachments", orderId] });
      } catch (error) {
        console.error("Error uploading files:", error);
        toast({
          title: "Errore upload",
          description: "Si è verificato un errore durante il caricamento dei file.",
          variant: "destructive",
        });
      } finally {
        setUploading(false);
      }
    };

    input.click();
  };

  const handleDownload = async (attachment: Attachment) => {
    const { data, error } = await supabase.storage
      .from("order-attachments")
      .createSignedUrl(attachment.url, 60);

    if (error || !data?.signedUrl) {
      toast({
        title: "Errore download",
        description: "Impossibile generare il link per il download.",
        variant: "destructive",
      });
      return;
    }

    window.open(data.signedUrl, "_blank");
  };

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleDelete = async (attachmentId: string) => {
    setDeleteConfirmId(attachmentId);
  };

  const confirmDelete = async () => {
    const attachmentId = deleteConfirmId;
    if (!attachmentId) return;
    setDeleteConfirmId(null);

    setDeleting(attachmentId);

    try {
      // Get attachment details to delete from storage
      const attachment = attachments.find(a => a.id === attachmentId);
      if (!attachment) throw new Error("Attachment not found");

      // Extract storage path from URL
      const urlParts = attachment.url.split("/order-attachments/");
      if (urlParts.length > 1) {
        const storagePath = urlParts[1].split("?")[0];
        
        // Delete from storage
        const { error: storageError } = await supabase.storage
          .from("order-attachments")
          .remove([storagePath]);

        if (storageError) throw storageError;
      }

      // Delete database record
      const { error: deleteError } = await supabase
        .from("attachments")
        .delete()
        .eq("id", attachmentId);

      if (deleteError) throw deleteError;

      toast({
        title: "Allegato eliminato",
        description: "L'allegato è stato eliminato con successo.",
      });

      // Invalidate queries to refresh attachments
      queryClient.invalidateQueries({ queryKey: ["order-attachments", orderId] });
    } catch (error) {
      console.error("Error deleting attachment:", error);
      toast({
        title: "Errore eliminazione",
        description: "Si è verificato un errore durante l'eliminazione dell'allegato.",
        variant: "destructive",
      });
    } finally {
      setDeleting(null);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Allegati</CardTitle>
        <Button onClick={handleFileUpload} size="sm" disabled={uploading}>
          {uploading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Upload className="h-4 w-4 mr-2" />
          )}
          {uploading ? "Caricamento..." : "Carica File"}
        </Button>
      </CardHeader>
      <CardContent>
        {attachments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Upload className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>Nessun allegato presente</p>
            <p className="text-sm mt-1">
              Carica documenti, foto o altri file relativi all'ordine
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="flex items-center justify-between border rounded-lg p-3 hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="text-muted-foreground">
                    {getFileIcon(attachment.tipoMime)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{attachment.nomeFile}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{formatFileSize(attachment.dimensione)}</span>
                      <span>•</span>
                      <span>{formatDateTime(attachment.createdAt)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDownload(attachment)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(attachment.id)}
                    disabled={deleting === attachment.id}
                  >
                    {deleting === attachment.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4 text-destructive" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteConfirmId} onOpenChange={(open) => !open && setDeleteConfirmId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Conferma eliminazione</AlertDialogTitle>
            <AlertDialogDescription>
              Sei sicuro di voler eliminare questo allegato? L'azione non può essere annullata.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annulla</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Elimina
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
