import { Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import { UploadPage } from "@/pages/UploadPage";
import { DocumentPage } from "@/pages/DocumentPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

export function App() {
  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/documents/:documentId" element={<DocumentPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
