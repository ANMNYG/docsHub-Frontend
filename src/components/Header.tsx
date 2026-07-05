import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="border-b border-line bg-surface">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          {/* 시그니처 마크: { } 가 문서 아이콘으로 변환되는 파이프라인을 형상화 */}
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
            <rect x="1" y="1" width="28" height="28" rx="7" fill="#0E7C7B" />
            <path
              d="M9 9.5c-1.4 0-2.2.8-2.2 2.1v1.6c0 .9-.3 1.3-1.1 1.3v1.4c.8 0 1.1.4 1.1 1.3v1.6c0 1.3.8 2.1 2.2 2.1"
              stroke="#F5F6F8"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <path
              d="M21 9.5c1.4 0 2.2.8 2.2 2.1v1.6c0 .9.3 1.3 1.1 1.3v1.4c-.8 0-1.1.4-1.1 1.3v1.6c0 1.3-.8 2.1-2.2 2.1"
              stroke="#F5F6F8"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <line x1="14" y1="12" x2="16" y2="12" stroke="#E8A33D" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="13" y1="15" x2="17" y2="15" stroke="#E8A33D" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="14" y1="18" x2="16" y2="18" stroke="#E8A33D" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <div>
            <p className="font-display text-sm font-semibold leading-none text-ink">DocsHub</p>
            <p className="font-mono text-[11px] leading-none text-muted mt-1">
              swagger.json → docs.md
            </p>
          </div>
        </Link>
        <nav className="flex items-center gap-5 font-body text-sm text-muted">
          <Link to="/" className="hover:text-ink transition-colors">
            새 변환
          </Link>
        </nav>
      </div>
    </header>
  );
}
