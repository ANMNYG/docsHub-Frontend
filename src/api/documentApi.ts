import { apiClient } from "@/lib/axios";
import type { ApiResponse, DocumentId, MarkdownContent } from "@/types/api";

/**
 * POST /api/v1/documents/upload
 * DocumentController.uploadDocument 와 대응
 * multipart/form-data, 필드명은 반드시 "file" (백엔드 @RequestParam("file") 과 일치해야 함)
 */
export async function uploadDocument(file: File): Promise<DocumentId> {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await apiClient.post<ApiResponse<DocumentId>>(
    "/v1/documents/upload",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return data.data;
}

/**
 * GET /api/v1/documents/{documentId}/markdown
 * DocumentController.getDocumentMarkdown 와 대응
 */
export async function fetchDocumentMarkdown(
  documentId: DocumentId
): Promise<MarkdownContent> {
  const { data } = await apiClient.get<ApiResponse<MarkdownContent>>(
    `/v1/documents/${documentId}/markdown`
  );
  return data.data;
}
