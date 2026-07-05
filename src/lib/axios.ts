import axios, { AxiosError } from "axios";
import type { ApiErrorPayload } from "@/types/api";

/**
 * 개발 환경에서는 vite.config.ts의 proxy 설정을 통해 '/api'가
 * 실제 Spring Boot 서버(기본 8080)로 전달됩니다.
 * 운영 환경에서는 VITE_API_BASE_URL로 실제 도메인을 지정하세요.
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "/api",
  timeout: 15_000,
});

/**
 * 서버가 던지는 에러는 항상 ApiResponse.error(message) 형태 +
 * ErrorCode에 매핑된 HTTP status(400/404/500)로 내려옵니다.
 * 이 클래스로 정규화해서 화면단에서 일관되게 처리합니다.
 */
export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorPayload>) => {
    if (error.response) {
      const message =
        error.response.data?.message ?? "서버 요청 중 알 수 없는 오류가 발생했습니다.";
      return Promise.reject(new ApiError(message, error.response.status));
    }
    if (error.request) {
      return Promise.reject(
        new ApiError("서버에 연결할 수 없습니다. 백엔드 서버가 실행 중인지 확인해주세요.", 0)
      );
    }
    return Promise.reject(new ApiError(error.message, 0));
  }
);
