import { useMutation } from "@tanstack/react-query";
import { uploadDocument } from "@/api/documentApi";

export function useUploadDocument() {
  return useMutation({
    mutationFn: (file: File) => uploadDocument(file),
  });
}
