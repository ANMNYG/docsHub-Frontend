import { useCallback, useRef, useState } from "react";
import { SupportedFormats } from "@/components/SupportedFormats";
import { ConversionGlyph } from "@/components/ConversionGlyph";

const ACCEPTED_EXTENSIONS = [".json", ".yaml", ".yml"];

interface FileDropzoneProps {
  onFileSelected: (file: File) => void;
  disabled?: boolean;
}

function isAcceptedFile(file: File): boolean {
  const name = file.name.toLowerCase();
  return ACCEPTED_EXTENSIONS.some((ext) => name.endsWith(ext));
}

export function FileDropzone({ onFileSelected, disabled }: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;
      const file = files[0];

      if (!isAcceptedFile(file)) {
        setValidationError(
          `지원하지 않는 파일 형식입니다. (${ACCEPTED_EXTENSIONS.join(", ")} 파일만 업로드할 수 있어요)`
        );
        return;
      }

      setValidationError(null);
      onFileSelected(file);
    },
    [onFileSelected]
  );

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        aria-label="API 명세 파일 업로드"
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (!disabled) handleFiles(e.dataTransfer.files);
        }}
        className={`
          relative flex flex-col items-center justify-center gap-5 overflow-hidden
          rounded-2xl border px-6 py-16 text-center transition-colors cursor-pointer select-none
          bg-dot-grid bg-dot-grid
          ${isDragging ? "border-accent bg-accent-soft" : "border-border bg-white hover:border-accent/50"}
          ${disabled ? "pointer-events-none opacity-60" : ""}
        `}
      >
        <ConversionGlyph />

        <div>
          <p className="font-display text-lg font-semibold text-ink">
            API 명세 파일을 여기에 놓으세요
          </p>
          <p className="mt-1 text-sm text-muted">
            Swagger, Postman, Insomnia에서 내보낸 파일을 그대로 올려보세요
          </p>
        </div>

        <SupportedFormats />

        <p className="text-xs text-muted">또는 클릭해서 파일 선택</p>

        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_EXTENSIONS.join(",")}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
          disabled={disabled}
        />
      </div>
      {validationError && (
        <p role="alert" className="mt-3 text-sm text-danger">
          {validationError}
        </p>
      )}
    </div>
  );
}