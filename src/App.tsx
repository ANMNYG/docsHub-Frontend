import { Routes, Route } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { UploadPage } from "@/pages/UploadPage";
import { DocumentPage } from "@/pages/DocumentPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

export function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<UploadPage />} />
        <Route path="/documents/:documentId" element={<DocumentPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}