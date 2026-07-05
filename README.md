<<<<<<< HEAD
# docsHub-Frontend
=======
# DocsHub Frontend

`ANMNYG/docsHub` Spring Boot 백엔드용 프론트엔드입니다.
Swagger/OpenAPI 파일을 업로드하면 백엔드가 파싱 → 마크다운으로 변환한 결과를 보여줍니다.

## 스택

- React 18 + Vite + TypeScript
- TanStack Query (서버 상태 관리, 로딩/에러/캐싱)
- Axios
- React Router
- Tailwind CSS
- react-markdown + remark-gfm (마크다운 렌더링)

## 실행 방법

```bash
npm install
cp .env.example .env   # 필요시 백엔드 주소 수정
npm run dev
```

기본적으로 `http://localhost:5173` 에서 실행되고, `/api`로 시작하는 요청은
`vite.config.ts`의 proxy 설정을 통해 백엔드(`http://localhost:8080`)로 전달됩니다.
**백엔드를 먼저 실행한 뒤** 프론트를 켜주세요.

## 백엔드와 맞춘 부분

| 항목 | 내용 |
|---|---|
| 업로드 | `POST /api/v1/documents/upload` (multipart, 필드명 `file`) → `documentId` 반환 |
| 변환 결과 조회 | `GET /api/v1/documents/{documentId}/markdown` → 마크다운 문자열 반환 |
| 응답 포맷 | `ApiResponse<T> { success, data, message }` — `src/lib/axios.ts`에서 공통 처리 |
| 에러 처리 | `GlobalExceptionHandler`가 내려주는 message를 그대로 화면에 표시 (400/404/500) |

## 알아두면 좋은 점 (백엔드 관련 제안)

1. **목록 조회 API가 없어서** 최근 변환 이력은 브라우저 `localStorage`에만 임시로 저장됩니다
   (`src/hooks/useDocumentHistory.ts`). 다른 브라우저/기기에서는 보이지 않아요.
   `GET /api/v1/documents` 같은 목록 API가 추가되면 이 훅을 react-query 기반으로 쉽게 교체할 수 있게 구조를 분리해뒀습니다.
2. **CORS**: 로컬 개발 시엔 vite proxy로 우회하지만, 운영 배포 시(프론트/백엔드가 다른 도메인일 경우)엔
   백엔드에 `@CrossOrigin` 또는 `WebMvcConfigurer`로 CORS 허용 설정이 필요합니다.
3. **파일 형식 검증**: 프론트에서는 확장자(`.json/.yaml/.yml`)만 1차로 확인하고,
   실제 스펙 유효성 검증은 백엔드 `SwaggerParserService`의 응답(`INVALID_FILE_TYPE`)을 그대로 신뢰합니다.

## 폴더 구조

```
src/
  api/documentApi.ts       # 백엔드 엔드포인트 호출 함수
  lib/axios.ts              # axios 인스턴스 + 에러 정규화
  types/api.ts               # ApiResponse<T> 등 백엔드 DTO와 대응되는 타입
  hooks/                      # useUploadDocument, useDocumentMarkdown, useDocumentHistory
  components/                # FileDropzone, MarkdownViewer, HistorySidebar, Header
  pages/                      # UploadPage, DocumentPage, NotFoundPage
```
>>>>>>> 5de405d (FrontEnd 초기 세팅)
