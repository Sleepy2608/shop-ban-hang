import { api } from './api';
import { AuthResponse, LoginRequest, RegisterRequest, CurrentUserPrincipal } from '../types/auth.types';

export const authService = {
  /**
   * Đăng nhập người dùng
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  /**
   * Đăng ký tài khoản mới
   */
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', userData);
    return response.data;
  },

  /**
   * Lấy thông tin user hiện tại qua token (/api/auth/me)
   */
  async getMe(): Promise<CurrentUserPrincipal> {
    const response = await api.get<CurrentUserPrincipal>('/auth/me');
    return response.data;
  },
};

