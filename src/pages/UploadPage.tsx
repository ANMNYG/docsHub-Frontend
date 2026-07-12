import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { FileDropzone } from "@/components/FileDropzone";
import { SampleFileTryIt } from "@/components/SampleFileTryIt";
import { useUploadDocument } from "@/hooks/useUploadDocument";
import { ApiError } from "@/lib/axios";
import type { ShellContext } from "@/components/AppShell";

// "결과가 어떻게 나오는지 미리 보고 싶다"는 피드백 대응용 정적 예시.
// 실제 변환 결과와 100% 동일한 포맷(요약 표 + 파라미터 + 요청/응답 예시)을 그대로 보여줍니다.
const SAMPLE_OUTPUT = `### \`POST\` /api/v1/members

회원 가입

**Request Body** \`application/json\`
\`\`\`json
{
  "email": "user@example.com",
  "name": "홍길동",
  "password": "string"
}
\`\`\`

**Responses**

\`201\` 생성됨
\`\`\`json
{
  "id": 1,
  "email": "user@example.com",
  "name": "홍길동",
  "createdAt": "2024-01-01T00:00:00Z"
}
\`\`\``;

export function UploadPage() {
  const navigate = useNavigate();
  const { addItem } = useOutletContext<ShellContext>();
  const { mutate, isPending, error, reset } = useUploadDocument();
  const [showSampleOutput, setShowSampleOutput] = useState(false);

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
    <div className="mx-auto max-w-2xl px-8 py-20">
      <p className="font-mono text-xs uppercase tracking-wider text-muted mb-2">Workspace</p>
      <h1 className="font-display text-[28px] font-semibold tracking-tight text-ink">
        API 명세서를 문서로
      </h1>
      <p className="mt-2 text-[15px] text-muted">
        어떤 도구로 관리하던 API 명세든 업로드하면, 엔드포인트를 정리한 마크다운 문서로
        자동 변환합니다.
      </p>

      <div className="mt-10">
        <FileDropzone onFileSelected={handleFileSelected} disabled={isPending} />
        <SampleFileTryIt onSampleSelected={handleFileSelected} disabled={isPending} />
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

      {/* 결과 미리보기 - "어떻게 나오는지 궁금하다"는 피드백 대응 */}
      <div className="mt-8 border-t border-border pt-6">
        <button
          onClick={() => setShowSampleOutput((v) => !v)}
          className="text-xs font-medium text-muted hover:text-ink transition-colors"
        >
          {showSampleOutput ? "결과 예시 접기 ▲" : "변환 결과가 어떻게 생겼는지 미리보기 ▼"}
        </button>
        {showSampleOutput && (
          <div className="mt-4 rounded-xl border border-border bg-ink p-5">
            <pre className="whitespace-pre-wrap bg-transparent p-0 text-xs leading-relaxed text-canvas font-mono">
              {SAMPLE_OUTPUT}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}