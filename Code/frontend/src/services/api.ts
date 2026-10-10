import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

/**
 * Token Persistence Strategy Assessment:
 * - Backend cấp phát stateless JWT qua AuthResponse.token (chưa hỗ trợ HttpOnly Cookie).
 * - Sử dụng key 'slybyte_token' trong localStorage kết hợp đồng bộ trực tiếp vào Zustand store.
 * - Trade-off: Tiện lợi và phù hợp với mô hình SPA + REST API, chấp nhận rủi ro XSS bằng cách
 *   luôn vệ sinh đầu vào và không lưu thông tin nhạy cảm khác trong client storage.
 */
export const TOKEN_STORAGE_KEY = 'slybyte_token';
export const USER_STORAGE_KEY = 'slybyte_user';

export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request Interceptor: Đính kèm Bearer token nếu có
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Xử lý lỗi an toàn, tránh redirect loop
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string } | string>) => {
    const status = error.response?.status;
    const originalRequestUrl = error.config?.url || '';

    // Chỉ dọn session 401 nếu KHÔNG PHẢI request login hay register
    const isAuthEndpoint = originalRequestUrl.includes('/auth/login') || originalRequestUrl.includes('/auth/register');

    if (status === 401 && !isAuthEndpoint) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);
      // Dispatch custom event để UI / Auth Store phản ứng tự nhiên mà không reload cứng
      window.dispatchEvent(new CustomEvent('auth:unauthorized'));
    }

    return Promise.reject(error);
  }
);
