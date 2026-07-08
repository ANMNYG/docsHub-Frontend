/**
 * 이 서비스의 정체성("여러 포맷 → 하나의 문서")을 한 장의 그림으로 보여주는
 * 시그니처 비주얼입니다. 업로드 카드 위쪽에 배치됩니다.
 * 세 개의 색상 노드(Swagger/Postman/Insomnia)가 화살표로 모여
 * 하나의 문서 아이콘으로 수렴하는 모습을 표현합니다.
 */
export function ConversionGlyph() {
  return (
    <svg
      width="220"
      height="88"
      viewBox="0 0 220 88"
      fill="none"
      aria-hidden="true"
      className="mx-auto"
    >
      {/* 수렴하는 연결선 */}
      <path d="M28 16 L120 44" stroke="#D8DEE4" strokeWidth="1.5" />
      <path d="M28 44 L120 44" stroke="#D8DEE4" strokeWidth="1.5" />
      <path d="M28 72 L120 44" stroke="#D8DEE4" strokeWidth="1.5" />

      {/* 입력 노드 3개 */}
      <circle cx="20" cy="16" r="8" fill="#2563EB" />
      <text x="20" y="19.5" fontSize="8" fontWeight="700" fill="white" textAnchor="middle" fontFamily="JetBrains Mono, monospace">S</text>

      <circle cx="20" cy="44" r="8" fill="#D97706" />
      <text x="20" y="47.5" fontSize="8" fontWeight="700" fill="white" textAnchor="middle" fontFamily="JetBrains Mono, monospace">P</text>

      <circle cx="20" cy="72" r="8" fill="#0D9488" />
      <text x="20" y="75.5" fontSize="8" fontWeight="700" fill="white" textAnchor="middle" fontFamily="JetBrains Mono, monospace">I</text>

      {/* 화살표 */}
      <path d="M128 44 L148 44" stroke="#1F2328" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
      <defs>
        <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6 Z" fill="#1F2328" />
        </marker>
      </defs>

      {/* 출력: 문서 아이콘 */}
      <rect x="156" y="26" width="36" height="36" rx="6" fill="#1F2328" />
      <line x1="165" y1="37" x2="183" y2="37" stroke="#F6F8FA" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="165" y1="44" x2="183" y2="44" stroke="#F6F8FA" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="165" y1="51" x2="176" y2="51" stroke="#F6F8FA" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}