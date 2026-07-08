/**
 * 업로드 카드에 표시되는 지원 포맷 목록.
 * 실제 로고 대신 우리 브랜드 색상 체계 안에서 "이니셜 원형 칩"으로 표현해서
 * 상표권 문제 없이도 한눈에 구분되게 만들었습니다.
 */
interface FormatChip {
  initial: string;
  label: string;
  hint: string;
  colorClass: string;
}

const FORMATS: FormatChip[] = [
  { initial: "S", label: "Swagger / OpenAPI", hint: ".json · .yaml", colorClass: "bg-format-swagger" },
  { initial: "P", label: "Postman Collection", hint: ".json", colorClass: "bg-format-postman" },
  { initial: "I", label: "Insomnia Export", hint: ".json", colorClass: "bg-format-insomnia" },
];

export function SupportedFormats() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {FORMATS.map((format) => (
        <span
          key={format.label}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-white pl-1 pr-3 py-1"
        >
          <span
            className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold text-white ${format.colorClass}`}
          >
            {format.initial}
          </span>
          <span className="text-xs font-medium text-ink">{format.label}</span>
          <span className="font-mono text-[10px] text-muted">{format.hint}</span>
        </span>
      ))}
    </div>
  );
}