import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Image, Download, Trash2 } from "lucide-react";
import { Attachment } from "@/types";

interface AttachmentsSectionProps {
  orderId: string;
  attachments: Attachment[];
}

export function AttachmentsSection({ orderId, attachments }: AttachmentsSectionProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith("image/")) {
      return <Image className="h-5 w-5" />;
    }
    return <FileText className="h-5 w-5" />;
  };

  const handleFileUpload = () => {
    // In real app, this would open file picker and upload
    console.log("Upload file");
  };

  const handleDownload = (attachment: Attachment) => {
    // In real app, this would download the file
    console.log("Download file:", attachment.nomeFile);
  };

  const handleDelete = (attachmentId: string) => {
    // In real app, this would delete the file
    console.log("Delete file:", attachmentId);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Allegati</CardTitle>
        <Button onClick={handleFileUpload} size="sm">
          <Upload className="h-4 w-4 mr-2" />
          Carica File
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
                      <span>{formatDate(attachment.createdAt)}</span>
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
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
