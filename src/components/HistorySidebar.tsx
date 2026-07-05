import { Link, useParams } from "react-router-dom";
import type { DocumentHistoryItem } from "@/types/api";

interface HistorySidebarProps {
  items: DocumentHistoryItem[];
  onClear: () => void;
}

export function HistorySidebar({ items, onClear }: HistorySidebarProps) {
  const { documentId } = useParams();

  return (
    <aside className="w-full shrink-0 md:w-56">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-mono text-xs uppercase tracking-wide text-muted">최근 변환</h2>
        {items.length > 0 && (
          <button
            onClick={onClear}
            className="text-xs text-muted hover:text-danger transition-colors"
          >
            비우기
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <p className="text-xs text-muted leading-relaxed">
          이 브라우저에서 변환한 문서가 여기에 표시됩니다.
        </p>
      ) : (
        <ul className="space-y-1.5">
          {items.map((item) => {
            const isActive = String(item.id) === documentId;
            return (
              <li key={item.id}>
                <Link
                  to={`/documents/${item.id}`}
                  className={`
                    block rounded-lg border px-3 py-2 text-xs transition-colors
                    ${
                      isActive
                        ? "border-accent bg-accent-light text-accent-dark"
                        : "border-line bg-surface text-ink hover:border-accent/50"
                    }
                  `}
                >
                  <p className="truncate font-medium">{item.fileName}</p>
                  <p className="font-mono text-[10px] text-muted mt-0.5">
                    #{item.id} · {new Date(item.uploadedAt).toLocaleString("ko-KR")}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </aside>
  );
}
