import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 px-8 py-24 text-center">
      <p className="font-mono text-xs text-muted">404</p>
      <h1 className="font-display text-xl font-semibold tracking-tight text-ink">
        페이지를 찾을 수 없어요
      </h1>
      <Link to="/" className="mt-2 text-sm text-accent hover:underline">
        업로드 화면으로 돌아가기
      </Link>
    </div>
  );
}