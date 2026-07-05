import { useQuery } from "@tanstack/react-query";
import { fetchDocumentMarkdown } from "@/api/documentApi";
import type { DocumentId } from "@/types/api";

export function useDocumentMarkdown(documentId: DocumentId | undefined) {
  return useQuery({
    queryKey: ["document-markdown", documentId],
    queryFn: () => fetchDocumentMarkdown(documentId as DocumentId),
    enabled: documentId !== undefined && !Number.isNaN(documentId),
    retry: 1,
  });
}
