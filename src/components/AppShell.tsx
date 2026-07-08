import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { useDocumentHistory } from "@/hooks/useDocumentHistory";

/**
 * 워크스페이스 전체 레이아웃 셸.
 * 사이드바는 페이지 이동과 무관하게 항상 떠 있어야 해서, 여기서 딱 한 번만
 * useDocumentHistory를 호출하고, 자식 페이지들에는 Outlet context로 내려줍니다.
 * (페이지마다 따로 훅을 부르면 localStorage 동기화가 안 맞는 문제가 생겨서 이렇게 통일함)
 */
export interface ShellContext {
  addItem: ReturnType<typeof useDocumentHistory>["addItem"];
  items: ReturnType<typeof useDocumentHistory>["items"];
}

export function AppShell() {
  const { items, addItem, clear } = useDocumentHistory();

  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar items={items} onClear={clear} />
      <main className="flex-1 overflow-y-auto">
        <Outlet context={{ addItem, items } satisfies ShellContext} />
      </main>
    </div>
  );
}