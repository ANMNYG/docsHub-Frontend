import { useState } from "react";
import { useParams, Link, useOutletContext } from "react-router-dom";
import { MarkdownViewer } from "@/components/MarkdownViewer";
import { useDocumentMarkdown } from "@/hooks/useDocumentMarkdown";
import { ApiError } from "@/lib/axios";
import type { ShellContext } from "@/components/AppShell";

export function DocumentPage() {
  const { documentId } = useParams<{ documentId: string }>();
  const { items } = useOutletContext<ShellContext>();
  const [copied, setCopied] = useState(false);

  const parsedId = documentId ? Number(documentId) : undefined;
  const { data: markdown, isLoading, isError, error, refetch } = useDocumentMarkdown(parsedId);

  const historyItem = items.find((i) => String(i.id) === documentId);
  const fileName = historyItem?.fileName ?? `document-${documentId}`;

  const handleCopy = async () => {
    if (!markdown) return;
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleDownload = () => {
    if (!markdown) return;
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName.replace(/\.(json|ya?ml)$/i, "") + ".md";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-3xl px-8 py-14">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="font-mono text-xs text-muted">문서 #{documentId}</p>
          <h1 className="font-display text-xl font-semibold tracking-tight text-ink truncate">
            {fileName}
          </h1>
        </div>
        {markdown && (
          <div className="flex shrink-0 gap-2">
            <button
              onClick={handleCopy}
              className="rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-ink hover:border-accent transition-colors"
            >
              {copied ? "복사됨 ✓" : "복사"}
            </button>
            <button
              onClick={handleDownload}
              className="rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-white hover:bg-accent-dark transition-colors"
            >
              .md 다운로드
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-white p-6 shadow-card">
        {isLoading && (
          <div className="flex flex-col gap-2 py-8">
            <div className="h-4 w-1/3 animate-pulse rounded bg-border" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-border" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-border" />
          </div>
        )}

        {isError && (
          <div className="py-8 text-center">
            <p className="text-sm text-danger mb-3">
              {error instanceof ApiError
                ? error.message
                : "문서를 불러오는 중 오류가 발생했습니다."}
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => refetch()}
                className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:border-accent transition-colors"
              >
                다시 시도
              </button>
              <Link
                to="/"
                className="rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-white hover:bg-accent-dark transition-colors"
              >
                새 파일 업로드
              </Link>
            </div>
          </div>
        )}

        {markdown && <MarkdownViewer content={markdown} />}
      </div>
    </div>
  );
}