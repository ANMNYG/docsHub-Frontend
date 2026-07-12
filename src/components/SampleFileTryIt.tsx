interface SampleOption {
  label: string;
  colorClass: string;
  initial: string;
  path: string;
  fileName: string;
}

const SAMPLES: SampleOption[] = [
  { label: "Swagger 예제", colorClass: "bg-format-swagger", initial: "S", path: "/samples/swagger-sample.json", fileName: "swagger-sample.json" },
  { label: "Postman 예제", colorClass: "bg-format-postman", initial: "P", path: "/samples/postman-sample.json", fileName: "postman-sample.json" },
  { label: "Insomnia 예제", colorClass: "bg-format-insomnia", initial: "I", path: "/samples/insomnia-sample.json", fileName: "insomnia-sample.json" },
];

interface SampleFileTryItProps {
  onSampleSelected: (file: File) => void;
  disabled?: boolean;
}

/**
 * "파일이 없는데 일단 체험해보고 싶다"는 사용자를 위한 원클릭 버튼입니다.
 * public/samples/ 안의 정적 예제 파일을 fetch로 가져와 File 객체로 만든 뒤,
 * 실제 드래그앤드롭으로 파일을 골랐을 때와 똑같은 흐름(onSampleSelected)을 태웁니다.
 * "다운로드 → 다시 업로드"하는 두 단계를 안 거쳐도 되게 하기 위함입니다.
 */
export function SampleFileTryIt({ onSampleSelected, disabled }: SampleFileTryItProps) {
  const handleClick = async (sample: SampleOption) => {
    const response = await fetch(sample.path);
    const blob = await response.blob();
    const file = new File([blob], sample.fileName, { type: "application/json" });
    onSampleSelected(file);
  };

  return (
    <div className="mt-4">
      <p className="text-xs text-muted mb-2">파일이 없으신가요? 예제로 바로 체험해보세요</p>
      <div className="flex flex-wrap gap-2">
        {SAMPLES.map((sample) => (
          <button
            key={sample.path}
            disabled={disabled}
            onClick={() => handleClick(sample)}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white pl-1 pr-3 py-1 text-xs font-medium text-ink hover:border-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold text-white ${sample.colorClass}`}>
              {sample.initial}
            </span>
            {sample.label}
          </button>
        ))}
      </div>
    </div>
  );
}