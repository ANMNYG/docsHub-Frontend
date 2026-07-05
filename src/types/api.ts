/**
 * 백엔드 com.devtool.docshub.common.ApiResponse<T> 와 1:1로 대응되는 타입.
 * 모든 API 응답은 이 포맷으로 감싸져 내려옵니다.
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

/**
 * 백엔드 ErrorCode enum에 정의된 값과 동일합니다.
 * (INVALID_INPUT_VALUE, INVALID_FILE_TYPE, DOCUMENT_NOT_FOUND, INTERNAL_SERVER_ERROR)
 * 서버는 message 문자열만 내려주므로, 프론트에서는 HTTP status로 종류를 구분합니다.
 */
export type ApiErrorStatus = 400 | 404 | 500;

export interface ApiErrorPayload {
  success: false;
  data: null;
  message: string;
}

/** POST /api/v1/documents/upload 의 data 타입 (documentId) */
export type DocumentId = number;

/** GET /api/v1/documents/{id}/markdown 의 data 타입 */
export type MarkdownContent = string;

/**
 * 백엔드에는 문서 목록 조회 API가 없어, 업로드 이력을 브라우저에
 * 로컬로만 보관하기 위한 타입입니다. (서버 데이터가 아님)
 */
export interface DocumentHistoryItem {
  id: DocumentId;
  fileName: string;
  uploadedAt: string; // ISO string
}
