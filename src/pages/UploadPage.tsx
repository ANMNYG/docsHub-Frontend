import { useNavigate } from "react-router-dom";
import { FileDropzone } from "@/components/FileDropzone";
import { HistorySidebar } from "@/components/HistorySidebar";
import { useUploadDocument } from "@/hooks/useUploadDocument";
import { useDocumentHistory } from "@/hooks/useDocumentHistory";
import { ApiError } from "@/lib/axios";

export function UploadPage() {
  const navigate = useNavigate();
  const { items, addItem, clear } = useDocumentHistory();
  const { mutate, isPending, error, reset } = useUploadDocument();

  const handleFileSelected = (file: File) => {
    reset();
    mutate(file, {
      onSuccess: (documentId) => {
        addItem({
          id: documentId,
          fileName: file.name,
          uploadedAt: new Date().toISOString(),
        });
        navigate(`/documents/${documentId}`);
      },
    });
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-12 md:flex-row">
      <HistorySidebar items={items} onClear={clear} />

      <div className="flex-1">
        <h1 className="font-display text-2xl font-semibold text-ink">API 명세서를 문서로</h1>
        <p className="mt-2 text-sm text-muted max-w-md">
          Swagger/OpenAPI 파일을 업로드하면 엔드포인트를 정리한 마크다운 문서로 자동 변환합니다.
        </p>

        <div className="mt-8">
          <FileDropzone onFileSelected={handleFileSelected} disabled={isPending} />
        </div>

        {isPending && (
          <p className="mt-4 flex items-center gap-2 text-sm text-accent-dark">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
            업로드하고 변환 중이에요...
          </p>
        )}

        {error && (
          <div className="mt-4 rounded-lg border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
            {error instanceof ApiError
              ? error.message
              : "업로드 중 알 수 없는 오류가 발생했습니다."}
          </div>
        )}
      </div>
    </div>
  );
}
