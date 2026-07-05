import { useCallback, useEffect, useState } from "react";
import type { DocumentHistoryItem } from "@/types/api";

const STORAGE_KEY = "docshub:history";

/**
 * 백엔드에 문서 '목록 조회' API가 없어서(GET /api/v1/documents 없음),
 * 최근에 변환한 문서 이력을 브라우저 localStorage에만 임시로 남깁니다.
 * 서버 데이터가 아니므로 다른 브라우저/기기에서는 보이지 않습니다.
 * 추후 백엔드에 목록 API가 추가되면 이 훅을 react-query 기반으로 교체하면 됩니다.
 */
export function useDocumentHistory() {
  const [items, setItems] = useState<DocumentHistoryItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      setItems([]);
    }
  }, []);

  const addItem = useCallback((item: DocumentHistoryItem) => {
    setItems((prev) => {
      const next = [item, ...prev.filter((p) => p.id !== item.id)].slice(0, 20);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setItems([]);
  }, []);

  return { items, addItem, clear };
}
