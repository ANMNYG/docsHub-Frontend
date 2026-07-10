import { Link, useParams } from "react-router-dom";
import type { DocumentHistoryItem } from "@/types/api";

interface SidebarProps {
  items: DocumentHistoryItem[];
  onClear: () => void;
}

/**
 * 왼쪽 고정 워크스페이스 사이드바.
 * Notion의 "어두운 사이드바 + 밝은 캔버스" 레이아웃 컨셉을 가져오되,
 * 브랜드 마크 + 최근 변환 이력 + (준비 중인) 로그인 영역까지 한 곳에서 관리합니다.
 */
export function Sidebar({ items, onClear }: SidebarProps) {
  const { documentId } = useParams();

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col bg-sidebar text-white">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
          <rect x="1" y="1" width="24" height="24" rx="6" fill="#2563EB" />
          <path d="M8 8.5c-1.2 0-1.9.7-1.9 1.8v1.4c0 .8-.3 1.1-.9 1.1v1.2c.6 0 .9.3.9 1.1v1.4c0 1.1.7 1.8 1.9 1.8"
            stroke="#F6F8FA" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M18 8.5c1.2 0 1.9.7 1.9 1.8v1.4c0 .8.3 1.1.9 1.1v1.2c-.6 0-.9.3-.9 1.1v1.4c0 1.1-.7 1.8-1.9 1.8"
            stroke="#F6F8FA" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
        <span className="font-display text-[15px] font-semibold tracking-tight">SpecToDocs</span>
      </div>

      <div className="px-3">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-md bg-white/[0.06] px-3 py-2 text-[13px] font-medium text-white/90 hover:bg-white/[0.1] transition-colors"
        >
          <span className="text-base leading-none">＋</span>
          새 변환
        </Link>
      </div>

      <div className="mt-6 flex-1 overflow-y-auto px-3">
        <div className="flex items-center justify-between px-2 mb-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-sidebar-muted">
            최근 변환
          </span>
          {items.length > 0 && (
            <button
              onClick={onClear}
              className="text-[11px] text-sidebar-muted hover:text-white transition-colors"
            >
              비우기
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <p className="px-2 text-[12px] leading-relaxed text-sidebar-muted">
            변환한 문서가 여기 쌓여요.
          </p>
        ) : (
          <ul className="space-y-0.5">
            {items.map((item) => {
              const isActive = String(item.id) === documentId;
              return (
                <li key={item.id}>
                  <Link
                    to={`/documents/${item.id}`}
                    className={`
                      block truncate rounded-md px-2 py-1.5 text-[13px] transition-colors
                      ${isActive
                        ? "bg-accent/20 text-white"
                        : "text-white/70 hover:bg-sidebar-hover hover:text-white"}
                    `}
                  >
                    {item.fileName}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="border-t border-sidebar-border px-4 py-4">
        <button
          disabled
          className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-[13px] text-sidebar-muted opacity-70 cursor-not-allowed"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-[11px]">
            ?
          </span>
          로그인 (준비 중)
        </button>
      </div>
    </aside>
  );
}